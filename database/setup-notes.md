# Database Setup Notes

Step-by-step guide to configure MongoDB for the Support Ticket Management System.

## Database Choice

**MongoDB** with **Mongoose** — document database used for `users`, `tickets`, and `comments` collections. Status machine rules and referential checks are enforced in the backend service layer.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Node.js | 18+ |
| MongoDB | 6+ locally **or** [MongoDB Atlas](https://www.mongodb.com/atlas) free tier |
| Backend deps | `cd backend && npm install` |

Optional: `mongosh` CLI for inspecting data.

---

## Environment Variables

Copy the example file before running any database scripts:

```powershell
cd backend
copy .env.example .env
```

Edit `backend/.env`:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | Yes | MongoDB connection string | `mongodb://localhost:27017/support_tickets` |
| `API_PORT` | No | Backend HTTP port (default `3000`) | `3000` |
| `CORS_ORIGIN` | No | Frontend origin for CORS (default `http://localhost:5173`) | `http://localhost:5173` |

**Never commit `backend/.env`** — it is listed in `backend/.gitignore`.

### Local MongoDB URI

```
MONGODB_URI=mongodb://localhost:27017/support_tickets
```

### MongoDB Atlas URI

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/support_tickets
```

Replace `<user>`, `<password>`, and cluster host. URL-encode special characters in the password.

---

## Option A — Local MongoDB (Windows)

### 1. Install and start MongoDB

1. Download [MongoDB Community Server](https://www.mongodb.com/try/download/community).
2. Run the installer (choose **Complete**, install as a **Windows Service**).
3. Start the service:

```powershell
Get-Service MongoDB
Start-Service MongoDB
```

### 2. Verify MongoDB is running

```powershell
mongosh
```

If the shell connects, MongoDB is ready. Type `exit` to leave.

---

## Option B — MongoDB Atlas (cloud)

1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a free **M0** cluster.
3. **Database Access** — create a DB user with password.
4. **Network Access** — add your IP (or `0.0.0.0/0` for local dev only).
5. **Connect** → **Drivers** → copy the connection string into `MONGODB_URI` in `backend/.env`.
6. Append the database name: `/support_tickets` before any query string.

---

## Database Scripts

All scripts run from the `backend/` folder and load env from `backend/.env` via `database/dbScriptUtils.js`.

| Command | Script | Purpose |
|---------|--------|---------|
| `npm run db:init` | `database/init-indexes.js` | Sync Mongoose indexes on all collections |
| `npm run seed` | `database/seed.js` | Clear and insert sample users, tickets, comments |

### Full setup sequence

```powershell
cd backend
npm install
copy .env.example .env
# Edit .env with your MONGODB_URI

npm run db:init
npm run seed
```

### Expected seed output

```
Seed completed successfully.
Users: 3
Tickets: 5
Comments: 4
```

### Seed data contents

| Collection | Count | Details |
|------------|-------|---------|
| **users** | 3 | Alice Agent, Bob Agent, Admin User |
| **tickets** | 5 | One ticket per status: open, in_progress, resolved, closed, cancelled |
| **comments** | 4 | On multiple tickets (2 on the open ticket) |

---

## Project Files

| Path | Purpose |
|------|---------|
| `backend/.env.example` | Template for backend environment variables |
| `backend/src/models/User.js` | User Mongoose schema |
| `backend/src/models/Ticket.js` | Ticket Mongoose schema |
| `backend/src/models/Comment.js` | Comment Mongoose schema |
| `database/dbScriptUtils.js` | Shared env/model loader for database scripts |
| `database/init-indexes.js` | Index initialization |
| `database/seed.js` | Seed data script |

---

## Verify Data

### Using mongosh (local)

```powershell
mongosh support_tickets
```

```javascript
db.users.find().pretty()
db.tickets.find({}, { title: 1, status: 1, priority: 1 }).pretty()
db.comments.find().pretty()
```

### Using the API (after backend is running)

```powershell
cd backend
npm run dev
```

In another terminal:

```powershell
curl http://localhost:3000/api/health
```

---

## Reset Database

Clears all data and re-seeds:

```powershell
mongosh support_tickets --eval "db.dropDatabase()"
cd backend
npm run db:init
npm run seed
```

---

## Test Database

Use a separate database name for integration tests:

```
MONGODB_URI=mongodb://localhost:27017/support_tickets_test
```

Tests should clear collections between runs to stay isolated.

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `ECONNREFUSED 127.0.0.1:27017` | MongoDB not running locally | Start MongoDB service or use Atlas URI |
| `Cannot find module 'dotenv'` | Running script outside `backend/` without deps | Run `npm run db:init` / `npm run seed` from `backend/` |
| `Authentication failed` | Wrong Atlas credentials | Check user/password in `MONGODB_URI` |
| `Duplicate key` on seed | Data already exists with same email | Drop database and re-run seed |
| `MongooseServerSelectionError` | Network/firewall or wrong URI | Verify Atlas IP whitelist and connection string |

---

## Related Docs

- `data-model.md` — collection schemas and indexes
- `README.md` — full application setup
- `backend/.env.example` — environment variable template
