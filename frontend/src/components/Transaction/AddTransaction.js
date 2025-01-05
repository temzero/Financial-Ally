import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import styles from './Transaction.module.scss';
import Button from '../Button/Button';
import DateInput from '../FormInput/PickADateInput';
import CategoryInput from '../FormInput/CategoryInput';
import WalletInput from '../FormInput/WalletInput';
import BalanceInput from '../FormInput/BalanceInput';
import NoteInput from '../FormInput/NoteInput';
import { setOverlay } from '../../redux/actions';
import useClickOnlyOutside from '../ClickOutside/useClickOnlyOutside';
import {
    addTransaction,
    updateBudget,
    updateWallet,
} from '../../redux/actions';

function AddTransaction() {
    const user = useSelector((state) => state.user.user);
    const budgets = useSelector((state) => state.budget.budgets);
    const Overlay = useSelector((state) => state.state.isOverlay);
    const dispatch = useDispatch();
    useEffect(() => {dispatch(setOverlay(false))}, []);

    const addTransactionRef = useRef(null);

    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [wallet, setWallet] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');
    const [image, setImage] = useState(null);

    const isSubmitAble = Boolean(type && amount && wallet && date);

    const [counter, setCounter] = useState(0);
    const [isBalanceFocus, setIsBalanceFocus] = useState(false);
    const [isCategoryFocus, setIsCategoryFocus] = useState(false);
    const [isWalletFocus, setIsWalletFocus] = useState(false);
    const [isDateFocus, setIsDateFocus] = useState(false);
    const [isNoteFocus, setIsNoteFocus] = useState(false);

    useClickOnlyOutside(addTransactionRef, () => setCounter(-1));

    useEffect(() => {
        if (Overlay) return; 
        console.log('Overlay: ', Overlay)

        const handleKeyDown = (event) => {
            const { key, shiftKey } = event;
            console.log('Keydown function')
            
            if (key === 'Escape') {
                event.preventDefault();
                setIsNoteFocus(false)
            }
    
            // Prevent Arrow keys when focus is on certain fields
            if (['ArrowDown', 'ArrowUp'].includes(key) && (isCategoryFocus || isWalletFocus || isDateFocus)) {
                event.preventDefault();
                return;
            }
    
            // Handle type selection
            if (!isNoteFocus) {
                if (key === '+') {
                    setType('Income');
                    setCounter(0);
                } else if (key === '-') {
                    setType('Expense');
                    setCounter(0);
                }
            }
    
            // Handle Enter key with Shift or max counter
            if (key === 'Enter' && (shiftKey || counter === 5)) {
                const submitButton = document.querySelector(`.${styles.addTransactionSubmit}`);
                submitButton?.click();
                return;
            }
    
            // Handle ArrowDown and ArrowUp for counter changes
            if (!isCategoryFocus && !isWalletFocus && !isDateFocus) {
                if (key === 'ArrowDown') {
                    event.preventDefault();
                    setCounter((prevCounter) => (prevCounter + 1) % 6);
                    setIsNoteFocus(false);
                } else if (key === 'ArrowUp') {
                    event.preventDefault();
                    setCounter((prevCounter) => (prevCounter - 1 + 6) % 6);
                    setIsNoteFocus(false);
                }
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [
        counter,
        type,
        isCategoryFocus,
        isWalletFocus,
        isDateFocus,
        isNoteFocus,
        Overlay
    ]);

    useEffect(() => {
        const focusStates = {
            0: [true, false, false, false, false],
            1: [false, true, false, false, false],
            2: [false, false, true, false, false],
            3: [false, false, false, true, false],
            4: [false, false, false, false, true],
            5: [false, false, false, false, false],
        };

        const [balance, category, wallet, date, note] = focusStates[counter] || [];
        setIsBalanceFocus(balance);
        setIsCategoryFocus(category);
        setIsWalletFocus(wallet);
        setIsDateFocus(date);
        setIsNoteFocus(note);
    }, [counter, Overlay, type]);

    const handleAddTransactionSubmit = async (event) => {
        event.preventDefault();
        let walletBalance = wallet.balance;

        if (type.toLowerCase() === 'expense' && walletBalance < amount) {
            alert('Not enough money!');
            return null;
        }

        const transactionData = {
            type,
            amount,
            categoryId: category._id,
            walletId: wallet._id,
            date,
            note,
            image,
            userId: user._id,
        };

        const newTransaction = await dispatch(addTransaction(transactionData));
        const newTransactionId = newTransaction?._id;

        if (!newTransactionId) {
            console.error('Failed to retrieve new transaction ID');
            return;
        }

        walletBalance += type.toLowerCase() === 'income' ? amount : -amount;

        const walletUpdatedData = {
            balance: walletBalance,
            transactionIds: [...wallet.transactionIds, newTransactionId],
        };

        dispatch(updateWallet(walletUpdatedData, wallet._id));

        budgets.forEach((budget) => {
            if (!budget.walletIds?.length || budget.walletIds.includes(wallet._id)) {
                if (type.toLowerCase() === 'expense') {
                    dispatch(updateBudget({
                        moneySpend: budget.moneySpend + amount,
                        transactionIds: [...budget.transactionIds, newTransactionId],
                    }, budget._id));
                }
            }
        });

        setCounter(0);
        setType('');
        setAmount('');
        setCategory('');
        setWallet('');
        setDate('');
        setNote('');
        setImage(null);
    };

    return (
        <form
            className={styles.addTransaction}
            onSubmit={handleAddTransactionSubmit}
            ref={addTransactionRef}
        >
            <div className={styles.plusMinusContainer}>
                <BiSolidPlusCircle
                    className={`${styles.typeButton} ${type.toLowerCase() === 'income' ? 'primary-green' : 'text-defaultColor'}`}
                    onClick={() => setType('Income')}
                />
                <BiSolidMinusCircle
                    className={`${styles.typeButton} ${type.toLowerCase() === 'expense' ? 'primary-red' : 'text-defaultColor'}`}
                    onClick={() => setType('Expense')}
                />
            </div>
            <div className={styles.formContent}>
                <div className={`${styles.formLabel} ${counter === 0 ? styles.focus : ''}`}>Amount</div>
                <div onClick={() => setCounter(0)}>
                    <BalanceInput
                        amount={amount}
                        setAmount={setAmount}
                        isFocusOutside={isBalanceFocus}
                    />
                </div>

                <div className={`${styles.formLabel} ${counter === 1 ? styles.focus : ''}`}>Category</div>
                <div onClick={() => setCounter(1)}>
                    <CategoryInput
                        category={category}
                        setCategory={setCategory}
                        categoryType={type}
                        isFocusOutside={isCategoryFocus}
                        setIsFocusOutside={setIsCategoryFocus}
                    />
                </div>

                <div className={`${styles.formLabel} ${counter === 2 ? styles.focus : ''}`}>Wallet</div>
                <div onClick={() => setCounter(2)}>
                    <WalletInput
                        wallet={wallet}
                        setWallet={setWallet}
                        isFocusOutside={isWalletFocus}
                        setIsFocusOutside={setIsWalletFocus}
                    />
                </div>

                <div className={`${styles.formLabel} ${counter === 3 ? styles.focus : ''}`}>Date</div>
                <div onClick={() => setCounter(3)}>
                    <DateInput 
                        date={date} 
                        setDate={setDate} 
                        isFocusOutside={isDateFocus}
                        setIsFocusOutside={setIsDateFocus}
                    />
                </div>

                <div className={`${styles.formLabelNote} ${counter === 4 ? styles.focus : ''}`}>Note</div>
                <div className={styles.transactionNote} onClick={() => setCounter(4)}>
                    <NoteInput
                        note={note}
                        setNote={setNote}
                        isFocusOutside={isNoteFocus}
                        setIsFocusOutside={setIsNoteFocus}
                    />
                </div>

                <div className={styles.addTransactionBtnContainer}>
                    <Button
                        type="submit"
                        primary
                        rounded
                        disabled={!isSubmitAble}
                        className={`${styles.addTransactionSubmit} ${counter === 5 ? styles.hover : ''}`}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default AddTransaction;
