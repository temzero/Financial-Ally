import { combineReducers } from 'redux'; // Import combineReducers
import userReducer from './userReducer';
import walletReducer from './walletReducer';
import budgetReducer from './budgetReducer';
import transactionReducer from './transactionReducer';
import categoryReducer from './categoryReducer';
import stateReducer from './stateReducer';

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
//     overlay: true/false
// };

// Combine reducers
const reducer = combineReducers({
    user: userReducer,
    wallet: walletReducer,
    budget: budgetReducer,
    transaction: transactionReducer,
    category: categoryReducer,
    state: stateReducer,
});

export default reducer;
