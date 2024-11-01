const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');
const walletControllers = require('../controllers/wallet.controller');
const budgetControllers = require('../controllers/budget.controller');
const transactionControllers = require('../controllers/transaction.controller')

// Home
router.get('/', userControllers.getHome);

// Authentication
router.get('/register', userControllers.getRegister);
router.post('/register', userControllers.postRegister);
router.get('/login', userControllers.getLogin);
router.post('/login', userControllers.postLogin);

// User routes
router.get('/user/:id', userControllers.getUser);
router.put('/user/:id', userControllers.updateUser);
router.delete('/user/:id', userControllers.deleteUser);

// Wallet routes
router.get('/user/:id/wallets', walletControllers.getWallets);
router.get('/wallet/:walletId', walletControllers.getOneWallet);
router.post('/wallet/add', walletControllers.addWallet); 
router.patch('/wallet/:walletId', walletControllers.updateWallet);
router.delete('/wallet/:walletId', walletControllers.deleteWallet);

// Budget routes
router.get('/user/:id/budgets', budgetControllers.getBudgets);
router.get('/budget/:budgetId', budgetControllers.getOneBudget);
router.post('/budget/add', budgetControllers.addBudget);
router.patch('/budget/:budgetId', budgetControllers.updateBudget);
router.delete('/budget/:budgetId', budgetControllers.deleteBudget); 

// Transaction routes
router.get('/user/:id/transactions', transactionControllers.getTransactions);
router.get('/transaction/:transactionId', transactionControllers.getOneTransaction);
router.post('/transaction/add', transactionControllers.addTransaction); 
router.patch('/transaction/:transactionId', transactionControllers.updateTransaction); 
router.delete('/transaction/:transactionId', transactionControllers.deleteTransaction); 

module.exports = router;
