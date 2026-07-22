# AI Prompt History

This folder documents how Cursor was used across the Support Ticket Management System assignment. It is organized by lifecycle phase and includes both reusable prompt templates and **recorded sessions** showing real iteration (what was sent, what AI returned, and what I accepted, changed, or rejected).

## How to read this folder

| File | Phase | Contents |
|------|-------|----------|
| [`iteration-log.md`](iteration-log.md) | All phases | **Start here** — chronological log of key AI sessions with outcomes |
| [`planning.md`](planning.md) | Requirements & planning | Scope breakdown, implementation plan, acceptance criteria |
| [`design.md`](design.md) | Design | Data model, API contract, UI flows, state machine |
| [`implementation.md`](implementation.md) | Build | Backend, frontend, database scaffolding |
| [`testing.md`](testing.md) | Testing | Integration test strategy and execution |
| [`debugging.md`](debugging.md) | Debugging | Real bug-fix sessions with validation |
| [`code-review.md`](code-review.md) | Review | Self-review, fix plan, post-fix verification |
| [`documentation.md`](documentation.md) | Docs | README, reflection, submission artifacts |

## Cross-references

- **Workflow overview:** [`../tool-workflow.md`](../tool-workflow.md)
- **What I accepted vs rejected:** [`../final-ai-usage-summary.md`](../final-ai-usage-summary.md)
- **Debugging outcomes:** [`../debugging-notes.md`](../debugging-notes.md)
- **Review fixes applied:** [`../review-fixes.md`](../review-fixes.md)
- **Test evidence:** [`../test-results.md`](../test-results.md)

## Time allocation (assignment guidance)

The assignment scopes Core implementation at **~8–12 focused hours** and expects the **rest of the week** on lifecycle artifacts. My approximate split:

| Phase | Estimated hours | Primary artifacts |
|-------|-----------------|-------------------|
| Requirements & planning | ~4h | `requirements-analysis.md`, `implementation-plan.md`, `acceptance-criteria.md` |
| Design | ~4h | `api-contract.md`, `data-model.md`, `ui-flow.md`, `design-notes.md` |
| **Core implementation** | **~10h** | `backend/`, `frontend/`, `database/` |
| Testing | ~3h | `tests/integration/`, `test-results.md` |
| Debugging | ~2h | `debugging-notes.md` |
| Code review & fixes | ~3h | `code-review-notes.md`, `review-fixes.md` |
| Documentation & reflection | ~6h | `tool-workflow.md`, `reflection.md`, `ai-prompts/`, `final-ai-usage-summary.md` |
| **Total** | **~32h** | Over ~1 week (2026-07-14 – 2026-07-21) |

Core was kept to mandatory scope; Stretch features (auth, pagination, Docker) were intentionally deferred to protect artifact quality.

## Iteration pattern used

Every significant AI interaction followed this loop:

1. **Attach context** — spec section, API contract, or acceptance criteria
2. **Generate** — ask Cursor for a focused output (one feature or doc at a time)
3. **Validate** — run commands, tests, or manual UI check
4. **Record** — note accept/change/reject in `iteration-log.md` or phase file
5. **Update docs** — sync `api-contract.md`, `tasks.md`, or `test-results.md`

Prompts marked **(Stretch — not used in Core)** are kept for reference but were not executed during this submission.
