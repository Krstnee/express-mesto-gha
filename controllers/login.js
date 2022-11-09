const jwt = require('jsonwebtoken');
const TOKEN_ENCRYPT_KEY = require('../utils/key');
const User = require('../models/user');
const DefaultError = require('../utils/errors/DefaultError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, TOKEN_ENCRYPT_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
      }).status(200).send(user);
    })
    .catch((err) => {
      if (err.statusCode) {
        next(err);
      } else {
        next(new DefaultError('Что-то пошло не так'));
      }
    });
};