const Transaction = require("../models/transaction.model");

const transactionControllers = {
  getTransactions: async (req, res) => {
    try {
      const transactions = await Transaction.find({ userId: req.params.id });
      res.status(200).send(transactions.length ? transactions : "");
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getOneTransaction: async (req, res) => {
    try {
      const transactionId = req.params.transactionId;
      const transaction = await Transaction.findById(transactionId);

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found!" });
      }

      res.status(200).json(transaction);
    } catch (error) {
      console.error("Error fetching transaction:", error);
      res.status(500).json({ message: error.message });
    }
  },

  addTransaction: async (req, res) => {
    try {
      const transactionData = {
        type: req.body.type,
        amount: req.body.amount,
        categoryId: req.body.categoryId,
        walletId: req.body.walletId,
        date: req.body.date,
        note: req.body.note,
        image: req.file ? req.file.path : null,
        userId: req.body.userId,
      };

      const addedTransaction = await Transaction.create(transactionData);

      res
        .status(201)
        .json({
          message: "Transaction added successfully",
          transaction: addedTransaction,
        });
    } catch (error) {
      console.error("Error adding transaction:", error);
      res.status(500).json({ message: "Failed to add transaction", error });
    }
  },

  updateTransaction: async (req, res) => {
    try {
      const { type, amount, categoryId, walletId, date, note, image } =
        req.body;
      const transactionId = req.params.transactionId;
      const transactionUpdateData = {
        type,
        amount,
        categoryId,
        walletId,
        date,
        note,
        image,
      };

      const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        transactionUpdateData,
        { new: true }
      );

      if (!updatedTransaction) {
        return res.status(404).json({ message: "Transaction not found!" });
      }

      res
        .status(200)
        .json({
          message: "Transaction updated",
          transaction: updatedTransaction,
        });
    } catch (error) {
      console.error("Error updating transaction:", error);
      res.status(500).json({ message: "Failed to update transaction", error });
    }
  },

  deleteTransaction: async (req, res) => {
    try {
      const transactionId = req.params.transactionId;

      const deletedTransaction = await Transaction.deleteOne({
        _id: transactionId,
      });

      if (deletedTransaction.deletedCount > 0) {
        res.status(200).json({ message: "Transaction deleted" });
      } else {
        res.status(404).json({ message: "Transaction not found" });
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      res.status(500).json({ message: "Failed to delete transaction", error });
    }
  },
};

module.exports = transactionControllers;
