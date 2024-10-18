import styles from './LoginRegister.module.scss';
import { GiCoinflip } from 'react-icons/gi';

function LoginRegisterLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <GiCoinflip className={styles.icon} />
                Financial Ally
            </div>
            <div className={styles.container}>{children}</div>
        </div>
    );
}

export default LoginRegisterLayout;
