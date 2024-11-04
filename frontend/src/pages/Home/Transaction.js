import styles from './Home.module.scss';
import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import {editIcon, deleteIcon} from '../../assets/icons/icons';

function Transaction({transaction, hidden, className, ...passProps }) {
    console.log('transaction', transaction)

    const {type, amount, label, wallet, date, note, image} = transaction

    let classes = `
        ${className} 
        ${styles.transactionForm} 
        ${hidden ? styles.hidden : ''}
    `;

    const typeIcon = () => {
        if(type === 'income') {
            return <BiSolidPlusCircle className={styles.plusIcon}/>
        } else if(type === 'expense') {
            return <BiSolidMinusCircle className={styles.minusIcon}/>
        } else 
        return null;
    }

    const formattedDate = function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { weekday: 'long' }; // Get the full name of the day (e.g., "Monday")
        const dayOfWeek = date.toLocaleDateString('en-US', options);
        const day = String(date.getDate()).padStart(2, '0'); // Ensure day is two digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
        const year = date.getFullYear();
    
        return `${dayOfWeek}, ${day}/${month}/${year}`;
    }

    const handleTransactionEdit = () => {
        console.log('Transaction Edit')
    }

    const handleTransactionDelete = () => {
        console.log('Transaction Delete')
    }

    return ( 
        <div className={classes}>
            <div className={styles.formOverlay}>
                <div className={styles.formContainer}>
                    <div className={styles.transactionHeader}>
                        {typeIcon()}
                        <div className={styles.TransactionBalance}>${amount}</div>
                    </div>
                        
                    <div className={styles.transactionInfo}>
                        <div>
                            <div className={styles.transactionLabel}>{label}</div>
                            <div>Icon</div>
                        </div>
                        <div className={styles.transactionImage}></div>
                    </div>
                        
                    <div className={styles.transactionNote}>
                        {note}
                    </div>
                        
                    <div className={styles.transactionActions}>
                        <div className={styles.transactionDate}>{formattedDate}</div>
                        <div className={styles.transactionBtnContainer}>
                            <button className={styles.transactionBtn} onClick={handleTransactionEdit}>
                                {editIcon({ width: "23px", height: "23px" })}
                            </button>
                            <button className={styles.transactionBtn} onClick={handleTransactionDelete}>
                                {deleteIcon({ width: "26px", height: "26px" })}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Transaction;