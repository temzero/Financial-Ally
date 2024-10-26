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
        case Types.getWalletsSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    wallets: action.wallets || [], // Ensure wallets is always an array
                },
            };

        // Wallet management: Add a new wallet
        case Types.addWalletSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    wallets: [...(state.user?.wallets || []), action.wallet], // Append the new wallet to the wallets array
                },
            };
        
        // Wallet management: Edit an existing wallet
        case Types.editWalletSuccess:
            console.log("Action: ", action);
            console.log("Wallet updated: ", action.wallet);
            return {
                ...state,
                user: {
                    ...state.user,
                    wallets: state.user?.wallets.map(wallet => // Access wallets from the user object
                        wallet._id === action.wallet._id ? action.wallet : wallet
                    ) || [], // Ensure wallets is always an array
                },
            };

        default:
            return state;
    }
};
