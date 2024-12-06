import styles from './FormInput.module.scss';
import React, { useEffect, useRef } from 'react';

const NoteInput = ({ note, setNote, className, isFocus, setIsFocus }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (isFocus) {
            textareaRef.current?.focus();
        } 
    }, [isFocus]);

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
        setIsFocus(false);
    };

    return (
        <div className={styles.noteInputContainer}>
            <textarea
                ref={textareaRef}  // Attach ref to the textarea
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
};

export default NoteInput;
