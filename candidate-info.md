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
