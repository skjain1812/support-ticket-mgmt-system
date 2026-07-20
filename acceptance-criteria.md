# Acceptance Criteria

## Core

- [ ] User can create a ticket via the UI
- [ ] User can view all tickets from the database
- [ ] User can open a ticket detail view
- [ ] User can update ticket fields and reassign
- [ ] User can add comments
- [ ] Status changes only through valid transitions; invalid ones are rejected
- [ ] Keyword search and status filter work
- [ ] Data remains available after restart
- [ ] Backend validation prevents invalid records
- [ ] No secrets committed to the repo
- [ ] State-machine integration tests pass

## Validation

- [ ] Title is required on ticket create (backend + frontend)
- [ ] Comment message is required (backend + frontend)
- [ ] Invalid priority/status enum values rejected by backend
- [ ] Invalid `assignedTo` user ID rejected by backend

## Error Handling

- [ ] API returns consistent JSON error shape with appropriate HTTP status codes
- [ ] UI displays user-friendly messages for validation failures
- [ ] UI displays clear message when invalid status transition is attempted
- [ ] Loading and empty states handled on all pages

## Testing

- [ ] Integration tests: all 5 valid status transitions succeed
- [ ] Integration tests: invalid transitions return 400
- [ ] Integration tests: ticket create without title returns 400
- [ ] Integration tests: comment without message returns 400
- [ ] Results recorded in `test-results.md`

## Documentation

- [ ] `tool-workflow.md` completed (Part A)
- [ ] README setup instructions work end-to-end
- [ ] `database/setup-notes.md` explains database setup
- [ ] Prompt history in `ai-prompts/` shows iteration and review
- [ ] `reflection.md` and `final-ai-usage-summary.md` completed
- [ ] Cursor workflow files in `tool-specific/cursor-workflow/` maintained

## Stretch (Optional)

- [ ] Authentication with protected routes
- [ ] User CRUD and role management
- [ ] Priority/assignee filters, sorting, pagination
- [ ] Unit tests and edge-case tests beyond Core
- [ ] OpenAPI/Swagger, Docker, CI
