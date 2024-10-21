import styles from './Sidebar.module.scss';
import { IoArrowBack } from 'react-icons/io5';
import Button from '../../../Button/Button';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { store } from '../../../../redux/store';
import { logout } from '../../../../redux/actions';

function Sidebar() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        store.dispatch(logout());
    }

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Avoid rendering the component if the user is not logged in
    if (!user) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.welcome}>Welcome!</h2>
                <a className={styles.navBtn} href="./profile">
                    {user.firstName}
                </a>
                <Button className={styles.navBtn} onClick={handleLogout}>Logout</Button>
            </div>
            <div className={styles.nav}>
                <a className={`${styles.navBtn} ${styles.active}`} href="./">
                    Home
                </a>
                <a className={styles.navBtn} href="./analysis">
                    Analysis
                </a>
                <a className={styles.navBtn} href="./budget">
                    Budget
                </a>
                <a className={styles.navBtn} href="./wallet">
                    Wallet
                </a>
            </div>
            <div className={styles.setting}>
                <a className={styles.arrowBtn} href="./">
                    <IoArrowBack />
                </a>
                <a className={styles.navBtn} href="./setting">
                    {/* <IoMdSettings /> */}
                    Setting
                </a>
            </div>
        </div>
    );
}

export default Sidebar;
