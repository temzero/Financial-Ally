import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../redux/actions';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const successMessage = 'Welcome back! Please wait...';

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginInfo = { email, password };
        dispatch(loginRequest(loginInfo, setMessage, navigate));
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
