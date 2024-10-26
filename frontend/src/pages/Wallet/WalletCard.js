import styles from './Wallet.module.scss';
import { useNavigate } from 'react-router-dom';

export const WalletCard = ({ walletData }) => {
    const walletId = walletData._id;
    const walletName = walletData.name;
    const walletBalance = walletData.balance;
    const navigate = useNavigate()
    
    const handleCardClick = () => {
        //  navigate(`info`)
        console.log('WalletDate from WalletCard: ', walletData)
         navigate(`${walletData.name}`, { state: { walletId } })
    }

    const walletColorClass = styles[walletData.color];
    const classes = [walletColorClass, styles.walletCard].join(' ');
    return (
        <div key={walletId} className={classes} onClick={handleCardClick}>
            <div className={styles.walletCardHeader}>
                {walletName}
            </div>
            <div className={styles.walletCardBalance}>
                ${walletBalance}
            </div>
        </div>
    );
};
