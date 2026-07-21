const {
  connectTestDb,
  disconnectTestDb,
  clearDatabase,
  seedUser,
  createTicket,
  patchTicketStatus,
  getTicketStatus,
} = require('./helpers/testDb');

describe('Status transitions — invalid paths', () => {
  let user;

  beforeAll(async () => {
    await connectTestDb();
  });

  afterAll(async () => {
    await disconnectTestDb();
  });

  beforeEach(async () => {
    await clearDatabase();
    user = await seedUser();
  });

  async function expectRejectedTransition(ticket, fromStatus, toStatus) {
    const ticketId = ticket._id.toString();

    const response = await patchTicketStatus(ticketId, toStatus);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(await getTicketStatus(ticketId)).toBe(fromStatus);
  }

  it('rejects open → closed', async () => {
    const ticket = await createTicket(user._id, 'open');
    await expectRejectedTransition(ticket, 'open', 'closed');
  });

  it('rejects open → resolved', async () => {
    const ticket = await createTicket(user._id, 'open');
    await expectRejectedTransition(ticket, 'open', 'resolved');
  });

  it('rejects in_progress → open', async () => {
    const ticket = await createTicket(user._id, 'in_progress');
    await expectRejectedTransition(ticket, 'in_progress', 'open');
  });

  it('rejects resolved → in_progress', async () => {
    const ticket = await createTicket(user._id, 'resolved');
    await expectRejectedTransition(ticket, 'resolved', 'in_progress');
  });

  it('rejects closed → open', async () => {
    const ticket = await createTicket(user._id, 'closed');
    await expectRejectedTransition(ticket, 'closed', 'open');
  });

  it('rejects cancelled → in_progress', async () => {
    const ticket = await createTicket(user._id, 'cancelled');
    await expectRejectedTransition(ticket, 'cancelled', 'in_progress');
  });
});
