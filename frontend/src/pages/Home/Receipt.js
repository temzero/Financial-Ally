import { useState } from 'react';
import { BiSolidPlusCircle, BiSolidMinusCircle } from "react-icons/bi";
import styles from './Home.module.scss';
import Button from '../../components/Button/Button';

function Receipt({currentUser}) {
    const [transferType, setTransferType] = useState('');
    const [amount, setAmount] = useState('');
    const [label, setLabel] = useState('');
    const [wallet, setWallet] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
    const [note, setNote] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const Wallets = currentUser?.wallets || [];
    const userId = currentUser._id
    
    const handleReceiptSubmit = (event) => {
        event.preventDefault();

        if (!transferType) {
            alert('Please select either Income or Expense.');
            return; // Prevent submission
        }

        const transaction = {
            transferType,
            amount,
            label,
            wallet,
            date,
            note,
            image,
            userId,
        };

        console.log("transaction data:", transaction);

        setTransferType('')
        setAmount(''); 
        setLabel('');
        setWallet('');
        setDate(new Date().toISOString().split("T")[0])
        setNote('')
        setImage(null)
        setImagePreview(null)
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
                    value={transferType}
                    className={`${styles.plusBtn} ${transferType === 'income' ? styles.active : ''}`}
                    onClick={() => setTransferType('income')}
                    />
                <BiSolidMinusCircle 
                    value={transferType}
                    className={`${styles.minusBtn} ${transferType === 'expense' ? styles.active : ''}`}
                    onClick={() => setTransferType('expense')}
                />
            </div>
            <div className={styles.formContent}>
                <div className={styles.formLabel}>Amount</div>
                <input
                    className={styles.formInputAmount}
                    type="number"
                    placeholder='$'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />

                <div className={styles.formLabel}>Label</div>
                <select
                    className={styles.formInputOptions}
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    required
                >
                    <option value="others">Others</option>
                    <option value="food">Food</option>
                    <option value="fashion">Fashion</option>
                    <option value="arcade">Arcade</option>
                    <option value="grocery">Grocery</option>
                </select>

                <div className={styles.formLabel}>Wallet</div>
                <select
                    className={styles.formInputOptions}
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    required
                >
                    {Wallets.map((walletItem) => (
                        <option key={walletItem._id} value={walletItem.name}>
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
                        <img src={imagePreview} alt="Uploaded Preview" className={styles.imagePreview} />
                    )}
                </div>

                <textarea
                    className={styles.formInputNote}
                    placeholder="Note (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            
                <div className={styles.receiptBtnContainer}>
                    <Button type="submit" primary rounded className={styles.receiptSubmit}>
                        Add
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default Receipt;
