// const mongoose = require('mongoose');

// const WalletSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     balance: {
//         type: Number,
//         required: true
//     },
//     type: {
//         type: String,
//         required: true
//     },
//     color: {
//         type: String,
//         required: true
//     },
//     transactionIds: {
//         type: [String],
//         default: [], // This sets an empty array as the default value for transactionIds
//     },
//     userId: {
//         type: String,
//         required: true
//     }
// });

// const Wallet = mongoose.model('Wallet', WalletSchema);

// module.exports = Wallet;

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
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;
