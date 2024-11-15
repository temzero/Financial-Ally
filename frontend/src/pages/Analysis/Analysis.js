import styles from './Analysis.module.scss';
import walletImage from '../../assets/images/wallet.png';

function Analysis() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>Analysis</div>
            </div>
            <div className={styles.body}>
                <img
                    src={walletImage}
                    alt="Nothing"
                    className={styles.analysisImage}
                />
            </div>
        </div>
    );
}

export default Analysis;
