import styles from './Wallet.module.scss';
import { useNavigate } from 'react-router-dom';

export const WalletCard = ({ walletData }) => {
    const walletName = walletData.name;
    const walletType = walletData.type;
    const walletBalance = walletData.balance || 0;
    const formattedBalance = walletBalance.toLocaleString();
    const navigate = useNavigate()
    
    const handleCardClick = () => {
         navigate(`${walletData.name}`, { state: walletData })
    }

    const classes = `background-${walletData.color} ${styles.walletCard}`;
    console.log('classes: ', classes)
    return (
        <div key={walletData._id} className={classes} onClick={handleCardClick}>
            <div>
                <div className={styles.walletCardName}>{walletName}</div>
                <div className={styles.walletCardType}>{walletType}</div>
            </div>
            <div className={styles.walletCardBalance}>
                ${formattedBalance}
            </div>
        </div>
    );
};
