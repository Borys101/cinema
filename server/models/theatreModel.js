const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
=======
>>>>>>> my-recovered-branch
  },
  { timestamps: true }
);

module.exports = mongoose.model("theatres", theatreSchema);