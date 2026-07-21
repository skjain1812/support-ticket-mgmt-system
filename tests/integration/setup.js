const path = require('path');
const { loadEnv } = require('../../database/dbScriptUtils');

loadEnv();

process.env.MONGODB_URI =
  process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/support_tickets_test';
