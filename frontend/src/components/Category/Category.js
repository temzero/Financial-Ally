import styles from './Category.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editIcon, deleteIcon } from '../../assets/icons/icons';
import { updateCategory, deleteCategory } from '../../redux/actions'; 
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import CategoryTypeInput from '../FormInput/CategoryTypeInput';
import TextInput from '../FormInput/TextInput';
import ColorInput from '../FormInput/ColorInput'


function Category({
    name,
    type,
    id,
    icon,
    color,
    setSelectedCategory,
    hidden,
    className = '',
}) {

    let classes = `
        ${className} 
        ${color ? styles.color : ''}
        ${hidden ? styles.hidden : ''}
    `;

    const dispatch = useDispatch();
    const [editable, setEditable] = useState(false);
    const [categoryName, setCategoryName] = useState(name);
    const [categoryType, setCategoryType] = useState(type);
    const [categoryIcon, setCategoryIcon] = useState(icon);
    const [categoryColor, setCategoryColor] = useState(color);

    const handleClickOutside = (event) => {
        event.stopPropagation();
        setSelectedCategory(null);
        setEditable(false);

        setCategoryName(name);
        setCategoryType(type);
        setCategoryIcon(icon);
        setCategoryColor(color);
    };

    const handleEditButtonClicked = (event) => {
        event.stopPropagation();
        setEditable(true);
    };

    const handleEditConfirm = (event) => {
        event.stopPropagation();
        setEditable(false);
        setSelectedCategory(null);
        updateCategoryData();
    };

    const handleCancelEdit = (event) => {
        event.stopPropagation();
        setEditable(false);
        setSelectedCategory(null);

        setCategoryName(name);
        setCategoryType(type);
    };

    const updateCategoryData = () => {
        // Update category logic here
        dispatch(updateCategory({ id, name: categoryName, type: categoryType }));
    };

    const handleCategoryDelete = () => {
        // Delete category logic here
        dispatch(deleteCategory(id));
    };

    const editButtons = () => {
        return (
            <div className={styles.formButtons}>
                {editable ? (
                    <>
                        <button className={styles.categoryBtn} onClick={handleEditConfirm}>
                            <AiOutlineCheckCircle
                                className={styles.confirmIcon}
                            />
                        </button>
                        <button className={styles.categoryBtn} onClick={handleCancelEdit}>
                            <AiOutlineCloseCircle
                                className={styles.closeIcon}
                            />
                        </button>
                    </>
                ) : (
                    <>
                        <button className={styles.categoryBtn} onClick={handleEditButtonClicked}>
                            {editIcon({ width: '22px', height: '22px' })}
                        </button>
                        <button className={styles.categoryBtn} onClick={handleCategoryDelete}>
                            {deleteIcon()}
                        </button>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className={classes}>
            <div className={styles.formOverlay} onClick={handleClickOutside}>
                <div
                    className={styles.formContainer}
                    onClick={(e) => e.stopPropagation()}
                >
                        <div className={styles.formName}>
                            {editable ? (
                                <TextInput content={categoryName} setContent={setCategoryName} className={styles.formNameInput}/>
                            ) : (
                                categoryName
                            )}
                        </div>
                        <div className={styles.formType}>
                            {editable ? (
                                <CategoryTypeInput type={categoryType} setType={setCategoryType} />
                            ) : (
                                categoryType
                            )}
                        </div>
                        <div className={`${styles.formIcon} ${styles[color]}`}></div>
                            {editable ? (
                                <ColorInput color={categoryColor} setColor={setCategoryColor} />
                            ) : (
                                categoryIcon
                            )}
                        <div>Informations</div>
                    <div className={styles.categoryActions}>
                        {editButtons()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
