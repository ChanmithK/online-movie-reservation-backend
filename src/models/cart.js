const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        booking: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Booking",
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
