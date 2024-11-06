import styles from './BudgetInfo.module.scss';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Button from '../../../components/Button/Button';
import EditBudgetForm from './EditBudgetForm';
import DeleteBudgetForm from './DeleteBudgetForm';
import { useSelector } from 'react-redux';
import BudgetTransactionList from './BudgetTransactionList';

function BudgetInfo() {
    const { state } = useLocation();
    const budgetId = state?.budgetId || '';
    const budgets = useSelector((state) => state.user.budgets);
    const currentBudget = budgets.find((budget) => budget._id === budgetId);
    const {
        name,
        moneyLimit,
        moneySpend,
        category,
        startDate,
        finishDate,
        walletIds,
        color,
    } = currentBudget;

    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    // State variables for budget details
    const [budgetName, setBudgetName] = useState('');
    const [budgetMoneyLimit, setBudgetMoneyLimit] = useState(moneyLimit);
    const [budgetMoneySpend, setBudgetMoneySpend] = useState(moneySpend || 0);
    const [budgetCategory, setBudgetCategory] = useState('');
    const [budgetColor, setBudgetColor] = useState('');
    const [budgetStartDate, setBudgetStartDate] = useState('');
    const [budgetFinishDate, setBudgetFinishDate] = useState('');
    const [budgetWallets, setBudgetWallets] = useState([]);

    const formRef = useRef(null);
    const budgetColorClass = styles[budgetColor];
    const headerClasses = [budgetColorClass, styles.contentHeader].join(' ');

    useEffect(() => {
        if (currentBudget) {
            setBudgetName(name);
            setBudgetMoneyLimit(moneyLimit);
            setBudgetCategory(category);
            setBudgetColor(color);
            setBudgetStartDate(startDate);
            setBudgetFinishDate(finishDate);
            setBudgetWallets(walletIds);
        }
    }, [budgetId, showEditForm, showDeleteForm, budgets, currentBudget, category, color, finishDate, moneyLimit, name, startDate, walletIds]);

    // Convert startDate and finishDate to readable date format
    const formattedStartDate = new Date(startDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const formattedFinishDate = new Date(finishDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const start = new Date(startDate);
    const end = new Date(finishDate);
    const now = new Date(); // Set `now` to the current date and time

    // Calculate the total period in days between startDate and finishDate
    const daysPeriod = Math.ceil(
        Math.abs((end - start) / (1000 * 60 * 60 * 24))
    );

    // Calculate the remaining days between today and finishDate
    const daysLeft = Math.ceil(Math.abs((end - now) / (1000 * 60 * 60 * 24)));
    
    const leftToSpend = budgetMoneyLimit - budgetMoneySpend;
    const spendPercent = Math.ceil((budgetMoneySpend / budgetMoneyLimit) * 100);

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
                <div className={headerClasses}>
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
                        style={{ width: `${spendPercent}%` }} // Set the width based on spendPercent
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
                                Spend:{' '}
                            </div>
                            <div>
                                <span className={styles.contentSummaryValue}>
                                    {spendPercent}
                                </span>
                                <span className={styles.contentSummaryUnit}>
                                    %
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className={styles.contentSummaryHeader}>
                                Left to spend:{' '}
                            </div>
                            <div className={styles.contentSummaryValue}>
                                ${leftToSpend}
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentAnalysis}>
                        <div>
                            <div className={styles.contentSubHeader}>
                                Analysis
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentTransactions}>
                        <div className={styles.contentSubHeader}>
                            Transactions
                        </div>

                        <BudgetTransactionList walletIds={walletIds} currentBudget={currentBudget}/>
                        <div className={styles.contentSubHeader}>
                            {/* {budgetCategory} */}
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
                budgetCategory={budgetCategory}
                setBudgetCategory={setBudgetCategory}
                budgetColor={budgetColor}
                setBudgetColor={setBudgetColor}
                budgetStartDate={budgetStartDate}
                setBudgetStartDate={setBudgetStartDate}
                budgetFinishDate={budgetFinishDate}
                setBudgetFinishDate={setBudgetFinishDate}
                budgetWallets={budgetWallets}
                setBudgetWallets={setBudgetWallets}
            />

            <DeleteBudgetForm
                showForm={showDeleteForm}
                setShowForm={setShowDeleteForm}
                formRef={formRef}
                budgetId={budgetId}
            />
        </div>
    );
}

export default BudgetInfo;
