# Acceptance Criteria (Cursor Workflow)

Testable criteria for Core completion. Cursor should reference this file when implementing or reviewing features.

## Core — Ticket Management

- [ ] User can create a ticket via the UI (title required)
- [ ] User can view all tickets from the database on the list page
- [ ] User can open a ticket detail view showing all fields and comments
- [ ] User can update ticket title, description, priority, and assignee
- [ ] User can add a comment to a ticket (message required)
- [ ] New ticket defaults to status `open` and priority `medium`

## Core — Status State Machine

- [ ] `open` → `in_progress` succeeds
- [ ] `open` → `cancelled` succeeds
- [ ] `in_progress` → `resolved` succeeds
- [ ] `in_progress` → `cancelled` succeeds
- [ ] `resolved` → `closed` succeeds
- [ ] Invalid transitions are rejected by the backend (HTTP 400)
- [ ] Frontend shows a clear error when an invalid transition is attempted
- [ ] Frontend only offers valid next statuses in the UI

## Core — Search and Filter

- [ ] Keyword search matches tickets by title or description
- [ ] Status filter limits the ticket list correctly
- [ ] Search and filter can be combined

## Core — Persistence and Validation

- [ ] Data remains available after application restart
- [ ] Backend rejects tickets without a title (400)
- [ ] Backend rejects comments without a message (400)
- [ ] Backend rejects invalid enum values (status, priority)
- [ ] Backend rejects invalid `assignedTo` / `createdBy` user references

## Core — Error Handling

- [ ] API returns consistent JSON error responses
- [ ] UI shows meaningful error messages (not raw stack traces)
- [ ] Loading and empty states are handled on all data-fetching screens

## Core — Testing

- [ ] State-machine integration tests pass (valid transitions succeed)
- [ ] State-machine integration tests pass (invalid transitions rejected)
- [ ] Test results documented in `test-results.md`

## Core — Documentation and Setup

- [ ] README contains accurate setup instructions
- [ ] Mongoose models, index init, and seed data provided in `database/`
- [ ] `database/setup-notes.md` explains local database setup
- [ ] No secrets committed to the repository
- [ ] `.env.example` provided (if environment variables used)

## Core — AI Workflow Artifacts

- [ ] `tool-workflow.md` completed (Part A)
- [ ] Prompt history in `ai-prompts/` with iteration evidence
- [ ] `reflection.md` and `final-ai-usage-summary.md` completed
- [ ] Cursor workflow files in `tool-specific/cursor-workflow/` maintained

## Stretch (Optional — not required for Core completion)

- [ ] Authentication with login/logout
- [ ] Protected routes and API authorization
- [ ] User CRUD and role management UI
- [ ] Filter by priority and assignee; sorting; pagination
- [ ] Unit tests and additional edge-case tests
- [ ] OpenAPI/Swagger documentation
- [ ] Docker setup and CI workflow
