import styles from './FormInput.module.scss';
import React, { useEffect, useMemo, useRef } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ date, setDate, isDropdownOutside }) => {
    const inputRef = useRef(null);
    
    const formattedDate = (date) => {
        const offsetMinutes = date.getTimezoneOffset();
        const offsetDate = new Date(date.getTime() - offsetMinutes * 60 * 1000);
        const formattedDate = offsetDate.toISOString().replace('Z', '+00:00');

        return formattedDate;
    }

    // Memoized date strings for today, yesterday, and tomorrow
    const today = useMemo(() => formattedDate(new Date()).split('T')[0], []);
    const yesterday = useMemo(
        () => formattedDate(new Date(new Date().setDate(new Date().getDate() - 1))).split('T')[0],
        []
    );
    const tomorrow = useMemo(
        () => formattedDate(new Date(new Date().setDate(new Date().getDate() + 1))).split('T')[0],
        []
    );

    // Set the initial date if not provided
    useEffect(() => {
        if (!date) {
            setDate(today); // Initialize with today's date
        }
    }, [date, setDate, today]);

    // Handle dropdown focus/blur based on `isDropdownOutside`
    useEffect(() => {
        if (isDropdownOutside) {
            inputRef.current?.setFocus();
        } 
    }, [isDropdownOutside]);

    // Generate a label for the current date
    const getDateLabel = (date) => {
        const dateData = date.split('T')[0]
        if (dateData === today) {
            return <span className={styles.todayLabel}>Today</span>;
        } else if (dateData === yesterday) {
            return <span className={styles.todayLabel}>Yesterday</span>;
        } else if (dateData === tomorrow) {
            return <span className={styles.todayLabel}>Tomorrow</span>;
        }
    };

    // Handle date selection
    const handleDateChange = (selectedDate) => {
        if (selectedDate) {
            setDate(formattedDate(selectedDate)); // Update state with the formatted date string
        }
    };

    return (
        <div className={styles.formInputOptions}>
            <DatePicker
                ref={inputRef}
                className={styles.formDateInput}
                selected={date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
            />
            <div className={styles.formInputTrigger}>
                {getDateLabel(date)}
            </div>
        </div>
    );
};

export default DateInput;
