const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

exports.Register = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered !",
      });

    const { firstName, lastName, email, phone, password, re_hash_password } =
      req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const user_ = new User({
      firstName,
      lastName,
      email,
      phone,
      hash_password,
      re_hash_password,
    });

    user_.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong !",
          error: error,
        });
      }

      if (data) {
        return res.status(201).json({
          message: "User Created successfully!",
        });
      }
    });
  });
};

exports.Login = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        const { _id, firstName, lastName, email, phone } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, phone },
        });
      } else {
        return res.status(400).json({
          message: "Something went wrong !!",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong !!" });
    }
  });
};
