import styles from './Budget.module.scss';
import Button from '../../components/Button/Button';
import DateInput from '../../components/FormInput/PickADateInput';
import BalanceInput from '../../components/FormInput/BalanceInput';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBudget } from '../../redux/actions';
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
    const [startDate, setStartDate] = useState(
        new Date().toISOString().split('T')[0]
    );
    const [finishDate, setFinishDate] = useState('');
    const [budgetColor, setBudgetColor] = useState('');

    const [counter, setCounter] = useState(0);
    const [isBudgetNameFocus, setIsBudgetNameFocus] = useState(false);
    const [isMoneyLimitFocus, setIsMoneyLimitFocus] = useState(false);
    const [isWalletsFocus, setIsWalletsFocus] = useState(false);
    const [isStartDateFocus, setIsStartDateFocus] = useState(false);
    const [isFinishDateFocus, setIsFinishDateFocus] = useState(false);
    console.log('BudgerForm counter: ', counter);

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

    useClickOutside(formRef, () => closeForm());

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
                setCounter((prevCounter) => (prevCounter + 1) % 5);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setCounter((prevCounter) => (prevCounter - 1 + 5) % 5);
            } else if (event.key === 'Enter') {
                if (counter === 4) {
                    const submitButton = document.querySelector(
                        `.${styles.formBtnContainer} button`
                    );
                    if (submitButton) submitButton.click();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [counter, isWalletsFocus, isStartDateFocus, isFinishDateFocus]);

    useEffect(() => {
        const focusStates = {
            0: [true, false, false, false, false],
            1: [false, true, false, false, false],
            2: [false, false, true, false, false],
            3: [false, false, false, true, false],
            4: [false, false, false, false, true],
        };

        const [
            budgetNameFocus,
            moneyLimitFocus,
            walletsFocus,
            startDateFocus,
            finishDateFocus,
        ] = focusStates[counter] || [];
        setIsBudgetNameFocus(budgetNameFocus);
        setIsMoneyLimitFocus(moneyLimitFocus);
        setIsWalletsFocus(walletsFocus);
        setIsStartDateFocus(startDateFocus);
        setIsFinishDateFocus(finishDateFocus);
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

    const isFormComplete =
        budgetName &&
        moneyLimit &&
        startDate &&
        finishDate &&
        budgetColor &&
        new Date(finishDate) > new Date(startDate);

    return (
        showForm && (
            <div className={styles.formOverlay}>
                <div className={styles.formContainer} ref={formRef}>
                    <form onSubmit={handleFormSubmit}>
                        <div
                            className={`${styles.namePlate} ${styles[budgetColor]}`}
                            onClick={() => setCounter(0)}
                        >
                            <TextInput
                                className={styles.formNameInput}
                                content={budgetName}
                                setContent={setBudgetName}
                                isFocusOutside={isBudgetNameFocus}
                                placeholder="Enter budget Name"
                            />
                        </div>
                        <div className={styles.formContent}>
                            <div onClick={() => setCounter(1)}>
                                <h2 className={styles.formLabel}>
                                    Set Limit Amount
                                </h2>
                                <BalanceInput
                                    amount={moneyLimit}
                                    setAmount={setMoneyLimit}
                                    isFocusOutside={isMoneyLimitFocus}
                                />
                            </div>
                            <div onClick={() => setCounter(2)}>
                                <h2 className={styles.formLabel}>Wallets</h2>
                                <WalletsInput
                                    wallets={wallets}
                                    selectedWallets={selectedWallets}
                                    setSelectedWallets={setSelectedWallets}
                                    isFocusOutside={isWalletsFocus}
                                    setIsFocusOutside={setIsWalletsFocus}
                                />
                            </div>
                            <div onClick={() => setCounter(3)}>
                                <h2 className={styles.formLabel}>Start Date</h2>
                                <DateInput
                                    date={startDate}
                                    setDate={setStartDate}
                                    isFocusOutside={isStartDateFocus}
                                />
                            </div>
                            <div onClick={() => setCounter(4)}>
                                <h2 className={styles.formLabel}>
                                    Finish Date
                                </h2>
                                <DateInput
                                    date={finishDate}
                                    setDate={setFinishDate}
                                    isFocusOutside={isFinishDateFocus}
                                />
                            </div>
                            <div>
                                <ColorInput
                                    color={budgetColor}
                                    setColor={setBudgetColor}
                                />
                            </div>
                            <div className={styles.formBtnContainer}>
                                <Button
                                    type="submit"
                                    simple
                                    disabled={!isFormComplete}
                                >
                                    Add Budget
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default AddBudgetForm;
