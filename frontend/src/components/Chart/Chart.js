import styles from './Chart.module.scss';
import Button from '../Button/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Chart() {
    const transactions = useSelector((state) => state.transaction.transactions) || {};
    console.log('transactions from chart: ', transactions)
    // const {_id, type, amount, category, walletId, updatedAt} = transaction; (fields in each transaction)

    const [chartPeriod, setChartPeriod] = useState('1D');

    const handleChartButtonClick = (period) => {
        setChartPeriod(period);
    };

    return ( 
        <div className={styles.container}>
            <div className={styles.graph} />
                    <div className={styles.chartBtnContainer}>
                        {['1D', '1W', '1M', '1Y', 'All'].map((period) => (
                            <Button
                                key={period}
                                s
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