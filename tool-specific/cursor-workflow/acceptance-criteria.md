# Acceptance Criteria (Cursor Workflow)

Testable criteria for Core completion. Cursor should reference this file when implementing or reviewing features.

## Core — Ticket Management

- [x] User can create a ticket via the UI (title required)
- [x] User can view all tickets from the database on the list page
- [x] User can open a ticket detail view showing all fields and comments
- [x] User can update ticket title, description, priority, and assignee
- [x] User can add a comment to a ticket (message required)
- [x] New ticket defaults to status `open` and priority `medium`

## Core — Status State Machine

- [x] `open` → `in_progress` succeeds
- [x] `open` → `cancelled` succeeds
- [x] `in_progress` → `resolved` succeeds
- [x] `in_progress` → `cancelled` succeeds
- [x] `resolved` → `closed` succeeds
- [x] Invalid transitions are rejected by the backend (HTTP 400)
- [x] Frontend shows a clear error when an invalid transition is attempted
- [x] Frontend only offers valid next statuses in the UI

## Core — Search and Filter

- [x] Keyword search matches tickets by title or description
- [x] Status filter limits the ticket list correctly
- [x] Search and filter can be combined

## Core — Persistence and Validation

- [x] Data remains available after application restart
- [x] Backend rejects tickets without a title (400)
- [x] Backend rejects comments without a message (400)
- [x] Backend rejects invalid enum values (status, priority)
- [x] Backend rejects invalid `assignedTo` / `createdBy` user references

## Core — Error Handling

- [x] API returns consistent JSON error responses
- [x] UI shows meaningful error messages (not raw stack traces)
- [x] Loading and empty states are handled on all data-fetching screens

## Core — Testing

- [x] State-machine integration tests pass (valid transitions succeed)
- [x] State-machine integration tests pass (invalid transitions rejected)
- [x] Test results documented in `test-results.md`

## Core — Documentation and Setup

- [x] README contains accurate setup instructions
- [x] Mongoose models, index init, and seed data provided in `database/`
- [x] `database/setup-notes.md` explains local database setup
- [x] No secrets committed to the repository
- [x] `.env.example` provided (if environment variables used)

## Core — AI Workflow Artifacts

- [x] `tool-workflow.md` completed (Part A)
- [x] Prompt history in `ai-prompts/` with iteration evidence
- [x] `reflection.md` and `final-ai-usage-summary.md` completed
- [x] Cursor workflow files in `tool-specific/cursor-workflow/` maintained

## Stretch (Optional — not required for Core completion)

- [ ] Authentication with login/logout
- [ ] Protected routes and API authorization
- [ ] User CRUD and role management UI
- [ ] Filter by priority and assignee; sorting; pagination
- [ ] Unit tests and additional edge-case tests
- [ ] OpenAPI/Swagger documentation
- [ ] Docker setup and CI workflow
