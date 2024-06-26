const express = require("express");
const { requireSignin } = require("../../common-middleware");
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const {
  AddMovie,
  getMovies,
  getMovieDetailsById,
  DeleteMovie,
  UpdateMovie,
} = require("../../controllers/Production-Team/movie-controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/admin/movie/add",
  requireSignin,
  upload.array("moviePicture"),
  AddMovie
);
router.get("/admin/movies", getMovies);
router.get("/admin/movies/:movieId", getMovieDetailsById);
router.delete("/admin/movies/delete/:movieId", DeleteMovie);
router.post("/admin/movies/update", UpdateMovie);

module.exports = router;
