import styles from './FormInput.module.scss'
import React from 'react';

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

const getDateLabel = (date) => {
    if (date === today) {
        return <span className={styles.todayLabel}>Today</span>;
    } else if (date === yesterday) {
        return <span className={styles.todayLabel}>Yesterday</span>;
    } else if (date === tomorrow) {
        return <span className={styles.todayLabel}>Tomorrow</span>;
    } else {
        return '';
    }
};

function DateInput({ date, setDate }) {
    return (
        <div className={styles.formInputOptions}>
            {getDateLabel(date)}
            <input
                className={styles.formInputChildren}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                // required
            />
        </div>
    );
}

export default DateInput;