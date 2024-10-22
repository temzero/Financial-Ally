import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import styles from './Wallet.module.scss';
import Button from '../../components/Button/Button';
import { store } from '../../redux/store';
import { addWallet } from '../../redux/actions';

function Wallet() {
    const [showForm, setShowForm] = useState(false);

    // State for form values
    const [walletName, setWalletName] = useState('');
    const [amount, setAmount] = useState('');
    const [walletType, setWalletType] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    // Reference for the form container
    const formRef = useRef(null);

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Detect outside click to close the form
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setWalletName('');
                setAmount('');
                setWalletType('');
                setSelectedColor('');
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
    }, [showForm]);

    const handleAddWallet = () => {
        setShowForm(!showForm);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Data to send
        const walletData = {
            name: walletName,
            amount,
            type: walletType,
            color: selectedColor
        };

        console.log('Submitting wallet data:', walletData);

        // Dispatch the action to add the wallet (or make an API call)
        store.dispatch(addWallet(walletData));

        // Clear the form and hide it
        setWalletName('');
        setAmount('');
        setWalletType('');
        setSelectedColor('');
        setShowForm(false);
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color); // Set the selected color
    };

    return (
        <div>
            <div className={styles.header}>
                <h2 className={styles.title}>Wallet</h2>
                <div>
                    <Button primary onClick={handleAddWallet}>
                        Add Wallet
                    </Button>
                </div>
            </div>

            <div className={styles.info}>
                <h3>
                    {user.firstName} {user.lastName}
                </h3>
                <h3>Email: {user.email}</h3>
                <h3>Balance: ${user.balance}</h3>
            </div>

            {showForm && (
                <div className={styles.formOverlay}>
                    {/* Attach ref to form container */}
                    <div className={styles.formContainer} ref={formRef}>
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <input
                                    className={styles.formNameInput}
                                    type="text"
                                    placeholder='Wallet Name'
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
                                        placeholder='$'
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Drop-down for Wallet Type */}
                                <div>
                                    <h2 className={styles.formLabel}>Type</h2>
                                    <select
                                        className={`${styles.formInput} ${styles.formInputSelect}`}
                                        value={walletType}
                                        onChange={(e) => setWalletType(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select Type</option>
                                        <option value="personal">Personal</option>
                                        <option value="business">Business</option>
                                        <option value="savings">Savings</option>
                                    </select>
                                </div>

                                {/* Color Options */}
                                <div>
                                    <h2 className={styles.formLabel}>Color</h2>
                                    <div className={styles.colorOptions}>
                                        <div
                                            className={`${styles.circleOption} ${styles.green}`}
                                            onClick={() => handleColorSelect('green')}
                                            style={{ border: selectedColor === 'green' ? '4px solid grey' : 'none' }}
                                        ></div>
                                        <div
                                            className={`${styles.circleOption} ${styles.red}`}
                                            onClick={() => handleColorSelect('red')}
                                            style={{ border: selectedColor === 'red' ? '4px solid grey' : 'none' }}
                                        ></div>
                                        <div
                                            className={`${styles.circleOption} ${styles.blue}`}
                                            onClick={() => handleColorSelect('blue')}
                                            style={{ border: selectedColor === 'blue' ? '4px solid grey' : 'none' }}
                                        ></div>
                                        <div
                                            className={`${styles.circleOption} ${styles.orange}`}
                                            onClick={() => handleColorSelect('orange')}
                                            style={{ border: selectedColor === 'orange' ? '4px solid grey' : 'none' }}
                                        ></div>
                                        <div
                                            className={`${styles.circleOption} ${styles.purple}`}
                                            onClick={() => handleColorSelect('purple')}
                                            style={{ border: selectedColor === 'purple' ? '4px solid grey' : 'none' }}
                                        ></div>
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
            )}
        </div>
    );
}

export default Wallet;
