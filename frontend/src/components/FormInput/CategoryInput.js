import styles from './FormInput.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../redux/actions';

function CategoryInput({category = 'Other', setCategory, className}) {
    
    const categories = useSelector((state) => state.category.categories);
    const userId = useSelector((state) => state.user.user._id);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories(userId))
        setCategory('Other')
    }, [userId, setCategory, dispatch])
        
    return ( 
        <select
            className={`${styles.formInputOptions} ${className || ''}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >
            <option value="Other">Other</option>
            {/* <option value="Food">Food</option>
            <option value="Fashion">Fashion</option>
            <option value="Arcade">Arcade</option>
            <option value="Grocery">Grocery</option>
            <option value="Salary">Salary</option> */}
            {categories.map((category, index) => (
                <option key={category.id || index} value={category.name}>
                    {category.name}
                </option>
                ))}
        </select>
     );
}

export default CategoryInput;