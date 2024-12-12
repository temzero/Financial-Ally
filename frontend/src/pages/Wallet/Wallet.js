import styles from './Wallet.module.scss';
import Button from '../../components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getWallets } from '../../redux/actions';
import { AiOutlinePlus } from "react-icons/ai";
import { WalletCard } from './WalletCard';
import { FaPlus } from "react-icons/fa6";
import AddWalletForm from './AddWalletForm';

function Wallet() {
    const [showForm, setShowForm] = useState(false);
    const user = useSelector((state) => state.user.user);
    const wallets = useSelector((state) => state.wallet.wallets);

    const userId = user._id;
    const formRef = useRef(null);
    const dispatch = useDispatch();

    // Load Wallets from database when click to this page and then save wallets to state, after that, load wallet from state
    useEffect(() => {
            dispatch(getWallets(userId));
    }, [userId, dispatch]);

    // Handle keydown event to toggle add wallet form
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === '=' || event.key === '+') {
                event.preventDefault()
                toggleForm();
            } else if (event.key === 'Backspace') {
                toggleForm(); 
            }
        };

        // Add event listener on mount
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [userId]);
    

    // Calculate total balance
    const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
    const currency = '$'

    // State for form values
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <div className={styles.header}>
                <h2 className={styles.title}>Wallet</h2>
                <Button s onClick={toggleForm}>
                    <FaPlus className={styles.plusIcon}/> Add Wallet
                </Button>
            </div>

            <div className={styles.balance}><span className={styles.currency}>{currency}</span>{totalBalance.toLocaleString()}</div>

            <div className={styles.bodyContainer}>
                {wallets.length === 0 ? (
                    <div className={styles.addWalletCard} onClick={toggleForm}>
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
