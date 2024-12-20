import styles from './BudgetInfo.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBudget } from '../../../redux/actions';
import { IoWalletOutline } from 'react-icons/io5';
import { setOverlay } from '../../../redux/actions';
import Button from '../../../components/Button/Button';
import EditBudgetForm from '../../../components/EditForm/EditBudgetForm';
import DeleteBudgetForm from '../../../components/DeleteForm/DeleteBudgetForm';
import TransactionList from '../../../components/Transaction/TransactionList';
import CountUpEffect from '../../../components/Animation/CountUpEffect';
import CategoryChart from '../../../components/Chart/CategoryChart';
import WalletChart from '../../../components/Chart/WalletChart';
import landscapeImage from '../../../assets/images/landscape.png';
import useFadeIn from '../../../components/Animation/useFadeIn';

function BudgetInfo() {
    const { state } = useLocation();
    const budgetId = state?.budgetId || '';
    const currency = '$';
    const Overlay = useSelector((state) => state.state.isOverlay);
    useEffect(() => {dispatch(setOverlay(false))}, [])
    const dispatch = useDispatch();
    const fadeInStyle = useFadeIn(2000);

    const allBudgets = useSelector((state) => state.budget.budgets) || [];
    const allWallets = useSelector((state) => state.wallet.wallets) || [];
    const allTransactions = useSelector((state) => state.transaction.transactions) || [];

    const navigate = useNavigate();
    const currentBudget = allBudgets.find((budget) => budget._id === budgetId);
    const {
        name,
        moneyLimit,
        moneySpend,
        startDate,
        finishDate,
        walletIds,
        transactionIds,
        color,
    } = currentBudget;

    const budgetTransactions = allTransactions.filter(
        (transaction) => transaction.type.toLowerCase() === 'expense'
    );

    const transactions =
        budgetTransactions.filter((transaction) =>
            transactionIds.includes(transaction._id)
        ) || [];

           // Remove unnecessary TransactionIds
    useEffect(() => {
        const budgetTransactionsIds = transactions.map(transaction => transaction._id);
        if (!budgetTransactionsIds.length || !budgetId) return;

        const updatedBudgetTransactions = {
            transactionIds: budgetTransactionsIds,
        };

        dispatch(updateBudget(updatedBudgetTransactions, budgetId));
    }, [budgetId]);

    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    
    // Handle keydown event to toggle add wallet form
    useEffect(() => {
        if(Overlay) return;

        const handleKeyDown = (event) => {
            if(!showEditForm && !showDeleteForm) {
                if (event.key === 'Delete') {
                    event.preventDefault();
                    setShowDeleteForm(true);
                } else if (event.key === 'e' || event.key === '+' || event.key === '=') {
                    event.preventDefault();
                    setShowEditForm(true);
                }
            }
        };
    
        // Add event listener on mount
        window.addEventListener('keydown', handleKeyDown);
    
        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showEditForm, showDeleteForm, Overlay]);

    // State variables for budget details
    const [budgetName, setBudgetName] = useState(name);
    const [budgetMoneyLimit, setBudgetMoneyLimit] = useState(moneyLimit);
    const [budgetColor, setBudgetColor] = useState(color);
    const [budgetStartDate, setBudgetStartDate] = useState(startDate);
    const [budgetFinishDate, setBudgetFinishDate] = useState(finishDate);
    const [budgetWallets, setBudgetWallets] = useState(
        allWallets.filter((wallet) => walletIds.includes(wallet._id))
    );

    const walletElements = () => {
        // If no budget wallets are found, return 'All wallets'
        if (budgetWallets.length === 0) {
            return (
                <div
                    className={styles.allWallets}
                    onClick={() => navigate('/wallet')}
                >
                    All wallets
                </div>
            );
        }

        return budgetWallets.map((wallet) => {

            const handleWalletNavigate = () => {
                navigate(`/wallet/${wallet.name}`, { state: wallet });
            };

            return (
                <div
                    key={wallet._id}
                    className={`wallet-item wallet-item-${wallet.color} background-defaultColor`}
                    onClick={handleWalletNavigate}
                >
                    <IoWalletOutline /> {wallet.name}
                </div>
            );
        });
    };

    const formRef = useRef(null);

    // Convert startDate and finishDate to readable date format
    const formattedStartDate = new Date(budgetStartDate).toLocaleDateString(
        'en-GB',
        {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }
    );
    const formattedFinishDate = new Date(budgetFinishDate).toLocaleDateString(
        'en-GB',
        {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }
    );

    const start = new Date(budgetStartDate);
    const finish = new Date(budgetFinishDate);
    const today = new Date(); // Set `today` to the current date and time
    const daysLeft = Math.ceil((finish - today) / (1000 * 60 * 60 * 24));

    // Calculate the total period in days between startDate and finishDate
    const daysPeriod = Math.ceil(
        Math.abs((finish - start) / (1000 * 60 * 60 * 24))
    );

    // Calculate the remaining days between today and finishDate

    const leftToSpend = budgetMoneyLimit - moneySpend;
    const spendPercent = Math.ceil((moneySpend / budgetMoneyLimit) * 100);

    const [animatedWidth, setAnimatedWidth] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setAnimatedWidth(spendPercent);
        }, 10);
    }, [spendPercent]);

    const handleShowEditForm = () => {
        setShowEditForm(!showEditForm);
    };

    const handleShowDeleteForm = () => {
        setShowDeleteForm(!showDeleteForm);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>Budget</div>
                <div className={styles.btnContainer}>
                    <Button
                        s
                        className={styles.btn}
                        onClick={handleShowEditForm}
                    >
                        Edit
                    </Button>
                    <Button
                        s
                        className={styles.btn}
                        onClick={handleShowDeleteForm}
                    >
                        Delete
                    </Button>
                </div>
            </div>
            <div className={styles.contentInfo}>
                <div
                    className={`${styles.contentHeader} background-${budgetColor}`}
                >
                    <div className={styles.contentHeaderContainer}>
                        <div className={styles.contentName}>{budgetName}</div>
                        {budgetMoneyLimit !== undefined &&
                        moneySpend !== undefined ? (
                            <div className={styles.contentMoneyLimit}>
                                {currency}
                                <CountUpEffect n={moneySpend} />
                                {'/ '}
                                {budgetMoneyLimit.toLocaleString()}
                            </div>
                        ) : (
                            <div className={styles.contentMoneyLimit}>
                                {'Money Limit information unavailable'}
                            </div>
                        )}
                    </div>
                    <div
                        className={styles.progressBar}
                        style={{
                            width: `${animatedWidth}%`,
                            backgroundColor: animatedWidth > 100 ? 'red' : '',
                        }}
                    ></div>
                </div>
                <div className={styles.contentBody}>
                    <div className={styles.contentSummary}>
                        <div className={styles.contentPeriod}>
                            <div className={styles.contentPeriodDate}>
                                <div className={styles.contentSummaryHeader}>
                                    From:{' '}
                                </div>
                                <div
                                    className={styles.contentSummaryHeaderBold}
                                >
                                    {formattedStartDate}
                                </div>
                            </div>
                            <div className={styles.contentPeriodDate}>
                                <div className={styles.contentSummaryHeader}>
                                    To:{' '}
                                </div>
                                <div
                                    className={styles.contentSummaryHeaderBold}
                                >
                                    {formattedFinishDate}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.contentSummaryHeader}>
                                Period:
                            </div>
                            <div>
                                <span className={styles.contentSummaryValue}>
                                    {daysPeriod}
                                </span>
                                <span className={styles.contentSummaryUnit}>
                                    days
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className={styles.contentSummaryHeader}>
                                Time left:
                            </div>
                            {daysLeft === 0 ? (
                                <span className={styles.contentSummaryValue}>
                                    Final day
                                </span>
                            ) : daysLeft < 0 ? (
                                <span className={styles.contentSummaryValue}>
                                    Finished
                                </span>
                            ) : (
                                <div>
                                    <span
                                        className={styles.contentSummaryValue}
                                    >
                                        {daysLeft}
                                    </span>
                                    <span className={styles.contentSummaryUnit}>
                                        days
                                    </span>
                                </div>
                            )}
                        </div>
                        <div>
                            <div className={styles.contentSummaryHeader}>
                                Left to spend:{' '}
                            </div>
                            <div className={styles.contentSummaryValue}>
                                ${leftToSpend.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentAnalysis}>
                        <div className={styles.budgetWallets}>
                            <div className={styles.smallHeader}>Wallets:</div>
                            {walletElements()}
                        </div>
                    </div>

                    {!transactions.length ? (
                        <div className={styles.landscapeImageContainer}>
                            <div>No transactions</div>
                            <img
                                src={landscapeImage}
                                alt="noMoney"
                                className={styles.landscapeImage}
                                style={fadeInStyle}
                            />
                        </div>
                    ) : (
                        <div>
                            <div className={styles.contentAnalysis}>
                                <div className={'section-header'}>
                                    Analysis
                                </div>
                                {transactions.length ? (
                                    <div className={styles.contentChart}>
                                        <CategoryChart
                                            transactions={transactions}
                                        />
                                        <WalletChart
                                            transactions={transactions}
                                        />
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>

                            <div className={styles.contentTransactions}>
                                <div className={'section-header'}>
                                    Transactions
                                </div>

                                <TransactionList
                                    wallets={allWallets}
                                    transactions={transactions}
                                />
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div className={styles.date}>
                From {formattedStartDate} to {formattedFinishDate}
                <span>{daysLeft > 0 ? <>({daysLeft} days left)</> : ''}</span>
            </div>

            {showEditForm && (
                <EditBudgetForm
                    budgetData={currentBudget}
                    formRef={formRef}
                    showForm={showEditForm}
                    setShowForm={setShowEditForm}
    
                    budgetName={budgetName}
                    setBudgetName={setBudgetName}
    
                    budgetMoneyLimit={budgetMoneyLimit}
                    setBudgetMoneyLimit={setBudgetMoneyLimit}
    
                    wallets={allWallets}
                    budgetWallets={budgetWallets}
    
                    setBudgetWallets={setBudgetWallets}
                    budgetColor={budgetColor}
    
                    setBudgetColor={setBudgetColor}
                    budgetStartDate={budgetStartDate}
    
                    setBudgetStartDate={setBudgetStartDate}
                    budgetFinishDate={budgetFinishDate}
                    setBudgetFinishDate={setBudgetFinishDate}
                />
            )}

            {showDeleteForm && (
                <DeleteBudgetForm
                    budget={currentBudget}
                    formRef={formRef}
                    showForm={showDeleteForm}
                    setShowForm={setShowDeleteForm}
                />
            )}
        </div>
    );
}

export default BudgetInfo;
