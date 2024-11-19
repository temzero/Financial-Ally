import styles from './FormInput.module.scss';
import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useClickOutSide from '../ClickOutSide/useClickOutSide';

function WalletTypeInput({ type, setType, className }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useClickOutSide(() => setIsDropdownOpen(false));

    const walletTypeOptions = [
        { value: "Personal", label: "Personal" },
        { value: "Business", label: "Business" },
        { value: "Savings", label: "Savings" }
    ];

    const handleOptionSelect = (value) => {
        setType(value);
        setIsDropdownOpen(false);
    };

    return (
        <div className={`${styles.customDropdown} ${className || ''}`} ref={dropdownRef}>
            <div
                className={styles.dropdownHeader}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <div className={styles.selectedType}>
                    {walletTypeOptions.find(option => option.value === type)?.label || "Personal"}
                </div>
                <span className={styles.arrow}>
                    {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {isDropdownOpen && (
                <div className={styles.dropdownList}>
                    {walletTypeOptions.map(option => (
                        <div
                            key={option.value}
                            className={styles.dropdownItem}
                            onClick={() => handleOptionSelect(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WalletTypeInput;
