# UI Flow

## Screen Map

```
Ticket List (/tickets)
  ├── Create Ticket (/tickets/new)
  └── Ticket Detail (/tickets/:id)
        ├── Update fields
        ├── Change status
        ├── Reassign
        └── Add comment
```

No login screen in Core.

## Ticket List (`/tickets`)

**API:** `GET /api/tickets?search=&status=`

**UI elements:**
- Search input (keyword — debounced)
- Status filter dropdown (all, open, in_progress, resolved, closed, cancelled)
- Table: title, status badge, priority badge, assignee, created date
- "Create Ticket" button
- Empty state when no results

**Interactions:**
- Type in search → debounced API call
- Select status filter → API call with `status` param
- Click row → navigate to `/tickets/:id`

## Create Ticket (`/tickets/new`)

**API:** `POST /api/tickets`, `GET /api/users` (for createdBy/assignedTo)

**UI elements:**
- Title input (required)
- Description textarea
- Priority dropdown (default: medium)
- Created by dropdown (seed users)
- Assignee dropdown (optional, seed users)
- Submit / Cancel buttons

**On success:** redirect to `/tickets/:id`
**On error:** show validation message inline

## Ticket Detail (`/tickets/:id`)

**API:** `GET /api/tickets/:id`, `PATCH /api/tickets/:id`, `PATCH /api/tickets/:id/status`, `POST /api/tickets/:id/comments`

**Sections:**

1. **Ticket fields** — editable title, description, priority, assignee
2. **Status** — dropdown showing only valid next statuses; error toast on invalid
3. **Comments** — chronological list + add comment form

**Status change flow:**
1. User selects new status from dropdown (only valid options shown)
2. `PATCH /api/tickets/:id/status`
3. On success: update badge; on 400: show error, revert dropdown

**Comment flow:**
1. User types message, clicks Add
2. `POST /api/tickets/:id/comments`
3. On success: append to list; on 400: show error

## Error States

| Scenario | UI Behavior |
|----------|-------------|
| API unreachable | Banner: "Unable to connect. Check if the server is running." |
| Validation error (400) | Inline or toast with API `error` message |
| Invalid status transition | Toast: "Cannot change status from X to Y" |
| Ticket not found (404) | Page: "Ticket not found" with link back to list |
| Empty search results | "No tickets match your search" |
| No comments yet | "No comments yet. Add the first one below." |

## Loading States

- List page: skeleton rows while fetching
- Detail page: skeleton card while fetching
- Form submit: disable button + spinner
