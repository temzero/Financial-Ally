import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Profile.module.scss';
import Button from '../../components/Button/Button'

function Profile() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const {firstName, lastName, email, password, createdAt, updatedAt} = user

    const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    const start = new Date(createdAt);
    const now = new Date(); 
    // Calculate the remaining days between today and finishDate
    const period = Math.ceil(Math.abs((now - start) / (1000 * 60 * 60 * 24)));

    const handleEdit = function() {
        
    }
    
    const handleChangePassword = function() {

    }


    return (
        <div className={styles.container}>  
            <div className={styles.innerContainer}>

                <h2 className={styles.header}>
                    <div className={styles.title}>Profile</div>
                    <div className={styles.buttonContainer}>
                        <Button s onClick={handleEdit}>Edit Profile</Button>
                        <Button s onClick={handleChangePassword}>Change Password</Button>
                    </div>
                </h2>

                <div className={styles.body}>
                    <div className={styles.text}>Welcome {firstName} {lastName}</div>
                    <table className={styles.infoTable}>
                        <tbody>
                            <tr>
                                <td className={styles.label}>First Name:</td>
                                <td className={styles.info}>{firstName}</td>
                            </tr>
                            <tr>
                                <td className={styles.label}>Last Name:</td>
                                <td className={styles.info}>{lastName}</td>
                            </tr>
                            <tr>
                                <td className={styles.label}>Email:</td>
                                <td className={styles.info}>{email}</td>
                            </tr>
                            <tr>
                                <td className={styles.label}>Password:</td>
                                <td className={styles.info}>{password}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.date}>Join in {formattedDate} ({period} days)</div>
        </div>

    );
}

export default Profile;