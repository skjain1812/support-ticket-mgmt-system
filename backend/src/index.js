require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.API_PORT || 3000;

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
