import { useState, useEffect, useRef } from 'react';
import styles from './FormInput.module.scss';
import { AiOutlineQuestion } from "react-icons/ai";
import reactIcons from '../../assets/icons/reactIcons';

function IconInput({ icon, setIcon, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    

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
    const selectedIcon = reactIcons.find(item => item.name === icon)?.icon || <AiOutlineQuestion />;

    return (
        <div ref={dropdownRef} className={`${styles.formIconInput} ${className || ''}`}>
            <div onClick={() => setIsOpen(!isOpen)} className={styles.iconSelector}>
                {selectedIcon} {/* Display the selected icon or a default question mark */}
                
            </div>
            {isOpen && (
                <div className={styles.iconDropdown}>
                    {reactIcons.map(item => (
                        <div 
                            key={item.name}
                            className={styles.iconItem}
                            onClick={() => handleIconSelect(item.name)} // Set icon name
                        >
                            {item.icon} {/* Show icon component in dropdown */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default IconInput;
