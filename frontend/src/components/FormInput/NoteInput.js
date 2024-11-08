import styles from './FormInput.module.scss';

function TextInput({ note, setNote, className }) {
    return (
        <textarea
            className={`${styles.formInputNote} ${className || ''}`}
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
        />
    );
}

export default TextInput;
