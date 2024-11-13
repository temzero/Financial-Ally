import styles from './Category.module.scss';
import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import TextInput from '../FormInput/TextInput';
import ColorSelectionInput from '../FormInput/ColorSelectionInput';
import IconInput from '../FormInput/IconInput';
import CategoryTypeInput from '../FormInput/CategoryTypeInput';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getCategories } from '../../redux/actions';
import { editIcon, deleteIcon } from '../../assets/icons/icons';


function Category() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const userId = user._id
    const categories = useSelector((state) => state.category.categories) || [];

    useEffect(() => {
        dispatch(getCategories(userId))
    }, [userId, dispatch])

    const [categoryName, setCategoryName] = useState('')
    const [categoryType, setCategoryType] = useState('')
    const [categoryIcon, setCategoryIcon] = useState('')
    const [categoryColor, setCategoryColor] = useState('')

    
    const handleAddCategory = () => {
        const categoryData = {
            name: categoryName,
            type: categoryType,
            icon: categoryIcon,
            color: categoryColor,
            userId,
        }
        // console.log('CategoryData: ', categoryData);
        dispatch(addCategory(categoryData))
    }

    const incomeCategories = categories.filter(category => category.type === 'Income')
    const expenseCategories = categories.filter(category => category.type === 'Expense')

    const renderCategories = (categories) => {
        return categories.map((category) => {
            return (
                <div className={styles.category} key={category._id}>
                    <div className={styles.categoryName}>
                        <div className={`${styles.categoryIcon} ${styles[category.color]}`}>{category.icon}</div>
                        <div>{category.name}</div>
                    </div>
                    <div className={styles.categoryInfo}>Info</div>
                    <div className={styles.categoryButtons}>
                        {editIcon({ width: '21px', height: '21px' })}
                        {deleteIcon()}
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            <div className={styles.userCategory}>
                <div className={styles.categoryTitle}>
                    Create New Category
                    <Button onClick={handleAddCategory} s className={styles.categoryButton} disabled={!categoryName || !categoryType || !categoryIcon || !categoryColor}>
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
                            placeholder='Enter category name'
                        ></TextInput>
                    </div>
                    <div className={styles.categoryInput}>
                        Type
                        <CategoryTypeInput
                            className={styles.categoryTypeInput}
                            type={categoryType}
                            setType={setCategoryType}
                        ></CategoryTypeInput>
                    </div>
                    <div className={styles.categoryInput}>
                        Icon
                        <IconInput 
                            className={styles.categoryIconInput}
                            icon={categoryIcon}
                            setIcon={setCategoryIcon}
                        >

                        </IconInput>
                    </div>
                    <div className={styles.categoryInput}>
                        Color
                        <ColorSelectionInput 
                            className={styles.categoryIconInput}
                            color={categoryColor}
                            setColor={setCategoryColor}
                        >

                        </ColorSelectionInput>
                    </div>
                </div>
            </div>
            <div className={styles.userCategory}>
                <div className={styles.categoryTitle}>Categories</div>
                <div className={styles.categoryHeader}>Income</div>
                 {renderCategories(incomeCategories)}
                <div className={styles.categoryHeader}>Expense</div>
                 {renderCategories(expenseCategories)}
            </div>
        </div>
    );
}

export default Category;
