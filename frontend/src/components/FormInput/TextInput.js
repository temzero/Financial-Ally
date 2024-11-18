import styles from './FormInput.module.scss';

function TextInput({ content, setContent, className, placeholder }) {
    const maxChars = 40;
    const handleChange = (e) => {
        const inputValue = e.target.value;
        // Capitalize the first letter 
        const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        setContent(capitalizedValue.slice(0, maxChars));
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
