const User = require("../models/user.model");
const Wallet = require("../models/wallet.model");

const userControllers = {
  getHome: async (req, res) => {
    try {
      res.send("Welcome Home");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getRegister: async (req, res) => {
    try {
      res.send("Register: Username - Password");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  postRegister: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getLogin: async (req, res) => {
    try {
      res.send("Login: Username - Password");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  postLogin: async (req, res) => {
    try {
      const loginEmail = req.body.email;
      const loginPassword = req.body.password;

      const matchedUser = await User.findOne({ email: loginEmail });
      console.log("User actual password: ", matchedUser.password);

      if (loginPassword !== matchedUser.password) {
        return res.status(401).json("Invalid email or password!");
      }
      res.status(200).json(matchedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const userID = req.params.id;
      const user = await User.findById(userID);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const userID = req.params.id;
      const updatedUser = await User.findByIdAndUpdate(userID, req.body, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userID = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userID);

      if (!deletedUser) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Wallet controllers
  getWallet: async (req, res) => {
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

module.exports = userControllers;
