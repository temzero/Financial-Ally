const Budget = require("../models/budget.model");

const budgetControllers = {
  getBudgets: async (req, res) => {
    try {
      const userId = req.params.id;
      const budgets = await Budget.find({ userId });
      
      if (!budgets.length) {
        return res.status(404).json({ message: "No budgets found!" });
      }
  
      res.status(200).json(budgets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOneBudget: async (req, res) => {
    try {
      const budgetId = req.params.budgetId;
      const budget = await Budget.findById(budgetId);
      
      if (!budget) {
        return res.status(404).json({ message: "Budget not found!" });
      }
  
      res.status(200).json(budget);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addBudget: async (req, res) => {
    try {
      const { name, moneyLimit, moneySpend, wallets, category, startDate, finishDate, color, userId } = req.body;
      const budgetData = { name, moneyLimit, moneySpend, wallets, category, startDate, finishDate, color, userId };

      const addedBudget = await Budget.create(budgetData);

      res
        .status(201)
        .json({ message: "Budget added successfully", budget: addedBudget });
    } catch (error) {
      console.error('Error adding budget:', error);
      res.status(500).json({ message: "Failed to add budget", error });
    }
  },

  updateBudget: async (req, res) => {
    try {
      const { name, moneyLimit, wallets, category, startDate, finishDate, color } = req.body;
      const budgetId = req.params.budgetId;
      const budgetUpdateData = { name, moneyLimit, wallets, category, startDate, finishDate, color };

      const updatedBudget = await Budget.findByIdAndUpdate(budgetId, budgetUpdateData, { new: true });

      if (!updatedBudget) {
        return res.status(404).json({ message: "Budget not found!" });
      }

      res
        .status(200)
        .json({ message: "Budget Updated", budget: updatedBudget });
    } catch (error) {
      console.error('Error updating budget:', error);
      res.status(500).json({ message: "Failed to update budget", error });
    }
  },

  deleteBudget: async (req, res) => {
    try {
      const budgetId = req.params.budgetId;
  
      const deletedBudget = await Budget.deleteOne({ _id: budgetId });
  
      if (deletedBudget.deletedCount > 0) {
        res.status(200).json({ message: "Budget Deleted", budget: deletedBudget });
      } else {
        res.status(404).json({ message: "Budget not found" });
      }
    } catch (error) {
      console.error('Error deleting budget:', error);
      res.status(500).json({ message: "Failed to delete budget", error });
    }
  },
};

module.exports = budgetControllers;
