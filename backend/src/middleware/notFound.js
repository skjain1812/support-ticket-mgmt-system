const AppError = require('../utils/AppError');

function notFoundHandler(req, res, next) {
  next(new AppError('Route not found', 404));
}

module.exports = notFoundHandler;
