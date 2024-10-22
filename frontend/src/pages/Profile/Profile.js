import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Profile.module.scss'

function Profile() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }



    return (
        <div>
            <h2 className={styles.header}>Profile</h2>

            <div className={styles.info}>
                <h3>{user.firstName} {user.lastName}</h3>
                <h3>Email: {user.email}</h3>
                <h3>Balance: ${user.balance}</h3>
            </div>

        </div>

    );
}

export default Profile;