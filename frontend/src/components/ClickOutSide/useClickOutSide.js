import { useEffect } from 'react';

const useClickOutside = (ref, callback) => {
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
                callback(); // Trigger close only if outside both
            }
        };

        const handleEscKey = (event) => {
            if (event.key === 'Escape' && ref.current) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [ref, callback]);
};

export default useClickOutside;
