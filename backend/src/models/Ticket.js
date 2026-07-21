const mongoose = require('mongoose');

const PRIORITIES = ['low', 'medium', 'high', 'critical'];
const STATUSES = ['open', 'in_progress', 'resolved', 'closed', 'cancelled'];

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 200, trim: true },
    description: { type: String, default: '', trim: true, maxlength: 5000 },
    priority: {
      type: String,
      enum: PRIORITIES,
      default: 'medium',
    },
    status: {
      type: String,
      enum: STATUSES,
      default: 'open',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        if (ret.assignedTo && typeof ret.assignedTo === 'object') {
          ret.assignedTo = ret.assignedTo._id
            ? ret.assignedTo._id.toString()
            : ret.assignedTo.toString();
        } else if (ret.assignedTo) {
          ret.assignedTo = ret.assignedTo.toString();
        }
        if (ret.createdBy && typeof ret.createdBy === 'object') {
          ret.createdBy = ret.createdBy._id
            ? ret.createdBy._id.toString()
            : ret.createdBy.toString();
        } else if (ret.createdBy) {
          ret.createdBy = ret.createdBy.toString();
        }
        return ret;
      },
    },
  }
);

ticketSchema.index({ status: 1 });
ticketSchema.index({ createdBy: 1 });
ticketSchema.index({ assignedTo: 1 });
ticketSchema.index({ title: 'text', description: 'text' });

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
module.exports.PRIORITIES = PRIORITIES;
module.exports.STATUSES = STATUSES;
