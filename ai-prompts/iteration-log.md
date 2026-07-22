# AI Iteration Log

Chronological record of key Cursor sessions during the Support Ticket Management System assignment. Each entry shows the prompt intent, AI output summary, my decision, and where the result landed.

**Period:** 2026-07-14 – 2026-07-22 · **Branch:** `dev` · **Tool:** Cursor

> **Date note:** Sessions 1–3 are planning/design work done before the first git commit (`2d14ea6` on 2026-07-20). Sessions 4–9 align with implementation commits on 2026-07-21–22. Where a commit hash is listed, it is authoritative.

---

## Session 1 — Requirements scoping (2026-07-14)

**Phase:** Planning · **Prompt file:** `planning.md` → Prompt 1

**What I asked:**
> Break down the assignment brief into Core (mandatory) vs Stretch (optional). Flag anything that looks like scope creep if treated as Core.

**AI output (summary):**
- Listed ticket CRUD, comments, search/filter, state machine as Core
- Included auth, user CRUD, pagination, Docker as Stretch
- Proposed Phase 1 with authentication — **over-scoped for Core**

**My decision:**

| Item | Decision | Reason |
|------|----------|--------|
| Ticket CRUD + state machine as Core | ✅ Accepted | Matches assignment brief |
| Auth in Phase 1 | ❌ Rejected | Brief says seed users only for Core |
| User management UI | ❌ Rejected | Stretch only |
| Pagination in list API | ❌ Rejected | Stretch only |

**Artifact updated:** `requirements-analysis.md`, `implementation-plan.md` (reordered phases: setup → API → frontend → tests → review)

---

## Session 2 — Stack and data model (2026-07-15)

**Phase:** Design · **Prompt file:** `design.md` → Prompt 2

**What I asked:**
> Design Mongoose schemas for User, Ticket, Comment per Core scope. No password field. Expose `assignedTo` and `createdBy` as ObjectId refs.

**AI output (summary):**
- Proposed User, Ticket, Comment entities
- Initially suggested PostgreSQL-style naming (`assignee_id`)
- Added optional `TicketStatusHistory` audit table

**My decision:**

| Item | Decision | Reason |
|------|----------|--------|
| Three entities (User, Ticket, Comment) | ✅ Accepted | Matches Core spec |
| Field names `assignedTo`, `createdBy` | ✏️ Changed | Corrected to match assignment wording |
| Status history collection | ❌ Rejected | Out of Core scope; state on Ticket is enough |
| MongoDB over PostgreSQL | ✅ Accepted | Aligns with project template |

**Artifact updated:** `data-model.md`, `backend/src/models/`

---

## Session 3 — State machine design (2026-07-15)

**Phase:** Design · **Prompt file:** `design.md` → Prompt 5

**What I asked:**
> Define valid status transitions. Backend must reject invalid transitions with HTTP 400 and consistent error shape.

**AI output (summary):**
- Correct 5-path transition map
- Suggested `open → closed` as shortcut — **invalid per brief**
- Proposed reopening `cancelled → open` — **invalid**

**My decision:**

| Item | Decision | Reason |
|------|----------|--------|
| 5 valid transitions | ✅ Accepted | Non-negotiable Core rule |
| `cancelled` as terminal | ✅ Accepted | Documented in `design-notes.md` |
| Shortcut transitions | ❌ Rejected | All invalid paths must return 400 |
| `isValidTransition(from, to)` pure function | ✅ Accepted | Implemented in `statusTransitions.js` |

**Artifact updated:** `design-notes.md`, `backend/src/utils/statusTransitions.js`, `backend/src/services/statusTransition.service.js`

---

## Session 4 — Backend API implementation (2026-07-21)

**Phase:** Implementation · **Prompt file:** `implementation.md` → Prompt 4

**What I asked:**
> Implement ticket CRUD per `api-contract.md`. Separate PATCH for status. Enforce state machine in service layer, not route handler.

**AI output (summary):**
- Layered routes → controllers → services
- Status change on general PATCH endpoint — **wrong separation**
- Suggested auth middleware on all routes

**My decision:**

| Item | Decision | Reason |
|------|----------|--------|
| Layered architecture | ✅ Accepted | Matches coding standards |
| `PATCH /:id/status` separate endpoint | ✏️ Changed | Split status from field updates per contract |
| Auth middleware | ❌ Rejected | Core uses seed users only |
| `AppError` + centralized handler | ✅ Accepted | Consistent `{ error, details }` shape |

**Validated:** Manual `curl` calls; later covered by 30 integration tests.

**Commit:** `47e51a0` — Backend APIs implemented

---

## Session 5 — Database script module resolution (2026-07-21)

**Phase:** Debugging · **Prompt file:** `debugging.md` → Prompt 1

**What I asked:**
> `npm run db:init` fails: `Cannot find module 'dotenv'`. Scripts are in `database/` but `node_modules` is in `backend/`.

**Error:**
```
Error: Cannot find module 'dotenv'
Require stack: database/init-indexes.js
```

**AI output (summary):**
- Suggested `require.resolve` with `paths: [backendRoot]`
- Proposed shared `database/dbScriptUtils.js`

**My decision:** ✅ Accepted shared helper approach

**Validated:** `npm run db:init` and `npm run seed` from `backend/` — seed output: Users 3, Tickets 5, Comments 4

**Artifact updated:** `database/dbScriptUtils.js`, `debugging-notes.md` (Issue 1)

---

## Session 6 — Frontend phasing (2026-07-21)

**Phase:** Implementation · **Prompt file:** `implementation.md` → Prompt 7

**What I asked:**
> Implement ticket detail page per `ui-flow.md` — but only tasks 3.3–3.7 as phased in `tasks.md` (read-only first, then edits).

**AI output (summary):**
- Generated all-in-one detail page with inline edit, status change, and comments in single pass
- Included priority filter on list page — **Stretch**

**My decision:**

| Item | Decision | Reason |
|------|----------|--------|
| Phased detail page (read → edit → status → comments) | ✏️ Changed | Split to match task breakdown; easier to validate |
| Priority filter on list | ❌ Rejected | Stretch; Core is status filter + keyword search only |
| Loading/empty/error states | ✅ Accepted | Core acceptance criteria |

**Commit:** `b4889e8` — Frontend UI implemented

---

## Session 7 — Integration tests (2026-07-21)

**Phase:** Testing · **Prompt file:** `testing.md` → Prompt 5 (adapted for Core)

**What I asked:**
> Write integration tests for state machine (mandatory), CRUD validation, and comments. Use separate test DB. No auth setup.

**AI output (summary):**
- 4 test suites with supertest
- Wrong relative import paths from `tests/integration/`
- Suggested running against dev database

**My decision:**

| Item | Decision | Reason |
|------|----------|--------|
| Integration tests over unit tests for state machine | ✅ Accepted | Mandatory Core requirement |
| Separate `support_tickets_test` database | ✅ Accepted | Avoid polluting dev data |
| Auth test suite | ❌ Rejected | Stretch; not in Core |
| Import path fixes | ✏️ Changed | `../../database/` from test helpers |

**Validated:** `npm test` — **30/30 passed**

**Artifact updated:** `test-results.md`, `debugging-notes.md` (Issue 3)

**Commit:** `f5f0995` — Unit and Integration test cases

---

## Session 8 — Self code review (2026-07-21)

**Phase:** Review · **Prompt file:** `code-review.md` → Prompts 1, 3, 6

**What I asked:**
> Review full codebase against `acceptance-criteria.md` and `api-contract.md`. Categorize findings. Create fix plan for Major items only.

**AI output (summary):**
- 8 Major findings (type validation, error shape, a11y, UX)
- Suggested adding JWT before submission — **deferred**
- Suggested pagination — **deferred**

**My decision:**

| Finding | Decision | Fix |
|---------|----------|-----|
| M-01 Non-string inputs → 500 | ✅ Fixed | F-01 `fieldValidation.js` |
| M-02 No max length | ✅ Fixed | F-02 model maxlength |
| M-03 Transition errors missing `details` | ✅ Fixed | F-03 |
| M-04 No JSON body limit | ✅ Fixed | F-04 |
| M-05–M-08 Frontend a11y/UX | ✅ Fixed | F-05–F-08 |
| M-09 Client-supplied `createdBy` | ⏸ Deferred | No auth in Core |
| M-11 Pagination | ⏸ Deferred | Stretch |

**Validated:** Re-ran `npm test` — 30/30 after fixes

**Artifacts updated:** `code-review-notes.md`, `review-fixes.md`

**Commit:** `4335fb1` — Review & Documentation done

---

## Session 9 — Submission documentation (2026-07-21 – 2026-07-22)

**Phase:** Documentation · **Prompt file:** `documentation.md` → Prompts 3, 4

**What I asked:**
> Draft `reflection.md` and `final-ai-usage-summary.md`. Be honest about what AI got wrong and how I validated output.

**AI output (summary):**
- Generic reflection template
- Claimed auth was implemented — **incorrect for Core**

**My decision:**

| Item | Decision | Reason |
|------|----------|--------|
| Lifecycle phase table | ✅ Accepted | Good structure |
| "Auth implemented" claim | ✏️ Changed | Corrected to seed-users-only Core scope |
| Time allocation section | ✏️ Added | Addresses assignment guidance on 8–12h Core |
| Prompt iteration log | ✏️ Added | This file + updated `ai-prompts/` |

**Artifacts updated:** `reflection.md`, `final-ai-usage-summary.md`, `candidate-info.md`, `ai-prompts/README.md`

**Commit:** `9b550d8` — Finalize submission docs

---

## Summary: accept / change / reject counts

| Decision | Count | Examples |
|----------|-------|---------|
| ✅ Accepted | 18 | Layered backend, state machine map, integration tests, 8 review fixes |
| ✏️ Changed | 9 | Field names, phased frontend, import paths, reflection corrections |
| ❌ Rejected | 11 | Auth in Core, pagination, priority filter, status shortcuts, audit table |
| ⏸ Deferred | 4 | JWT, pagination, helmet, search integration tests |

## Validation gates used

1. `npm run db:init && npm run seed` — database scripts
2. `curl` / smoke payloads — API contract compliance
3. `cd tests && npm test` — 30/30 integration tests
4. Manual UI walkthrough — acceptance criteria checklist
5. `git diff` review — no secrets, no Stretch scope creep
