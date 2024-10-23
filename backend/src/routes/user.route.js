const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');

// Home
router.get('/', userControllers.getHome);

// Authentication
router.get('/register', userControllers.getRegister);
router.post('/register', userControllers.postRegister);
router.get('/login', userControllers.getLogin);
router.post('/login', userControllers.postLogin);

// User routes
router.get('/users/:id', userControllers.getUser); // Fetch a specific user by id
router.put('/users/:id', userControllers.updateUser); // Update a specific user by id
router.delete('/users/:id', userControllers.deleteUser); // Delete a specific user by id

// Wallet routes
router.get('/users/:id/wallet', userControllers.getWallet); // Get wallet for a specific user
router.post('/wallets/add', userControllers.addWallet); // Add to the wallet

module.exports = router;
