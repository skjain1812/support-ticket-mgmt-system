const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        if (ret.ticketId) {
          ret.ticketId = ret.ticketId.toString();
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

commentSchema.index({ ticketId: 1 });
commentSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Comment', commentSchema);
