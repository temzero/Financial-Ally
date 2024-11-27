// import styles from './FormInput.module.scss';
// import { useState, useEffect } from "react";
// import { useSelector } from 'react-redux';
// import { IoWalletOutline } from "react-icons/io5";
// import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
// import useClickOutSide from '../ClickOutSide/useClickOutSide';

// const WalletInput = ({ wallet, setWallet, isDropdownOutside }) => {
//     const wallets = useSelector((state) => state.wallet.wallets);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const dropdownRef = useClickOutSide(() => setIsDropdownOpen(false));

//     useEffect(() => {
//         setIsDropdownOpen((prev) => !prev); 
//     }, [isDropdownOutside]);

//     const handleOptionSelect = (wallet) => {
//         setWallet(wallet);
//         setIsDropdownOpen(false);
//     };

//     return (
//         <div className={styles.customDropdown} ref={dropdownRef}>
//             <div
//                 className={styles.dropdownHeader}
//                 onClick={() => setIsDropdownOpen((prev) => !prev)}
//             >
//                 {wallet ? (
//                     <div className={styles.selectedWallet}>
//                         <IoWalletOutline className={styles.walletIcon} />
//                         {wallet.name}
//                     </div>
//                 ) : (
//                     <div className={styles.placeholder}>
//                         {wallets.length === 0 ? 'No wallets available' : 'Select a wallet'}
//                     </div>
//                 )}
//                 <span className={styles.arrow}>
//                     {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
//                 </span>
//             </div>
//             {isDropdownOpen && wallets.length > 0 && (
//                 <div className={styles.dropdownList}>
//                     {wallets.map((walletItem) => (
//                         <div
//                             key={walletItem._id}
//                             className={styles.dropdownItem}
//                             onClick={() => handleOptionSelect(walletItem)}
//                         >
//                             <IoWalletOutline className={styles.walletIcon} />
//                             {walletItem.name}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default WalletInput;

import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IoWalletOutline } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useClickOutSide from "../ClickOutSide/useClickOutSide";
import styles from "./FormInput.module.scss";

const WalletInput = ({ wallet, setWallet, isDropdownOutside }) => {
    const wallets = useSelector((state) => state.wallet.wallets);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [counter, setCounter] = useState(0);
    const dropdownRef = useClickOutSide(() => setIsDropdownOpen(false));
    const optionRefs = useRef([]);

    useEffect(() => {
        setIsDropdownOpen(isDropdownOutside);
    }, [isDropdownOutside]);

    useEffect(() => {
        if (isDropdownOpen) {
            const handleKeyDown = (event) => {
                if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setCounter((prevCounter) =>
                        (prevCounter - 1 + wallets.length) % wallets.length
                    );
                } else if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setCounter((prevCounter) =>
                        (prevCounter + 1) % wallets.length
                    );
                } else if (event.key === "Enter") {
                    event.preventDefault();
                    if (wallets[counter]) {
                        setWallet(wallets[counter]);
                        setIsDropdownOpen(false);
                    }
                }
            };

            window.addEventListener("keydown", handleKeyDown);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isDropdownOpen, counter, wallets, setWallet]);

    // Auto-scroll to the active option
    useEffect(() => {
        if (isDropdownOpen && optionRefs.current[counter]) {
            optionRefs.current[counter].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [counter, isDropdownOpen]);

    const handleOptionSelect = (walletItem) => {
        setWallet(walletItem);
        setIsDropdownOpen(false);
    };

    return (
        <div className={styles.customDropdown} ref={dropdownRef}>
            <div
                className={styles.dropdownHeader}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
                {wallet ? (
                    <div className={styles.selectedWallet}>
                        <IoWalletOutline className={styles.walletIcon} />
                        {wallet.name}
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        {wallets.length === 0 ? "No wallets available" : "Select a wallet"}
                    </div>
                )}
                <span className={styles.arrow}>
                    {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {isDropdownOpen && wallets.length > 0 && (
                <div className={styles.dropdownList}>
                    {wallets.map((walletItem, index) => (
                        <div
                            key={walletItem._id}
                            ref={(el) => (optionRefs.current[index] = el)}
                            className={`${styles.dropdownItem} ${
                                counter === index ? styles.active : ""
                            }`}
                            onClick={() => handleOptionSelect(walletItem)}
                        >
                            <IoWalletOutline className={styles.walletIcon} />
                            {walletItem.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WalletInput;
