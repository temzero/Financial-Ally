const Category = require("../models/category.model");

const categoryControllers = {
  getCategories: async (req, res) => {
    try {
      const userId = req.params.id;
      const categories = await Category.find({ userId });

      if (!categories.length) {
        return res.status(404).json({ message: "No categories found!" });
      }

      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: error.message });
    }
  },

  getOneCategory: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const category = await Category.findById(categoryId);

      if (!category) {
        return res.status(404).json({ message: "Category not found!" });
      }

      res.status(200).json(category);
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ message: error.message });
    }
  },

  addCategory: async (req, res) => {
    try {
      const { name, type, icon, color, userId } = req.body;
      console.log('add category data: ', name)

      const newCategory = await Category.create({ name, type, icon, color, userId });

      res.status(201).json({ message: "Category added successfully", category: newCategory });
    } catch (error) {
      console.error('Error adding category:', error);
      res.status(500).json({ message: "Failed to add category", error });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name, type, icon, color } = req.body;
      const categoryId = req.params.categoryId;
      const categoryUpdateData = { name, type, icon, color };

      const updatedCategory = await Category.findByIdAndUpdate(categoryId, categoryUpdateData, { new: true });

      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found!" });
      }

      res.status(200).json({ message: "Category updated", category: updatedCategory });
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ message: "Failed to update category", error });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;

      const deletedCategory = await Category.deleteOne({ _id: categoryId });

      if (deletedCategory.deletedCount > 0) {
        res.status(200).json({ message: "Category deleted" });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ message: "Failed to delete category", error });
    }
  },
};

module.exports = categoryControllers;
