import styles from './Chart.module.scss';
import Button from '../Button/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart } from '@mui/x-charts/LineChart';

function Chart() {
    
    const transactions = useSelector((state) => state.transaction.transactions) || [];
    const [chartPeriod, setChartPeriod] = useState('1D');
    // const {_id, type, amount, category, walletId, updatedAt} = transaction; (fields in each transaction)

    const handleChartButtonClick = (period) => {
        setChartPeriod(period);
    };

    const periodBar = (period) => {
        switch (period) {
            case '1D':
                return (
                <div className={styles.timeLine}>
                    <div></div>
                    <div>4h</div>
                    <div>8h</div>
                    <div>12h</div>
                    <div>16h</div>
                    <div>20h</div>
                    <div></div>
                </div>
                )

            case '1W':
                return (
                <div className={styles.timeLine}>
                    <div>1d</div>
                    <div>2d</div>
                    <div>3d</div>
                    <div>4d</div>
                    <div>5d</div>
                    <div>6d</div>
                    <div>7d</div>
                </div>
                )

            case '1M':
                return (
                <div className={styles.timeLine}>
                    <div></div>
                    <div>5d</div>
                    <div>10h</div>
                    <div>15d</div>
                    <div>20h</div>
                    <div>25h</div>
                    <div></div>
                </div>
                )
            case '1Y':
                return (
                <div className={styles.timeLine}>
                    <div>1m</div>
                    <div>2m</div>
                    <div>3m</div>
                    <div>4m</div>
                    <div>5m</div>
                    <div>6m</div>
                    <div>7m</div>
                    <div>8m</div>
                    <div>9m</div>
                    <div>10m</div>
                    <div>11m</div>
                    <div>12m</div>
                </div>
                )
         
            default:
                return null
        }
    }

    const filterTransactionsByPeriod = (transactions, period) => {
        const now = new Date();
        let filteredTransactions = transactions;
    
        switch (period) {
            case '1D':
                filteredTransactions = transactions.filter((trans) =>
                    new Date(trans.date) >= new Date(now - 24 * 60 * 60 * 1000)
                );
                console.log(`${period} transactions: `, filteredTransactions)
                break;

            case '1W':
                filteredTransactions = transactions.filter((trans) =>
                        new Date(trans.date) >= new Date(now - 7 * 24 * 60 * 60 * 1000)
                );
                console.log(`${period} transactions: `, filteredTransactions)
                break;

            case '1M':
                filteredTransactions = transactions.filter((trans) =>
                        new Date(trans.date) >= new Date(now.setMonth(now.getMonth() - 1))
                );
                console.log(`${period} transactions: `, filteredTransactions)
                break;
            
            case '1Y':
                filteredTransactions = transactions.filter((trans) =>
                        new Date(trans.date) >= new Date(now.setFullYear(now.getFullYear() - 1))
                );
                console.log(`${period} transactions: `, filteredTransactions)
                break;
            
            default:
                console.log(`${period} transactions: `, filteredTransactions)
                break; // 'All' shows all data
        }
        return filteredTransactions;
    };
 
    const processTransactionData = (transactions) => {
        const data = transactions.map((trans) => ({
            x: new Date(trans.updatedAt).getTime(),
            y: trans.amount,
        }));
        
        data.sort((a, b) => a.x - b.x); // Sort by time
        return {
            xAxisData: data.map((d) => d.x),
            seriesData: data.map((d) => d.y),
        };
    };
    
    const filteredTransactions = filterTransactionsByPeriod(transactions, chartPeriod)

    const { xAxisData, seriesData } = processTransactionData(filteredTransactions);
    // console.log('xAxisData:', xAxisData)
    // console.log('seriesData:', seriesData)

    return (
        <div className={styles.container}>
            <div className={styles.graph}>
                <LineChart
                    xAxis={[{ 
                        data: xAxisData,
                        labelFormatter: (value) =>
                            new Date(value).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                            }), // Format dates
                    }]}
                    series={[
                        {
                            data: seriesData,
                        },
                    ]}
                    // xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    // series={[
                    //     {
                    //         data: [0, 2, 3, 4, 5, 6],
                    //     },
                    // ]}
                />
            </div>
            <div>
                {periodBar(chartPeriod)}

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
        </div>
    );
}

export default Chart;
