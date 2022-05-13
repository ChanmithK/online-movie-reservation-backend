const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
      trim: true,
      min: 3,
      max: 30,
    },

    lastName: {
      type: String,
      required: false,
      trim: true,
      min: 3,
      max: 30,
    },

    phone: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: false,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },

    re_hash_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//This is created to compare the password(DB password and user enterd password)
userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
