import { Types } from "./types"
// import { useNavigate } from 'react-router-dom';

const initState = {
    user: null,
    error: ''
}

export const authReducer = (state = initState, action) => {
    // const navigate = useNavigate();

    console.log('Reducer action: ', action)
    switch(action.type) {
        case Types.loginRequest:
            return state;
        case Types.loginSuccess:
            const user = action.payload
            const loginUser = {...state, user}
            return loginUser;  
        case Types.logout:
            return initState;
        default: 
            return state
    }
}