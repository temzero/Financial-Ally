import styles from './LandingPage.module.scss'
import { GiCoinflip } from 'react-icons/gi';


const LandingPage = function () {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Track Your Bills,<br/>Track Your Success!</h1>
                <GiCoinflip className={styles.icon} />
            </div>
            <div className={styles.content}>
                <h1 className={styles.contentTitle}>Read me!</h1>
                <div className={styles.description}>
                    <div>This is CS50 Final Project</div>
                    <div>Financial Ally - Designed to help people track their expenses and incomes</div>
                    <div className='spacer-small'></div>

                    <div>My name is Nguyen Tran Nhan</div>
                    <div className='spacer-small'></div>

                    <div>Github: temzero</div>
                    <div>edX: Nhan00</div>
                    <div className='spacer-small'></div>

                    <div>City: Dongha</div>
                    <div>Country: Vietnam</div>
                    <div className='spacer-small'></div>

                    <div>Languages: Javascript, HTML, CSS</div>
                    <div>Libraries: ReactJS, NodeJS...</div>
                    <div>Database: MongoDB</div>
                    <div className='spacer-small'></div>

                    <div>Date recorded: December 18, 2024</div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage