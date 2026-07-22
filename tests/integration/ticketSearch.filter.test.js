const {
  connectTestDb,
  disconnectTestDb,
  clearDatabase,
  seedUser,
  createTicket,
  getTickets,
} = require('./helpers/testDb');

describe('Ticket list — search and status filter', () => {
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

    await createTicket(user._id, 'open', {
      title: 'Cannot reset password',
      description: 'Reset email not arriving',
    });
    await createTicket(user._id, 'in_progress', {
      title: 'Slow dashboard load',
      description: 'Performance issue on login',
    });
    await createTicket(user._id, 'open', {
      title: 'Billing question',
      description: 'Invoice amount looks wrong',
    });
  });

  it('filters tickets by status=open', async () => {
    const response = await getTickets({ status: 'open' });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2);
    expect(response.body.data.every((t) => t.status === 'open')).toBe(true);
  });

  it('filters tickets by status=in_progress', async () => {
    const response = await getTickets({ status: 'in_progress' });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].title).toBe('Slow dashboard load');
  });

  it('searches tickets by keyword in title', async () => {
    const response = await getTickets({ search: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].title).toContain('password');
  });

  it('searches tickets by keyword in description', async () => {
    const response = await getTickets({ search: 'invoice' });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].title).toBe('Billing question');
  });

  it('combines search and status filter', async () => {
    const response = await getTickets({ search: 'password', status: 'open' });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].title).toBe('Cannot reset password');
  });

  it('returns empty list when search has no matches', async () => {
    const response = await getTickets({ search: 'nonexistent-keyword-xyz' });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(0);
  });

  it('rejects invalid status filter with 400', async () => {
    const response = await getTickets({ status: 'invalid_status' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });
});
