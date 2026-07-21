const {
  connectTestDb,
  disconnectTestDb,
  clearDatabase,
  seedUser,
  createTicket,
  patchTicketStatus,
} = require('./helpers/testDb');

describe('Status transitions — valid paths', () => {
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

  it('allows open → in_progress', async () => {
    const ticket = await createTicket(user._id, 'open');

    const response = await patchTicketStatus(ticket._id.toString(), 'in_progress');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('in_progress');
    expect(response.body.id).toBe(ticket._id.toString());
  });

  it('allows open → cancelled', async () => {
    const ticket = await createTicket(user._id, 'open');

    const response = await patchTicketStatus(ticket._id.toString(), 'cancelled');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('cancelled');
  });

  it('allows in_progress → resolved', async () => {
    const ticket = await createTicket(user._id, 'in_progress');

    const response = await patchTicketStatus(ticket._id.toString(), 'resolved');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('resolved');
  });

  it('allows in_progress → cancelled', async () => {
    const ticket = await createTicket(user._id, 'in_progress');

    const response = await patchTicketStatus(ticket._id.toString(), 'cancelled');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('cancelled');
  });

  it('allows resolved → closed', async () => {
    const ticket = await createTicket(user._id, 'resolved');

    const response = await patchTicketStatus(ticket._id.toString(), 'closed');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('closed');
  });
});
