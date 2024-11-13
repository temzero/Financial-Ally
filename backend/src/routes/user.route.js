const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');
const walletControllers = require('../controllers/wallet.controller');
const budgetControllers = require('../controllers/budget.controller');
const transactionControllers = require('../controllers/transaction.controller')
const categoryControllers = require('../controllers/category.controller')

// Home
router.get('/', userControllers.getHome);

// Authentication
router.get('/register', userControllers.getRegister);
router.post('/register', userControllers.postRegister);
router.get('/login', userControllers.getLogin);
router.post('/login', userControllers.postLogin);

// User routes
router.get('/user/:id', userControllers.getUser);
router.patch('/user/:id', userControllers.updateUser);
router.delete('/user/:id', userControllers.deleteUser);

// Wallet routes
router.get('/user/:id/wallets', walletControllers.getWallets);
router.get('/wallet/:walletId', walletControllers.getOneWallet);
router.post('/wallet/add', walletControllers.addWallet); 
router.patch('/wallet/:walletId', walletControllers.updateWallet);
router.delete('/wallet/:walletId', walletControllers.deleteWallet);
router.get('/wallet/:walletId/transactions', walletControllers.getWalletTransactions);
router.post('/wallet/transfer', walletControllers.transferBalance);

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

// Category routes
router.get('/user/:id/categories', categoryControllers.getCategories);
router.get('/category/:categoryId', categoryControllers.getOneCategory);
router.post('/category/add', categoryControllers.addCategory);
router.patch('/category/:categoryId', categoryControllers.updateCategory);
router.delete('/category/:categoryId', categoryControllers.deleteCategory);

module.exports = router;
