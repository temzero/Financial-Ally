import styles from './FormInput.module.scss';
import { useRef, useEffect } from 'react';

function TextInput({ content, setContent, className, isFocusOutside = false, placeholder }) {
    const textRef = useRef(null);
    const maxChars = 40;

    // Handle input value change
    const handleChange = (e) => {
        const inputValue = e.target.value;
        // Capitalize the first letter 
        const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        setContent(capitalizedValue.slice(0, maxChars));
    };

    // Focus the input when isFocusOutside is true
    useEffect(() => {
        if (isFocusOutside === false) {
            textRef.current?.blur();
        }
        else if (isFocusOutside && textRef.current) {
            textRef.current.focus();
        }
    }, [isFocusOutside]);

    return (
        <input
            ref={textRef}
            className={`${styles.formTextInput} ${className || ''}`}
            type="text"
            value={content}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
}

export default TextInput;
