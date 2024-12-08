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

const DateInput = ({ date, setDate, isDropdownOutside = false, setIsDropdownOutside = () => {}, counter, setCounter = () => {} }) => {
    const [trigger, setTrigger] = useState(false)
    const dateInputRef = useRef(null);
    const formInputRef = useRef(null);
    useClickOutside(formInputRef, () => {
        setIsDropdown(false); // Close the dropdown
        setIsDropdownOutside(false); // Sync the external state
    });

    const [isDropdown, setIsDropdown] = useState(isDropdownOutside);
    console.log('isDropdown', isDropdown)
    console.log('isDropdownOutside', isDropdownOutside)
    // Update isWalletDropdown when isDropdownOutside changes
    useEffect(() => {
        setIsDropdown(isDropdownOutside);
    }, [isDropdownOutside]);

    useEffect(() => {
        if (!date) {
            setDate(today);
        }
    }, [date, setDate]);

    useEffect(() => {
        if (dateInputRef.current && isDropdown) {
            try {
                dateInputRef.current.showPicker();
                dateInputRef.current.click();
            } catch (error) {
                console.error('showPicker is not supported or failed:', error);
                setIsDropdown(false); // Ensure it's set to false when showPicker fails
            }
        } else {
            setIsDropdown(false); // Fallback if not showing
        }
    }, [isDropdown, trigger]);

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        const currentTime = new Date().toISOString().split('T')[1]; 
        const isoDateWithTime = `${selectedDate}T${currentTime}`;
        setDate(isoDateWithTime); 
        setIsDropdown(false);
        setIsDropdownOutside(false);
    };

    const handleOnClick = () => {
        setIsDropdown(true);
        setTrigger(!trigger)
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('Enter Enter Enter Enter')
            event.preventDefault(); 
            setIsDropdown(false);
            setIsDropdownOutside(false);

        }
        if (event.key === 'Escape') {
            console.log('Escape Escape Escape Escape')
            event.preventDefault(); 
            setIsDropdown(false);
            setIsDropdownOutside(false);

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
