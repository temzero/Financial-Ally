export const Types = {
    // Authentication
    loginRequest: 'LOGIN REQUEST',
    loginSuccess: 'LOGIN SUCCESS',
    logout: 'LOGOUT',
    
    // Wallet Management
    getWallets: 'GET WALLETS',
    getWalletsSuccess: 'GET WALLETS SUCCESS',
    getOneWallet: 'GET ONE WALLET',
    getOneWalletSuccess: 'GET ONE WALLET SUCCESS',
    addWallet: 'ADD WALLET',
    addWalletSuccess: 'ADD WALLET SUCCESS',
    editWallet: 'EDIT WALLET',
    editWalletSuccess: 'EDIT WALLET SUCCESS',
    deleteWallet: 'DELETE WALLET',
    deleteWalletSuccess: 'DELETE WALLET SUCCESS',

    // Budget Management
    getBudgets: 'GET BUDGETS',
    getBudgetsSuccess: 'GET BUDGETS SUCCESS',
    addBudget: 'ADD BUDGET',
    addBudgetSuccess: 'ADD BUDGET SUCCESS', // Ensure to add success type
    editBudget: 'EDIT BUDGET',
    editBudgetSuccess: 'EDIT BUDGET SUCCESS',
    deleteBudget: 'DELETE BUDGET', // Add delete type
    deleteBudgetSuccess: 'DELETE BUDGET SUCCESS', // Add delete success type
};
