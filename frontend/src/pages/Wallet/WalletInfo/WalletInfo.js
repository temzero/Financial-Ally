import styles from './WalletInfo.module.scss';
import { useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import Button from '../../../components/Button/Button';
import EditWalletForm from './EditWalletForm';
import DeleteWalletForm from './DeleteWalletForm';


function WalletInfo() {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const { state } = useLocation();
    const walletData = state?.walletData || {};

    // Ensure properties exist before accessing
    const walletId = walletData._id || ''
    const name = walletData.name || 'Default Name';
    const balance = walletData.balance || 0;
    const color = walletData.color || 'defaultColor';

    const formRef = useRef(null);
    const walletColorClass = styles[color];
    const headerClasses = [walletColorClass, styles.walletHeader].join(' ');

    const handleShowEditForm = () => {
        setShowEditForm(!showEditForm)
    }

    const handleShowDeleteForm = () => {
        setShowDeleteForm(!showDeleteForm)
    }

    return ( 
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>Wallet</div>
                <div className={styles.btnContainer}>
                    <Button s className={styles.btn} onClick={handleShowEditForm}>
                        Edit
                    </Button>
                    <Button s className={styles.btn} onClick={handleShowDeleteForm}>
                        Delete
                    </Button>
                </div>
            </div>
            <div className={styles.walletInfo}>
                <div className={headerClasses}>
                    <div className={styles.walletName}>{name}</div>
                </div>
                <div className={styles.walletContent}>
                    <div className={styles.walletBalance}>${balance}</div>
                    <div>
                        <div className={styles.walletSubHeader}>Analysis</div>
                        <div className={styles.walletSubHeader}>Transactions</div>
                    </div>
                </div>
            </div>

            <EditWalletForm
                showForm={showEditForm}
                setShowForm={setShowEditForm}
                formRef={formRef}
                walletId={walletId}
            />
            
            <DeleteWalletForm
                showForm={showDeleteForm}
                setShowForm={setShowDeleteForm}
                formRef={formRef}
                walletId={walletId}
            />
        </div>
    );
}

export default WalletInfo;