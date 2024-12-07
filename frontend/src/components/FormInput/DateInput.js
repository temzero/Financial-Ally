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

const DateInput = ({ date, setDate, isDropdown, setIsDropdown, counter, setCounter }) => {
    const [trigger, setTrigger] = useState(false)
    const dateInputRef = useRef(null);
    const formInputRef = useRef(null);

    useClickOutside(formInputRef, () => setIsDropdown(false));

    useEffect(() => {
        if (!date) {
            setDate(today);
        }
    }, [date, setDate]);

    useEffect(() => {
        if (isDropdown && dateInputRef.current) {
            try {
                dateInputRef.current.showPicker();
            } catch (error) {
                console.error('showPicker is not supported:', error);
                setIsDropdown(false);
            }
        }
        if (!isDropdown) {
            if (counter && setCounter) {
                setCounter(counter + 1)
            }
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
        // setIsDropdown(!isDropdown);
        setIsDropdown(true);
        setTrigger(!trigger)
    };

    console.log('is date Dropdown: ', isDropdown)

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior of the Enter key
            console.log('Enter key pressed on date input!');
            // Execute desired behavior, e.g., close the dropdown or submit data
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
