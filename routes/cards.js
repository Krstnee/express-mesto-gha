const routerCards = require('express').Router();
const {
  getAllCards, createCard, removeCardById, likeCardById, unlikeCardById,
} = require('../controllers/cards');

const cardBodyValidator = require('../middlewares/requestValidators/cardBodyValidator');
const cardParamsValidator = require('../middlewares/requestValidators/cardParamsValidator');

routerCards.get('/', getAllCards);

routerCards.post('/', cardBodyValidator, createCard);

routerCards.delete('/:cardId', cardParamsValidator, removeCardById);

routerCards.put('/:cardId/likes', cardParamsValidator, likeCardById);

routerCards.delete('/:cardId/likes', cardParamsValidator, unlikeCardById);

module.exports = routerCards;
