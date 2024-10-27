const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');
const walletControllers = require('../controllers/wallet.controller');
const budgetControllers = require('../controllers/budget.controller')

// Home
router.get('/', userControllers.getHome);

// Authentication
router.get('/register', userControllers.getRegister);
router.post('/register', userControllers.postRegister);
router.get('/login', userControllers.getLogin);
router.post('/login', userControllers.postLogin);

// User routes
router.get('/user/:id', userControllers.getUser); // Fetch a specific user by id
router.put('/user/:id', userControllers.updateUser); // Update a specific user by id
router.delete('/user/:id', userControllers.deleteUser); // Delete a specific user by id

// Wallet routes
router.get('/user/:id/wallet', walletControllers.getWallets); // Get all wallets for a specific user
router.get('/wallet/info/:walletId', walletControllers.getOneWallet); // Get a wallet for a specific user
router.post('/wallet/add', walletControllers.addWallet); // Add to the wallet
router.patch('/wallet/update/:walletId', walletControllers.updateWallet); // Update wallet data
router.delete('/wallet/delete/:walletId', walletControllers.deleteWallet); // Delete a wallet

// Budget routes
router.get('/user/:id/budget', budgetControllers.getBudgets); // Get all budgets for a specific user
router.get('/budget/info/:budgetId', budgetControllers.getOneBudget); // Get a budget for a specific user
router.post('/budget/add', budgetControllers.addBudget); // Add to the budget
router.patch('/budget/update/:budgetId', budgetControllers.updateBudget); // Update budget data
router.delete('/budget/delete/:budgetId', budgetControllers.deleteBudget); // Delete a wallet

module.exports = router;
