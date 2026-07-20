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
├── database/                     # Schema, seed data, setup-notes.md
├── tests/                        # Integration tests (state machine)
├── ai-prompts/                   # Prompt history by activity
└── tool-specific/
    └── cursor-workflow/          # Cursor persistent context
```

## Prerequisites

- Node.js 18+
- MongoDB 6+ (local or Atlas)
- npm

## Getting Started

### 1. Clone and install

```bash
git clone <repository-url>
cd support-ticket-mgmt-system

cd backend && npm install
cd ../frontend && npm install
cd ../tests && npm install
```

### 2. Database setup

See `database/setup-notes.md` for full instructions.

```bash
# Configure environment
cp backend/.env.example backend/.env
# Edit MONGODB_URI in backend/.env

# Initialize indexes and seed data
cd backend
npm run db:init
npm run seed
```

### 3. Start the application

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Open `http://localhost:5173` in your browser.

### 4. Run tests

```bash
cd tests && npm test
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/support_tickets` |
| `API_PORT` | Backend server port | `3000` |
| `VITE_API_URL` | Backend URL for frontend | `http://localhost:3000/api` |

Copy `backend/.env.example` to `backend/.env` and fill in values. Never commit `.env`.

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
| `tool-specific/cursor-workflow/` | Cursor persistent context and spec |
| `ai-prompts/` | Prompt history grouped by activity |
| `api-contract.md` | REST API specification |
| `data-model.md` | Mongoose schemas and collections |

## License

Educational / assessment purposes.
