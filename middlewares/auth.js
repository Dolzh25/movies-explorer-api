const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const config = require('../utils/config');
const { errorMessages } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError(errorMessages.authorizationErrorMessageJWT);
  }

  let payload;

  try {
    payload = jwt.verify(token, config.jwt_secret);
  } catch (error) {
    next(new UnauthorizedError(errorMessages.authorizationErrorMessageJWT));
  }

  req.user = payload;

  next();
};
