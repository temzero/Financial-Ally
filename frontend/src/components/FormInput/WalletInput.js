import styles from './FormInput.module.scss';
import { useState } from "react";
import { useSelector } from 'react-redux';
import { IoWalletOutline } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useClickOutSide from '../ClickOutSide/useClickOutSide';
import React, { forwardRef, useEffect } from "react";

const WalletInput = forwardRef(({ wallet, setWallet }, ref) => {
    const wallets = useSelector((state) => state.wallet.wallets);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useClickOutSide(() => setIsDropdownOpen(false));

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'w') {
                setIsDropdownOpen(!isDropdownOpen); 
            } 
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleOptionSelect = (wallet) => {
        setWallet(wallet);
        setIsDropdownOpen(false);
    };

    return (
        <div className={styles.customDropdown} ref={ref || dropdownRef}>
            <div
                className={styles.dropdownHeader}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                {wallet ? (
                    <div className={styles.selectedWallet}>
                        <IoWalletOutline className={styles.walletIcon} />
                        {wallet.name}
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
});

export default WalletInput;
