const mongoose = require('mongoose');

const User = require('../models/user');

const patchRequestOptions = require('../utils/utils');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUserById = (req, res) => {
  if (req.params.userId.length !== 24) {
    res.status(400).send({ message: 'Проверьте правильность запрашиваемых данных' });
    return;
  }
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь с такими данными не найден' });
      } else { res.send(user); }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: 'По вашему запросу ничего не найдено' });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Проверьте правильность введённых данных' });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, patchRequestOptions)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователя с такими данными не существует' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Проверьте правильность введённых данных' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: 'По вашему запросу ничего не найдено' });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, patchRequestOptions)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователя с такими данными не существует' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Проверьте правильность введённых данных' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: 'По вашему запросу ничего не найдено' });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
