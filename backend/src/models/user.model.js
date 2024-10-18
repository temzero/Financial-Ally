const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    firstName: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return !/\s/.test(v); // Check if there is no space in the name
        },
        message: "First name must be one word only",
      },
    },
    lastName: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return !/\s/.test(v); // Check if there is no space in the name
        },
        message: "Last name must be one word only",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Add methods or middleware if needed

module.exports = mongoose.model("User", userSchema);
