# Design Prompts

Reusable prompts for architecture and design decisions. **Recorded sessions** at the bottom show real iteration.

> Prompts 1, 3, 4 include Stretch items (auth, pagination) — marked accordingly. Core design used Prompts 2 and 5.

---

## Prompt 1: System Architecture (Stretch — reference only)

```
Design the architecture for a Support Ticket Management System with:
- React frontend (Vite)
- Node.js REST API (Express)
- MongoDB database (Mongoose ODM)
- JWT authentication with roles: agent, admin  [STRETCH — not in Core]

Provide folder structure, key design decisions, and security considerations.
Follow design-notes.md. Do not introduce new frameworks unless justified.
```

---

## Prompt 2: Data Model (Core — used)

```
Design the database schema for a Support Ticket Management System (Core).

Entities:
- User — seeded only; fields: name, email, role (no password)
- Ticket — title, description, priority, status, assignedTo, createdBy, timestamps
- Comment — ticketId, message, createdBy, createdAt

Requirements:
- ObjectId primary keys (exposed as strings in API)
- Enum validation in Mongoose schema + service layer
- Timestamps via Mongoose `{ timestamps: true }`

Output:
1. Mermaid ERD
2. Mongoose schema definitions
3. Sample seed data (database/seed.js)

Format for data-model.md.
```

---

## Prompt 3: API Contract (Core — adapted)

```
Design a REST API contract for the Support Ticket Management System (Core).

Endpoints:
- GET /users — list seed users (for assignee/createdBy dropdowns)
- GET /tickets — list with search + status filter
- POST /tickets — create (title required)
- GET /tickets/:id — detail with comments
- PATCH /tickets/:id — update fields (not status)
- PATCH /tickets/:id/status — state machine transitions only
- POST /api/tickets/:id/comments — add comment

Error format: { "error": "...", "details": [] }
No authentication in Core.

Output for api-contract.md.
```

---

## Prompt 4: UI Flow Design (Core — adapted)

```
Design UI flows for Core scope (no login page).

Screens:
- Ticket list (/tickets) — search + status filter
- Create ticket (/tickets/new)
- Ticket detail (/tickets/:id) — edit fields, status change, comments

For each screen: route, UI elements, API calls, loading/empty/error states.

Output for ui-flow.md.
```

---

## Prompt 5: Status State Machine (Core — used)

```
Define the ticket status state machine (Core — non-negotiable).

Statuses: open, in_progress, resolved, closed, cancelled

Valid transitions:
- open → in_progress, cancelled
- in_progress → resolved, cancelled
- resolved → closed

All other transitions invalid. closed and cancelled are terminal.

Provide:
1. Transition diagram (mermaid or ASCII)
2. isValidTransition(from, to) signature
3. Error message format for invalid transitions
```

---

## Recorded Session — Data model field names (2026-07-15)

**Prompt used:** Prompt 2 (Data Model)

**AI suggested:** `assignee_id`, optional `TicketStatusHistory` collection.

**My decision:**
- ✏️ Changed to `assignedTo`, `createdBy` (camelCase, matches brief)
- ❌ Rejected status history table (Stretch complexity)

**Outcome:** `data-model.md`, Mongoose models. See `iteration-log.md` Session 2.

---

## Recorded Session — State machine (2026-07-15)

**Prompt used:** Prompt 5 (Status State Machine)

**AI suggested:** `open → closed` shortcut transition.

**My decision:** ❌ Rejected — only the 5 valid paths from the brief are allowed.

**Outcome:** `backend/src/utils/statusTransitions.js`. See `iteration-log.md` Session 3.

---

## Usage Notes

- Finalize data model and API contract **before** implementation.
- Cross-check design output against `requirements-analysis.md`.
- Update `design-notes.md` with decisions made during AI-assisted design.
