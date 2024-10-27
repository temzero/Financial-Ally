import styles from './BudgetInfo.module.scss';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Button from '../../../components/Button/Button';
import EditBudgetForm from './EditBudgetForm';
import DeleteBudgetForm from './DeleteBudgetForm';
import { useSelector } from 'react-redux';

function BudgetInfo() {
    const { state } = useLocation();
    const budgetId = state?.budgetId || '';
    const budgets = useSelector((state) => state.user.budgets);
    const currentBudget = budgets.find(budget => budget._id === budgetId);


    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    // State variables for budget details
    const [budgetName, setBudgetName] = useState('');
    const [budgetBalance, setBudgetBalance] = useState(0);
    const [budgetCategory, setBudgetCategory] = useState('');
    const [budgetColor, setBudgetColor] = useState('');

    const formRef = useRef(null);
    const budgetColorClass = styles[budgetColor];
    const headerClasses = [budgetColorClass, styles.contentHeader].join(' ');

    useEffect(() => {
        // Update the state if currentBudget is found
        if (currentBudget) {
            setBudgetName(currentBudget.name);
            setBudgetBalance(currentBudget.balance);
            setBudgetCategory(currentBudget.category);
            setBudgetColor(currentBudget.color);
        }
    }, [budgetId, showEditForm, showDeleteForm, budgets, currentBudget]);

    const handleShowEditForm = () => {
        setShowEditForm(!showEditForm);
    };

    const handleShowDeleteForm = () => {
        setShowDeleteForm(!showDeleteForm);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>Budget</div>
                <div className={styles.btnContainer}>
                    <Button s className={styles.btn} onClick={handleShowEditForm}>
                        Edit
                    </Button>
                    <Button s className={styles.btn} onClick={handleShowDeleteForm}>
                        Delete
                    </Button>
                </div>
            </div>
            <div className={styles.contentInfo}>
                <div className={headerClasses}>
                    <div className={styles.contentName}>{budgetName}</div>
                </div>
                <div className={styles.contentContent}>
                    <div className={styles.contentBalance}>${budgetBalance.toLocaleString()}</div>
                    <div>
                        <div className={styles.contentSubHeader}>Analysis</div>
                        <div className={styles.contentSubHeader}>Transactions</div>
                        <div className={styles.contentSubHeader}>{budgetCategory}</div>
                    </div>
                </div>
            </div>

            <EditBudgetForm
                budgetData={currentBudget}
                formRef={formRef}

                showForm={showEditForm}
                setShowForm={setShowEditForm}

                budgetName={budgetName}
                setBudgetName={setBudgetName}
                budgetBalance={budgetBalance}
                setBudgetBalance={setBudgetBalance}
                budgetCategory={budgetCategory}
                setBudgetCategory={setBudgetCategory}
                budgetColor={budgetColor}
                setBudgetColor={setBudgetColor}
            />

            <DeleteBudgetForm
                showForm={showDeleteForm}
                setShowForm={setShowDeleteForm}
                formRef={formRef}
                budgetId={budgetId}
            />
        </div>
    );
}

export default BudgetInfo;
