# Debugging Prompts

Reusable prompts for diagnosing and fixing issues.

---

## Prompt 1: API Error Diagnosis

```
I'm getting an error in the Support Ticket Management System backend.

Error:
[Paste full error message and stack trace]

Endpoint: [e.g. PATCH /api/tickets/:id]
Request body: [paste JSON]
Expected behavior: [what should happen]
Actual behavior: [what happens instead]

Diagnose the root cause and suggest a minimal fix. Do not refactor unrelated code.
```

---

## Prompt 2: Authentication Issue

```
JWT authentication is not working correctly in my Support Ticket Management System.

Symptoms:
[Describe: 401 on valid token, token not sent, expired token, etc.]

Relevant code:
- Auth middleware: [paste or reference file]
- Login endpoint response: [paste token payload]
- Frontend auth context: [paste or reference file]

Check for:
1. Token format (Bearer prefix)
2. JWT secret mismatch between sign and verify
3. Token expiry
4. Middleware order in Express
5. CORS blocking Authorization header

Provide a targeted fix.
```

---

## Prompt 3: Database Query Issue

```
A database query in the Support Ticket Management System is returning unexpected results.

Query/Mongoose code:
[Paste query or ORM code]

Expected result: [describe]
Actual result: [describe]

Schema reference: docs/data-model.md

Check for:
1. Missing JOINs (e.g. assignee name not populated)
2. Wrong filter conditions
3. Missing indexes causing slow queries
4. NULL handling on optional fields (assignee_id)
5. Enum value mismatch

Suggest the corrected query.
```

---

## Prompt 4: Frontend State / Rendering Issue

```
The React frontend has a rendering or state issue.

Page: [e.g. Ticket List, Ticket Detail]
Symptoms: [e.g. stale data after update, blank page, infinite re-render]

Relevant component code:
[Paste component or reference file path]

Browser console errors:
[Paste any errors]

Network tab observations:
[API call status codes, response bodies]

Diagnose and suggest a fix. Check for:
1. Missing dependency in useEffect
2. State not updated after API call
3. Missing error/loading state handling
4. Incorrect route params
```

---

## Prompt 5: CORS / Network Error

```
The frontend cannot reach the backend API.

Error in browser console:
[Paste CORS or network error]

Backend CORS config:
[Paste CORS middleware setup]

Frontend API URL:
[Paste VITE_API_URL value and fetch/axios config]

Frontend origin: http://localhost:5173
Backend origin: http://localhost:3000

Diagnose and fix the CORS configuration. Ensure Authorization header is allowed.
```

---

## Prompt 6: Status Transition Rejected

```
PATCH /api/tickets/:id returns 400 when changing status.

Current status: [e.g. open]
Requested status: [e.g. in_progress]
Error response: [paste JSON]

Status transition logic:
[Paste validateStatusTransition or service code]

Per docs/design-notes.md, open → in_progress should be valid.

Find why the transition is rejected and fix it.
```

---

## Prompt 7: Document a Debug Session

```
I fixed a bug in the Support Ticket Management System. Document it for docs/debugging-notes.md.

Issue: [short title]
Component: [Backend / Frontend / Database]
Symptom: [what went wrong]
Root cause: [why it happened]
Fix: [what was changed]
Prevention: [how to avoid in future]

Format as a table row matching the template in debugging-notes.md.
```

---

## Usage Notes

- Always include the **full error message** and **relevant code** in debugging prompts.
- Ask for minimal fixes — avoid scope creep during debugging.
- Document resolved issues in `docs/debugging-notes.md` for the assignment submission.
- Check environment issues (port conflicts, .env values) before assuming code bugs.
