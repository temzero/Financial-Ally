import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import styles from './Transaction.module.scss';
import Button from '../Button/Button';
import DateInput from '../FormInput/DateInput';
import CategoryInput from '../FormInput/CategoryInput';
import WalletInput from '../FormInput/WalletInput';
import BalanceInput from '../FormInput/BalanceInput';
import TextInput from '../FormInput/NoteInput';
import ImageInput from '../FormInput/ImageInput';
import {
    addTransaction,
    updateBudget,
    updateWallet,
} from '../../redux/actions';

function AddTransaction() {
    const user = useSelector((state) => state.user.user);
    const budgets = useSelector((state) => state.budget.budgets);

    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [wallet, setWallet] = useState('');
    const [date, setDate] = useState(''); 
    const [note, setNote] = useState('');
    const [image, setImage] = useState(null);
    // const [imagePreview, setImagePreview] = useState(null);

    const isSubmitAble = Boolean(type && amount && wallet && date);

    const [counter, setCounter] = useState(0);
    const [isBalanceFocus, setIsBalanceFocus] = useState(false);
    const [isCategoryDropdown, setIsCategoryDropdown] = useState(false);
    const [isWalletDropdown, setIsWalletDropdown] = useState(false);
    const [isDateDropdown, setIsDateDropdown] = useState(false);
    const [isNoteFocus, setIsNoteFocus] = useState(false);
    console.log('counter: ', counter)
    // console.log('isBalanceFocus: ', isBalanceFocus)
    // console.log('isCategoryDropdown: ', isCategoryDropdown)
    // console.log('isWalletDropdown: ', isWalletDropdown)
    // console.log('isDateDropdown: ', isDateDropdown)
    // console.log('isNoteFocus: ', isNoteFocus)

    const userId = user._id;
    const dispatch = useDispatch();;

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === '+') {
                setType('Income');
                setCounter(0);
            } else if (event.key === '-') {
                setType('Expense');
                setCounter(0);
            } 
            else if (event.key === 'Enter') {
                event.preventDefault();
                
                if (event.shiftKey) {
                    const submitButton = document.querySelector(`.${styles.addTransactionSubmit}`);
                    if (submitButton) submitButton.click();
                } else {
                    // setCounter((prevCounter) => (prevCounter + 1) % 5);
                }
            }
            // Check if any dropdown is active
            if (isCategoryDropdown || isWalletDropdown || isDateDropdown) {
                return; // Prevent further key handling if a dropdown is active
            }
    
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setCounter((prevCounter) => (prevCounter + 1) % 5);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setCounter((prevCounter) => (prevCounter - 1 + 5) % 5);
            } 
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [counter, type, isCategoryDropdown, isWalletDropdown, isDateDropdown]);
    

    useEffect(() => {
        switch (counter) {
            case 0:
                setIsBalanceFocus(true);
                setIsCategoryDropdown(false);
                setIsWalletDropdown(false);
                setIsDateDropdown(false);
                setIsNoteFocus(false);
                break;
            case 1:
                setIsBalanceFocus(false);
                setIsCategoryDropdown(true);
                setIsWalletDropdown(false);
                setIsDateDropdown(false);
                setIsNoteFocus(false);
                break;
            case 2:
                setIsBalanceFocus(false);
                setIsCategoryDropdown(false);
                setIsWalletDropdown(true);
                setIsDateDropdown(false);
                setIsNoteFocus(false);
                break;
            case 3:
                setIsBalanceFocus(false);
                setIsCategoryDropdown(false);
                setIsWalletDropdown(false);
                setIsDateDropdown(true);
                setIsNoteFocus(false);
                break;
            case 4:
                setIsBalanceFocus(false);
                setIsCategoryDropdown(false);
                setIsWalletDropdown(false);
                setIsDateDropdown(false);
                setIsNoteFocus(true);
                break;
            default:
                break;
        }
    }, [counter]);

    const handleAddTransactionSubmit = async (event) => {
        event.preventDefault();
        let walletBalance = wallet.balance;

        if (type === 'Expense' && walletBalance < amount) {
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
            userId,
        };

        console.log('transactionData: ', transactionData)
        // Create the new transaction and get the transaction ID
        const newTransaction = await dispatch(addTransaction(transactionData));
        const newTransactionId = newTransaction?._id;

        if (!newTransactionId) {
            console.error('Failed to retrieve new transaction ID');
            return;
        }

        // Update wallet balance based on transaction type
        if (type.toLocaleLowerCase() === 'income') {
            walletBalance += amount
        } else if (type.toLocaleLowerCase() === 'expense') {
            walletBalance -= amount
        } 

        const walletUpdatedData = {
            balance: walletBalance,
            transactionIds: [...wallet.transactionIds, newTransactionId],
        };

        dispatch(updateWallet(walletUpdatedData, wallet._id));

        // Update relevant budgets based on transaction type
        budgets.forEach((budget) => {
            const budgetWalletIds = budget.walletIds || [];
            const isWalletInBudget = budgetWalletIds.includes(wallet._id);

            if (!budgetWalletIds.length || isWalletInBudget) {
                if (type.toLocaleLowerCase() === 'expense') {
                    const updatedMoneySpend = budget.moneySpend + amount;
                    const budgetUpdatedData = {
                        moneySpend: updatedMoneySpend,
                        transactionIds: [
                            ...budget.transactionIds,
                            newTransactionId,
                        ],
                    };

                    dispatch(updateBudget(budgetUpdatedData, budget._id));
                }
            }
        });

        setCounter(0);
        setType('');
        setAmount('');
        setCategory('');
        setWallet('');
        // setDate(new Date().toISOString());
        setNote('');
        setImage(null);
        // setImagePreview(null);
    };
    

    return (
        <form
            className={styles.addTransaction}
            onSubmit={handleAddTransactionSubmit}
        >
            <div className={styles.plusMinusContainer}>
                <BiSolidPlusCircle
                    className={`${styles.plusBtn} ${
                        type === 'Income' ? styles.active : ''
                    }`}
                    onClick={() => setType('Income')}
                />
                <BiSolidMinusCircle
                    className={`${styles.minusBtn} ${
                        type === 'Expense' ? styles.active : ''
                    }`}
                    onClick={() => setType('Expense')}
                />
            </div>
            <div className={styles.formContent}>
                <div className={styles.formLabel}>Amount</div>
                <div className={styles.input} onClick={() => setCounter(0)}>
                    <BalanceInput
                        amount={amount}
                        setAmount={setAmount}
                        isFocus={isBalanceFocus}
                    />
                </div>

                <div className={styles.formLabel}>Category</div>
                <div className={styles.input} onClick={() => setCounter(1)}>
                    <CategoryInput
                        category={category}
                        setCategory={setCategory}
                        categoryType={type}
                        isDropdown={isCategoryDropdown}
                        setIsDropdown={setIsCategoryDropdown}
                    />
                </div>

                <div className={styles.formLabel}>Wallet</div>
                <div className={styles.input} onClick={() => setCounter(2)}>
                    <WalletInput
                        wallet={wallet}
                        setWallet={setWallet}
                        isDropdown={isWalletDropdown}
                        setIsDropdown={setIsWalletDropdown}

                    />
                </div>

                <div className={styles.formLabel}>Date</div>
                <div className={styles.input} onClick={() => setCounter(3)}>
                    <DateInput 
                        date={date} 
                        setDate={setDate} 
                        isDropdown={isDateDropdown}
                        setIsDropdown={setIsDateDropdown}

                        counter={counter}
                        setCounter={setCounter}
                    />
                </div>

                {/* <ImageInput
                    image={image}
                    setImage={setImage}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    /> */}

                <div className={styles.formLabelNote}>Note</div>
                <div className={styles.transactionNote} onClick={() => setCounter(4)}>
                    <TextInput
                        note={note}
                        setNote={setNote}
                        isFocus={isNoteFocus}
                        setIsFocus={setIsNoteFocus}
                    />
                </div>

                <div className={styles.addTransactionBtnContainer}>
                    <Button
                        disabled={!isSubmitAble}
                        type="submit"
                        primary
                        rounded
                        className={styles.addTransactionSubmit}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default AddTransaction;
