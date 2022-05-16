const Cart = require("../models/cart");
exports.addBookingToCart = (req, res) => {
  //One user can have only one cart. So one cart has different cartItems.
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      //if cart already exists then update cart by quantity

      const _movie = req.body.cartItems.movie;
      const cartMovie = cart.cartItems.find((c) => c.movie == _movie);

      let condition, update;
      if (cartMovie) {
        condition = { user: req.user._id, "cartItems.movie": _movie };
        update = {
          $set: {
            "cartItems.$": {
              //This .$ is use to update relavnt item relavant quantity
              ...req.body.cartItems,
              // quantity: cartMovie.quantity + req.body.cartItems.quantity
            },
          },
        };
      } else {
        condition = { user: req.user._id };
        update = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
      }
      Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
        if (error) return res.status(400).json({ error });
        if (_cart) {
          return res.status(201).json({ cart: _cart });
        }
      });
    } else {
      //if cart not exists then create a new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          res.status(201).json({ cart });
        }
      });
    }
  });
};

exports.getCartItems = (req, res) => {
  Cart.find({ user: req.user._id })
    .populate("cartItems.movie", "_id movieName price")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });

      if (cart) {
        res.status(200).json({ cartItems: cart });
      }
    });

  //}
};

exports.removeCartItems = (req, res) => {
  const id = req.body.id;

  console.log(id);

  if (id) {
    Cart.updateOne(
      { user: req.user._id },

      {
        $pull: {
          cartItems: {
            _id: id,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });

      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};
