// import styles from './FormInput.module.scss'
// import { useEffect, useState } from 'react';
// import {IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
// import useClickOutSide from '../ClickOutSide/useClickOutSide';

// function WalletsInput({ wallets, selectedWallets, setSelectedWallets }) {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [selectedWalletNames, setSelectedWalletNames] = useState([]);
//     const dropdownRef = useClickOutSide(() => setIsDropdownOpen(false));

//     const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

//     const handleCheckboxChange = (wallet) => {
//         if (selectedWallets.some((selectedWallet) => selectedWallet._id === wallet._id)) {
//             setSelectedWallets(
//                 selectedWallets.filter((selectedWallet) => selectedWallet._id !== wallet._id)
//             );
//         } else {
//             setSelectedWallets([...selectedWallets, wallet]);
//         }
//     };

//     const handleAllWalletsChange = () => {
//         if (selectedWallets.length === wallets.length) {
//             setSelectedWallets([]); // Uncheck all
//         } else {
//             setSelectedWallets(wallets); // Select all
//         }
//     };

//     // Update `selectedWalletNames` whenever `selectedWallets` changes
//     useEffect(() => {
//         setSelectedWalletNames(selectedWallets.map(wallet => wallet.name));
//     }, [selectedWallets]);


//     const walletsDisplay = () => {
//         if (selectedWalletNames.length === 0 || selectedWalletNames.length === wallets.length) {
//             return 'All wallets'
//         } else
//         return selectedWalletNames.join(', ') 
//     }

//     return (
//         <div className={styles.dropdownContainer} ref={dropdownRef}>
//             <div
//                 className={`${styles.formInputOptions} ${styles.formInput}`}
//                 onClick={toggleDropdown}
//             >
                
//                 {walletsDisplay()}
//                 <span className={styles.arrow}>{isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
//             </div>
//             {isDropdownOpen && (
//                 <div className={styles.dropdownList}>
//                     <label className={styles.checkboxLabel}>
//                         <input
//                             type="checkbox"
//                             checked={selectedWallets.length === wallets.length}
//                             onChange={handleAllWalletsChange}
//                         />
//                         All Wallets
//                     </label>
//                     {wallets.map((wallet) => (
//                         <label key={wallet._id} className={styles.checkboxLabel}>
//                             <input
//                                 type="checkbox"
//                                 checked={selectedWallets.some(
//                                     (selectedWallet) => selectedWallet._id === wallet._id
//                                 )}
//                                 onChange={() => handleCheckboxChange(wallet)}
//                             />
//                             {wallet.name}
//                         </label>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default WalletsInput;

import styles from './FormInput.module.scss';
import { useEffect, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useClickOutSide from '../ClickOutSide/useClickOutSide';

function WalletsInput({ wallets, selectedWallets, setSelectedWallets, className }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedWalletNames, setSelectedWalletNames] = useState([]);
    const dropdownRef = useClickOutSide(() => setIsDropdownOpen(false));

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleCheckboxChange = (wallet) => {
        if (selectedWallets.some((selectedWallet) => selectedWallet._id === wallet._id)) {
            setSelectedWallets(
                selectedWallets.filter((selectedWallet) => selectedWallet._id !== wallet._id)
            );
        } else {
            setSelectedWallets([...selectedWallets, wallet]);
        }
    };

    const handleAllWalletsChange = () => {
        if (selectedWallets.length === wallets.length) {
            setSelectedWallets([]); // Uncheck all
        } else {
            setSelectedWallets(wallets); // Select all
        }
    };

    useEffect(() => {
        setSelectedWalletNames(selectedWallets.map((wallet) => wallet.name));
    }, [selectedWallets]);

    const walletsDisplay = () => {
        if (selectedWalletNames.length === 0 || selectedWalletNames.length === wallets.length) {
            return 'All wallets';
        } else {
            return selectedWalletNames.join(', ');
        }
    };

    return (
        <div className={`${styles.customDropdown} ${className || ''}`} ref={dropdownRef}>
            <div
                className={styles.dropdownHeader}
                onClick={toggleDropdown}
            >
                <div className={styles.selectedCategory}>
                    {walletsDisplay()}
                </div>
                <span className={styles.arrow}>
                    {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {isDropdownOpen && (
                <div className={styles.dropdownList}>
                    <div className={styles.dropdownItem}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectedWallets.length === wallets.length}
                                onChange={handleAllWalletsChange}
                            />
                            All Wallets
                        </label>
                    </div>
                    {wallets.map((wallet) => (
                        <div key={wallet._id} className={styles.dropdownItem}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={selectedWallets.some(
                                        (selectedWallet) => selectedWallet._id === wallet._id
                                    )}
                                    onChange={() => handleCheckboxChange(wallet)}
                                />
                                {wallet.name}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WalletsInput;
