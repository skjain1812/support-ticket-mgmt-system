# Requirement Analysis

## Selected Project Option

**Support Ticket Management System** — Backend-heavy option (Core mandatory, Stretch optional).

## My Understanding (in your own words)

I chose the Support Ticket Management System because it matches my day-to-day work as an Associate Technical Lead — backend APIs, data modelling, validation, and making business rules explicit in code. The application itself is intentionally small: internal users create tickets, update them, comment, search/filter the list, and move tickets through a fixed lifecycle.

The part I treated as non-negotiable is the **status state machine**. Only five transitions are valid; everything else must fail at the API with a clear error, and the UI must not pretend invalid moves are possible. That is where engineering judgment shows, not in adding auth or pagination for this exercise.

Users are seed data only in Core — no login, no user-management UI. I also understood early that the assessment is not about shipping a large product. It is about showing how I use AI across planning, design, implementation, testing, debugging, review, and documentation, with evidence I reviewed and owned the output. I read the brief and drafted requirements/planning locally from **2026-07-14**; my first git commit was **2026-07-20**, with Core implementation concentrated on **2026-07-21**.

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
| 1 | Can the same status transition be a no-op (e.g. open → open)? | Yes — same-status is a no-op; documented in `design-notes.md` and `data-model.md` |
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
