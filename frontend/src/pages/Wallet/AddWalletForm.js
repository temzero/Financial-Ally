import styles from './Wallet.module.scss';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addWallet } from '../../redux/actions';
import TextInput from '../../components/FormInput/TextInput';
import BalanceInput from '../../components/FormInput/BalanceInput';
import WalletTypeInput from '../../components/FormInput/WalletTypeInput';
import ColorInput from '../../components/FormInput/ColorInput';
import Button from '../../components/Button/Button';
import useClickOutside from '../../components/ClickOutside/useClickOutside';

function AddWalletForm({ showForm, setShowForm, formRef, userId }) {
    const dispatch = useDispatch();
    const [walletName, setWalletName] = useState('');
    const [balance, setBalance] = useState('');
    const [walletType, setWalletType] = useState('');
    const [walletColor, setWalletColor] = useState('');

    const [counter, setCounter] = useState(0);
    const [isNameFocus, setIsNameFocus] = useState(false);
    const [isBalanceFocus, setIsBalanceFocus] = useState(false);
    const [isTypeFocus, setIsTypeFocus] = useState(false);
    const [isColorFocus, setIsColorFocus] = useState(false);
    const [isSubmitFocus, setIsSubmitFocus] = useState(false);
    const isFormComplete = walletName && balance && walletColor;

    const closeForm = useCallback(() => {
        setWalletName('');
        setBalance('');
        setWalletType('');
        setWalletColor('');
        setCounter(0);
        setShowForm(false);
    }, [setShowForm]);

    useClickOutside(
        formRef,
        () => {
            if (!isTypeFocus) {
                closeForm();
            }
        }
    );

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isTypeFocus) {
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    return;
                }
            }

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setCounter((prevCounter) => (prevCounter + 1) % 5);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setCounter((prevCounter) => (prevCounter - 1 + 5) % 5);
            } else if (event.key === 'Enter') {
                if (isSubmitFocus && isFormComplete) {
                    const submitButton = document.querySelector(`.${styles.submitButton}`);
                    if (submitButton) submitButton.click();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [counter, isSubmitFocus, isFormComplete, isTypeFocus, isColorFocus, isNameFocus]);

    useEffect(() => {
        const focusStates = {
            0: [true, false, false, false, false],
            1: [false, true, false, false, false],
            2: [false, false, true, false, false],
            3: [false, false, false, true, false],
            4: [false, false, false, false, true],
        };

        const [
            nameFocus,
            balanceFocus,
            typeFocus,
            colorFocus,
            submitFocus,
        ] = focusStates[counter] || [];
        setIsNameFocus(nameFocus);
        setIsBalanceFocus(balanceFocus);
        setIsTypeFocus(typeFocus);
        setIsColorFocus(colorFocus);
        setIsSubmitFocus(submitFocus);
    }, [counter]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
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

    return (
        showForm && (
            <div className={styles.formOverlay}>
                <div className={styles.formContainer} ref={formRef}>
                    <form onSubmit={handleFormSubmit}>
                        <div className={`${styles.namePlate} ${styles[walletColor]}`} onClick={() => setCounter(0)}>
                            <TextInput
                                className={styles.formNameInput}
                                content={walletName}
                                setContent={setWalletName}
                                isFocusOutside={isNameFocus}
                                setIsFocusOutside={setIsNameFocus}
                                placeholder="Enter wallet Name"
                            />
                        </div>
                        <div className={styles.formContent}>
                            <div onClick={() => setCounter(1)}>
                                <h2 className={styles.formLabel}>Amount</h2>
                                <BalanceInput
                                    amount={balance}
                                    setAmount={setBalance}
                                    isFocusOutside={isBalanceFocus}
                                    setIsFocusOutside={setIsBalanceFocus}
                                />
                            </div>
                            <div onClick={() => setCounter(2)}>
                                <h2 className={styles.formLabel}>Type</h2>
                                <WalletTypeInput
                                    type={walletType}
                                    setType={setWalletType}
                                    isFocusOutside={isTypeFocus}
                                    setIsFocusOutside={setIsTypeFocus}
                                />
                            </div>
                            <div onClick={() => setCounter(3)}>
                                <ColorInput
                                    color={walletColor}
                                    setColor={setWalletColor}
                                    isFocusOutside={isColorFocus}
                                    setIsFocusOutside={setIsColorFocus}

                                />
                            </div>
                            <div className={styles.formBtnContainer} onClick={() => setCounter(4)}>
                                <Button
                                    type="submit"
                                    simple
                                    disabled={!isFormComplete}
                                    className={`${styles.submitButton} ${counter === 4 ? styles.clickable : ''}`}
                                >
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
