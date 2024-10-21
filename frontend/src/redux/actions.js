import { Types } from "./types"

export const loginRequest = () => {
    return {
        type: Types.loginRequest,
    }
}

export const loginSuccess = (user) => {
    return {
        type: Types.loginSuccess,
        payload: user
    }
}

export const logout = () => {
    return {
        type: Types.logout,
    }
}