import styles from './Sidebar.module.scss';
import { IoArrowBack } from 'react-icons/io5';
import Button from '../../../Button/Button';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { store } from '../../../../redux/store';
import { logout } from '../../../../redux/actions';

function Sidebar() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = {
        home: '/home',
        analysis: '/analysis',
        budget: '/budget',
        wallet: '/wallet',
        profile: '/profile',
        setting: '/setting',
    }

    const handleLogout = () => {
        store.dispatch(logout());
        navigate('/');
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

    const navLinkClasses = (path) => {
        return `${styles.navBtn} ${location.pathname.startsWith(path) ? styles.active : ''}`
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <a className={navLinkClasses(navLinks.profile)} href={navLinks.profile}>
                    {user.firstName}
                </a>
                <Button s simple onClick={handleLogout}>Logout</Button>
            </div>
            <div className={styles.nav}>
                <a
                    className={navLinkClasses(navLinks.home)}
                    href={navLinks.home}
                >
                    Home
                </a>
                <a
                    className={navLinkClasses(navLinks.analysis)}
                    href={navLinks.analysis}
                >
                    Analysis
                </a>
                <a
                    className={navLinkClasses(navLinks.budget)}
                    href={navLinks.budget}
                >
                    Budget
                </a>
                <a
                    className={navLinkClasses(navLinks.wallet)}
                    href={navLinks.wallet}
                >
                    Wallet
                </a>
            </div>
            <div className={styles.setting}>
                <a className={styles.arrowBtn} href="./">
                    <IoArrowBack />
                </a>
                <a className={navLinkClasses(navLinks.setting)} href={navLinks.setting}>
                    {/* <IoMdSettings /> */}
                    Setting
                </a>
            </div>
        </div>
    );
}

export default Sidebar;
