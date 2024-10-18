import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';

function DefaultLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <Sidebar /> 
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
