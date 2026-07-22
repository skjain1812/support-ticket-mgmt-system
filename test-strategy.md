# Test Strategy

## Test Scope

Core requires at least one meaningful test tier: **integration tests for the status state machine**. Additional integration tests for validation, search/filter, and request-scoped identity are included.

## Unit Tests

**Scope:**
- `isValidTransition(from, to)` pure function — valid paths, invalid paths, same-status no-op, terminal states

**Location:** `tests/unit/statusTransitions.test.js`

**Why:** Fast feedback on state-machine rules without DB; addresses review feedback on isolated transition logic.

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

### Search/Filter Tests (Implemented)

| Test | Expected |
|------|----------|
| GET /tickets?search=password | Returns matching tickets |
| GET /tickets?status=open | Returns only open tickets |
| Combined search + status | Intersection of both filters |
| No search matches | Empty `data` array |
| Invalid status param | 400 |

### Request User Context Tests (Implemented)

| Test | Expected |
|------|----------|
| POST with `X-User-Id` only | 201, `createdBy` from header |
| Mismatched header vs body | 400 |
| Header absent, body `createdBy` | 201 (Core compatibility) |
| Comment with `X-User-Id` | 201, author from header |

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
| Full JWT auth tests | Stretch — header prep only in Core |
| Frontend unit tests | Optional Stretch tier |

## Running Tests

```bash
cd tests
npm test              # all suites (unit + integration)
npm run test:unit     # unit only
npm run test:search-filter
npm run test:request-user
```

Record results in `test-results.md`.
