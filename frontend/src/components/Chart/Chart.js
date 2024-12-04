import styles from './Chart.module.scss';
import Button from '../Button/Button';
import { useState, useEffect } from 'react';
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
    console.log('counter: ', counter)

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
                filteredTransactions = transactions.filter((trans) =>
                    new Date(trans.date) >= new Date(now - 24 * 60 * 60 * 1000)
                );
                break;

            case '1W':
                filteredTransactions = transactions.filter((trans) =>
                    new Date(trans.date) >= new Date(now - 7 * 24 * 60 * 60 * 1000)
                );
                break;

            case '1M':
                filteredTransactions = transactions.filter((trans) =>
                    new Date(trans.date) >= new Date(now.setMonth(now.getMonth() - 1))
                );
                break;

            case '1Y':
                filteredTransactions = transactions.filter((trans) =>
                    new Date(trans.date) >= new Date(now.setFullYear(now.getFullYear() - 1))
                );
                break;

            default:
                break; // 'All' shows all data
        }
        return filteredTransactions;
    };

    const totalBalance = (wallets || []).reduce((sum, wallet) => sum + wallet.balance, 0);

    const balanceLineGraphData = (transactions, balance = totalBalance) => {
        let lineBalance = balance;
        const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
        // Map transactions to data points with timestamps and balance
        const data = sortedTransactions.map((trans) => {
            const transactionBalance = trans.type.toLowerCase() === 'income' ? -trans.amount :
                                       trans.type.toLowerCase() === 'expense' ? trans.amount : 0;
        
            lineBalance += transactionBalance;
        
            return {
                lineBalance: lineBalance,
                date: new Date(trans.date).getTime(),
            };
        });

        if (data.length === 0) {
            data.push({
                lineBalance: balance,
                date: new Date().getTime() - (1 * 60 * 60 * 1000), // Simulate one hour ago
            });
        }
    
        // Add the final point with the current time and the balance
        data.push({
            lineBalance: balance,
            date: new Date().getTime(), //yesterday
            // date: 'Now',
        });
    
        return data.sort((a, b) => a.date - b.date);
        // return data;
    };

    const filteredTransactions = filterTransactionsByPeriod(transactions, chartPeriod);
    const lineData = balanceLineGraphData(filteredTransactions);
    const dateLabels = lineData.map((point) =>
        new Date(point.date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
        })
    );
    const balancePoints = lineData.map((point) => point.lineBalance);

    const chartData = {
        labels: dateLabels,
        datasets: [
            {
                label: 'Balance',
                data: balancePoints,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                pointBackgroundColor: 'rgb(75, 192, 192)', // Dot fill color
                pointBorderColor: 'rgb(75, 192, 192)', // Dot fill color
                pointBorderWidth: 0, // Outline thickness
                pointRadius: 4, // Dot size
                pointHoverRadius: 8, // Hover dot size
            },
        ],
    };

    const chartOptions = {
        responsive: true,  // Makes the chart responsive
        maintainAspectRatio: false,  // Allows the chart to take the full height and width
        scales: {
            x: {
                display: false,  // Hide the x-axis labels and line
            },
        },
        plugins: {
            legend: {
                display: false, // Hides the legend
            },
            tooltip: {
                enabled: true,  // Keep tooltips enabled to show balance values and dates
            },
        },
        elements: {
            point: {
                hoverRadius: 0,  // Disable the hover effect on points (no size change)
                hitRadius: 0,    // Prevent hover interactions on points (no event trigger)
            },
        },
    };

    return (
        <div className={styles.chart}>
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
