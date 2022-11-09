const validator = require('validator');
const mongoose = require('mongoose');
const { findUserBeCredentials, urlValidatorConfig } = require('../utils/utils');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(v) {
          return validator.isURL(v, urlValidatorConfig);
        },
        message: 'Недопустимый формат ввода. Введите URL адрес',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) { return validator.isEmail(v); },
        message: 'Адрес электронной почты введен в неправильном формате',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      select: false,
    },
  },
  {
    toObject: { useProjection: true },
    toJSON: { useProjection: true },
  },
);

userSchema.statics.findUserByCredentials = findUserBeCredentials;

module.exports = mongoose.model('user', userSchema);