# Candidate Information

**Name:** Shubham Jain / **Role:** Associate Technical Lead / **Primary Technology Stack:** React, Node.js, MongoDB

**Primary AI Tool Used:** Cursor / **Project Option Selected:** Support Ticket Management System (Backend-heavy)

**Assessment Start Date:** 2026-07-14 / **Submission Date:** 2026-07-21

**Repository:** https://github.com/skjain1812/support-ticket-mgmt-system/tree/dev

**Submission branch:** `dev` (contains the complete Core implementation; `main` is an initial scaffold only)

**Prompt history:** [`ai-prompts/README.md`](ai-prompts/README.md) · [`ai-prompts/iteration-log.md`](ai-prompts/iteration-log.md)

## Project Summary

A full-stack Support Ticket Management System for internal support teams. Core features include ticket CRUD, comments, keyword search, status filtering, and an enforced status state machine (`open` → `in_progress` → `resolved` → `closed`, with `cancelled` branches). Users are seed data only (no auth in Core). Built with React, Express, and MongoDB using an AI-assisted, spec-driven workflow with lifecycle artifacts throughout the repository.

## Tools Used

| Tool | Purpose |
|------|---------|
| Cursor | Primary AI-assisted IDE for implementation, testing, review, and documentation |
| Node.js / npm | Backend and frontend runtime |
| MongoDB | Database persistence (Mongoose ODM) |
| Jest + supertest | Integration tests (30 tests, 4 suites) |
| Git | Version control |

## Setup Summary

1. Clone the `dev` branch and install dependencies (`backend/`, `frontend/`, `tests/`)
2. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI`
3. Run index init and seed from `backend/`: `npm run db:init` && `npm run seed`
4. Start backend (`npm run dev` in `backend/`) and frontend (`npm run dev` in `frontend/`)
5. Run integration tests (`npm test` in `tests/`)

See `README.md` and `database/setup-notes.md` for full instructions.

## Deliverables Checklist

| Artifact | Location | Status |
|----------|----------|--------|
| Working application | `backend/`, `frontend/` | Complete |
| Database scripts | `database/` | Complete |
| Integration tests | `tests/integration/` | 30/30 pass |
| Test results | `test-results.md` | Complete |
| API contract | `api-contract.md` | Complete |
| Acceptance criteria | `acceptance-criteria.md` | Met (Core) |
| AI workflow docs | `tool-workflow.md`, `ai-prompts/` (incl. `iteration-log.md`), `tool-specific/cursor-workflow/` | Complete |
| Code review | `code-review-notes.md`, `review-fixes.md` | Complete |
| Reflection | `reflection.md`, `final-ai-usage-summary.md` | Complete |
| PR description | `pr-description.md` | Complete |

---

## Participation Form — Draft Answers (in my own words)

Use these as a starting point for the online form. Edit to match each question exactly.

### Repository and tool

- **Repository:** https://github.com/skjain1812/support-ticket-mgmt-system/tree/dev  
- **Project option:** Support Ticket Management System (backend-heavy)  
- **Primary AI tool:** Cursor  

### Requirement understanding

I understood this as a small internal ticket app where the hard part is the status state machine — only five transitions are valid, backend must return 400 on invalid moves, and the UI must show clear errors. Users are seed data only; auth is Stretch. The assessment values lifecycle evidence (prompts, tests, debugging, reflection) as much as the running app, so I kept Core lean and invested time in artifacts.

### How I used AI across the lifecycle

I kept persistent context in `tool-specific/cursor-workflow/` and linked `api-contract.md` / `spec.md` in prompts. Cursor scaffolded backend, frontend, and tests; I validated with `npm test` (30/30), manual UI checks, and curl smoke tests. I rejected AI suggestions that added auth or pagination to Core. Prompt iteration is in `ai-prompts/iteration-log.md`.

### Key design and code decisions

- State machine in `statusTransition.service.js` — not in routes or a single PATCH handler.  
- Separate `PATCH /tickets/:id/status` endpoint.  
- Layered backend: routes → controllers → services → models.  
- Frontend `getNextStatuses()` mirrors backend rules.  
- Deferred auth and client-trusted `createdBy` documented for Stretch.

### Testing and debugging

Mandatory integration tests for valid/invalid transitions plus CRUD and comment validation (`tests/integration/`, 30 tests). Separate test database. Four debugging issues documented in `debugging-notes.md` — e.g. `dbScriptUtils.js` for `dotenv` path from `database/` scripts.

### Commit where I fixed an AI mistake

- **`f5f0995`** — fixed Jest module paths after AI-generated test setup failed.  
- **`4335fb1`** — applied eight review fixes (type validation, error `details`, a11y) after AI-assisted self-review.

### What I would improve

Search/filter integration tests; auth for `createdBy`; log Cursor sessions daily instead of batching near submission; split the large ticket detail page into smaller components.

### Prompt history location

`ai-prompts/README.md` → `ai-prompts/iteration-log.md`
