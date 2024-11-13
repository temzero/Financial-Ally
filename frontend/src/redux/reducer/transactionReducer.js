import { Types } from '../types';

const initState = {
    transactions: [],
};

const transactionReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.getTransactionsSuccess:
            return { ...state, transactions: action.transactions || [] };
        case Types.addTransactionSuccess:
            return { ...state, transactions: [...state.transactions, action.transaction] };
        case Types.updateTransactionSuccess:
            return {
                ...state,
                transactions: state.transactions.map((transaction) =>
                    transaction._id === action.transaction._id ? action.transaction : transaction
                ),
            };
        case Types.deleteTransactionSuccess:
            return {
                ...state,
                transactions: state.transactions.filter(
                    (transaction) => transaction._id !== action.transactionId
                ),
            };
        default:
            return state;
    }
};

export default transactionReducer;
