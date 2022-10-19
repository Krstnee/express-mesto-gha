const mongoose = require('mongoose');

function errorHandler(err) {
  if (err instanceof mongoose.Error.ValidationError) {
    return {
      response: { message: `Проверьте правильность введённых данных (${err.message})` },
      statusCode: 400,
    };
  }
  if (err instanceof mongoose.Error.CastError) {
    return {
      response: { message: `По вашему запросу ничего не найдено (${err.message})` },
      statusCode: 404,
    };
  }
  return {
    response: { message: `Ошибка по умолчанию (${err})` },
    statusCode: 500,
  };
}

module.exports = errorHandler;
