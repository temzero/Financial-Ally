import styles from './FormInput.module.scss';
import { useEffect } from 'react';

function CategoryTypeInput({ type, setType, className }) {

    useEffect(() => {
        setType('Expense');
    }, [setType]);

    return (
        <select
            className={`${styles.formInputOptions} ${className || ''}`}

            value={type}
            onChange={(e) => setType(e.target.value)}
        >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
        </select>
    );
}

export default CategoryTypeInput;
