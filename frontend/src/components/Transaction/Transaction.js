import styles from './Transaction.module.scss';
import incomeImage from '../../assets/images/bringmoney.jpg';
import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import { editIcon, deleteIcon, dollarWastingIcon } from '../../assets/icons/icons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteTransaction,
    updateWallet,
    updateBudget,
    updateTransaction,
} from '../../redux/actions';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { setOverlay } from '../../redux/actions';
import BalanceInput from '../FormInput/BalanceInput';
import NoteInput from '../FormInput/NoteInput';
import reactIcons from '../../assets/icons/reactIcons';

function Transaction({
    transaction,
    setSelectedTransaction,
    color,
    hidden,
    className,
    currency = '$',
}) {
    const classes = `${className} ${styles.transactionForm} ${color ? styles.color : ''} ${hidden ? styles.hidden : ''}`;
    const dispatch = useDispatch();
    const transactionId = transaction._id;
    useEffect(() => {
        dispatch(setOverlay(true))
    }, [])

    const budgets = useSelector((state) => state.budget.budgets) || [];
    const budgetsContainTransactionId = budgets.filter(budget =>
        budget.transactionIds.includes(transactionId)
    );
    const categories = useSelector((state) => state.category.categories) || [];

    const wallets = useSelector((state) => state.wallet.wallets) || [];
    const wallet = wallets.find((wallet) => wallet._id === transaction.walletId) || {};

    // const [isOverlay, setIsOverlay] = useState(true);
    const [editable, setEditable] = useState(false);
    
    const [amount, setAmount] = useState(transaction.amount);
    const [categoryId, setCategoryId] = useState(transaction.categoryId);
    const [note, setNote] = useState(transaction.note);
    
    const closeForm = () => {
        if (!editable) {
            setSelectedTransaction(null);
            setAmount(transaction.amount);
            setNote(transaction.note);
            setEditable(false);
            setCounter(0);
            dispatch(setOverlay(false))
        }
    };

    const [counter, setCounter] = useState(0);
    const [isBalanceFocus, setIsBalanceFocus] = useState(false);
    const [isNoteFocus, setIsNoteFocus] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            event.stopPropagation();
            if (isNoteFocus && ['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) {
                event.preventDefault();
                return;
            }
    
            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    setCounter(prev => (prev + 1) % 2);
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    setCounter(prev => (prev - 1 + 2) % 2);
                    break;
                case 'Enter':
                    event.preventDefault();
                    handleEditConfirm();
                    break;
                case 'Escape':
                    event.preventDefault();
                    editable ? handleCancelEdit() : closeForm();
                    break;
                case 'e':
                    setCounter(0)
                    setEditable(true)
                    break;
                default:
                    break;
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [counter, editable, isNoteFocus]);


    useEffect(() => {
        const focusStates = {
            0: [true, false],
            1: [false, true],
        };

        const [
            balanceFocus,
            noteFocus,
        ] = focusStates[counter] || [];
        setIsBalanceFocus(balanceFocus);
        setIsNoteFocus(noteFocus);
    }, [counter]);


    const category = categories.find((cat) => cat._id === categoryId);

    const updateTransactionData = { amount, categoryId, note };

    const typeIcon = () => {
        const iconProps = { className: `${styles.transactionTypeIcon} ${styles[color]}` };
        return transaction.type.toLowerCase() === 'income' 
            ? <BiSolidPlusCircle {...iconProps} />
            : transaction.type.toLowerCase() === 'expense'
            ? <BiSolidMinusCircle {...iconProps} />
            : null;
    };

    const formattedDate = () => {
        const date = new Date(transaction.date);
        const options = { weekday: 'long' };
        const dayOfWeek = date.toLocaleDateString('en-US', options);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const dayPeriod = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
        const periodText = dayPeriod <= 0 ? '(today)' : dayPeriod === 1 ? `(1 day)` : `(${dayPeriod} days)`;

        return `${dayOfWeek}, ${day}/${month}/${year} ${periodText}`;
    };

    const handleTransactionUpdate = () => {
        const updatedWalletBalance = wallet.balance + transaction.amount - amount;

        dispatch(updateTransaction(updateTransactionData, transactionId));
        dispatch(updateWallet({ balance: updatedWalletBalance }, wallet._id));

        budgets.forEach((budget) => {
            if (budget.walletIds?.includes(transaction.walletId)) {
                const updatedMoneySpend = budget.moneySpend - transaction.amount + amount;
                dispatch(updateBudget({ moneySpend: updatedMoneySpend }, budget._id));
            }
        });
    };

    const handleEditConfirm = (event) => { 
        setEditable(false);
        handleTransactionUpdate();
    };

    const handleCancelEdit = (event) => {
        setEditable(false);
        setAmount(transaction.amount);
        setCategoryId(transaction.categoryId);
        setNote(transaction.note);
    };

    const handleTransactionDelete = () => {
        console.log('budgetsContainTransactionId:', budgetsContainTransactionId);
    
        // Delete the transaction from the database
        dispatch(deleteTransaction(transactionId));
    
        // Calculate updated wallet details
        const isExpense = transaction.type.toLowerCase() === 'expense';
        const updatedWalletBalance = isExpense
            ? wallet.balance + transaction.amount
            : wallet.balance - transaction.amount;
    
        const updatedWalletTransactionIds = wallet.transactionIds.filter(
            (id) => id !== transactionId
        );
    
        // Dispatch the wallet update
        dispatch(updateWallet(
            { balance: updatedWalletBalance, transactionIds: updatedWalletTransactionIds },
            wallet._id
        ));
    
        // Update budgets containing this transaction
        budgetsContainTransactionId.forEach((budget) => {
            const updatedBudgetTransactionIds = budget.transactionIds.filter(
                (id) => id !== transactionId
            );
    
            const budgetUpdates = { transactionIds: updatedBudgetTransactionIds };
    
            // If the transaction is an expense, update the budget's moneySpend
            if (isExpense) {
                budgetUpdates.moneySpend = Math.max(0, budget.moneySpend - transaction.amount);
            }
    
            dispatch(updateBudget(budgetUpdates, budget._id));
        });
    };
    

    const categoryDisplay = () => {
        const categoryColor = category?.color || 'defaultColor';
        const matchedItem = reactIcons.find((item) => item.name === category?.icon);
        return (
            <div className={`${styles.transactionCategory} ${categoryColor ? styles[categoryColor] : ''}`}>
                <div className={styles.categoryIcon}>
                    {matchedItem?.icon || ''}
                </div>
                <div className={styles.categoryName}>
                    {category?.name}
                </div>
            </div>
        );
    };

    const editButtons = () => (
        <div className={styles.transactionBtnContainer}>
            {editable ? (
                <>
                    <button className={styles.transactionBtn} onClick={handleEditConfirm}>
                        <AiOutlineCheckCircle className={styles.confirmIcon} />
                    </button>
                    <button className={styles.transactionBtn} onClick={handleCancelEdit}>
                        <AiOutlineCloseCircle className={styles.closeIcon} />
                    </button>
                </>
            ) : (
                <>
                    {/* <button className={styles.transactionBtn}> */}
                    <button className={styles.transactionBtn} onClick={() => setEditable(true)}>
                        {editIcon({ width: '23px', height: '23px' })}
                    </button>
                    <button className={styles.transactionBtn} onClick={handleTransactionDelete}>
                        {deleteIcon({ width: '26px', height: '26px' })}
                    </button>
                </>
            )}
        </div>
    );

    return (
        <div className={classes}>
            <div className={styles.formOverlay}  onClick={closeForm}>
                <div className={styles.formContainer} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.transactionHeader}>
                        <div className={styles.transactionTypeIcon}>{typeIcon()}</div>
                        <div className={styles.TransactionBalance}>
                            {editable ? (
                                <BalanceInput amount={amount} setAmount={setAmount} isFocusOutside={isBalanceFocus} setIsFocusOutside={setIsBalanceFocus} className={styles.balanceInput} />
                            ) : (
                                `${currency} ${amount.toLocaleString("en-US")}`
                            )}
                        </div>
                    </div>

                    <div className={`${styles.transactionInfo} ${styles[color]}`}>
                        {categoryDisplay()}
                        <div className={styles.transactionImage}>
                            {transaction.type.toLowerCase() === 'expense' ? (
                                <div className={styles.expenseImage}>
                                    {dollarWastingIcon({ width: "140px", height: "140px" })}
                                </div>
                            ) : (
                                <img src={incomeImage} alt="Income" className={styles.incomeImage} />
                            )}
                        </div>
                    </div>

                    <div className={styles.transactionNote}>
                        {editable ? (
                            <NoteInput note={note} setNote={setNote} isFocusOutside={isNoteFocus} setIsFocusOutside={setIsNoteFocus} className={styles.noteInput} />
                        ) : (
                            <span className={styles.noteText}>{note}</span>
                        )}
                    </div>

                    <div className={styles.transactionActions}>
                        <div className={styles.transactionDate}>{formattedDate()}</div>
                        {editButtons()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transaction;
