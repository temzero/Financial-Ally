import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Wallet.module.scss'
import Button from '../../components/Button/Button'

import { store } from '../../redux/store';
import { addWallet } from '../../redux/actions';

function Wallet() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    const handleAddWallet = () => {
        store.dispatch(addWallet())
    }

    return (
        <div>
            <div className={styles.header}>
                <h2 className={styles.title}>Wallet</h2>
                <div>
                    <Button primary onClick={handleAddWallet} >Add Wallet</Button>
                </div>
            </div>

            <div className={styles.info}>
                <h3>{user.firstName} {user.lastName}</h3>
                <h3>Email: {user.email}</h3>
                <h3>Balance: ${user.balance}</h3>
            </div>

        </div>

    );
}

export default Wallet;