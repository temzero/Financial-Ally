import styles from './FormInput.module.scss';

function TextInput({ content, setContent, className, placeholder }) {
    const handleChange = (e) => {
        const inputValue = e.target.value;
        // Capitalize the first letter 
        const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        setContent(capitalizedValue);
    };

    return (
        <input
            className={`${styles.formTextInput} ${className || ''}`}
            type="text"
            value={content}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
}

export default TextInput;
