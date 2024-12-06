import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiTransferAlt } from 'react-icons/bi';
import { updateWallet } from '../../../redux/actions';
import Button from '../../../components/Button/Button';
import DeleteWalletForm from '../../../components/DeleteForm/DeleteWalletForm';
import TransactionList from '../../../components/Transaction/TransactionList';
import TransferBalanceForm from '../../../components/TransferBalance/TransferBalance';
import EditWalletForm from '../../../components/EditForm/EditWalletForm';
import CategoryChart from '../../../components/Chart/CategoryChart';
import CountUpEffect from '../../../components/Animation/CountUpEffect';

import noMoneyImage from '../../../assets/images/noMoney.png';
import moneyImage from '../../../assets/images/cash.png';
import muchMoneyImage from '../../../assets/images/alotofcash.png';
import landscapeImage from '../../../assets/images/landscape.png';

import styles from './WalletInfo.module.scss';

// Move `useEffect` above the component definition
function initializeWalletData(walletData, setWalletName, setWalletBalance, setWalletType, setWalletColor, setCreatedAt) {
    if (walletData) {
        const { name, balance, type, color, createdAt } = walletData;
        setWalletName(name);
        setWalletBalance(balance);
        setWalletType(type);
        setWalletColor(color);
        setCreatedAt(createdAt);
    }
}

function WalletInfo() {
    const { state } = useLocation();
    const walletId = state?._id || '';
    const currency = '$';
    const dispatch = useDispatch();

    const allWallets = useSelector((state) => state.wallet.wallets);
    const walletData = allWallets.find(wallet => wallet._id === walletId);
    const allTransactions = useSelector((state) => state.transaction.transactions) || [];

    const [showTransferForm, setShowTransferForm] = useState(false);
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

    const timeDifference = new Date() - new Date(createdAt); // Difference in milliseconds
    const joinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

    // Initialize wallet data
    useEffect(() => {
        initializeWalletData(walletData, setWalletName, setWalletBalance, setWalletType, setWalletColor, setCreatedAt);
    }, [walletData]);

    // Update wallet balance if allWallets change
    useEffect(() => {
        if (walletData && allWallets.length > 0) {
            const updatedWallet = allWallets.find(
                (wallet) => wallet._id === walletData._id
            );
            if (updatedWallet) {
                setWalletBalance(updatedWallet.balance);
            }
        }
    }, [allWallets, walletData]);

    const transactions = allTransactions.filter((transaction) =>
        walletData?.transactionIds.includes(transaction._id)
    );
    
    // Remove unnecessary TransactionIds
    useEffect(() => {
        const walletTransactionsIds = transactions.map(transaction => transaction._id);
        if (!walletTransactionsIds.length || !walletId) return;

        const updatedWalletTransactions = {
            transactionIds: walletTransactionsIds,
        };

        dispatch(updateWallet(updatedWalletTransactions, walletId));
    }, [walletId]);

    const incomeTransactions = transactions.filter(
        (transaction) => transaction.type.toLowerCase() === 'income'
    );
    const expenseTransactions = transactions.filter(
        (transaction) => transaction.type.toLowerCase() === 'expense'
    );

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

    if (!walletData) {
        return <div>Loading...</div>; // Or any other loading state you prefer
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>Wallet</div>
                <div className={styles.btnContainer}>
                    <Button s onClick={() => setShowTransferForm(!showTransferForm)}>
                        <BiTransferAlt />
                        Transfer Balance
                    </Button>
                    <Button s onClick={() => setShowEditForm(!showEditForm)}>
                        Edit
                    </Button>
                    <Button s onClick={() => setShowDeleteForm(!showDeleteForm)}>
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
                        <div className={styles.balanceNumber}>
                            {currency}
                            <CountUpEffect n={walletBalance} />
                        </div>
                        {displayStatus()}
                    </div>

                    {!transactions.length ? (
                        <div className={styles.landscapeImageContainer}>
                            <div>No transactions</div>
                            <img src={landscapeImage} alt="noMoney" className={styles.landscapeImage} />
                        </div>
                    ) : (
                        <div>
                            <div className={styles.contentAnalysis}>
                                <div className={styles.contentSubHeader}>Analysis</div>
                                {(incomeTransactions.length > 0 || expenseTransactions.length > 0) && (
                                    <div className={styles.contentChart}>
                                        {incomeTransactions.length > 0 && (
                                            <CategoryChart transactions={incomeTransactions} type="+" />
                                        )}
                                        {expenseTransactions.length > 0 && (
                                            <CategoryChart transactions={expenseTransactions} type="-" />
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className={styles.contentTransaction}>
                                <div className={styles.contentSubHeader}>Transactions</div>
                                <TransactionList transactions={transactions} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.date}>
                Created at {formattedDate} ({joinDays} days)
            </div>

            <EditWalletForm
                walletData={walletData}
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

            <DeleteWalletForm showForm={showDeleteForm} setShowForm={setShowDeleteForm} wallet={walletData} />

            <TransferBalanceForm
                showForm={showTransferForm}
                setShowForm={setShowTransferForm}
                walletData={walletData}
                allWallets={allWallets}
            />
        </div>
    );
}

export default WalletInfo;
