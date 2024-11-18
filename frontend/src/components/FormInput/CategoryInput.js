import styles from './FormInput.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../redux/actions';
import iconItems from '../../assets/icons/iconItems';

function CategoryInput({categoryName, setCategoryName, categoryType, className}) {
    
    const categories = useSelector((state) => state.category.categories);
    const userId = useSelector((state) => state.user.user._id);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories(userId))
        if (!categoryName) {
            setCategoryName('Other');
        }
    }, [userId, setCategoryName, categoryName, dispatch])

    const categoriesByType = () => {
        if(!categoryType) {
            return categories
        } else
            return categories.filter(cat => cat.type === categoryType)
    }

    const categoryIcon = (name) => {
        const category = categories.find((cat) => cat.name === name);
        const categoryColor = category ? category.color : 'defaultColor';
        const categoryIconName = category ? category.icon : '?';
    
        const matchedItem = iconItems.find((item) => item.name === categoryIconName);
    
        return (
            <div className={`${styles.formIcon} ${styles[categoryColor]}`}>
                {matchedItem.icon}
            </div>
        );
    };
        
    return ( 
        <select
            className={`${styles.formInputOptions} ${className || ''}`}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
        >
            <option value="Other">Other</option>

            {categoriesByType().map((cat, index) => (
                <option key={cat.id || index} value={cat.name} className={styles[`${cat.color}Text`]}>
                     {`${cat.name}`} 
                </option>
                ))}
        </select>
     );
}

export default CategoryInput;