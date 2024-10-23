import { Types } from './types';

const initState = {
    user: null, // null when not logged in
    error: '',
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        // Authentication
        case Types.loginSuccess:
            return {
                ...state,
                user: action.payload, // Directly update the user on login success
                error: '', // Clear any previous error on login success
            };

        case Types.logout:
            return initState; // Reset state on logout

        // Wallet management: Load wallets into user object
        case Types.getWallets:
            return {
                ...state,
                user: {
                    ...state.user,
                    wallets: action.wallets || [], // Ensure wallets is always an array
                },
            };

        // Wallet management: Add a new wallet
        case Types.addWallet:
            return {
                ...state,
                user: {
                    ...state.user,
                    wallets: [...(state.user?.wallets || []), action.wallet], // Append the new wallet to the wallets array
                },
            };

        default:
            return state;
    }
};
