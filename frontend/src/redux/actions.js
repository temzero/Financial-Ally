import { Types } from "./types"

// Authentication
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

// Wallet actions
export const addWallet = (walletData) => {
    return {
        type: Types.addWallet,
        wallet: walletData,
    }
}