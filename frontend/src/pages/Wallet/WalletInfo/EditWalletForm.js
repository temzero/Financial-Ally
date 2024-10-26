
import styles from './WalletInfo.module.scss';
import Button from '../../../components/Button/Button';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { editWallet } from '../../../redux/actions';


function EditWalletForm({
    walletData,
    formRef,
    showForm,
    setShowForm,
    walletName,
    setWalletName,
    walletBalance,
    setWalletBalance,
    walletType,
    setWalletType,
    walletColor,
    setWalletColor,
}) {

    const walletId = walletData._id;
    const dispatch = useDispatch(); 

    const closeForm = useCallback(() => {
        setWalletName(walletData.name);
        setWalletBalance(walletData.balance);
        setWalletType(walletData.type);
        setWalletColor(walletData.color);
        setShowForm(false);
    }, [walletData, setShowForm, setWalletName, setWalletBalance, setWalletType, setWalletColor]);

    // Clear Form data when the form is closed
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
            // Cleanup event listener on unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showForm, closeForm, formRef]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const updateWalletData = {
            name: walletName,
            balance: walletBalance,
            type: walletType,
            color: walletColor,
        };

        dispatch(editWallet(updateWalletData, walletId));
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
                                placeholder="Wallet Name"
                                value={walletName}
                                onChange={(e) => setWalletName(e.target.value)}
                            />
                        </div>
                        <div className={styles.formDivider}></div>
                        <div className={styles.formContent}>
                            <div>
                                <h2 className={styles.formLabel}>Amount</h2>
                                <input
                                    className={styles.formInput}
                                    type="number"
                                    placeholder="$"
                                    value={walletBalance}
                                    onChange={(e) => setWalletBalance(e.target.value)}
                                />
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>Type</h2>
                                <select
                                    className={`${styles.formInput} ${styles.formInputSelect}`}
                                    value={walletType}
                                    onChange={(e) => setWalletType(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Type
                                    </option>
                                    <option value="personal">Personal</option>
                                    <option value="business">Business</option>
                                    <option value="savings">Savings</option>
                                </select>
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>Color</h2>
                                <div className={styles.colorOptions}>
                                    {['green', 'red', 'blue', 'orange', 'purple', 'rainbow'].map(color => (
                                        <div
                                            key={color}
                                            className={`${styles.circleOption} ${styles[color]}`}
                                            onClick={() => setWalletColor(color)}
                                            style={{
                                                border: walletColor === color ? '4px solid grey' : 'none',
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.formBtnContainer}>
                                <Button type="submit" simple>
                                    Update
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default EditWalletForm;
