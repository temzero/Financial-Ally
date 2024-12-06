import styles from './FormInput.module.scss';
import React, { useEffect, useMemo, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ date, setDate, isDropdown, setIsDropdown }) => {
    const inputRef = useRef(null);
    
    useEffect(() => {
        if (isDropdown) {
            inputRef.current?.setFocus();
        } else {
            inputRef.current?.setBlur();
        }
    }, [isDropdown]);

    const today = useMemo(() => new Date().toISOString(), [])
    const yesterday = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date.toISOString();
    }, []);
    const tomorrow = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + 1); 
        return date.toISOString();
    }, []);

    useEffect(() => {
        if (!date) {
            setDate(today);
        }
    }, [date, setDate, today]);

    // Generate a label for the current date
    const getDateLabel = (date) => {
        const dateData = date.split('T')[0]
        if (dateData === today.split('T')[0]) {
            return <span className={styles.dateLabel}>Today</span>;
        } else if (dateData === yesterday.split('T')[0]) {
            return <span className={styles.dateLabel}>Yesterday</span>;
        } else if (dateData === tomorrow.split('T')[0]) {
            return <span className={styles.dateLabel}>Tomorrow</span>;
        }
    };

    // Handle date selection
    const handleDateChange = (selectedDate) => {
        const formattedDate = new Date(selectedDate).toISOString().split('.')[0]; 
        const milliseconds = today.split('.')[1];
        const formattedDateWithMilliseconds = `${formattedDate}.${milliseconds}`;
        setDate(formattedDateWithMilliseconds); 
        setIsDropdown(false);
        inputRef.current?.setBlur();
    };

    return (
        <div className={styles.formInputOptions}>
            <DatePicker
                ref={inputRef}
                className={styles.formDateInput}
                selected={date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                onBlur={() => setIsDropdown(false)}
            />
            {getDateLabel(date)}
        </div>
    );
};

export default DateInput;
