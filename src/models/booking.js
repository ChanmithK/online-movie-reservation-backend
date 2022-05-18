const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const bookingSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
    },
    noOfSeats: {
      type: Number,
      default: 0,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    qrCode: {
      type: String,
    },
    theater: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
