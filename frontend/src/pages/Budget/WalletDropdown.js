import { useEffect, useRef, useState } from 'react';
import styles from './Budget.module.scss';

function WalletDropdown({ wallets, selectedWallets, setSelectedWallets }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCheckboxChange = (walletName) => {
        if (selectedWallets.includes(walletName)) {
            setSelectedWallets(selectedWallets.filter((name) => name !== walletName));
        } else {
            setSelectedWallets([...selectedWallets, walletName]);
        }
    };

    const handleAllWalletsChange = () => {
        if (selectedWallets.length === wallets.length) {
            setSelectedWallets([]); // Uncheck all
        } else {
            setSelectedWallets(wallets.map(wallet => wallet.name)); // Check all
        }
    };

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
            <h2 className={styles.formLabel}>Wallet</h2>
            <div
                className={`${styles.dropdownHeader} ${styles.formInput}`}
                onClick={toggleDropdown}
            >
                {selectedWallets.length > 0 ? selectedWallets.join(', ') : 'All Wallets'}
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
                                checked={selectedWallets.includes(wallet.name)}
                                onChange={() => handleCheckboxChange(wallet.name)}
                            />
                            {wallet.name}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WalletDropdown;
