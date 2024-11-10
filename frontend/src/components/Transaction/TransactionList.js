import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import styles from './Transaction.module.scss'; 
import Transaction from './Transaction';
import { useState } from 'react';
import { IoWalletOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";

function TransactionList({wallets = [], transactions = [], currency = '$'}) {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    
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

    const sortedTransactions = [...transactions].reverse();
    let lastDate = '';

    const displayWallet = (walletId) => {
        const walletName = wallets.find(wallet => wallet._id === walletId)?.name;
        return walletName ? (
            <><IoWalletOutline />{walletName}</>
        ) : null;
    };

    const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction._id)
    }

    return (
        <div className={styles.transactions}>
            {sortedTransactions.map((transaction) => {
                const transactionDate = formatTransactionDate(transaction.date);
                const showDivider = transactionDate !== lastDate;
                lastDate = transactionDate;

                const color = transaction.type === 'income' ? 'green' : 'red';

                function renderNetBalance() {
                    // Calculate the net balance
                    const transactionsByDate = sortedTransactions.filter(sortedTransaction => sortedTransaction.date === transaction.date)
                    const netBalanceByDate = transactionsByDate.reduce((total, transaction) => {
                        return transaction.type === 'income' 
                            ? total + transaction.amount 
                            : total - transaction.amount;
                    }, 0); // Start with 0 as the initial total
                
                    // Render the appropriate result based on the net balance
                    if (netBalanceByDate > 0) {
                        return <div className={styles.green}>(+{currency}{netBalanceByDate.toLocaleString("en-US")})</div>;
                    } else if (netBalanceByDate < 0) {
                        return <div className={styles.red}>(-{currency}{Math.abs(netBalanceByDate).toLocaleString("en-US")})</div>;
                    }
                    // Return null if netBalance is 0 to render nothing
                    return null;
                }

                return (
                    <div key={transaction._id}>
                        {showDivider && (
                            <div className={styles.dateDivider}>
                                {transactionDate}
                                {renderNetBalance()}
                            </div>
                        )}
                        <div className={styles.transaction} onClick={() => handleTransactionClick(transaction)}>
                            
                            <div className={styles.transAmount}>
                                {transaction.type === 'income' ? (
                                    <BiSolidPlusCircle className={`${styles.typeIcon} ${styles[color]}`} />
                                ) : (
                                    <BiSolidMinusCircle className={`${styles.typeIcon} ${styles[color]}`} />
                                )}
                                <span className={styles.currency}>{currency}</span>{transaction.amount.toLocaleString("en-US")}
                            </div>
                            <div className={styles.transWallet}>{displayWallet(transaction.walletId)}</div>
                            <div className={styles.transNote}><GoPencil /> {transaction.note ? transaction.note : '---'}</div>
                            <div className={styles.transCategory}>{transaction.category}</div>
                            <Transaction 
                                transaction={transaction} 
                                setSelectedTransaction={setSelectedTransaction}
                                color={color}
                                hidden={selectedTransaction !== transaction._id}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default TransactionList;
