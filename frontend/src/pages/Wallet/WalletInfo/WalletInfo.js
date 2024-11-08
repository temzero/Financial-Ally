import styles from './WalletInfo.module.scss';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Button from '../../../components/Button/Button';
import EditWalletForm from './EditWalletForm';
import DeleteWalletForm from './DeleteWalletForm';
import { useSelector } from 'react-redux';
import WalletTransactionList from './WalletTransactionList';

function WalletInfo() {
    const { state } = useLocation();
    const walletId = state?.walletId || '';
    const wallets = useSelector((state) => state.user.wallets);
    const currentWallet = wallets.find(wallet => wallet._id === walletId);

    const { name, balance, type, color, transactionIds } = currentWallet;
    
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    
    // State variables for wallet details
    const [walletName, setWalletName] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);
    const [walletType, setWalletType] = useState('');
    const [walletColor, setWalletColor] = useState('');
    
    const formRef = useRef(null);

    useEffect(() => {
        // Update the state if currentWallet is found
        if (currentWallet) {
            setWalletName(name);
            setWalletBalance(balance);
            setWalletType(type);
            setWalletColor(color);
        }
    }, [showEditForm, showDeleteForm, wallets, currentWallet, balance, color, name, type]);

    const handleShowEditForm = () => {
        setShowEditForm(!showEditForm)
    }

    const handleShowDeleteForm = () => {
        setShowDeleteForm(!showDeleteForm)
    }

    return ( 
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>Wallet</div>
                <div className={styles.btnContainer}>
                    <Button s className={styles.btn} onClick={handleShowEditForm}>
                        Edit
                    </Button>
                    <Button s className={styles.btn} onClick={handleShowDeleteForm}>
                        Delete
                    </Button>
                </div>
            </div>
            <div className={styles.content}>
                <div className={`${styles.contentHeader} ${styles[walletColor]}`}>
                    <div className={styles.contentName}>{walletName}</div>
                    <div className={styles.contentSubHeader}>{walletType}</div>
                </div>
                <div className={styles.contentBody}>
                    <div className={styles.contentBalance}>${walletBalance.toLocaleString()}</div>
                    <div className={styles.contentAnalysis}>
                        <div className={styles.contentSubHeader}>Analysis</div>
                    </div>
                    <div className={styles.contentTransaction}>
                        <div className={styles.contentSubHeader}>Transactions</div>
                        <WalletTransactionList transactionIds={transactionIds}/>
                    </div>
                </div>
            </div>

            <EditWalletForm
                walletData={currentWallet}
                formRef={formRef}

                showForm={showEditForm}
                setShowForm={setShowEditForm}

                walletName={walletName}
                setWalletName={setWalletName}
                walletBalance={walletBalance}
                setWalletBalance={setWalletBalance}
                walletType={walletType}
                setWalletType={setWalletType}
                walletColor={walletColor}
                setWalletColor={setWalletColor}
            />
            
            <DeleteWalletForm
                showForm={showDeleteForm}
                setShowForm={setShowDeleteForm}
                formRef={formRef}
                walletId={walletId}
            />
        </div>
    );
}

export default WalletInfo;