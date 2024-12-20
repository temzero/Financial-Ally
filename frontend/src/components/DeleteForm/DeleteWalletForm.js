import styles from './DeleteForm.module.scss';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteWallet, setOverlay } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowRight } from "react-icons/hi";
import { IoWallet } from "react-icons/io5";
import trashIcon from '../../assets/images/opentrashcan.png';
import useClickOutside from '../ClickOutside/useClickOutside';
import useFadeIn from '../Animation/useFadeIn';


function DeleteWalletForm({ showForm, setShowForm, wallet }) {
    const walletId = wallet?._id;
    const name = wallet?.name || '';
    const color = wallet?.color || '';
    const formRef = useRef(null)
    const fadeInStyle1s = useFadeIn();
    const fadeInStyle3s = useFadeIn(3000);


    useEffect(() => {dispatch(setOverlay(true))}, [])
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const closeForm = () => {
        setShowForm(false);
        dispatch(setOverlay(false))
    }

    const handleDeleteWallet = (e) => {
        e.preventDefault();
        dispatch(deleteWallet(walletId));
        closeForm()
        navigate('/wallet');
    };

    useClickOutside( formRef, closeForm);

    return (
        showForm && (
            <div className='overlay'>
                <div className='form-container' ref={formRef}>
                    <div className='form-title'>
                        Do you want to delete this wallet?
                    </div>

                    <div className={styles.formBody}>
                        <div className={`${styles.formIconContainer} text-${color}`}>
                            <div className={styles.formIcon}>
                                <IoWallet className={styles.walletIcon}/>
                            </div>
                            <div className={styles.formName}>{name}</div>
                        </div>
                        <HiOutlineArrowRight className={styles.formArrow} style={fadeInStyle1s}/>
                        <img 
                            src={trashIcon} 
                            alt="Trash Can Icon" 
                            className={styles.trashIcon} 
                            style={fadeInStyle3s}
                        />
                    </div>
                    <div className={styles.formDeleteButtons}>
                        <div className={`${styles.deleteButton} primary-red`} onClick={handleDeleteWallet}>Delete</div>
                        <div className={styles.cancelButton} onClick={closeForm}>Cancel</div>
                    </div>
                </div>
            </div>
        )
    );
}

export default DeleteWalletForm;
