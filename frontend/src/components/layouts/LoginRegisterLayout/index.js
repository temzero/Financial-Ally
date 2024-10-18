import styles from './LoginRegister.module.scss';
import { GiCoinflip } from 'react-icons/gi';

function LoginRegisterLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <GiCoinflip className={styles.icon} />
            Financial Ally
            <div className={styles.container}>
                <div className={styles.form}>{children}</div>
            </div>
        </div>
    );
}

export default LoginRegisterLayout;
