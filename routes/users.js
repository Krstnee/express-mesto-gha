const routerUsers = require('express').Router();
const {
  getAllUsers, getUserById, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

routerUsers.get('/users', getAllUsers);

routerUsers.get('/users/:userId', getUserById);

routerUsers.post('/users', createUser);

routerUsers.patch('/users/me', updateProfile);

routerUsers.patch('/users/me/avatar', updateAvatar);

module.exports = routerUsers;