const Wallet = require('../models/wallet.model')
const Transaction = require('../models/transaction.model')

const walletControllers = {
 // Wallet controllers
 getWallets: async (req, res) => {
    try {
      const userId = req.params.id;
      const wallets = await Wallet.find({ userId: userId });
      
      if (!wallets.length) {
        return res.status(200).json([]);
      }
  
      res.status(200).json(wallets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  getOneWallet: async (req, res) => {
    try {
      const walletId = req.params.walletId;
      const wallet = await Wallet.find({ _id: walletId });
      
      if (!wallet) {
        return res.status(404).json({ message: "You don't have that wallet!" });
      }
  
      res.status(200).json(wallet);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addWallet: async (req, res) => {
    try {
      const { name, balance, type, color, userId } = req.body;
      const walletData = {
        name,
        balance,
        type,
        color,
        userId,
      }
      console.log('New wallet created', walletData)

      const addedWallet = await Wallet.create(walletData);

      res
        .status(201)
        .json({ message: "Wallet added successfully", wallet: addedWallet });
    } catch (error) {
      console.error('Error adding wallet:', error);
      res.status(500).json({ message: "Failed to add wallet", error });
    }
  },

  updateWallet: async (req, res) => {
    try {
      const { name, balance, type, color, transactionIds } = req.body;
      const walletId = req.params.walletId;
      const walletUpdateData = { name, balance, type, color, transactionIds }
      console.log('walletUpdateData from backend: ', walletUpdateData)

      const updatedWallet = await Wallet.findByIdAndUpdate(walletId, walletUpdateData, { new: true });

      res
        .status(201)
        .json({ message: "Wallet Updated", wallet: updatedWallet });
    } catch (error) {
      console.error('Error adding wallet:', error);
      res.status(500).json({ message: "Failed update wallet", error });
    }
  },

  deleteWallet: async (req, res) => {
    try {
      const walletId = req.params.walletId;
  
      const deletedWallet = await Wallet.deleteOne({ _id: walletId });
  
      if (deletedWallet.deletedCount > 0) {
        res.status(200).json({ message: "Wallet Deleted", wallet: deletedWallet });
      } else {
        res.status(404).json({ message: "Wallet not found" });
      }
    } catch (error) {
      console.error('Error deleting wallet:', error);
      res.status(500).json({ message: "Failed to delete wallet", error });
    }
  },

  getWalletTransactions: async (req, res) => {
    try {
      const walletId = req.params.walletId;
      const transactions = await Transaction.find({ walletId: walletId });
      
      if (!transactions.length) {
        return res.status(404).json({ message: "You don't have any transactions in this wallet!" });
      }
  
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  transferBalance: async (req, res) => {
    const { fromWalletId, toWalletId, amount } = req.body;
    try {
        // Ensure the amount is positive
        if (amount <= 0) {
            return res.status(400).json({ message: 'Transfer amount must be positive' });
        }

        // Find both wallets
        const fromWallet = await Wallet.findById(fromWalletId);
        const toWallet = await Wallet.findById(toWalletId);

        if (!fromWallet || !toWallet) {
            return res.status(404).json({ message: 'One or both wallets not found' });
        }

        // Check if the `fromWallet` has enough balance
        if (fromWallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance in the source wallet' });
        }

        // Perform the balance transfer
        fromWallet.balance -= amount;
        toWallet.balance += amount;

        // Save the updated wallets
        await fromWallet.save();
        await toWallet.save();

        // Return the updated wallet data
        res.status(200).json({ updatedFromWallet: fromWallet, updatedToWallet: toWallet });
    } catch (error) {
        console.error('Error transferring balance:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = walletControllers;
