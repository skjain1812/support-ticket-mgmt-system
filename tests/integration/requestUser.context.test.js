const {
  connectTestDb,
  disconnectTestDb,
  clearDatabase,
  seedUser,
  postTicket,
  postComment,
} = require('./helpers/testDb');

describe('Request-scoped user context (X-User-Id header)', () => {
  let user;
  let otherUser;

  beforeAll(async () => {
    await connectTestDb();
  });

  afterAll(async () => {
    await disconnectTestDb();
  });

  beforeEach(async () => {
    await clearDatabase();
    user = await seedUser({ name: 'Header User' });
    otherUser = await seedUser({ name: 'Other User' });
  });

  it('uses X-User-Id header as createdBy when body omits it', async () => {
    const response = await postTicket(
      { title: 'Ticket via header', priority: 'medium' },
      { 'X-User-Id': user._id.toString() }
    );

    expect(response.status).toBe(201);
    expect(response.body.createdBy).toBe(user._id.toString());
  });

  it('rejects mismatched X-User-Id and body createdBy', async () => {
    const response = await postTicket(
      {
        title: 'Spoof attempt',
        createdBy: otherUser._id.toString(),
      },
      { 'X-User-Id': user._id.toString() }
    );

    expect(response.status).toBe(400);
    expect(response.body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'createdBy',
          message: 'createdBy does not match request user context',
        }),
      ])
    );
  });

  it('falls back to body createdBy when header absent (Core compatibility)', async () => {
    const response = await postTicket({
      title: 'Ticket via body',
      createdBy: user._id.toString(),
    });

    expect(response.status).toBe(201);
    expect(response.body.createdBy).toBe(user._id.toString());
  });

  it('applies X-User-Id to comment creation', async () => {
    const ticketResponse = await postTicket({
      title: 'Ticket for comment',
      createdBy: user._id.toString(),
    });
    const ticketId = ticketResponse.body.id;

    const commentResponse = await postComment(
      ticketId,
      { message: 'Comment via header' },
      { 'X-User-Id': user._id.toString() }
    );

    expect(commentResponse.status).toBe(201);
    expect(commentResponse.body.createdBy).toBe(user._id.toString());
  });
});
