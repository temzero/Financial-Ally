import styles from './FormInput.module.scss'
import { useEffect, useRef, useState } from 'react';

function WalletsInput({ wallets, selectedWallets, setSelectedWallets }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedWalletNames, setSelectedWalletNames] = useState([]);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCheckboxChange = (wallet) => {
        if (selectedWallets.some((selectedWallet) => selectedWallet._id === wallet._id)) {
            setSelectedWallets(
                selectedWallets.filter((selectedWallet) => selectedWallet._id !== wallet._id)
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

    // Update `selectedWalletNames` whenever `selectedWallets` changes
    useEffect(() => {
        setSelectedWalletNames(selectedWallets.map(wallet => wallet.name));
    }, [selectedWallets]);

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <div
                className={`${styles.formInputOptions} ${styles.formInput}`}
                onClick={toggleDropdown}
            >
                {selectedWalletNames.length > 0 ? selectedWalletNames.join(', ') : 'All Wallets'}
            </div>
            {isOpen && (
                <div className={styles.dropdownList}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={selectedWallets.length === wallets.length}
                            onChange={handleAllWalletsChange}
                        />
                        All Wallets
                    </label>
                    {wallets.map((wallet) => (
                        <label key={wallet._id} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectedWallets.some(
                                    (selectedWallet) => selectedWallet._id === wallet._id
                                )}
                                onChange={() => handleCheckboxChange(wallet)}
                            />
                            {wallet.name}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WalletsInput;

