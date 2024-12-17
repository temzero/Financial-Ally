import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateBudget } from '../../../redux/actions';
import Button from '../../../components/Button/Button';
import ColorInput from '../../../components/FormInput/ColorInput';
import BalanceInput from '../../../components/FormInput/BalanceInput';
import DateInput from '../../../components/FormInput/DateInput'
import TypeInput from '../../../components/FormInput/TypeInput';

function EditBudgetForm({
    budgetData,
    formRef,
    showForm,
    setShowForm,

    budgetName,
    setBudgetName,

    budgetMoneyLimit,
    setBudgetMoneyLimit,

    budgetType,
    setBudgetType,

    budgetFinishDate,
    setBudgetFinishDate,

    budgetColor,
    setBudgetColor,
}) {

    const formattedFinishDate = budgetFinishDate ? new Date(budgetFinishDate).toISOString().split('T')[0] : '';
    const budgetId = budgetData._id;
    const dispatch = useDispatch();

    const closeForm = useCallback(() => {
        setBudgetName(budgetData.name);
        setBudgetMoneyLimit(budgetData.moneyLimit);
        setBudgetType(budgetData.category);
        setBudgetColor(budgetData.color);
        setBudgetFinishDate(budgetData.finishDate)
        setShowForm(false);
    }, [budgetData, setShowForm, setBudgetName, setBudgetMoneyLimit, setBudgetType, setBudgetColor, setBudgetFinishDate]);

    const isDataChanged = () => {
        // Compare current form data with initial budgetData to check for changes
        return (
            budgetName !== budgetData.name ||
            budgetMoneyLimit !== budgetData.moneyLimit ||
            budgetType !== budgetData.category ||
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

        const updatedBudgetData = {
            name: budgetName,
            amount: budgetMoneyLimit,
            category: budgetType,
            finishDate: budgetFinishDate,
            color: budgetColor,
        };

        dispatch(updateBudget(updatedBudgetData, budgetId));
        setShowForm(false);
    };

    return (
        showForm && (
            <div className='overlay'>
                <div className='form-container' ref={formRef}>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <input
                                className='form-name-input'
                                type="text"
                                placeholder="Budget Name"
                                value={budgetName}
                                onChange={(e) => setBudgetName(e.target.value)}
                            />
                        </div>
                        <div className='form-divider'></div>
                        <div className='form-content'>
                            <div>
                                <h2 className='form-label'>Set Limit Amount</h2>
                                <BalanceInput amount={budgetMoneyLimit} setAmount={setBudgetMoneyLimit}/>
                            </div>
                            <div>
                                <h2 className='form-label'>Type</h2>
                                <TypeInput type={budgetType} setType={setBudgetType}/>
                            </div>
                            <div>
                                <h2 className='form-label'>Finish Date</h2>
                                <DateInput date={formattedFinishDate} setDate={setBudgetFinishDate} />
                            </div>
                            <div>
                                <ColorInput color={budgetColor} setColor={setBudgetColor}/>
                            </div>
                            <div className='form-btn-container'>
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
