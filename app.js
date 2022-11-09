const mongoose = require('mongoose');

const { errors } = require('celebrate');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const express = require('express');
const cookieParser = require('cookie-parser');
const userBodyValidator = require('./middlewares/requestValidators/userBodyValidator');
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./utils/errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.post('/signin', userBodyValidator, login);
app.post('/signup', userBodyValidator, createUser);

app.use(auth);
app.use('/cards', routerCards);
app.use('/users', routerUsers);
app.use('*', () => { throw new NotFoundError('По вашему запросу ничего не найдено'); });

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
