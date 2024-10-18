import { useState } from 'react';
import styles from './Register.module.scss';
import Button from '../../components/Button/Button';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the Register logic here (e.g., validation, API call)
        console.log( 'First Name: ', firstName, 'Last Name: ', lastName, 'Email:', email, 'Password:', password, 'Confirm password: ', confirmPassword);
    };

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
                <h3 className={styles.link}>
                    Already have an account? 
                    <a href='/login'>Login now!</a>
                </h3>
            </form>
        </div>
    );
}

export default Register;
