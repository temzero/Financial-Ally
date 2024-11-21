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
// import CategoryInput from '../FormInput/CategoryInput';
import NoteInput from '../FormInput/NoteInput';
import iconItems from '../../assets/icons/reactIcons';

function Transaction({
    transaction,
    setSelectedTransaction,
    color,
    hidden,
    className,
    currency = '$',
}) {
    
    let classes = `
    ${className} 
    ${styles.transactionForm} 
    ${color ? styles.color : ''}
    ${hidden ? styles.hidden : ''}
    `;
    const dispatch = useDispatch();
    const budgets = useSelector((state) => state.budget.budgets) || [];
    const categories = useSelector((state) => state.category.categories) || [];
    const wallets = useSelector((state) => state.wallet.wallets) || [];
    const wallet = wallets.find((wallet) => wallet._id === transaction.walletId) || {};

    const [editable, setEditable] = useState(false);
    const [amount, setAmount] = useState(transaction.amount);
    const [category, setCategory] = useState(transaction.category);
    const [note, setNote] = useState(transaction.note);;

    const updateTransactionData = {
        amount,
        category,
        note,
    };

    const typeIcon = () => {
        if (transaction.type.toLowerCase() === 'income') {
            return (
                <BiSolidPlusCircle
                    className={`${styles.transactionTypeIcon} ${styles[color]}`}
                />
            );
        } else if (transaction.type.toLowerCase() === 'expense') {
            return (
                <BiSolidMinusCircle
                    className={`${styles.transactionTypeIcon} ${styles[color]}`}
                />
            );
        } else {
            return null;
        }
    };

    const formattedDate = () => {
        const date = new Date(transaction.date);
        const options = { weekday: 'long' };
        const dayOfWeek = date.toLocaleDateString('en-US', options);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${dayOfWeek}, ${day}/${month}/${year}`;
    };

    const editButtons = () => {
        return (
            <div className={styles.transactionBtnContainer}>
                {editable ? (
                    <>
                        <button
                            className={styles.transactionBtn}
                            onClick={handleEditConfirm}
                        >
                            <AiOutlineCheckCircle
                                className={styles.confirmIcon}
                            />
                        </button>
                        <button
                            className={styles.transactionBtn}
                            onClick={handleCancelEdit}
                        >
                            <AiOutlineCloseCircle
                                className={styles.closeIcon}
                            />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className={styles.transactionBtn}
                            onClick={onEditButtonClicked}
                        >
                            {editIcon({ width: '23px', height: '23px' })}
                        </button>
                        <button
                            className={styles.transactionBtn}
                            onClick={handleTransactionDelete}
                        >
                            {deleteIcon({ width: '26px', height: '26px' })}
                        </button>
                    </>
                )}
            </div>
        );
    };

    const updateData = () => {
        const updatedWalletBalance =
            wallet.balance + transaction.amount - amount;
        const updateWalletData = { balance: updatedWalletBalance };
        dispatch(updateTransaction(updateTransactionData, transaction._id));
        dispatch(updateWallet(updateWalletData, wallet._id));

        budgets.forEach((budget) => {
            const budgetWalletIds = budget.walletIds || [];
            const isWalletInBudget = budgetWalletIds.includes(
                transaction.walletId
            );

            if (!budgetWalletIds.length || isWalletInBudget) {
                const updatedMoneySpend =
                    budget.moneySpend - transaction.amount + amount;
                const budgetUpdatedData = {
                    moneySpend: updatedMoneySpend,
                };
                dispatch(updateBudget(budgetUpdatedData, budget._id));
            }
        });
    };

    const onEditButtonClicked = (event) => {
        event.stopPropagation();
        setEditable(true);
    };

    const handleEditConfirm = (event) => {
        event.stopPropagation();
        setEditable(false);
        // setSelectedTransaction(null);
        updateData();
    };

    const handleCancelEdit = (event) => {
        event.stopPropagation();
        setEditable(false);
        // setSelectedTransaction(null);

        setAmount(transaction.amount);
        setCategory(transaction.category);
        setNote(transaction.note);
    };

    const handleTransactionDelete = () => {
        console.log('Transaction Delete');
        dispatch(deleteTransaction(transaction._id));
        console.log('Transaction Type: ', transaction.type);

        let updatedWalletBalance;
        if (transaction.type.toLowerCase() === 'income') {
            updatedWalletBalance = wallet.balance - transaction.amount;
        } else {
            updatedWalletBalance = wallet.balance + transaction.amount;
        }
        
        const updateWalletData = { balance: updatedWalletBalance };

        dispatch(updateTransaction(updateTransactionData, transaction._id));
        dispatch(updateWallet(updateWalletData, wallet._id));


        budgets.forEach((budget) => {
            const budgetWalletIds = budget.walletIds || [];
            const isWalletInBudget = budgetWalletIds.includes(
                transaction.walletId
            );

            if (!budgetWalletIds.length || isWalletInBudget) {
                const updatedMoneySpend =
                    budget.moneySpend - transaction.amount;
                const budgetUpdatedData = {
                    moneySpend: updatedMoneySpend,
                };
                dispatch(updateBudget(budgetUpdatedData, budget._id));
            }
        });
    };

    const handleClickOutside = (event) => {
        event.stopPropagation();
        setSelectedTransaction(null);
        setEditable(false);

        setAmount(transaction.amount);
        setCategory(transaction.category);
        setNote(transaction.note);
    };

    const categoryIcon = (categoryName) => {
        const category = categories.find((cat) => cat.name === categoryName);
        const categoryColor = category ? category.color : 'defaultColor';
        const categoryIconName = category ? category.icon : '?';
    
        // Match the icon from iconItems
        const matchedItem = iconItems.find((item) => item.name === categoryIconName);
    
        return (
            // <div className={`${styles.transactionCategoryIcon} ${styles[categoryColor]}`}>
            <div className={styles.transactionCategoryIcon}>
                {matchedItem ? matchedItem.icon : ''}
            </div>
        );
    };

    return (
        <div className={classes}>
            <div className={styles.formOverlay} onClick={handleClickOutside}>
                <div
                    className={styles.formContainer}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.transactionHeader}>
                        <div className={styles.transactionTypeIcon}>
                            {typeIcon()}
                        </div>
                        <div className={styles.TransactionBalance}>
                            {editable ? (
                                <BalanceInput
                                    amount={amount}
                                    setAmount={setAmount}
                                    className={styles.balanceInput}
                                />
                            ) : (
                                `${currency}${amount.toLocaleString("en-US")}`
                            )}
                        </div>
                    </div>

                    <div
                        className={`${styles.transactionInfo} ${
                            styles[`${color}`]
                        }`}
                    >
                        <div className={styles.transactionLabelContainer}>
                            {/* {editable ? (
                                <LabelInput category={category} setCategory={setCategory} className={styles.categoryInput}/>
                            ) : (
                            )} */}
                            <div className={styles.transactionCategory}>
                                {category}
                            </div>
                            {categoryIcon(category)}
                        </div>
                        <div className={styles.transactionImage}>
                            {transaction.type.toLowerCase() === 'expense' ? (
                                // <img 
                                // src={expenseImage} 
                                // alt="Expense" 
                                // className={styles.expenseImage} 
                                // />
                                <div className={styles.expenseImage}>
                                    {dollarWastingIcon({ width: "140px", height: "140px" })}
                                </div>
                                
                            ) : (
                                <img 
                                    src={incomeImage} 
                                    alt="Income" 
                                    className={styles.incomeImage} 
                                />
                            )}
                        </div>
                    </div>

                    <div className={styles.transactionNote}>
                        {editable ? (
                            <NoteInput
                                note={note}
                                setNote={setNote}
                                className={styles.noteInput}
                                style={{ fontWeight: editable ? 400 : 'inherit' }}
                            />
                        ) : (
                            <span className={styles.noteText}>{note}</span>
                        )}
                    </div>

                    <div className={styles.transactionActions}>
                        <div className={styles.transactionDate}>
                            {formattedDate()}
                        </div>
                        {editButtons()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transaction;
