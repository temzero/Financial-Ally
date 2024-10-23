import styles from './Budget.module.scss';
import BudgetItem from './BudgetItem';
import Button from '../../components/Button/Button';
import { useEffect, useState, useRef } from 'react';


function Budget() {
    const [showForm, setShowForm] = useState(false);

    // State for form values
    const [budgetName, setBudgetName] = useState('');
    const [balance, setBalance] = useState('');
    const [budgetType, setBudgetType] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const handleAddBudget = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <div className={styles.header}>
                <h2 className={styles.title}>Budget</h2>
                <div>
                    <Button primary onClick={handleAddBudget}>
                        Add budget
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
