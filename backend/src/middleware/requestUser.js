const { resolveActorUserId } = require('../context/requestUser');

/**
 * Attaches req.actorUserId for routes that need request-scoped identity.
 * Optional — controllers may call resolveActorUserId directly on write handlers.
 */
function attachRequestUser(req, _res, next) {
  try {
    req.actorUserId = resolveActorUserId(req, req.body);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = attachRequestUser;
