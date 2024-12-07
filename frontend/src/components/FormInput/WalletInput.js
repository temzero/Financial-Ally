import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IoWalletOutline } from 'react-icons/io5';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import useClickOutside from '../ClickOutside/useClickOutside';
import styles from './FormInput.module.scss';

const WalletInput = ({ wallet, setWallet, isDropdown, setIsDropdown }) => {
    const wallets = useSelector((state) => state.wallet.wallets);
    const dropdownRef = useRef(null);
    const optionRefs = useRef([]);
    const [counter, setCounter] = useState(0);

    useClickOutside(dropdownRef, () => setIsDropdown(false));

    useEffect(() => {
        if (isDropdown) {
            const handleKeyDown = (event) => {
                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setCounter(
                        (prevCounter) =>
                            (prevCounter - 1 + wallets.length) % wallets.length
                    );
                } else if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setCounter(
                        (prevCounter) => (prevCounter + 1) % wallets.length
                    );
                } else if (event.key === 'Enter') {
                    event.preventDefault();
                    if (wallets[counter]) {
                        setWallet(wallets[counter]);
                        setIsDropdown(false);
                    }
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isDropdown, counter, wallets, setWallet, setIsDropdown]);

    // Auto-scroll to the active option
    useEffect(() => {
        if (isDropdown && optionRefs.current[counter]) {
            optionRefs.current[counter].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [counter, isDropdown]);

    const handleOptionSelect = (wallet) => {
        setWallet(wallet);
        setIsDropdown(false);
    };

    return (
        <div className={styles.customDropdown} ref={dropdownRef}>
            <div
                className={styles.dropdownHeader}
                onClick={() => setIsDropdown((prev) => !prev)}
            >
                {wallet ? (
                    <div className={styles.selectedWallet}>
                        <IoWalletOutline className={styles.walletIcon} />
                        {wallet.name}
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        {wallets.length === 0
                            ? 'No wallets available'
                            : 'Select wallet'}
                    </div>
                )}
                <span className={styles.arrow}>
                    {isDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {isDropdown && wallets.length > 0 && (
                <div className={styles.dropdownList}>
                    {wallets.map((walletItem, index) => (
                        <div
                            key={walletItem._id}
                            ref={(el) => (optionRefs.current[index] = el)}
                            className={`${styles.dropdownItem} ${
                                counter === index ? styles.active : ''
                            }`}
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
