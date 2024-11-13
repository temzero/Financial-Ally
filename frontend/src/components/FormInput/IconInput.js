import { useState, useEffect, useRef } from 'react';
import styles from './FormInput.module.scss';
import { AiOutlineQuestion } from "react-icons/ai";
import { FaCoffee, FaApple, FaBeer } from 'react-icons/fa';

function IconInput({ icon, setIcon, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Sample icons array with names and components
    const iconOptions = [
        { iconName: 'Coffee', component: <FaCoffee /> },
        { iconName: 'Apple', component: <FaApple /> },
        { iconName: 'Beer', component: <FaBeer /> }
    ];

    const handleIconSelect = (selectedIconName) => {
        setIcon(selectedIconName);  // Update icon name in state
        setIsOpen(false);            // Close the dropdown
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false); // Close dropdown if clicked outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Find the selected icon component based on the icon name
    const selectedIcon = iconOptions.find(option => option.iconName === icon)?.component || <AiOutlineQuestion />;

    return (
        <div ref={dropdownRef} className={`${styles.formIconInput} ${className || ''}`}>
            <div onClick={() => setIsOpen(!isOpen)} className={styles.iconSelector}>
                {selectedIcon} {/* Display the selected icon or a default question mark */}
            </div>
            {isOpen && (
                <div className={styles.iconDropdown}>
                    {iconOptions.map(option => (
                        <div 
                            key={option.iconName}
                            className={styles.iconOption}
                            onClick={() => handleIconSelect(option.iconName)} // Set icon name
                        >
                            {option.component} {/* Show icon component in dropdown */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default IconInput;
