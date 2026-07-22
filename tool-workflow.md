# Tool Workflow

Part A submission — how AI (Cursor) is used across the engineering lifecycle for the Support Ticket Management System.

## Primary AI Tool Used

**Cursor** — AI-assisted IDE used for planning, design, implementation, testing, debugging, code review, and documentation throughout this assignment.

Supporting tools: Git (version control), Node.js/npm (runtime), MongoDB (database), browser DevTools (frontend debugging).

---

## How I Provide Project Context to the Tool

Persistent context is maintained through structured documents rather than one-off prompts:

| Artifact | Purpose |
|----------|---------|
| `tool-specific/cursor-workflow/project-context.md` | Stack, constraints, folder layout, non-negotiables |
| `tool-specific/cursor-workflow/spec.md` | Feature spec and state machine rules |
| `tool-specific/cursor-workflow/tasks.md` | Ordered task breakdown with status |
| `tool-specific/cursor-workflow/acceptance-criteria.md` | Testable criteria Cursor references during implementation |
| `tool-specific/cursor-workflow/cursor-rules-or-instructions.md` | Coding standards and review expectations |
| `requirements-analysis.md`, `api-contract.md`, `data-model.md` | Design references linked in prompts |

**Context-setting pattern:** Before asking Cursor to implement a feature, I attach or reference the relevant spec section, API contract endpoint, and acceptance criteria. Example: _"Implement PATCH /api/tickets/:id/status per api-contract.md. Enforce transitions in spec.md. Add integration tests per test-strategy.md."_

---

## How I Use AI for Requirement Analysis

1. Paste the assignment brief and ask Cursor to break it into Core vs Stretch scope.
2. Ask AI to identify ambiguities and draft clarification questions (recorded in `requirements-analysis.md`).
3. Review AI output manually — remove Stretch items from Core scope (e.g. auth is optional, user management UI is not required).
4. Map functional requirements to acceptance criteria with AI assistance, then verify each criterion is testable.

**What I accept:** Structured requirement lists, edge-case suggestions, assumption documentation.
**What I reject:** AI adding auth or user CRUD to Core when the brief says they are Stretch/optional.

---

## How I Use AI for Planning and Design

1. **Planning:** Generate phased implementation plan (`implementation-plan.md`) — backend schema first, then API, then frontend, then state-machine tests.
2. **Data model:** AI drafts ERD and Mongoose schemas; I verify against Core entities (User, Ticket, Comment) and correct field names (`assignedTo`, `createdBy`).
3. **API contract:** AI proposes REST endpoints; I ensure comment endpoints and status transition endpoint are included.
4. **UI flow:** AI maps screens to routes and API calls; I confirm error states for invalid transitions are specified.

Prompts stored in `ai-prompts/planning.md` and `ai-prompts/design.md`.

---

## How I Use AI for Code Generation

1. Generate project scaffolding (Express backend, React/Vite frontend, Mongoose models, seed script).
2. Implement one feature at a time with spec + contract attached (e.g. ticket CRUD before comments before state machine).
3. Use AI for repetitive boilerplate (route handlers, form components, test setup).
4. **Never** accept large generated blocks without reading — especially status transition logic.

**Iteration pattern:** Generate → run locally → fix errors → ask AI to refine with the actual error message.

Prompts stored in `ai-prompts/implementation.md`.

---

## How I Validate AI-Generated Code

| Validation Step | Method |
|-----------------|--------|
| Compiles and runs | `npm run dev` for backend and frontend |
| API contract match | Manual curl/Postman + compare response to `api-contract.md` |
| State machine rules | Integration tests (mandatory) — valid transitions pass, invalid return 400 |
| Input validation | Send empty/invalid payloads; confirm 400 with clear messages |
| UI error states | Trigger backend errors in browser; confirm user-friendly messages |
| No secrets | Grep for passwords, API keys; verify `.env` is gitignored |
| Data persistence | Restart app; confirm tickets and comments survive |

I treat AI output as a draft. The state machine and validation logic receive extra manual scrutiny because they are the signature judgment piece.

---

## How I Use AI for Testing

1. Ask AI to draft integration tests for the status state machine (mandatory Core tier).
2. Review generated tests — ensure they cover **both** valid and invalid transitions.
3. Run tests locally; if AI-generated assertions are wrong, fix and document in `test-results.md`.
4. Use AI to interpret test failures and suggest fixes, then verify the fix independently.

Prompts stored in `ai-prompts/testing.md`.

---

## How I Use AI for Debugging

1. Paste full error message + stack trace + relevant code snippet.
2. Ask for root cause and **minimal** fix — not a refactor.
3. Verify fix with tests and manual check before moving on.
4. Document resolved issues in `debugging-notes.md` (problem, investigation, AI help, validation, final fix).

Prompts stored in `ai-prompts/debugging.md`.

---

## How I Use AI for Code Review

1. Ask Cursor to review against `acceptance-criteria.md` and `api-contract.md`.
2. Run security checks: no hardcoded secrets, parameterized queries, server-side validation.
3. Categorize findings (critical / major / minor) in `code-review-notes.md`.
4. Apply fixes tracked in `review-fixes.md`; re-run tests after each fix.

Prompts stored in `ai-prompts/code-review.md`.

---

## What Information I Avoid Sharing Unnecessarily with AI Tools

| Avoid | Reason |
|-------|--------|
| Real passwords, API keys, tokens | Security — use placeholders like `<MONGODB_URI>` |
| Production credentials or internal URLs | Not relevant to local assignment |
| Personal data unrelated to the project | Minimize data exposure |
| Entire codebase in one prompt when a single file suffices | Reduces noise and hallucination risk |

I share enough context for accurate output (spec, contract, error logs) but not more.

---

## How I Would Reuse This Workflow in a Real Project

1. **Persistent project context** — Maintain `project-context.md` and `spec.md` in the repo; update when requirements change.
2. **Spec-driven development** — Define API contract and acceptance criteria before implementation; link them in every AI prompt.
3. **Phased delivery** — Backend + tests first, frontend second; one feature per PR.
4. **Prompt library** — Reuse and refine prompts in `ai-prompts/` across sprints; record iterations in `ai-prompts/iteration-log.md`.
5. **Mandatory validation gate** — No AI-generated code merges without tests passing and human review of business logic.
6. **Cursor rules** — Encode team standards in `cursor-rules-or-instructions.md` so AI output matches conventions.
7. **Transparent AI usage** — Document what AI generated vs what humans wrote; critical for audit and knowledge transfer.

This workflow scales: the artifacts grow with the project, but the pattern (context → spec → implement → test → review → document) stays the same.
