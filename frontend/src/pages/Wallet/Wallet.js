import styles from './Wallet.module.scss';
import Button from '../../components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getWallets } from '../../redux/actions';
import AddWalletForm from './AddWalletForm';
import { AiOutlinePlus } from "react-icons/ai";
import { WalletCard } from './WalletCard';

function Wallet() {
    const [showForm, setShowForm] = useState(false);
    const currentUser = useSelector((state) => state.user);
    
    const wallets = currentUser?.wallets || [];

    const userId = currentUser._id;
    const formRef = useRef(null);
    const dispatch = useDispatch();

    // Load Wallets from database when click to this page and then save wallets to state, after that, load wallet from state
    useEffect(() => {
            dispatch(getWallets(userId));
    }, [userId, dispatch]);

    // Calculate total balance
    const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
    const currency = '$'

    // State for form values
    const toggleWallet = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <div className={styles.header}>
                <h2 className={styles.title}>Wallet</h2>
                <div>
                    <Button s onClick={toggleWallet}>
                        Add Wallet
                    </Button>
                </div>
            </div>
            <div className={styles.balance}><span className={styles.currency}>{currency}</span>{totalBalance.toLocaleString()}</div>

            {/* Pass data to WalletItems */}
            <div className={styles.bodyContainer}>
                {wallets.length === 0 ? (
                    <div className={styles.addWalletCard} onClick={toggleWallet}>
                        <AiOutlinePlus className={styles.addWalletCardIcon}/>
                    </div>
                ) : (
                    wallets.map((wallet) => (
                        <WalletCard key={wallet._id} walletData={wallet} />
                    ))
                )}
            </div>

            <AddWalletForm
                showForm={showForm}
                setShowForm={setShowForm}
                formRef={formRef}
                userId={userId}
            />
        </div>
    );
}

export default Wallet;
