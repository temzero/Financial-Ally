import styles from './Analysis.module.scss';
import { useSelector } from 'react-redux';
import TransactionList from '../../components/Transaction/TransactionList';
import walletImage from '../../assets/images/wallet.png';
import ChartMultiple from '../../components/Chart/ChartMultiple';
import CategoryChart from '../../components/Chart/CategoryChart';
import WalletChart from '../../components/Chart/WalletChart';

function Analysis() {
    const wallets = useSelector((state) => state.wallet.wallets) || [];
    const transactions =
        useSelector((state) => state.transaction.transactions) || [];
    const incomeTransactions = transactions.filter(
        (transaction) => transaction.type.toLowerCase() === 'income'
    );
    const expenseTransactions = transactions.filter(
        (transaction) => transaction.type.toLowerCase() === 'expense'
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>Analysis</div>
            </div>

            {transactions.length ? (
                <div className={styles.body}>
                    <div className={styles.section}>
                        <ChartMultiple />
                        
                    </div>

                    <div className={styles.section}>
                            <div className={styles.chartRow}>
                                <CategoryChart
                                    transactions={incomeTransactions}
                                    type="+"
                                />
                                <WalletChart
                                    transactions={incomeTransactions}
                                    type="+"
                                />
                                
                            </div>
                            <div className={styles.chartRow}>
                                <CategoryChart
                                    transactions={expenseTransactions}
                                    type="-"
                                />
                                <WalletChart
                                    transactions={expenseTransactions}
                                    type="-"
                                />
                            </div>

                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Income</div>
                        <TransactionList
                            wallets={wallets}
                            transactions={incomeTransactions}
                        />
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Expense</div>
                        <TransactionList
                            wallets={wallets}
                            transactions={expenseTransactions}
                        />
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            All transaction
                        </div>
                        <TransactionList
                            wallets={wallets}
                            transactions={transactions}
                        />
                    </div>
                </div>
            ) : (
                <div className={styles.empty}>
                    <img
                        src={walletImage}
                        alt="Nothing"
                        className={styles.emptyImg}
                    />
                    <span>No transactions to analyze</span>
                </div>
            )}
        </div>
    );
}

export default Analysis;
