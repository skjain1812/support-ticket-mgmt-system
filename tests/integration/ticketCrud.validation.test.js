const {
  connectTestDb,
  disconnectTestDb,
  clearDatabase,
  seedUser,
  createTicket,
  postTicket,
  getTicket,
  patchTicket,
  mongoose,
} = require('./helpers/testDb');

describe('Ticket CRUD validation', () => {
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

  describe('POST /api/tickets', () => {
    it('rejects missing title with 400', async () => {
      const response = await postTicket({
        description: 'No title provided',
        createdBy: user._id.toString(),
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'title', message: 'Title is required' }),
        ])
      );
    });

    it('rejects missing createdBy with 400', async () => {
      const response = await postTicket({
        title: 'Ticket without creator',
      });

      expect(response.status).toBe(400);
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'createdBy', message: 'createdBy is required' }),
        ])
      );
    });

    it('rejects invalid priority with 400', async () => {
      const response = await postTicket({
        title: 'Invalid priority ticket',
        createdBy: user._id.toString(),
        priority: 'urgent',
      });

      expect(response.status).toBe(400);
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'priority', message: 'Invalid priority value' }),
        ])
      );
    });

    it('rejects assignee that does not exist with 400', async () => {
      const missingUserId = new mongoose.Types.ObjectId().toString();

      const response = await postTicket({
        title: 'Ticket with bad assignee',
        createdBy: user._id.toString(),
        assignedTo: missingUserId,
      });

      expect(response.status).toBe(400);
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'assignedTo', message: 'User not found' }),
        ])
      );
    });

    it('creates a ticket with default open status and medium priority', async () => {
      const response = await postTicket({
        title: 'Valid new ticket',
        description: 'Created via integration test',
        createdBy: user._id.toString(),
      });

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Valid new ticket');
      expect(response.body.status).toBe('open');
      expect(response.body.priority).toBe('medium');
      expect(response.body.createdBy).toBe(user._id.toString());
    });
  });

  describe('GET /api/tickets/:id', () => {
    it('returns 404 for a non-existent ticket ID', async () => {
      const missingTicketId = new mongoose.Types.ObjectId().toString();

      const response = await getTicket(missingTicketId);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Ticket not found');
    });

    it('returns ticket details for an existing ticket', async () => {
      const ticket = await createTicket(user._id, 'open', { title: 'Readable ticket' });

      const response = await getTicket(ticket._id.toString());

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(ticket._id.toString());
      expect(response.body.title).toBe('Readable ticket');
      expect(Array.isArray(response.body.comments)).toBe(true);
    });
  });

  describe('PATCH /api/tickets/:id', () => {
    it('rejects invalid priority with 400', async () => {
      const ticket = await createTicket(user._id, 'open');

      const response = await patchTicket(ticket._id.toString(), { priority: 'urgent' });

      expect(response.status).toBe(400);
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'priority', message: 'Invalid priority value' }),
        ])
      );
    });

    it('rejects empty title with 400', async () => {
      const ticket = await createTicket(user._id, 'open', { title: 'Original title' });

      const response = await patchTicket(ticket._id.toString(), { title: '   ' });

      expect(response.status).toBe(400);
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'title', message: 'Title is required' }),
        ])
      );
    });

    it('returns 404 when updating a non-existent ticket', async () => {
      const missingTicketId = new mongoose.Types.ObjectId().toString();

      const response = await patchTicket(missingTicketId, { title: 'Updated title' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Ticket not found');
    });

    it('updates allowed ticket fields', async () => {
      const ticket = await createTicket(user._id, 'open', { title: 'Before update' });

      const response = await patchTicket(ticket._id.toString(), {
        title: 'After update',
        description: 'Updated description',
        priority: 'high',
      });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('After update');
      expect(response.body.description).toBe('Updated description');
      expect(response.body.priority).toBe('high');
    });
  });
});
