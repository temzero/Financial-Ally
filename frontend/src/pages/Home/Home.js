import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import Button from '../../components/Button/Button';
import { getBudgets, getWallets, getTransactions } from '../../redux/actions';
import TransactionList from '../../components/Transaction/TransactionList';
import AddTransaction from '../../components/Transaction/AddTransaction';

function Home() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);
    const [activeChart, setActiveChart] = useState('1D');
    const [displayBalance, setDisplayBalance] = useState(0); 

    const {
        _id, wallets = [], transactions = []
    } = currentUser || {};

    const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
    const currency = '$'

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
                <div className={styles.balance}><span className={styles.currency}>{currency}</span>{displayBalance.toLocaleString()}</div>
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

                    <TransactionList wallets={wallets} transactions={transactions}/>

                </div>
            </div>
            <AddTransaction currentUser={currentUser}/>
        </div>
    );
}

export default Home;

