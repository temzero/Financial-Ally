import styles from './DeleteForm.module.scss';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBudget } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowRight } from "react-icons/hi";
import { setOverlay } from '../../redux/actions';
import trashIcon from '../../assets/images/opentrashcan.png';
import useClickOutside from '../ClickOutside/useClickOutside';
import budgetIcon from '../../assets/icons/reportIcon'; 

function DeleteBudgetForm({ showForm, setShowForm, budget }) {
    const budgetId = budget?._id;
    const name = budget?.name || '';
    const color = budget?.color || '';
    const formRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {dispatch(setOverlay(true))}, [])

    const closeForm = () => {
        setShowForm(false);
        dispatch(setOverlay(false))
    }

    const handleDeleteBudget = (e) => {
        e.preventDefault();
        dispatch(deleteBudget(budgetId));
        closeForm()
        navigate('/budget');
    };

    useClickOutside(formRef, closeForm);

    return (
        showForm && (
            <div className='overlay'>
                <div className='formContainer' ref={formRef}>
                    <div className={styles.formTitle}>
                        Do you want to delete this budget?
                    </div>

                    <div className={styles.formBody}>
                        <div className={`${styles.formIconContainer} text-${color}`}>
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
                        <div className={`${styles.deleteButton} primary-red`} onClick={handleDeleteBudget}>
                            Delete
                        </div>
                        <div className={styles.cancelButton} onClick={closeForm}>
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default DeleteBudgetForm;
