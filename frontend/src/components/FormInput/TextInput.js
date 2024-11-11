import styles from './FormInput.module.scss'

function TextInput({content, setContent, className, placeholder}) {
    return ( 
        <input
                className={`${styles.formTextInput} ${className || ''}`}
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
            />
    );
}

export default TextInput;