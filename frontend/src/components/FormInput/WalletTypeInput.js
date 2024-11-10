import styles from './FormInput.module.scss';

function WalletTypeInput({ type, setType }) {
    return (
        <select
            className={styles.formInputOptions}
            value={type}
            onChange={(e) => setType(e.target.value)}
        >
            <option value="Personal">Personal</option>
            <option value="Business">Business</option>
            <option value="Savings">Savings</option>
        </select>
    );
}

export default WalletTypeInput;
