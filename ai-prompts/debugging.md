# Debugging Prompts

Reusable prompts for diagnosing and fixing issues. **Recorded sessions** map to `debugging-notes.md`.

---

## Prompt 1: API / Module Error Diagnosis (Core — used)

```
I'm getting an error in the Support Ticket Management System.

Error:
[Paste full error message and stack trace]

Command or endpoint: [e.g. npm run db:init, GET /api/tickets/:id]
Expected behavior: [what should happen]
Actual behavior: [what happens instead]

Diagnose root cause and suggest a minimal fix. Do not refactor unrelated code.
```

---

## Prompt 2: Authentication Issue (Stretch — not used)

```
[STRETCH] JWT debugging — not applicable to Core submission.
No auth middleware implemented.
```

---

## Prompt 3: Database Query Issue (Core — used)

```
A Mongoose query returns unexpected results.

Query code: [paste]
Expected: [describe]
Actual: [describe]
Schema: data-model.md

Check: population, filters, ObjectId format, enum values.
```

---

## Prompt 4: Frontend State / Rendering Issue (Core — used)

```
React frontend issue on [TicketListPage / TicketDetailPage / CreateTicketPage].

Symptoms: [stale data, blank page, wrong error message]
Component: [file path]
Console errors: [paste]
Network tab: [status codes]

Check: useEffect cleanup, loading states, error handling, route params.
```

---

## Prompt 5: CORS / Network Error (Core — reference)

```
Frontend cannot reach backend API.

Console error: [paste]
CORS config: backend/src/app.js
VITE_API_URL: [value]

Diagnose CORS and API URL mismatch.
```

---

## Prompt 6: Status Transition Rejected (Core — reference)

```
PATCH /api/tickets/:id/status returns 400.

Current status: [e.g. open]
Requested status: [e.g. closed]
Error response: [paste JSON]

Check statusTransitions.js and statusTransition.service.js.
```

---

## Prompt 7: Document a Debug Session (Core — used)

```
I fixed a bug. Document for debugging-notes.md:

Issue, component, symptom, investigation steps, AI help, validation, final fix.
Match the format in existing debugging-notes.md entries.
```

---

## Recorded Session — dotenv module not found (2026-07-21)

**Prompt used:** Prompt 1

**Error:** `Cannot find module 'dotenv'` when running `database/init-indexes.js`

**AI suggested:** `database/dbScriptUtils.js` with `require.resolve` from backend root.

**Decision:** ✅ Accepted. **Validated:** `npm run db:init`, `npm run seed` succeed.

**Documented:** `debugging-notes.md` Issue 1. See `iteration-log.md` Session 5.

---

## Recorded Session — Jest import paths (2026-07-21)

**Prompt used:** Prompt 1

**Error:** `Cannot find module '../database/dbScriptUtils'` in `tests/integration/setup.js`

**AI suggested:** Correct relative paths (`../../database/`).

**Decision:** ✅ Accepted. **Validated:** 30/30 tests pass.

**Documented:** `debugging-notes.md` Issue 3.

---

## Recorded Session — Wrong Ticket import (2026-07-21)

**Prompt used:** Prompt 1

**Error:** `Ticket.findById is not a function` — destructured import `{ Ticket }` vs default export.

**AI suggested:** `const Ticket = require('../models/Ticket')`.

**Decision:** ✅ Accepted. **Validated:** GET /api/tickets works.

**Documented:** `debugging-notes.md` Issue 4.

---

## Usage Notes

- Always paste the **full error message** and relevant code.
- Ask for minimal fixes — avoid scope creep during debugging.
- Document every resolved issue in `debugging-notes.md`.
- Cross-reference sessions in `iteration-log.md`.
