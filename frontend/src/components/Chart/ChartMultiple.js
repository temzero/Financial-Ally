import styles from './Chart.module.scss';
import Button from '../Button/Button';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components in Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Chart() {
    const transactions = useSelector((state) => state.transaction.transactions) || [];
    const wallets = useSelector((state) => state.wallet.wallets) || [];

    const [chartPeriod, setChartPeriod] = useState('1W');
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                setCounter((prevCounter) => (prevCounter + 1) % 5);
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                setCounter((prevCounter) => (prevCounter - 1 + 5) % 5);
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

    const datasets = useMemo(() => {
        return wallets.map((wallet) => {
            const walletTransactions = transactions.filter((tran) => wallet.transactionIds.includes(tran._id));
            const filteredTransactions = filterTransactionsByPeriod(walletTransactions, chartPeriod);
            const lineData = balanceLineGraphData(filteredTransactions, wallet.balance);

            const dateLabels = lineData.map((point) =>
                new Date(point.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                })
            );
            const balancePoints = lineData.map((point) => point.lineBalance);

            const rootStyles = getComputedStyle(document.documentElement);
            const walletColor = rootStyles.getPropertyValue(`--background-${wallet.color}`).trim();

            return {
                label: wallet.name,
                data: balancePoints,
                fill: false,
                borderColor: walletColor,
                tension: 0.1,
                pointBackgroundColor: walletColor,
                pointBorderColor: walletColor,
                pointRadius: 4,
                pointHoverRadius: 8,
                customLabels: dateLabels,
            };
        });
    }, [wallets, transactions, chartPeriod]);

    const chartData = useMemo(() => {
        const labels =
            datasets.length > 0 ? datasets[0].customLabels : ['No Data']; // Use the first dataset's labels
        return {
            labels,
            datasets,
        };
    }, [datasets]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const balance = context.raw;
                        const date = context.label;
                        return `${label}: ${balance} (${date})`;
                    },
                },
            },
        },
    };

    return (
        <div className={styles.chartMultiple}>
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
    );
}

export default Chart;
