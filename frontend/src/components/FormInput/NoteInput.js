import styles from './FormInput.module.scss';

function NoteInput({ note, setNote, className }) {
    const maxChars = 120;
    const maxLines = 4;

    const handleChange = (e) => {
        let value = e.target.value;

        // Limit text to 120 characters
        if (value.length > maxChars) {
            value = value.slice(0, maxChars);
        }

        // Limit text to 4 lines
        const lines = value.split('\n');
        if (lines.length > maxLines) {
            value = lines.slice(0, maxLines).join('\n');
        }

        setNote(value);
    };

    return (
        <div className={styles.noteInputContainer}>
            <textarea
                className={`${styles.formInputNote} ${className || ''}`}
                value={note}
                onChange={handleChange}
                rows={4}
            />
            <div className={styles.charCounter}>
                {note.length}/{maxChars}
            </div>
        </div>
    );
}

export default NoteInput;
