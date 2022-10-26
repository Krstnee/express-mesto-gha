const mongoose = require('mongoose');

const Card = require('../models/card');

const patchRequestOptions = require('../utils/utils');

const errors = require('../utils/errors');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(errors.ERROR_CODE500).send({ message: 'Ошибка по умолчанию' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({
    name, link, owner: _id, likes: [], createdAt: new Date(),
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(errors.ERROR_CODE400).send({ message: 'Проверьте правильность введённых данных' });
        return;
      }
      res.status(errors.ERROR_CODE500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.removeCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(errors.ERROR_CODE404).send({ message: 'Такой карточки не существует' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(errors.ERROR_CODE400).send({ message: 'По вашему запросу ничего не найдено' });
        return;
      }
      res.status(errors.ERROR_CODE500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.likeCardById = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    patchRequestOptions,
  ).then((card) => {
    if (!card) {
      res.status(errors.ERROR_CODE404).send({ message: 'Вы обращаетесь к несуществующей карточке' });
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(errors.ERROR_CODE400).send({ message: 'Проверьте правильность введённых данных' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(errors.ERROR_CODE400).send({ message: 'По вашему запросу ничего не найдено' });
        return;
      }
      res.status(errors.ERROR_CODE500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.unlikeCardById = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    patchRequestOptions,
  ).then((card) => {
    if (!card) {
      res.status(errors.ERROR_CODE404).send({ message: 'Вы обращаетесь к несуществующей карточке' });
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(errors.ERROR_CODE400).send({ message: 'Проверьте правильность введённых данных' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(errors.ERROR_CODE400).send({ message: 'По вашему запросу ничего не найдено' });
        return;
      }
      res.status(errors.ERROR_CODE500).send({ message: 'Ошибка по умолчанию' });
    });
};
