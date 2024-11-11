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
    currentWalletId,
    allWallets,
}) {
    const dispatch = useDispatch();
    const transferWallets = allWallets.filter(wallet => wallet._id !== currentWalletId);
    const [transferAmount, setTransferAmount] = useState('');
    const [targetWalletId, setTargetWalletId] = useState('');

    const closeForm = useCallback(() => {
        setTransferAmount('');
        setTargetWalletId('');
        setShowForm(false);
    }, [setShowForm]);

    const handleClickOutside = () => {
        setShowForm(false);
        setTransferAmount('');
        setTargetWalletId('');
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();


        if (!targetWalletId || transferAmount <= 0) return;

        dispatch(
            transferBalance(currentWalletId,targetWalletId,transferAmount)
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
                            walletId={targetWalletId}
                            setWalletId={setTargetWalletId}
                            wallets={transferWallets}
                        />
                    </div>

                    <div className={styles.formBtnContainer}>
                        <Button
                            type="submit"
                            simple
                            disabled={!transferAmount || !targetWalletId}
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
