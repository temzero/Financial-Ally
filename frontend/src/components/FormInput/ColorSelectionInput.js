import { useState, useEffect, useRef } from 'react';
import styles from './FormInput.module.scss';
import { VscSymbolColor } from 'react-icons/vsc';
import useClickOutside from '../ClickOutside/useClickOutside';
import { useDispatch } from 'react-redux';
import { setOverlay } from '../../redux/actions';

function ColorSelectionInput({ color, setColor, className }) {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    useEffect(() => {
        dispatch(setOverlay(true))
    }, [dispatch])

    const closeFrom = () => {
        setIsOpen(false)
        dispatch(setOverlay(false))
    }

    const colorOptions = [
        { id: 'green', color: 'green' },
        { id: 'red', color: 'red' },
        { id: 'blue', color: 'blue' },
        { id: 'yellow', color: 'yellow' },
        { id: 'orange', color: 'orange' },
        { id: 'purple', color: 'purple' },
    ];

    const handleColorSelect = (selectedColor) => {
        setColor(selectedColor);
        closeFrom();
    };

    useClickOutside(dropdownRef, closeFrom);

    return (
        <div ref={dropdownRef} className={`${styles.formColorSelectionInput} ${className || ''}`}>
            <div onClick={() => setIsOpen(!isOpen)} className={styles.colorSelector}>
                {color ? (
                    <div
                        className={`${styles.colorIndicator} background-${color}`} 
                    />
                ) : (
                    <VscSymbolColor size={20} />
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
