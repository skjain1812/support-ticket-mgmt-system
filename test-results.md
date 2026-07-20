# Test Results

## Run Summary

| Field | Value |
|-------|-------|
| **Date** | _[YYYY-MM-DD]_ |
| **Branch / Commit** | _[branch @ hash]_ |
| **Environment** | Local |

## Integration Tests

```
_[Paste npm test output here]_
```

### State Machine Tests

| Test | Result |
|------|--------|
| open → in_progress | ☐ Pass / ☐ Fail |
| open → cancelled | ☐ Pass / ☐ Fail |
| in_progress → resolved | ☐ Pass / ☐ Fail |
| in_progress → cancelled | ☐ Pass / ☐ Fail |
| resolved → closed | ☐ Pass / ☐ Fail |
| open → closed (invalid) | ☐ Pass / ☐ Fail |
| closed → open (invalid) | ☐ Pass / ☐ Fail |

### Validation Tests

| Test | Result |
|------|--------|
| Create ticket without title | ☐ Pass / ☐ Fail |
| Comment without message | ☐ Pass / ☐ Fail |

## Manual Testing

| Acceptance Criterion | Result |
|---------------------|--------|
| Create ticket via UI | ☐ Pass / ☐ Fail |
| View all tickets | ☐ Pass / ☐ Fail |
| Ticket detail view | ☐ Pass / ☐ Fail |
| Update fields and reassign | ☐ Pass / ☐ Fail |
| Add comments | ☐ Pass / ☐ Fail |
| Keyword search works | ☐ Pass / ☐ Fail |
| Status filter works | ☐ Pass / ☐ Fail |
| Data survives restart | ☐ Pass / ☐ Fail |
| Invalid transition shows error in UI | ☐ Pass / ☐ Fail |

## Conclusion

_[Ready for submission / needs more work — list gaps]_
