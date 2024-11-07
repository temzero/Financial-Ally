import styles from './FormInput.module.scss';

function TextInput({ note, setNote }) {
    return (
        <textarea
            className={styles.formInputNote}
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
        />
    );
}

export default TextInput;
