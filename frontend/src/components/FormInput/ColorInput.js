import styles from './FormInput.module.scss';
import React from 'react';

function ColorInput({ color, setColor }) {
    return (
        <div className={styles.colorOptions}>
            {['green', 'red', 'blue', 'orange', 'purple', 'rainbow'].map(
                (loopColor) => (
                    <div
                        key={loopColor}
                        className={`${styles.circleOption} ${styles[loopColor]}`}
                        onClick={() => setColor(loopColor)}
                        style={{
                            border:
                                color === loopColor
                                    ? '4px solid grey'
                                    : 'none',
                        }}
                    ></div>
                )
            )}
        </div>
    );
}

export default ColorInput;
