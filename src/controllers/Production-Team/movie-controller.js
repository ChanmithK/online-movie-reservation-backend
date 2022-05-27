const slugify = require("slugify");
const Movie = require("../../models/movie");

//Admin Add movie controller
exports.AddMovie = (req, res) => {
  const { movieName, description, category, price, showStatus } = req.body;
  let moviePictures = [];

  if (req.files.length > 0) {
    moviePictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const movie = new Movie({
    movieName,
    // slug: slugify(movieName),
    description,
    moviePictures,
    category,
    price,
    showStatus,
    createdBy: req.user._id,
  });

  movie.save((error, movie) => {
    if (error) return res.status(400).json({ error });
    if (movie) {
      res.status(201).json({ movie });
    }
  });
};

//Admin get all movies controller
exports.getMovies = (req, res) => {
  Movie.find({}).exec((error, movies) => {
    if (error) return res.status(400).json({ error });

    if (movies) {
      res.status(200).json({
        movies,
        moviesByShowing: {
          nowShowing: movies.filter(
            (movie) => movie.showStatus == "Now Showing"
          ),
          commingSoonShowing: movies.filter(
            (movie) => movie.showStatus == "Coming Soon"
          ),
        },
      });
    }
  });
};

//Admin get relevant movie deatils by Id controller
exports.getMovieDetailsById = (req, res) => {
  const { movieId } = req.params;
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

//Admin Delete relevant Movie controller
exports.DeleteMovie = (req, res) => {
  const { movieId } = req.params;
  Movie.findOneAndDelete({ _id: movieId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Amin Update relevant Movie deatils controller
exports.UpdateMovie = (req, res) => {
  const { movieId } = req.body;
  console.log(req.body.movieName);
  if (movieId) {
    Movie.findOneAndUpdate(
      { _id: movieId },
      {
        movieName: req.body.movieName,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};
