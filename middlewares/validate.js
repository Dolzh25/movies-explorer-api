const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { errorMessages } = require('../utils/constants');

const isUrlCustomValidator = (value, helpers) => (
  validator.isURL(value) ? value : helpers.message(errorMessages.validationUrlErrorMessage)
);

module.exports.validateAddMovieToFavorite = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(isUrlCustomValidator),
    trailer: Joi.string().required().custom(isUrlCustomValidator),
    thumbnail: Joi.string().required().custom(isUrlCustomValidator),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

module.exports.validateRemoveMovieFromFavorite = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string(),
  }),
});

module.exports.validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
