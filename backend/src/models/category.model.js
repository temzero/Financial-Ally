const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true
    },
    color: {
        type: String,
        // required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
