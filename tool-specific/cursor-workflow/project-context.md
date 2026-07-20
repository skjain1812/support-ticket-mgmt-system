# Project Context

Persistent context for Cursor when working on this repository.

## Project

**Name:** Support Ticket Management System
**Type:** AI Practical Assessment — Part B Core (mandatory) + optional Stretch
**Primary AI Tool:** Cursor

## Business Goal

A small internal application for managing support tickets. Users create, update, comment on, search, and progress tickets through a defined lifecycle.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| Tests | Jest + supertest (integration tests mandatory for state machine) |

## Repository Layout

```
support-ticket-mgmt-system/
├── README.md                    # Setup instructions
├── backend/                     # Express API
├── frontend/                    # React SPA
├── database/                    # Migrations, seed data, setup-notes.md
├── tests/                       # Integration tests (state machine)
├── ai-prompts/                  # Prompt history by activity
├── tool-specific/cursor-workflow/  # Cursor persistent context (this folder)
└── [lifecycle artifacts at root]   # requirements-analysis.md, api-contract.md, etc.
```

## Core Scope (Mandatory)

### Entities

- **User** — seeded only; no user-management UI. Fields: `id`, `name`, `email`, `role`
- **Ticket** — `id`, `title`, `description`, `priority`, `status`, `assignedTo`, `createdBy`, `createdAt`, `updatedAt`
- **Comment** — `id`, `ticketId`, `message`, `createdBy`, `createdAt`

### Features

- Create, list, view, update tickets (title, description, priority, assignee)
- Change status through enforced state machine
- Add comments to a ticket
- Keyword search + filter by status
- Backend validation; meaningful UI error states
- Data persists across restart

### Status State Machine (Non-Negotiable)

```
Open         → In Progress
In Progress  → Resolved
Resolved     → Closed
Open         → Cancelled
In Progress  → Cancelled
```

All other transitions are **invalid** — backend must reject (400), frontend must show clear error.

### Mandatory Tests

Integration tests proving state-machine rules: valid transitions succeed, invalid transitions are rejected.

## Out of Core Scope

- Authentication (optional Stretch)
- User CRUD UI (Stretch)
- Filter by priority/assignee, sorting, pagination (Stretch)
- Swagger/OpenAPI, Docker, CI (Stretch)

## Coding Standards

- Separate backend layers: routes → controllers → services → models
- Mongoose queries with validated input — no raw string injection in filters
- Server-side validation on all inputs (do not rely on frontend alone)
- Consistent JSON error shape: `{ "error": "message", "details": [] }`
- No secrets in source code; use `.env` with `.env.example`
- Small, focused commits with clear messages

## References

When implementing, always check:

1. `tool-specific/cursor-workflow/spec.md` — feature spec
2. `tool-specific/cursor-workflow/acceptance-criteria.md` — done definition
3. `api-contract.md` — endpoint shapes
4. `data-model.md` — schema
5. `test-strategy.md` — what to test
