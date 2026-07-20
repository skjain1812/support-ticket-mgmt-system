# Candidate Information

**Name:** _[Your name]_ / **Role:** _[Your role]_ / **Primary Technology Stack:** React, Node.js, MongoDB

**Primary AI Tool Used:** Cursor / **Project Option Selected:** Support Ticket Management System (Backend-heavy)

**Assessment Start Date:** _[YYYY-MM-DD]_ / **Submission Date:** _[YYYY-MM-DD]_

## Project Summary

A full-stack Support Ticket Management System for internal support teams. Core features include ticket CRUD, comments, keyword search, status filtering, and an enforced status state machine. Users are seed data only (no auth in Core). Built with React, Express, and MongoDB using AI-assisted workflow artifacts throughout the lifecycle.

## Tools Used

| Tool | Purpose |
|------|---------|
| Cursor | Primary AI-assisted IDE |
| Node.js / npm | Backend and frontend runtime |
| MongoDB | Database persistence (Mongoose) |
| Jest + supertest | Integration tests (state machine) |
| Git | Version control |

## Setup Summary

1. Clone repository and install dependencies (`backend/`, `frontend/`)
2. Configure `MONGODB_URI` in `.env` from `.env.example`
3. Run index init and seed scripts from `database/`
4. Start backend (`npm run dev` in `backend/`) and frontend (`npm run dev` in `frontend/`)
5. Run integration tests (`npm test` in `tests/`)

See `README.md` for full instructions.
