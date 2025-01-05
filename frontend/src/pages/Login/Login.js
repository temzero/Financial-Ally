import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../redux/actions';
import styles from './Login.module.scss';
import Button from '../../components/Button/Button';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const emailInputRef = useRef(null);
    const dispatch = useDispatch();
    const successMessage = 'Welcome back! Please wait...';

    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginInfo = { email, password };
        dispatch(loginRequest(loginInfo, setMessage));
    };

    return (
        <div>
            <h2 className={styles.title}>Login</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        id="email"
                        ref={emailInputRef}
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
                    <Button
                        type="submit"
                        primary
                        rounded
                        className={styles.submitButton}
                    >
                        Login
                    </Button>
                </div>
                {message === successMessage ? (
                    <h3 className={`${styles.message} ${styles.success}`}>
                        {message}
                    </h3>
                ) : (
                    <h3 className={`${styles.message} ${styles.fail}`}>
                        {message}
                    </h3>
                )}
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
