import { useState } from 'react';
import styles from './ForgotPassword.module.scss';
import Button from '../../components/Button/Button';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage(`I don't know neither!`);
    };

    return (
        <div>
            <h2 className={styles.title}>Forgot password?</h2>
            <h2 className={styles.message}>Maybe I could help you out!</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        placeholder="Email"
                        required
                    />
                </div>

                <div className={styles.button}>
                    <Button
                        type="submit"
                        primary
                        rounded
                        className={styles.submitButton}
                    >
                        Submit
                    </Button>
                    {message ? (
                        <h3 className={`${styles.message} ${styles.fail}`}>
                            {message}
                        </h3>
                    ) : (
                        ''
                    )}
                </div>
                <h3 className={styles.link}>
                    I remember now,
                    <a href="/login">Login here!</a>
                </h3>
            </form>
        </div>
    );
}

export default ForgotPassword;
