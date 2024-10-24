// AddWalletForm.js
import styles from './Wallet.module.scss';
import Button from '../../components/Button/Button';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'; // Assuming you're using Redux
import { addWallet } from '../../redux/actions';

function AddWalletForm({ showForm, setShowForm, formRef, userId}) {

    const dispatch = useDispatch(); // Initialize useDispatch for Redux
    const [walletName, setWalletName] = useState('');
    const [balance, setBalance] = useState('');
    const [walletType, setWalletType] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const closeForm = useCallback(() => {
        setWalletName('');
        setBalance('');
        setWalletType('');
        setSelectedColor('');
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

        // Data to send
        const newWallet = {
            name: walletName,
            balance,
            type: walletType,
            color: selectedColor,
            userId,
        };

        dispatch(addWallet(newWallet, closeForm));
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
                                required
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
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <h2 className={styles.formLabel}>Type</h2>
                                <select
                                    className={`${styles.formInput} ${styles.formInputSelect}`}
                                    value={walletType}
                                    onChange={(e) => setWalletType(e.target.value)}
                                    required
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
                                            onClick={() => setSelectedColor(color)}
                                            style={{
                                                border: selectedColor === color ? '4px solid grey' : 'none',
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.formBtnContainer}>
                                <Button className={styles.formBtn} type="submit" simple>
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
