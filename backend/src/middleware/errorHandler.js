const AppError = require('../utils/AppError');

function formatDuplicateKeyError(err) {
  const field = Object.keys(err.keyValue || err.keyPattern || {})[0];
  const details = field
    ? [{ field, message: `${field} already exists` }]
    : [];

  return {
    statusCode: 400,
    message: 'Duplicate value',
    details,
  };
}

function formatValidationError(err) {
  return {
    statusCode: 400,
    message: 'Validation failed',
    details: Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    })),
  };
}

function normalizeError(err) {
  if (err instanceof AppError) {
    return {
      statusCode: err.statusCode,
      message: err.message,
      details: err.details || [],
      log: false,
    };
  }

  if (err.name === 'CastError') {
    return {
      statusCode: 400,
      message: 'Invalid ID format',
      details: [],
      log: false,
    };
  }

  if (err.name === 'ValidationError') {
    return { ...formatValidationError(err), log: false };
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return {
      statusCode: 400,
      message: 'Invalid JSON in request body',
      details: [],
      log: false,
    };
  }

  if (err.code === 11000) {
    return { ...formatDuplicateKeyError(err), log: false };
  }

  return {
    statusCode: err.statusCode || 500,
    message: 'Internal server error',
    details: [],
    log: true,
  };
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const { statusCode, message, details, log } = normalizeError(err);

  if (log) {
    console.error(err);
  }

  res.status(statusCode).json({
    error: message,
    details,
  });
}

module.exports = errorHandler;
