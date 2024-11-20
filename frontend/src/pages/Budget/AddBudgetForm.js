import styles from './Budget.module.scss';
import Button from '../../components/Button/Button';
import DateInput from '../../components/FormInput/DateInput';
import BalanceInput from '../../components/FormInput/BalanceInput';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addBudget } from '../../redux/actions';
import TextInput from '../../components/FormInput/TextInput';
import WalletsInput from '../../components/FormInput/WalletsInput';
import ColorInput from '../../components/FormInput/ColorInput';
import BudgetTypeInput from '../../components/FormInput/BudgetTypeInput';

function AddBudgetForm({ showForm, setShowForm, formRef, userId, wallets, user }) {
    const dispatch = useDispatch();

    const [budgetName, setBudgetName] = useState('');
    const [moneyLimit, setMoneyLimit] = useState('');
    const [selectedWallets, setSelectedWallets] = useState([]);
    const [type, setType] = useState('');
    const [startDate, setStartDate] = useState(
        new Date().toISOString().split('T')[0]
    );
    const [finishDate, setFinishDate] = useState('');
    const [budgetColor, setBudgetColor] = useState('');

    const closeForm = useCallback(() => {
        setBudgetName('');
        setMoneyLimit('');
        setSelectedWallets(wallets);
        setType('');
        setStartDate(new Date().toISOString().split('T')[0]);
        setFinishDate('');
        setBudgetColor('');
        setShowForm(false);
    }, [setShowForm, wallets]);

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
        const selectedWalletsId = selectedWallets.map((wallet) => wallet._id);

        const newBudget = {
            name: budgetName,
            moneyLimit,
            walletIds: selectedWalletsId,
            type: type,
            startDate,
            finishDate,
            color: budgetColor,
            userId,
        };
        console.log('newBudget: ', newBudget);

        dispatch(addBudget(newBudget));
        closeForm();
    };
    
    const isFormComplete = budgetName && moneyLimit && startDate && finishDate && budgetColor;

    return (
        showForm && (
            <div className={styles.formOverlay}>
                <div className={styles.formContainer} ref={formRef}>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                             <TextInput className={styles.formNameInput} content={budgetName} setContent={setBudgetName} placeholder="Enter budget Name" />
                        </div>
                        <div className={styles.formDivider}></div>
                        <div className={styles.formContent}>
                            <div>
                                <h2 className={styles.formLabel}>
                                    Set Limit Amount
                                </h2>
                                <BalanceInput amount={moneyLimit} setAmount={setMoneyLimit}/>
                            </div>

                            <div>
                                <h2 className={styles.formLabel}>Wallets</h2>
                                <WalletsInput
                                    wallets={wallets}
                                    selectedWallets={selectedWallets}
                                    setSelectedWallets={setSelectedWallets}
                                />
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>Type</h2>
                                <BudgetTypeInput
                                    type={type}
                                    setType={setType}
                                />
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>Start Date</h2>
                                <DateInput
                                    date={startDate}
                                    setDate={setStartDate}
                                />
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>
                                    Finish Date
                                </h2>
                                <DateInput
                                    date={finishDate}
                                    setDate={setFinishDate}
                                />
                            </div>
                            <div>
                               <ColorInput color={budgetColor} setColor={setBudgetColor}/>
                            </div>
                            <div className={styles.formBtnContainer}>
                                <Button type="submit" simple disabled={!isFormComplete}>
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
