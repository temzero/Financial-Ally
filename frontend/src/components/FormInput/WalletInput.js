// import styles from './FormInput.module.scss';
// import { IoWalletOutline } from "react-icons/io5";

// function WalletInput({walletId, setWalletId, wallets}) {
//     return ( 
//             <select
//                 className={styles.formInputOptions}
//                 placeholder="Select a wallet"
//                 value={walletId}
//                 onChange={(e) => setWalletId(e.target.value)}
//                 disabled={wallets.length === 0}
//             >
//                 <option value="" disabled hidden>
//                     {wallets.length === 0
//                         ? 'No wallets available'
//                         : 'Select a wallet'}
//                 </option>
//                 {wallets.map((walletItem) => (
//                     <option
//                         key={walletItem._id}
//                         value={walletItem._id}
//                         // className={`${styles.optionItem} ${styles[`${walletItem.color}Text`]}`}
//                         className={styles.optionItem}
//                     >
//                         <IoWalletOutline /> {walletItem.name}
//                     </option>
//                 ))}
//             </select>
//      );
// }

// export default WalletInput;

import styles from './FormInput.module.scss';
import { IoWalletOutline } from "react-icons/io5";
import { useState } from "react";

function WalletInput({ walletId, setWalletId, wallets }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleOptionSelect = (id) => {
        setWalletId(id);
        setIsDropdownOpen(false);
    };

    return (
        <div className={styles.customDropdown}>
            <div
                className={styles.dropdownHeader}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                {walletId ? (
                    <div className={styles.selectedWallet}>
                        <IoWalletOutline className={styles.walletIcon} />
                        {wallets.find(wallet => wallet._id === walletId)?.name}
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        {wallets.length === 0 ? 'No wallets available' : 'Select a wallet'}
                    </div>
                )}
                <span className={styles.arrow}>{isDropdownOpen ? "▲" : "▼"}</span>
            </div>
            {isDropdownOpen && wallets.length > 0 && (
                <div className={styles.dropdownList}>
                    {wallets.map(walletItem => (
                        <div
                            key={walletItem._id}
                            className={styles.dropdownItem}
                            onClick={() => handleOptionSelect(walletItem._id)}
                        >
                            <IoWalletOutline className={styles.walletIcon} />
                            {walletItem.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WalletInput;