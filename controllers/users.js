const mongoose = require('mongoose');
const User = require('../models/user');
const patchRequestOptions = require('../utils/utils');
const errors = require('../utils/errors');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(errors.ERROR_CODE500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(errors.ERROR_CODE404).send({ message: 'Пользователь с такими данными не найден' });
      } else { res.send(user); }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(errors.ERROR_CODE400).send({ message: 'По вашему запросу ничего не найдено ' });
        return;
      }
      res.status(errors.ERROR_CODE500).send({ message: 'Ошибка по умолчанию' });
    });
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(errors.ERROR_CODE400).send({ message: 'Проверьте правильность введённых данных' });
        return;
      }
      res.status(errors.ERROR_CODE500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, patchRequestOptions)
    .then((user) => {
      if (!user) {
        res.status(errors.ERROR_CODE404).send({ message: 'Пользователя с такими данными не существует' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(errors.ERROR_CODE400).send({ message: 'По вашему запросу ничего не найдено или введен неправильный id' });
        return;
      }
      res.status(errors.ERROR_CODE500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, patchRequestOptions)
    .then((user) => {
      if (!user) {
        res.status(errors.ERROR_CODE404).send({ message: 'Пользователя с такими данными не существует' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(errors.ERROR_CODE400).send({ message: 'По вашему запросу ничего не найдено или введен неправильный id' });
        return;
      }
      res.status(errors.ERROR_CODE500).send({ message: 'Ошибка по умолчанию' });
    });
};
