const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const config = require('../utils/config');
const { errorMessages } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(errorMessages.authorizationErrorMessageJWT));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, config.jwt_secret);
  } catch (error) {
    next(new UnauthorizedError(errorMessages.authorizationErrorMessageJWT));
  }

  req.user = payload;

  next();
};
