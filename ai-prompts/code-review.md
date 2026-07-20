# Code Review Prompts

Reusable prompts for reviewing code quality and security.

---

## Prompt 1: Full Codebase Review

```
Perform a code review of the Support Ticket Management System.

Review scope: [backend / frontend / full codebase]

Check against:
1. docs/requirements-analysis.md — are all Must-have requirements implemented?
2. docs/api-contract.md — do endpoints match the contract?
3. docs/acceptance-criteria.md — can each criterion be verified?
4. docs/design-notes.md — architecture and security guidelines followed?

Categorize findings as:
- Critical (must fix)
- Major (should fix)
- Minor (nice to fix)
- Suggestions (optional improvements)

Format output for docs/code-review-notes.md.
```

---

## Prompt 2: Security Review

```
Review the Support Ticket Management System for security issues.

Focus areas:
1. Authentication — JWT handling, token storage, expiry
2. Authorization — role checks on all protected endpoints
3. Input validation — server-side validation on all inputs
4. NoSQL injection — validate ObjectId format; use Mongoose query builders
5. Password storage — bcrypt hashing, no plaintext
6. Secrets — no hardcoded credentials or JWT secrets
7. CORS — restricted to frontend origin
8. Error messages — no stack traces or internal details leaked to client

List each finding with severity and recommended fix.
```

---

## Prompt 3: Backend Code Quality

```
Review the backend code in backend/src/ for quality issues.

Check:
1. Separation of concerns (routes → controllers → services → models)
2. Error handling — all async operations wrapped, consistent error responses
3. No business logic in route handlers
4. DRY — no duplicated validation or query logic
5. Naming consistency
6. No dead code or commented-out blocks
7. Environment variables for all configuration

Provide specific file/line references for each finding.
```

---

## Prompt 4: Frontend Code Quality

```
Review the frontend code in frontend/src/ for quality issues.

Check:
1. Component structure — reusable, single responsibility
2. State management — no unnecessary global state
3. API calls centralized in services/ layer
4. Loading, error, and empty states handled
5. Form validation before API calls
6. No hardcoded API URLs
7. Protected routes and role guards working
8. Accessibility basics (labels, button types, semantic HTML)

Provide specific file/line references for each finding.
```

---

## Prompt 5: API Contract Compliance

```
Compare the implemented API endpoints against docs/api-contract.md.

For each endpoint, verify:
1. HTTP method and path match
2. Request body/query params match
3. Success response shape and status code match
4. Error responses (400, 401, 403, 404) implemented
5. Auth requirements enforced

List any deviations with recommendation: fix code or update contract.
```

---

## Prompt 6: Generate Fix Plan

```
Based on the code review findings in docs/code-review-notes.md, create a fix plan.

For each finding (Critical and Major only):
1. Assign a fix ID (F-01, F-02, ...)
2. Describe the change needed
3. List files to modify
4. Define how to verify the fix

Format for docs/review-fixes.md. Mark deferred items with justification.
```

---

## Prompt 7: Post-Fix Verification

```
I applied fixes from docs/review-fixes.md. Verify the fixes are correct.

Changes made:
[Describe or paste diff summary]

Original findings:
[Paste from code-review-notes.md]

Check:
1. Each fix addresses the original finding
2. No new issues introduced
3. Tests still pass
4. No regressions in related functionality

Update review-fixes.md status and note any remaining issues.
```

---

## Usage Notes

- Run a full review before final submission.
- Address all Critical and Major findings before submitting.
- Use Prompt 6 to track fixes systematically in `docs/review-fixes.md`.
- Self-review counts — document findings honestly even for your own code.
