import styles from './Transaction.module.scss';
import incomeImage from '../../assets/images/bringmoney.jpg';
import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import { editIcon, deleteIcon, dollarWastingIcon } from '../../assets/icons/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteTransaction,
    updateWallet,
    updateBudget,
    updateTransaction,
} from '../../redux/actions';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
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

    const budgets = useSelector((state) => state.budget.budgets) || [];
    const budgetsContainTransactionId = budgets.filter(budget =>
        budget.transactionIds.includes(transactionId)
    );
    const categories = useSelector((state) => state.category.categories) || [];

    const wallets = useSelector((state) => state.wallet.wallets) || [];
    const wallet = wallets.find((wallet) => wallet._id === transaction.walletId) || {};

    const [editable, setEditable] = useState(false);
    const [amount, setAmount] = useState(transaction.amount);
    const [categoryId, setCategoryId] = useState(transaction.categoryId);
    const [note, setNote] = useState(transaction.note);

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
        const updateWalletData = { balance: updatedWalletBalance };

        dispatch(updateTransaction(updateTransactionData, transactionId));
        dispatch(updateWallet(updateWalletData, wallet._id));

        budgets.forEach((budget) => {
            if (budget.walletIds?.includes(transaction.walletId)) {
                const updatedMoneySpend = budget.moneySpend - transaction.amount + amount;
                dispatch(updateBudget({ moneySpend: updatedMoneySpend }, budget._id));
            }
        });
    };

    const handleEditConfirm = (event) => {
        event.stopPropagation();
        setEditable(false);
        handleTransactionUpdate();
    };

    const handleCancelEdit = (event) => {
        event.stopPropagation();
        setEditable(false);
        setAmount(transaction.amount);
        setCategoryId(transaction.categoryId);
        setNote(transaction.note);
    };

    const handleTransactionDelete = () => {
        // Log the budgets containing the transaction
        console.log('budgetsContainTransactionId: ', budgetsContainTransactionId);
    
        // Delete the transaction from the database
        dispatch(deleteTransaction(transactionId));
    
        // Calculate the updated wallet balance after deleting the transaction
        const updatedWalletBalance = transaction.type.toLowerCase() === 'expense'
            ? wallet.balance + transaction.amount
            : wallet.balance - transaction.amount;
    
        // Remove the transaction ID from the wallet's transactionIds
        const updatedWalletTransactionIds = wallet.transactionIds.filter(
            (id) => id !== transactionId
        );
    
        // Prepare the wallet update data
        const updateWalletData = {
            balance: updatedWalletBalance,
            transactionIds: updatedWalletTransactionIds,
        };
    
        // Dispatch the wallet update
        dispatch(updateWallet(updateWalletData, wallet._id));
    
        // Iterate over the budgets that contain this transaction and update them
        budgetsContainTransactionId.forEach((budget) => {
            // Remove the transaction ID from the budget's transactionIds
            const updatedBudgetTransactionIds = budget.transactionIds.filter(
                (id) => id !== transactionId
            );
    
            // Prepare the budget update data
            const updateBudgetData = {
                transactionIds: updatedBudgetTransactionIds,
            };
    
            // Dispatch the budget update
            dispatch(updateBudget(updateBudgetData, budget._id));
    
            // If the transaction is an expense, update the budget's moneySpend
            if (transaction.type.toLowerCase() === 'expense') {
                const updatedMoneySpend = Math.max(0, budget.moneySpend - transaction.amount);
                dispatch(updateBudget({ moneySpend: updatedMoneySpend }, budget._id));
            }
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
            <div className={styles.formOverlay} onClick={() => { setSelectedTransaction(null); setEditable(false); }}>
                <div className={styles.formContainer} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.transactionHeader}>
                        <div className={styles.transactionTypeIcon}>{typeIcon()}</div>
                        <div className={styles.TransactionBalance}>
                            {editable ? (
                                <BalanceInput amount={amount} setAmount={setAmount} className={styles.balanceInput} />
                            ) : (
                                `${currency}${amount.toLocaleString("en-US")}`
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
                            <NoteInput note={note} setNote={setNote} className={styles.noteInput} />
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
