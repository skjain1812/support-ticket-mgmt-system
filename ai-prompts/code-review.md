# Code Review Prompts

Reusable prompts for reviewing code quality. **Recorded sessions** show the self-review that produced 8 fixes.

> Prompt 2 (JWT security) adapted for Core — no auth endpoints to review.

---

## Prompt 1: Full Codebase Review (Core — used)

```
Perform a code review of the Support Ticket Management System (Core).

Review scope: backend/src/, frontend/src/, tests/integration/

Check against:
1. requirements-analysis.md — Core requirements implemented?
2. api-contract.md — endpoints match contract?
3. acceptance-criteria.md — each criterion verifiable?
4. design-notes.md — state machine and validation rules followed?

Categorize: Critical / Major / Minor / Suggestions
Format for code-review-notes.md.
Do not require auth, pagination, or Stretch features.
```

---

## Prompt 2: Security Review (Core — adapted)

```
Review Core security (no auth in scope):

1. Input validation — server-side on all inputs
2. NoSQL injection — ObjectId format validation
3. Secrets — no hardcoded credentials; .env gitignored
4. CORS — restricted to frontend origin
5. Error messages — no stack traces to client
6. JSON body size limit

Skip: JWT, password hashing, role-based route guards (Stretch).
```

---

## Prompt 3: Backend Code Quality (Core — used)

```
Review backend/src/ for:
1. routes → controllers → services → models separation
2. State machine in service layer (not routes)
3. Consistent AppError with { error, details }
4. No business logic in route handlers
5. Environment variables for config

Provide file references for each finding.
```

---

## Prompt 4: Frontend Code Quality (Core — used)

```
Review frontend/src/ for:
1. Loading, empty, error states on data-fetching pages
2. API calls in services/api.js
3. Status dropdown shows valid transitions only
4. Form validation before submit
5. Accessibility: keyboard navigation, focus styles

Skip: protected routes, role guards (Stretch).
```

---

## Prompt 5: API Contract Compliance (Core — used)

```
Compare implemented endpoints against api-contract.md.

Verify method, path, request/response shapes, error codes.
List deviations: fix code or update contract.
```

---

## Prompt 6: Generate Fix Plan (Core — used)

```
Based on code-review-notes.md Major findings, create fix plan.

For each Major item:
- Fix ID (F-01, F-02, ...)
- Description, files, verification step

Defer Stretch items with justification.
Format for review-fixes.md.
```

---

## Prompt 7: Post-Fix Verification (Core — used)

```
Applied fixes F-01 through F-08. Verify:
1. Each fix addresses original finding
2. npm test still passes (30/30)
3. No regressions

Update review-fixes.md status.
```

---

## Recorded Session — Self-review and 8 fixes (2026-07-21)

**Prompts used:** 1, 3, 4, 6, 7

**AI findings (Major):**
- M-01: Non-string inputs → HTTP 500
- M-02: No max length on text fields
- M-03: Transition errors missing `details`
- M-04: No JSON body size limit
- M-05–M-08: Frontend a11y and UX issues

**My decisions:**
- ✅ Fixed F-01 through F-08 (all Major Core items)
- ⏸ Deferred M-09 (client `createdBy` spoofing) — no auth in Core
- ⏸ Deferred M-11 (pagination) — Stretch

**Validated:** `npm test` 30/30 after fixes.

**Artifacts:** `code-review-notes.md`, `review-fixes.md`

**Commit:** `4335fb1`. See `iteration-log.md` Session 8.

---

## Usage Notes

- Run full review after Core implementation, before submission.
- Address Critical and Major findings; defer Stretch with documented reason.
- Honest self-review counts — document findings even for your own code.
