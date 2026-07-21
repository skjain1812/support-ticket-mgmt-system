/**
 * MongoDB seed script.
 * Run: npm run seed (from backend/)
 *
 * Seeds:
 * - 3 users (mix of roles)
 * - 5 tickets across all statuses
 * - 4 comments on multiple tickets
 */
const { loadEnv, loadMongoose, loadModels, getMongoUri } = require('./dbScriptUtils');

loadEnv();

const mongoose = loadMongoose();
const { User, Ticket, Comment } = loadModels();

const seedUsers = [
  { name: 'Alice Agent', email: 'alice@example.com', role: 'agent' },
  { name: 'Bob Agent', email: 'bob@example.com', role: 'agent' },
  { name: 'Admin User', email: 'admin@example.com', role: 'admin' },
];

async function seed() {
  await mongoose.connect(getMongoUri());

  await Comment.deleteMany({});
  await Ticket.deleteMany({});
  await User.deleteMany({});

  const [alice, bob, admin] = await User.insertMany(seedUsers);

  const tickets = await Ticket.insertMany([
    {
      title: 'Cannot reset password',
      description: 'User reports password reset email not arriving.',
      priority: 'high',
      status: 'open',
      createdBy: alice._id,
      assignedTo: bob._id,
    },
    {
      title: 'Slow dashboard load',
      description: 'Dashboard takes 10+ seconds to render on first login.',
      priority: 'medium',
      status: 'in_progress',
      createdBy: admin._id,
      assignedTo: alice._id,
    },
    {
      title: 'Feature request: dark mode',
      description: 'Multiple users requested a dark theme for the portal.',
      priority: 'low',
      status: 'resolved',
      createdBy: bob._id,
      assignedTo: alice._id,
    },
    {
      title: 'Billing page typo',
      description: 'Invoice summary shows "Amout Due" instead of "Amount Due".',
      priority: 'low',
      status: 'closed',
      createdBy: admin._id,
      assignedTo: bob._id,
    },
    {
      title: 'Duplicate ticket notifications',
      description: 'Agents receive the same alert email twice for one ticket.',
      priority: 'critical',
      status: 'cancelled',
      createdBy: alice._id,
      assignedTo: null,
    },
  ]);

  const [ticketOpen, ticketInProgress, ticketResolved] = tickets;

  await Comment.insertMany([
    {
      ticketId: ticketOpen._id,
      message: 'Investigating email delivery logs.',
      createdBy: bob._id,
    },
    {
      ticketId: ticketOpen._id,
      message: 'Found SMTP timeout — escalating to infra team.',
      createdBy: alice._id,
    },
    {
      ticketId: ticketInProgress._id,
      message: 'Profiling API response times on dashboard endpoints.',
      createdBy: alice._id,
    },
    {
      ticketId: ticketResolved._id,
      message: 'Dark mode mockups shared with product for review.',
      createdBy: bob._id,
    },
  ]);

  const userCount = await User.countDocuments();
  const ticketCount = await Ticket.countDocuments();
  const commentCount = await Comment.countDocuments();

  console.log('Seed completed successfully.');
  console.log(`Users: ${userCount}`);
  console.log(`Tickets: ${ticketCount}`);
  console.log(`Comments: ${commentCount}`);
  console.log('\nSample logins (seed users, no auth in Core):');
  seedUsers.forEach((user) => {
    console.log(`  - ${user.name} <${user.email}> (${user.role})`);
  });

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
