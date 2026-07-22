# Acceptance Criteria

## Core

- [x] User can create a ticket via the UI
- [x] User can view all tickets from the database
- [x] User can open a ticket detail view
- [x] User can update ticket fields and reassign
- [x] User can add comments
- [x] Status changes only through valid transitions; invalid ones are rejected
- [x] Keyword search and status filter work
- [x] Data remains available after restart
- [x] Backend validation prevents invalid records
- [x] No secrets committed to the repo
- [x] State-machine integration tests pass
- [x] Unit tests for `isValidTransition` pass
- [x] Search/filter integration tests pass

## Validation

- [x] Title is required on ticket create (backend + frontend)
- [x] Comment message is required (backend + frontend)
- [x] Invalid priority/status enum values rejected by backend
- [x] Invalid `assignedTo` user ID rejected by backend

## Error Handling

- [x] API returns consistent JSON error shape with appropriate HTTP status codes
- [x] UI displays user-friendly messages for validation failures
- [x] UI displays clear message when invalid status transition is attempted
- [x] Loading and empty states handled on all pages

## Testing

- [x] Integration tests: all 5 valid status transitions succeed
- [x] Integration tests: invalid transitions return 400
- [x] Integration tests: ticket create without title returns 400
- [x] Integration tests: comment without message returns 400
- [x] Results recorded in `test-results.md`

## Documentation

- [x] `tool-workflow.md` completed (Part A)
- [x] README setup instructions work end-to-end
- [x] `database/setup-notes.md` explains database setup
- [x] Prompt history in `ai-prompts/` shows iteration and review
- [x] `reflection.md` and `final-ai-usage-summary.md` completed
- [x] Cursor workflow files in `tool-specific/cursor-workflow/` maintained

## Stretch (Optional)

- [ ] Authentication with protected routes
- [ ] User CRUD and role management
- [ ] Priority/assignee filters, sorting, pagination
- [ ] Unit tests and edge-case tests beyond Core
- [ ] OpenAPI/Swagger, Docker, CI
