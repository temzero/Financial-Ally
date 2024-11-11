import styles from './FormInput.module.scss';
import { VscSymbolColor } from 'react-icons/vsc'; // Import the icon
import { useState } from 'react';

function ColorInput({ color, setColor, className }) {
    const [isOpen, setIsOpen] = useState(false);

    // Sample color options with corresponding class names
    const colorOptions = [
        { id: 'green', color: 'green' },
        { id: 'red', color: 'red' },
        { id: 'blue', color: 'blue' },
        { id: 'yellow', color: 'yellow' },
        { id: 'orange', color: 'orange' },
        { id: 'purple', color: 'purple' },
        { id: 'rainbow', color: 'rainbow' },
    ];

    const handleColorSelect = (selectedColor) => {
        setColor(selectedColor); // Update the selected color state
        setIsOpen(false);         // Close the dropdown
    };

    // Dynamically set the class based on selected color
    const colorClass = color ? styles[color] : ''; // Example: styles.green, styles.red, etc.

    return (
        <div className={`${styles.formColorSelectionInput} ${className || ''}`}>
            <div onClick={() => setIsOpen(!isOpen)} className={styles.colorSelector}>
                {/* If no color is selected, show the icon, otherwise show the selected color */}
                {color ? (
                    <div
                        className={`${styles.colorIndicator} ${colorClass}`} // Apply dynamic color class
                    />
                ) : (
                    <VscSymbolColor size={20} /> // Display the color icon if no color is selected
                )}
            </div>
            {isOpen && (
                <div className={styles.colorDropdown}>
                    {colorOptions.map(option => {
                        // Dynamically assign class based on the color
                        const colorClass = styles[option.color] || '';  // e.g., styles.green, styles.red

                        return (
                            <div 
                                key={option.id}
                                className={`${styles.colorOption} ${colorClass}`} 
                                onClick={() => handleColorSelect(option.color)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ColorInput;
