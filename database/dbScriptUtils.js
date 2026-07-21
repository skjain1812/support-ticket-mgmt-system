/**
 * Shared helpers for database scripts in database/.
 */
const path = require('path');

const backendRoot = path.join(__dirname, '../backend');

function loadEnv() {
  require(require.resolve('dotenv', { paths: [backendRoot] })).config({
    path: path.join(backendRoot, '.env'),
  });
}

function loadMongoose() {
  return require(require.resolve('mongoose', { paths: [backendRoot] }));
}

function loadModels() {
  return require(path.join(backendRoot, 'src/models'));
}

function getMongoUri() {
  return process.env.MONGODB_URI || 'mongodb://localhost:27017/support_tickets';
}

module.exports = {
  backendRoot,
  loadEnv,
  loadMongoose,
  loadModels,
  getMongoUri,
};
