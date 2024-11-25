import styles from './FormInput.module.scss';
import React, { useState, useEffect, useMemo, forwardRef } from 'react';

const DateInput = forwardRef(({ date, setDate }, ref) => {
    // Calculate today, yesterday, and tomorrow just once using useMemo
    const today = useMemo(() => new Date().toISOString().split('T')[0], []);
    const yesterday = useMemo(() => new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0], []);
    const tomorrow = useMemo(() => new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], []);

    // Set default date to today if not provided
    useEffect(() => {
        if (!date) {
            setDate(today);
        }
    }, [date, setDate, today]);

    console.log('date: ', date);

    const getDateLabel = (currentDate) => {
        if (currentDate === today) {
            return <span className={styles.todayLabel}>Today</span>;
        } else if (currentDate === yesterday) {
            return <span className={styles.todayLabel}>Yesterday</span>;
        } else if (currentDate === tomorrow) {
            return <span className={styles.todayLabel}>Tomorrow</span>;
        }
        return '';
    };

    const handleDateChange = (e) => {
        // Update the date from the input value
        setDate(e.target.value);
    };

    return (
        <div className={styles.formInputOptions} ref={ref}>
            {getDateLabel(date)}
            <input
                className={styles.formInputChildren}
                type="date"
                value={date} // Display only the date portion
                onChange={handleDateChange}
            />
        </div>
    );
});

export default DateInput;
