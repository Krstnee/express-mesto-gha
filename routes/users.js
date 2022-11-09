const routerUsers = require('express').Router();
const {
  getAllUsers, getUserById, updateProfile, updateAvatar, getMyProfile,
} = require('../controllers/users');

const userParamsValidator = require('../middlewares/requestValidators/userParamsValidator');
const userDataValidator = require('../middlewares/requestValidators/userDataValidator');
const userAvatarValidator = require('../middlewares/requestValidators/userAvatarValidator');

routerUsers.get('/', getAllUsers);

routerUsers.get('/me', getMyProfile);

routerUsers.get('/:userId', userParamsValidator, getUserById);

routerUsers.patch('/me', userDataValidator, updateProfile);

routerUsers.patch('/me/avatar', userAvatarValidator, updateAvatar);

module.exports = routerUsers;
