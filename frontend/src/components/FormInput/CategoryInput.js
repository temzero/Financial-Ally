import styles from './FormInput.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../redux/actions';
import iconItems from '../../assets/icons/iconItems';

function CategoryInput({categoryName, setCategoryName, className}) {
    
    const categories = useSelector((state) => state.category.categories);
    const userId = useSelector((state) => state.user.user._id);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories(userId))
        if (!categoryName) {
            setCategoryName('Other');
        }
    }, [userId, setCategoryName, categoryName, dispatch])


    const categoryIcon = (name) => {
        const category = categories.find((cat) => cat.name === name);
        const categoryColor = category ? category.color : 'defaultColor';
        const categoryIconName = category ? category.icon : '?';
    
        const matchedItem = iconItems.find((item) => item.name === categoryIconName);
        console.log('matchedItem', matchedItem.icon)
    
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

            {categories.map((cat, index) => (
                <option key={cat.id || index} value={cat.name}>
                     {`${categoryIcon(cat.name)} ${cat.name}`} 
                </option>
                ))}
        </select>
     );
}

export default CategoryInput;