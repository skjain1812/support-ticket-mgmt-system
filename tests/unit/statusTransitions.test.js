const {
  isValidTransition,
  VALID_TRANSITIONS,
} = require('../../backend/src/utils/statusTransitions');

describe('isValidTransition (unit)', () => {
  describe('valid transitions', () => {
    it.each([
      ['open', 'in_progress'],
      ['open', 'cancelled'],
      ['in_progress', 'resolved'],
      ['in_progress', 'cancelled'],
      ['resolved', 'closed'],
    ])('allows %s → %s', (from, to) => {
      expect(isValidTransition(from, to)).toBe(true);
    });
  });

  describe('same-status no-op', () => {
    it.each(['open', 'in_progress', 'resolved', 'closed', 'cancelled'])(
      'allows %s → %s (no-op)',
      (status) => {
        expect(isValidTransition(status, status)).toBe(true);
      }
    );
  });

  describe('invalid transitions', () => {
    it.each([
      ['open', 'closed'],
      ['open', 'resolved'],
      ['in_progress', 'open'],
      ['resolved', 'in_progress'],
      ['closed', 'open'],
      ['cancelled', 'in_progress'],
    ])('rejects %s → %s', (from, to) => {
      expect(isValidTransition(from, to)).toBe(false);
    });
  });

  describe('terminal states', () => {
    it('closed has no outbound transitions', () => {
      expect(VALID_TRANSITIONS.closed).toEqual([]);
    });

    it('cancelled has no outbound transitions', () => {
      expect(VALID_TRANSITIONS.cancelled).toEqual([]);
    });
  });
});
