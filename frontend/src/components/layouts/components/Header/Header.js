import styles from './Header.module.scss';
import { GiCoinflip } from "react-icons/gi";


function Header() {
    return (
        <header className={styles.wrapper}>
            <a className={styles.navBtn} href='./home'>
                <GiCoinflip className={styles.icon} />
                Financial Ally
            </a>
        </header>
    );
}

export default Header;
