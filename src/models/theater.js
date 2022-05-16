const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema(
  {
    theaterName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Theater", theaterSchema);
