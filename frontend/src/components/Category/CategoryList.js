import styles from './Category.module.scss';
import { useState, useEffect, useRef } from 'react';
import { editIcon, deleteIcon } from '../../assets/icons/icons';
import { updateCategory } from '../../redux/actions';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import IconInput from '../FormInput/IconInput';
import ColorSelectionInput from '../FormInput/ColorSelectionInput';
import TextInput from '../FormInput/TextInput';
import CategoryTypeInput from '../FormInput/CategoryTypeInput';
import DeleteCategoryForm from '../DeleteForm/DeleteCategoryForm';
import iconItems from '../../assets/icons/reactIcons';
import useClickOutside from '../ClickOutside/useClickOutside';
import { AiOutlineQuestion } from "react-icons/ai";


function CategoryList({ category, index, categories, currency = '$' }) {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transaction.transactions) || [];
    const transactionRef = useRef(null)

    const {_id, name, type, icon, color } = category;
    
    const [editable, setEditable] = useState(false);
    const [categoryId, setCategoryId] = useState(_id);
    const [categoryName, setCategoryName] = useState(name);
    const [categoryType, setCategoryType] = useState(type);
    const [plusOrMinus, setPlusOrMinus] = useState('');
    const [categoryIconName, setCategoryIconName] = useState(icon);
    const [categoryColor, setCategoryColor] = useState(color);

    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        setPlusOrMinus(categoryType.toLowerCase() === 'income' ? '+' : '-');
    }, [categoryType]);

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
        setEditable(false);
        setCategoryName(name);
        setCategoryType(type);
        setCategoryIconName(icon);
        setCategoryColor(color);
    };

    useClickOutside(transactionRef, handleCancelEdit)

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
        setSelectedCategory(category);
    };

    const editButtons = () => {
        return editable ? (
            <div className={styles.categoryButtonContainer}>
                <button
                    className={styles.categoryBtn}
                    onClick={handleEditConfirm}
                >
                    <AiOutlineCheckCircle className={`${styles.actionIcon} primary-green`} />
                </button>
                <button
                    className={styles.categoryBtn}
                    onClick={handleCancelEdit}
                >
                    <AiOutlineCloseCircle className={`${styles.actionIcon} primary-red`} />
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

    const totalTransactions = () => {
        const matchedTransactions = transactions.filter(trans => trans.categoryId === categoryId);
        const totalValue = matchedTransactions.reduce((sum, trans) => sum + trans.amount, 0);
    
        if (matchedTransactions.length === 0) return ``;
    
        const transactionText =
            matchedTransactions.length === 1
                ? `1 transaction`
                : `${matchedTransactions.length} transactions`;
    
        return (
            <div className={styles.categoryInfo}>
                <div className={styles.categoryInfoValue}>{`${plusOrMinus}${currency}${totalValue}`}</div>
                <div>{transactionText}</div>
            </div>
        );
    };

    return (
        <div className={categoryClass} key={category._id} ref={transactionRef}>
            <div className={styles.tableColumn1}>
                {editable ? (
                    <div className={styles.categoryIcon}>
                        <IconInput
                            icon={categoryIconName}
                            setIcon={setCategoryIconName}
                            className={`${styles.formIconInput} text-${categoryColor || 'defaultColor'}`}
                        />
                        <ColorSelectionInput
                            color={categoryColor}
                            setColor={setCategoryColor}
                        />
                    </div>
                ) : (
                    <div
                        className={`${styles.categoryIcon} text-${categoryColor || 'defaultColor'}`}
                    >
                        {categoryIcon}
                    </div>
                )}

                {editable ? (
                    <TextInput
                        className={styles.formNameInput}
                        content={categoryName}
                        setContent={setCategoryName}
                    />
                ) : (
                    <div className={`${styles.categoryName} text-${categoryColor || 'defaultColor'}`}>
                        {categoryName}
                    </div>
                )}
            </div>
            <div className={styles.tableColumn2}>
            {editable ? (
                <CategoryTypeInput
                    type={categoryType}
                    setType={setCategoryType}
                    className={styles.formTypeInput}
                />
            ) : (
                totalTransactions()
            )}
            </div>

            <div className={styles.tableColumn3}>        
                {editButtons()}
            </div>

            {selectedCategory && (
                <DeleteCategoryForm
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    hidden={!selectedCategory}
                />
            )}

        </div>
    );
}

export default CategoryList;
