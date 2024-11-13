import { Types } from '../types';

const initState = {
    user: null,
    error: '',
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        // Authentication
        case Types.loginSuccess:
            return {
                ...state,
                user: action.user, // Directly update the user on login success
                error: '', // Clear any previous error on login success
            };

        case Types.logout:
            return initState; // Reset state on logout

        // User management
        case Types.getUserSuccess:
            return {
                ...state,
                user: action.user || {},
            };

        case Types.updateUserSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    user: action.user || [],
                },
            };

        // Wallet management
        case Types.getWalletsSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    wallets: action.wallets || [],
                },
            };

        case Types.getOneWalletSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    wallets: state.user.wallets.map(
                        (wallet) =>
                            wallet._id === action.wallet._id
                                ? action.wallet
                                : wallet // Update the specific wallet in the array
                    ),
                },
            };

        case Types.addWalletSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    wallets: [...(state.user?.wallets || []), action.wallet], // Append the new wallet to the wallets array
                },
            };

        case Types.updateWalletSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    wallets:
                        state.user?.wallets.map(
                            (
                                wallet // Access wallets from the user object
                            ) =>
                                wallet._id === action.wallet._id
                                    ? action.wallet
                                    : wallet
                        ) || [], // Ensure wallets is always an array
                },
            };

        // Budget management
        case Types.getBudgetsSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    budgets: action.budgets || [], // Ensure Budgets is always an array
                },
            };

        case Types.addBudgetSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    budgets: [...(state.user?.budgets || []), action.budget], // Append the new wallet to the Budgets array
                },
            };

        case Types.updateBudgetSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    budgets:
                        state.user?.budgets.map(
                            (
                                budget // Access Budgets from the user object
                            ) =>
                                budget._id === action.budget._id
                                    ? action.budget
                                    : budget
                        ) || [], // Ensure Budgets is always an array
                },
            };

        // Transaction management
        case Types.getTransactionsSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    transactions: action.transactions || [], // Store fetched transactions inside user
                },
            };

        case Types.addTransactionSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    transactions: [
                        ...(state.user?.transactions || []),
                        action.transaction,
                    ], // Add new transaction to the user's transactions
                },
            };

        case Types.updateTransactionSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    transactions:
                        state.user?.transactions.map((transaction) =>
                            transaction._id === action.transaction._id
                                ? action.transaction
                                : transaction
                        ) || [], // Update the specific transaction
                },
            };

        case Types.deleteTransactionSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    transactions: state.user?.transactions.filter(
                        (transaction) =>
                            transaction._id !== action.transactionId
                    ), // Remove deleted transaction
                },
            };

        default:
            return state;
    }
};

export default reducer;