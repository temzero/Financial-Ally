import styles from './FormInput.module.scss';
import { useRef, useEffect } from 'react';

function PasswordInput({ content, setContent, className, isFocusOutside = false, placeholder }) {
    const textRef = useRef(null);
    const maxChars = 40;

    // Handle input value change
    const handleChange = (e) => {
        const inputValue = e.target.value;
        setContent(inputValue.slice(0, maxChars));
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
            type="password"
            value={content}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
}

export default PasswordInput;
