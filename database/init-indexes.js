/**
 * MongoDB index initialization script.
 * Run: npm run db:init (from backend/)
 *
 * Requires MONGODB_URI in environment (or defaults to local).
 */
const mongoose = require('mongoose');

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/support_tickets';

async function initIndexes() {
  await mongoose.connect(MONGODB_URI);

  const db = mongoose.connection.db;

  await db.collection('users').createIndex({ email: 1 }, { unique: true });

  await db.collection('tickets').createIndexes([
    { key: { status: 1 } },
    { key: { createdBy: 1 } },
    { key: { assignedTo: 1 } },
    { key: { title: 'text', description: 'text' } },
  ]);

  await db.collection('comments').createIndex({ ticketId: 1 });

  console.log('Indexes created successfully.');
  await mongoose.disconnect();
}

initIndexes().catch((err) => {
  console.error('Failed to create indexes:', err);
  process.exit(1);
});
