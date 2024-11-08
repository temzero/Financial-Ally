import styles from './FormInput.module.scss'

function LabelInput({label, setLabel, className}) {
    return ( 
        <select
            className={`${styles.formInputOptions} ${className || ''}`}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
        >
            <option value="Others">Others</option>
            <option value="Food">Food</option>
            <option value="Fashion">Fashion</option>
            <option value="Arcade">Arcade</option>
            <option value="Grocery">Grocery</option>
        </select>
     );
}

export default LabelInput;