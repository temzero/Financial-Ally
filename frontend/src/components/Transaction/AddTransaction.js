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
    const [date, setDate] = useState(''); // Default to today
    const [note, setNote] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    console.log('wallet: ', wallet);

    const userId = user._id;
    const balanceInputRef = useRef(null);
    const categoryInputRef = useRef(null);
    const walletInputRef = useRef(null);
    const dateInputRef = useRef(null);
    const noteInputRef = useRef(null);
    const submitButtonRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const focusBalanceInput = () => {
            if (balanceInputRef.current) {
                balanceInputRef.current.focus(); // Focus the input
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === '+') {
                setType('Income'); // Trigger "Income" type
                focusBalanceInput();
            } else if (event.key === '-') {
                setType('Expense'); // Trigger "Expense" type
                focusBalanceInput();
            } else if (event.key === 'Enter') {
                // Trigger form submission when Enter is pressed
                const submitButton = document.querySelector(
                    `.${styles.addTransactionSubmit}`
                );
                if (submitButton) {
                    submitButton.click(); // Programmatically click the submit button
                }
            } else if (event.key === 'Tab') {
                // Prevent default tabbing behavior to control focus manually
                event.preventDefault();

                // Check which field is currently focused and move to the next input
                if (document.activeElement === balanceInputRef.current) {
                    categoryInputRef.current?.focus();
                } else if (
                    document.activeElement === categoryInputRef.current
                ) {
                    walletInputRef.current?.focus();
                } else if (document.activeElement === walletInputRef.current) {
                    dateInputRef.current?.focus();
                } else if (document.activeElement === dateInputRef.current) {
                    noteInputRef.current?.focus();
                } else if (document.activeElement === noteInputRef.current) {
                    submitButtonRef.current?.focus(); // Focus on submit button
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Empty dependency array to set up the listener once

    const handleAddTransactionSubmit = async (event) => {
        event.preventDefault();

        const now = new Date().toISOString();
        const splitNow = now.split('T')[1];
        const combinedDateTime = `${date}T${splitNow}`;

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
            date: combinedDateTime,
            note,
            image,
            userId,
        };
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
                    ref={balanceInputRef}
                />

                <div className={styles.formLabel}>Category</div>
                <CategoryInput
                    categoryName={category}
                    setCategoryName={setCategory}
                    categoryType={type}
                    ref={categoryInputRef}
                />

                <div className={styles.formLabel}>Wallet</div>
                <WalletInput
                    wallet={wallet}
                    setWallet={setWallet}
                    ref={walletInputRef}
                />

                <div className={styles.formLabel}>Date</div>
                <DateInput date={date} setDate={setDate} ref={dateInputRef} />

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
                        ref={noteInputRef}
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
