import styles from './Chart.module.scss';
import Button from '../Button/Button';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IoWalletOutline } from "react-icons/io5";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components in Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Chart({currency = '$'}) {
    const transactions = useSelector((state) => state.transaction.transactions) || [];
    const wallets = useSelector((state) => state.wallet.wallets) || [];
    const [chartWalletId, setChartWalletId] = useState('')
    // console.log('transactions: ', transactions)

    const [chartPeriod, setChartPeriod] = useState('1W');
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                setCounter((prevCounter) => (prevCounter + 1) % 5);
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                setCounter((prevCounter) => {
                    const newCounter = (prevCounter - 1) % 5;
                    return newCounter < 0 ? 4 : newCounter;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const periods = ['1D', '1W', '1M', '1Y', 'All'];
        setChartPeriod(periods[counter]); // Update chart period based on counter
    }, [counter]);

    const filterTransactionsByPeriod = (transactions, period) => {
        const now = new Date();
        let filteredTransactions = transactions;

        switch (period) {
            case '1D':
                filteredTransactions = transactions.filter(
                    (trans) => new Date(trans.date) >= new Date(now - 24 * 60 * 60 * 1000)
                );
                break;
            case '1W':
                filteredTransactions = transactions.filter(
                    (trans) => new Date(trans.date) >= new Date(now - 7 * 24 * 60 * 60 * 1000)
                );
                break;
            case '1M':
                filteredTransactions = transactions.filter(
                    (trans) => new Date(trans.date) >= new Date(now.setMonth(now.getMonth() - 1))
                );
                break;
            case '1Y':
                filteredTransactions = transactions.filter(
                    (trans) => new Date(trans.date) >= new Date(now.setFullYear(now.getFullYear() - 1))
                );
                break;
            default:
                break; // 'All' shows all data
        }
        return filteredTransactions;
    };

    const balanceLineGraphData = (transactions, balance) => {
        let lineBalance = balance;
        const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

        const data = sortedTransactions.map((trans) => {
            const transactionBalance =
                trans.type.toLowerCase() === 'income'
                    ? -trans.amount
                    : trans.type.toLowerCase() === 'expense'
                    ? trans.amount
                    : 0;

            lineBalance += transactionBalance;

            return {
                lineBalance: lineBalance,
                date: new Date(trans.date).getTime(),
            };
        });

        if (data.length === 0) {
            data.push({
                lineBalance: balance,
                date: new Date().getTime() - 60 * 60 * 1000, // Simulate one hour ago
            });
        }

        data.push({
            lineBalance: balance,
            date: new Date().getTime(), // Now
        });

        return data.sort((a, b) => a.date - b.date);
    };

    const walletElements = () => {
        // If no budget wallets are found, return 'No wallet available!'
        if (wallets.length === 0) {
            return <div>No wallet available!</div>;
        }
    
        // Create a list of wallet elements, including 'All wallets'
        const walletElements = wallets.map((wallet) => {
            const handleWalletClick = () => {
                setChartWalletId(wallet._id);
            };
    
            return (
                <div
                    key={wallet._id}
                    className={`${styles[`walletItem-${wallet.color}`]} ${styles.walletItem} ${chartWalletId === wallet._id ? styles.active : ''}`}
                    onClick={handleWalletClick}
                >
                    <IoWalletOutline /> {wallet.name}
                </div>
            );
        });
    
        // Add 'All wallets' to the list
        walletElements.push(
            <div
                key="all-wallets"
                className={`${styles.walletItem} ${!chartWalletId ? styles.active : ''}`}
                onClick={() => setChartWalletId('')}
            >
                <IoWalletOutline /> All Wallet
            </div>
        );
    
        return walletElements;
    };    

    const totalBalance = (wallets || []).reduce((sum, wallet) => sum + wallet.balance, 0);
    let walletBalance;
    let walletName;

    // Create a reusable function
    const createChartData = (walletId) => {
        const wallet = wallets.find(wallet => wallet._id === walletId);

        let walletTransactions;
        let walletColor;

        if (wallet) {
            walletTransactions = transactions.filter(transaction =>
                wallet.transactionIds.includes(transaction._id)
            );
            walletBalance = wallet.balance;
            walletName = wallet.name
            walletColor = getComputedStyle(document.documentElement)
                .getPropertyValue(`--background-${wallet.color}`)
                .trim();
        } else {
            walletTransactions = transactions;
            walletBalance = totalBalance;
            walletName = 'All wallet'
            walletColor = `rgba(0, 0, 0, 0.4)`;
        }

        const filteredTransactions = filterTransactionsByPeriod(walletTransactions, chartPeriod);
        const lineData = balanceLineGraphData(filteredTransactions, walletBalance);

        const dateLabels = lineData.map((point) =>
            new Date(point.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
            })
        );
        const balancePoints = lineData.map((point) => point.lineBalance);

        return {
            labels: dateLabels,
            datasets: [
                {
                    label: 'Balance',
                    data: balancePoints,
                    fill: false,
                    borderColor: walletColor,
                    tension: 0.1,
                    pointBackgroundColor: walletColor,
                    pointBorderColor: walletColor,
                    pointBorderWidth: 0,
                    pointRadius: 4,
                    pointHoverRadius: 8,
                },
            ],
        };
    };

    const chartData = createChartData(chartWalletId)

    console.log('chartData: ', chartData);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        
        plugins: {
            legend: {
                display: false, // Disable the legend
            },
        
        },
    };

    return (
        <div className={styles.chart}>
            <div className={styles.walletInfo}>
                <div className={styles.walletName}>{walletName}</div>
                <div className={styles.walletBalance}>
                    <span>{currency}</span>
                    <span>{walletBalance?.toLocaleString?.() || '0'}</span>
                </div>
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.walletSelection}>
                    {walletElements()}
                </div>
                <div className={styles.graph}>
                    <Line data={chartData} options={chartOptions} />
                </div>
                <div className={styles.chartBtnContainer}>
                    {['1D', '1W', '1M', '1Y', 'All'].map((period) => (
                        <Button
                            key={period}
                            rounded
                            className={`${styles.chartBtn} ${chartPeriod === period ? styles.active : ''}`}
                            onClick={() => setChartPeriod(period)}
                        >
                            {period}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Chart;
