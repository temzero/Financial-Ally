import styles from './Wallet.module.scss';

export const WalletItems = function (walletData) {
    return (
        <div className={styles.walletItem}>
            <div className={styles.walletItemHeader}>{walletData.name}</div>
            <div className={styles.walletItemBalance}>{walletData.balance}</div>
            <div className={styles.walletItemHeader}>Name</div>
            <div className={styles.walletItemBalance}>Balance</div>
        </div>
    );
};
