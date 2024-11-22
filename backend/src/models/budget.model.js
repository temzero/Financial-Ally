const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    moneyLimit: {
        type: Number,
        required: true
    },
    moneySpend: {
        type: Number,
        default: 0,
        min: [0, 'Money spent cannot be less than 0'], 
    },
    walletIds: [
        {
            type: String
        }
    ],
    transactionIds: {
        type: [String],
        default: [], // This sets an empty array as the default value for transactionIds
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
