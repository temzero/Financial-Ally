import styles from './FormInput.module.scss';
import React, { useState, useEffect, useRef } from 'react';

function ColorInput({ color, setColor, isFocusOutside, setIsFocusOutside = () => {} }) {
    const colors = ['green', 'red', 'blue', 'orange', 'purple', 'rainbow'];
    const [counter, setCounter] = useState(-1);

    useEffect(() => {
        if (color && colors.includes(color)) {
            const initialColorNumber = colors.indexOf(color);
            setCounter(initialColorNumber); // Set the counter to the index of the color
        }
    }, [color]);
    
    const [isFocus, setIsFocus] = useState(isFocusOutside);
    const colorContainerRef = useRef(null);

    useEffect(() => {
        setIsFocus(isFocusOutside);
    }, [isFocusOutside]);

    useEffect(() => {
        setIsFocusOutside(isFocus);
    }, [isFocus, setIsFocusOutside]);

    useEffect(() => {
        if (isFocus && colorContainerRef.current) {
            colorContainerRef.current.focus();
        } else if (!isFocus && colorContainerRef.current) {
            colorContainerRef.current.blur();
        }
    }, [isFocus]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isFocus) {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    setCounter((prevCounter) => (prevCounter - 1 + colors.length) % colors.length);
                } else if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    setCounter((prevCounter) => (prevCounter + 1) % colors.length);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFocus, colors.length]);

    useEffect(() => {
        setColor(colors[counter]); // Update selected color based on counter
    }, [counter, colors, setColor]);

    return (
        <div
            ref={colorContainerRef}
            className={styles.colorOptions}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            tabIndex={0} // Make it focusable
        >
            {colors.map((loopColor, index) => (
                <div
                    key={loopColor}
                    className={`${styles.circleOption} background-${loopColor} ${counter === index ? styles.active : ''}`}
                    onClick={() => {
                        setCounter(index);
                        setColor(loopColor);
                    }}
                ></div>
            ))}
        </div>
    );
}

export default ColorInput;
