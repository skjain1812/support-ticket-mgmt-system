# Final AI Usage Summary

## Overview

| Field | Value |
|-------|-------|
| **AI Tool** | Cursor |
| **Project** | Support Ticket Management System (Core) |
| **Period** | _[Start] – [End]_ |

## Usage by Lifecycle Phase

### Requirements & Planning
- **AI role:** Broke down assignment brief into Core vs Stretch; drafted requirements and acceptance criteria
- **Human role:** Removed Stretch items from Core scope; verified state machine rules match brief
- **Prompts:** `ai-prompts/planning.md`

### Design
- **AI role:** Proposed ERD, API contract, UI flows
- **Human role:** Corrected entity fields (`assignedTo`, `createdBy`); added Comment entity; finalized state machine with `cancelled`
- **Prompts:** `ai-prompts/design.md`

### Implementation
- **AI role:** Scaffolded Express routes, React components, Mongoose models and seed script
- **Human role:** Reviewed state machine service logic; verified backend validation; rejected auth scaffolding for Core
- **Prompts:** `ai-prompts/implementation.md`

### Testing
- **AI role:** Drafted integration test cases for valid and invalid transitions
- **Human role:** Added missing invalid transition cases; verified tests fail before fix and pass after
- **Prompts:** `ai-prompts/testing.md`

### Debugging
- **AI role:** Suggested fixes from error messages and stack traces
- **Human role:** Applied minimal fixes; verified with tests; documented in `debugging-notes.md`
- **Prompts:** `ai-prompts/debugging.md`

### Code Review
- **AI role:** Reviewed against acceptance criteria and API contract
- **Human role:** Prioritized findings; applied critical fixes; rejected over-engineering suggestions
- **Prompts:** `ai-prompts/code-review.md`

### Documentation
- **AI role:** Generated artifact templates and README structure
- **Human role:** Filled in honest, specific details; verified setup instructions work
- **Prompts:** `ai-prompts/documentation.md`

## Prompt History Highlights

| # | Activity | Accepted | Changed | Rejected |
|---|----------|----------|---------|----------|
| 1 | State machine service | Transition map structure | Added `cancelled` paths | AI suggested reopen from closed |
| 2 | API contract | Endpoint list | Added comments endpoint | Auth endpoints (Core scope) |
| 3 | Integration tests | Test file structure | Added more invalid cases | — |
| _[Add more as you work]_ | | | | |

## What I Avoided Sharing with AI

- Real database passwords (used placeholders)
- Production URLs or credentials
- Unrelated personal information

## Reusable Artifacts

| Artifact | Reuse Value |
|----------|-------------|
| `tool-specific/cursor-workflow/project-context.md` | Persistent context for any new feature |
| `tool-specific/cursor-workflow/cursor-rules-or-instructions.md` | Team coding standards for AI |
| `ai-prompts/` | Prompt templates by activity |
| `tool-workflow.md` | Documented AI workflow for onboarding |

## Honest Assessment

_[In your own words: where AI saved time, where it misled, how much you understand the final code]_
