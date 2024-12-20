import styles from './DeleteForm.module.scss';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { deleteCategory } from '../../redux/actions'; 
import openTrashIcon from '../../assets/images/opentrashcan.png'
import { HiOutlineArrowRight } from "react-icons/hi";
import iconItems from '../../assets/icons/reactIcons';
import useClickOutside from '../ClickOutside/useClickOutside';
import useFadeIn from '../Animation/useFadeIn';

function DeleteCategoryForm({
    selectedCategory,
    setSelectedCategory,
    hidden,
    className = '',
}) {
    const dispatch = useDispatch();
    const formRef = useRef(null)
    const categoryColor = selectedCategory?.color || 'defaultColor'
    const fadeInStyle1s = useFadeIn();
    const fadeInStyle3s = useFadeIn(3000);

    
    let classes = `
        ${className} 
        ${categoryColor ? styles.color : ''}
        ${hidden ? styles.hidden : ''}
    `;

    const closeForm = () => {
        setSelectedCategory(null)
    }

    useClickOutside( formRef, closeForm);

    const handleCategoryDelete = () => {
        dispatch(deleteCategory(selectedCategory?._id));
    };

    const categoryIcon = () => {
        const categoryIconName = selectedCategory?.icon || '?';
        const matchedItem = iconItems.find((item) => item.name === categoryIconName);
    
        return (
            <div className={styles.formIcon}>
                {matchedItem ? matchedItem.icon : ''}
            </div>
        );
    };

    return (
        <div className={classes}>
            <div className='overlay' >
                <div className='form-container' ref={formRef}>
                    <div className='form-title'>
                        Do you want to delete this category?
                    </div>
                    <div className={styles.formBody}>
                        <div className={`${styles.formIconContainer} text-${categoryColor}`}>
                            {categoryIcon()}
                            <div className={styles.formName}>{selectedCategory?.name || ''}</div>
                        </div>

                        <HiOutlineArrowRight className={styles.formArrow} style={fadeInStyle1s}/>
                        <img 
                            src={openTrashIcon} 
                            alt="Trash Can Icon" 
                            className={styles.trashIcon} 
                            style={fadeInStyle3s}
                        />
                        
                    </div>
                    <div className={styles.formDeleteButtons}>
                        <div className={`${styles.deleteButton} primary-red`} onClick={handleCategoryDelete}>Delete</div>
                        <div className={styles.cancelButton} onClick={closeForm}>Cancel</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteCategoryForm;
