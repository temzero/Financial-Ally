import styles from './Sidebar.module.scss';
import { IoArrowBack } from 'react-icons/io5';

function Sidebar() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <a className={styles.navBtn} href="./profile">
                    Nhan
                </a>
            </div>
            <div className={styles.nav}>
                <a className={styles.navBtn} href="./">
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
                <a className={styles.navBtn} href="./">
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
