import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import Receipt from './Receipt';
import Button from '../../components/Button/Button';
import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
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

    const formatTransactionDate = (date) => {
        const transactionDate = new Date(date);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
    
        // Remove time from comparison by setting time to midnight
        today.setHours(0, 0, 0, 0);
        yesterday.setHours(0, 0, 0, 0);
        transactionDate.setHours(0, 0, 0, 0);
    
        if (transactionDate.getTime() === today.getTime()) {
            return 'Today';
        } else if (transactionDate.getTime() === yesterday.getTime()) {
            return 'Yesterday';
        } else {
            return transactionDate.toLocaleDateString('en-GB');
        }
    };

    // Sort and group transactions by date
    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    let lastDate = '';

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
                        {sortedTransactions.map((transaction) => {
                            const transactionDate = formatTransactionDate(transaction.date);
                            const showDivider = transactionDate !== lastDate;
                            lastDate = transactionDate;

                            return (
                                <div key={transaction._id}>
                                    {showDivider && (
                                        <div className={styles.dateDivider}>{transactionDate}</div>
                                    )}
                                    <div className={styles.transaction}>
                                        {transaction.type === 'income' ? (
                                            <BiSolidPlusCircle className={styles.income} />
                                        ) : (
                                            <BiSolidMinusCircle className={styles.expense} />
                                        )}
                                        <div className={styles.transAmount}>${transaction.amount}</div>
                                        <div className={styles.transLabel}>{transaction.label}</div>
                                        <div className={styles.transWallet}>{wallets.find(wallet => wallet._id === transaction.walletId)?.name || ''}</div>
                                        <div className={styles.transNote}>{transaction.note}</div>
                                        {/* <div className={styles.transImage}>{transaction.image}</div> */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Receipt currentUser={currentUser}/>
        </div>
    );
}

export default Home;
