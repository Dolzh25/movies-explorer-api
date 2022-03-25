const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const { errorMessages, serverMessages } = require('../utils/constants');

const getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const addMovieToFavorite = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    trailer,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    trailer,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(errorMessages.validationUrlErrorMessage);
      }
      next(err);
    })
    .catch(next);
};

const removeMovieFromFavorite = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findOne({
    owner: req.user._id,
    movieId,
  })
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(errorMessages.notFoundErrorDBMessage));
        return;
      }
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError(errorMessages.forbiddenErrorMessage));
      } else {
        Movie.deleteOne(movie)
          .then(() => {
            res.send({
              message: serverMessages.removeMovieSuccess,
            });
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getAllMovies,
  addMovieToFavorite,
  removeMovieFromFavorite,
};
