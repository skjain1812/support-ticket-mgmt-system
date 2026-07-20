# Debugging Notes

## Issue 1

### Problem
_[Describe the bug — e.g. invalid status transition not rejected]_

### How I Investigated
_[Steps taken: checked API response, read service code, ran integration test]_

### How AI Helped
_[What prompt you used, what Cursor suggested]_

### What I Validated
_[How you confirmed the fix — test pass, manual check]_

### Final Fix
_[What code changed and why]_

---

## Issue 2

### Problem

### How I Investigated

### How AI Helped

### What I Validated

### Final Fix

---

## Common Debugging Techniques

- **Backend:** Request logging middleware, `curl` for API testing, inspect data with `mongosh`
- **Frontend:** Browser DevTools Network tab, React component state inspection
- **Tests:** Run single test file with `npm test -- --testPathPattern=statusMachine`
