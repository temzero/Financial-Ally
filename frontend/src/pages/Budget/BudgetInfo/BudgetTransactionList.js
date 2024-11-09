import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import styles from '../../Home/Home.module.scss'; // Create this SCSS file for styles
import Transaction from '../../../components/Transaction/Transaction';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function BudgetTransactionList({ transactionIds = [], walletIds = [] }) {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const allTransactions = useSelector((state) => state.user.transactions) || [];

    const budgetTransactions = allTransactions.filter(transaction =>
        transactionIds.includes(transaction._id)
    );

    const sortedTransactions = [...budgetTransactions].reverse();
    let lastDate = '';

    const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction._id);
    };

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
                            
                            <div className={styles.transAmount}>
                                {transaction.type === 'income' ? (
                                    <BiSolidPlusCircle
                                        className={`${styles.typeIcon} ${styles[color]}`}
                                    />
                                ) : (
                                    <BiSolidMinusCircle
                                        className={`${styles.typeIcon} ${styles[color]}`}
                                    />
                                )}
                                ${transaction.amount.toLocaleString("en-US")}
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
