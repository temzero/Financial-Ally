import styles from './EditForm.module.scss';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateWallet } from '../../redux/actions';
import Button from '../Button/Button';
import BalanceInput from '../FormInput/BalanceInput';
import WalletTypeInput from '../FormInput/WalletTypeInput';
import ColorInput from '../FormInput/ColorInput';

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

        dispatch(updateWallet(updateWalletData, walletId));
        setShowForm(false);
    };

    return (
        showForm && (
            <div className={styles.formOverlay}>
                <div className={styles.formContainer} ref={formRef}>
                    <form onSubmit={handleFormSubmit}>
                        <div className={`${styles.namePlate} ${styles[walletColor]}`}>
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
                                <BalanceInput amount={walletBalance} setAmount={setWalletBalance}/>
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>Type</h2>
                                <WalletTypeInput type={walletType} setType={setWalletType}/>
                            </div>
                            <div>
                                <ColorInput color={walletColor} setColor={setWalletColor}/>
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
