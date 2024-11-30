import styles from './Budget.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function BudgetCard({ budgetData, currency = '$' }) {
    // Destructure the relevant data from budgetData
    const { name, moneyLimit = 0, moneySpend, finishDate, _id } = budgetData;
    const navigate = useNavigate();

    // Calculate days left
    const today = new Date();
    const finish = new Date(finishDate);
    const daysLeft = Math.ceil((finish - today) / (1000 * 60 * 60 * 24)); 

    // Money left calculation (example)
    const leftToSpend = moneyLimit - moneySpend;
    let spendPerDay = Math.floor(leftToSpend / daysLeft);
    if (spendPerDay === -Infinity || spendPerDay === Infinity) {
        spendPerDay = leftToSpend
        console.log('spend per day: ', spendPerDay)
    }
    const spendPercent = (moneySpend / moneyLimit) * 100;

    const [animatedWidth, setAnimatedWidth] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setAnimatedWidth(spendPercent);
        }, 10); 
    }, [spendPercent]);

    const colorClass = styles[budgetData.color];
    const classes = [colorClass, styles.budgetCard].join(' ');

    const handleCardClick = () => {
        navigate(name, { state: { budgetId: _id } });
    };

    return (
        <div key={_id} className={classes} onClick={handleCardClick}>
            <div className={styles.budgetCardContent}>
                <div className={styles.budgetCardHeader}>{name}</div>
                <div className={styles.budgetCardDay}>
                {daysLeft === 0 ? (
                    "Final day"
                ) : daysLeft < 0 ? (
                    "Finished"
                ) : (
                    `${daysLeft} days`
                )}
                </div>
                <div className={styles.budgetCardDay}>
                    {spendPerDay !== undefined && spendPerDay !== -Infinity
                        ? `${currency}${spendPerDay} per day`
                        : ''}
                </div>
                {moneyLimit !== undefined && moneySpend !== undefined ? (
                    <div className={styles.budgetCardMoneyLimit}>
                        <span>{currency}</span>
                        <span>{moneySpend.toLocaleString()}</span>
                        <span>/</span>
                        <span>{moneyLimit.toLocaleString()}</span>
                    </div>
                ) : (
                    <div className={styles.budgetCardMoneyLimit}>
                        {'Money Limit information unavailable'}
                    </div>
                )}
            </div>
            <div
                className={styles.progressBar}
                style={{
                    width: `${animatedWidth}%`,
                    backgroundColor: animatedWidth > 100 ? 'red' : '',
                }}
            ></div>
        </div>
    );
}

export default BudgetCard;
