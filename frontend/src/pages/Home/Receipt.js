import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import styles from './Home.module.scss';
import Button from '../../components/Button/Button';
import DateInput from '../../components/FormInput/DateInput';
import { addTransaction, updateBudget, updateWallet } from '../../redux/actions';
import LabelInput from '../../components/FormInput/LabelInput';
import WalletInput from '../../components/FormInput/WalletInput';
import BalanceInput from '../../components/FormInput/BalanceInput';
import TextInput from '../../components/FormInput/NoteInput';
import ImageInput from '../../components/FormInput/ImageInput';

function Receipt({ currentUser }) {
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [label, setLabel] = useState('Others');
    const [walletId, setWalletId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
    const [note, setNote] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const wallets = currentUser?.wallets || [];
    const budgets = currentUser?.budgets || [];
    const userId = currentUser._id;

    const dispatch = useDispatch();

    const handleReceiptSubmit = async (event) => {
        event.preventDefault();

        const wallet = wallets.find((wallet) => wallet._id === walletId) || {};
        let walletBalance = wallet.balance;

        if (type === 'expense' && walletBalance < amount) {
            console.log('Not enough money!');
            return null;
        }

        const transactionData = {
            type,
            amount,
            label,
            walletId,
            date,
            note,
            image,
            userId,
        };

        // Create the new transaction and get the transaction ID
        const newTransaction = await dispatch(addTransaction(transactionData));
        const newTransactionId = newTransaction?._id;

        if (!newTransactionId) {
            console.error('Failed to retrieve new transaction ID');
            return;
        }

        // Update wallet balance based on transaction type
        walletBalance += type === 'income' ? amount : -amount;

        const walletUpdatedData = {
            balance: walletBalance,
            transactionIds: [...wallet.transactionIds, newTransactionId],
        };

        dispatch(updateWallet(walletUpdatedData, walletId));

        // Update relevant budgets if the transaction is an expense
        if (type === 'expense') {
            budgets.forEach((budget) => {
                const budgetWalletIds = budget.walletIds || [];
                const isWalletInBudget = budgetWalletIds.includes(walletId);

                if (!budgetWalletIds.length || isWalletInBudget) {
                    const updatedMoneySpend = budget.moneySpend + amount;
                    const budgetUpdatedData = {
                        moneySpend: updatedMoneySpend,
                        transactionIds: [...budget.transactionIds, newTransactionId],
                    };
                    dispatch(updateBudget(budgetUpdatedData, budget._id));
                }
            });
        }

        // Reset form fields
        setType('');
        setAmount('');
        setLabel('Others');
        setWalletId('');
        setDate(new Date().toISOString().split('T')[0]);
        setNote('');
        setImage(null);
        setImagePreview(null);
    };

    return (
        <form className={styles.receipt} onSubmit={handleReceiptSubmit}>
            <div className={styles.plusMinusContainer}>
                <BiSolidPlusCircle
                    className={`${styles.plusBtn} ${type === 'income' ? styles.active : ''}`}
                    onClick={() => setType('income')}
                />
                <BiSolidMinusCircle
                    className={`${styles.minusBtn} ${type === 'expense' ? styles.active : ''}`}
                    onClick={() => setType('expense')}
                />
            </div>
            <div className={styles.formContent}>
                <div className={styles.formLabel}>Amount</div>
                <BalanceInput amount={amount} setAmount={setAmount} />

                <div className={styles.formLabel}>Label</div>
                <LabelInput label={label} setLabel={setLabel} />

                <div className={styles.formLabel}>Wallet</div>
                <WalletInput walletId={walletId} setWalletId={setWalletId} wallets={wallets} />

                <div className={styles.formLabel}>Date</div>
                <DateInput date={date} setDate={setDate} />

                <ImageInput image={image} setImage={setImage} imagePreview={imagePreview} setImagePreview={setImagePreview} />

                <TextInput note={note} setNote={setNote} />

                <div className={styles.receiptBtnContainer}>
                    <Button
                        disabled={!type || !amount || !walletId || !date}
                        type="submit"
                        primary
                        rounded
                        className={styles.receiptSubmit}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default Receipt;

