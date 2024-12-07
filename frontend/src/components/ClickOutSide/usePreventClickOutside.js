import { useEffect, useRef } from 'react';

function usePreventClickOutside(onClickOutside, isActive) {
    const ref = useRef(null);

    useEffect(() => {
        if (!isActive) return;

        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClickOutside, isActive]);

    return ref;
}

export default usePreventClickOutside;
