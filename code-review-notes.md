# Code Review Notes

## AI-Assisted Review Summary

_[Summary of findings from Cursor code review prompts — see ai-prompts/code-review.md]_

## My Review Observations

### Critical
| # | Area | Finding | Resolution |
|---|------|---------|------------|
| | | | |

### Major
| # | Area | Finding | Resolution |
|---|------|---------|------------|
| | | | |

### Minor
| # | Area | Finding | Resolution |
|---|------|---------|------------|
| | | | |

## Changes Made After Review

See `review-fixes.md` for detailed fix log.

## Suggestions Rejected (and why)

| Suggestion | Why Rejected |
|-------------|-------------|
| _[e.g. Add Redis caching]_ | Out of Core scope |
| _[e.g. Switch to GraphQL]_ | REST is sufficient; would add complexity |

## Review Checklist

- [ ] State machine enforced in service layer (not just routes)
- [ ] Backend validation on all inputs
- [ ] No secrets in source code
- [ ] ObjectId validation on route params
- [ ] API responses match `api-contract.md`
- [ ] UI error states for validation and transition failures
- [ ] Integration tests cover valid and invalid transitions
