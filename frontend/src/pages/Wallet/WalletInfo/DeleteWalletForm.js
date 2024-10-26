import styles from './WalletInfo.module.scss';
import Button from '../../../components/Button/Button';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'; // Assuming you're using Redux
import { deleteWallet } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';

function DeleteWalletForm({ showForm, setShowForm, formRef, walletId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const closeForm = useCallback(() => {
        setShowForm(false);
    }, [setShowForm]);

    // Clear Form data when the form is closed
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                setShowForm(false);
            }
        };

        if (showForm) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            // Cleanup event listener on unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showForm, setShowForm, formRef]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteWallet(walletId, closeForm));
        navigate('/wallet');
    };

    return (
        showForm && (
            <div className={styles.formOverlay}>
                <div className={styles.formContainer} ref={formRef}>
                    <div className={styles.deleteMessage}>
                        Do you want to delete this wallet?
                    </div>
                    <div className={styles.deleteFormBtn}>
                        <Button s danger onClick={handleFormSubmit}>
                            Delete
                        </Button>
                        <Button s onClick={closeForm}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        )
    );
}

export default DeleteWalletForm;
