import styles from './FormInput.module.scss';
import { useSelector } from 'react-redux';

function CategoryInput({category, setCategory, className}) {

    const categories = useSelector((state) => state.category.categories);

    return ( 
        <select
            className={`${styles.formInputOptions} ${className || ''}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >
            {/* <option value="Others">Others</option>
            <option value="Food">Food</option>
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