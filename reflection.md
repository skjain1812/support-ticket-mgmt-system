# Reflection

## What I Built

I built the full-stack Support Ticket Management System (backend-heavy option) because it reflects the kind of work I do — API design, persistence, validation, and enforcing business rules in the service layer. The Core scope includes:

- **Backend:** Express REST API with MongoDB/Mongoose, layered routes → controllers → services → models
- **Tickets:** Create, list (search + status filter), view, update fields, enforced status state machine
- **Comments:** Add and list comments on ticket detail
- **Frontend:** React + Vite SPA with list, create, and detail pages; loading/empty/error states throughout
- **Tests:** 30 integration tests covering valid/invalid transitions, CRUD validation, and comment creation
- **Workflow artifacts:** Lifecycle docs, AI prompt history with iteration log, Cursor workflow files, setup documentation

Users are seed data only (no authentication in Core). New tickets default to `open` status and `medium` priority.

## Time Allocation

The assignment guidance scopes Core implementation at **~8–12 focused hours** and expects the **rest of the week** on lifecycle artifacts — which is what feedback primarily evaluates. I deliberately did not expand Core at the expense of documentation.

| Phase | Estimated hours | Key deliverables |
|-------|-----------------|------------------|
| Requirements & planning | ~4h | `requirements-analysis.md`, `implementation-plan.md`, `acceptance-criteria.md` |
| Design | ~4h | `api-contract.md`, `data-model.md`, `ui-flow.md`, `design-notes.md` |
| **Core implementation** | **~10h** | `backend/`, `frontend/`, `database/` |
| Integration testing | ~3h | `tests/integration/`, `test-results.md` |
| Debugging | ~2h | `debugging-notes.md` (4 documented issues) |
| Code review & fixes | ~3h | `code-review-notes.md`, `review-fixes.md` (8 fixes) |
| Documentation & AI workflow | ~6h | `tool-workflow.md`, `ai-prompts/`, `reflection.md`, `final-ai-usage-summary.md` |
| **Total** | **~32h** | 2026-07-14 – 2026-07-21 |

Stretch features (auth, pagination, Docker, Swagger) were deferred to protect artifact quality. This was an intentional trade-off aligned with the assignment guidance.

### Timeline note

I started the assessment on **2026-07-14** by reading the brief and drafting requirements locally. My first repository commit was on **2026-07-20** (`2d14ea6`); backend, frontend, tests, and review landed on **2026-07-21**; submission docs were finalised on **2026-07-22**. Early `iteration-log.md` session dates reflect planning work before the first commit — commit hashes in later sessions are the authoritative record of implementation.

## How I Used AI (across the lifecycle)

| Phase | How AI was used | What I validated manually |
|-------|----------------|--------------------------|
| Requirements | Broke down assignment brief into Core vs Stretch; drafted acceptance criteria | Removed Stretch from Core scope; verified state machine rules |
| Planning & design | Proposed ERD, API contract, folder structure, task breakdown | Corrected field names (`assignedTo`, `createdBy`); chose MongoDB over initial PostgreSQL direction |
| Implementation | Scaffolded backend/frontend, services, pages, seed script, tests | Ran API with curl; tested UI flows; verified state machine in service layer |
| Testing | Generated integration test structure and cases | Ran `npm test`; confirmed 30/30 pass; documented in `test-results.md` |
| Debugging | Diagnosed module path, MongoDB, and import issues | Applied minimal fixes; re-ran scripts and tests |
| Code review | Full-stack review against contract and acceptance criteria | Applied 8 fixes; deferred Stretch items with justification |
| Documentation | Filled templates for README, setup notes, PR description, reflection | Verified setup steps end-to-end; recorded prompt iteration in `ai-prompts/iteration-log.md` |

**Prompt history:** Documented in [`ai-prompts/README.md`](ai-prompts/README.md) and [`ai-prompts/iteration-log.md`](ai-prompts/iteration-log.md) — 9 recorded sessions with accept/change/reject decisions.

## What AI Helped With Most

Cursor was fastest at **boilerplate I would otherwise write by hand** — Express route wiring, React page scaffolding, Jest/supertest setup, and the first draft of integration tests. For example, the four test suites and `testDb.js` helper came from AI in one session; I then spent real time fixing Jest import paths until `npm test` showed 30/30 green (`f5f0995`).

It was also useful for **documentation structure** — turning my notes into `api-contract.md`, `debugging-notes.md`, and review tables. I did not treat those as finished. I re-read every section against the running app.

Where AI did **not** save me time was the state machine and validation logic. I read `statusTransitions.js` and `statusTransition.service.js` line by line and proved behaviour with integration tests before moving on.

## What AI Got Wrong

- Initial database script paths assumed `dotenv` was available from `database/` directory
- Early frontend detail page bundled edit features before task phasing was clarified
- Suggested patterns outside Core scope (auth middleware, pagination) that were correctly rejected
- Planning prompts initially put authentication in Phase 1 — rejected per brief
- Reflection draft incorrectly claimed auth was implemented — corrected before submission
- PowerShell `curl` alias issues required using `curl.exe` explicitly on Windows

## How I Validated AI Output

- Ran full integration test suite after each test phase (30 tests)
- Manual UI testing against acceptance criteria (create, list, search, filter, detail, update, comments, invalid transition errors)
- Compared API responses to `api-contract.md`
- Re-ran `npm run db:init`, `npm run seed`, and dev servers after setup changes
- Documented each debugging session with investigation → fix → validation in `debugging-notes.md`

## What I Would Improve Next

- Authentication and deriving `createdBy` from session (Stretch)
- Search/filter integration tests and pagination
- Frontend error boundary and `aria-describedby` for full a11y compliance
- OpenAPI/Swagger documentation and Docker/CI pipeline
- Debounced save queue on ticket detail page to prevent concurrent PATCH races

## Reusable Workflow

On my team I would reuse this pattern immediately:

1. **`tool-specific/cursor-workflow/project-context.md` + `spec.md`** pinned in the repo so every Cursor session starts with the same constraints.
2. **`api-contract.md` before coding** — I have seen AI invent endpoints; the contract stopped that here.
3. **`iteration-log.md` (or a short log per PR)** — what I accepted, changed, or rejected from AI, with a commit or test command as proof.
4. **Integration tests on business rules** — same as I would for pricing rules or approval workflows at work.
5. **Scope discipline** — I can use AI to go faster, but I still decide what ships. Here that meant saying no to auth and pagination so the lifecycle artifacts stayed honest.

If I mentor someone on AI-assisted delivery, I would show them this repo's **prompt history + test results**, not just the React pages.
