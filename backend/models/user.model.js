const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    balance: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Add methods or middleware if needed

module.exports = mongoose.model('User', userSchema);