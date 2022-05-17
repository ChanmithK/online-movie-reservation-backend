const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    showStatus: {
      type: String,
      required: true,
      default: "Now Showing",
    },
    moviePictures: [
      {
        img: {
          type: String,
        },
      },
    ],

    category: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
