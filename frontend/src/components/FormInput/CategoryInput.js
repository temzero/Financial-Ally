import styles from './FormInput.module.scss';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/actions';
import iconItems from '../../assets/icons/reactIcons';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import useClickOutSide from '../ClickOutSide/useClickOutSide';

const CategoryInput = ({
    categoryName,
    setCategoryName,
    categoryType,
    className,
    isDropdownOutside,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [counter, setCounter] = useState(0);
    const dropdownRef = useClickOutSide(() => setIsDropdownOpen(false));
    const optionRefs = useRef([]);

    const categories = useSelector((state) => state.category.categories);
    const userId = useSelector((state) => state.user.user._id);
    const dispatch = useDispatch();

    // Fetch categories on mount
    useEffect(() => {
        dispatch(getCategories(userId));
        if (!categoryName) {
            setCategoryName('Other');
        }
    }, [userId, dispatch, categoryName, setCategoryName]);

    // Toggle dropdown state based on external input
    useEffect(() => {
        setIsDropdownOpen(isDropdownOutside);
    }, [isDropdownOutside]);

    // Function to filter categories and add "Other"
    const categoriesByType = useCallback(() => {
        const filteredCategories = categoryType
            ? categories.filter((cat) => cat.type === categoryType)
            : categories;

        const otherCategory = { name: 'Other', type: '', icon: 'Other' };
        const isOtherIncluded = filteredCategories.some(
            (cat) => cat.name === otherCategory.name
        );

        return isOtherIncluded
            ? filteredCategories
            : [...filteredCategories, otherCategory];
    }, [categories, categoryType]);

    // Handle keyboard navigation and selection
    useEffect(() => {
        if (isDropdownOpen) {
            const handleKeyDown = (event) => {
                const options = categoriesByType();
                const maxCounter = options.length;

                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setCounter((prev) => (prev - 1 + maxCounter) % maxCounter); // Wrap-around
                } else if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setCounter((prev) => (prev + 1) % maxCounter); // Wrap-around
                } else if (event.key === 'Enter') {
                    event.preventDefault();
                    const selectedCategory = options[counter];
                    if (selectedCategory) {
                        setCategoryName(selectedCategory.name);
                        setIsDropdownOpen(false);
                    }
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isDropdownOpen, counter, categoriesByType, setCategoryName]);

    // Scroll to the currently selected option
    useEffect(() => {
        if (isDropdownOpen && optionRefs.current[counter]) {
            optionRefs.current[counter].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [counter, isDropdownOpen]);

    const getCategoryIcon = (name) => {
        const category = categories.find((cat) => cat.name === name);
        const categoryIconName = category?.icon || '?';

        const matchedItem = iconItems.find(
            (item) => item.name === categoryIconName
        );

        return matchedItem ? (
            <span className={styles.formIcon}>{matchedItem.icon}</span>
        ) : null;
    };

    return (
        <div
            className={`${styles.customDropdown} ${className || ''}`}
            ref={dropdownRef}
        >
            <div
                className={styles.dropdownHeader}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
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
                    {categoriesByType().map((cat, index) => (
                        <div
                            key={cat.id || cat.name}
                            ref={(el) => (optionRefs.current[index] = el)}
                            className={`${styles.dropdownItem} ${
                                index === counter ? styles.active : ''
                            }`}
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
};

export default CategoryInput;
