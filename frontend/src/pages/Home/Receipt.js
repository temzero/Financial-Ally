import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import styles from './Home.module.scss';
import Button from '../../components/Button/Button';
import { addTransaction, updateBudget, editWallet } from '../../redux/actions';

function Receipt({ currentUser }) {
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [label, setLabel] = useState('others');
    const [walletId, setWalletId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
    const [note, setNote] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const wallets = currentUser?.wallets || [];
    const budgets = currentUser?.budgets || [];
    console.log("budgets", budgets)
    const userId = currentUser._id;

    const dispatch = useDispatch()

    const handleReceiptSubmit = (event) => {
        event.preventDefault();

        const wallet = wallets.find(wallet => wallet._id === walletId) || '';
        let walletBalance = wallet.balance
        console.log("Wallet: ", wallet)
        console.log("walletBalance before: ", walletBalance)
        
        if(type === 'income') {
            walletBalance += amount;
        } else if(type === 'expense') {
            if(walletBalance < amount) {
                console.log('Not enough money!');
                return null
            }
            walletBalance -= amount;

            // Add expense to budget
            budgets.forEach(budget => {
                let updatedMoneySpend = budget.moneySpend + amount;

                let budgetUpdatedData = {
                    moneySpend: updatedMoneySpend,
                };
                
                dispatch(updateBudget(budgetUpdatedData, budget._id));
            });
        }
        console.log("walletBalance after: ", walletBalance)

        const walletUpdatedData = {
            balance: walletBalance,
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

        dispatch(editWallet(walletUpdatedData, walletId))
        dispatch(addTransaction(transactionData))
        

        setType('');
        setAmount('');
        setLabel('others');
        setWalletId('');
        // setDate(new Date().toISOString().split('T')[0]);
        setNote('');
        setImage(null);
        setImagePreview(null);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <form className={styles.receipt} onSubmit={handleReceiptSubmit}>
            <div className={styles.plusMinusContainer}>
                <BiSolidPlusCircle
                    value={type}
                    className={`${styles.plusBtn} ${
                        type === 'income' ? styles.active : ''
                    }`}
                    onClick={() => setType('income')}
                />
                <BiSolidMinusCircle
                    value={type}
                    className={`${styles.minusBtn} ${
                        type === 'expense' ? styles.active : ''
                    }`}
                    onClick={() => setType('expense')}
                />
            </div>
            <div className={styles.formContent}>
                <div className={styles.formLabel}>Amount</div>
                <input
                    className={styles.formInputAmount}
                    type="number"
                    placeholder="$"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                />

                <div className={styles.formLabel}>Label</div>
                <select
                    className={styles.formInputOptions}
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                >
                    <option value="Others">Others</option>
                    <option value="Food">Food</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Grocery">Grocery</option>
                </select>

                <div className={styles.formLabel}>Wallet</div>
                <select
                    className={styles.formInputOptions}
                    placeholder="Select a wallet"
                    value={walletId}
                    onChange={(e) => setWalletId(e.target.value)}
                    required
                >
                    <option value="" disabled hidden>
                        Select a wallet
                    </option>
                    {wallets.map((walletItem) => (
                        <option key={walletItem._id} value={walletItem._id}>
                            {walletItem.name}
                        </option>
                    ))}
                </select>

                <div className={styles.formLabel}>Date</div>
                <input
                    className={styles.formInputOptions}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <div className={styles.imageUploadContainer}>
                    <label htmlFor="file-upload" className={styles.uploadImage}>
                        Upload Image
                    </label>
                    <input
                        id="file-upload"
                        className={styles.formInputImage}
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                    />

                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Uploaded Preview"
                            className={styles.imagePreview}
                        />
                    )}
                </div>

                <textarea
                    className={styles.formInputNote}
                    placeholder="Note (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />

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
