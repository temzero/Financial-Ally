import styles from './Budget.module.scss';
import Button from '../../components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getBudgets, getWallets } from '../../redux/actions';
import { AiOutlinePlus } from "react-icons/ai";
import AddBudgetForm from './AddBudgetForm';
import BudgetCard from './BudgetCard';

function Budget() {

    const [showForm, setShowForm] = useState(false);
    const user = useSelector((state) => state.user.user);
    const budgets = useSelector((state) => state.budget.budgets);
    const wallets = useSelector((state) => state.wallet.wallets);
    const userId = user._id;

    const dispatch = useDispatch();
    const formRef = useRef(null);


    useEffect(() => {
        dispatch(getBudgets(userId));
        dispatch(getWallets(userId));

    }, [userId, dispatch]);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <div className={styles.header}>
                <h2 className={styles.title}>Budget</h2>
                <Button s onClick={toggleForm}>
                    Add Budget
                </Button>
            </div>

            <div className={styles.bodyContainer}>
                {budgets.length === 0 ? (
                    <div className={styles.addBudgetCard} onClick={toggleForm}>
                        <AiOutlinePlus className={styles.addBudgetCardIcon}/>
                    </div>
                ) : (
                    budgets.map((budget) => {
                        return <BudgetCard key={budget._id} budgetData={budget} />;
                    })
                )}
            </div>

            <AddBudgetForm
                showForm={showForm}
                setShowForm={setShowForm}
                formRef={formRef}
                userId={userId}
                wallets={wallets}
                user={user}
            />
        </div>
    );
}

export default Budget;
