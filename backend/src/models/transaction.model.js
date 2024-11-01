const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  walletId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
  image: {
    type: String,
  },
  userId: { 
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Transactions", transactionSchema);
