# Tasks

Ordered task breakdown for the Support Ticket Management System. Update status as work progresses.

**Status legend:** ☐ Not started · ◐ In progress · ☑ Done

---

## Phase 1 — Project Setup

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Initialize backend (Express, folder structure) | ☑ | `backend/` |
| 1.2 | Initialize frontend (React + Vite) | ☑ | `frontend/` |
| 1.3 | Create Mongoose models and index init script | ☑ | `backend/src/models/`, `database/init-indexes.js` |
| 1.4 | Create seed script (users, sample tickets, comments) | ☑ | `database/seed.js` |
| 1.5 | Write `database/setup-notes.md` and `.env.example` | ☑ | |
| 1.6 | Verify README setup instructions end-to-end | ☑ | Verified 2026-07-21; see `test-results.md` |

---

## Phase 2 — Backend API

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | GET /api/users — list seed users | ☑ | For assignee dropdown |
| 2.2 | POST /api/tickets — create with validation | ☑ | Title required |
| 2.3 | GET /api/tickets — list with search + status filter | ☑ | Core requirement |
| 2.4 | GET /api/tickets/:id — detail with comments | ☑ | |
| 2.5 | PATCH /api/tickets/:id — update fields | ☑ | title, description, priority, assignedTo |
| 2.6 | Implement status transition service | ☑ | State machine logic |
| 2.7 | PATCH /api/tickets/:id/status — change status | ☑ | Reject invalid transitions |
| 2.8 | POST /api/tickets/:id/comments — add comment | ☑ | Message required |
| 2.9 | Centralized error handling middleware | ☑ | Consistent JSON errors |

---

## Phase 3 — Frontend UI

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Ticket list page with search and status filter | ☑ | `/tickets` |
| 3.2 | Create ticket form | ☑ | `/tickets/new` |
| 3.3 | Ticket detail page | ☑ | `/tickets/:id` |
| 3.4 | Update ticket fields on detail page | ☑ | |
| 3.5 | Status change UI (valid options only) | ☑ | Show error on invalid |
| 3.6 | Assignee dropdown (from seed users) | ☑ | |
| 3.7 | Comments section — list + add form | ☑ | |
| 3.8 | Loading, empty, and error states | ☑ | All pages |

---

## Phase 4 — Testing (Mandatory)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Integration tests: valid status transitions | ☑ | All 5 valid paths |
| 4.2 | Integration tests: invalid status transitions | ☑ | At least 5 invalid cases |
| 4.3 | Integration tests: ticket CRUD validation | ☑ | Missing title, etc. |
| 4.4 | Integration tests: comment creation | ☑ | Missing message |
| 4.5 | Record results in `test-results.md` | ☑ | |

---

## Phase 5 — Review & Documentation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 5.1 | Self code review → `code-review-notes.md` | ☐ | |
| 5.2 | Apply fixes → `review-fixes.md` | ☐ | |
| 5.3 | Document debugging sessions → `debugging-notes.md` | ☐ | |
| 5.4 | Complete `reflection.md` | ☐ | |
| 5.5 | Complete `final-ai-usage-summary.md` | ☐ | |
| 5.6 | Write `pr-description.md` | ☐ | |
| 5.7 | Fill `candidate-info.md` | ☐ | |

---

## Phase 6 — Stretch (Optional)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 6.1 | Authentication (JWT) + protected routes | ☐ | |
| 6.2 | User CRUD and role management | ☐ | |
| 6.3 | Priority/assignee filters, sorting, pagination | ☐ | |
| 6.4 | Unit tests + edge-case tests | ☐ | |
| 6.5 | OpenAPI/Swagger documentation | ☐ | |
| 6.6 | Docker + CI workflow | ☐ | |

---

## Current Focus

_Update this section with what you are working on right now._

**Active task:** _5.1 — Self code review → code-review-notes.md_

**Blockers:** _None_
