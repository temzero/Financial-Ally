import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBudget } from '../../redux/actions';
import Button from '../../components/Button/Button';
import DateInput from '../../components/FormInput/PickADateInput';
import BalanceInput from '../../components/FormInput/BalanceInput';
import TextInput from '../../components/FormInput/TextInput';
import WalletsInput from '../../components/FormInput/WalletsInput';
import ColorInput from '../../components/FormInput/ColorInput';
import useClickOutside from '../../components/ClickOutside/useClickOutside';

function AddBudgetForm({ showForm, setShowForm, formRef, userId, wallets }) {
    const dispatch = useDispatch();

    const [budgetName, setBudgetName] = useState('');
    const [moneyLimit, setMoneyLimit] = useState('');
    const [selectedWallets, setSelectedWallets] = useState([]);
    const [type, setType] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [finishDate, setFinishDate] = useState(new Date().toISOString().split('T')[0]);
    const [budgetColor, setBudgetColor] = useState('');

    const [counter, setCounter] = useState(0);
    const [isBudgetNameFocus, setIsBudgetNameFocus] = useState(false);
    const [isMoneyLimitFocus, setIsMoneyLimitFocus] = useState(false);
    const [isWalletsFocus, setIsWalletsFocus] = useState(false);
    const [isStartDateFocus, setIsStartDateFocus] = useState(false);
    const [isFinishDateFocus, setIsFinishDateFocus] = useState(false);
    const [isColorFocus, setIsColorFocus] = useState(false);
    const [isSubmitFocus, setIsSubmitFocus] = useState(false);

    const isFormComplete =
    budgetName &&
    moneyLimit &&
    startDate &&
    finishDate &&
    budgetColor &&
    new Date(finishDate).toISOString().split('T')[0] > new Date(startDate).toISOString().split('T')[0];

    const closeForm = useCallback(() => {
        setBudgetName('');
        setMoneyLimit('');
        setSelectedWallets(wallets);
        setType('');
        setStartDate(new Date().toISOString().split('T')[0]);
        setFinishDate('');
        setBudgetColor('');
        setShowForm(false);
        setCounter(0);
    }, [setShowForm, wallets]);

    useClickOutside(
        formRef,
        () => {
            if (!isWalletsFocus && !isStartDateFocus && !isFinishDateFocus) {
                closeForm();
            } else {
                setIsWalletsFocus(false)
                setIsStartDateFocus(false)
                setIsFinishDateFocus(false)
            }
        }
    );

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isWalletsFocus || isStartDateFocus || isFinishDateFocus) {
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    return;
                }
            }

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setCounter((prevCounter) => (prevCounter + 1) % 7);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setCounter((prevCounter) => (prevCounter - 1 + 7) % 7);
            } else if (event.key === 'Enter') {
                console.log('Enter: ', event.key)
                console.log('isSubmitFocus: ', isSubmitFocus)
                console.log('isFormComplete: ', isFormComplete)

                if (isSubmitFocus && isFormComplete) {
                    const submitButton = document.querySelector(`.submit-button`);
                    if (submitButton) submitButton.click();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [counter, isBudgetNameFocus, isMoneyLimitFocus, isWalletsFocus, isStartDateFocus, isFinishDateFocus, isColorFocus]);

    useEffect(() => {
        const focusStates = {
            0: [true, false, false, false, false, false, false],
            1: [false, true, false, false, false, false, false],
            2: [false, false, true, false, false, false, false],
            3: [false, false, false, true, false, false, false],
            4: [false, false, false, false, true, false, false],
            5: [false, false, false, false, false, true, false],
            6: [false, false, false, false, false, false, true],
        };

        const [
            budgetNameFocus,
            moneyLimitFocus,
            walletsFocus,
            startDateFocus,
            finishDateFocus,
            colorFocus,
            submitFocus,
        ] = focusStates[counter] || [];
        setIsBudgetNameFocus(budgetNameFocus);
        setIsMoneyLimitFocus(moneyLimitFocus);
        setIsWalletsFocus(walletsFocus);
        setIsStartDateFocus(startDateFocus);
        setIsFinishDateFocus(finishDateFocus);
        setIsColorFocus(colorFocus);
        setIsSubmitFocus(submitFocus);
    }, [counter]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const selectedWalletsIds = selectedWallets.map((wallet) => wallet._id);

        const newBudget = {
            name: budgetName,
            moneyLimit,
            walletIds: selectedWalletsIds,
            type,
            startDate,
            finishDate,
            color: budgetColor,
            userId,
        };

        dispatch(addBudget(newBudget));
        closeForm();
    };

    return (
        showForm && (
            <div className='overlay'>
                <div className='form-container' ref={formRef}>
                    <form onSubmit={handleFormSubmit}>
                        <div
                            className={`form-name background-${budgetColor}`}
                            onClick={() => setCounter(0)}
                        >
                            <TextInput
                                className='form-name-input'
                                content={budgetName}
                                setContent={setBudgetName}
                                isFocusOutside={isBudgetNameFocus}
                                placeholder="Enter budget Name"
                            />
                        </div>
                        <div className='form-content'>
                            <div onClick={() => setCounter(1)}>
                                <h2 className={`form-label ${counter === 1 ? 'focus' : ''}`}>
                                    Set Limit Amount
                                </h2>
                                <BalanceInput
                                    amount={moneyLimit}
                                    setAmount={setMoneyLimit}
                                    isFocusOutside={isMoneyLimitFocus}
                                />
                            </div>
                            <div onClick={() => setCounter(2)}>
                                <h2  className={`form-label ${counter === 2 ? 'focus' : ''}`}>Wallets</h2>
                                <WalletsInput
                                    wallets={wallets}
                                    selectedWallets={selectedWallets}
                                    setSelectedWallets={setSelectedWallets}
                                    isFocusOutside={isWalletsFocus}
                                    setIsFocusOutside={setIsWalletsFocus}
                                />
                            </div>
                            <div onClick={() => setCounter(3)}>
                                <h2 className={`form-label ${counter === 3 ? 'focus' : ''}`}>Start Date</h2>
                                <DateInput
                                    date={startDate}
                                    setDate={setStartDate}
                                    isFocusOutside={isStartDateFocus}
                                    setIsFocusOutside={setIsStartDateFocus}

                                />
                            </div>
                            <div onClick={() => setCounter(4)}>
                                <h2 className={`form-label ${counter === 4 ? 'focus' : ''}`}>
                                    Finish Date
                                </h2>
                                <DateInput
                                    date={finishDate}
                                    setDate={setFinishDate}
                                    isFocusOutside={isFinishDateFocus}
                                    setIsFocusOutside={setIsFinishDateFocus}
                                />
                            </div>
                            <div  onClick={() => setCounter(5)}>
                                <ColorInput
                                    setColor={setBudgetColor}
                                    isFocusOutside={isColorFocus}
                                    setIsFocusOutside={setIsColorFocus}
                                />
                            </div>
                        </div>
                            <div className='form-btn-container'  onClick={() => setCounter(6)}>
                                <Button
                                    type="submit"
                                    simple
                                    disabled={!isFormComplete}
                                    className={`submit-button ${counter === 6 ? 'clickable' : ''}`}

                                >
                                    Add Budget
                                </Button>
                            </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default AddBudgetForm;
