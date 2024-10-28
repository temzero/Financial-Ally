import styles from './Budget.module.scss';
import Button from '../../components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getBudgets, getWallets } from '../../redux/actions';
import AddBudgetForm from './AddBudgetForm';
import BudgetCard from './BudgetCard';

function Budget() {

    const [showForm, setShowForm] = useState(false);
    const currentUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const formRef = useRef(null);
    
    const budgets = currentUser?.budgets || [];
    const userId = currentUser._id;

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
                    ''
                ) : (
                    budgets.map((budget) => (
                        <BudgetCard key={budget._id} budgetData={budget} />
                    ))
                )}
            </div>

            <AddBudgetForm
                showForm={showForm}
                setShowForm={setShowForm}
                formRef={formRef}
                userId={userId}
            />
        </div>
    );
}

export default Budget;
