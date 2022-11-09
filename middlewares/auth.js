const jwt = require('jsonwebtoken');
const TOKEN_ENCRYPT_KEY = require('../utils/key');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, TOKEN_ENCRYPT_KEY);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = { _id: payload._id };
  return next();
};
