import styles from './DeleteForm.module.scss';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../redux/actions'; 
import openTrashIcon from '../../assets/images/opentrashcan.png'
import { HiOutlineArrowRight } from "react-icons/hi";
import iconItems from '../../assets/icons/reactIcons';
import { useSelector } from 'react-redux';

function DeleteCategoryForm({
    selectedCategory,
    setSelectedCategory,
    hidden,
    className = '',
}) {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.category.categories) || [];
    const categoryId = selectedCategory?._id;
    const name = selectedCategory?.name || '';
    const color = selectedCategory?.color || '';
    

    let classes = `
        ${className} 
        ${color ? styles.color : ''}
        ${hidden ? styles.hidden : ''}
    `;

    const handleClickOutside = (event) => {
        event.stopPropagation();
        setSelectedCategory(null);
    };

    const handleCategoryDelete = () => {
        // Delete category logic here
        dispatch(deleteCategory(categoryId));
    };

    const categoryIcon = (categoryName) => {
        const category = categories.find((cat) => cat.name === categoryName);
        const categoryColor = category ? category.color : 'defaultColor';
        const categoryIconName = category ? category.icon : '?';
    
        // Match the icon from iconItems
        const matchedItem = iconItems.find((item) => item.name === categoryIconName);
    
        return (
            <div className={`${styles.formIcon} ${styles[categoryColor]}`}>
                {matchedItem ? matchedItem.icon : ''}
            </div>
        );
    };

    return (
        <div className={classes}>
            <div className={styles.formOverlay} onClick={handleClickOutside}>
                <div className={styles.formContainer} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.formTitle}>
                        Do you want to delete this category?
                    </div>
                    <div className={styles.formBody}>
                        <div className={`${styles.formIconContainer} ${styles[color]}`}>
                            {categoryIcon(name)}
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
                        <div className={styles.deleteButton}><span  onClick={handleCategoryDelete}>Delete</span></div>
                        <div className={styles.cancelButton}><span  onClick={handleClickOutside}>Cancel</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteCategoryForm;
