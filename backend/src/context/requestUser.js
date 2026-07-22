const AppError = require('../utils/AppError');
const { isValidObjectId } = require('../utils/objectId');

/** HTTP header for request-scoped actor identity (Core prep for Stretch auth). */
const USER_ID_HEADER = 'x-user-id';

/**
 * Resolves the acting user ID for write operations.
 * Header is authoritative when present; body.createdBy is fallback for Core (seed-user dropdown).
 * Rejects mismatched header vs body to prevent identity spoofing when header is set.
 */
function resolveActorUserId(req, body = {}) {
  const headerId = req.get(USER_ID_HEADER);
  const bodyId = body.createdBy;

  if (headerId) {
    if (!isValidObjectId(headerId)) {
      throw new AppError('Validation failed', 400, [
        { field: 'createdBy', message: 'Invalid request user ID' },
      ]);
    }

    if (bodyId && String(bodyId) !== String(headerId)) {
      throw new AppError('Validation failed', 400, [
        {
          field: 'createdBy',
          message: 'createdBy does not match request user context',
        },
      ]);
    }

    return headerId;
  }

  return bodyId;
}

module.exports = {
  USER_ID_HEADER,
  resolveActorUserId,
};
