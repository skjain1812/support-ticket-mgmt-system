# Support Ticket Management System

AI Practical Assessment — full-stack mini project with lifecycle artifacts.

## Overview

Internal support ticket application. Core features: create/list/view/update tickets, add comments, keyword search, status filter, and enforced status state machine. Users are seed data only (no authentication in Core).

**Stack:** React (Vite) · Node.js (Express) · MongoDB (Mongoose)

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

## Prerequisites

- Node.js 18+
- MongoDB 6+ (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm

## Getting Started

### 1. Install dependencies

**macOS / Linux (bash):**

```bash
git clone <repository-url>
cd support-ticket-mgmt-system

cd backend && npm install
cd ../frontend && npm install
```

**Windows (PowerShell):**

```powershell
git clone <repository-url>
cd support-ticket-mgmt-system

cd backend; npm install
cd ..\frontend; npm install
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

Integration tests are added in **Phase 4**. Until then, this step is not applicable.

```powershell
# Coming in Phase 4
cd tests
npm test
```

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
| Env configured | `backend/.env` exists with `MONGODB_URI` | File present |
| Indexes | `npm run db:init` (from `backend/`) | `Indexes synced successfully.` |
| Seed | `npm run seed` (from `backend/`) | `Users: 3`, `Tickets: 5`, `Comments: 4` |
| Backend start | `npm run dev` (from `backend/`) | Server on port 3000 |
| Health check | `GET /api/health` | `status: ok` |
| Frontend start | `npm run dev` (from `frontend/`) | Vite dev server running |

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
