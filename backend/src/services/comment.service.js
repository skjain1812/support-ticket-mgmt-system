const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Comment = require('../models/Comment');
const AppError = require('../utils/AppError');
const { isValidObjectId } = require('../utils/objectId');
const { formatComment } = require('./ticket.service');

async function addComment(ticketId, data) {
  if (!isValidObjectId(ticketId)) {
    throw new AppError('Invalid ID format', 400);
  }

  const details = [];
  const message = data.message?.trim();

  if (!message) {
    details.push({ field: 'message', message: 'Message is required' });
  }

  if (!data.createdBy) {
    details.push({ field: 'createdBy', message: 'createdBy is required' });
  } else if (!isValidObjectId(data.createdBy)) {
    details.push({ field: 'createdBy', message: 'Invalid user ID' });
  }

  if (details.length > 0) {
    throw new AppError('Validation failed', 400, details);
  }

  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    throw new AppError('Ticket not found', 404);
  }

  const user = await User.findById(data.createdBy);
  if (!user) {
    throw new AppError('Validation failed', 400, [
      { field: 'createdBy', message: 'User not found' },
    ]);
  }

  const comment = await Comment.create({
    ticketId,
    message,
    createdBy: data.createdBy,
  });

  const populated = await Comment.findById(comment._id).populate(
    'createdBy',
    'name'
  );

  return formatComment(populated);
}

module.exports = {
  addComment,
};
