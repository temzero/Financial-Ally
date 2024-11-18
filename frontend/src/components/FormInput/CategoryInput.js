// import styles from './FormInput.module.scss';
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { getCategories } from '../../redux/actions';
// import iconItems from '../../assets/icons/iconItems';

// function CategoryInput({categoryName, setCategoryName, categoryType, className}) {
    
//     const categories = useSelector((state) => state.category.categories);
//     const userId = useSelector((state) => state.user.user._id);

//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(getCategories(userId))
//         if (!categoryName) {
//             setCategoryName('Other');
//         }
//     }, [userId, setCategoryName, categoryName, dispatch])

//     const categoriesByType = () => {
//         if(!categoryType) {
//             return categories
//         } else
//             return categories.filter(cat => cat.type === categoryType)
//     }

//     const categoryIcon = (name) => {
//         const category = categories.find((cat) => cat.name === name);
//         const categoryColor = category ? category.color : 'defaultColor';
//         const categoryIconName = category ? category.icon : '?';
    
//         const matchedItem = iconItems.find((item) => item.name === categoryIconName);
    
//         return (
//             <div className={`${styles.formIcon} ${styles[categoryColor]}`}>
//                 {matchedItem.icon}
//             </div>
//         );
//     };
        
//     return ( 
//         <select
//             className={`${styles.formInputOptions} ${className || ''}`}
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//         >
//             <option value="Other">Other</option>

//             {categoriesByType().map((cat, index) => (
//                 // <option key={cat.id || index} value={cat.name} className={styles[`${cat.color}Text`]}>
//                 <option key={cat.id || index} value={cat.name}>
//                      {`${cat.name}`} 
//                 </option>
//                 ))}
//         </select>
//      );
// }

// export default CategoryInput;

import styles from './FormInput.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCategories } from '../../redux/actions';
import iconItems from '../../assets/icons/iconItems';

function CategoryInput({ categoryName, setCategoryName, categoryType, className }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const categories = useSelector((state) => state.category.categories);
    const userId = useSelector((state) => state.user.user._id);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories(userId));
        if (!categoryName) {
            setCategoryName('Other');
        }
    }, [userId, setCategoryName, categoryName, dispatch]);

    const categoriesByType = () => {
        if (!categoryType) {
            return categories;
        } else {
            return categories.filter((cat) => cat.type === categoryType);
        }
    };

    const getCategoryIcon = (name) => {
        const category = categories.find((cat) => cat.name === name);
        const categoryColor = category ? category.color : 'defaultColor';
        const categoryIconName = category ? category.icon : '?';

        const matchedItem = iconItems.find((item) => item.name === categoryIconName);

        return (
            <span className={`${styles.formIcon} ${styles[categoryColor]}`}>
                {matchedItem?.icon || '?'}
            </span>
        );
    };

    return (
        <div className={`${styles.customDropdown} ${className || ''}`}>
            <div
                className={styles.dropdownHeader}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <div className={styles.selectedCategory}>
                    {getCategoryIcon(categoryName)}
                    {categoryName}
                </div>
                <span className={styles.arrow}>{isDropdownOpen ? '▲' : '▼'}</span>
            </div>
            {isDropdownOpen && (
                <div className={styles.dropdownList}>
                    <div
                        className={styles.dropdownItem}
                        onClick={() => {
                            setCategoryName('Other');
                            setIsDropdownOpen(false);
                        }}
                    >
                        <div className={styles.iconAndName}>
                            {getCategoryIcon('Other')}
                            Other
                        </div>
                    </div>
                    {categoriesByType().map((cat) => (
                        <div
                            key={cat.id || cat.name}
                            className={styles.dropdownItem}
                            onClick={() => {
                                setCategoryName(cat.name);
                                setIsDropdownOpen(false);
                            }}
                        >
                            <div className={styles.iconAndName}>
                                {getCategoryIcon(cat.name)}
                                {cat.name}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryInput;
