import styles from './FormInput.module.scss'

function CategoryInput({category, setCategory, className}) {
    return ( 
        <select
            className={`${styles.formInputOptions} ${className || ''}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >
            <option value="Others">Others</option>
            <option value="Food">Food</option>
            <option value="Fashion">Fashion</option>
            <option value="Arcade">Arcade</option>
            <option value="Grocery">Grocery</option>
            <option value="Salary">Salary</option>
        </select>
     );
}

export default CategoryInput;