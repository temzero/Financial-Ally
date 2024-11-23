import styles from './Chart.module.scss';
import Button from '../Button/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components in Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Chart() {
    const transactions = useSelector((state) => state.transaction.transactions) || [];
    const wallets = useSelector((state) => state.wallet.wallets) || [];

    const totalBalance = (wallets || []).reduce((sum, wallet) => sum + wallet.balance, 0);
    const [chartPeriod, setChartPeriod] = useState('1W');

    const handleChartButtonClick = (period) => {
        setChartPeriod(period);
    };

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
    const balanceLineGraphData = (transactions) => {
        let lineBalance = totalBalance;
        
        // Map transactions to data points with timestamps and balance
        const data = transactions.map((trans) => {
            const transactionBalance = trans.type.toLowerCase() === 'income' ? -trans.amount :
                                       trans.type.toLowerCase() === 'expense' ? trans.amount : 0;
        
            lineBalance += transactionBalance;
        
            return {
                x: new Date(trans.date).getTime(),  // Timestamp for the transaction
                y: lineBalance,  // Updated balance
            };
        });
    
        // Add the final point with the current time and the totalBalance
        data.push({
            x: new Date().getTime(),
            y: totalBalance,
        });
    
        // Sort data by timestamp in ascending order (oldest to newest)
        data.sort((a, b) => a.x - b.x);
    
        // Return the sorted data
        return {
            labels: data.map((d) => new Date(d.x).toLocaleString()),  // Date labels from sorted data
            data: data.map((d) => d.y),  // Balance values from sorted data
        };
    };

    const filteredTransactions = filterTransactionsByPeriod(transactions, chartPeriod);
    const lineData = balanceLineGraphData(filteredTransactions);

    console.log('chartData: ', lineData)
    console.log('labels: ', lineData.labels)
    console.log('data: ', lineData.data)

    const chartData = {
        labels: lineData.labels,
        datasets: [
            {
                label: 'Balance',
                data: lineData.data,
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
                // display: false,  // Hide the x-axis labels and line
            },
        },
        plugins: {
            legend: {
                display: false, // Hides the label button
            },
        },
    };

    return (
        <div className={styles.container}>
            <div className={styles.graph}>
                <Line data={chartData} options={chartOptions} />
            </div>
            <div className={styles.chartBtnContainer}>
                {['1D', '1W', '1M', '1Y', 'All'].map((period) => (
                    <Button
                        key={period}
                        rounded
                        className={`${styles.chartBtn} ${chartPeriod === period ? styles.active : ''}`}
                        onClick={() => handleChartButtonClick(period)}
                    >
                        {period}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Chart;
