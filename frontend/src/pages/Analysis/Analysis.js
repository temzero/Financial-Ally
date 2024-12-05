import styles from './Analysis.module.scss';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import TransactionList from '../../components/Transaction/TransactionList';
import walletImage from '../../assets/images/wallet.png';
import Button from '../../components/Button/Button';
import WalletChart from '../../components/Chart/WalletChart';
import CategoryChart from '../../components/Chart/CategoryChart';
import { IoWalletOutline } from 'react-icons/io5';
import {
    filterTransactionsByPeriod,
    balanceLineGraphData,
} from '../../components/Chart/chartUtils';

// Register necessary components in Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Analysis({currency = '$'}) {
    const transactions = useSelector((state) => state.transaction.transactions) || [];
    const wallets = useSelector((state) => state.wallet.wallets) || [];
    const walletIds = [''].concat(wallets.map(wallet => wallet._id));
    const periods = ['1D', '1W', '1M', '1Y', 'All'];

    const [periodCounter, setPeriodCounter] = useState(2);
    const [walletCounter, setWalletCounter] = useState(0);
    const walletId = walletIds[walletCounter]
    const chartPeriod = periods[periodCounter]
    const walletRef = useRef(null);

    useEffect(() => {
        if (walletRef.current) {
            const activeWallet = walletRef.current.querySelector(`.${styles.active}`);
            if (activeWallet) {
                activeWallet.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            }
        }
    }, [walletCounter]);

    const walletElements = () => {
        if (wallets.length === 0) {
            return <div>No wallet available!</div>;
        }

        const walletElements = wallets.map((wallet, index) => {

            return (
                <div
                    key={wallet._id}
                    className={`${styles[`walletItem-${wallet.color}`]} ${
                        styles.walletItem
                    } ${walletId === wallet._id ? styles.active : ''}`}
                    onClick={() => setWalletCounter(index + 1)}
                >
                    <IoWalletOutline /> {wallet.name}
                </div>
            );
        });

        walletElements.unshift(
            <div
                key="all-wallets"
                className={`${styles.walletItem} ${
                    !walletId ? styles.active : ''
                }`}
                onClick={() => setWalletCounter(0)}
            >
                <IoWalletOutline /> All Wallet
            </div>
        );

        return walletElements;
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const walletCount = walletIds.length;
            const periodCount = periods.length;

            if (event.key === 'Tab') {
                event.preventDefault();
                setWalletCounter((prev) => (prev + 1) % walletCount);
            } else if (event.key === '`') {
                event.preventDefault();
                setWalletCounter((prev) => (prev - 1 + walletCount) % walletCount);
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                setPeriodCounter((prev) => (prev + 1) % periodCount);
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                setPeriodCounter((prev) => (prev - 1 + periodCount) % periodCount);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const totalBalance = (wallets || []).reduce(
        (sum, wallet) => sum + wallet.balance,
        0
    );
    let walletTransactions, walletBalance, walletName, walletColor;

    const createChartData = (walletId) => {
        const wallet = wallets.find((wallet) => wallet._id === walletId);

        if (wallet) {
            walletTransactions = transactions.filter((transaction) =>
                wallet.transactionIds.includes(transaction._id)
            );
            walletBalance = wallet.balance;
            walletName = wallet.name;
            walletColor = getComputedStyle(document.documentElement)
                .getPropertyValue(`--background-${wallet.color}`)
                .trim();
        } else {
            walletTransactions = transactions;
            walletBalance = totalBalance;
            walletName = 'All wallets';
            walletColor = `rgba(0, 0, 0, 0.4)`;
        }

        const filteredTransactions = filterTransactionsByPeriod(
            walletTransactions,
            chartPeriod
        );
        walletTransactions = filteredTransactions
        const lineData = balanceLineGraphData(
            filteredTransactions,
            walletBalance
        );

        const dateLabels = lineData.map((point) =>
            new Date(point.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
            })
        );
        const balancePoints = lineData.map((point) => point.lineBalance);

        return {
            labels: dateLabels,
            datasets: [
                {
                    label: 'Balance',
                    data: balancePoints,
                    fill: false,
                    borderColor: walletColor,
                    tension: 0.1,
                    pointBackgroundColor: walletColor,
                    pointBorderColor: walletColor,
                    pointBorderWidth: 0,
                    pointRadius: 4,
                    pointHoverRadius: 8,
                },
            ],
        };
    };

    const chartData = createChartData(walletId);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const incomeTransactions = walletTransactions.filter(
        (transaction) => transaction.type.toLowerCase() === 'income'
    );
    const expenseTransactions = walletTransactions.filter(
        (transaction) => transaction.type.toLowerCase() === 'expense'
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>Analysis</div>
            </div>

            <div className={styles.AnalysisOptions}>
                <div className={styles.walletSelections} ref={walletRef}>
                    {walletElements()}
                </div>
                <div className={styles.chartBtnContainer}>
                    {periods.map((period, index) => (
                        <Button
                            key={period}
                            rounded
                            className={`${styles.chartBtn} ${
                                chartPeriod === period ? styles.active : ''
                            }`}
                            onClick={() => setPeriodCounter(index)}
                        >
                            {period}
                        </Button>
                    ))}
                </div>
            </div>

            {transactions.length ? (
                <div className={styles.body}>

                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>{walletName}</div>
                        <div className={styles.walletBalance}>
                            <span>{currency}</span>
                            <span>{walletBalance?.toLocaleString?.() || '0'}</span>
                        </div>
                        <div className={styles.lineGraph}>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>

                    
                    <div className={styles.section}>
                        <div className={styles.doughnutChart}>
                            {incomeTransactions.length ? (
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
                            ) : null}
                            {expenseTransactions.length ? (
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
                            ) : null}
                        </div>
                    </div>
                    {incomeTransactions.length ? (
                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                Income
                            </div>
                            <TransactionList transactions={incomeTransactions} />
                        </div>
                    ) : null}

                    {expenseTransactions.length ? (
                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                Expense
                            </div>
                            <TransactionList transactions={expenseTransactions} />
                        </div>
                    ) : null}

                    {walletTransactions.length ? (
                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                All transactions
                            </div>
                            <TransactionList transactions={walletTransactions} />
                        </div>
                    ) : (
                        <div className={styles.emptyText}>
                            No transactions
                        </div>
                    )}

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
