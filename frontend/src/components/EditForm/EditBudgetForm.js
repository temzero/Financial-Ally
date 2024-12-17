import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBudget } from '../../redux/actions';
import { setOverlay } from '../../redux/actions';
import Button from '../Button/Button'
import ColorInput from '../FormInput/ColorInput';
import BalanceInput from '../FormInput/BalanceInput';
import DateInput from '../FormInput/PickADateInput'
import TextInput from '../FormInput/TextInput';
import WalletsInput from '../FormInput/WalletsInput';
import useClickOutside from '../ClickOutside/useClickOutside';

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

    useEffect(() => {dispatch(setOverlay(true))}, [])

    const closeForm = useCallback(() => {
        setBudgetName(budgetData.name);
        setBudgetMoneyLimit(budgetData.moneyLimit);
        setSelectedWallets(budgetWallets);
        setBudgetColor(budgetData.color);
        setBudgetFinishDate(budgetData.finishDate)
        setShowForm(false);
        dispatch(setOverlay(false))
    }, [budgetData, setShowForm, setBudgetName, setSelectedWallets, budgetWallets, setBudgetMoneyLimit, setBudgetColor, setBudgetFinishDate]);

    useClickOutside(formRef, () => closeForm());
    
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
        dispatch(setOverlay(false))
    };

    return (
        showForm && (
            <div className='overlay'>
                <div className='form-container' ref={formRef}>
                    <form onSubmit={handleFormSubmit}>
                        <div className={`form-name background-${budgetColor}`}>
                            <TextInput  className='form-name-input' content={budgetName} setContent={setBudgetName} isFocusOutside={true}/>
                        </div>
                        <div className='form-divider'></div>
                        <div className='form-content'>
                            <div>
                                <h2 className='form-label'>Set Limit Amount</h2>
                                <BalanceInput amount={budgetMoneyLimit} setAmount={setBudgetMoneyLimit}/>
                            </div>
                            <div>
                                <h2 className='form-label'>Wallets</h2>
                                <WalletsInput
                                    wallets={wallets}
                                    selectedWallets={selectedWallets}
                                    setSelectedWallets={setSelectedWallets}
                                />
                            </div>
                            <div>
                                <h2 className='form-label'>Finish Date</h2>
                                <DateInput date={formattedFinishDate} setDate={setBudgetFinishDate} />
                            </div>
                            <div>
                                <ColorInput color={budgetColor} setColor={setBudgetColor}/>
                            </div>
                        </div>
                            <div className='form-btn-container'>
                                <Button type="submit" simple disabled={!isDataChanged()}>
                                    Update
                                </Button>
                            </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default EditBudgetForm;
