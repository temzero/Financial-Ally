import styles from './FormInput.module.scss';
import { useEffect, useState, useRef } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import useClickOutside from '../ClickOutside/useClickOutside';

function WalletsInput({
    wallets,
    selectedWallets,
    setSelectedWallets,
    className,
    isFocusOutside = false,
    setIsFocusOutside = () => {},
}) {
    const [isDropdown, setIsDropdown] = useState(isFocusOutside);
    const [selectedWalletNames, setSelectedWalletNames] = useState([]);
    const [counter, setCounter] = useState(0);
    const optionRefs = useRef([]);
    const dropdownRef = useRef(null);

    // Synchronize isDropdown with isFocusOutside
    useEffect(() => {
        setIsDropdown(isFocusOutside);
    }, [isFocusOutside]);
    useEffect(() => {
        setIsFocusOutside(isDropdown);
    }, [isDropdown, setIsFocusOutside]);

    useClickOutside(dropdownRef, () => setIsDropdown(false));

    // Handle keyboard navigation when dropdown is open
    useEffect(() => {
        if (isDropdown) {
            const handleKeyDown = (event) => {
                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setCounter((prevCounter) => (prevCounter - 1 + wallets.length) % wallets.length);
                } else if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setCounter((prevCounter) => (prevCounter + 1) % wallets.length);
                } else if (event.key === 'Enter') {
                    event.preventDefault();
                    const selectedWallet = wallets[counter];
                    handleCheckboxChange(selectedWallet); // Select or deselect on Enter
                }
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isDropdown, counter, wallets]);

    // Scroll to the active option when counter changes
    useEffect(() => {
        if (isDropdown && optionRefs.current[counter]) {
            optionRefs.current[counter].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [counter, isDropdown]);

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

    useEffect(() => {
        setSelectedWalletNames(selectedWallets.map((wallet) => wallet.name));
    }, [selectedWallets]);

    const walletsDisplay = () => {
        if (selectedWalletNames.length === 0 || selectedWalletNames.length === wallets.length) {
            return 'All wallets';
        } else {
            return selectedWalletNames.join(', ');
        }
    };

    return (
        <div className={`${styles.customDropdown} ${className || ''}`} ref={dropdownRef}>
            <div className={styles.dropdownHeader} onClick={() => setIsDropdown(!isDropdown)}>
                <div className={styles.selectedElements}>
                    {walletsDisplay()}
                </div>
                <span className={styles.arrow}>
                    {isDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {isDropdown && (
                <div className={styles.dropdownList}>
                    <div className={styles.dropdownItem}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectedWallets.length === wallets.length}
                                onChange={handleAllWalletsChange}
                            />
                            All Wallets
                        </label>
                    </div>
                    {wallets.map((wallet, index) => (
                        <div
                            key={wallet._id}
                            ref={(el) => (optionRefs.current[index] = el)}
                            className={`${styles.dropdownItem} ${counter === index ? styles.active : ''}`}
                        >
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={selectedWallets.some(
                                        (selectedWallet) => selectedWallet._id === wallet._id
                                    )}
                                    onChange={() => handleCheckboxChange(wallet)}
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
