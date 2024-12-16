import styles from './WalletInfo.module.scss';
import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateWallet } from '../../../redux/actions';
import { FaRegPaperPlane } from "react-icons/fa6";
import { setOverlay } from '../../../redux/actions';
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
    
    const Overlay = useSelector((state) => state.state.isOverlay);
    useEffect(() => {dispatch(setOverlay(false))}, [dispatch])

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

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setMounted(true);
        }, 100);
        return () => clearTimeout(timeout);
    }, []);

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
    }, [walletId, dispatch]);

    // Handle keydown event to toggle add wallet form
    useEffect(() => {
        const handleKeyDown = (event) => {
            if(Overlay) return;

            if(!showTransferForm && !showEditForm && !showDeleteForm) {
                if (event.key === 'Delete') {
                    event.preventDefault()
                    setShowDeleteForm(true);
                } else if (event.key === 'e' || event.key === '+' || event.key === '=') {
                    event.preventDefault()
                    setShowEditForm(true); 
                } else if (event.key === 't') {
                    event.preventDefault()
                    setShowTransferForm(true); 
                }
            }
        };

        // Add event listener on mount
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showTransferForm, showEditForm, showDeleteForm, Overlay]);
        

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
                />
            );
        } else if (walletBalance < 10000) {
            return (
                <img
                    src={moneyImage}
                    alt="money"
                />
            );
        } else {
            return (
                <img
                    src={muchMoneyImage}
                    alt="muchMoney"
                />
            );
        }
    };

    if (!walletData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>Wallet</div>
                <div className={styles.btnContainer}>
                    <Button s onClick={() => setShowTransferForm(!showTransferForm)}>
                        Transfer Balance
                        <FaRegPaperPlane className={styles.planeIcon}/>
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
                <div className={`${styles.contentHeader} background-${walletColor}`}>
                    <div className={styles.contentName}>{walletName}</div>
                    <div className={styles.contentSubHeader}>{walletType}</div>
                </div>
                <div className={styles.contentBody}>
                    <div className={styles.contentBalance}>
                        <div className={styles.balanceNumber}>
                            {currency}
                            <CountUpEffect n={walletBalance} />
                        </div>
                        <div className={`${styles.displayStatus} ${ mounted ? styles.visible : ''}`}>
                            {displayStatus()}
                        </div>
                    </div>

                    {!transactions.length ? (
                        <div className={styles.landscapeImageContainer}>
                            <div>No transactions</div>
                            <img src={landscapeImage} alt="noMoney" className={styles.landscapeImage} />
                        </div>
                    ) : (
                        <div>
                            <div className={styles.contentAnalysis}>
                                <div className={'section-header'}>Analysis</div>
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
                                <div className={'section-header'}>Transactions</div>
                                <TransactionList transactions={transactions} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.date}>
                Created at {formattedDate} ({joinDays} days)
            </div>

            {showEditForm && (
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
            )}

            {showDeleteForm && (
                <DeleteWalletForm showForm={showDeleteForm} setShowForm={setShowDeleteForm} wallet={walletData} />
            )}
            
            {showTransferForm && (
                <TransferBalanceForm
                    showForm={showTransferForm}
                    setShowForm={setShowTransferForm}
                    walletData={walletData}
                />
            )}
        </div>
    );
}

export default WalletInfo;
