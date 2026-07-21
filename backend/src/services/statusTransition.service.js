const Ticket = require('../models/Ticket');
const AppError = require('../utils/AppError');
const { isValidObjectId } = require('../utils/objectId');
const {
  VALID_TRANSITIONS,
  isValidTransition,
} = require('../utils/statusTransitions');
const { formatTicket } = require('./ticket.service');

const { STATUSES } = Ticket;

/**
 * Returns valid next statuses for a given current status.
 */
function getAllowedTransitions(fromStatus) {
  return VALID_TRANSITIONS[fromStatus] || [];
}

/**
 * Validates a status transition. Throws AppError on invalid input or transition.
 */
function validateTransition(fromStatus, toStatus) {
  if (!STATUSES.includes(toStatus)) {
    throw new AppError('Validation failed', 400, [
      { field: 'status', message: 'Invalid status value' },
    ]);
  }

  if (!STATUSES.includes(fromStatus)) {
    throw new AppError('Validation failed', 400, [
      { field: 'status', message: 'Invalid current status' },
    ]);
  }

  if (!isValidTransition(fromStatus, toStatus)) {
    throw new AppError(
      `Invalid status transition from '${fromStatus}' to '${toStatus}'`,
      400
    );
  }
}

/**
 * Applies a status transition to a ticket.
 * Same-status requests are treated as a no-op and return the current ticket.
 */
async function transitionTicketStatus(ticketId, newStatus) {
  if (!isValidObjectId(ticketId)) {
    throw new AppError('Invalid ID format', 400);
  }

  if (newStatus === undefined || newStatus === null || newStatus === '') {
    throw new AppError('Validation failed', 400, [
      { field: 'status', message: 'status is required' },
    ]);
  }

  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new AppError('Ticket not found', 404);
  }

  validateTransition(ticket.status, newStatus);

  if (ticket.status !== newStatus) {
    ticket.status = newStatus;
    await ticket.save();
  }

  const populated = await Ticket.findById(ticketId)
    .populate('createdBy', 'name')
    .populate('assignedTo', 'name');

  return formatTicket(populated);
}

module.exports = {
  VALID_TRANSITIONS,
  isValidTransition,
  getAllowedTransitions,
  validateTransition,
  transitionTicketStatus,
};
