import styles from './FormInput.module.scss';
import { useState, useEffect, useRef } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useClickOutside from '../ClickOutside/useClickOutside';

function CategoryTypeInput({ type, setType, className }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

    useEffect(() => {
        if (!type) {
            setType("Expense");
        }
    }, [type, setType]);

    const categoryOptions = [
        { value: "Income", label: "Income" },
        { value: "Expense", label: "Expense" },
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
                <div className={styles.selectedCategory}>
                    {categoryOptions.find(option => option.value === type)?.label || "Expense"}
                </div>
                <span className={styles.arrow}>
                    {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {isDropdownOpen && (
                <div className={styles.dropdownList}>
                    {categoryOptions.map(option => (
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

export default CategoryTypeInput;
