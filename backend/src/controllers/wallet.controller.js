const Wallet = require('../models/wallet.model')

const walletControllers = {
 // Wallet controllers
 getWallets: async (req, res) => {
    try {
      const userId = req.params.id;
      const wallets = await Wallet.find({ userId: userId });
      
      if (!wallets.length) {
        return res.status(404).json({ message: "You don't have any wallet!" });
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
      const { name, balance, type, color } = req.body;
      const walletId = req.params.walletId;
      const walletUpdateData = { name, balance, type, color }

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
      console.log('delete wallet request: ', req);
      console.log('delete walletId: ', walletId);
  
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
};

module.exports = walletControllers;