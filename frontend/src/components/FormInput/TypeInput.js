import styles from './FormInput.module.scss';
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import useClickOutSide from '../ClickOutSide/useClickOutSide';

function TypeInput({ type, setType, className }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useClickOutSide(() => setIsDropdownOpen(false));

    const typeOptions = [
        { value: "", label: "All expense & income" },
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
                <div className={styles.selectedType}>
                    {typeOptions.find(option => option.value === type)?.label || "All expense & income"}
                </div>
                <span className={styles.arrow}>
                    {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {isDropdownOpen && (
                <div className={styles.dropdownList}>
                    {typeOptions.map(option => (
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

export default TypeInput;
