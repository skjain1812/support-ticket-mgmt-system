# Requirement Analysis

## Selected Project Option

**Support Ticket Management System** — Backend-heavy option (Core mandatory, Stretch optional).

## My Understanding (in your own words)

This is a small internal app for managing support tickets. Support staff create tickets, update them, add comments, search/filter the list, and move tickets through a strict status lifecycle. The hardest part is the state machine — only certain status transitions are allowed, and both backend and frontend must enforce this clearly.

Users exist only as seed data in Core (no login, no user management UI). The focus of the assessment is demonstrating thoughtful AI-assisted engineering across the full lifecycle — planning, design, implementation, testing, debugging, review, and documentation — not building a large application.

## Functional Requirements

### Core (Mandatory)

| ID | Requirement |
|----|-------------|
| FR-01 | Create a ticket (title, description, priority) |
| FR-02 | List all tickets from the database |
| FR-03 | View ticket detail including comments |
| FR-04 | Update ticket fields (title, description, priority, assignee) |
| FR-05 | Change status only through valid state machine transitions |
| FR-06 | Add comments to a ticket |
| FR-07 | Keyword search across ticket title and description |
| FR-08 | Filter tickets by status |
| FR-09 | Persist all data — survives application restart |
| FR-10 | Backend validates required fields and rejects invalid input |
| FR-11 | UI shows meaningful error states |

### Stretch (Optional)

| ID | Requirement |
|----|-------------|
| FR-S01 | Authentication (JWT/session), protected routes |
| FR-S02 | Full user CRUD and role management |
| FR-S03 | Filter by priority and assignee; sorting; pagination |
| FR-S04 | OpenAPI/Swagger documentation |
| FR-S05 | Docker setup and CI workflow |

## Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | Application runs locally from README instructions |
| NFR-02 | Database setup via Mongoose models, index init, and seed scripts |
| NFR-03 | No secrets committed to repository |
| NFR-04 | Consistent API error responses |
| NFR-05 | State-machine integration tests pass |
| NFR-06 | Full lifecycle artifacts in repository |

## Assumptions

- Single internal team; no multi-tenancy
- English-only UI
- `createdBy` set from a default seed user or request body (no auth in Core)
- Assignee dropdown populated from seeded users via `GET /api/users`
- Priority filter is Stretch, not Core

## Clarifications (questions for a product owner)

| # | Question | Resolution |
|---|----------|------------|
| 1 | Can the same status transition be a no-op (e.g. open → open)? | Treat as invalid or no-op — document in design-notes |
| 2 | Should cancelled tickets be reopenable? | No — cancelled is terminal per state machine |
| 3 | Is email notification needed? | Out of scope |

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Create ticket without title | Backend 400; UI shows validation error |
| Comment without message | Backend 400; UI shows validation error |
| Invalid status transition (e.g. open → closed) | Backend 400; UI shows transition error |
| Assign to non-existent user | Backend 400 |
| Search with no matches | Empty list with helpful message |
| Ticket with no comments | Detail page shows empty comments section |
| Terminal states (closed, cancelled) | No further transitions allowed |
| Restart application | All tickets, comments, and users persist |
