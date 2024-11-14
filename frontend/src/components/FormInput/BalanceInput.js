import styles from './FormInput.module.scss';
import { useState, useEffect } from 'react';

function BalanceInput({ amount, setAmount, className, currency = '$' }) {
    const [displayAmount, setDisplayAmount] = useState(amount.toLocaleString("en-US"))

    useEffect(() => {
        setDisplayAmount(amount ? amount.toLocaleString("en-US") : '');
    }, [amount]);

    const handleChange = (event) => {
        let inputValue = event.target.value;

        // Allow only one decimal point and prevent other non-numeric characters
        inputValue = inputValue.replace(/[^\d.]/g, ''); // Remove non-numeric characters (except decimal)
        
        // Ensure only one decimal point
        const firstDecimalIndex = inputValue.indexOf('.');
        if (firstDecimalIndex !== -1) {
            inputValue = inputValue.slice(0, firstDecimalIndex + 1) + inputValue.slice(firstDecimalIndex + 1).replace(/\./g, '');
        }

        // Format the number with commas
        const parts = inputValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas to integer part

         // Limit decimal places to 2
        if (parts[1]) {
            parts[1] = parts[1].slice(0, 2);
        }
        
        setDisplayAmount(parts.join('.'));
    };

    const handleBlur = (event) => {
        const inputValue = event.target.value
        const removedInputCommas = inputValue.replace(/,/g, '') ;
        const inputNumber = parseFloat(removedInputCommas)

        if (inputValue === '') {
            setAmount('');
        } else {
            setAmount(inputNumber);

        }
    }

    const formattedAmount = displayAmount.toLocaleString("en-US");
    
    return (
        <div className={`${styles.formInputAmount} ${className || ''}`}>
            <span className={styles.currency}>{currency}</span>
            <input
                className={styles.formAmountInput}
                type="text"
                value={formattedAmount}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    );
}

export default BalanceInput;