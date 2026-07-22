# Final AI Usage Summary

## Overview

| Field | Value |
|-------|-------|
| **AI Tool** | Cursor |
| **Project** | Support Ticket Management System (Core) |
| **Period** | 2026-07-14 – 2026-07-21 |
| **Prompt history** | [`ai-prompts/README.md`](ai-prompts/README.md) · [`ai-prompts/iteration-log.md`](ai-prompts/iteration-log.md) |
| **Repository** | https://github.com/skjain1812/support-ticket-mgmt-system/tree/dev |

## Time Allocation (assignment guidance)

| Category | Hours (est.) | % of effort |
|----------|--------------|-------------|
| Core implementation | ~10h | 31% |
| Lifecycle artifacts (docs, prompts, review, reflection) | ~22h | 69% |

Core was kept within the **8–12 hour** guidance. The majority of effort went into artifacts — requirements, design docs, prompt iteration records, debugging notes, code review, and reflection — which the assignment states is where feedback primarily focuses.

## Usage by Lifecycle Phase

### Requirements & Planning (~4h)
- **AI role:** Broke down assignment brief into Core vs Stretch; drafted requirements, acceptance criteria, and task breakdown
- **Human role:** Removed Stretch items from Core scope; rejected auth in Phase 1; verified state machine rules match brief
- **Prompts:** `ai-prompts/planning.md` · **Session:** `iteration-log.md` #1

### Design (~4h)
- **AI role:** Proposed ERD, API contract, UI flows, folder structure
- **Human role:** Corrected entity fields (`assignedTo`, `createdBy`); rejected status history table; finalized state machine with `cancelled`
- **Prompts:** `ai-prompts/design.md` · **Sessions:** `iteration-log.md` #2, #3

### Implementation (~10h)
- **AI role:** Scaffolded Express API, React pages, Mongoose models, seed script, centralized error handling
- **Human role:** Reviewed state machine service; separated status endpoint; phased frontend tasks; rejected priority filter
- **Prompts:** `ai-prompts/implementation.md` · **Sessions:** `iteration-log.md` #4, #6

### Testing (~3h)
- **AI role:** Created `tests/` infrastructure; drafted integration tests for transitions, CRUD validation, comments
- **Human role:** Fixed Jest module paths; rejected auth test suite; ran full suite; documented 30/30 in `test-results.md`
- **Prompts:** `ai-prompts/testing.md` · **Session:** `iteration-log.md` #7

### Debugging (~2h)
- **AI role:** Diagnosed `dotenv` path issues, MongoDB connection errors, wrong model imports, Jest paths
- **Human role:** Applied minimal fixes; verified with scripts and API calls; documented 4 issues in `debugging-notes.md`
- **Prompts:** `ai-prompts/debugging.md` · **Sessions:** `iteration-log.md` #5 + debugging-notes Issues 1–4

### Code Review (~3h)
- **AI role:** Full-stack review against acceptance criteria and API contract; categorized findings; generated fix plan
- **Human role:** Applied 8 Major fixes; deferred auth/pagination as Stretch; documented rejections
- **Prompts:** `ai-prompts/code-review.md` · **Session:** `iteration-log.md` #8

### Documentation (~6h)
- **AI role:** Generated artifact templates, README structure, PR description, reflection drafts
- **Human role:** Filled honest specifics; corrected auth claims; added iteration log and time allocation; verified setup
- **Prompts:** `ai-prompts/documentation.md` · **Session:** `iteration-log.md` #9

## Prompt History Highlights

Full chronological log: [`ai-prompts/iteration-log.md`](ai-prompts/iteration-log.md)

| # | Activity | Accepted | Changed | Rejected |
|---|----------|----------|---------|----------|
| 1 | Requirements scoping | Core feature list | Phase order | Auth in Phase 1 |
| 2 | Data model | 3 entities, MongoDB | Field names | Status history table |
| 3 | State machine | 5 valid paths, terminal states | — | Shortcut transitions |
| 4 | Backend API | Layered architecture, AppError | Separate status endpoint | Auth middleware |
| 5 | DB scripts | dbScriptUtils.js helper | — | — |
| 6 | Frontend | Phased pages, error states | Task order | Priority filter |
| 7 | Integration tests | 4 suites, 30 tests | Import paths | Auth tests |
| 8 | Code review | 8 Major fixes | — | JWT, pagination |
| 9 | Submission docs | Lifecycle structure | Auth claims, time table | — |

**Totals across sessions:** 18 accepted · 9 changed · 11 rejected · 4 deferred

## What I Avoided Sharing with AI

- Real database passwords (used placeholders and `.env.example`)
- Production URLs or credentials
- Personal data unrelated to the project

## Reusable Artifacts

| Artifact | Reuse Value |
|----------|-------------|
| `tool-specific/cursor-workflow/project-context.md` | Persistent context for any new feature |
| `tool-specific/cursor-workflow/cursor-rules-or-instructions.md` | Team coding standards for AI |
| `ai-prompts/iteration-log.md` | Audit trail of AI decisions — what to replicate in real projects |
| `ai-prompts/README.md` | Index for evaluators reviewing prompt history |
| `tool-workflow.md` | Documented AI workflow for onboarding |
| `tests/integration/helpers/testDb.js` | Reusable integration test setup |

## Honest Assessment

I used Cursor heavily — probably **60–70% of the initial code and test scaffolding** came from AI drafts. I am comfortable saying that because I also changed or rejected a meaningful share of what it suggested (see the accept/change/reject table above). The parts I fully own without hesitation are: the state machine rules, the decision to keep auth out of Core, the `dbScriptUtils.js` fix after a real `dotenv` failure, and the eight review fixes in `review-fixes.md`.

If you asked me in a coaching session to walk through the code, I would start in `statusTransition.service.js` and `statusTransitions.js`, then show `tests/integration/statusTransitions.invalid.test.js` — because that is the brief's signature requirement. I would not need to open AI chat history to explain those files.

What I would do differently next time: log each Cursor session **on the same day** instead of consolidating into `iteration-log.md` near submission, and add integration tests for search/filter when I first built the list API (I deferred that and noted it in review).

The prompt history is not decoration. `iteration-log.md` plus `debugging-notes.md` are how I prove I reviewed AI output rather than copy-pasting it. The working app matters, but the brief is clear that the **journey** matters too — that is what I optimised for after Core was stable.
