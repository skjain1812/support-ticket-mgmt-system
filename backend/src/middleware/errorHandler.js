const AppError = require('../utils/AppError');

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let details = err.details || [];

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
    details = [];
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate value';
    details = [];
  }

  if (!(err instanceof AppError) && statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    error: message,
    details,
  });
}

module.exports = errorHandler;
