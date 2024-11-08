import styles from './FormInput.module.scss'

function BalanceInput({amount, setAmount, className}) {
    return (
        <input
            className={`${styles.formInputAmount} ${className || ''}`}
            type="number"
            placeholder="$"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
        />
    );
}

export default BalanceInput;
