import styles from './WalletInfo.module.scss';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateWallet } from '../../../redux/actions';
import Button from '../../../components/Button/Button';
import BalanceInput from '../../../components/FormInput/BalanceInput';
import WalletTypeInput from '../../../components/FormInput/WalletTypeInput';
import ColorInput from '../../../components/FormInput/ColorInput';

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
        closeForm();
    };

    return (
        showForm && (
            <div className='overlay'>
                <div className='form-container' ref={formRef}>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <input
                                className='form-name-input'
                                type="text"
                                placeholder="Wallet Name"
                                value={walletName}
                                onChange={(e) => setWalletName(e.target.value)}
                            />
                        </div>
                        <div className='form-divider'></div>
                        <div className='form-content'>
                            <div>
                                <h2 className='form-label'>Amount</h2>
                                <BalanceInput amount={walletBalance} setAmount={setWalletBalance}/>
                            </div>
                            <div>
                                <h2 className='form-label'>Type</h2>
                                <WalletTypeInput type={walletType} setType={setWalletType}/>
                            </div>
                            <div>
                                <ColorInput color={walletColor} setColor={setWalletColor}/>
                            </div>
                            <div className='form-btn-container'>
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
