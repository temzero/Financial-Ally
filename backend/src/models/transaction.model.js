const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['savings', 'checking', 'credit'],
    required: true,
  },
  amount: {
    type: Number,
    required: true
  }
});

// Add methods or middleware if needed

module.exports = mongoose.model("Transactions", userSchema);
