const routerCards = require('express').Router();
const {
  getAllCards, getCardById, createCard, removeCardById, likeCardById, unlikeCardById,
} = require('../controllers/cards');

routerCards.get('/cards', getAllCards);

routerCards.get('/cards/:cardId', getCardById);

routerCards.post('/cards', createCard);

routerCards.delete('/cards/:cardId', removeCardById);

routerCards.put('/cards/:cardId/likes', likeCardById);

routerCards.delete('/cards/:cardId/likes', unlikeCardById);

module.exports = routerCards;