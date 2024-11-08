import styles from './Transaction.module.scss';
import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import { editIcon, deleteIcon } from '../../assets/icons/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../../redux/actions';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import BalanceInput from '../FormInput/BalanceInput';
import LabelInput from '../FormInput/LabelInput';
import NoteInput from '../FormInput/NoteInput';

function Transaction({ transaction, setSelectedTransaction, color, hidden, className }) {
    const [editable, setEditable] = useState(false);
    const [amount, setAmount] = useState(transaction.amount);
    const [label, setLabel] = useState(transaction.label);
    const [note, setNote] = useState(transaction.note);

    const editData = {
        amount,
        label,
        note
    }

    let classes = `
        ${className} 
        ${styles.transactionForm} 
        ${color ? styles.color : ''}
        ${hidden ? styles.hidden : ''}
    `;

    const dispatch = useDispatch();

    const typeIcon = () => {
        if(transaction.type === 'income') {
            return <BiSolidPlusCircle className={`${styles.transactionTypeIcon} ${styles[color]}`}/>;
        } else if(transaction.type === 'expense') {
            return <BiSolidMinusCircle className={`${styles.transactionTypeIcon} ${styles[color]}`}/>;
        } else {
            return null;
        }
    };

    const formattedDate = () => {
        const date = new Date(transaction.date);
        const options = { weekday: 'long' };
        const dayOfWeek = date.toLocaleDateString('en-US', options);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
    
        return `${dayOfWeek}, ${day}/${month}/${year}`;
    };

    const editButtons = () => {
        return (
            <div className={styles.transactionBtnContainer}>
                {editable ? (
                    <>
                        <button className={styles.transactionBtn} onClick={handleEditConfirm}>
                            <AiOutlineCheckCircle className={styles.confirmIcon} />
                        </button>
                        <button className={styles.transactionBtn} onClick={handleCancelEdit}>
                            <AiOutlineCloseCircle className={styles.closeIcon} />
                        </button>
                    </>
                ) : (
                    <>
                        <button className={styles.transactionBtn} onClick={onEditButtonClicked}>
                            {editIcon({ width: "23px", height: "23px" })}
                        </button>
                        <button className={styles.transactionBtn} onClick={handleTransactionDelete}>
                            {deleteIcon({ width: "26px", height: "26px" })}
                        </button>
                    </>
                )}
            </div>
        );
    };

    const onEditButtonClicked = (event) => {
        event.stopPropagation();
        setEditable(true);
    };
    
    const handleEditConfirm = (event) => {
        event.stopPropagation();
        console.log('Transaction Edit', editData);
        setEditable(false);
        // dispatch(editTransaction(editData, _id)); // Uncomment to send data to Redux
    };
    
    const handleCancelEdit = (event) => {
        event.stopPropagation();
        setEditable(false);
        setAmount(transaction.amount)
        setLabel(transaction.label)
        setNote(transaction.note)
    };

    const handleTransactionDelete = () => {
        console.log('Transaction Delete');
        dispatch(deleteTransaction(transaction._id));
    };
        
    const handleClickOutside = (event) => {
        event.stopPropagation();
        setSelectedTransaction(null);
        console.log('Close transaction');
    };

    return ( 
        <div className={classes}>
            <div className={styles.formOverlay} onClick={handleClickOutside}>
                <div className={styles.formContainer} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.transactionHeader}>
                        <div className={styles.transactionTypeIcon }>
                            {typeIcon()}
                        </div>
                        <div className={styles.TransactionBalance}>
                            {editable ? (
                                <BalanceInput amount={amount} setAmount={setAmount} className={styles.balanceInput}/>
                            ) : (
                                `$${amount}`
                            )}
                        </div>
                    </div>
                        
                    <div className={`${styles.transactionInfo} ${styles[`border${color}`]}`}>
                        <div className={styles.transactionLabelContainer}>
                            {editable ? (
                                <LabelInput label={label} setLabel={setLabel} className={styles.labelInput}/>
                            ) : (
                                <div className={styles.transactionLabel}>{label}</div>
                            )}
                            <div>Icon</div>
                        </div>
                        <div className={styles.transactionImage}></div>
                    </div>
                        
                    <div className={styles.transactionNote}>
                        {editable ? (
                            <NoteInput note={note} setNote={setNote}  className={styles.noteInput}/>
                        ) : (
                            note
                        )}
                    </div>
                        
                    <div className={styles.transactionActions}>
                        <div className={styles.transactionDate}>
                            {formattedDate()}
                        </div>
                        {editButtons()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transaction;
