# Implementation Plan

## Overview

Build the Support Ticket Management System Core in four phases: setup, backend API, frontend UI, and mandatory state-machine tests. Documentation and review artifacts are maintained throughout, not deferred to the end.

## Task Breakdown

### Phase 1 — Setup (Day 1)

- Initialize backend (Express) and frontend (React/Vite)
- Create MongoDB collections/schemas: users, tickets, comments (Mongoose models)
- Write Mongoose models, index init, and seed scripts
- Configure `.env.example` and `database/setup-notes.md`
- Verify README setup flow

### Phase 2 — Backend API (Day 2–3)

- `GET /api/users` — seed users for assignee dropdown
- Ticket CRUD: create, list (search + status filter), detail, update
- Status transition service with state machine enforcement
- `PATCH /api/tickets/:id/status` — validated transitions only
- `POST /api/tickets/:id/comments` — add comment
- Input validation and centralized error handling

### Phase 3 — Frontend UI (Day 3–4)

- Ticket list with keyword search and status filter
- Create ticket form
- Ticket detail: update fields, change status, assign, comments
- Error, loading, and empty states

### Phase 4 — Testing & Submission (Day 5–7)

- Integration tests for state machine (mandatory)
- Integration tests for validation (title, comment message)
- Self code review and fixes
- Complete reflection, AI usage summary, PR description
- Final README verification

## Milestones

| Milestone | Deliverable |
|-----------|-------------|
| M1 | Database running with seed data |
| M2 | All API endpoints working via curl/Postman |
| M3 | Full UI flow working in browser |
| M4 | State-machine integration tests passing |
| M5 | All artifacts complete, ready for submission |

## AI Usage Plan

| Phase | AI Role | Human Role |
|-------|---------|------------|
| Planning | Draft requirements, plan, API contract | Verify against assignment brief |
| Design | Propose schema, UI flows | Finalize state machine rules |
| Implementation | Scaffold routes, components, Mongoose models | Review state machine and validation logic |
| Testing | Draft integration test cases | Verify invalid transition coverage |
| Debugging | Suggest fixes from error logs | Validate fixes independently |
| Review | Flag security and quality issues | Prioritize and apply fixes |
| Documentation | Draft artifact templates | Fill in honest, specific details |

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| State machine bugs | High — Core signature piece | Write integration tests early; review logic manually |
| Scope creep (adding auth) | Medium | Stick to Core; document Stretch separately |
| Setup instructions broken | Medium | Test README on clean environment before submission |
| Shallow prompt history | Medium | Save prompts as you go in `ai-prompts/` |

## Mitigation

- Reference `tool-specific/cursor-workflow/spec.md` in every implementation prompt
- Commit after each phase milestone
- Run integration tests after backend Phase 2, not only at the end
- Keep `tasks.md` updated with current status
