import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import styles from '../../Home/Home.module.scss'; // Create this SCSS file for styles
import Transaction from '../../Home/Transaction';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactions } from '../../../redux/actions';

function BudgetTransactionList({ currentBudget, walletIds = [], startDate }) {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const currentUser = useSelector((state) => state.user) || [];
    const userId = currentUser._id;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTransactions(userId));
    }, [userId, dispatch]);
    console.log('Current user: ', currentUser);

    const allTransactions = currentUser.transactions;
    const budgetTransactionsId = currentBudget.transactionIds;

    const budgetTransactions = allTransactions.filter(transaction =>
        budgetTransactionsId.includes(transaction._id)
    );

    const formatTransactionDate = (date) => {
        const transactionDate = new Date(date);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        // Remove time from comparison by setting time to midnight
        today.setHours(0, 0, 0, 0);
        yesterday.setHours(0, 0, 0, 0);
        transactionDate.setHours(0, 0, 0, 0);

        if (transactionDate.getTime() === today.getTime()) {
            return 'Today';
        } else if (transactionDate.getTime() === yesterday.getTime()) {
            return 'Yesterday';
        } else {
            return transactionDate.toLocaleDateString('en-GB');
        }
    };

    const sortedTransactions = [...budgetTransactions].reverse();
    let lastDate = '';

    const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction._id);
    };

    return (
        <div className={styles.transactions}>
            {sortedTransactions.map((transaction) => {
                const transactionDate = formatTransactionDate(transaction.date);
                const showDivider = transactionDate !== lastDate;
                lastDate = transactionDate;

                const color = transaction.type === 'income' ? 'green' : 'red';

                return (
                    <div key={transaction._id}>
                        {showDivider && (
                            <div className={styles.dateDivider}>
                                {transactionDate}
                            </div>
                        )}
                        <div
                            className={styles.transaction}
                            onClick={() => handleTransactionClick(transaction)}
                        >
                            {transaction.type === 'income' ? (
                                <BiSolidPlusCircle
                                    className={`${styles.typeIcon} ${styles[color]}`}
                                />
                            ) : (
                                <BiSolidMinusCircle
                                    className={`${styles.typeIcon} ${styles[color]}`}
                                />
                            )}
                            <div className={styles.transAmount}>
                                ${transaction.amount}
                            </div>
                            <div className={styles.transLabel}>
                                {transaction.label}
                            </div>
                            <div className={styles.transWallet}>
                                {walletIds.find(
                                    (walletId) =>
                                        walletId === transaction.walletId
                                )?.name || ''}
                            </div>
                            <div className={styles.transNote}>
                                {transaction.note}
                            </div>
                            <Transaction
                                transaction={transaction}
                                setSelectedTransaction={setSelectedTransaction}
                                color={color}
                                hidden={selectedTransaction !== transaction._id}
                            />
                            {console.log(
                                'selectedTransaction: ',
                                selectedTransaction
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default BudgetTransactionList;
