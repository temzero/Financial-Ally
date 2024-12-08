import { useEffect } from 'react';

// Custom hook to detect clicks outside the element and ESC key press
const useClickOutside = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback(); // Invoke the callback if the click is outside the ref element
            }
        };

        const handleEscKey = (event) => {
            if (event.key === 'Escape' && ref.current) {
                callback(); // Invoke the callback if the ESC key is pressed
            }
        };

        // Add event listeners
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);

        return () => {
            // Cleanup event listeners on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [ref, callback]);

    // The hook will now trigger the callback on click outside or ESC key press
};

export default useClickOutside;
