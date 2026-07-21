# Final AI Usage Summary

## Overview

| Field | Value |
|-------|-------|
| **AI Tool** | Cursor |
| **Project** | Support Ticket Management System (Core) |
| **Period** | 2026-07-20 – 2026-07-21 |

## Usage by Lifecycle Phase

### Requirements & Planning
- **AI role:** Broke down assignment brief into Core vs Stretch; drafted requirements, acceptance criteria, and task breakdown
- **Human role:** Removed Stretch items from Core scope; verified state machine rules match brief; chose MongoDB stack
- **Prompts:** `ai-prompts/planning.md`

### Design
- **AI role:** Proposed ERD, API contract, UI flows, folder structure
- **Human role:** Corrected entity fields (`assignedTo`, `createdBy`); added Comment entity; finalized state machine with `cancelled`
- **Prompts:** `ai-prompts/design.md`

### Implementation
- **AI role:** Scaffolded Express API, React pages, Mongoose models, seed script, centralized error handling
- **Human role:** Reviewed state machine service; verified backend validation; phased frontend tasks (read-only detail before edits)
- **Prompts:** `ai-prompts/implementation.md`

### Testing
- **AI role:** Created `tests/` infrastructure; drafted integration tests for transitions, CRUD validation, comments
- **Human role:** Fixed Jest module paths; ran full suite; documented 30/30 results in `test-results.md`
- **Prompts:** `ai-prompts/testing.md`

### Debugging
- **AI role:** Diagnosed `dotenv` path issues, MongoDB connection errors, wrong model imports
- **Human role:** Applied minimal fixes; verified with scripts and API calls; documented in `debugging-notes.md`
- **Prompts:** `ai-prompts/debugging.md`

### Code Review
- **AI role:** Full-stack review against acceptance criteria and API contract; categorized findings
- **Human role:** Applied 8 Major fixes; deferred auth/pagination/helmet as Stretch; documented rejections
- **Prompts:** `ai-prompts/code-review.md`

### Documentation
- **AI role:** Generated artifact templates, README structure, PR description, reflection drafts
- **Human role:** Filled honest specifics; verified setup instructions; updated task progress
- **Prompts:** `ai-prompts/documentation.md`

## Prompt History Highlights

| # | Activity | Accepted | Changed | Rejected |
|---|----------|----------|---------|----------|
| 1 | State machine service | Transition map structure | Added `cancelled` paths per spec | Reopen from `closed` |
| 2 | API contract | Endpoint list, error shape | Added comments endpoint | Auth endpoints (Core scope) |
| 3 | Database setup | Mongoose models + seed | `dbScriptUtils.js` for script paths | PostgreSQL (switched to MongoDB) |
| 4 | Frontend phasing | Page scaffolding | Split detail view vs edit features by task | All-in-one detail page |
| 5 | Integration tests | Jest + supertest structure | Fixed relative import paths | Running tests against dev DB |
| 6 | Error handling | Centralized middleware | Added 404 handler + `details` on transitions | Stack traces to client |
| 7 | Code review fixes | Type validation, a11y links | 8 fixes applied | Auth before submission |

## What I Avoided Sharing with AI

- Real database passwords (used placeholders and `.env.example`)
- Production URLs or credentials
- Unrelated personal information

## Reusable Artifacts

| Artifact | Reuse Value |
|----------|-------------|
| `tool-specific/cursor-workflow/project-context.md` | Persistent context for any new feature |
| `tool-specific/cursor-workflow/cursor-rules-or-instructions.md` | Team coding standards for AI |
| `tool-specific/cursor-workflow/tasks.md` | Phased task tracking with status |
| `ai-prompts/` | Prompt templates by lifecycle activity |
| `tool-workflow.md` | Documented AI workflow for onboarding |
| `tests/integration/helpers/testDb.js` | Reusable integration test setup |

## Honest Assessment

AI significantly accelerated scaffolding and test generation — the project structure, API layers, and 30 integration tests would have taken much longer manually. The areas requiring the most human judgment were scope control (Core vs Stretch), validating the state machine against the brief, and catching environment-specific issues (Windows paths, MongoDB setup, Jest module resolution).

I understand the final code: the status transition logic lives in `statusTransition.service.js` + `statusTransitions.js`, validation is in services (not routes), and the frontend mirrors backend rules via `getNextStatuses()`. AI occasionally over-scoped (auth, pagination) or under-specified paths (database scripts), but each issue was caught through running commands and tests rather than accepting output blindly.
