import styles from './Budget.module.scss';
import { useNavigate } from 'react-router-dom';


function BudgetCard({ budgetData }) {
    // Destructure the relevant data from budgetData
    const { name, balance, finishDate, _id } = budgetData;
    console.log('budget card Data: ', budgetData)
    const navigate = useNavigate()

    // Calculate days left
    const today = new Date();
    const finish = new Date(finishDate);
    const daysLeft = Math.ceil((finish - today) / (1000 * 60 * 60 * 24)); // Difference in days

    // Money left calculation (example)
    const moneyLeft = balance;
    const moneySpend = balance - moneyLeft // Adjust this logic if needed based on your requirements

    const colorClass = styles[budgetData.color];
    const classes = [colorClass, styles.budgetCard].join(' ');

    const handleCardClick = () => {
        navigate(name, { state: { budgetId: _id } })
   }

    return (
        <div key={_id} className={classes} onClick={handleCardClick}>
            <div className={styles.budgetCardContent}>
                <div className={styles.budgetCardHeader}>{name}</div>
                <div className={styles.budgetCardDay}>{daysLeft > 0 ? daysLeft : 0} Days Left</div>
                <div className={styles.budgetCardDay}>
                    ${moneyLeft.toLocaleString()} Left
                </div>
                <div className={styles.budgetCardBalance}>
                    ${moneySpend.toLocaleString()} / ${balance.toLocaleString()}
                </div>
            </div>
            <div className={styles.progressBar}></div>
        </div>
    );
}

export default BudgetCard;
