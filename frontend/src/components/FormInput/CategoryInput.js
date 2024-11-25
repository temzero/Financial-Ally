import styles from './FormInput.module.scss';
import { useEffect, useState, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/actions';
import iconItems from '../../assets/icons/reactIcons';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useClickOutSide from '../ClickOutSide/useClickOutSide';

const CategoryInput = forwardRef(({ categoryName, setCategoryName, categoryType, className }, ref) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useClickOutSide(() => setIsDropdownOpen(false));

    const categories = useSelector((state) => state.category.categories);
    const userId = useSelector((state) => state.user.user._id);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories(userId));
        if (!categoryName) {
            setCategoryName('Other');
        }

        const handleKeyDown = (event) => {
            if (event.key === 'c') {
                setIsDropdownOpen(!isDropdownOpen); 
            } 
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
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
        const categoryIconName = category ? category.icon : '?';

        const matchedItem = iconItems.find((item) => item.name === categoryIconName);

        if (!matchedItem) return null;

        return (
            <span className={styles.formIcon}>
                {matchedItem?.icon}
            </span>
        );
    };

    return (
        <div className={`${styles.customDropdown} ${className || ''}`} ref={dropdownRef}>
            <div
                className={styles.dropdownHeader}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <div className={styles.selectedCategory}>
                    {getCategoryIcon(categoryName)}
                    {categoryName}
                </div>
                <span className={styles.arrow}>
                    {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
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
});

export default CategoryInput;
