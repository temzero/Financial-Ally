import styles from './FormInput.module.scss'

function TextInput({content, setContent}) {
    return ( 
        <input
                className={styles.formTextInput}
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
    );
}

export default TextInput;