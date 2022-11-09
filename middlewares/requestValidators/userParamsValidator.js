const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});
