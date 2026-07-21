Integration tests for the Support Ticket Management System.

## Setup

Uses a **separate test database** (`support_tickets_test` by default). Never run against dev data.

```powershell
cd tests
npm install
npm test
```

Optional: set `MONGODB_URI_TEST` in `backend/.env` to override the test database URL.

## Structure

- `integration/setup.js` — loads env and sets test MongoDB URI
- `integration/helpers/testDb.js` — DB helpers and supertest app
- `integration/statusTransitions.valid.test.js` — valid state machine paths (task 4.1)
- `integration/statusTransitions.invalid.test.js` — invalid state machine paths (task 4.2)
- `integration/ticketCrud.validation.test.js` — ticket CRUD validation (task 4.3)
- `integration/comments.creation.test.js` — comment creation (task 4.4)

## Run specific suite

```powershell
npm run test:valid-transitions
```
