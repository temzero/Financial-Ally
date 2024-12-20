import styles from './Analysis.module.scss';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
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
import WalletChart from '../../components/Chart/WalletChart';
import CategoryChart from '../../components/Chart/CategoryChart';
import {
    filterTransactionsByPeriod,
    balanceLineGraphData,
} from '../../components/Chart/chartUtils';
import AnalysisController from './AnalysisController';
import useFadeIn from '../../components/Animation/useFadeIn';

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

function Analysis({ currency = '$' }) {
    const transactions =
        useSelector((state) => state.transaction.transactions) || [];
    const wallets = useSelector((state) => state.wallet.wallets) || [];
    const walletIds = [''].concat(wallets.map((wallet) => wallet._id));
    const fadeInStyle = useFadeIn()

    const periods = ['1D', '1W', '1M', '1Y', 'All'];

    const [periodCounter, setPeriodCounter] = useState(2);
    const [walletCounter, setWalletCounter] = useState(0);
    const walletId = walletIds[walletCounter];
    const chartPeriod = periods[periodCounter];
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const formatDate = new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        setCurrentDate(formatDate);
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
                .getPropertyValue(`--color-${wallet.color}`)
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
        walletTransactions = filteredTransactions;
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
            <div className={'header-section'}>
                <div className={'page-title'}>Analysis</div>
                <div className={styles.dateTitle}>{currentDate}</div>
            </div>

            <AnalysisController
                walletId={walletId}
                periods={periods}
                chartPeriod={chartPeriod}
                setPeriodCounter={setPeriodCounter}
                walletCounter={walletCounter}
                setWalletCounter={setWalletCounter}
            />

            {transactions.length ? (
                <div className={styles.body}>
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>{walletName}</div>
                        <div className={styles.walletBalance}>
                            <span>{currency}</span>
                            <span>
                                {walletBalance?.toLocaleString?.() || '0'}
                            </span>
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
                            <div className={'section-header'}>Income</div>
                            <TransactionList
                                transactions={incomeTransactions}
                            />
                        </div>
                    ) : null}

                    {expenseTransactions.length ? (
                        <div className={styles.section}>
                            <div className={'section-header'}>Expense</div>
                            <TransactionList
                                transactions={expenseTransactions}
                            />
                        </div>
                    ) : null}

                    {walletTransactions.length ? (
                        <div className={styles.section}>
                            <div className={'section-header'}>
                                All transactions
                            </div>
                            <TransactionList
                                transactions={walletTransactions}
                            />
                        </div>
                    ) : (
                        <div className={styles.empty}>
                            <span className={styles.emptyMessage}>No transactions to analyze</span>
                        </div>
                    )}
                    <div className='spacer-large'></div>
                </div>
            ) : (
                <div className={styles.empty}>
                    <img
                        src={walletImage}
                        alt="Nothing"
                        className={styles.emptyImg}
                        style={fadeInStyle}
                    />
                    <span className={styles.emptyMessage}>No transactions to analyze</span>
                </div>
            )}
        </div>
    );
}

export default Analysis;
