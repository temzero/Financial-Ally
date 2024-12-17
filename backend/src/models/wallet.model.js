const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
        default: [],
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

const Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;
