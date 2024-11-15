import styles from './Wallet.module.scss';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'; // Assuming you're using Redux
import { addWallet } from '../../redux/actions';
import TextInput from '../../components/FormInput/TextInput';
import BalanceInput from '../../components/FormInput/BalanceInput';
import WalletTypeInput from '../../components/FormInput/WalletTypeInput';
import ColorInput from '../../components/FormInput/ColorInput';
import Button from '../../components/Button/Button';

function AddWalletForm({ showForm, setShowForm, formRef, userId}) {

    const dispatch = useDispatch(); // Initialize useDispatch for Redux
    const [walletName, setWalletName] = useState('');
    const [balance, setBalance] = useState('');
    const [walletType, setWalletType] = useState('');
    const [walletColor, setWalletColor] = useState('');

    const closeForm = useCallback(() => {
        setWalletName('');
        setBalance('');
        setWalletType('');
        setWalletColor('');
        setShowForm(false);
    }, [setShowForm]);
    
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
        console.log("Form submitted!"); 
        // Data to send
        const newWallet = {
            name: walletName,
            balance,
            type: walletType,
            color: walletColor,
            userId,
        };

        dispatch(addWallet(newWallet));
        closeForm();
    };

    const isFormComplete = walletName && balance && walletColor;

    return (
        showForm && (
            <div className={styles.formOverlay}>
                <div className={styles.formContainer} ref={formRef}>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <TextInput className={styles.formNameInput} content={walletName} setContent={setWalletName} placeholder="Enter wallet Name" />
                        </div>
                        <div className={styles.formDivider}></div>
                        <div className={styles.formContent}>
                            <div>
                                <h2 className={styles.formLabel}>Amount</h2>
                                <BalanceInput amount={balance} setAmount={setBalance}/>
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>Type</h2>
                                <WalletTypeInput type={walletType} setType={setWalletType}/>
                            </div>
                            <div>
                                <ColorInput color={walletColor} setColor={setWalletColor} />
                            </div>
                            <div className={styles.formBtnContainer}>
                                <Button type="submit" simple disabled={!isFormComplete}>
                                    Add Wallet
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default AddWalletForm;
