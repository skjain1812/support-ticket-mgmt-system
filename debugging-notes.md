# Debugging Notes

## Issue 1: Database scripts cannot find `dotenv` / `mongoose`

### Problem
Running `npm run db:init` or `npm run seed` from `backend/` failed with `Cannot find module 'dotenv'` because scripts live in `database/` but dependencies are installed in `backend/node_modules/`.

### How I Investigated
- Read error stack trace pointing to `database/init-indexes.js`
- Compared script location vs `package.json` dependency paths
- Confirmed `node_modules` only exists under `backend/`

### How AI Helped
- Cursor suggested resolving modules via `require.resolve(..., { paths: [backendRoot] })`
- Proposed shared `database/dbScriptUtils.js` helper

### What I Validated
- Ran `npm run db:init` and `npm run seed` successfully from `backend/`
- Verified indexes and seed counts in MongoDB

### Final Fix
Created `database/dbScriptUtils.js` to load `dotenv`, `mongoose`, and models from the backend package root.

---

## Issue 2: MongoDB connection refused (`ECONNREFUSED`)

### Problem
Backend failed to start with MongoDB connection error when no local MongoDB instance was running.

### How I Investigated
- Checked `backend/.env` `MONGODB_URI`
- Confirmed port 27017 unreachable
- Reviewed `database/setup-notes.md` for setup options

### How AI Helped
- Explained local install vs MongoDB Atlas options
- Updated setup documentation with Windows-specific steps

### What I Validated
- Connected successfully after starting local MongoDB (or configuring Atlas URI)
- `GET /api/health` returned 200

### Final Fix
Environment configuration — no code change. Documented in `database/setup-notes.md` and README.

---

## Issue 3: Integration test module path errors

### Problem
Jest setup failed with `Cannot find module '../database/dbScriptUtils'` due to incorrect relative paths from `tests/integration/`.

### How I Investigated
- Read Jest error output showing failing `require()` path
- Traced directory depth: `tests/integration/setup.js` vs `tests/integration/helpers/testDb.js`

### How AI Helped
- Corrected paths to `../../database/` and `../../../database/` respectively

### What I Validated
- `npm test` in `tests/` — all 30 tests pass

### Final Fix
Updated import paths in `tests/integration/setup.js` and `tests/integration/helpers/testDb.js`.

---

## Issue 4: `Ticket.findById` undefined in service

### Problem
Ticket detail/list API failed because service imported `{ Ticket }` instead of default export.

### How I Investigated
- Read runtime error and import line in service file
- Compared with `models/Ticket.js` export style

### How AI Helped
- Identified incorrect destructured import

### What I Validated
- `GET /api/tickets` and `GET /api/tickets/:id` returned data after fix

### Final Fix
Changed to `const Ticket = require('../models/Ticket')`.

---

## Common Debugging Techniques

- **Backend:** `curl.exe` for API testing, read `errorHandler` output, inspect data with `mongosh`
- **Frontend:** Browser DevTools Network tab, React state in components, URL param sync
- **Tests:** `npm run test:valid-transitions` (or specific suite) from `tests/` folder
- **Database:** Separate test DB (`support_tickets_test`) to avoid polluting dev data
