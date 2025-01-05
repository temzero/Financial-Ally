import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { updateUser, getUser } from '../../redux/actions';
import styles from './Profile.module.scss';
import Button from '../../components/Button/Button';
import TextInput from '../../components/FormInput/TextInput';
import PasswordInput from '../../components/FormInput/PasswordInput';
import EmailInput from '../../components/FormInput/EmailInput';
import Category from '../../components/Category/Category';
import useClickOutside from '../../components/ClickOutside/useClickOutside';

function Profile() {
    const currentUser = useSelector((state) => state.user.user);
    const userRef =  useRef(null)
    const dispatch = useDispatch();

    const { firstName, lastName, email, password, createdAt } = currentUser;

    const [editable, setEditable] = useState(false);
    const [userFirstName, setUserFirstName] = useState(firstName);
    const [userLastName, setUserLastName] = useState(lastName);
    const [userEmail, setUserEmail] = useState(email);
    const [userPassword, setUserPassword] = useState(password);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        dispatch(getUser(currentUser._id));
    }, [currentUser._id, dispatch]);

    useEffect(() => {
        setUserFirstName(firstName);
        setUserLastName(lastName);
        setUserEmail(email);
        setUserPassword(password);
    }, [firstName, lastName, email, password]);

    useEffect(() => {
        setIsChanged(
            userFirstName !== firstName ||
            userLastName !== lastName ||
            userEmail !== email ||
            userPassword !== password
        );
    }, [userFirstName, userLastName, userEmail, userPassword, firstName, lastName, email, password]);

    const handleEditButtonClick = () => {
        setEditable(true);
    };

    const handleCancelEdit = () => {
        setEditable(false);
        setUserFirstName(firstName);
        setUserLastName(lastName);
        setUserEmail(email);
        setUserPassword(password);
    };

    const handleEditSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    
        if (!emailRegex.test(userEmail)) {
            alert('Invalid email address. Please enter a valid email (name@email.com).');
            return;
        }
    
        const userUpdateData = {
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            password: userPassword,
        };
    
        dispatch(updateUser(currentUser._id, userUpdateData));
        setEditable(false);
        alert('Profile saved!');
    };

    useClickOutside(userRef, handleCancelEdit);

    const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const timeDifference = new Date() - new Date(createdAt);; // Difference in milliseconds
    const joinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

    const greeting = () => {
        const currentHour = new Date().getHours();
        let message = 'Hello';

        if (currentHour >= 5 && currentHour < 12) message = 'Good Morning';
        if (currentHour >= 12 && currentHour < 17) message = 'Good Afternoon';
        if (currentHour >= 17 && currentHour < 21) message = 'Good Evening';

        return <div className={styles.greeting}>{message} {firstName}!</div>;
    };

    return (
        <div className={styles.container}>
            <h2 className='header-section'>
                <div className='page-title'>Profile</div>
            </h2>
            <div className={styles.innerContainer}>
                <div className={styles.userProfile} ref={userRef}>
                    <div className='header-section'>
                        {greeting()}
                        {editable ? (
                            <div className={styles.buttonContainer}>
                                <Button
                                    s
                                    onClick={handleEditSubmit}
                                    disabled={!isChanged}
                                >
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
                                        <EmailInput
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
                                        <PasswordInput
                                            content={userPassword}
                                            setContent={setUserPassword}
                                            className={styles.textInput}
                                        />
                                    ) : (
                                        '*'.repeat(userPassword.length)
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Category />
            </div>
            <div className={styles.date}>
                Join in {formattedDate} ({joinDays} days)
            </div>
        </div>
    );
}

export default Profile;
