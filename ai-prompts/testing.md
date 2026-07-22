# Testing Prompts

Reusable prompts for writing and running tests. **Recorded sessions** show what was actually executed for Core.

> Prompts 2, 3, 4 (auth), 6 are Stretch or optional. **Core mandatory:** state-machine integration tests (Prompt 5 adapted).

---

## Prompt 1: Test Strategy (Core — used)

```
Create a test strategy for the Support Ticket Management System.

Cover:
1. Integration tests as primary gate for state machine (mandatory Core)
2. Separate test database (support_tickets_test)
3. Jest + supertest setup in tests/
4. Manual UI checklist mapped to acceptance-criteria.md
5. What is Stretch (unit tests, E2E, auth tests)

Output for test-strategy.md.
```

---

## Prompt 2: Unit Tests — Status Transitions (Optional — not implemented)

```
[OPTIONAL] Pure function unit tests for isValidTransition(from, to).
Core requirement is covered by integration tests in tests/integration/.
Location if added: backend/src/__tests__/statusTransitions.test.js
```

---

## Prompt 3: Unit Tests — Input Validation (Optional — not implemented)

```
[OPTIONAL] Unit tests for validation helpers.
Core requirement covered by tests/integration/ticketCrud.validation.test.js.
```

---

## Prompt 4: Integration Tests — Auth (Stretch — not used)

```
[STRETCH] Auth integration tests — not in Core scope.
Users are seed data only; no login endpoints implemented.
```

---

## Prompt 5: Integration Tests — Core (Core — used)

```
Write integration tests for Core using supertest in tests/integration/.

Suites:
1. statusTransitions.valid.test.js — all 5 valid paths
2. statusTransitions.invalid.test.js — at least 5 invalid paths → 400
3. ticketCrud.validation.test.js — missing title, invalid enums, bad assignee
4. comments.creation.test.js — missing message, ticket not found

Setup:
- tests/integration/setup.js — connect to MONGODB_URI_TEST
- tests/integration/helpers/testDb.js — seed/cleanup
- Run: cd tests && npm test

No auth tokens. Use seed user IDs from test data.
```

---

## Prompt 6: Frontend Component Tests (Stretch — not implemented)

```
[STRETCH] Vitest + React Testing Library component tests.
Core verified via manual UI testing documented in test-results.md.
```

---

## Prompt 7: Test Results Documentation (Core — used)

```
I ran the test suite. Results:

[Paste npm test output]

Generate test-results.md with:
1. Pass/fail counts per suite
2. State machine test matrix
3. Smoke test notes
4. Branch/commit hash
```

---

## Recorded Session — Integration test setup (2026-07-21)

**Prompt used:** Prompt 5

**AI output:** 4 suites, 30 tests. Wrong import paths in setup.js.

**My decision:**
- ✅ Accepted integration-first approach (mandatory Core)
- ✏️ Fixed paths: `../../database/dbScriptUtils` from `tests/integration/setup.js`
- ❌ Rejected auth test suite

**Validated:** `npm test` — 30/30 passed. Documented in `test-results.md`.

**Commit:** `f5f0995`. See `iteration-log.md` Session 7.

---

## Usage Notes

- Write tests after backend API is stable, before final submission.
- Never run integration tests against dev database.
- Map test cases to acceptance criteria for traceability.
- Record results in `test-results.md` after every full run.
