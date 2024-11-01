import axios from 'axios';
import { Types } from "./types";

// Authentication
export const loginRequest = (loginRequestInfo, setMessage, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:4000/login', loginRequestInfo);
            const user = response.data;

            dispatch(loginSuccess(user));
            setMessage('Welcome back! Please wait...');
            navigate('/home');

            return user;
        } catch (error) {
            console.error('Error Login Request!', error);
            setMessage('Invalid email or password');
        }
    };
};

export const loginSuccess = (user) => ({
    type: Types.loginSuccess,
    payload: user
});

export const logout = () => ({
    type: Types.logout,
});

// Wallet Actions
export const getWallets = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:4000/user/${userId}/wallets`);
            dispatch(getWalletsSuccess(response.data));
        } catch (error) {
            console.error('Error fetching wallets:', error);
        }
    };
};

export const getWalletsSuccess = (wallets) => ({
    type: Types.getWalletsSuccess,
    wallets
});

export const getOneWallet = (walletId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:4000/wallet/${walletId}`);
            dispatch(getOneWalletSuccess(response.data));
            return response.data;
        } catch (error) {
            console.error('Error fetching wallet:', error);
        }
    };
};

export const getOneWalletSuccess = (wallet) => ({
    type: Types.getOneWalletSuccess,
    wallet
});

export const addWallet = (newWalletData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:4000/wallet/add', newWalletData);
            const newWallet = response.data.wallet
            console.log('newWallet from actions: ', newWallet)
            dispatch(addWalletSuccess(newWallet));
            return newWallet;
        } catch (error) {
            console.error('Cannot add wallet:', error);
        }
    };
};

export const addWalletSuccess = (wallet) => ({
    type: Types.addWalletSuccess,
    wallet
});

export const editWallet = (walletUpdateData, walletId) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(`http://localhost:4000/wallet/${walletId}`, walletUpdateData);
            dispatch(editWalletSuccess(response.data.wallet));
            return response.data.wallet;
        } catch (error) {
            console.error('Cannot update wallet:', error);
        }
    };
};

export const editWalletSuccess = (updatedWallet) => ({
    type: Types.editWalletSuccess,
    wallet: updatedWallet
});

export const deleteWallet = (walletId, closeForm) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:4000/wallet/${walletId}`);
            closeForm();
            dispatch(deleteWalletSuccess(walletId));
        } catch (error) {
            console.error('Cannot delete wallet:', error);
        }
    };
};

export const deleteWalletSuccess = (walletId) => ({
    type: Types.deleteWalletSuccess,
    walletId
});

// Budget Actions
export const getBudgets = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:4000/user/${userId}/budgets`);
            dispatch(getBudgetsSuccess(response.data));
            return response.data;
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };
};

export const getBudgetsSuccess = (budgets) => ({
    type: Types.getBudgetsSuccess,
    budgets
});

export const addBudget = (newBudgetData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:4000/budget/add', newBudgetData);
            const newBudget = response.data.budget
            dispatch(addBudgetSuccess(newBudget));
            return newBudget;
        } catch (error) {
            console.error('Cannot add budget:', error);
        }
    };
};

export const addBudgetSuccess = (budget) => ({
    type: Types.addBudgetSuccess,
    budget
});

export const editBudget = (budgetUpdateData, budgetId) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(`http://localhost:4000/budget/${budgetId}`, budgetUpdateData);
            dispatch(editBudgetSuccess(response.data.budget));
            return response.data.budget;
        } catch (error) {
            console.error('Cannot update budget:', error);
        }
    };
};

export const editBudgetSuccess = (updatedBudget) => ({
    type: Types.editBudgetSuccess,
    budget: updatedBudget
});

export const deleteBudget = (budgetId, closeForm) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:4000/budget/${budgetId}`);
            closeForm();
            dispatch(deleteBudgetSuccess(budgetId));
        } catch (error) {
            console.error('Cannot delete budget:', error);
        }
    };
};

export const deleteBudgetSuccess = (budgetId) => ({
    type: Types.deleteBudgetSuccess,
    budgetId
});


// Transaction Actions
export const getTransactions = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:4000/user/${userId}/transactions`);
            dispatch(getTransactionsSuccess(response.data));
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
};

export const getTransactionsSuccess = (transactions) => ({
    type: Types.getTransactionsSuccess,
    transactions
});

export const getOneTransaction = (transactionId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:4000/transaction/${transactionId}`);
            dispatch(getOneTransactionSuccess(response.data));
            return response.data;
        } catch (error) {
            console.error('Error fetching transaction:', error);
        }
    };
};

export const getOneTransactionSuccess = (transaction) => ({
    type: Types.getOneTransactionSuccess,
    transaction
});

export const addTransaction = (transactionData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:4000/transaction/add', transactionData);
            const newTransaction = response.data.transaction;

            dispatch(addTransactionSuccess(newTransaction));
            return newTransaction;
        } catch (error) {
            console.error('Cannot add transaction:', error);
        }
    };
};

export const addTransactionSuccess = (transaction) => ({
    type: Types.addTransactionSuccess,
    transaction
});

export const editTransaction = (transactionUpdateData, transactionId) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(`http://localhost:4000/transaction/${transactionId}`, transactionUpdateData);
            dispatch(editTransactionSuccess(response.data.transaction));
            return response.data.transaction;
        } catch (error) {
            console.error('Cannot update transaction:', error);
        }
    };
};

export const editTransactionSuccess = (updatedTransaction) => ({
    type: Types.editTransactionSuccess,
    transaction: updatedTransaction
});

export const deleteTransaction = (transactionId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:4000/transaction/${transactionId}`);
            dispatch(deleteTransactionSuccess(transactionId));
        } catch (error) {
            console.error('Cannot delete transaction:', error);
        }
    };
};

export const deleteTransactionSuccess = (transactionId) => ({
    type: Types.deleteTransactionSuccess,
    transactionId
});