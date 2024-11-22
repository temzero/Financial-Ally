import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBudget } from '../../redux/actions';
import styles from './EditForm.module.scss';
import Button from '../Button/Button'
import ColorInput from '../FormInput/ColorInput';
import BalanceInput from '../FormInput/BalanceInput';
import DateInput from '../FormInput/DateInput'
import WalletsInput from '../FormInput/WalletsInput';

function EditBudgetForm({
    budgetData,
    formRef,
    showForm,
    setShowForm,

    budgetName,
    setBudgetName,

    budgetMoneyLimit,
    setBudgetMoneyLimit,

    wallets,
    budgetWallets,
    setBudgetWallets,

    budgetFinishDate,
    setBudgetFinishDate,

    budgetColor,
    setBudgetColor,
}) {
    const formattedFinishDate = budgetFinishDate ? new Date(budgetFinishDate).toISOString().split('T')[0] : '';
    const budgetId = budgetData._id;
    const dispatch = useDispatch();
    const [selectedWallets, setSelectedWallets] = useState(budgetWallets);

    const closeForm = useCallback(() => {
        setBudgetName(budgetData.name);
        setBudgetMoneyLimit(budgetData.moneyLimit);
        setSelectedWallets(budgetWallets);
        setBudgetColor(budgetData.color);
        setBudgetFinishDate(budgetData.finishDate)
        setShowForm(false);
    }, [budgetData, setShowForm, setBudgetName, setSelectedWallets, budgetWallets, setBudgetMoneyLimit, setBudgetColor, setBudgetFinishDate]);

    
    const isDataChanged = () => {
        // Compare current form data with initial budgetData to check for changes
        return (
            budgetName !== budgetData.name ||
            budgetMoneyLimit !== budgetData.moneyLimit ||
            JSON.stringify(selectedWallets) !== JSON.stringify(budgetWallets) ||
            budgetFinishDate !== budgetData.finishDate ||
            budgetColor !== budgetData.color
        );
    };

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
        
        const selectedWalletsIds = selectedWallets.map((wallet) => wallet._id);

        const updatedBudgetData = {
            name: budgetName,
            amount: budgetMoneyLimit,
            walletIds: selectedWalletsIds,
            finishDate: budgetFinishDate,
            color: budgetColor,
        };

        dispatch(updateBudget(updatedBudgetData, budgetId));
        setBudgetWallets(selectedWallets)
        setShowForm(false);

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
                                <h2 className={styles.formLabel}>Wallets</h2>
                                <WalletsInput
                                    wallets={wallets}
                                    selectedWallets={selectedWallets}
                                    setSelectedWallets={setSelectedWallets}
                                />
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>Finish Date</h2>
                                <DateInput date={formattedFinishDate} setDate={setBudgetFinishDate} />
                            </div>
                            <div>
                                <ColorInput color={budgetColor} setColor={setBudgetColor}/>
                            </div>
                            <div className={styles.formBtnContainer}>
                                <Button type="submit" simple disabled={!isDataChanged()}>
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
