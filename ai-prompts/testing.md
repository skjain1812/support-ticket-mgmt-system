# Testing Prompts

Reusable prompts for writing and running tests.

---

## Prompt 1: Test Strategy

```
Create a test strategy for the Support Ticket Management System.

Cover:
1. Testing pyramid (unit → integration → E2E)
2. What to test at each layer
3. Tools (Jest/Vitest, supertest, optional Playwright)
4. Test database setup (isolated from dev data)
5. Coverage goals
6. Manual testing checklist mapped to docs/acceptance-criteria.md

Output for docs/test-strategy.md.
```

---

## Prompt 2: Unit Tests — Status Transitions

```
Write unit tests for the ticket status transition logic.

Test cases:
- open → in_progress: valid
- open → cancelled: valid
- in_progress → resolved: valid
- in_progress → cancelled: valid
- resolved → closed: valid
- open → closed: invalid
- open → resolved: invalid
- in_progress → open: invalid
- resolved → in_progress: invalid
- closed → open: invalid
- cancelled → in_progress: invalid

Use the validateStatusTransition(from, to) function.
Test file location: backend/src/__tests__/statusTransitions.test.js

Use Jest. No database needed — pure function tests.
```

---

## Prompt 3: Unit Tests — Input Validation

```
Write unit tests for ticket input validation.

Test cases:
- Valid ticket: title + description + priority → passes
- Missing title → fails with "Title is required"
- Invalid priority value → fails
- Title exceeds max length (200 chars) → fails
- Empty description → passes (optional field)

Test file: backend/src/__tests__/ticketValidation.test.js
```

---

## Prompt 4: Integration Tests — Auth

```
Write integration tests for authentication endpoints using supertest.

Setup:
- Test database with seed data
- beforeAll: start app, seed test users (admin + agent)
- afterAll: clean up test data

Test cases:
- POST /api/auth/login with valid credentials → 200 + token
- POST /api/auth/login with wrong password → 401
- POST /api/auth/login with missing email → 400
- POST /api/auth/register as admin → 201
- POST /api/auth/register as agent → 403
- Protected route without token → 401
- Protected route with valid token → 200

Test file: tests/integration/auth.test.js
```

---

## Prompt 5: Integration Tests — Tickets

```
Write integration tests for ticket CRUD endpoints using supertest.

Setup: authenticated requests with admin and agent tokens.

Test cases:
- POST /api/tickets — create with valid data → 201
- POST /api/tickets — missing title → 400
- GET /api/tickets — returns list with pagination
- GET /api/tickets?status=open — filters correctly
- GET /api/tickets?search=password — search works
- GET /api/tickets/:id — returns ticket detail
- GET /api/tickets/:id — non-existent → 404
- PATCH /api/tickets/:id — valid status change → 200
- PATCH /api/tickets/:id — invalid transition → 400
- PATCH /api/tickets/:id/assign — admin assigns → 200
- PATCH /api/tickets/:id/assign — agent tries → 403

Test file: tests/integration/tickets.test.js
```

---

## Prompt 6: Frontend Component Tests

```
Write unit tests for key React components in the Support Ticket Management System.

Components to test:
1. LoginForm — renders fields, shows error on failed login, calls onSubmit
2. TicketList — renders tickets, shows empty state, triggers filter on dropdown change
3. TicketForm — validates required title, submits with correct payload
4. StatusBadge — renders correct color/label for each status

Use Vitest + React Testing Library.
Mock API calls. Test file location: frontend/src/__tests__/
```

---

## Prompt 7: Test Results Documentation

```
I ran the test suite for the Support Ticket Management System. Here are the results:

[Paste test output here]

Generate a test results summary for docs/test-results.md including:
1. Pass/fail counts per suite
2. Any failed tests with likely root cause
3. Manual test results against acceptance criteria (mark pass/fail)
4. Overall conclusion (ready for submission or needs work)
```

---

## Usage Notes

- Write tests alongside implementation, not only at the end.
- Run `npm test` after each batch of tests is added.
- Use a separate test database — never run integration tests against dev data.
- Map test cases to acceptance criteria IDs for traceability.
