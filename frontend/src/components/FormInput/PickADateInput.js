import React, { useEffect, useState, useRef } from 'react';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css'; // Import Pikaday's default styles
import styles from './FormInput.module.scss';

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

const DateInput = ({ date, setDate, isFocusOutside, setIsFocusOutside = () => {} }) => {
    const dateInputRef = useRef(null);
    const pikadayRef = useRef(null);

    const [isDropdown, setIsDropdown] = useState(isFocusOutside);

    useEffect(() => {
        setIsDropdown(isFocusOutside);
    }, [isFocusOutside]);

    useEffect(() => {
        setIsFocusOutside(isDropdown);
    }, [isDropdown, setIsFocusOutside]);

    useEffect(() => {
        if(isDropdown) {
            dateInputRef.current.focus();
        } 
    }, [isDropdown]);

    useEffect(() => {
        if (!date) {
            setDate(today); 
        }
    }, [date, setDate]);

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
                const isoDate = selectedDate.toISOString();
                setDate(isoDate); 
            },
            onOpen: () => {
                setIsDropdown(true);
            },
            onClose: () => {
                setIsDropdown(false); 
            },
        });

        return () => {
            if (pikadayRef.current) {
                pikadayRef.current.destroy();
            }
        };
    }, [setDate]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (document.activeElement === dateInputRef.current) {
                if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                    event.preventDefault();
                }
            }
        };

        const handleWheel = (event) => {
            if (document.activeElement === dateInputRef.current) {
                event.preventDefault(); // Prevent scroll
            }
        };

        // Listen for keydown events
        document.addEventListener('keydown', handleKeyDown);
        // Listen for wheel (scroll) events
        document.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div className={styles.formDateInput}>
            <input
                ref={dateInputRef}
                type="text"
                className={styles.dateInput}
                value={date ? formatDateToDDMMYYYY(date) : ''}
                onFocus={() => setIsDropdown(true)} 
                onBlur={() => setIsDropdown(false)} 
                onClick={() => setIsDropdown(!isDropdown)} 
                readOnly
            />
            {getDateLabel(date)}
        </div>
    );
};

export default DateInput;
