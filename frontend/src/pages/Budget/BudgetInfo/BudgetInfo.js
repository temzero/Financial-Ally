import styles from './BudgetInfo.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import Button from '../../../components/Button/Button';
import EditBudgetForm from '../../../components/EditForm/EditBudgetForm';
import DeleteBudgetForm from '../../../components/DeleteForm/DeleteBudgetForm';
import { useSelector } from 'react-redux';
import TransactionList from '../../../components/Transaction/TransactionList';
import { IoWalletOutline } from "react-icons/io5";


function BudgetInfo() {
    const { state } = useLocation();
    const budgetId = state?.budgetId || '';
    const allBudgets = useSelector((state) => state.budget.budgets);
    const allWallets = useSelector((state) => state.wallet.wallets);
    const allTransactions = useSelector((state) => state.transaction.transactions);

    const navigate = useNavigate();
    const currentBudget = allBudgets.find((budget) => budget._id === budgetId);
    const {
        name,
        moneyLimit,
        moneySpend,
        category,
        startDate,
        finishDate,
        walletIds,
        transactionIds,
        color,
    } = currentBudget;

    const transactions = allTransactions.filter(transaction =>
        transactionIds.includes(transaction._id)
    );

    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    // State variables for budget details
    const [budgetName, setBudgetName] = useState(name);
    const [budgetMoneyLimit, setBudgetMoneyLimit] = useState(moneyLimit);
    const [budgetType, setBudgetType] = useState(category);
    const [budgetColor, setBudgetColor] = useState(color);
    const [budgetStartDate, setBudgetStartDate] = useState(startDate);
    const [budgetFinishDate, setBudgetFinishDate] = useState(finishDate);
    const [budgetWalletIds, setBudgetWalletIds] = useState(walletIds);

    const renderWallets = () => {
        const budgetWallets = allWallets.filter(wallet => budgetWalletIds.includes(wallet._id));
    
        // If no budget wallets are found, return 'All wallets'
        if (budgetWallets.length === 0) {
            return (
            <div 
                className={styles.wallet} 
                onClick={() => navigate('/wallet')}
                >
                <IoWalletOutline /> All wallets
            </div>
            )
        }
        
        return budgetWallets.map(wallet => {
            const walletColorClass = `text${wallet.color}`;
            const handleWalletNavigate = () => {
                navigate(`/wallet/${wallet.name}`, { state: wallet._id })
            }

            return (
                <div key={wallet._id} className={`${styles[walletColorClass]} ${styles.wallet}`} onClick={handleWalletNavigate}>
                  <IoWalletOutline/> {wallet.name}
                </div>
              );
        });
    }

    const formRef = useRef(null);

    // Convert startDate and finishDate to readable date format
    const formattedStartDate = new Date(budgetStartDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const formattedFinishDate = new Date(budgetFinishDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const start = new Date(budgetStartDate);
    const end = new Date(budgetFinishDate);
    const now = new Date(); // Set `now` to the current date and time

    // Calculate the total period in days between startDate and finishDate
    const daysPeriod = Math.ceil(
        Math.abs((end - start) / (1000 * 60 * 60 * 24))
    );

    // Calculate the remaining days between today and finishDate
    const daysLeft = Math.ceil(Math.abs((end - now) / (1000 * 60 * 60 * 24)));
    
    const leftToSpend = budgetMoneyLimit - moneySpend;
    const spendPercent = Math.ceil((moneySpend / budgetMoneyLimit) * 100);

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
                <div className={`${styles.contentHeader} ${styles[budgetColor]}`}>
                    <div className={styles.contentHeaderContainer}>
                        <div className={styles.contentName}>{budgetName}</div>
                        <div className={styles.contentMoneyLimit}>
                            {budgetMoneyLimit !== undefined &&
                            moneySpend !== undefined
                                ? `$${moneySpend.toLocaleString()} / $${budgetMoneyLimit.toLocaleString()}`
                                : 'Money Limit information unavailable'}
                        </div>
                    </div>
                    <div
                        className={styles.progressBar}
                        style={{
                            width: `${spendPercent}%`,
                            backgroundColor: spendPercent > 100 ? 'red' : '',
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
                                Period:{' '}
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
                                Time left:{' '}
                            </div>
                            <div>
                                <span className={styles.contentSummaryValue}>
                                    {daysLeft}
                                </span>
                                <span className={styles.contentSummaryUnit}>
                                    days
                                </span>
                            </div>
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
                            <div className={styles.contentSubHeader}>
                                {renderWallets()}
                            </div>
                    </div>
                    
                    <div className={styles.contentTransactions}>
                        <div className={styles.contentSubHeader}>
                            Transactions
                        </div>

                        <TransactionList wallets={allWallets} transactions={transactions}/>
                        <div className={styles.contentSubHeader}>
                            {/* {budgetType} */}
                        </div>
                    </div>
                </div>
            </div>

            <EditBudgetForm
                budgetData={currentBudget}
                formRef={formRef}
                showForm={showEditForm}
                setShowForm={setShowEditForm}

                budgetName={budgetName}
                setBudgetName={setBudgetName}

                budgetMoneyLimit={budgetMoneyLimit}
                setBudgetMoneyLimit={setBudgetMoneyLimit}

                budgetType={budgetType}
                setBudgetType={setBudgetType}

                budgetColor={budgetColor}
                setBudgetColor={setBudgetColor}

                budgetStartDate={budgetStartDate}
                setBudgetStartDate={setBudgetStartDate}

                budgetFinishDate={budgetFinishDate}
                setBudgetFinishDate={setBudgetFinishDate}

                budgetWallets={budgetWalletIds}
                setBudgetWallets={setBudgetWalletIds}
            />

            <DeleteBudgetForm
                budget={currentBudget}
                formRef={formRef}
                showForm={showDeleteForm}
                setShowForm={setShowDeleteForm}
            />
        </div>
    );
}

export default BudgetInfo;
