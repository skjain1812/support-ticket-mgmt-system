# Design Prompts

Reusable prompts for architecture and design decisions.

---

## Prompt 1: System Architecture

```
Design the architecture for a Support Ticket Management System with:
- React frontend (Vite)
- Node.js REST API (Express)
- MongoDB database (Mongoose ODM)
- JWT authentication with roles: agent, admin

Provide:
1. High-level architecture diagram (text or mermaid)
2. Folder structure for backend/ and frontend/
3. Key design decisions with rationale
4. Security considerations (password hashing, input validation, CORS)

Follow existing project conventions in docs/design-notes.md. Do not introduce new frameworks unless justified.
```

---

## Prompt 2: Data Model

```
Design the database schema for a Support Ticket Management System.

Entities:
- Users (agents and admins)
- Tickets (title, description, status, priority, creator, assignee)
- Ticket status history (optional audit trail)

Requirements:
- ObjectId primary keys (exposed as strings in API)
- Enum validation in Mongoose schema + service layer
- Timestamps via Mongoose `{ timestamps: true }`

Output:
1. Mermaid ERD
2. Mongoose schema definitions with field types and constraints
3. Sample seed data script (database/seed.js)

Format for docs/data-model.md.
```

---

## Prompt 3: API Contract

```
Design a REST API contract for the Support Ticket Management System.

Endpoints needed:
- POST /auth/login
- POST /auth/register (admin only)
- GET /tickets (with filters: status, priority, assigneeId, search, pagination)
- POST /tickets
- GET /tickets/:id
- PATCH /tickets/:id
- PATCH /tickets/:id/assign (admin only)
- GET /users (admin only)

For each endpoint, specify:
- HTTP method and path
- Request body / query params
- Success response (status code + JSON shape)
- Error responses (400, 401, 403, 404)
- Auth requirements

Use consistent error format: { "error": "...", "details": [] }

Output for docs/api-contract.md.
```

---

## Prompt 4: UI Flow Design

```
Design the UI flows for a Support Ticket Management System.

Screens:
- Login
- Ticket list (with filters and search)
- Create ticket
- Ticket detail (status update, assignment)
- User management (admin only)

For each screen, describe:
1. Route path
2. UI elements
3. User interactions
4. API calls triggered
5. Loading, empty, and error states

Include mermaid sequence diagrams for login and status change flows.

Output for docs/ui-flow.md.
```

---

## Prompt 5: Status State Machine

```
Define the ticket status state machine for a Support Ticket Management System (Core).

Statuses: open, in_progress, resolved, closed, cancelled

Valid transitions (Core — non-negotiable):
- open → in_progress
- open → cancelled
- in_progress → resolved
- in_progress → cancelled
- resolved → closed

All other transitions are invalid. closed and cancelled are terminal.

Provide:
1. Valid transitions diagram (mermaid or ASCII)
2. Function signature for isValidTransition(from, to) → boolean
3. Error message format for invalid transitions
4. Note: this is the signature judgment piece — backend must enforce, frontend supplements
```

---

## Usage Notes

- Finalize data model and API contract **before** implementation.
- Cross-check design output against docs/requirements-analysis.md.
- Update docs/design-notes.md with any decisions made during AI-assisted design.
