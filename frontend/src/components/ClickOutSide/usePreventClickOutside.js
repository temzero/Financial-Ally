import { useEffect, useRef } from 'react';

function usePreventClickOutside(onOutsideClick, isActive) {
    const ref = useRef(null);

    useEffect(() => {
        if (!isActive) return;

        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onOutsideClick();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onOutsideClick, isActive]);

    return ref;
}

export default usePreventClickOutside;
