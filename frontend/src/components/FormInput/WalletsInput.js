import styles from './FormInput.module.scss';
import { useEffect, useState, useRef } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import useClickOutside from '../ClickOutside/useClickOutside';

function WalletsInput({
    wallets,
    selectedWallets,
    setSelectedWallets,
    className,
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedWalletNames, setSelectedWalletNames] = useState([]);
    const dropdownRef = useRef(null);
    useClickOutside(dropdownRef, () => setIsDropdownOpen(false));


    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleCheckboxChange = (wallet) => {
        if (
            selectedWallets.some(
                (selectedWallet) => selectedWallet._id === wallet._id
            )
        ) {
            setSelectedWallets(
                selectedWallets.filter(
                    (selectedWallet) => selectedWallet._id !== wallet._id
                )
            );
        } else {
            setSelectedWallets([...selectedWallets, wallet]);
        }
    };

    const handleAllWalletsChange = () => {
        if (selectedWallets.length === wallets.length) {
            setSelectedWallets([]); // Uncheck all
        } else {
            setSelectedWallets(wallets); // Select all
        }
    };

    useEffect(() => {
        setSelectedWalletNames(selectedWallets.map((wallet) => wallet.name));
    }, [selectedWallets]);

    const walletsDisplay = () => {
        if (
            selectedWalletNames.length === 0 ||
            selectedWalletNames.length === wallets.length
        ) {
            return 'All wallets';
        } else {
            return selectedWalletNames.join(', ');
        }
    };

    return (
        <div
            className={`${styles.customDropdown} ${className || ''}`}
            ref={dropdownRef}
        >
            <div className={styles.dropdownHeader} onClick={toggleDropdown}>
                <div className={styles.selectedCategory}>
                    {walletsDisplay()}
                </div>
                <span className={styles.arrow}>
                    {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {isDropdownOpen && (
                <div className={styles.dropdownList}>
                    <div className={styles.dropdownItem}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={
                                    selectedWallets.length === wallets.length
                                }
                                onChange={handleAllWalletsChange}
                            />
                            All Wallets
                        </label>
                    </div>
                    {wallets.map((wallet) => (
                        <div key={wallet._id} className={styles.dropdownItem}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={selectedWallets.some(
                                        (selectedWallet) =>
                                            selectedWallet._id === wallet._id
                                    )}
                                    onChange={() =>
                                        handleCheckboxChange(wallet)
                                    }
                                />
                                {wallet.name}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WalletsInput;
