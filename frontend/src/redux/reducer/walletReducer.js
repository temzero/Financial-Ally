import { Types } from '../types';

const initState = {
    wallets: [],
};

const walletReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.getWalletsSuccess:
            return { ...state, wallets: action.wallets || [] };
        case Types.getOneWalletSuccess:
            return {
                ...state,
                wallets: state.wallets.map((wallet) =>
                    wallet._id === action.wallet._id ? action.wallet : wallet
                ),
            };
        case Types.addWalletSuccess:
            return { ...state, wallets: [...state.wallets, action.wallet] };
        case Types.updateWalletSuccess:
            return {
                ...state,
                wallets: state.wallets.map((wallet) =>
                    wallet._id === action.wallet._id ? action.wallet : wallet
                ),
            };
        default:
            return state;
    }
};

export default walletReducer;
