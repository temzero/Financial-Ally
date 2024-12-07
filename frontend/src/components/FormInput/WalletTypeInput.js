import styles from './FormInput.module.scss';
import { useState, useEffect, useRef } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useClickOutside from '../ClickOutside/useClickOutside';

function WalletTypeInput({ type, setType, className }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

    useEffect(() => {
        if (!type) {
            setType('Personal')
        }
    },[type, setType])

    const walletTypeOptions = [
        { value: "Personal", label: "Personal" },
        { value: "Business", label: "Business" },
        { value: "Saving", label: "Saving" }
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
