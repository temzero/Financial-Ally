import styles from './FormInput.module.scss';
import { IoWalletOutline } from "react-icons/io5";

function WalletInput({walletId, setWalletId, wallets}) {
    return ( 
            <select
                className={styles.formInputOptions}
                placeholder="Select a wallet"
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                disabled={wallets.length === 0}
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
                        className={`${styles.optionItem} ${styles[`${walletItem.color}Text`]}`}
                    >
                        <IoWalletOutline /> {walletItem.name}
                    </option>
                ))}
            </select>
     );
}

export default WalletInput;
