import { combineReducers } from 'redux'; // Import combineReducers
import userReducer from './userReducer';
import walletReducer from './walletReducer';
import budgetReducer from './budgetReducer';
import transactionReducer from './transactionReducer';
import categoryReducer from './categoryReducer';

// const initState = {
//     user: {
//         user: null,
//     },
//     wallet: {
//         wallets: [],
//     },
//     budget: {
//         budgets: [],
//     },
//     transaction: {
//         transactions: [],
//     },
//     category: {
//         categories: [],
//     },
// };

// Combine reducers
const reducer = combineReducers({
    user: userReducer,
    wallet: walletReducer,
    budget: budgetReducer,
    transaction: transactionReducer,
    category: categoryReducer,
});

export default reducer;
