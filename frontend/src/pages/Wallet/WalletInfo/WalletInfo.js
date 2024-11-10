import styles from './WalletInfo.module.scss';
import { useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import Button from '../../../components/Button/Button';
import EditWalletForm from './EditWalletForm';
import DeleteWalletForm from './DeleteWalletForm';
import { useSelector } from 'react-redux';
import TransactionList from '../../../components/Transaction/TransactionList';

function WalletInfo() {
    const { state } = useLocation();
    const walletId = state?.walletId || '';
    const currentUser = useSelector((state) => state.user);
    const allWallets = currentUser.wallets;
    const allTransactions = currentUser.transactions;
    const currentWallet = allWallets.find(wallet => wallet._id === walletId);
    const { name, balance, type, color, transactionIds } = currentWallet;
    const currency = '$'

    const transactions = allTransactions.filter(transaction =>
        transactionIds.includes(transaction._id)
    );
    
    const [showTransferForm, setShowTransferForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    
    // State variables for wallet details
    const [walletName, setWalletName] = useState(name);
    const [walletBalance, setWalletBalance] = useState(balance);
    const [walletType, setWalletType] = useState(type);
    const [walletColor, setWalletColor] = useState(color);
    
    const formRef = useRef(null);

    const handleTransferBalance = () => {
        setShowTransferForm(true)
    }

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
                    <Button s className={styles.btn} onClick={handleTransferBalance}>
                        Transfer Balance
                    </Button>
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
                    <div className={styles.contentBalance}><span className={styles.currency}>{currency}</span>{walletBalance.toLocaleString()}</div>
                    <div className={styles.contentAnalysis}>
                        <div className={styles.contentSubHeader}>Analysis</div>
                    </div>
                    <div className={styles.contentTransaction}>
                        <div className={styles.contentSubHeader}>Transactions</div>
                        <TransactionList transactions={transactions}/>
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