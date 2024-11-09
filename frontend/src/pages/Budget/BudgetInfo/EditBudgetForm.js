import styles from './BudgetInfo.module.scss';
import Button from '../../../components/Button/Button';
import ColorInput from '../../../components/FormInput/ColorInput';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateBudget } from '../../../redux/actions';
import BalanceInput from '../../../components/FormInput/BalanceInput';
import CategoryInput from '../../../components/FormInput/CategoryInput';
import DateInput from '../../../components/FormInput/DateInput'

function EditBudgetForm({
    budgetData,
    formRef,
    showForm,
    setShowForm,
    budgetName,
    setBudgetName,
    budgetMoneyLimit,
    setBudgetMoneyLimit,
    budgetCategory,
    setBudgetCategory,
    budgetFinishDate,
    setBudgetFinishDate,
    budgetColor,
    setBudgetColor,
}) {
    const budgetId = budgetData._id;
    const dispatch = useDispatch();

    const closeForm = useCallback(() => {
        setBudgetName(budgetData.name);
        setBudgetMoneyLimit(budgetData.moneyLimit);
        setBudgetCategory(budgetData.category);
        setBudgetColor(budgetData.color);
        setBudgetFinishDate(budgetData.finishDate)
        setShowForm(false);
    }, [budgetData, setShowForm, setBudgetName, setBudgetMoneyLimit, setBudgetCategory, setBudgetColor, setBudgetFinishDate]);

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

        const updatedBudgetData = {
            name: budgetName,
            amount: budgetMoneyLimit,
            category: budgetCategory,
            color: budgetColor,
        };

        dispatch(updateBudget(updatedBudgetData, budgetId));
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
                            />
                        </div>
                        <div className={styles.formDivider}></div>
                        <div className={styles.formContent}>
                            <div>
                                <h2 className={styles.formLabel}>Set Limit Amount</h2>
                                <BalanceInput amount={budgetMoneyLimit} setAmount={setBudgetMoneyLimit}/>
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>Category</h2>
                                <CategoryInput category={budgetCategory} setCategory={setBudgetCategory}/>
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>Finish Date</h2>
                                <DateInput date={budgetFinishDate} setDate={setBudgetFinishDate} />
                            </div>
                            <div>
                                <ColorInput color={budgetColor} setColor={setBudgetColor}/>
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
