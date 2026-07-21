const path = require('path');
const request = require('supertest');
const { loadMongoose, loadModels } = require('../../../database/dbScriptUtils');

const mongoose = loadMongoose();
const { User, Ticket, Comment } = loadModels();
const app = require(path.join(__dirname, '../../../backend/src/app'));

async function connectTestDb() {
  if (mongoose.connection.readyState === 0) {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_URI);
  }
}

async function disconnectTestDb() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  }
}

async function clearDatabase() {
  await Comment.deleteMany({});
  await Ticket.deleteMany({});
  await User.deleteMany({});
}

async function seedUser(overrides = {}) {
  return User.create({
    name: 'Test Agent',
    email: `test-agent-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`,
    role: 'agent',
    ...overrides,
  });
}

async function createTicket(userId, status = 'open', overrides = {}) {
  return Ticket.create({
    title: `Test ticket (${status})`,
    description: 'Integration test ticket',
    priority: 'medium',
    status,
    createdBy: userId,
    ...overrides,
  });
}

function patchTicketStatus(ticketId, status) {
  return request(app).patch(`/api/tickets/${ticketId}/status`).send({ status });
}

function postTicket(payload) {
  return request(app).post('/api/tickets').send(payload);
}

function getTicket(ticketId) {
  return request(app).get(`/api/tickets/${ticketId}`);
}

function patchTicket(ticketId, payload) {
  return request(app).patch(`/api/tickets/${ticketId}`).send(payload);
}

function postComment(ticketId, payload) {
  return request(app).post(`/api/tickets/${ticketId}/comments`).send(payload);
}

async function getTicketStatus(ticketId) {
  const ticket = await Ticket.findById(ticketId);
  return ticket?.status ?? null;
}

module.exports = {
  app,
  request,
  mongoose,
  User,
  Ticket,
  Comment,
  connectTestDb,
  disconnectTestDb,
  clearDatabase,
  seedUser,
  createTicket,
  patchTicketStatus,
  postTicket,
  getTicket,
  patchTicket,
  postComment,
  getTicketStatus,
};
