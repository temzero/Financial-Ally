import styles from './DeleteForm.module.scss';
import { useDispatch } from 'react-redux';
import { deleteWallet } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import trashIcon from '../../assets/images/opentrashcan.png'
import walletIcon from '../../assets/images/niceWallet.png'
import { HiOutlineArrowRight } from "react-icons/hi";

function DeleteWalletForm({ showForm, setShowForm, wallet }) {
    const walletId = wallet?._id;
    const name = wallet?.name || '';
    const color = wallet?.color || '';

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickOutside = (event) => {
        event.stopPropagation();
        setShowForm(false);
    };

    const handleDeleteWallet = (e) => {
        e.preventDefault();
        dispatch(deleteWallet(walletId));
        setShowForm(false);
        navigate('/wallet');
    };

    return (
        showForm && (
            <div className={styles.formOverlay} onClick={handleClickOutside}>
                <div className={styles.formContainer} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.formTitle}>
                        Do you want to delete this wallet?
                    </div>

                    <div className={styles.formBody}>
                        <div className={`${styles.formIconContainer} ${styles[color]}`}>
                            <div className={styles.formIcon}><img 
                            src={walletIcon} 
                            alt="Wallet" 
                            className={styles.walletIcon} 
                        /></div>
                            <div className={styles.formName}>{name}</div>
                        </div>
                        <HiOutlineArrowRight className={styles.formArrow}/>
                        <img 
                            src={trashIcon} 
                            alt="Trash Can Icon" 
                            className={styles.trashIcon} 
                        />
                    </div>
                    <div className={styles.formDeleteButtons}>
                        <div className={styles.deleteButton}>
                            <span onClick={handleDeleteWallet}>Delete</span>
                        </div>
                        <div className={styles.cancelButton}>
                            <span onClick={handleClickOutside}>Cancel</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default DeleteWalletForm;
