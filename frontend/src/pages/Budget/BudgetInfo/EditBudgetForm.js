import styles from './BudgetInfo.module.scss';
import Button from '../../../components/Button/Button';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { editBudget } from '../../../redux/actions';

function EditBudgetForm({
    budgetData,
    formRef,
    showForm,
    setShowForm,
    budgetName,
    setBudgetName,
    budgetBalance,
    setBudgetBalance,
    budgetCategory,
    setBudgetCategory,
    budgetColor,
    setBudgetColor,
}) {
    const budgetId = budgetData._id;
    const dispatch = useDispatch();

    const closeForm = useCallback(() => {
        setBudgetName(budgetData.name);
        setBudgetBalance(budgetData.amount);
        setBudgetCategory(budgetData.category);
        setBudgetColor(budgetData.color);
        setShowForm(false);
    }, [budgetData, setShowForm, setBudgetName, setBudgetBalance, setBudgetCategory, setBudgetColor]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                closeForm();
            }
        };

        if (showForm) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showForm, closeForm, formRef]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const updatedBudget = {
            name: budgetName,
            amount: budgetBalance,
            category: budgetCategory,
            color: budgetColor,
        };

        dispatch(editBudget(updatedBudget, budgetId));
        closeForm();
    };

    return (
        showForm && (
            <div className={styles.formOverlay}>
                <div className={styles.formContainer} ref={formRef}>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <input
                                className={styles.formNameInput}
                                type="text"
                                placeholder="Budget Name"
                                value={budgetName}
                                onChange={(e) => setBudgetName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formDivider}></div>
                        <div className={styles.formContent}>
                            <div>
                                <h2 className={styles.formLabel}>Set Limit Amount</h2>
                                <input
                                    className={styles.formInput}
                                    type="number"
                                    placeholder="$"
                                    value={budgetBalance}
                                    onChange={(e) => setBudgetBalance(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>Category</h2>
                                <select
                                    className={`${styles.formInput} ${styles.formInputSelect}`}
                                    value={budgetCategory}
                                    onChange={(e) => setBudgetCategory(e.target.value)}
                                    required
                                >
                                    <option value="Income">Incomes</option>
                                    <option value="Expense">Expenses</option>
                                </select>
                            </div>
                            <div>
                                <div className={styles.colorOptions}>
                                    {['green', 'red', 'blue', 'orange', 'purple', 'rainbow'].map((color) => (
                                        <div
                                            key={color}
                                            className={`${styles.circleOption} ${styles[color]}`}
                                            onClick={() => setBudgetColor(color)}
                                            style={{
                                                border: budgetColor === color ? '4px solid grey' : 'none',
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.formBtnContainer}>
                                <Button type="submit" simple>
                                    Update
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default EditBudgetForm;
