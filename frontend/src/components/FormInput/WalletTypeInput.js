import styles from './FormInput.module.scss';

function WalletTypeInput({ type, setType }) {
    return (
        <select
            className={styles.formInputOptions}
            value={type}
            onChange={(e) => setType(e.target.value)}
        >
            <option value="" disabled>
                Select Type
            </option>
            <option value="personal">Personal</option>
            <option value="business">Business</option>
            <option value="savings">Savings</option>
        </select>
    );
}

export default WalletTypeInput;
