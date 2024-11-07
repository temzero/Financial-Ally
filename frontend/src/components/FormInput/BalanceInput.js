import styles from './FormInput.module.scss'

function BalanceInput({amount, setAmount}) {
    return (
        <input
            className={styles.formInputAmount}
            type="number"
            placeholder="$"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
        />
    );
}

export default BalanceInput;
