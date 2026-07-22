# Documentation Index

Lifecycle and assessment artifacts for the Support Ticket Management System. All files remain at the repository root for stable links in git history; this index is the single entry point for reviewers.

## Start here

| Document | Purpose |
|----------|---------|
| [README](../README.md) | Quick start, project tiers, how to run |
| [candidate-info.md](../candidate-info.md) | Candidate details and participation form draft answers |
| [acceptance-criteria.md](../acceptance-criteria.md) | Core requirements checklist |

## Part A — AI workflow

| Document | Purpose |
|----------|---------|
| [tool-workflow.md](../tool-workflow.md) | Tool selection and workflow overview |
| [tool-specific/cursor-workflow/](../tool-specific/cursor-workflow/) | Cursor-specific workflow files |
| [ai-prompts/README.md](../ai-prompts/README.md) | Prompt history index |
| [ai-prompts/iteration-log.md](../ai-prompts/iteration-log.md) | Session-by-session accept/change/reject log |
| [final-ai-usage-summary.md](../final-ai-usage-summary.md) | AI usage summary |
| [reflection.md](../reflection.md) | What worked, what I would change |

## Part B — Planning and design

| Document | Purpose |
|----------|---------|
| [requirements-analysis.md](../requirements-analysis.md) | Functional/non-functional requirements, PO clarifications |
| [design-notes.md](../design-notes.md) | Architecture, validation, same-status no-op trade-off |
| [data-model.md](../data-model.md) | Mongoose schemas and indexes |
| [api-contract.md](../api-contract.md) | REST API contract including `X-User-Id` header |

## Part C — Implementation evidence

| Document | Purpose |
|----------|---------|
| [test-strategy.md](../test-strategy.md) | Unit + integration test approach |
| [test-results.md](../test-results.md) | Latest test run output |
| [code-review-notes.md](../code-review-notes.md) | Self-review findings and fixes |
| [review-fixes.md](../review-fixes.md) | F-01 through F-08 fix log |
| [database/setup-notes.md](../database/setup-notes.md) | MongoDB setup and seeding |

## Backend source map

```
backend/src/
  context/requestUser.js   — request-scoped actor identity (X-User-Id)
  services/                — business rules (state machine, tickets, comments)
  controllers/             — HTTP handlers
  routes/                  — Express routes
```

## Tests

```
tests/
  unit/statusTransitions.test.js           — isValidTransition unit tests
  integration/statusTransitions.*.test.js  — state machine integration tests
  integration/ticketSearch.filter.test.js  — search and status filter
  integration/requestUser.context.test.js  — X-User-Id header behaviour
```

Run from `tests/`: `npm test`
