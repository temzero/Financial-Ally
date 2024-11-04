const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return !/\s/.test(v);
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
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
  },
  {
    timestamps: true,
  }
);

// Add methods or middleware if needed

module.exports = mongoose.model("users", userSchema);
