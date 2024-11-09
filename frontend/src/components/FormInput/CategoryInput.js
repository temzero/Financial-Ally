import styles from './FormInput.module.scss';

function CategoryInput({ category, setCategory }) {
    return (
        <select
            // className={`${styles.formInput} ${styles.formInputSelect}`}
            className={styles.formInputOptions}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            // required
        >
            <option>All expense & income</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
        </select>
    );
}

export default CategoryInput;
