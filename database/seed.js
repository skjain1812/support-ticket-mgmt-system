/**
 * MongoDB seed script.
 * Run: npm run seed (from backend/)
 *
 * Requires Mongoose models in backend/src/models/.
 * Clears existing data and inserts sample users, tickets, and comments.
 */
const mongoose = require('mongoose');

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/support_tickets';

// Inline schemas for seed script (models may also live in backend/src/models/)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'agent' },
});

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 200 },
    description: { type: String, default: '' },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed', 'cancelled'],
      default: 'open',
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
    message: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const User = mongoose.model('User', userSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);
const Comment = mongoose.model('Comment', commentSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);

  await Comment.deleteMany({});
  await Ticket.deleteMany({});
  await User.deleteMany({});

  const alice = await User.create({
    name: 'Alice Agent',
    email: 'alice@example.com',
    role: 'agent',
  });
  const bob = await User.create({
    name: 'Bob Agent',
    email: 'bob@example.com',
    role: 'agent',
  });
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  });

  const ticket1 = await Ticket.create({
    title: 'Cannot reset password',
    description: 'User reports password reset email not arriving.',
    priority: 'high',
    status: 'open',
    createdBy: alice._id,
    assignedTo: bob._id,
  });

  const ticket2 = await Ticket.create({
    title: 'Slow dashboard load',
    description: 'Dashboard takes 10+ seconds to render.',
    priority: 'medium',
    status: 'in_progress',
    createdBy: admin._id,
    assignedTo: alice._id,
  });

  const ticket3 = await Ticket.create({
    title: 'Feature request: dark mode',
    description: 'Multiple users requested a dark theme.',
    priority: 'low',
    status: 'resolved',
    createdBy: bob._id,
    assignedTo: null,
  });

  await Comment.create({
    ticketId: ticket1._id,
    message: 'Investigating email delivery logs.',
    createdBy: bob._id,
  });

  await Comment.create({
    ticketId: ticket1._id,
    message: 'Found SMTP timeout — escalating to infra team.',
    createdBy: alice._id,
  });

  await Comment.create({
    ticketId: ticket2._id,
    message: 'Profiling API response times.',
    createdBy: alice._id,
  });

  console.log('Seed data inserted: 3 users, 3 tickets, 3 comments.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
