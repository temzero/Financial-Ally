import styles from './Profile.module.scss';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import TextInput from '../../components/FormInput/TextInput';
import ColorSelectionInput from '../../components/FormInput/ColorSelectionInput';
import IconInput from '../../components/FormInput/IconInput';
import CategoryTypeInput from '../../components/FormInput/CategoryTypeInput';


function Category() {
    const [categoryName, setCategoryName] = useState('')
    const [categoryType, setCategoryType] = useState('')
    const [categoryIcon, setCategoryIcon] = useState('')
    const [categoryColor, setCategoryColor] = useState('')

    return (
        <div>
            <div className={styles.userCategory}>
                <div className={styles.bodyHeader}>
                    Create New Category
                    <Button s disabled={!categoryName || !categoryType || !categoryIcon || !categoryColor}>
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
                <div className={styles.bodyHeader}>Categories</div>
                <div className={styles.categoryHeader}>Income</div>
                <div className={styles.categoryHeader}>Expense</div>
            </div>
        </div>
    );
}

export default Category;
