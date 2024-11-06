// import { useEffect, useRef, useState } from 'react';
// import styles from './Budget.module.scss';

// function WalletDropdown({ allWallets, selectedWallets, setSelectedWallets }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedWalletNames, setSelectedWalletNames] = useState([])
//     const walletDisplayNames = selectedWallets.map(wallet => wallet.name) || [];
    
//     console.log('selected wallets: ',selectedWallets)
//     const dropdownRef = useRef(null);

//     const toggleDropdown = () => setIsOpen(!isOpen);

//     const handleCheckboxChange = (wallet) => {
//         if (selectedWallets.includes(wallet)) {
//             setSelectedWallets(selectedWallets.filter((selectedWallet) => selectedWallet !== wallet));
//         } else {
//             setSelectedWallets([...selectedWallets, wallet]);
//             setSelectedWalletNames(walletDisplayNames)
//         }
//     };

//     const handleAllWalletsChange = () => {
//         if (selectedWallets.length === allWallets.length) {
//             setSelectedWallets([]); // Uncheck all
//         } else {
//             setSelectedWallets(allWallets.map(wallet => wallet._id));
//             setSelectedWalletNames(allWallets.map(wallet => wallet.name))
//         }
//     };

//     // Close the dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };
        
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [dropdownRef]);

//     return (
//         <div className={styles.dropdownContainer} ref={dropdownRef}>
//             <h2 className={styles.formLabel}>Wallet</h2>
//             <div
//                 className={`${styles.dropdownHeader} ${styles.formInput}`}
//                 onClick={toggleDropdown}
//             >
//                 {/* {selectedWallets.length > 0 ? selectedWallets.join(', ') : 'All Wallets'} */}
//                 {selectedWalletNames.length > 0 ? selectedWalletNames.join(', ') : 'All Wallets'}
//             </div>
//             {isOpen && (
//                 <div className={styles.dropdownList}>
//                     <label className={styles.checkboxLabel}>
//                         <input
//                             type="checkbox"
//                             checked={selectedWallets.length === allWallets.length}
//                             onChange={handleAllWalletsChange}
//                         />
//                         All Wallets
//                     </label>
//                     {allWallets.map((wallet) => (
//                         <label key={wallet._id} className={styles.checkboxLabel}>
//                             <input
//                                 type="checkbox"
//                                 checked={selectedWallets.includes(wallet)}
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

// export default WalletDropdown;

import { useEffect, useRef, useState } from 'react';
import styles from './Budget.module.scss';

function WalletDropdown({ allWallets, selectedWallets, setSelectedWallets }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedWalletNames, setSelectedWalletNames] = useState([]);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

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
        if (selectedWallets.length === allWallets.length) {
            setSelectedWallets([]); // Uncheck all
        } else {
            setSelectedWallets(allWallets); // Select all
        }
    };

    // Update `selectedWalletNames` whenever `selectedWallets` changes
    useEffect(() => {
        setSelectedWalletNames(selectedWallets.map(wallet => wallet.name));
    }, [selectedWallets]);

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <h2 className={styles.formLabel}>Wallet</h2>
            <div
                className={`${styles.dropdownHeader} ${styles.formInput}`}
                onClick={toggleDropdown}
            >
                {selectedWalletNames.length > 0 ? selectedWalletNames.join(', ') : 'All Wallets'}
            </div>
            {isOpen && (
                <div className={styles.dropdownList}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={selectedWallets.length === allWallets.length}
                            onChange={handleAllWalletsChange}
                        />
                        All Wallets
                    </label>
                    {allWallets.map((wallet) => (
                        <label key={wallet._id} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectedWallets.some(
                                    (selectedWallet) => selectedWallet._id === wallet._id
                                )}
                                onChange={() => handleCheckboxChange(wallet)}
                            />
                            {wallet.name}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WalletDropdown;

