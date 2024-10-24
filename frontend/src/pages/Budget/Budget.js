import styles from './Budget.module.scss';
import BudgetItem from './BudgetItem';
import Button from '../../components/Button/Button';
import { useState  } from 'react';


function Budget() {
    const [showForm, setShowForm] = useState(false);

    const handleAddBudget = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <div className={styles.header}>
                <h2 className={styles.title}>Budget</h2>
                <div>
                    <Button s onClick={handleAddBudget}>
                        Add Budget
                    </Button>
                </div>
            </div>

            <div className={styles.budgetContainer}>
                <BudgetItem />
                <BudgetItem />
                <BudgetItem />
                <BudgetItem />
            </div>
        </div>
    )
        
}

export default Budget;
