import { useState, useEffect, useRef } from 'react';
import styles from './FormInput.module.scss';
import { AiOutlineQuestion } from "react-icons/ai";
import {aceIcon, activityIcon, bankIcon, badmintonIcon, basketballIcon, basketball2Icon, beerIcon, bookIcon, boxIcon, cameraIcon, canIcon, cardIcon, cashIcon, cocktailIcon, coffeeIcon, controllerIcon, cutIcon, diamondIcon, diceIcon, dollarIcon, dollarCoinIcon, dollarCoin2Icon, dollarWastingIcon, dressIcon } from '../../assets/icons/icons';
    // fastFoodIcon, fireIcon, fishIcon, flashIcon, flowerIcon, flower2Icon, foodIcon, footballIcon, frappleIcon, gasIcon, gearIcon, giftIcon, goldIcon, golfIcon, groceryIcon, guitarIcon, hammerIcon, iceScreamIcon, iceScream2Icon, medicalIcon, moneyBagIcon, moneyBag2Icon, movieIcon, mugIcon, musicIcon, noodleIcon, paintingIcon, paperPlaneIcon, phoneIcon, pillIcon, pill2Icon, planeIcon, poolIcon, reactIcon, salonIcon, savingIcon, shiftIcon, shoppingIcon, sodaIcon, tagIcon, tennisIcon, thunderIcon, toolIcon, volleyballIcon, volleyball2Icon, waterIcon, workIcon } from '../../assets/icons';


function IconInput({ icon, setIcon, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Sample icons array with names and components
    const iconOptions = [
        // A
        { name: 'ace', icon: aceIcon() },
        { name: 'activity', icon: activityIcon() },
        // B
        { name: 'badminton', icon: badmintonIcon() },
        { name: 'bank', icon: bankIcon() },
        { name: 'basketball', icon: basketballIcon() },
        { name: 'basketball2', icon: basketball2Icon() },
        { name: 'beer', icon: beerIcon() },
        { name: 'book', icon: bookIcon() },
        { name: 'box', icon: boxIcon() },
        // C
        { name: 'camera', icon: cameraIcon() },
        { name: 'can', icon: canIcon() },
        { name: 'card', icon: cardIcon() },
        { name: 'cash', icon: cashIcon() },
        { name: 'cocktail', icon: cocktailIcon() },
        { name: 'coffee', icon: coffeeIcon() },
        { name: 'controller', icon: controllerIcon() },
        { name: 'cut', icon: cutIcon() },
        // D
        { name: 'diamond', icon: diamondIcon() },
        { name: 'dice', icon: diceIcon() },
        { name: 'dollar', icon: dollarIcon() },
        { name: 'dollarCoin', icon: dollarCoinIcon() },
        { name: 'dollarCoin2', icon: dollarCoin2Icon() },
        { name: 'dollarWasting', icon: dollarWastingIcon() },
        { name: 'dress', icon: dressIcon() },
        // F
        // { name: 'fastFood', icon: fastFoodIcon() },
        // { name: 'fire', icon: fireIcon() },
        // { name: 'fish', icon: fishIcon() },
        // { name: 'flash', icon: flashIcon() },
        // { name: 'flower', icon: flowerIcon() },
        // { name: 'flower2', icon: flower2Icon() },
        // { name: 'food', icon: foodIcon() },
        // { name: 'football', icon: footballIcon() },
        // { name: 'frapple', icon: frappleIcon() },
        // // G
        // { name: 'gas', icon: gasIcon() },
        // { name: 'gear', icon: gearIcon() },
        // { name: 'gift', icon: giftIcon() },
        // { name: 'gold', icon: goldIcon() },
        // { name: 'golf', icon: golfIcon() },
        // { name: 'grocery', icon: groceryIcon() },
        // { name: 'guitar', icon: guitarIcon() },
        // // H
        // { name: 'hammer', icon: hammerIcon() },
        // //I
        // { name: 'iceScream', icon: iceScreamIcon() },
        // { name: 'iceScream2', icon: iceScream2Icon() },
        // // M
        // { name: 'medical', icon: medicalIcon() },
        // { name: 'moneyBag', icon: moneyBagIcon() },
        // { name: 'moneyBag2', icon: moneyBagIcon() },
        // { name: 'movie', icon: movieIcon() },
        // { name: 'mug', icon: mugIcon() },
        // { name: 'music', icon: musicIcon() },
        // // N
        // { name: 'noodle', icon: noodleIcon() },
        // // P
        // { name: 'painting', icon: paintingIcon() },
        // { name: 'paperPlane', icon: paperPlaneIcon() },
        // { name: 'phone', icon: phoneIcon() },
        // { name: 'pill', icon: pillIcon() },
        // { name: 'pill2', icon: pillIcon() },
        // { name: 'plane', icon: planeIcon() },
        // { name: 'pool', icon: poolIcon() },
        // // R
        // { name: 'react', icon: reactIcon() },
        // // S
        // { name: 'salon', icon: salonIcon() },
        // { name: 'saving', icon: savingIcon() },
        // { name: 'shift', icon: shiftIcon() },
        // { name: 'shopping', icon: shoppingIcon() },
        // { name: 'soda', icon: sodaIcon() },
        // // T
        // { name: 'tag', icon: tagIcon() },
        // { name: 'tennis', icon: tennisIcon() },
        // { name: 'thunder', icon: thunderIcon() },
        // { name: 'tool', icon: toolIcon() },
        // // V
        // { name: 'volleyball', icon: volleyballIcon() },
        // { name: 'volleyball2', icon: volleyballIcon() },
        // // W
        // { name: 'water', icon: waterIcon() },
        // { name: 'work', icon: workIcon() },
    ];

    const handleIconSelect = (selectedIconName) => {
        setIcon(selectedIconName);  // Update icon name in state
        setIsOpen(false);            // Close the dropdown
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false); // Close dropdown if clicked outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Find the selected icon component based on the icon name
    const selectedIcon = iconOptions.find(option => option.iconName === icon)?.component || <AiOutlineQuestion />;

    return (
        <div ref={dropdownRef} className={`${styles.formIconInput} ${className || ''}`}>
            <div onClick={() => setIsOpen(!isOpen)} className={styles.iconSelector}>
                {selectedIcon} {/* Display the selected icon or a default question mark */}
                
            </div>
            {isOpen && (
                <div className={styles.iconDropdown}>
                    {iconOptions.map(option => (
                        <div 
                            key={option.name}
                            className={styles.iconOption}
                            onClick={() => handleIconSelect(option.name)} // Set icon name
                        >
                            {option.icon} {/* Show icon component in dropdown */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default IconInput;
