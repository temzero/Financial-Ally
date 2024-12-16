import styles from './Budget.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LuCalendarCheck } from "react-icons/lu";


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
    if (daysLeft > 0) {
        spendPerDay = Math.floor(leftToSpend / daysLeft);
    } else if (daysLeft === 0) {
        spendPerDay = leftToSpend;
    } else if (daysLeft < 0) {
        spendPerDay = leftToSpend;
    }

    if (spendPerDay === -Infinity || spendPerDay === Infinity) {
        spendPerDay = leftToSpend;
        console.log('spend per day: ', spendPerDay);
    }
    const spendPercent = (moneySpend / moneyLimit) * 100;

    const [animatedWidth, setAnimatedWidth] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setAnimatedWidth(spendPercent);
        }, 10);
    }, [spendPercent]);

    const classes = [
        `background-${budgetData.color}`, 
        styles.budgetCard, 
        daysLeft < 0 ? styles.finished : ''
    ].join(' ').trim();

    const handleCardClick = () => {
        navigate(name, { state: { budgetId: _id } });
    };

    return (
        <div key={_id} className={classes} onClick={handleCardClick}>
            <div className={styles.budgetCardContent}>
                <div className={styles.budgetCardHeader}>{name}</div>
                {daysLeft > 0 ? (
                    <div className={styles.budgetCardInfo}>
                        <div className={styles.budgetCardDay}>
                            {daysLeft} days left
                        </div>
                        <div
                            className={styles.budgetCardDay}
                        >{`${currency}${spendPerDay} per day`}</div>
                    </div>
                ) : daysLeft === 0 ? (
                    <div className={styles.budgetCardInfo}>
                        <div className={styles.budgetCardDay}>Final day</div>
                        <div
                            className={styles.budgetCardDay}
                        >{`${currency}${spendPerDay} per day`}</div>
                    </div>
                ) : (
                    <div className={styles.budgetCardInfo}><div className={styles.finishStatus}>Finished<LuCalendarCheck  className={styles.finishIcon}/></div></div>
                )}
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
