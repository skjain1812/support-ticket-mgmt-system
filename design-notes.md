# Design Notes

## Architecture Overview

Three-tier architecture: React SPA → Express REST API → MongoDB.

```
┌─────────────┐     HTTP/JSON      ┌─────────────┐   Mongoose    ┌─────────────┐
│  Frontend   │ ◄───────────────►  │   Backend   │ ◄───────────►  │   MongoDB   │
│  React/Vite │                    │   Express   │                │             │
└─────────────┘                    └─────────────┘                └─────────────┘
```

No authentication in Core — users are seed data referenced by ID.

## Frontend Design

| Route | Page | Key Components |
|-------|------|----------------|
| `/tickets` | Ticket list | SearchBar, StatusFilter, TicketTable |
| `/tickets/new` | Create ticket | TicketForm |
| `/tickets/:id` | Ticket detail | TicketFields, StatusSelector, AssigneeDropdown, CommentList, CommentForm |

**State management:** React hooks + API service layer. No global state library needed for Core scope.

**Status selector:** Dynamically show only valid next statuses based on current status (from state machine map). On API error, show message and revert selection.

## Backend Design

```
routes/ → controllers/ → services/ → models/
```

**Key service:** `statusTransitionService` — single source of truth for valid transitions.

```javascript
const VALID_TRANSITIONS = {
  open:         ['in_progress', 'cancelled'],
  in_progress:  ['resolved', 'cancelled'],
  resolved:     ['closed'],
  closed:       [],
  cancelled:    [],
};
```

Controllers handle HTTP; services enforce business rules; models handle DB queries.

### Same-status requests (clarification)

Per `requirements-analysis.md` clarification #1: a ticket already in status `open` may receive `PATCH /tickets/:id/status` with `status: "open"` again. This is treated as a **no-op** — valid, returns the current ticket unchanged. It is not a lifecycle transition. All cross-status moves still follow `VALID_TRANSITIONS` only. Documented in `data-model.md` and implemented in `isValidTransition()` (`from === to` returns true).

## Database Design

Three collections: `users`, `tickets`, `comments`. See `data-model.md` for Mongoose schemas.

- Users seeded only — no password field needed in Core
- Tickets reference users via `createdBy` and `assignedTo` (ObjectId refs)
- Comments reference tickets and users
- Indexes on `status`, text index on `title` + `description` (for keyword search)
- State machine enforced in service layer (not at DB level)

## Validation Strategy

| Input | Backend Rule | Frontend Rule |
|-------|-------------|---------------|
| Ticket title | Required, max 200 chars | Required indicator, disable submit if empty |
| Comment message | Required, non-empty | Required indicator |
| Status transition | Must be in VALID_TRANSITIONS | Only show valid options |
| Priority | Must be valid enum | Dropdown with fixed options |
| assignedTo | Must reference existing user ID | Dropdown from seed users |

Backend validation is authoritative — frontend validation is UX only.

## Error Handling Strategy

**Backend:** Centralized error middleware returns:

```json
{ "error": "Invalid status transition from 'open' to 'closed'", "details": [] }
```

| Status | When |
|--------|------|
| 400 | Validation failure, invalid transition |
| 404 | Ticket or user not found |
| 500 | Unexpected server error (no stack trace in response) |

**Frontend:** Display `error` field from API response. Show inline validation before submit. Handle network failures with retry message.

## Testing Strategy Link

See `test-strategy.md`. Mandatory: integration tests for state machine in `tests/integration/`.
