import { useEffect } from 'react';

// Custom hook to detect clicks outside the element
const useClickOutside = (ref , callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback(); // Invoke the callback if the click is outside the ref element
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

export default useClickOutside;


// const useClickOutside = (callback) => {
//     const ref = useRef();

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (ref.current && !ref.current.contains(event.target)) {
//                 callback();
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [callback]);

//     return ref;
// };

// export default useClickOutside;
