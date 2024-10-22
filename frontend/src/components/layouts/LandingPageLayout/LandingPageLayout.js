
import Button from '../../Button/Button';
import styles from './LandingPage.module.scss';
import { GiCoinflip } from 'react-icons/gi';

function LandingPageLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <a className={styles.navBtn} href='./'>
                    <GiCoinflip className={styles.icon} />
                    Financial Ally
                </a>

                <div className={styles.LoginRegister}>
                    <Button className={styles.LoginRegisterBtn} simple l href='./login' >Login</Button>
                    <Button className={styles.LoginRegisterBtn} simple l href='./register' >Register</Button>
                </div>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}

export default LandingPageLayout;
