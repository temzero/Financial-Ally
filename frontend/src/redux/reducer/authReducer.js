import { Types } from '../types';

const initState = {
    user: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.loginSuccess:
            return { ...state, user: action.user, error: '' };
        case Types.logout:
            return initState;
        default:
            return state;
    }
};

export default authReducer;
