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
        logout: '/logout',
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

    const greeting = () => {
        const currentHour = new Date().getHours();
        let message = 'Hello'
    
        if (currentHour >= 5 && currentHour < 12) {
            message = 'Good Morning'
        }
        if (currentHour >= 12 && currentHour < 17) {
            message = 'Good Afternoon'
        }
        if (currentHour >= 17 && currentHour < 21) {
            message = 'Good Evening'
        }
        
        return <div className={styles.greeting}>{message}</div>; // Default message for late night hours
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                {greeting()}
                <a className={navLinkClasses(navLinks.profile)} href={navLinks.profile}>
                    {user.firstName}
                </a>
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
            <div className={styles.bottom}>
                <a className={styles.logoutBtn} onClick={handleLogout} href={navLinks.logout}>
                    Logout
                </a>
            </div>
        </div>
    );
}

export default Sidebar;
