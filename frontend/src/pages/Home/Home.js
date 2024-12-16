import { useSelector, useDispatch } from 'react-redux';
import styles from './Home.module.scss';
import { useEffect } from 'react';
import { getWallets, getTransactions } from '../../redux/actions';
import TransactionList from '../../components/Transaction/TransactionList';
import AddTransaction from '../../components/Transaction/AddTransaction';
import CountUpEffect from '../../components/Animation/CountUpEffect';
import Chart from '../../components/Chart/Chart';

function Home() {
    const currency = '$';
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const wallets = useSelector((state) => state.wallet.wallets);
    const transactions = useSelector((state) => state.transaction.transactions);

    

    const totalBalance = (wallets || []).reduce(
        (sum, wallet) => sum + wallet.balance,
        0
    );

    useEffect(() => {
        if (user?._id) {
            dispatch(getWallets(user._id));
            dispatch(getTransactions(user._id));
        }
    }, [user?._id, dispatch, totalBalance]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.balance}>
                    <span className={styles.currency}>{currency}</span>
                    <CountUpEffect n={totalBalance} />{' '}
                </div>
                <Chart />
                <div className='spacer-medium'></div>
                <div className='section-header'>Transactions</div>
                <TransactionList transactions={transactions} />
            </div>
            <AddTransaction/>
        </div>
    );
}

export default Home;
