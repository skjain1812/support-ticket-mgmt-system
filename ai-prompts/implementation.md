# Implementation Prompts

Reusable prompts for building the Support Ticket Management System.

---

## Prompt 1: Backend Project Setup

```
Set up the backend for a Support Ticket Management System in the backend/ folder.

Requirements:
- Node.js with Express
- MongoDB connection via Mongoose
- Environment variables: MONGODB_URI, API_PORT
- Folder structure: routes/, controllers/, services/, middleware/, models/
- Centralized error handling middleware
- CORS configured for frontend origin
- Health check endpoint: GET /api/health

Do not add unnecessary dependencies. Include a package.json with dev script.
```

---

## Prompt 2: Database Migrations

```
Create database setup for the Support Ticket Management System in database/.

Schema per data-model.md (Mongoose):
- User model: name, email, role
- Ticket model: title, description, priority, status, assignedTo, createdBy, timestamps
- Comment model: ticketId, message, createdBy, createdAt

Include:
1. Mongoose models in backend/src/models/
2. database/init-indexes.js — indexes including text index for search
3. database/seed.js — seed users, tickets, comments
4. npm scripts: db:init, seed

Validate ObjectId references in service layer. No auth/password in Core.
```

---

## Prompt 3: Comments API

```
Implement comment endpoints for the Support Ticket Management System backend.

Endpoints:
- POST /api/tickets/:id/comments — add comment (message required, createdBy required)
- Comments included in GET /api/tickets/:id response

Requirements:
- message is required and non-empty (400 if missing)
- createdBy must reference existing seed user
- Return 404 if ticket not found
- Comments ordered by createdAt ascending on detail view

Follow api-contract.md for request/response shapes.
No authentication in Core — createdBy comes from request body.
```

---

## Prompt 4: Ticket CRUD API

```
Implement ticket CRUD endpoints in the backend per api-contract.md.

Endpoints:
- GET /api/tickets — list with keyword search and status filter (Core)
- POST /api/tickets — create (title required, default status: open, default priority: medium)
- GET /api/tickets/:id — single ticket with comments and user names populated
- PATCH /api/tickets/:id — update title, description, priority, assignedTo (NOT status)
- PATCH /api/tickets/:id/status — change status via state machine only

State machine (Core):
- open → in_progress, cancelled
- in_progress → resolved, cancelled
- resolved → closed
- All other transitions → 400

No authentication in Core. Users are seed data referenced by ID.

Separate concerns: routes → controllers → services → models.
```

---

## Prompt 5: Ticket Assignment

```
Implement ticket assignment for the Support Ticket Management System.

Endpoints:
- PATCH /api/tickets/:id/assign — admin only, body: { assigneeId }
- GET /api/users — admin only, list all users

Requirements:
- Verify assigneeId references an existing user with role 'agent'
- Return updated ticket with assignee name populated
- Return 403 if non-admin tries to assign
- Return 400 if assigneeId is invalid

Follow docs/api-contract.md.
```

---

## Prompt 6: Frontend Setup

```
Set up the React frontend in frontend/ for the Support Ticket Management System (Core).

Requirements:
- Vite + React
- React Router for navigation
- API service layer (fetch or axios wrapper)
- No authentication in Core — no login page

Pages to scaffold:
- /tickets (list)
- /tickets/new (create)
- /tickets/:id (detail with comments)

Environment variable: VITE_API_URL
```

---

## Prompt 7: Frontend Ticket Pages

```
Implement the ticket UI pages for the Support Ticket Management System frontend.

Pages per docs/ui-flow.md:

1. Ticket List (/tickets)
   - Table with title, status badge, priority badge, assignee, date
   - Filter dropdowns for status and priority
   - Search input (debounced)
   - "Create Ticket" button
   - Click row → navigate to detail

2. Create Ticket (/tickets/new)
   - Form: title (required), description, priority dropdown
   - Submit → POST /api/tickets → redirect to detail

3. Ticket Detail (/tickets/:id)
   - Display all ticket fields; editable title, description, priority, assignee
   - Status dropdown with valid transitions only (PATCH /api/tickets/:id/status)
   - Comments list + add comment form
   - Show clear error on invalid status transition

Handle loading, empty, and error states.
```

---

## Usage Notes

- Implement backend before frontend for each feature.
- Test each endpoint with curl/Postman before wiring the UI.
- Commit after each prompt's output is verified working.
- Reference docs/api-contract.md and docs/data-model.md — do not deviate without updating docs.
