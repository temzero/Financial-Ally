import styles from './Category.module.scss';
import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import TextInput from '../FormInput/TextInput';
import ColorSelectionInput from '../FormInput/ColorSelectionInput';
import IconInput from '../FormInput/IconInput';
import CategoryTypeInput from '../FormInput/CategoryTypeInput';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getCategories } from '../../redux/actions';
import CategoryItems from './CategoryItems';

function Categories() {
    const user = useSelector((state) => state.user.user);
    const userId = user._id;
    const categories = useSelector((state) => state.category.categories) || [];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories(userId));
    }, [userId, dispatch]);

    const [categoryName, setCategoryName] = useState('');
    const [categoryType, setCategoryType] = useState('');
    const [categoryIcon, setCategoryIcon] = useState('');
    const [categoryColor, setCategoryColor] = useState('');

    const handleAddCategory = () => {
        const categoryData = {
            name: categoryName,
            type: categoryType,
            icon: categoryIcon,
            color: categoryColor,
            userId,
        };
        dispatch(addCategory(categoryData));
    };

    const incomeCategories = categories.filter(category => category.type === 'Income');
    const expenseCategories = categories.filter(category => category.type === 'Expense');

    return (
        <div>
            <div className={styles.userCategory}>
                <div className={styles.categoryTitle}>
                    Create New Category
                    <Button
                        onClick={handleAddCategory}
                        className={styles.categoryButton}
                        disabled={!categoryName || !categoryType || !categoryIcon || !categoryColor}
                    >
                        Add Category
                    </Button>
                </div>
                <div className={styles.categoryForm}>
                    <div className={styles.categoryInput}>
                        Name
                        <TextInput
                            className={styles.categoryNameInput}
                            content={categoryName}
                            setContent={setCategoryName}
                            placeholder="Enter category name"
                        />
                    </div>
                    <div className={styles.categoryInput}>
                        Type
                        <CategoryTypeInput
                            className={styles.categoryTypeInput}
                            type={categoryType}
                            setType={setCategoryType}
                        />
                    </div>
                    <div className={styles.categoryInput}>
                        Icon
                        <IconInput
                            className={`${styles.categoryIconInput} ${styles[categoryColor]}`}
                            icon={categoryIcon}
                            setIcon={setCategoryIcon}
                        />
                    </div>
                    <div className={styles.categoryInput}>
                        Color
                        <ColorSelectionInput
                            className={styles.categoryIconInput}
                            color={categoryColor}
                            setColor={setCategoryColor}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.userCategory}>
                <div className={styles.categoryTitle}>Categories</div>
                <div className={styles.categoryHeader}>Income</div>
                {incomeCategories.map((category, index) => (
                    <CategoryItems
                        key={category._id}
                        category={category}
                        index={index}
                        categories={incomeCategories}
                    />
                ))}
                <div className={styles.categoryHeader}>Expense</div>
                {expenseCategories.map((category, index) => (
                    <CategoryItems
                        key={category._id}
                        category={category}
                        index={index}
                        categories={expenseCategories}
                    />
                ))}
            </div>
        </div>
    );
}

export default Categories;

