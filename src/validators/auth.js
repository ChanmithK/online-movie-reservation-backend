const { check, validationResult } = require("express-validator");
exports.validateRegisterRequest = [
  check("firstName").notEmpty().withMessage("FirstName is required"),
  check("lastName").notEmpty().withMessage("LastName is required"),
  check("email").isEmail().withMessage("Email is required"),
  check("phone").notEmpty().withMessage("Phone is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 character long"),
  check("re_hash_password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 character long"),
];

exports.validateLoginRequest = [
  check("email").isEmail().withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 character long"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
