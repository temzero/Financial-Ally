import React, { useEffect, useState, useRef } from 'react';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css'; // Import Pikaday's default styles
import styles from './FormInput.module.scss';

// Helper to format date as DD / MM / YYYY
const formatDateToDDMMYYYY = (isoDate) => {
    if (!isoDate) return '';
    const isoJustDate = isoDate.split('T')[0];
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

const DateInput = ({
    date,
    setDate,
    isDropdownOutside = false,
    setIsDropdownOutside = () => {},
}) => {
    const dateInputRef = useRef(null);
    const pikadayRef = useRef(null);

    const [isDropdown, setIsDropdown] = useState(isDropdownOutside);
    // Two-way synchronization between `isDropdown` and `isDropdownOutside`
    useEffect(() => {
        setIsDropdown(isDropdownOutside);
    }, [isDropdownOutside]);
    
    useEffect(() => {
        setIsDropdownOutside(isDropdown);
    }, [isDropdown, setIsDropdownOutside]);
    
    console.log('isDropdown', isDropdown)
    console.log('isDropdownOutside', isDropdownOutside)
    // Initialize Pikaday
    useEffect(() => {
        pikadayRef.current = new Pikaday({
            field: dateInputRef.current, // Bind Pikaday to the input field
            format: 'DD / MM / YYYY', // Set the display format
            toString: (date) => {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day} / ${month} / ${year}`;
            },
            parse: (dateString) => {
                const [day, month, year] = dateString.split(' / ').map(Number);
                return new Date(year, month - 1, day);
            },
            onSelect: (selectedDate) => {
                const isoDate = selectedDate.toISOString(); // Convert to ISO for storage
                setDate(isoDate); // Update parent state with ISO format
            },
            onOpen: () => {
                setIsDropdown(true); // Show dropdown when the picker opens
            },
            onClose: () => {
                setIsDropdown(false); // Hide dropdown when the picker closes
            },
        });

        // Cleanup on component unmount
        return () => {
            if (pikadayRef.current) {
                pikadayRef.current.destroy();
            }
        };
    }, [setDate]);

    // Set default date if none is provided
    useEffect(() => {
        if (!date) {
            setDate(today); // Set default date to today
        }
    }, [date, setDate]);

    return (
        <div className={styles.formDateInput}>
            <input
                ref={dateInputRef}
                type="text"
                className={styles.dateInput}
                value={date ? formatDateToDDMMYYYY(date) : ''}
                readOnly // Prevent manual input (handled by Pikaday)
                onFocus={() => setIsDropdown(true)} // Show dropdown on focus
            />
            <div>{getDateLabel(date)}</div>
        </div>
    );
};

export default DateInput;
