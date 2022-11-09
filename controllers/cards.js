const mongoose = require('mongoose');
const DefaultError = require('../utils/errors/DefaultError');
const ValidationError = require('../utils/errors/ValidationError');
const NotFoundError = require('../utils/errors/NotFoundError');
const NotAllowedError = require('../utils/errors/NotAllowedError');

const Card = require('../models/card');

const { patchRequestOptions } = require('../utils/utils');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => next(new DefaultError('На сервере произошла ошибка')));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({
    name, link, owner: _id, likes: [], createdAt: new Date(),
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.statusCode) {
        next(err);
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Проверьте правильность введённых данных'));
        return;
      }
      next(new DefaultError('На сервере произошла ошибка'));
    });
};

module.exports.removeCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      } else if (req.user._id !== card.owner._id.toString()) {
        throw new NotAllowedError('у вас нет прав на удаление этой карточки');
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => { res.send(card); })
          .catch((err) => {
            if (err.statusCode) {
              next(err);
            } else { next(new DefaultError('Что-то пошло не так')); }
          });
      }
    })
    .catch((err) => {
      if (err.statusCode) {
        next(err);
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new NotFoundError('По вашему запросу ничего не найдено'));
        return;
      }
      next(new DefaultError('Ошибка по умолчанию'));
    });
};

module.exports.likeCardById = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    patchRequestOptions,
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Вы обращаетесь к несуществующей карточке');
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.statusCode) {
        next(err);
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Проверьте правильность введённых данных'));
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('По вашему запросу ничего не найдено'));
        return;
      }
      next(new DefaultError('На сервере произошла ошибка'));
    });
};

module.exports.unlikeCardById = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    patchRequestOptions,
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Вы обращаетесь к несуществующей карточке');
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.statusCode) {
        next(err);
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Проверьте правильность введённых данных'));
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('По вашему запросу ничего не найдено'));
        return;
      }
      next(new DefaultError('На сервере произошла ошибка'));
    });
};