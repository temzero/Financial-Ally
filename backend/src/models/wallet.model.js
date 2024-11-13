const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    transactionIds: {
        type: [String],
        default: [], // This sets an empty array as the default value for transactionIds
    },
    userId: {
        type: String,
        required: true
    }
});

const Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;
