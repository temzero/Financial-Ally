import styles from './Sidebar.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { store } from '../../../../redux/store';
import { logout } from '../../../../redux/actions';

function Sidebar() {
    const user = useSelector((state) => state.user.user);
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

    const navLinkClasses = (path) => {
        return `${styles.navBtn} ${location.pathname.startsWith(path) ? styles.active : ''}`
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <a className={navLinkClasses(navLinks.profile)} href={navLinks.profile}>
                    {user.firstName || 'Profile'}
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
