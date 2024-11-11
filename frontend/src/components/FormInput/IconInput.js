import styles from './FormInput.module.scss';
import { AiOutlineQuestion } from "react-icons/ai";
import { useState } from 'react';
import { FaCoffee, FaApple, FaBeer } from 'react-icons/fa'; // Example icons

function IconInput({ icon, setIcon, className }) {
    const [isOpen, setIsOpen] = useState(false);

    // Sample icons array (you can replace this with your desired icons)
    const iconOptions = [
        { id: 'coffee', component: <FaCoffee /> },
        { id: 'apple', component: <FaApple /> },
        { id: 'beer', component: <FaBeer /> }
    ];

    const handleIconSelect = (selectedIcon) => {
        setIcon(selectedIcon);  // Update the selected icon state
        setIsOpen(false);        // Close the dropdown
    };

    return (
        <div className={`${styles.formIconInput} ${className || ''}`}>
            <div onClick={() => setIsOpen(!isOpen)} className={styles.iconSelector}>
                {icon ? icon : <AiOutlineQuestion />} {/* Show selected icon or default question mark */}
            </div>
            {isOpen && (
                <div className={styles.iconDropdown}>
                    {iconOptions.map(option => (
                        <div 
                            key={option.id}
                            className={styles.iconOption}
                            onClick={() => handleIconSelect(option.component)} // Select icon
                        >
                            {option.component}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default IconInput;
