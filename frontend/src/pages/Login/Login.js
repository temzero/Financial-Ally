import { useState } from 'react';
import styles from './Login.module.scss';
import Button from '../../components/Button/Button';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the login logic here (e.g., validation, API call)
        console.log('Email:', email, 'Password:', password);
    };

    return (
        <div>
            <h2 className={styles.title}>Login</h2>
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
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className={styles.button}>
                    <Button type='submit' primary rounded className={styles.submitButton}>Login</Button>
                </div>
                <div>
                    <h3 className={styles.link}>
                        <a href="/forgot-password">Forgot password?</a>
                    </h3>
                    <h3 className={styles.link}>
                        Don't have an account?
                        <a href="/register">Register here!</a>
                    </h3>
                </div>
            </form>
        </div>
    );
}

export default Login;
