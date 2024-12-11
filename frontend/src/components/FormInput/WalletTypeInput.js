import styles from './FormInput.module.scss';
import { useState, useEffect, useRef } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useClickOutside from '../ClickOutside/useClickOutside';

function WalletTypeInput({ type, setType, isFocusOutside, setIsFocusOutside = () => {}, className }) {
    const [isDropdown, setIsDropdown] = useState(isFocusOutside);
    const dropdownRef = useRef(null);
    const optionRefs = useRef([]);
    const [counter, setCounter] = useState(0);

    const walletTypeOptions = [
        { value: "Personal", label: "Personal" },
        { value: "Business", label: "Business" },
        { value: "Saving", label: "Saving" }
    ];

    // Synchronize isDropdown with isFocusOutside
    useEffect(() => {
        setIsDropdown(isFocusOutside);
    }, [isFocusOutside]);
    useEffect(() => {
        setIsFocusOutside(isDropdown);
    }, [isDropdown, setIsFocusOutside]);

    // Close dropdown on click outside
    useClickOutside(dropdownRef, () => { setIsDropdown(false); });

    // Set default type if not already set
    useEffect(() => {
        if (!type) {
            setType('Personal');
        }
    }, [type, setType]);

    // Handle keyboard navigation when dropdown is open
    useEffect(() => {
        if (isDropdown) {
            const handleKeyDown = (event) => {
                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setCounter((prevCounter) => (prevCounter - 1 + walletTypeOptions.length) % walletTypeOptions.length);
                } else if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setCounter((prevCounter) => (prevCounter + 1) % walletTypeOptions.length);
                } else if (event.key === 'Enter') {
                    event.preventDefault();
                    if (walletTypeOptions[counter]) {
                        setType(walletTypeOptions[counter].value);
                        setIsDropdown(false);
                    }
                }
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isDropdown, counter, walletTypeOptions, setType]);

    // Scroll to the active option when counter changes
    useEffect(() => {
        if (isDropdown && optionRefs.current[counter]) {
            optionRefs.current[counter].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [counter, isDropdown]);

    const handleOptionSelect = (value) => {
        setType(value);
        setIsDropdown(false);
    };

    return (
        <div className={`${styles.customDropdown} ${className || ''}`} ref={dropdownRef}>
            <div
                className={styles.dropdownHeader}
                onClick={() => setIsDropdown(!isDropdown)}
            >
                <div className={styles.selectedType}>
                    {walletTypeOptions.find(option => option.value === type)?.label || "Personal"}
                </div>
                <span className={styles.arrow}>
                    {isDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {isDropdown && (
                <div className={styles.dropdownList}>
                    {walletTypeOptions.map((option, index) => (
                        <div
                            key={option.value}
                            ref={(el) => (optionRefs.current[index] = el)}
                            className={`${styles.dropdownItem} ${counter === index ? styles.active : ''}`}
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
