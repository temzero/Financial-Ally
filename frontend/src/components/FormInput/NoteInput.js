import styles from './FormInput.module.scss';

function NoteInput({ note, setNote, className }) {
    const maxChars = 120;

    return (
        <div className={styles.noteInputContainer}>
            <textarea
                className={`${styles.formInputNote} ${className || ''}`}
                placeholder="Note (optional)"
                value={note}
                maxLength={maxChars}
                onChange={(e) => {
                    const value = e.target.value;
                    setNote(value.slice(0, maxChars)); // Ensure text length remains under the limit
                }}
            />
            <div className={styles.charCounter}>
                {note.length}/{maxChars}
            </div>
        </div>
    );
}

export default NoteInput;