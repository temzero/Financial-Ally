import styles from './Transaction.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IoWalletOutline } from 'react-icons/io5';
import { GoPencil } from 'react-icons/go';
import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import Transaction from './Transaction';
import iconItems from '../../assets/icons/reactIcons';
import { AiOutlineQuestionCircle } from "react-icons/ai";

function TransactionList({ transactions = [], currency = '$' }) {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const wallets = useSelector((state) => state.wallet.wallets);
    const categories = useSelector((state) => state.category.categories) || [];

    const formatTransactionDate = (date) => {
        const transactionDate = new Date(date);
        const today = new Date();
        const yesterday = new Date(today);

        yesterday.setDate(today.getDate() - 1);
        today.setHours(0, 0, 0, 0);
        yesterday.setHours(0, 0, 0, 0);
        transactionDate.setHours(0, 0, 0, 0);

        if (transactionDate.getTime() === today.getTime()) {
            return 'Today';
        } else if (transactionDate.getTime() === yesterday.getTime()) {
            return 'Yesterday';
        }
        return transactionDate.toLocaleDateString('en-GB');
    };

    const sortedTransactions = [...transactions].sort(
        (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );

    const displayWallet = (walletId) => {
        const wallet = wallets.find((wallet) => wallet._id === walletId);
        return wallet ? (
            <span className={styles.transElement}>
                <span className={styles.transIcon}>
                    <IoWalletOutline />
                </span>
                <span className={styles.transText}>{wallet.name}</span>
            </span>
        ) : null;
    };

    const categoryIcon = (categoryId) => {
        const category = categories.find(
            (category) => category._id === categoryId
        );

        if (!category) {
            return <div className={styles.categoryName}>Other</div>;
        }

        const { icon: categoryIconName, name, color } = category;
        const colorClass = `text-${color || 'defaultColor'}`;
        const matchedItem = iconItems.find(
            (item) => item.name === categoryIconName
        );

        if (!matchedItem) {
            return (
                <div className={`${styles.categoryName} ${colorClass}`}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </div>
            );
        }

        return (
            <div className={`${styles.categoryIcon} ${colorClass}`}>
                {matchedItem.icon}
            </div>
        );
    };

    const renderNetBalance = (date) => {
        const transactionsByDate = sortedTransactions.filter(
            (trans) => trans.date === date
        );
        const netBalance = transactionsByDate.reduce((total, trans) => {
            return trans.type.toLowerCase() === 'income'
                ? total + trans.amount
                : total - trans.amount;
        }, 0);

        if (netBalance > 0) {
            return (
                <div className='primary-green'>
                    (+{currency}
                    {netBalance.toLocaleString('en-US')})
                </div>
            );
        } else if (netBalance < 0) {
            return (
                <div className='primary-red'>
                    (-{currency}
                    {Math.abs(netBalance).toLocaleString('en-US')})
                </div>
            );
        }
        return null;
    };

    let lastDate = '';
    return (
        <div className={styles.transactions}>
            {sortedTransactions.map((transaction) => {
                const transactionDate = formatTransactionDate(transaction.date);
                const showDivider = transactionDate !== lastDate;
                lastDate = transactionDate;

                const typeColor =
                    transaction.type.toLowerCase() === 'income' ? 'primary-green'
                    : transaction.type.toLowerCase() === 'expense' ? 'primary-red'
                    : 'primary-default';

                return (
                    <div key={transaction._id}>
                        {showDivider && (
                            <div className={styles.dateDivider}>
                                {transactionDate}
                                {renderNetBalance(transaction.date)}
                            </div>
                        )}
                        <div
                            className={styles.transaction}
                            onClick={() =>
                                setSelectedTransaction(transaction._id)
                            }
                        >
                            <div className={styles.transAmount}>
                                {transaction.type.toLowerCase() === 'income' ? (
                                    <BiSolidPlusCircle
                                        className={`${styles.typeIcon} ${typeColor}`}
                                    />
                                ) : (
                                    <BiSolidMinusCircle
                                        className={`${styles.typeIcon} ${typeColor}`}
                                    />
                                )}
                                <span className={styles.currency}>
                                    {currency}
                                </span>
                                {transaction.amount.toLocaleString('en-US')}
                            </div>

                            <div className={styles.transColumn}>
                                {displayWallet(transaction.walletId)}
                            </div>
                            <div className={styles.transColumn}>
                                {transaction.note && (
                                    <span className={styles.transElement}>
                                        <span className={styles.transIcon}>
                                            <GoPencil />
                                        </span>
                                        <span className={styles.transText}>
                                            {transaction.note}
                                        </span>
                                    </span>
                                )}
                            </div>
                            {categoryIcon(transaction.categoryId)}
                        </div>
                        {selectedTransaction === transaction._id && (
                            <Transaction
                                transaction={transaction}
                                setSelectedTransaction={setSelectedTransaction}
                                typeColor={typeColor}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default TransactionList;
