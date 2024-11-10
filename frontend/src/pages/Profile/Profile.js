import { useSelector } from 'react-redux';
import styles from './Profile.module.scss';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import TextInput from '../../components/FormInput/TextInput';
import TypeInput from '../../components/FormInput/TypeInput';

function Profile() {
    const currentUser = useSelector((state) => state.user);

    const { firstName, lastName, email, password, createdAt } = currentUser;

    const [editable, setEditable] = useState(false);
    const [userFirstName, setUserFirstName] = useState(firstName);
    const [userLastName, setUserLastName] = useState(lastName);
    const [userEmail, setUserEmail] = useState(email);
    const [userPassword, setUserPassword] = useState(password);

    const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const greeting = () => {
        const currentHour = new Date().getHours();
        let message = 'Hello'
    
        if (currentHour >= 5 && currentHour < 12) {
            message = 'Good Morning'
        }
        if (currentHour >= 12 && currentHour < 17) {
            message = 'Good Afternoon'
        }
        if (currentHour >= 17 && currentHour < 21) {
            message = 'Good Evening'
        }
        
        return <div className={styles.greeting}>{message} {firstName} {lastName}</div>; // Default message for late night hours
    };

    const start = new Date(createdAt);
    const now = new Date();
    const period = Math.ceil(Math.abs((now - start) / (1000 * 60 * 60 * 24)));

    const handleEditButtonClick = function () {
        setEditable(true);
    };

    const handleCancelEdit = function () {
        setEditable(false);
        setUserFirstName(firstName)
        setUserLastName(lastName)
        setUserEmail(email)
        setUserPassword(password)
    };

    const handleEditSubmit = function () {};

    const handleChangePassword = function () {};

    const isCategoryFormFilled = () => {

    }

    return (
        <div className={styles.container}>
                <h2 className={styles.header}>
                    <div className={styles.title}>Profile</div>
                </h2>

            <div className={styles.innerContainer}>
                <div className={styles.userProfile}>
                    <div className={styles.bodyHeader}>
                        {greeting()}
                        {editable ? (
                            <div className={styles.buttonContainer}>
                                <Button s onClick={handleEditButtonClick}>
                                    Save
                                </Button>
                                <Button s onClick={handleCancelEdit}>
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <div className={styles.buttonContainer}>
                                <Button s onClick={handleEditButtonClick}>
                                    Edit Profile
                                </Button>
                            </div>
                        )}
                    </div>
                    <table className={styles.infoTable}>
                        <tbody>
                            <tr>
                                <td className={styles.label}>First Name:</td>
                                <td className={styles.info}>
                                    {editable ? (
                                        <TextInput
                                            content={userFirstName}
                                            setContent={setUserFirstName}
                                            className={styles.textInput}
                                        />
                                    ) : (
                                        userFirstName
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}>Last Name:</td>
                                <td className={styles.info}>
                                    {editable ? (
                                        <TextInput
                                            content={userLastName}
                                            setContent={setUserLastName}
                                            className={styles.textInput}
                                        />
                                    ) : (
                                        userLastName
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}>Email:</td>
                                <td className={styles.info}>
                                    {editable ? (
                                        <TextInput
                                            content={userEmail}
                                            setContent={setUserEmail}
                                            className={styles.textInput}
                                        />
                                    ) : (
                                        userEmail
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}>Password:</td>
                                <td className={styles.info}>
                                    {editable ? (
                                        <TextInput
                                            content={userPassword}
                                            setContent={setUserPassword}
                                            className={styles.textInput}
                                        />
                                    ) : (
                                        userPassword
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.userCategory}>
                    <div className={styles.bodyHeader}>
                        Create New Category
                        <Button s disabled={!isCategoryFormFilled()}>Add Category</Button>
                    </div>
                    <div className={styles.categoryForm}>
                        <div className={styles.categoryFormHeader}>Name</div>
                        <TextInput></TextInput>
                        <div className={styles.categoryFormHeader}>Type</div>
                        <TypeInput></TypeInput>
                        <div className={styles.categoryFormHeader}>Icon</div>
                        <div className={styles.categoryFormHeader}>Color</div>
                        
                    </div>

                </div>
                <div className={styles.userCategory}>
                    <div className={styles.bodyHeader}>Categories</div>
                    <div className={styles.categoryHeader}>Income</div>
                    <div className={styles.categoryHeader}>Expense</div>

                </div>
            </div>

            <div className={styles.date}>
                Join in {formattedDate} ({period} days)
            </div>
        </div>
    );
}

export default Profile;
