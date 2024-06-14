const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
<<<<<<< HEAD
=======
    points: {
      type: Number,
      required: true,
      default: 0,
    }
>>>>>>> my-recovered-branch
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("users", userSchema);