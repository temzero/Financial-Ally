import styles from './FormInput.module.scss';
import { useRef, useEffect } from 'react';

function EmailInput({ content, setContent, className, isFocusOutside = false, placeholder }) {
    const emailRef = useRef(null);
    const maxChars = 40;

    // Handle input value change
    const handleChange = (e) => {
        const inputValue = e.target.value;
        // Limit the input length
        setContent(inputValue.slice(0, maxChars));
    };

    // Focus the input when isFocusOutside is true
    useEffect(() => {
        if (isFocusOutside === false) {
            emailRef.current?.blur();
        } else if (isFocusOutside && emailRef.current) {
            emailRef.current.focus();
        }
    }, [isFocusOutside]);

    return (
        <input
            ref={emailRef}
            className={`${styles.formTextInput} ${className || ''}`}
            type="email"
            value={content}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
}

export default EmailInput;
