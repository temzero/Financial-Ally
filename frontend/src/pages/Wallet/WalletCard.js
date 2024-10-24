import styles from './Wallet.module.scss';

export const WalletItems = ({ walletData }) => {

    const walletColorClass = styles[walletData.color];
    const classes = [walletColorClass, styles.walletItem].join(' ');
    return (
        <div key={walletData._id} className={classes}>
            <div className={styles.walletItemHeader}>
                {walletData.name}
            </div>
            <div className={styles.walletItemBalance}>
                ${walletData.balance}
            </div>
        </div>
    );
};
