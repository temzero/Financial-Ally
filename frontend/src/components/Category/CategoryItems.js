// CategoryItem.js
import styles from './Category.module.scss';
import { useState } from 'react';
import { editIcon, deleteIcon } from '../../assets/icons/icons';
import { updateCategory } from '../../redux/actions';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import IconInput from '../FormInput/IconInput';
import ColorSelectionInput from '../FormInput/ColorSelectionInput';
import TextInput from '../FormInput/TextInput';
import CategoryTypeInput from '../FormInput/CategoryTypeInput';
import DeleteCategoryForm from '../DeleteForm/DeleteCategoryForm';
import iconItems from '../../assets/icons/iconItems';
import { AiOutlineQuestion } from "react-icons/ai";


function CategoryItems({ category, index, categories }) {
    const dispatch = useDispatch();
    const [editable, setEditable] = useState(false);

    const { name, type, icon, color } = category;

    const [categoryName, setCategoryName] = useState(name);
    const [categoryType, setCategoryType] = useState(type);
    const [categoryIconName, setCategoryIconName] = useState(icon);
    const [categoryColor, setCategoryColor] = useState(color);

    const [selectedCategory, setSelectedCategory] = useState('');

    const isLast =
        type === 'Income'
            ? index === categories.filter((c) => c.type === 'Income').length - 1
            : index ===
              categories.filter((c) => c.type === 'Expense').length - 1;
    const categoryClass = `${styles.categoryItem} ${
        isLast ? styles[`last${type}`] : ''
    }`;

    const handleEditButtonClicked = (event) => {
        event.stopPropagation();
        setEditable(true);
    };

    const handleEditConfirm = (event) => {
        event.stopPropagation();
        setEditable(false);
        updateCategoryData();
    };

    const handleCancelEdit = (event) => {
        event.stopPropagation();
        setEditable(false);

        setCategoryName(name);
        setCategoryType(type);
    };

    const updateCategoryData = () => {
        // Update category logic here
        const categoryData = {
            name: categoryName,
            type: categoryType,
            icon: categoryIconName,
            color: categoryColor,
        };

        dispatch(updateCategory(category._id, categoryData));
    };

    const handleDeleteButtonClicked = () => {
        console.log('category: ', category);
        setSelectedCategory(category);
    };

    const editButtons = () => {
        return editable ? (
            <div className={styles.categoryButtonContainer}>
                <button
                    className={styles.categoryBtn}
                    onClick={handleEditConfirm}
                >
                    <AiOutlineCheckCircle className={styles.confirmIcon} />
                </button>
                <button
                    className={styles.categoryBtn}
                    onClick={handleCancelEdit}
                >
                    <AiOutlineCloseCircle className={styles.closeIcon} />
                </button>
            </div>
        ) : (
            <div className={styles.categoryButtonContainer}>
                <button
                    className={styles.categoryBtn}
                    onClick={handleEditButtonClicked}
                >
                    {editIcon({ width: '22px', height: '22px' })}
                </button>
                <button
                    className={styles.categoryBtn}
                    onClick={handleDeleteButtonClicked}
                >
                    {deleteIcon()}
                </button>
            </div>
        );
    };

    const categoryIcon = iconItems.find(item => item.name === categoryIconName)?.icon || <AiOutlineQuestion />;

    return (
        <div className={categoryClass} key={category._id}>
            {editable ? (
                <div className={styles.formIconColorInput}>
                    <IconInput
                        icon={categoryIconName}
                        setIcon={setCategoryIconName}
                        className={styles[categoryColor]}
                    />
                    <ColorSelectionInput
                        color={categoryColor}
                        setColor={setCategoryColor}
                    />
                </div>
            ) : (
                <div
                    className={`${styles.categoryIcon} ${
                        styles[category.color]
                    }`}
                >
                    {categoryIcon}
                </div>
            )}

            {editable ? (
                <TextInput
                    content={categoryName}
                    setContent={setCategoryName}
                    className={styles.formNameInput}
                />
            ) : (
                <div className={`${styles.categoryName} ${
                    styles[category.color]
                }`}>{categoryName}</div>
            )}

            {editable ? (
                <CategoryTypeInput
                    type={categoryType}
                    setType={setCategoryType}
                    className={styles.formTypeInput}
                />
            ) : (
                <div className={styles.categoryInfo}>Info</div>
            )}

            {editButtons()}

            <DeleteCategoryForm
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                hidden={!selectedCategory}
            />
        </div>
    );
}

export default CategoryItems;
