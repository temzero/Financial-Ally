import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import Receipt from './Receipt';
import Button from '../../components/Button/Button';
import { getBudgets, getWallets, getTransactions } from '../../redux/actions';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);
    const [activeChart, setActiveChart] = useState('1D');
    const [displayBalance, setDisplayBalance] = useState(0); // Animated balance state

    const {
        _id, firstName, lastName, email, balance, wallets = [], budgets = [], transactions = []
    } = currentUser || {};

    const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
    
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        dispatch(getWallets(_id));
        dispatch(getBudgets(_id));
        
        dispatch(getTransactions(_id));

    }, [_id, dispatch]);

    // Count-up effect for balance display
    useEffect(() => {
        let startBalance = 0;
        const increment = Math.ceil(totalBalance / 100); // Adjust speed by changing the divisor

        const interval = setInterval(() => {
            startBalance += increment;
            if (startBalance >= totalBalance) {
                setDisplayBalance(totalBalance);
                clearInterval(interval);
            } else {
                setDisplayBalance(startBalance);
            }
        }, 5);

        return () => clearInterval(interval);
    }, [totalBalance]);

    if (!currentUser) {
        return null;
    }

    const handleChartButtonClick = (period) => {
        setActiveChart(period);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.balance}>${displayBalance.toLocaleString()}</h2>
                <div className={styles.contentSection}>
                    <div className={styles.chart} />
                    <div className={styles.chartBtnContainer}>
                        {['1D', '1W', '1M', '1Y', 'All'].map((period) => (
                            <Button
                                key={period}
                                s
                                rounded
                                className={`${styles.chartBtn} ${activeChart === period ? styles.active : ''}`}
                                onClick={() => handleChartButtonClick(period)}
                            >
                                {period}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className={styles.contentSection}>
                    <div className={styles.header}>Transactions</div>
                    <div className={styles.transactions}>
                        {transactions.map(transaction => {
                            return <div key={transaction._id} className={styles.transaction}>
                                <div className={styles.transType}>{transaction.type}</div>
                                <div className={styles.transAmount}>{transaction.amount}</div>
                                <div className={styles.transLabel}>{transaction.label}</div>
                                <div className={styles.transWallet}>{transaction.walletId}</div>
                                <div className={styles.transDate}>{transaction.date}</div>
                                <div className={styles.transNote}>{transaction.note}</div>
                                <div className={styles.transImage}>{transaction.image}</div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
            <Receipt currentUser={currentUser}/>
        </div>
    );
}

export default Home;
