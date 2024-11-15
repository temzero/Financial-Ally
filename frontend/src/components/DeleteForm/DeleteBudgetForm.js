import styles from './DeleteForm.module.scss';
import { useDispatch } from 'react-redux';
import { deleteBudget } from '../../redux/actions';
import openTrashIcon from '../../assets/images/opentrashcan.png';
import budgetIcon from '../../assets/images/moneybag.png';
import { HiOutlineArrowRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';


function DeleteBudgetForm({ showForm, setShowForm, budget }) {
    const budgetId = budget?._id;
    const name = budget?.name || '';
    const color = budget?.color || '';

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickOutside = (event) => {
        event.stopPropagation();
        setShowForm(false);
    };


    const handleDeleteBudget = (e) => {
        e.preventDefault();
        dispatch(deleteBudget(budgetId));
        setShowForm(false);
        navigate('/budget')
    };

    return (
        showForm && (
            <div className={styles.formOverlay} onClick={handleClickOutside}>
                <div className={styles.formContainer}>
                    <div className={styles.formTitle}>
                        Do you want to delete this budget?
                    </div>

                    <div className={styles.formBody}>
                        <div className={`${styles.formIconContainer} ${styles[color]}`}>
                            <div className={styles.formIcon}>
                                <img 
                                    src={budgetIcon} 
                                    alt="Budget" 
                                    className={styles.budgetIcon} 
                                />
                            </div>
                            <div className={styles.formName}>{name}</div>
                        </div>
                        <HiOutlineArrowRight className={styles.formArrow}/>
                        <img 
                            src={openTrashIcon} 
                            alt="Trash Can Icon" 
                            className={styles.trashIcon} 
                        />
                        
                    </div>
                    <div className={styles.formDeleteButtons}>
                        <div className={styles.deleteButton}><span  onClick={handleDeleteBudget}>Delete</span></div>
                        <div className={styles.cancelButton}><span  onClick={handleClickOutside}>Cancel</span></div>
                    </div>
                </div>
            </div>
        )
    );
}

export default DeleteBudgetForm;
