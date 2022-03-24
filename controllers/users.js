const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const UnauthorizedError = require('../errors/unauthorizedError');
const ConflictError = require('../errors/conflictError');
const config = require('../utils/config');
const { errorMessages } = require('../utils/constants');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(200).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessages.validationErrorMessage));
      }
    })
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError(errorMessages.emailConflictErrorMessage));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        config.jwt_secret,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24,
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: 'Пользователь авторизован' });
    })
    .catch(() => {
      next(new UnauthorizedError(errorMessages.authorizationErrorMessageLogin));
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(errorMessages.notFoundUserErrorMessage));
      }
      res.send(user);
    })
    .catch((err) => {
      next(new NotFoundError(err.message));
    });
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictError(errorMessages.emailConflictErrorMessage));
      }
    })
    .then(() => {
      User.findByIdAndUpdate(req.user._id, { email, name })
        .then((user) => {
          if (user) {
            res.send(user);
          }
          return next(new NotFoundError(errorMessages.notFoundUserErrorMessage));
        })
        .catch((err) => {
          if (err.name === 'ValidationError' || err.name === 'CastError') {
            next(new BadRequestError(errorMessages.validationErrorMessage));
          } else if (err.statusCode === 404) {
            next(new NotFoundError(err.message));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUserInfo,
  updateUserInfo,
};
