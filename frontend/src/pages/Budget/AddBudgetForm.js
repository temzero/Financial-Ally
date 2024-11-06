import styles from './Budget.module.scss';
import Button from '../../components/Button/Button';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addBudget } from '../../redux/actions';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WalletDropdown from './WalletDropdown';

function AddBudgetForm({ showForm, setShowForm, formRef, userId }) {
    const currentUser = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const allWallets = currentUser.wallets || [];

    const [budgetName, setBudgetName] = useState('');
    const [moneyLimit, setMoneyLimit] = useState('');
    const [selectedWallets, setSelectedWallets] = useState([]);
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState(
        new Date().toISOString().split('T')[0]
    );
    const [finishDate, setFinishDate] = useState('');
    const [selectedColor, setSelectedColor] = useState('');


    const closeForm = useCallback(() => {
        setBudgetName('');
        setMoneyLimit('');
        setSelectedWallets(allWallets);
        setCategory('');
        setStartDate(new Date().toISOString().split('T')[0]);
        setFinishDate('');
        setSelectedColor('');
        setShowForm(false);
    }, [setShowForm, allWallets]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                closeForm();
            }
        };

        if (showForm) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showForm, closeForm, formRef]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const selectedWalletsId =  selectedWallets.map(wallet => wallet._id);

        const newBudget = {
            name: budgetName,
            moneyLimit,
            walletIds: selectedWalletsId,
            category: category,
            startDate,
            finishDate,
            color: selectedColor,
            userId,
        };
        console.log('newBudget: ', newBudget)

        dispatch(addBudget(newBudget));
        closeForm();
    };

    return (
        showForm && (
            <div className={styles.formOverlay}>
                <div className={styles.formContainer} ref={formRef}>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <input
                                className={styles.formNameInput}
                                type="text"
                                placeholder="Budget Name"
                                value={budgetName}
                                onChange={(e) => setBudgetName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formDivider}></div>
                        <div className={styles.formContent}>
                            <div>
                                <h2 className={styles.formLabel}>
                                    Set Limit Amount
                                </h2>
                                <input
                                    className={styles.formInput}
                                    type="number"
                                    placeholder="$"
                                    value={moneyLimit}
                                    onChange={(e) => setMoneyLimit(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <WalletDropdown
                                    allWallets={allWallets}
                                    selectedWallets={selectedWallets}
                                    setSelectedWallets={setSelectedWallets}
                                />
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>Category</h2>
                                <select
                                    className={`${styles.formInput} ${styles.formInputSelect}`}
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    required
                                >
                                    <option >All Expenses & incomes</option>
                                    <option value="Income">Incomes</option>
                                    <option value="Expense">Expenses</option>
                                </select>
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>Start Date</h2>
                                <input
                                    className={styles.formInput}
                                    type="date"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>
                                    Finish Date
                                </h2>
                                <input
                                    className={styles.formInput}
                                    type="date"
                                    value={finishDate}
                                    onChange={(e) =>
                                        setFinishDate(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <div className={styles.colorOptions}>
                                    {[
                                        'green',
                                        'red',
                                        'blue',
                                        'orange',
                                        'purple',
                                        'rainbow',
                                    ].map((color) => (
                                        <div
                                            key={color}
                                            className={`${styles.circleOption} ${styles[color]}`}
                                            onClick={() =>
                                                setSelectedColor(color)
                                            }
                                            style={{
                                                border:
                                                    selectedColor === color
                                                        ? '4px solid grey'
                                                        : 'none',
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.formBtnContainer}>
                                <Button type="submit" simple>
                                    Add Budget
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default AddBudgetForm;
