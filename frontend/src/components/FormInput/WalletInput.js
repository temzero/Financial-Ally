import styles from './FormInput.module.scss';
import { useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useClickOutSide from '../ClickOutSide/useClickOutSide';

function WalletInput({ walletId, setWalletId, wallets }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useClickOutSide(() => setIsDropdownOpen(false));

    const handleOptionSelect = (id) => {
        setWalletId(id);
        setIsDropdownOpen(false);
    };

    return (
        <div className={styles.customDropdown} ref={dropdownRef}>
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
                <span className={styles.arrow}>{isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
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