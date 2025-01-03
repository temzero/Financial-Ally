import React, { useEffect, useState, useRef } from 'react';
import styles from './FormInput.module.scss';
import useClickOutside from '../ClickOutside/useClickOutside';

// Helper to format date as dd/mm/yyyy
const formatDateToDDMMYYYY = (isoDate) => {
    if (!isoDate) return '';
    const isoJustDate = isoDate.split('T')[0]
    const [year, month, day] = isoJustDate.split('-');
    return `${day} / ${month} / ${year}`;
};

const today = new Date().toISOString();
const yesterday = new Date(
    new Date().setDate(new Date().getDate() - 1)
).toISOString();
const tomorrow = new Date(
    new Date().setDate(new Date().getDate() + 1)
).toISOString();

// Generate a label for the current date
const getDateLabel = (date) => {
    const dateData = date.split('T')[0];
    if (dateData === today.split('T')[0]) {
        return <span className={styles.dateLabel}>Today</span>;
    } else if (dateData === yesterday.split('T')[0]) {
        return <span className={styles.dateLabel}>Yesterday</span>;
    } else if (dateData === tomorrow.split('T')[0]) {
        return <span className={styles.dateLabel}>Tomorrow</span>;
    }
};

const DateInput = ({ date, setDate, isDropdownOutside = false, setIsDropdownOutside = () => {}}) => {
    const [trigger, setTrigger] = useState(false)
    const dateInputRef = useRef(null);
    const formInputRef = useRef(null);
    
    const [isDropdown, setIsDropdown] = useState(isDropdownOutside);

    // Update isWalletDropdown when isDropdownOutside changes
    useEffect(() => {
        setIsDropdown(isDropdownOutside);
    }, [isDropdownOutside]);
    
    // Synchronize isDropdown with isFocusOutside
    useEffect(() => {
        setIsDropdown(isDropdownOutside);
    }, [isDropdownOutside]);
    useEffect(() => {
        setIsDropdownOutside(isDropdown);
    }, [isDropdown, isDropdownOutside]);
    
    // Close dropdown on click outside
    useClickOutside(formInputRef, () => setIsDropdown(false));

    useEffect(() => {
        if (!date) {
            setDate(today);
        }
    }, [date, setDate]);

    useEffect(() => {
        if (dateInputRef.current && isDropdown) {
            try {
                dateInputRef.current.showPicker();
            } catch (error) {
                console.error('showPicker is not supported or failed:', error);
                setIsDropdown(false);
            }
        } else {
            setIsDropdown(false);
        }
    }, [isDropdown, trigger]);

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        const currentTime = new Date().toISOString().split('T')[1]; 
        const isoDateWithTime = `${selectedDate}T${currentTime}`;
        setDate(isoDateWithTime); 
        setIsDropdown(false);
    };

    const handleOnClick = () => {
        setIsDropdown(true);
        setTrigger(!trigger)
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            setIsDropdown(false);
        }
        if (event.key === 'Escape') {
            event.preventDefault(); 
            setIsDropdown(false);
        }
    };

    return (
        <div
            ref={formInputRef}
            className={styles.formDateInput}
            onClick={handleOnClick}
            >
            <div>{formatDateToDDMMYYYY(date)}</div>
            <input
                ref={dateInputRef}
                type="date"
                className={styles.dateInput}
                value={date}
                onChange={handleDateChange}
                onClick={handleOnClick}
                onKeyDown={handleInputKeyDown} 
            />
            <div>{getDateLabel(date)}</div>
        </div>
    );
};

export default DateInput;
