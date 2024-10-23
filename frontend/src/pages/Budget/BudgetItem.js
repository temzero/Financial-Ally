import styles from './Budget.module.scss';

function BudgetItem(budgetData) {
    return (
        <div className={styles.budgetItem}>
            <div className={styles.budgetItemHeader}>{budgetData.name}</div>
            <div className={styles.budgetItemBalance}>{budgetData.balance}</div>
            <div className={styles.budgetItemHeader}>Name</div>
            <div className={styles.budgetItemHeader}>Day left</div>
            <div className={styles.budgetItemHeader}>Money left</div>
            <div className={styles.budgetItemBalance}>Balance</div>
        </div>
    )
        
}

export default BudgetItem;
