const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    moneyLimit: {
        type: Number,
        required: true
    },
    moneySpend: {
        type: Number,
        default: 0,
    },
    walletIds: [
        {
            type: String
        }
    ],
    transactionIds: [
        {
            type: String
        }
    ],
    category: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true
    },
    finishDate: {
        type: Date,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const Budget = mongoose.model('Budget', BudgetSchema);

module.exports = Budget;
