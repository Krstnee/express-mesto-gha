module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send(statusCode !== 500 ? { message } : { message: 'Что -то пошло не так' });
  next();
};
