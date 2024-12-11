import styles from './DeleteForm.module.scss';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBudget } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import trashIcon from '../../assets/images/opentrashcan.png';
import { HiOutlineArrowRight } from "react-icons/hi";
import useClickOutside from '../ClickOutside/useClickOutside';
import budgetIcon from '../../assets/icons/reportIcon'; // Ensure this path is correct

function DeleteBudgetForm({ showForm, setShowForm, budget }) {
    const budgetId = budget?._id;
    const name = budget?.name || '';
    const color = budget?.color || '';
    const formRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeleteBudget = (e) => {
        e.preventDefault();
        dispatch(deleteBudget(budgetId));
        setShowForm(false);
        navigate('/budget');
    };

    useClickOutside(formRef, () => setShowForm(false));

    return (
        showForm && (
            <div className={styles.formOverlay}>
                <div className={styles.formContainer} ref={formRef}>
                    <div className={styles.formTitle}>
                        Do you want to delete this budget?
                    </div>

                    <div className={styles.formBody}>
                        <div className={`${styles.formIconContainer} ${styles[color]}`}>
                            <div className={styles.formIcon}>
                                <div className={styles.budgetIcon}>{budgetIcon()}</div>
                            </div>
                            <div className={styles.formName}>{name}</div>
                        </div>
                        <HiOutlineArrowRight className={styles.formArrow} />
                        <img 
                            src={trashIcon} 
                            alt="Trash Can Icon" 
                            className={styles.trashIcon} 
                        />
                    </div>
                    <div className={styles.formDeleteButtons}>
                        <div className={styles.deleteButton}>
                            <span onClick={handleDeleteBudget}>Delete</span>
                        </div>
                        <div className={styles.cancelButton}>
                            <span onClick={() => setShowForm(false)}>Cancel</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default DeleteBudgetForm;
