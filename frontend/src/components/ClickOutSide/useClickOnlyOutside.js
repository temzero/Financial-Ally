import { useEffect } from 'react';

const useClickOnlyOutside = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {

            const isInsidePikaday = event.target.closest('.pika-single');
            const isPikadayButton = event.target.classList.contains('pika-button');
            if (
                ref.current &&
                !ref.current.contains(event.target) && // Not inside the form
                !isInsidePikaday && // Not inside Pikaday popup
                !isPikadayButton // Not clicking a date button
            ) {
                callback(); 
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

export default useClickOnlyOutside;
