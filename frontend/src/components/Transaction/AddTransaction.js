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
    const [imagePreview, setImagePreview] = useState(null);
    const [counter, setCounter] = useState(0)

    const [isBalanceFocus, setIsBalanceFocus] = useState(false);
    const [isCategoryDropdown, setIsCategoryDropdown] = useState(false);
    const [isWalletDropdown, setIsWalletDropdown] = useState(false);
    const [isDateDropdown, setIsDateDropdown] = useState(false);
    const [isNoteFocus, setIsNoteFocus] = useState(false);

    const userId = user._id;
    const dispatch = useDispatch();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === '+') {
                setType('Income');
                setCounter(0);
            } else if (event.key === '-') {
                setType('Expense');
                setCounter(0);
            }  else if (event.key === 'Tab') {
                event.preventDefault();
                setCounter((prevCounter) => (prevCounter + 1) % 5);
            } else if (event.key === 'Enter') {
                event.preventDefault();
                const submitButton = document.querySelector(`.${styles.addTransactionSubmit}`);
                if (submitButton) submitButton.click();
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    

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
    }, [counter])

    
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
            category,
            walletId: wallet._id,
            date,
            note,
            image,
            userId,
        };
        // Create the new transaction and get the transaction ID
        console.log('transaction data: ', transactionData)
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
            const isWalletInBudget = budgetWalletIds.includes(wallet);

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

        // Reset form fields
        setType('');
        setAmount('');
        setCategory('');
        setWallet('');
        setDate(new Date().toISOString().split('T')[0]);
        setNote('');
        setImage(null);
        setImagePreview(null);
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
                <BalanceInput
                    amount={amount}
                    setAmount={setAmount}
                    isOutsideFocus={isBalanceFocus}
                />

                <div className={styles.formLabel}>Category</div>
                <CategoryInput
                    categoryName={category}
                    setCategoryName={setCategory}
                    categoryType={type}
                    isDropdownOutside={isCategoryDropdown}
                />

                <div className={styles.formLabel}>Wallet</div>
                <WalletInput
                    wallet={wallet}
                    setWallet={setWallet}
                    isDropdownOutside={isWalletDropdown}
                />

                <div className={styles.formLabel}>Date</div>
                <DateInput 
                    date={date} 
                    setDate={setDate} 
                    isDropdownOutside={isDateDropdown}
                />

                {/* <ImageInput
                    image={image}
                    setImage={setImage}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    /> */}

                <div className={styles.formLabelNote}>Note</div>
                <div className={styles.transactionNote}>
                    <TextInput
                        note={note}
                        setNote={setNote}
                        isOutsideFocus={isNoteFocus}
                        setIsOutsideFocus={setIsNoteFocus}
                    />
                </div>

                <div className={styles.addTransactionBtnContainer}>
                    <Button
                        disabled={!type || !amount || !wallet || !date}
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
