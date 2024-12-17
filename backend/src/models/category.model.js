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
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
