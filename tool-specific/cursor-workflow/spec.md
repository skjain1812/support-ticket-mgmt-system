# Specification — Support Ticket Management System (Core)

## Overview

Internal support ticket app. Users manage tickets through a web UI backed by a REST API and MongoDB database.

## Users

- Users exist in the database as **seed data only**
- No login, no user-management UI in Core
- Used as `createdBy` and `assignedTo` references on tickets and comments
- Seed at least 2–3 users with different names and roles

## Tickets

### Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | ObjectId | auto | Primary key (exposed as string in API) |
| title | string | yes | Max 200 chars |
| description | text | no | |
| priority | enum | yes | `low`, `medium`, `high`, `critical`; default `medium` |
| status | enum | yes | See state machine; default `open` |
| assignedTo | FK → User | no | Nullable |
| createdBy | FK → User | yes | Set from seed user or request body in Core |
| createdAt | timestamp | auto | |
| updatedAt | timestamp | auto | |

### Operations

1. **Create** — title required; defaults: status=`open`, priority=`medium`
2. **List** — all tickets from database; support keyword search and status filter
3. **View** — single ticket with comments
4. **Update** — title, description, priority, assignedTo
5. **Change status** — only through state machine endpoint or PATCH with status validation

## Comments

### Fields

| Field | Type | Required |
|-------|------|----------|
| id | auto | yes |
| ticketId | FK → Ticket | yes |
| message | text | yes |
| createdBy | FK → User | yes |
| createdAt | timestamp | auto |

### Operations

- Add comment to a ticket (message required)
- List comments on ticket detail view, ordered by createdAt ascending

## Status State Machine

This is the **signature judgment piece** of Core.

### Valid Transitions

| From | To |
|------|-----|
| `open` | `in_progress` |
| `open` | `cancelled` |
| `in_progress` | `resolved` |
| `in_progress` | `cancelled` |
| `resolved` | `closed` |

### Invalid Examples (must be rejected)

- `open` → `resolved`, `open` → `closed`
- `in_progress` → `open`
- `resolved` → `in_progress`, `resolved` → `cancelled`
- `closed` → anything
- `cancelled` → anything
- Same-status change may be allowed as no-op or rejected — document choice in `design-notes.md`

### Enforcement

- **Backend:** reject invalid transitions with HTTP 400 and descriptive error
- **Frontend:** only offer valid next statuses in UI; display API error if transition fails

## Search and Filter

### Core (Mandatory)

- **Keyword search** — match against ticket title and description
- **Status filter** — filter list by one or more status values

### Stretch (Optional)

- Filter by priority and assignee
- Sorting and pagination

## Validation Rules

| Rule | Layer |
|------|-------|
| Title required on create | Backend + Frontend |
| Comment message required | Backend + Frontend |
| Invalid enum values rejected | Backend |
| Invalid status transition rejected | Backend |
| assignedTo must reference existing user | Backend |
| createdBy must reference existing user | Backend |

## Error Handling

- Backend returns consistent JSON errors with appropriate HTTP status codes
- Frontend shows user-friendly messages for validation and transition failures
- No unhandled promise rejections; no raw stack traces shown to users

## API Endpoints (Summary)

See `api-contract.md` for full request/response shapes.

| Method | Path | Purpose |
|--------|------|---------|
| GET | /api/tickets | List tickets (search, status filter) |
| POST | /api/tickets | Create ticket |
| GET | /api/tickets/:id | Ticket detail + comments |
| PATCH | /api/tickets/:id | Update fields |
| PATCH | /api/tickets/:id/status | Change status (state machine) |
| POST | /api/tickets/:id/comments | Add comment |
| GET | /api/users | List seed users (for assignee dropdown) |

## Stretch Additions (Not in Core)

- Authentication (JWT/session), protected routes
- User CRUD and role management
- Priority/assignee filters, sorting, pagination
- OpenAPI/Swagger docs
- Docker + CI pipeline
