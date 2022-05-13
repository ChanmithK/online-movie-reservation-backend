const express = require("express");
const { Register, Login } = require("../controllers/auth-controller");

const {
  isRequestValidated,
  validateRegisterRequest,
  validateLoginRequest,
} = require("../validators/auth");
const router = express.Router();

router.post(
  "/user/register",
  isRequestValidated,
  validateRegisterRequest,
  Register
);

router.post("/user/login", validateLoginRequest, isRequestValidated, Login);

module.exports = router;
