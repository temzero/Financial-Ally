import styles from './LandingPage.module.scss'

const LandingPage = function () {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Track Your Bills,<br />Track Your Success!</h1>
            </div>
            <div className={styles.content}>
                <h1 className={styles.contentTitle}>Read me!</h1>
                <div>
                    <h3 className={styles.description}>This is CS50 Final Project</h3>
                    <h3 className={styles.description}>Financial Ally</h3>
                    <h3 className={styles.description}>Designed to help people track their expenses and incomes</h3>
                    <h3 className={styles.description}>Languages: Javascript, HTML, CSS</h3>
                    <h3 className={styles.description}>Libraries: ReactJS, NodeJS...</h3>
                    <h3 className={styles.description}>Database: MongoDB</h3>
                </div>
            </div>
        </div>
    )
}

export default LandingPage