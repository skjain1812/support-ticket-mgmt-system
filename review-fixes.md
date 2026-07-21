# Review Fixes

| Fix # | Review Ref | Description | File(s) | Status |
|-------|-----------|-------------|---------|--------|
| F-01 | M-01 | Type-check string fields before `.trim()` | `backend/src/utils/fieldValidation.js`, `ticket.service.js`, `comment.service.js` | ☑ Done |
| F-02 | M-02 | Add max length on description and message | `backend/src/models/Ticket.js`, `Comment.js`, services | ☑ Done |
| F-03 | M-03 | Add `details` array to invalid transition errors | `backend/src/services/statusTransition.service.js` | ☑ Done |
| F-04 | M-04 | Set explicit JSON body size limit | `backend/src/app.js` | ☑ Done |
| F-05 | M-05 | Keyboard-accessible ticket links in list | `frontend/src/pages/TicketListPage.jsx`, `index.css` | ☑ Done |
| F-06 | M-06 | Visible focus styles for interactive elements | `frontend/src/index.css` | ☑ Done |
| F-07 | M-07 | Reset status dropdown after failed transition | `frontend/src/pages/TicketDetailPage.jsx` | ☑ Done |
| F-08 | M-08 | Treat invalid ticket ID as not found in UI | `frontend/src/pages/TicketDetailPage.jsx` | ☑ Done |

_Status: ☑ Done (8 applied) · Deferred items documented in `code-review-notes.md`_

---

## F-01: Type-check string inputs

**Finding:** Passing non-string values to `.trim()` caused HTTP 500 instead of 400.

**Change:** Added `fieldValidation.js` with `isNonEmptyString` / `trimString`; applied in create/update ticket and comment services.

**Verified:** `npm test` in `tests/` — 30/30 passed.

---

## F-02: Max length on description and message

**Finding:** Unbounded text fields risk large payloads.

**Change:** `maxlength: 5000` on Mongoose schemas; service-level validation with field errors.

**Verified:** Integration tests pass; manual POST with long body rejected at limit.

---

## F-03: Consistent invalid-transition error shape

**Finding:** Invalid transitions returned `{ error }` without `details`.

**Change:** `statusTransition.service.js` now throws `AppError` with `details: [{ field: 'status', message: '...' }]`.

**Verified:** Invalid transition integration tests still pass.

---

## F-04: JSON body size limit

**Finding:** Default `express.json()` limit not explicit.

**Change:** `express.json({ limit: '50kb' })`.

**Verified:** App starts; existing integration tests pass.

---

## F-05: Keyboard-accessible ticket list

**Finding:** Rows navigated only via `onClick`.

**Change:** Ticket title is a `<Link>`; removed row click handler.

**Verified:** Manual tab + Enter opens detail page.

---

## F-06: Focus-visible styles

**Finding:** No visible keyboard focus indicator.

**Change:** Added `:focus-visible` outline rules for links, buttons, inputs, selects, textareas.

**Verified:** Manual keyboard navigation shows focus ring.

---

## F-07: Status dropdown reset on failure

**Finding:** Uncontrolled select kept invalid selection after API error.

**Change:** Controlled `statusSelection` state reset on success and failure.

**Verified:** Manual test — failed transition shows error and dropdown resets.

---

## F-08: Invalid ticket ID messaging

**Finding:** Malformed IDs returned HTTP 400 but UI showed generic error.

**Change:** Detail page treats HTTP 400 and 404 as “Ticket not found”.

**Verified:** `/tickets/not-a-valid-id` shows not-found state.
