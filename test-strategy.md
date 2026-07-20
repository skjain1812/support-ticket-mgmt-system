# Test Strategy

## Test Scope

Core requires at least one meaningful test tier: **integration tests for the status state machine**. Additional integration tests for validation are recommended.

## Unit Tests

**Scope (Stretch / optional for Core):**
- `isValidTransition(from, to)` pure function
- Input validation helpers

**Location:** `backend/src/__tests__/`

**Not required for Core completion** but valuable for the state machine logic in isolation.

## Component Tests

**Scope (Stretch / optional for Core):**
- TicketForm validation
- StatusSelector shows only valid options

**Location:** `frontend/src/__tests__/`

## API / Integration Tests (Mandatory)

**Location:** `tests/integration/`
**Tool:** Jest + supertest
**Database:** Separate test database, seeded before each suite

### State Machine Tests (Required)

| Test | Expected |
|------|----------|
| `open` → `in_progress` | 200, status updated |
| `open` → `cancelled` | 200, status updated |
| `in_progress` → `resolved` | 200, status updated |
| `in_progress` → `cancelled` | 200, status updated |
| `resolved` → `closed` | 200, status updated |
| `open` → `closed` | 400, status unchanged |
| `open` → `resolved` | 400, status unchanged |
| `in_progress` → `open` | 400, status unchanged |
| `resolved` → `in_progress` | 400, status unchanged |
| `closed` → `open` | 400, status unchanged |
| `cancelled` → `in_progress` | 400, status unchanged |

### Validation Tests (Recommended)

| Test | Expected |
|------|----------|
| POST /tickets without title | 400 |
| POST /tickets/:id/comments without message | 400 |
| PATCH /tickets/:id with invalid priority | 400 |
| GET /tickets/:id non-existent ID | 404 |

### Search/Filter Tests (Recommended)

| Test | Expected |
|------|----------|
| GET /tickets?search=password | Returns matching tickets |
| GET /tickets?status=open | Returns only open tickets |

## Edge Case Tests

| Case | Expected |
|------|----------|
| Transition on non-existent ticket | 404 |
| Assign to non-existent user | 400 |
| Comment on non-existent ticket | 404 |

## Tests Not Covered (and why)

| Area | Reason |
|------|--------|
| E2E browser tests | Optional Stretch; manual UI testing sufficient for Core |
| Performance/load tests | Out of assignment scope |
| Auth tests | No authentication in Core |
| Frontend unit tests | Optional Stretch tier |

## Running Tests

```bash
cd tests
npm test
```

Record results in `test-results.md`.
