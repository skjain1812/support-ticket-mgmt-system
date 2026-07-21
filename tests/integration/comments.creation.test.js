const {
  connectTestDb,
  disconnectTestDb,
  clearDatabase,
  seedUser,
  createTicket,
  getTicket,
  postComment,
  mongoose,
} = require('./helpers/testDb');

describe('Comment creation', () => {
  let user;
  let ticket;

  beforeAll(async () => {
    await connectTestDb();
  });

  afterAll(async () => {
    await disconnectTestDb();
  });

  beforeEach(async () => {
    await clearDatabase();
    user = await seedUser();
    ticket = await createTicket(user._id, 'open');
  });

  describe('POST /api/tickets/:id/comments', () => {
    it('rejects missing message with 400', async () => {
      const response = await postComment(ticket._id.toString(), {
        createdBy: user._id.toString(),
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'message', message: 'Message is required' }),
        ])
      );
    });

    it('rejects blank message with 400', async () => {
      const response = await postComment(ticket._id.toString(), {
        message: '   ',
        createdBy: user._id.toString(),
      });

      expect(response.status).toBe(400);
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'message', message: 'Message is required' }),
        ])
      );
    });

    it('rejects missing createdBy with 400', async () => {
      const response = await postComment(ticket._id.toString(), {
        message: 'Comment without author',
      });

      expect(response.status).toBe(400);
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'createdBy', message: 'createdBy is required' }),
        ])
      );
    });

    it('returns 404 when commenting on a non-existent ticket', async () => {
      const missingTicketId = new mongoose.Types.ObjectId().toString();

      const response = await postComment(missingTicketId, {
        message: 'Orphan comment',
        createdBy: user._id.toString(),
      });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Ticket not found');
    });

    it('rejects author that does not exist with 400', async () => {
      const missingUserId = new mongoose.Types.ObjectId().toString();

      const response = await postComment(ticket._id.toString(), {
        message: 'Comment from missing user',
        createdBy: missingUserId,
      });

      expect(response.status).toBe(400);
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'createdBy', message: 'User not found' }),
        ])
      );
    });

    it('rejects invalid ticket ID format with 400', async () => {
      const response = await postComment('not-a-valid-id', {
        message: 'Invalid ticket reference',
        createdBy: user._id.toString(),
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid ID format');
    });

    it('creates a comment and returns populated author details', async () => {
      const response = await postComment(ticket._id.toString(), {
        message: 'Customer confirmed the fix works.',
        createdBy: user._id.toString(),
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Customer confirmed the fix works.');
      expect(response.body.ticketId).toBe(ticket._id.toString());
      expect(response.body.createdBy).toBe(user._id.toString());
      expect(response.body.createdByName).toBe(user.name);
      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
    });

    it('includes new comments on ticket detail response', async () => {
      await postComment(ticket._id.toString(), {
        message: 'First comment',
        createdBy: user._id.toString(),
      });

      const detailResponse = await getTicket(ticket._id.toString());

      expect(detailResponse.status).toBe(200);
      expect(detailResponse.body.comments).toHaveLength(1);
      expect(detailResponse.body.comments[0].message).toBe('First comment');
      expect(detailResponse.body.comments[0].createdByName).toBe(user.name);
    });
  });
});
