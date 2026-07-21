/**
 * MongoDB index initialization script.
 * Run: npm run db:init (from backend/)
 *
 * Syncs indexes defined on Mongoose models in backend/src/models/.
 */
const { loadEnv, loadMongoose, loadModels, getMongoUri } = require('./dbScriptUtils');

loadEnv();

const mongoose = loadMongoose();
const { User, Ticket, Comment } = loadModels();

async function initIndexes() {
  await mongoose.connect(getMongoUri());

  const results = await Promise.all([
    User.syncIndexes(),
    Ticket.syncIndexes(),
    Comment.syncIndexes(),
  ]);

  console.log('Indexes synced successfully.');
  console.log('User indexes dropped:', results[0]);
  console.log('Ticket indexes dropped:', results[1]);
  console.log('Comment indexes dropped:', results[2]);

  const collections = ['users', 'tickets', 'comments'];
  for (const name of collections) {
    const indexes = await mongoose.connection.db.collection(name).indexes();
    console.log(`\n${name} indexes:`);
    indexes.forEach((index) => console.log(`  - ${index.name}:`, JSON.stringify(index.key)));
  }

  await mongoose.disconnect();
}

initIndexes().catch((err) => {
  console.error('Failed to create indexes:', err.message);
  process.exit(1);
});
