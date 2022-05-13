const slugify = require("slugify");
const Movie = require("../../models/movie");

exports.AddMovie = (req, res) => {
  const { movieName, description, category, price } = req.body;
  let moviePictures = [];

  if (req.files.length > 0) {
    moviePictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const movie = new Movie({
    movieName,
    slug: slugify(movieName),
    description,
    moviePictures,
    category,
    price,
    createdBy: req.user._id,
  });

  movie.save((error, movie) => {
    if (error) return res.status(400).json({ error });
    if (movie) {
      res.status(201).json({ movie });
    }
  });
};

// exports.getProductsBySlug = (req, res) => {
//   const { slug } = req.params;
//   Categoty.findOne({ slug: slug })
//     .select("_id ")
//     .exec((error, category) => {
//       if (error) {
//         return res.status(400).json({ error });
//       }

//       if (category) {
//         Product.find({ category: category._id }).exec((error, products) => {
//           if (error) {
//             return res.status(400).json({ error });
//           }

//           if (products.length > 0) {
//             res.status(200).json({
//               products,
//               productsByPrice: {
//                 under5k: products.filter((product) => product.price <= 5000),
//                 under10k: products.filter(
//                   (product) => product.price > 5000 && product.price <= 10000
//                 ),
//                 under15k: products.filter(
//                   (product) => product.price > 10000 && product.price <= 15000
//                 ),
//                 under20k: products.filter(
//                   (product) => product.price > 15000 && product.price <= 20000
//                 ),
//                 upper20k: products.filter((product) => product.price > 20000),
//               },
//             });
//           }
//         });
//       }
//     });
// };

exports.getMovies = (req, res) => {
  Movie.find({}).exec((error, movies) => {
    if (error) return res.status(400).json({ error });

    if (movies) {
      res.status(200).json({ moviesList });
    }
  });
};

exports.getMovieDetailsById = (req, res) => {
  const { movieId } = req.params;
  console.log(movieId);
  if (movieId) {
    Movie.findOne({ _id: movieId }).exec((error, movie) => {
      if (error) return res.status(400).json({ error });
      if (movie) {
        res.status(201).json({ movie });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};