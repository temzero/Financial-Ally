import { Types } from '../types';

const initState = {
    user: null,
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        // Authentication
        case Types.loginSuccess:
            return { ...state, user: action.user};
        case Types.logout:
            return initState;

        // user
        case Types.getUserSuccess:
            return { ...state, user: action.user || {} };
        case Types.updateUserSuccess:
            return { ...state, user: action.user || [] };

        default:
            return state;
    }
};

export default userReducer;
