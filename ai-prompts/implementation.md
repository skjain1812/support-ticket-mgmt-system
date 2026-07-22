# Implementation Prompts

Reusable prompts for building the Support Ticket Management System. **Recorded sessions** show real iteration.

---

## Prompt 1: Backend Project Setup (Core — used)

```
Set up the backend for a Support Ticket Management System in backend/.

Requirements:
- Node.js with Express
- MongoDB connection via Mongoose
- Environment variables: MONGODB_URI, API_PORT
- Folder structure: routes/, controllers/, services/, middleware/, models/
- Centralized error handling middleware
- CORS configured for frontend origin
- Health check endpoint: GET /api/health

Do not add unnecessary dependencies. Include package.json with dev script.
```

---

## Prompt 2: Database Setup (Core — used)

```
Create database setup in database/.

Schema per data-model.md (Mongoose):
- User, Ticket, Comment models in backend/src/models/
- database/init-indexes.js — indexes including text index for search
- database/seed.js — 3 users, 5 tickets, 4 comments
- npm scripts: db:init, seed (run from backend/)

Scripts must resolve modules from backend/node_modules (see dbScriptUtils.js pattern).
No auth/password in Core.
```

---

## Prompt 3: Comments API (Core — used)

```
Implement comment endpoints per api-contract.md.

- POST /api/tickets/:id/comments — message required, createdBy required
- Comments included in GET /api/tickets/:id response

Validate: message non-empty, createdBy references seed user, ticket exists.
No authentication in Core.
```

---

## Prompt 4: Ticket CRUD API (Core — used)

```
Implement ticket endpoints per api-contract.md.

- GET /api/tickets — keyword search + status filter
- POST /api/tickets — title required; defaults: open, medium
- GET /api/tickets/:id — detail with comments populated
- PATCH /api/tickets/:id — title, description, priority, assignedTo (NOT status)
- PATCH /api/tickets/:id/status — state machine only

Enforce transitions in statusTransition.service.js. Invalid → 400 with details array.
Separate: routes → controllers → services → models.
```

---

## Prompt 5: Ticket Assignment (Stretch — not used)

```
[STRETCH] Admin-only assignment endpoint with role checks.
Core uses PATCH /api/tickets/:id with assignedTo field instead.
GET /api/users lists all seed users for dropdown — no auth required in Core.
```

---

## Prompt 6: Frontend Setup (Core — used)

```
Set up React frontend in frontend/ (Core).

- Vite + React, React Router
- API service layer in services/api.js
- No login page (seed users only)
- Pages: /tickets, /tickets/new, /tickets/:id
- VITE_API_URL environment variable
```

---

## Prompt 7: Frontend Ticket Pages (Core — used, phased)

```
Implement ticket UI per ui-flow.md and tasks.md phases:

1. Ticket List — search + status filter (Core only; no priority filter)
2. Create Ticket — title required, defaults on submit
3. Ticket Detail — phased: read-only → field edits → status selector → comments

Status dropdown shows valid next statuses only (mirror backend rules).
Handle loading, empty, and error states on all pages.
```

---

## Recorded Session — Backend status endpoint (2026-07-21)

**Prompt used:** Prompt 4

**AI suggested:** Status change on general PATCH /tickets/:id.

**My decision:** ✏️ Changed — separate `PATCH /:id/status` per api-contract.md.

**Validated:** Integration tests for valid/invalid transitions.

**Commit:** `47e51a0`. See `iteration-log.md` Session 4.

---

## Recorded Session — Frontend phasing (2026-07-21)

**Prompt used:** Prompt 7

**AI suggested:** All-in-one detail page + priority filter on list.

**My decision:**
- ✏️ Phased detail page per tasks.md 3.3–3.7
- ❌ Rejected priority filter (Stretch)

**Commit:** `b4889e8`. See `iteration-log.md` Session 6.

---

## Usage Notes

- Implement backend before frontend for each feature.
- Test each endpoint with curl before wiring UI.
- Reference `api-contract.md` and `data-model.md` — update docs if implementation diverges.
- Log sessions in `iteration-log.md`.
