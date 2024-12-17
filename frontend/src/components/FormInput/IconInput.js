import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineQuestion } from "react-icons/ai";
import styles from './FormInput.module.scss';
import reactIcons from '../../assets/icons/reactIcons';
import useClickOutside from '../ClickOutside/useClickOutside';
import { setOverlay } from '../../redux/actions';

function IconInput({ icon, setIcon, className }) {
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

    const handleIconSelect = (selectedIconName) => {
        setIcon(selectedIconName);
        closeFrom();
    };

    useClickOutside(dropdownRef, closeFrom);

    // Find the selected icon component based on the icon name
    const selectedIcon = reactIcons.find(item => item.name === icon)?.icon || <AiOutlineQuestion />;

    return (
        <div ref={dropdownRef} className={`${styles.formIconInput} ${className || ''}`}>
            <div onClick={() => setIsOpen(!isOpen)} className={styles.iconSelector}>
                {selectedIcon}
                
            </div>
            {isOpen && (
                <div className={styles.iconDropdown}>
                    {reactIcons.map(item => (
                        <div 
                            key={item.name}
                            className={styles.iconItem}
                            onClick={() => handleIconSelect(item.name)} 
                        >
                            {item.icon}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default IconInput;
