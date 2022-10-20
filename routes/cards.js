const routerCards = require('express').Router();
const {
  getAllCards, createCard, removeCardById, likeCardById, unlikeCardById,
} = require('../controllers/cards');

routerCards.get('/cards', getAllCards);

routerCards.post('/cards', createCard);

routerCards.delete('/cards/:cardId', removeCardById);

routerCards.put('/cards/:cardId/likes', likeCardById);

routerCards.delete('/cards/:cardId/likes', unlikeCardById);

module.exports = routerCards;
