import { Types } from '../types';

const initState = {
    isOverlay: false,
};

const stateReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.setOverlay:
            return {
                ...state, 
                isOverlay: action.isOverlay,
            };
        default:
            return state;
    }
};

export default stateReducer;
