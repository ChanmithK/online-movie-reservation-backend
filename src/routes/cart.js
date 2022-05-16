const express = require("express");
const { requireSignin } = require("../common-middleware");
const {
  addBookingToCart,
  getCartItems,
  removeCartItems,
} = require("../controllers/cart-controller");
const router = express.Router();

router.post("/user/cart/addtocard", requireSignin, addBookingToCart);
router.get("/user/cart/getCartItems", requireSignin, getCartItems);
router.post("/user/cart/removeCartItems", requireSignin, removeCartItems);

module.exports = router;
