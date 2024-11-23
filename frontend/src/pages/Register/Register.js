import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../redux/actions';
import { registerRequest } from '../../redux/actions';
import styles from './Register.module.scss';
import Button from '../../components/Button/Button';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            console.log('Password does not match');
            setMessage('Password does not match')
            return;
        }
    
        const userData = {
            firstName,
            lastName,
            email,
            password,
        };
    
        dispatch(registerRequest(userData, setMessage, navigate));
        // setMessage('')
    };

    const loginInfo = { email, password };
        dispatch(loginRequest(loginInfo, setMessage, navigate));

    return (
        <div>
            <h2 className={styles.title}>Create an account</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroupName}>
                    <input 
                        type="text" 
                        id="firstName" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} 
                        className={styles.input} 
                        placeholder='First Name'
                        required 
                    />
                    <input 
                        type="text" 
                        id="lastName" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} 
                        className={styles.input} 
                        placeholder='Last Name'
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        className={styles.input} 
                        placeholder='Email'
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
                        placeholder='Password'
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className={styles.input} 
                        placeholder='Confirm password'
                        required 
                    />
                </div>
                <div className={styles.button}>
                    <Button type='submit' primary rounded className={styles.submitButton}>Sign Up</Button>
                </div>
                {
                    message ? <h3 className={`${styles.message} ${styles.fail}`}>{message}</h3>: ''
                }
                <h3 className={styles.link}>
                    Already have an account? 
                    <a href='/login'>Login now!</a>
                </h3>
            </form>
        </div>
    );
}

export default Register;
