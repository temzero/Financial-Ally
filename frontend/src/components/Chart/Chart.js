import styles from './Chart.module.scss';
import Button from '../Button/Button';
import { filterTransactionsByPeriod, balanceLineGraphData } from './chartUtils';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components in Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Chart() {
    const transactions = useSelector((state) => state.transaction.transactions) || [];
    const wallets = useSelector((state) => state.wallet.wallets) || [];
    const totalBalance = (wallets || []).reduce((sum, wallet) => sum + wallet.balance, 0);

    const periods = ['1D', '1W', '1M', '1Y', 'All'];

    const [periodCounter, setPeriodCounter] = useState(1);
    const chartPeriod = periods[periodCounter]

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Tab') {
                event.preventDefault();
                setPeriodCounter((prevCounter) => (prevCounter + 1) % 5);
            } else if (event.key === '`') {
                event.preventDefault();
                setPeriodCounter((prevCounter) => {
                    const newCounter = (prevCounter - 1) % 5;
                    return newCounter < 0 ? 4 : newCounter;
                });
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    

    const filteredTransactions = filterTransactionsByPeriod(transactions, chartPeriod);
    const lineData = balanceLineGraphData(filteredTransactions, totalBalance);
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
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: 'rgb(75, 192, 192)',
                pointBorderWidth: 0, 
                pointRadius: 4, 
                pointHoverRadius: 8, 
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
                {periods.map((period, index) => (
                    <Button
                        key={period}
                        rounded
                        className={`${styles.chartBtn} ${chartPeriod === period ? styles.active : ''}`}
                        onClick={() => setPeriodCounter(index)}
                    >
                        {period}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Chart;
