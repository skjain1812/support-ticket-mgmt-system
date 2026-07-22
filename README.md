# Support Ticket Management System

AI Practical Assessment — full-stack mini project with lifecycle artifacts.

**Repository:** https://github.com/skjain1812/support-ticket-mgmt-system/tree/dev  
**Submission branch:** `dev` (use `-b dev` when cloning)

## Overview

Internal support ticket application built with **React + Vite**, **Node.js (Express)**, and **MongoDB (Mongoose)**. Users are seed data only in Core (no authentication).

| Layer | URL (local) |
|-------|-------------|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000/api |
| Health check | http://localhost:3000/api/health |

---

## Project Tiers

This assignment has a **mandatory Core** and an **optional Stretch**. This repository implements **Core only** — a clean, well-documented Core is a strong submission.

### Core (Mandatory) — implemented

| Area | What's included |
|------|-----------------|
| **Entities** | User (seeded), Ticket, Comment |
| **Features** | Create/list/view/update tickets, comments, keyword search, status filter |
| **State machine** | `open` → `in_progress` → `resolved` → `closed`; `open`/`in_progress` → `cancelled` |
| **Validation** | Backend rejects invalid input; UI shows error states |
| **Persistence** | MongoDB — data survives restart |
| **Tests** | 30 integration tests (state machine mandatory) |
| **Artifacts** | Full lifecycle docs, prompt history, reflection (see [Documentation](#documentation)) |

### Stretch (Optional) — not implemented

| Area | Status |
|------|--------|
| Authentication (JWT/session), protected routes | Not in scope for this submission |
| User CRUD and role management | Not implemented |
| Filter by priority/assignee, sorting, pagination | Not implemented |
| Unit tests, E2E tests beyond Core | Not implemented |
| OpenAPI/Swagger, Docker, CI | Not implemented |

Stretch is bonus evidence only. See `requirements-analysis.md` for full Core vs Stretch breakdown.

### Assessment structure (effort guide)

| Part | Focus | Where in repo |
|------|-------|----------------|
| **Part A** (20%) | AI workflow foundation | `tool-workflow.md`, `ai-prompts/`, `tool-specific/cursor-workflow/` |
| **Part B** (60%) | Full-stack mini project | `backend/`, `frontend/`, `database/`, `tests/` |
| **Part C** (20%) | Submission & reflection | `reflection.md`, `final-ai-usage-summary.md`, `candidate-info.md` |

Percentages show where to put effort — they are not exam weights.

---

## Quick Start — How to Run

**Prerequisites:** Node.js 18+, MongoDB 6+ (local or Atlas), npm.

### One-time setup

```powershell
# 1. Clone (dev branch)
git clone -b dev https://github.com/skjain1812/support-ticket-mgmt-system.git
cd support-ticket-mgmt-system

# 2. Install dependencies
cd backend; npm install
cd ..\frontend; npm install
cd ..\tests; npm install

# 3. Configure backend environment
cd ..\backend
copy .env.example .env
# Edit .env — set MONGODB_URI (see database/setup-notes.md)

# 4. Initialize database and seed sample data
npm run db:init
npm run seed
```

Expected seed output: `Users: 3`, `Tickets: 5`, `Comments: 4`.

**macOS / Linux:** use `cp .env.example .env` and `cd backend && npm install` etc.

### Run the application (every time)

Open **two terminals**:

**Terminal 1 — Backend API**

```powershell
cd backend
npm run dev
```

Wait for: `MongoDB connected` and `API server running on http://localhost:3000`

**Terminal 2 — Frontend**

```powershell
cd frontend
npm run dev
```

Open the URL Vite prints (usually **http://localhost:5173**).

### Verify it works

```powershell
# Backend health
curl http://localhost:3000/api/health

# Integration tests (optional but recommended)
cd tests
npm test
```

Expected: health returns `{"status":"ok",...}`; tests show **30 / 30 passed**.

### Try the app (manual demo)

1. Open **http://localhost:5173/tickets** — see seeded tickets
2. Search `password` or filter status `open`
3. **Create ticket** at `/tickets/new`
4. Open a ticket — update fields, change status (valid transitions only), add a comment
5. Try an invalid status jump — UI should show an error

---

## NPM Scripts Reference

| Location | Command | Purpose |
|----------|---------|---------|
| `backend/` | `npm run dev` | Start API with hot reload (`--watch`) |
| `backend/` | `npm start` | Start API (production mode) |
| `backend/` | `npm run db:init` | Sync MongoDB indexes |
| `backend/` | `npm run seed` | Seed users, tickets, comments |
| `frontend/` | `npm run dev` | Start Vite dev server |
| `frontend/` | `npm run build` | Production build |
| `tests/` | `npm test` | Run all integration tests (Jest) |

---

## Repository Structure

```
support-ticket-mgmt-system/
├── README.md
├── candidate-info.md
├── tool-workflow.md              # Part A: AI workflow foundation
├── requirements-analysis.md
├── acceptance-criteria.md
├── implementation-plan.md
├── design-notes.md
├── api-contract.md
├── data-model.md
├── ui-flow.md
├── test-strategy.md
├── test-results.md
├── debugging-notes.md
├── code-review-notes.md
├── review-fixes.md
├── pr-description.md
├── reflection.md
├── final-ai-usage-summary.md
├── backend/                      # Express API
├── frontend/                     # React SPA
├── database/                     # Index init, seed, setup-notes.md
├── tests/                        # Integration tests (Phase 4)
├── ai-prompts/                   # Prompt history by activity
└── tool-specific/
    └── cursor-workflow/          # Cursor persistent context
```

## Getting Started (detailed)

The [Quick Start](#quick-start--how-to-run) above is the fastest path. Below is the same flow with platform-specific install commands.

### 1. Install dependencies

**macOS / Linux (bash):**

```bash
git clone -b dev https://github.com/skjain1812/support-ticket-mgmt-system.git
cd support-ticket-mgmt-system

cd backend && npm install
cd ../frontend && npm install
cd ../tests && npm install
```

**Windows (PowerShell):**

```powershell
git clone -b dev https://github.com/skjain1812/support-ticket-mgmt-system.git
cd support-ticket-mgmt-system

cd backend; npm install
cd ..\frontend; npm install
cd ..\tests; npm install
```

### 2. Configure environment

**Backend** — copy and edit `backend/.env`:

```powershell
cd backend
copy .env.example .env
```

Set `MONGODB_URI` in `backend/.env` (local or Atlas). See `database/setup-notes.md` for Atlas setup.

**Frontend** (optional — defaults work for local dev):

```powershell
cd frontend
copy .env.example .env
```

### 3. Database setup

From the `backend/` folder:

```powershell
npm run db:init
npm run seed
```

Expected seed output: `Users: 3`, `Tickets: 5`, `Comments: 4`.

Full details: `database/setup-notes.md`

### 4. Start the application

**Terminal 1 — Backend:**

```powershell
cd backend
npm run dev
```

Expected: `MongoDB connected` and `API server running on http://localhost:3000`

**Terminal 2 — Frontend:**

```powershell
cd frontend
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

**Verify backend:**

```powershell
curl http://localhost:3000/api/health
```

Expected: `{"status":"ok","service":"support-ticket-api"}`

### 5. Run tests

```powershell
cd tests
npm test
```

Expected: **30 / 30 tests passed** (4 suites). See `test-results.md` for details.

## Environment Variables

| Variable | Location | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | `backend/.env` | MongoDB connection string | `mongodb://localhost:27017/support_tickets` |
| `API_PORT` | `backend/.env` | Backend server port | `3000` |
| `CORS_ORIGIN` | `backend/.env` | Frontend origin for CORS | `http://localhost:5173` |
| `VITE_API_URL` | `frontend/.env` | Backend API URL | `http://localhost:3000/api` |

Copy `backend/.env.example` → `backend/.env` and `frontend/.env.example` → `frontend/.env`. Never commit `.env` files.

## Setup Verification Checklist

Use this to confirm the README instructions work on a clean machine:

| Step | Command | Expected result |
|------|---------|-----------------|
| Backend install | `cd backend && npm install` | No errors |
| Frontend install | `cd frontend && npm install` | No errors |
| Tests install | `cd tests && npm install` | No errors |
| Env configured | `backend/.env` exists with `MONGODB_URI` | File present |
| Indexes | `npm run db:init` (from `backend/`) | `Indexes synced successfully.` |
| Seed | `npm run seed` (from `backend/`) | `Users: 3`, `Tickets: 5`, `Comments: 4` |
| Backend start | `npm run dev` (from `backend/`) | Server on port 3000 |
| Health check | `GET /api/health` | `status: ok` |
| Frontend start | `npm run dev` (from `frontend/`) | Vite dev server running |
| Integration tests | `npm test` (from `tests/`) | 30 / 30 passed |

Last verified: 2026-07-21 (Windows, Node.js 22, local MongoDB).

## Status State Machine

```
open ──► in_progress ──► resolved ──► closed
  │           │
  └──► cancelled ◄──┘
```

Invalid transitions are rejected by the backend (400) and shown clearly in the UI.

## Core Acceptance Criteria

- Create, list, view, update tickets
- Add comments
- Keyword search and status filter
- Valid status transitions only
- Data persists after restart
- Backend validation; UI error states
- State-machine integration tests pass
- No secrets in repo

See `acceptance-criteria.md` for the full checklist.

## Documentation

| Document | Purpose |
|----------|---------|
| `tool-workflow.md` | Part A — AI workflow across lifecycle |
| `ai-prompts/README.md` | Prompt history index — start here for evaluators |
| `ai-prompts/iteration-log.md` | Chronological AI session log with accept/change/reject |
| `database/setup-notes.md` | MongoDB setup and troubleshooting |
| `tool-specific/cursor-workflow/` | Cursor persistent context and spec |
| `ai-prompts/` | Prompt history grouped by activity |
| `api-contract.md` | REST API specification |
| `data-model.md` | Mongoose schemas and collections |

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `ECONNREFUSED :27017` | Start MongoDB locally or use Atlas URI — see `database/setup-notes.md` |
| `EADDRINUSE :::3000` | Another process uses port 3000; stop it or change `API_PORT` |
| `Cannot find module 'dotenv'` | Run `npm run db:init` / `npm run seed` from `backend/` only |
| Frontend can't reach API | Check `VITE_API_URL` and that backend is running |
| Port 5173 in use | Vite will use the next port (e.g. 5174) — use the URL shown in terminal |

## License

Educational / assessment purposes.
