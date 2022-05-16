const slugify = require("slugify");
const Theater = require("../../models/theater");

exports.AddTheater = (req, res) => {
  const { theaterName } = req.body;

  const theater = new Theater({
    theaterName,
  });

  theater.save((error, theater) => {
    if (error) return res.status(400).json({ error });
    if (theater) {
      res.status(201).json({ theater });
    }
  });
};

exports.GetAllTheaters = (req, res) => {
  Theater.find({}).exec((error, theaters) => {
    if (error) return res.status(400).json({ error });

    if (theaters) {
      res.status(200).json({
        theaters,
      });
    }
  });
};

// exports.AddTheater = (req, res) => {
//   Cart.findOne({ theaterName: req.body.theaterName }).exec((error, cart) => {
//     if (error) return res.status(400).json({ error });
//     if (cart) {
//       //if cart already exists then update cart by quantity

//       const _movie = req.body.cartItems.movie;
//       const cartMovie = cart.cartItems.find((c) => c.movie == _movie);

//       let condition, update;
//       if (cartMovie) {
//         condition = { user: req.user._id, "cartItems.movie": _movie };
//         update = {
//           $set: {
//             "cartItems.$": {
//               //This .$ is use to update relavnt item relavant quantity
//               ...req.body.cartItems,
//               // quantity: cartMovie.quantity + req.body.cartItems.quantity
//             },
//           },
//         };
//       } else {
//         condition = { user: req.user._id };
//         update = {
//           $push: {
//             cartItems: req.body.cartItems,
//           },
//         };
//       }
//       Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
//         if (error) return res.status(400).json({ error });
//         if (_cart) {
//           return res.status(201).json({ cart: _cart });
//         }
//       });
//     } else {
//       //if cart not exists then create a new cart
//       const cart = new Cart({
//         user: req.user._id,
//         cartItems: [req.body.cartItems],
//       });

//       cart.save((error, cart) => {
//         if (error) return res.status(400).json({ error });
//         if (cart) {
//           res.status(201).json({ cart });
//         }
//       });
//     }
//   });
// };
