import styles from './FormInput.module.scss';
import { useEffect } from 'react';

function WalletTypeInput({ type, setType }) {
    useEffect(() => {
        setType('Personal')
    },[type, setType])

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
