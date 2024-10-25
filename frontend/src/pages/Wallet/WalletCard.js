import styles from './Wallet.module.scss';
import { useNavigate } from 'react-router-dom';

export const WalletCard = ({ walletData }) => {
    const navigate = useNavigate()
    const handleCardClick = () => {
        //  navigate(`info`)
        console.log('WalletDate from WalletCard: ', walletData)
         navigate(`${walletData.name}`, { state: { walletData } })
    }

    const walletColorClass = styles[walletData.color];
    const classes = [walletColorClass, styles.walletCard].join(' ');
    return (
        <div key={walletData._id} className={classes} onClick={handleCardClick}>
            <div className={styles.walletCardHeader}>
                {walletData.name}
            </div>
            <div className={styles.walletCardBalance}>
                ${walletData.balance}
            </div>
        </div>
    );
};
