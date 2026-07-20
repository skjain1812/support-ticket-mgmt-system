# API Contract

Base URL: `http://localhost:3000/api`

Content-Type: `application/json` for all requests and responses.

All `id` fields are MongoDB ObjectIds exposed as 24-character hex strings. The backend must validate ObjectId format on route params and reject invalid IDs with `400`.

---

## Endpoint: List Users

**Method:** GET
**Path:** `/users`
**Purpose:** Return seeded users for assignee dropdown and createdBy reference.

### Response `200`

```json
{
  "data": [
    { "id": "507f1f77bcf86cd799439011", "name": "Alice Agent", "email": "alice@example.com", "role": "agent" }
  ]
}
```

---

## Endpoint: List Tickets

**Method:** GET
**Path:** `/tickets`
**Purpose:** List tickets with optional keyword search and status filter.

### Query Parameters

| Param | Type | Description |
|-------|------|-------------|
| `search` | string | Keyword match in title and description |
| `status` | string | Filter by status (`open`, `in_progress`, `resolved`, `closed`, `cancelled`) |

### Response `200`

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Cannot reset password",
      "description": "User reports reset email not arriving.",
      "priority": "high",
      "status": "open",
      "assignedTo": null,
      "assignedToName": null,
      "createdBy": "507f1f77bcf86cd799439011",
      "createdByName": "Alice Agent",
      "createdAt": "2026-07-20T10:00:00Z",
      "updatedAt": "2026-07-20T10:00:00Z"
    }
  ]
}
```

---

## Endpoint: Create Ticket

**Method:** POST
**Path:** `/tickets`
**Purpose:** Create a new ticket.

### Request

```json
{
  "title": "Cannot reset password",
  "description": "User reports reset email not arriving.",
  "priority": "high",
  "createdBy": "507f1f77bcf86cd799439011",
  "assignedTo": "507f1f77bcf86cd799439011"
}
```

### Response `201`

Created ticket object.

### Validation Rules

- `title` — required, max 200 characters
- `priority` — optional, default `medium`; must be valid enum
- `createdBy` — required, must reference existing user
- `assignedTo` — optional, must reference existing user if provided
- `status` — always set to `open` on create (ignore client value)

### Error Responses

- `400` — validation failure

---

## Endpoint: Get Ticket Detail

**Method:** GET
**Path:** `/tickets/:id`
**Purpose:** Single ticket with comments.

### Response `200`

```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Cannot reset password",
  "description": "...",
  "priority": "high",
  "status": "open",
  "assignedTo": "507f1f77bcf86cd799439011",
  "assignedToName": "Bob Agent",
  "createdBy": "507f1f77bcf86cd799439011",
  "createdByName": "Alice Agent",
  "createdAt": "2026-07-20T10:00:00Z",
  "updatedAt": "2026-07-20T10:00:00Z",
  "comments": [
    {
      "id": "507f1f77bcf86cd799439011",
      "message": "Investigating email delivery.",
      "createdBy": "507f1f77bcf86cd799439011",
      "createdByName": "Bob Agent",
      "createdAt": "2026-07-20T11:00:00Z"
    }
  ]
}
```

### Error Responses

- `404` — ticket not found

---

## Endpoint: Update Ticket

**Method:** PATCH
**Path:** `/tickets/:id`
**Purpose:** Update ticket fields (not status — use status endpoint).

### Request

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "medium",
  "assignedTo": "507f1f77bcf86cd799439011"
}
```

All fields optional. `assignedTo` can be `null` to unassign.

### Response `200`

Updated ticket object.

### Error Responses

- `400` — validation failure
- `404` — ticket not found

---

## Endpoint: Change Ticket Status

**Method:** PATCH
**Path:** `/tickets/:id/status`
**Purpose:** Change status through enforced state machine.

### Request

```json
{
  "status": "in_progress"
}
```

### Valid Transitions

| From | Allowed To |
|------|-----------|
| `open` | `in_progress`, `cancelled` |
| `in_progress` | `resolved`, `cancelled` |
| `resolved` | `closed` |

### Response `200`

Updated ticket object with new status.

### Error Responses

- `400` — invalid transition (e.g. `open` → `closed`)
- `404` — ticket not found

---

## Endpoint: Add Comment

**Method:** POST
**Path:** `/tickets/:id/comments`
**Purpose:** Add a comment to a ticket.

### Request

```json
{
  "message": "Investigating email delivery.",
  "createdBy": "507f1f77bcf86cd799439011"
}
```

### Response `201`

```json
{
  "id": "507f1f77bcf86cd799439011",
  "ticketId": "507f1f77bcf86cd799439012",
  "message": "Investigating email delivery.",
  "createdBy": "507f1f77bcf86cd799439011",
  "createdByName": "Bob Agent",
  "createdAt": "2026-07-20T11:00:00Z"
}
```

### Validation Rules

- `message` — required, non-empty
- `createdBy` — required, must reference existing user

### Error Responses

- `400` — validation failure
- `404` — ticket not found

---

## Common Error Response

```json
{
  "error": "Human-readable message",
  "details": []
}
```
