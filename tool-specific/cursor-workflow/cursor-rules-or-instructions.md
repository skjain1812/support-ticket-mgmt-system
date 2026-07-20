# Cursor Rules and Instructions

Persistent rules for AI-assisted development in this repository.

## Project Rules

1. **Core first.** Implement mandatory Core features before any Stretch items.
2. **Spec-driven.** Read `spec.md`, `api-contract.md`, and `data-model.md` before writing code.
3. **State machine is sacred.** Never allow invalid status transitions. Backend enforcement is mandatory; frontend is supplementary.
4. **No auth in Core.** Users are seed data only unless explicitly implementing Stretch.
5. **Minimal diffs.** Change only what the task requires. No unrelated refactors.

## Code Style

### Backend (Node.js / Express)

- Use `async/await`; wrap route handlers with error middleware
- Folder structure: `routes/` → `controllers/` → `services/` → `models/`
- Use Mongoose with validated queries — validate ObjectId format on route params
- Return errors as `{ "error": "message", "details": [] }`
- HTTP status codes: 200, 201, 400, 404, 500

### Frontend (React / Vite)

- Functional components with hooks
- API calls in `services/` layer, not inside components directly
- Handle loading, error, and empty states on every data-fetching page
- Form validation before API call; display backend errors to user

### Database

- MongoDB with Mongoose models in `backend/src/models/`
- Index initialization script in `database/init-indexes.js`
- Seed script in `database/seed.js`
- Use camelCase field names in documents, camelCase in API JSON

## Status Transition Rules

```javascript
const VALID_TRANSITIONS = {
  open:         ['in_progress', 'cancelled'],
  in_progress:  ['resolved', 'cancelled'],
  resolved:     ['closed'],
  closed:       [],
  cancelled:    [],
};
```

Implement `isValidTransition(from, to)` and use it in the service layer before any DB update.

## Testing Rules

- Integration tests for state machine are **mandatory** before marking Phase 4 complete
- Test both valid and invalid transitions
- Use a separate test database; never run tests against dev seed data
- Test file location: `tests/integration/`

## What NOT to Do

- Do not add authentication unless implementing Stretch
- Do not add user management UI in Core
- Do not commit `.env` files or secrets
- Do not skip backend validation because the frontend validates
- Do not accept AI-generated state machine logic without reading it
- Do not add new npm dependencies without justification

## When Asking Cursor for Help

Always include:

1. Which task from `tasks.md` you are working on
2. Relevant spec section or API endpoint
3. Full error message if debugging
4. What you already tried

## Review Checklist (Before Marking a Task Done)

- [ ] Matches `api-contract.md` request/response shapes
- [ ] Backend validation in place
- [ ] Error states handled in UI
- [ ] No secrets or console.log noise
- [ ] Tests updated or added if behavior changed
- [ ] `tasks.md` status updated

## File References

| Need | Read |
|------|------|
| What to build | `spec.md` |
| How to build API | `api-contract.md` |
| Database schema | `data-model.md` |
| UI screens | `ui-flow.md` |
| What tests to write | `test-strategy.md` |
| Done definition | `acceptance-criteria.md` (this folder) |
| AI prompt templates | `ai-prompts/` |
