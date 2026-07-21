const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Comment = require('../models/Comment');
const AppError = require('../utils/AppError');
const { isValidObjectId } = require('../utils/objectId');

const { PRIORITIES, STATUSES } = Ticket;

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function formatTicket(ticket) {
  const createdBy =
    ticket.createdBy && typeof ticket.createdBy === 'object'
      ? ticket.createdBy._id.toString()
      : ticket.createdBy?.toString() || null;

  const assignedTo =
    ticket.assignedTo && typeof ticket.assignedTo === 'object'
      ? ticket.assignedTo._id.toString()
      : ticket.assignedTo?.toString() || null;

  return {
    id: ticket._id.toString(),
    title: ticket.title,
    description: ticket.description,
    priority: ticket.priority,
    status: ticket.status,
    assignedTo,
    assignedToName:
      ticket.assignedTo && typeof ticket.assignedTo === 'object'
        ? ticket.assignedTo.name
        : null,
    createdBy,
    createdByName:
      ticket.createdBy && typeof ticket.createdBy === 'object'
        ? ticket.createdBy.name
        : null,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
  };
}

function formatComment(comment) {
  const createdBy =
    comment.createdBy && typeof comment.createdBy === 'object'
      ? comment.createdBy._id.toString()
      : comment.createdBy?.toString() || null;

  return {
    id: comment._id.toString(),
    ticketId:
      comment.ticketId && typeof comment.ticketId === 'object'
        ? comment.ticketId._id
          ? comment.ticketId._id.toString()
          : comment.ticketId.toString()
        : comment.ticketId?.toString() || null,
    message: comment.message,
    createdBy,
    createdByName:
      comment.createdBy && typeof comment.createdBy === 'object'
        ? comment.createdBy.name
        : null,
    createdAt: comment.createdAt,
  };
}

async function createTicket(data) {
  const details = [];
  const title = data.title?.trim();

  if (!title) {
    details.push({ field: 'title', message: 'Title is required' });
  } else if (title.length > 200) {
    details.push({ field: 'title', message: 'Title must not exceed 200 characters' });
  }

  if (!data.createdBy) {
    details.push({ field: 'createdBy', message: 'createdBy is required' });
  } else if (!isValidObjectId(data.createdBy)) {
    details.push({ field: 'createdBy', message: 'Invalid user ID' });
  }

  const priority = data.priority || 'medium';
  if (!PRIORITIES.includes(priority)) {
    details.push({ field: 'priority', message: 'Invalid priority value' });
  }

  const hasAssignee =
    data.assignedTo !== undefined &&
    data.assignedTo !== null &&
    data.assignedTo !== '';

  if (hasAssignee && !isValidObjectId(data.assignedTo)) {
    details.push({ field: 'assignedTo', message: 'Invalid user ID' });
  }

  if (details.length > 0) {
    throw new AppError('Validation failed', 400, details);
  }

  const createdByUser = await User.findById(data.createdBy);
  if (!createdByUser) {
    throw new AppError('Validation failed', 400, [
      { field: 'createdBy', message: 'User not found' },
    ]);
  }

  let assignedTo = null;
  if (hasAssignee) {
    const assignee = await User.findById(data.assignedTo);
    if (!assignee) {
      throw new AppError('Validation failed', 400, [
        { field: 'assignedTo', message: 'User not found' },
      ]);
    }
    assignedTo = data.assignedTo;
  }

  const ticket = await Ticket.create({
    title,
    description: data.description?.trim() || '',
    priority,
    status: 'open',
    createdBy: data.createdBy,
    assignedTo,
  });

  const populated = await Ticket.findById(ticket._id)
    .populate('createdBy', 'name')
    .populate('assignedTo', 'name');

  return formatTicket(populated);
}

async function listTickets({ search, status } = {}) {
  const query = {};

  if (status) {
    if (!STATUSES.includes(status)) {
      throw new AppError('Validation failed', 400, [
        { field: 'status', message: 'Invalid status value' },
      ]);
    }
    query.status = status;
  }

  const searchTerm = search?.trim();
  if (searchTerm) {
    const pattern = new RegExp(escapeRegex(searchTerm), 'i');
    query.$or = [{ title: pattern }, { description: pattern }];
  }

  const tickets = await Ticket.find(query)
    .populate('createdBy', 'name')
    .populate('assignedTo', 'name')
    .sort({ updatedAt: -1 });

  return {
    data: tickets.map(formatTicket),
  };
}

async function getTicketById(id) {
  if (!isValidObjectId(id)) {
    throw new AppError('Invalid ID format', 400);
  }

  const ticket = await Ticket.findById(id)
    .populate('createdBy', 'name')
    .populate('assignedTo', 'name');

  if (!ticket) {
    throw new AppError('Ticket not found', 404);
  }

  const comments = await Comment.find({ ticketId: id })
    .populate('createdBy', 'name')
    .sort({ createdAt: 1 });

  return {
    ...formatTicket(ticket),
    comments: comments.map(formatComment),
  };
}

async function updateTicket(id, data) {
  if (!isValidObjectId(id)) {
    throw new AppError('Invalid ID format', 400);
  }

  if (data.status !== undefined) {
    throw new AppError('Validation failed', 400, [
      {
        field: 'status',
        message: 'Use PATCH /tickets/:id/status to change status',
      },
    ]);
  }

  const details = [];
  const updates = {};

  if (data.title !== undefined) {
    const title = data.title?.trim();
    if (!title) {
      details.push({ field: 'title', message: 'Title is required' });
    } else if (title.length > 200) {
      details.push({ field: 'title', message: 'Title must not exceed 200 characters' });
    } else {
      updates.title = title;
    }
  }

  if (data.description !== undefined) {
    updates.description = data.description?.trim() || '';
  }

  if (data.priority !== undefined) {
    if (!PRIORITIES.includes(data.priority)) {
      details.push({ field: 'priority', message: 'Invalid priority value' });
    } else {
      updates.priority = data.priority;
    }
  }

  if (data.assignedTo !== undefined) {
    if (data.assignedTo === null || data.assignedTo === '') {
      updates.assignedTo = null;
    } else if (!isValidObjectId(data.assignedTo)) {
      details.push({ field: 'assignedTo', message: 'Invalid user ID' });
    } else {
      const assignee = await User.findById(data.assignedTo);
      if (!assignee) {
        details.push({ field: 'assignedTo', message: 'User not found' });
      } else {
        updates.assignedTo = data.assignedTo;
      }
    }
  }

  if (details.length > 0) {
    throw new AppError('Validation failed', 400, details);
  }

  let ticket;

  if (Object.keys(updates).length === 0) {
    ticket = await Ticket.findById(id)
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name');
  } else {
    ticket = await Ticket.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name');
  }

  if (!ticket) {
    throw new AppError('Ticket not found', 404);
  }

  return formatTicket(ticket);
}

module.exports = {
  createTicket,
  listTickets,
  getTicketById,
  updateTicket,
  formatTicket,
  formatComment,
};
