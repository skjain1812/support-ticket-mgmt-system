# Code Review Notes

## AI-Assisted Review Summary

Self-review performed on 2026-07-21 after Core implementation (Phases 1–4). Review covered `backend/src/`, `frontend/src/`, `tests/integration/`, and alignment with `api-contract.md` and `tool-specific/cursor-workflow/acceptance-criteria.md`.

**Overall:** The codebase meets Core acceptance criteria. Architecture is layered and testable. No Critical blockers for submission. Several Major items were addressed in `review-fixes.md`; remaining items are deferred as Stretch or acceptable for Core scope.

## My Review Observations

### Critical

| # | Area | Finding | Resolution |
|---|------|---------|------------|
| — | — | No Critical findings for Core submission | — |

### Major

| # | Area | Finding | Resolution |
|---|------|---------|------------|
| M-01 | Backend validation | Non-string inputs (e.g. `{ "title": 123 }`) could throw `TypeError` → HTTP 500 | **Fixed** — type checks in `ticket.service.js` and `comment.service.js` via `fieldValidation.js` |
| M-02 | Backend validation | No max length on `description` / `message` | **Fixed** — 5000 char limit in models + service validation |
| M-03 | Error handling | Invalid status transitions returned `error` without `details` array | **Fixed** — `statusTransition.service.js` now includes `details` |
| M-04 | Security | No explicit JSON body size limit | **Fixed** — `express.json({ limit: '50kb' })` in `app.js` |
| M-05 | Frontend a11y | Ticket list rows were click-only (no keyboard navigation) | **Fixed** — title column uses `<Link>` |
| M-06 | Frontend a11y | No visible focus styles | **Fixed** — `:focus-visible` styles in `index.css` |
| M-07 | Frontend UX | Status dropdown did not reset after failed transition | **Fixed** — controlled `statusSelection` state |
| M-08 | Frontend UX | Malformed ticket IDs showed generic load error | **Fixed** — HTTP 400 treated as “Ticket not found” |
| M-09 | Auth | Client-supplied `createdBy` on writes (identity spoofing) | **Mitigated** — `X-User-Id` header authoritative; mismatch with body returns 400; Stretch JWT planned |
| M-10 | Frontend | Concurrent auto-save PATCH requests can race on detail page | **Deferred** — acceptable for Core demo; debounce/queue in Stretch |
| M-11 | API | No pagination on ticket list | **Deferred** — Stretch per assignment brief |

### Minor

| # | Area | Finding | Resolution |
|---|------|---------|------------|
| m-01 | Backend | Health endpoint does not verify DB connectivity | Deferred — ops enhancement |
| m-02 | Backend | Text index declared but search uses regex | Deferred — search works correctly |
| m-03 | Backend | `formatTicket` / `formatComment` duplicated vs model `toJSON` | Deferred — refactor polish |
| m-04 | Frontend | Field errors lack `aria-describedby` linkage | Deferred — a11y polish |
| m-05 | Frontend | No React error boundary | Deferred — Stretch |
| m-06 | Frontend | `getHealth` API helper unused | Deferred — optional startup check |
| m-07 | Frontend | Wildcard routes redirect silently to `/tickets` | Deferred — minor UX |
| m-08 | Tests | No automated search/filter integration tests | **Fixed** — `tests/integration/ticketSearch.filter.test.js` |

## Changes Made After Review

See `review-fixes.md` for detailed fix log (F-01 through F-08 applied).

## Suggestions Rejected (and why)

| Suggestion | Why Rejected |
|-------------|-------------|
| Add JWT authentication before submission | Stretch scope; Core explicitly uses seed users without auth |
| Add Redis caching | Out of Core scope; premature optimization |
| Switch to GraphQL | REST API contract already implemented and tested |
| Add `helmet` + rate limiting | Production hardening; not required for Core demo |
| Pagination on list endpoint | Listed as Stretch in assignment brief |
| Remove text index from Ticket model | Low impact; search works; avoid unrelated schema churn |

## Review Checklist

- [x] State machine enforced in service layer (not just routes)
- [x] Backend validation on all inputs
- [x] No secrets in source code
- [x] ObjectId validation on route params
- [x] API responses match `api-contract.md`
- [x] UI error states for validation and transition failures
- [x] Integration tests cover valid and invalid transitions
- [x] Unit tests for `isValidTransition`
- [x] Integration tests for search/filter and request user context
