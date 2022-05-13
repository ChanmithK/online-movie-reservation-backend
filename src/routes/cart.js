const express = require("express");
const { requireSignin } = require("../common-middleware");
const { addBookingToCart } = require("../controllers/cart-controller");
const router = express.Router();

router.post("/user/cart/addtocard", requireSignin, addBookingToCart);

module.exports = router;
