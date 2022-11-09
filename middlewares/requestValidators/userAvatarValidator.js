const { celebrate, Joi } = require('celebrate');

const URL_REGEXP = require('../../utils/urlRegexp');

module.exports = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URL_REGEXP).required(),
  }).unknown(true),
});
