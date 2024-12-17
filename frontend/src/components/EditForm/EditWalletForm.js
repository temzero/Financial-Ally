import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateWallet } from '../../redux/actions';
import { setOverlay } from '../../redux/actions';
import Button from '../Button/Button';
import BalanceInput from '../FormInput/BalanceInput';
import WalletTypeInput from '../FormInput/WalletTypeInput';
import ColorInput from '../FormInput/ColorInput';
import TextInput from '../FormInput/TextInput';
import useClickOutside from '../ClickOutside/useClickOutside';

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
    useEffect(() => {dispatch(setOverlay(true))}, [])

    const closeForm = useCallback(() => {
        setWalletName(walletData.name);
        setWalletBalance(walletData.balance);
        setWalletType(walletData.type);
        setWalletColor(walletData.color);
        setShowForm(false);
        dispatch(setOverlay(false))
    }, [walletData, setShowForm, setWalletName, setWalletBalance, setWalletType, setWalletColor]);

    useClickOutside(formRef, () => closeForm());

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
        dispatch(setOverlay(false))
    };

    return (
        showForm && (
            <div className='overlay'>
                <div className='form-container' ref={formRef}>
                    <form onSubmit={handleFormSubmit}>
                        <div className={`form-name background-${walletColor}`}>
                            <TextInput  className='form-name-input' content={walletName} setContent={setWalletName} isFocusOutside={true}/>
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
                        </div>
                            <div className='form-btn-container'>
                                <Button type="submit" simple>
                                    Update
                                </Button>
                            </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default EditWalletForm;
