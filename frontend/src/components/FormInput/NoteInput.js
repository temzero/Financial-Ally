


import styles from './FormInput.module.scss';
import React, { useEffect, useRef } from 'react';

const NoteInput = ({ note, setNote, className, isFocusOutside = false, setIsFocusOutside = () => {} }) => {
    const textareaRef = useRef(null);
    useEffect(() => {
        if (isFocusOutside) {
            textareaRef.current?.focus();
        } else {
            textareaRef.current?.blur();
        }
    }, [isFocusOutside]);

    const maxChars = 120;
    const maxLines = 4;

    const handleChange = (e) => {
        let value = e.target.value;

        // Split the text by lines
        const lines = value.split('\n');

        // Limit text to 4 lines
        if (lines.length > maxLines) {
            value = lines.slice(0, maxLines).join('\n');
        }

        // Limit text to 120 characters
        if (value.length > maxChars) {
            value = value.slice(0, maxChars);
        }

        setNote(value);
    };

    // Handle key down event to log "Enter"
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('Enter');
        }
    };

    return (
        <div className={styles.noteInputContainer}>
            <textarea
                ref={textareaRef}
                className={`${styles.formInputNote} ${className || ''}`}
                value={note}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                rows={4}
            />
            <div className={styles.charCounter}>
                {note.length}/{maxChars}
            </div>
        </div>
    );
};

export default NoteInput;
