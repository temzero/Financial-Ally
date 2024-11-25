import styles from './WalletInfo.module.scss';
import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Button from '../../../components/Button/Button';
import DeleteWalletForm from '../../../components/DeleteForm/DeleteWalletForm';
import { useDispatch, useSelector } from 'react-redux';
import TransactionList from '../../../components/Transaction/TransactionList';
import TransferBalanceForm from '../../../components/TransferBalance/TransferBalance';
import { getOneWallet } from '../../../redux/actions';
import { BiTransferAlt } from "react-icons/bi";
import EditWalletForm from '../../../components/EditForm/EditWalletForm';

import noMoneyImage from '../../../assets/images/noMoney.png'
import moneyImage from '../../../assets/images/cash.png'
import muchMoneyImage from '../../../assets/images/alotofcash.png'

function WalletInfo() {
    const { state } = useLocation();
    const walletId = state || '';
    const dispatch = useDispatch();
    const [showTransferForm, setShowTransferForm] = useState(false);

    const allWallets = useSelector((state) => state.wallet.wallets);
    const allTransactions = useSelector((state) => state.transaction.transactions);


    const currentWallet = allWallets.find(wallet => wallet._id === walletId);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const [walletName, setWalletName] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);
    const [walletType, setWalletType] = useState('');
    const [walletColor, setWalletColor] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const formRef = useRef(null);
    const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const timeDifference = new Date() - new Date(createdAt);; // Difference in milliseconds
    const joinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

    // Handle show form toggles
    const handleShowTransferForm = () => setShowTransferForm(!showTransferForm);
    const handleShowEditForm = () => setShowEditForm(!showEditForm);
    const handleShowDeleteForm = () => setShowDeleteForm(!showDeleteForm);

    useEffect(() => {
        if (walletId) {
            dispatch(getOneWallet(walletId));
        }
    }, [dispatch, walletId]);

    useEffect(() => {
        if (currentWallet) {
            const { name, balance, type, color, createdAt } = currentWallet;
            setWalletName(name);
            setWalletBalance(balance);
            setWalletType(type);
            setWalletColor(color);
            setCreatedAt(createdAt);
        }
    }, [currentWallet]);

    if (!currentWallet) {
        return <div>Loading...</div>;  // Or any other loading state you prefer
    }

    const transactions = allTransactions.filter(transaction =>
        currentWallet.transactionIds.includes(transaction._id)
    );

    const currency = '$';

    const displayStatus = () => {
        if (walletBalance < 100) {
            return (
                <img 
                    src={noMoneyImage} 
                    alt="noMoney" 
                    className={styles.noMoneyImage} 
                />
            );
        } else if (walletBalance < 10000) {
            return (
                <img 
                    src={moneyImage} 
                    alt="money" 
                    className={styles.moneyImage} 
                />
            );
        } else {
            return (
                <img 
                    src={muchMoneyImage} 
                    alt="muchMoney" 
                    className={styles.muchMoneyImage} 
                />
            );
        }
    };

    return ( 
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>Wallet</div>
                <div className={styles.btnContainer}>
                    <Button s className={styles.btn} onClick={handleShowTransferForm}>
                        <div className={styles.transferBtn}>
                            <span>Transfer Balance</span>
                            <BiTransferAlt/>
                        </div>
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
                    <div className={styles.contentBalance}>
                        <div><span className={styles.currency}>{currency}</span>{walletBalance.toLocaleString()}</div>
                        {displayStatus()}
                    </div>
                    <div className={styles.contentAnalysis}>
                        <div className={styles.contentSubHeader}>Analysis</div>
                    </div>
                    <div className={styles.contentTransaction}>
                        <div className={styles.contentSubHeader}>Transactions</div>
                        <TransactionList transactions={transactions}/>
                    </div>
                </div>
            </div>

            <div className={styles.date}>
                Created at {formattedDate} ({joinDays} days)
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
                wallet={currentWallet}
            />

            <TransferBalanceForm
                showForm={showTransferForm}
                setShowForm={setShowTransferForm}
                currentWalletId={walletId}
                allWallets={allWallets}
            />
        </div>
    );
}

export default WalletInfo;
