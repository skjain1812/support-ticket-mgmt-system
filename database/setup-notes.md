# Database Setup Notes

## Database Choice

**MongoDB** — document database with flexible schema, native JSON-like documents, and strong support for Node.js via Mongoose. State machine rules and referential integrity are enforced in the application service layer.

## Prerequisites

- MongoDB 6+ installed locally, **or** a [MongoDB Atlas](https://www.mongodb.com/atlas) free cluster
- `mongosh` CLI (optional, for inspecting data)

## Local Setup

### Option A — Local MongoDB

1. Install MongoDB Community Server and start the service.
2. Default connection: `mongodb://localhost:27017/support_tickets`

### Option B — MongoDB Atlas

1. Create a free cluster at mongodb.com/atlas.
2. Copy the connection string (replace `<password>` with your DB user password).

### 1. Configure environment variables

```bash
cp backend/.env.example backend/.env
```

Set in `backend/.env`:

```
MONGODB_URI=mongodb://localhost:27017/support_tickets
API_PORT=3000
```

Atlas example:

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/support_tickets
```

### 2. Install dependencies

```bash
cd backend && npm install
```

### 3. Initialize indexes

```bash
cd backend
npm run db:init
```

This runs `database/init-indexes.js` to create indexes on `users`, `tickets`, and `comments`.

### 4. Seed sample data

```bash
cd backend
npm run seed
```

This runs `database/seed.js` and inserts sample users, tickets, and comments.

### 5. Verify

Using `mongosh`:

```bash
mongosh support_tickets
db.users.find().pretty()
db.tickets.find().pretty()
db.comments.find().pretty()
```

## Database Files

| File | Purpose |
|------|---------|
| `database/init-indexes.js` | Creates collection indexes (run once or on deploy) |
| `database/seed.js` | Inserts sample users, tickets, and comments |
| `backend/src/models/` | Mongoose schemas (User, Ticket, Comment) |

## Seed Data Summary

- **Users:** 3 seeded users (e.g. Alice Agent, Bob Agent, Admin User)
- **Tickets:** 4–5 tickets across different statuses
- **Comments:** 2–3 comments on at least one ticket

## Reset Database

To start fresh during development:

```bash
mongosh support_tickets --eval "db.dropDatabase()"
cd backend && npm run db:init && npm run seed
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Ensure MongoDB service is running (`mongod`) |
| Authentication failed | Check username/password in `MONGODB_URI` |
| Invalid connection string | Verify URI format; encode special chars in password |
| Duplicate key on seed | Drop database and re-run seed |
| `MongoServerError: ns not found` | Run `npm run db:init` then `npm run seed` |

## Test Database

For integration tests, use a separate database name:

```
MONGODB_URI=mongodb://localhost:27017/support_tickets_test
```

Tests should clear collections in `beforeEach` or `afterEach` to stay isolated.
