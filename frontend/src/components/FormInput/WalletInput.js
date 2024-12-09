import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IoWalletOutline } from 'react-icons/io5';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import useClickOutside from '../ClickOutside/useClickOutside';
import styles from './FormInput.module.scss';

const WalletInput = ({
    wallet,
    setWallet,
    wallets,
    isDropdownOutside = false,
    setIsDropdownOutside = () => {},
}) => {
    const allWallets = useSelector((state) => state.wallet.wallets) || [];
    const resolvedWallets = wallets || allWallets;

    const dropdownRef = useRef(null);
    const optionRefs = useRef([]);
    const [counter, setCounter] = useState(0);
    const [isDropdown, setIsDropdown] = useState(isDropdownOutside);

    // Synchronize isDropdown with isDropdownOutside
    useEffect(() => {
        setIsDropdown(isDropdownOutside);
    }, [isDropdownOutside]);

    useEffect(() => {
        setIsDropdownOutside(isDropdown);
    }, [isDropdown, setIsDropdownOutside]);

    // Close dropdown on click outside
    useClickOutside(dropdownRef, () => {
        setIsDropdown(false);
    });

    // Handle keyboard navigation when dropdown is open
    useEffect(() => {
        if (isDropdown) {
            const handleKeyDown = (event) => {
                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setCounter((prevCounter) => (prevCounter - 1 + resolvedWallets.length) % resolvedWallets.length);
                } else if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setCounter((prevCounter) => (prevCounter + 1) % resolvedWallets.length);
                } else if (event.key === 'Enter') {
                    event.preventDefault();
                    if (resolvedWallets[counter]) {
                        setWallet(resolvedWallets[counter]);
                        setIsDropdown(false);
                    }
                }
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isDropdown, counter, resolvedWallets, setWallet]);

    // Scroll to the active option when counter changes
    useEffect(() => {
        if (isDropdown && optionRefs.current[counter]) {
            optionRefs.current[counter].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [counter, isDropdown]);

    const toggleDropdown = () => {
        const newDropdownState = !isDropdown;
        setIsDropdown(newDropdownState);
    };

    const handleOptionSelect = (wallet) => {
        setWallet(wallet);
        setIsDropdown(false);
    };

    return (
        <div className={styles.customDropdown} ref={dropdownRef}>
            <div className={styles.dropdownHeader} onClick={toggleDropdown}>
                {wallet ? (
                    <div className={styles.selectedWallet}>
                        <IoWalletOutline className={styles.walletIcon} />
                        {wallet.name}
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        {resolvedWallets.length === 0 ? 'No wallets available' : 'Select wallet'}
                    </div>
                )}
                <span className={styles.arrow}>
                    {isDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {isDropdown && resolvedWallets.length > 0 && (
                <div className={styles.dropdownList}>
                    {resolvedWallets.map((walletItem, index) => (
                        <div
                            key={walletItem._id}
                            ref={(el) => (optionRefs.current[index] = el)}
                            className={`${styles.dropdownItem} ${counter === index ? styles.active : ''}`}
                            onClick={() => handleOptionSelect(walletItem)}
                        >
                            <IoWalletOutline className={styles.walletIcon} />
                            {walletItem.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WalletInput;
