import styles from './FormInput.module.scss';

function CategoryTypeInput({ type, setType, className }) {
    return (
        <select
            className={`${styles.formInputOptions} ${className || ''}`}

            value={type}
            onChange={(e) => setType(e.target.value)}
            // required
        >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
        </select>
    );
}

export default CategoryTypeInput;
