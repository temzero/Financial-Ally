import styles from './TransferBalance.module.scss';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transferBalance } from '../../redux/actions';
import Button from '../Button/Button';
import BalanceInput from '../FormInput/BalanceInput';
import WalletInput from '../FormInput/WalletInput';

function TransferBalanceForm({
    showForm,
    setShowForm,
    walletData,
}) {
    const dispatch = useDispatch();
    const walletId = walletData._id;
    const wallets = useSelector((state) => state.wallet.wallets);
    const transferWallets = wallets.filter(wallet => wallet._id !== walletId);
    const [transferAmount, setTransferAmount] = useState('');
    const [targetWallet, setTargetWallet] = useState('');

    const closeForm = useCallback(() => {
        setTransferAmount('');
        setTargetWallet('');
        setShowForm(false);
    }, [setShowForm]);

    const handleClickOutside = () => {
        setShowForm(false);
        setTransferAmount('');
        setTargetWallet('');
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();


        if (!targetWallet || transferAmount <= 0) return;

        dispatch(
            transferBalance(walletId,targetWallet,transferAmount)
        );
        closeForm();
    };

    return (
        showForm && (
            <div className={styles.formOverlay} onClick={handleClickOutside}>
                <form
                    onSubmit={handleFormSubmit}
                    className={styles.formContainer}
                    onClick={(e) => e.stopPropagation()} 
                >
                    <div>Transfer Money</div>
                    <div className={styles.formSection}>
                        <h2 className={styles.formLabel}>Amount</h2>
                        <BalanceInput
                            amount={transferAmount}
                            setAmount={setTransferAmount}
                        />
                    </div>
                    <div className={styles.formSection}>
                        <h2 className={styles.formLabel}>To wallet</h2>
                        <WalletInput
                            wallet={targetWallet}
                            setWallet={setTargetWallet}
                            wallets={transferWallets}
                        />
                    </div>

                    <div className={styles.formBtnContainer}>
                        <Button
                            type="submit"
                            simple
                            disabled={!transferAmount || !targetWallet}
                        >
                            Transfer
                        </Button>
                    </div>
                </form>
            </div>
        )
    );
}

export default TransferBalanceForm;
