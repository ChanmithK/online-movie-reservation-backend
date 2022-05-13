const express = require("express");
const {
  TeamRegister,
  TeamLogin,
} = require("../../controllers/Production-Team/auth-controller");

const {
  isRequestValidated,
  validateRegisterRequest,
  validateLoginRequest,
} = require("../../validators/auth");
const router = express.Router();

router.post(
  "/admin/register",
  isRequestValidated,
  validateRegisterRequest,
  TeamRegister
);

router.post(
  "/admin/login",
  validateLoginRequest,
  isRequestValidated,
  TeamLogin
);

module.exports = router;
