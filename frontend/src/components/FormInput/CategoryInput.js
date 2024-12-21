import styles from './FormInput.module.scss';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import reactIcons from '../../assets/icons/reactIcons';
import { getCategories } from '../../redux/actions';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import useClickOutside from '../ClickOutside/useClickOutside';

const CategoryInput = ({
    category = {},
    setCategory,
    categoryType,
    className,
    isFocusOutside = false,
    setIsFocusOutside = () => {}, 
}) => {
    const user = useSelector((state) => state.user.user);
    const categories = useSelector((state) => state.category.categories);
    const Overlay = useSelector((state) => state.state.isOverlay);
    const userId = user._id;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories(userId));
    }, [userId, dispatch]);

    const [counter, setCounter] = useState(0);
    const dropdownRef = useRef(null);
    const optionRefs = useRef([]);

    useClickOutside(dropdownRef, () => setIsFocusOutside(false));

    // Function to filter categories and add "Other"
    const categoriesByType = useCallback(() => {
        const filteredCategories = categoryType
            ? categories.filter((cat) => cat.type === categoryType)
            : categories;

        const otherCategory = { _id: 'other', name: 'Other', type: '', icon: 'Other' };
        const isOtherIncluded = filteredCategories.some(
            (cat) => cat.name === otherCategory.name
        );

        return isOtherIncluded
            ? filteredCategories
            : [...filteredCategories, otherCategory];
    }, [categories, categoryType]);

    useEffect(() => {
        if (isFocusOutside) {
            if (Overlay) return; 
            const handleKeyDown = (event) => {
                const options = categoriesByType();

                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setCounter(
                        (prev) => (prev - 1 + options.length) % options.length
                    );
                } else if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setCounter((prev) => (prev + 1) % options.length);
                } else if (event.key === 'Enter') {
                    event.preventDefault();
                    const selectedCategory = options[counter];
                    if (selectedCategory) {
                        setCategory(selectedCategory);
                        setIsFocusOutside(false);
                    }
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isFocusOutside, counter, categoriesByType, setCategory, setIsFocusOutside]);

    // Scroll to the currently selected option
    useEffect(() => {
        if (isFocusOutside && optionRefs.current[counter]) {
            optionRefs.current[counter].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [counter, isFocusOutside]);

    const getCategoryIcon = (categoryId) => {
        const category = categories.find((cat) => cat._id === categoryId);
        const categoryIconName = category?.icon || '?';

        const matchedItem = reactIcons.find(
            (item) => item.name === categoryIconName
        );

        return matchedItem ? (
            <span className={styles.formIcon}>{matchedItem.icon}</span>
        ) : null;
    };

    const handleOptionSelect = (category) => {
        setCategory(category);
        setIsFocusOutside(false);
    };

    return (
        <div
            className={`${styles.customDropdown} ${className || ''}`}
            ref={dropdownRef}
        >
            <div
                className={styles.dropdownHeader}
                onClick={() => setIsFocusOutside((prev) => !prev)}
            >
                {!category ? (
                    <div className={`${styles.selectedElement} ${styles.placeholder}`}>
                        {categories.length === 0 ? 'No categories available' : 'Select category'}
                    </div>
                ) : (
                    <div className={styles.selectedElement}>
                        {getCategoryIcon(category._id)} {category.name}
                    </div>
                )}
                <span className={styles.arrow}>
                    {categories.length === 0 ? '' : isFocusOutside ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    
                </span>
            </div>
            {isFocusOutside && categories.length > 0 && (
                <div className={styles.dropdownList}>
                    {categoriesByType().map((cat, index) => (
                        <div
                            key={cat.id || cat.name}
                            ref={(el) => (optionRefs.current[index] = el)}
                            className={`${styles.dropdownItem} ${
                                counter === index ? styles.active : ''
                            }`}
                            onClick={() => handleOptionSelect(cat)}
                        >
                            <div className={styles.iconAndName}>
                                {getCategoryIcon(cat._id)}
                                {cat.name}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryInput;
