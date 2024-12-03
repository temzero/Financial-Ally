import axios from 'axios';
import { Types } from './types';

// Authentication
export const loginRequest = (loginRequestInfo, setMessage, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                'http://localhost:4000/login',
                loginRequestInfo
            );
            const user = response.data;

            dispatch(loginSuccess(user));
            setMessage('Welcome back! Please wait...');
            navigate('/home');

            return user;
        } catch (error) {
            console.error('Error Login Request!', error);
            setMessage('Incorrect email or password');

        }
    };
};

export const registerRequest = (registerRequestInfo, setMessage, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                'http://localhost:4000/register',
                registerRequestInfo
            );
            const newUser = response.data;

            dispatch(loginSuccess(newUser));
            setMessage('Registration successful! Please wait...');
            navigate('/home');

            return newUser;
        } catch (error) {
            console.error('Error during registration:', error);
            setMessage('Registration failed. Please try again.');
        }
    };
};

export const loginSuccess = (user) => ({
    type: Types.loginSuccess,
    user: user,
});

export const logout = () => ({
    type: Types.logout,
});

// User Actions
export const getUser = (userId) => {
    return async (dispatch) => {
        try {
            if (!userId) {
                console.error('Error: User ID is undefined');
                return;
            }
            const response = await axios.get(
                `http://localhost:4000/user/${userId}`
            );
            const user = response.data;
            if (user) {
                dispatch(getUserSuccess(user));
            }
        } catch (error) {
            console.error('Error fetching wallets:', error);
        }
    };
};

export const getUserSuccess = (user) => ({
    type: Types.getUserSuccess,
    user: user,
});

export const updateUser = (userId, userUpdateData) => {
    return async (dispatch) => {
        try {
            // Send the update request to the backend
            const response = await axios.patch(
                `http://localhost:4000/user/${userId}`,
                userUpdateData
            );
            const updatedUser = response.data;
            console.log('UpdatedUser: ', updatedUser);

            // Dispatch the action to update user in the store
            dispatch(updateUserSuccess(updatedUser));

            // Optionally return the updated user for use in other parts of the app
            return updatedUser;
        } catch (error) {
            console.error('Cannot update user:', error);
        }
    };
};

export const updateUserSuccess = (updatedUser) => ({
    type: Types.updateUserSuccess,
    user: updatedUser,
});

// Wallet Actions
export const getWallets = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/user/${userId}/wallets`
            );
            const wallets = response.data;
            if (wallets) {
                dispatch(getWalletsSuccess(wallets));
                return wallets;
            }
        } catch (error) {
            console.error('Error fetching wallets:', error);
        }
    };
};

export const getWalletsSuccess = (wallets) => ({
    type: Types.getWalletsSuccess,
    wallets,
});

export const getOneWallet = (walletId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/wallet/${walletId}`
            );
            dispatch(getOneWalletSuccess(response.data));
            return response.data;
        } catch (error) {
            console.error('Error fetching wallet:', error);
        }
    };
};

export const getOneWalletSuccess = (wallet) => ({
    type: Types.getOneWalletSuccess,
    wallet,
});

export const addWallet = (newWalletData) => {
    return async (dispatch) => {
        try {
            console.log('newWalletData: ', newWalletData);

            const response = await axios.post(
                'http://localhost:4000/wallet/add',
                newWalletData
            );
            const newWallet = response.data.wallet;
            dispatch(addWalletSuccess(newWallet));
            return newWallet;
        } catch (error) {
            console.error('Cannot add wallet:', error);
        }
    };
};

export const addWalletSuccess = (wallet) => ({
    type: Types.addWalletSuccess,
    wallet,
});

export const updateWallet = (walletUpdateData, walletId) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(
                `http://localhost:4000/wallet/${walletId}`,
                walletUpdateData
            );
            const updatedWalletData = response.data.wallet
            console.log(`updatedWalletData`, updatedWalletData)
            dispatch(updateWalletSuccess(response.data.wallet));
            return response.data.wallet;
        } catch (error) {
            console.error('Cannot update wallet:', error);
        }
    };
};

export const updateWalletSuccess = (updatedWallet) => ({
    type: Types.updateWalletSuccess,
    wallet: updatedWallet,
});

export const deleteWallet = (walletId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:4000/wallet/${walletId}`);
            dispatch(deleteWalletSuccess(walletId));
        } catch (error) {
            console.error('Cannot delete wallet:', error);
        }
    };
};

export const deleteWalletSuccess = (walletId) => ({
    type: Types.deleteWalletSuccess,
    walletId,
});

export const getWalletTransactions = (walletId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/wallet/${walletId}/transactions`
            );
            // dispatch(getWalletTransactionsSuccess(response.data));
            return response.data;
        } catch (error) {
            console.error('Error fetching wallet transactions:', error);
        }
    };
};

// Budget Actions
export const getBudgets = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/user/${userId}/budgets`
            );
            const budgets = response.data;
            dispatch(getBudgetsSuccess(budgets));
            return budgets;
        } catch (error) {
            console.error('Error fetching budgets:', error);
            // Handle any errors from the request
            return 'An error occurred while fetching budgets.';
        }
    };
};

export const getBudgetsSuccess = (budgets) => ({
    type: Types.getBudgetsSuccess,
    budgets,
});

export const addBudget = (newBudgetData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                'http://localhost:4000/budget/add',
                newBudgetData
            );
            const newBudget = response.data.budget;
            dispatch(addBudgetSuccess(newBudget));
            return newBudget;
        } catch (error) {
            console.error('Cannot add budget:', error);
        }
    };
};

export const addBudgetSuccess = (budget) => ({
    type: Types.addBudgetSuccess,
    budget,
});

export const updateBudget = (budgetUpdateData, budgetId) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(
                `http://localhost:4000/budget/${budgetId}`,
                budgetUpdateData
            );
            dispatch(updateBudgetSuccess(response.data.budget));
            return response.data.budget;
        } catch (error) {
            console.error('Cannot update budget:', error);
        }
    };
};

export const updateBudgetSuccess = (updatedBudget) => ({
    type: Types.updateBudgetSuccess,
    budget: updatedBudget,
});

export const deleteBudget = (budgetId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:4000/budget/${budgetId}`);
            dispatch(deleteBudgetSuccess(budgetId));
        } catch (error) {
            console.error('Cannot delete budget:', error);
        }
    };
};

export const deleteBudgetSuccess = (budgetId) => ({
    type: Types.deleteBudgetSuccess,
    budgetId,
});

// Transaction Actions
export const getTransactions = (userId) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${userId}/transactions`);
  
        const transactions = response.data.length ? response.data : [];
        if (!transactions.length) {
          console.log('No transactions found.');
        }
        dispatch(getTransactionsSuccess(transactions));
      } catch (error) {
        console.log('No transactions found.');
        dispatch(getTransactionsSuccess([]));
      }
    };
  };

export const getTransactionsSuccess = (transactions) => ({
    type: Types.getTransactionsSuccess,
    transactions,
});

export const getOneTransaction = (transactionId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/transaction/${transactionId}`
            );
            dispatch(getOneTransactionSuccess(response.data));
            return response.data;
        } catch (error) {
            console.error('Error fetching transaction:', error);
        }
    };
};

export const getOneTransactionSuccess = (transaction) => ({
    type: Types.getOneTransactionSuccess,
    transaction,
});

export const addTransaction = (transactionData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                'http://localhost:4000/transaction/add',
                transactionData
            );
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
    transaction,
});

export const updateTransaction = (transactionUpdateData, transactionId) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(
                `http://localhost:4000/transaction/${transactionId}`,
                transactionUpdateData
            );
            dispatch(updateTransactionSuccess(response.data.transaction));
            return response.data.transaction;
        } catch (error) {
            console.error('Cannot update transaction:', error);
        }
    };
};

export const updateTransactionSuccess = (updatedTransaction) => ({
    type: Types.updateTransactionSuccess,
    transaction: updatedTransaction,
});

export const deleteTransaction = (transactionId) => {
    return async (dispatch) => {
        try {
            await axios.delete(
                `http://localhost:4000/transaction/${transactionId}`
            );
            dispatch(deleteTransactionSuccess(transactionId));
        } catch (error) {
            console.error('Cannot delete transaction:', error);
        }
    };
};

export const deleteTransactionSuccess = (transactionId) => ({
    type: Types.deleteTransactionSuccess,
    transactionId,
});

// Transfer balance
export const transferBalance = (fromWalletId, toWalletId, amount) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `http://localhost:4000/wallet/transfer`,
                {
                    fromWalletId,
                    toWalletId,
                    amount,
                }
            );

            // Assuming the response contains the updated wallets after transfer
            const { updatedFromWallet, updatedToWallet } = response.data;

            // Dispatch actions to update the state for both wallets
            dispatch(updateWalletSuccess(updatedFromWallet));
            dispatch(updateWalletSuccess(updatedToWallet));

            return { updatedFromWallet, updatedToWallet };
        } catch (error) {
            console.error('Cannot transfer balance:', error);
        }
    };
};

// Category actions
export const getCategories = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/user/${userId}/categories`
            );
            const categories = response.data;
            if (categories) {
                dispatch(getCategoriesSuccess(categories));
                return categories;
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
};

export const getCategoriesSuccess = (categories) => ({
    type: Types.getCategoriesSuccess,
    categories,
});

export const getOneCategory = (categoryId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/category/${categoryId}`
            );
            const category = response.data;
            dispatch(getOneCategorySuccess(category));
            return category;
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const getOneCategorySuccess = (category) => ({
    type: Types.getOneCategorySuccess,
    category,
});

export const addCategory = (newCategoryData) => {
    return async (dispatch) => {
        try {
            console.log('newcategorydata: ', newCategoryData);
            const response = await axios.post(
                'http://localhost:4000/category/add',
                newCategoryData
            );
            const newCategory = response.data.category;
            console.log('newcategory: ', newCategory);
            dispatch(addCategorySuccess(newCategory));
            return newCategory;
        } catch (error) {
            console.error('Cannot add category:', error);
        }
    };
};

export const addCategorySuccess = (category) => ({
    type: Types.addCategorySuccess,
    category,
});

// Update a category by ID
export const updateCategory = (categoryId, categoryUpdateData) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(
                `http://localhost:4000/category/${categoryId}`,
                categoryUpdateData
            );
            const updatedCategory = response.data.category;
            dispatch(updateCategorySuccess(updatedCategory));
            return updatedCategory;
        } catch (error) {
            console.error('Cannot update category:', error);
        }
    };
};

export const updateCategorySuccess = (updatedCategory) => ({
    type: Types.updateCategorySuccess,
    category: updatedCategory,
});

// Delete a category by ID
export const deleteCategory = (categoryId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:4000/category/${categoryId}`);
            dispatch(deleteCategorySuccess(categoryId));
        } catch (error) {
            console.error('Cannot delete category:', error);
        }
    };
};

export const deleteCategorySuccess = (categoryId) => ({
    type: Types.deleteCategorySuccess,
    categoryId,
});
