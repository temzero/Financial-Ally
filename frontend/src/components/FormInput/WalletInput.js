import styles from './FormInput.module.scss';

function WalletInput({walletId, setWalletId, wallets}) {
    return ( 
            <select
                className={styles.formInputOptions}
                placeholder="Select a wallet"
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                disabled={wallets.length === 0}
                required
            >
                <option value="" disabled hidden>
                    {wallets.length === 0
                        ? 'No wallets available'
                        : 'Select a wallet'}
                </option>
                {wallets.map((walletItem) => (
                    <option
                        key={walletItem._id}
                        value={walletItem._id}
                        className={styles.optionItem}
                    >
                        {walletItem.name}
                    </option>
                ))}
            </select>
     );
}

export default WalletInput;
