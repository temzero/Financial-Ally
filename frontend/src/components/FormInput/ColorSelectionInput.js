import { useState, useEffect, useRef } from 'react';
import styles from './FormInput.module.scss';
import { VscSymbolColor } from 'react-icons/vsc';

function ColorSelectionInput({ color, setColor, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Sample color options with corresponding class names
    const colorOptions = [
        { id: 'green', color: 'green' },
        { id: 'red', color: 'red' },
        { id: 'blue', color: 'blue' },
        { id: 'yellow', color: 'yellow' },
        { id: 'orange', color: 'orange' },
        { id: 'purple', color: 'purple' },
    ];

    const handleColorSelect = (selectedColor) => {
        setColor(selectedColor); // Update the selected color state
        setIsOpen(false);        // Close the dropdown
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

    return (
        <div ref={dropdownRef} className={`${styles.formColorSelectionInput} ${className || ''}`}>
            <div onClick={() => setIsOpen(!isOpen)} className={styles.colorSelector}>
                {/* Show selected color or default color icon */}
                {color ? (
                    <div
                        className={`${styles.colorIndicator} background-${color}`} 
                    />
                ) : (
                    <VscSymbolColor size={20} /> // Display the color icon if no color is selected
                )}
            </div>
            {isOpen && (
                <div className={styles.colorDropdown}>
                    {colorOptions.map(option => {
                        return (
                            <div
                                key={option.id}
                                className={`${styles.colorOption} background-${option.color || 'grey'}`}
                                onClick={() => handleColorSelect(option.color)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ColorSelectionInput;
