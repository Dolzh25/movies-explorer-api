const moviesRouters = require('express').Router();
const { validateAddMovieToFavorite, validateRemoveMovieFromFavorite } = require('../middlewares/validate');
const {
  getAllMovies,
  addMovieToFavorite,
  removeMovieFromFavorite,
} = require('../controllers/movies');

moviesRouters.get('/', getAllMovies);
moviesRouters.post('/', validateAddMovieToFavorite, addMovieToFavorite);
moviesRouters.delete('/:movieId', validateRemoveMovieFromFavorite, removeMovieFromFavorite);

module.exports = moviesRouters;
