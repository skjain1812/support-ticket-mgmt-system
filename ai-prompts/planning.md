# Planning Prompts

Reusable prompts for the planning phase. **Recorded sessions** at the bottom show real iteration during this assignment.

> **Core scope reminder:** Authentication, user CRUD, and pagination are Stretch — do not include in Phase 1 planning.

---

## Prompt 1: Requirements Breakdown

```
You are helping me plan a Support Ticket Management System assignment.

Context:
- Full-stack web app for support teams to create, track, assign, and resolve tickets
- Stack: Node.js backend, React frontend, MongoDB database (Mongoose)
- Existing docs: requirements-analysis.md, acceptance-criteria.md (repo root)

Task:
1. Review the functional requirements (ticket CRUD, comments, search/filter, state machine).
2. Separate Core (mandatory) from Stretch (optional: auth, user CRUD, pagination, Docker).
3. Identify dependencies between features.
4. List assumptions and out-of-scope items.
5. Output a phased implementation plan with time estimates.

Keep the plan realistic for a single-developer assignment. Do not add Stretch features to Core phases.
```

---

## Prompt 2: Implementation Plan

```
Based on requirements-analysis.md and acceptance-criteria.md, create a phased implementation plan.

Phases should follow this order (Core only):
1. Foundation — project setup, database, seed data (no auth)
2. Backend API — ticket CRUD, comments, status state machine, search/filter
3. Frontend UI — list, create, detail pages with error states
4. Testing — mandatory state-machine integration tests
5. Review & documentation — self-review, reflection, prompt history

For each phase, provide:
- Goal statement
- Task list with time estimates
- Deliverable / milestone
- Dependencies on prior phases

Output in markdown suitable for implementation-plan.md.
Target: ~8–12 focused hours for Core implementation; rest of week on lifecycle artifacts.
```

---

## Prompt 3: Risk Assessment

```
Review the implementation plan for a Support Ticket Management System (REST API, React SPA, MongoDB).

Identify:
1. Technical risks (state machine enforcement, schema changes, CORS, test DB isolation)
2. Scope creep risks (auth, pagination, over-polished UI)
3. Time estimation risks (spending too long on Core vs lifecycle docs)

For each risk, suggest a mitigation strategy.

Keep suggestions practical for an assignment-sized project.
```

---

## Prompt 4: Acceptance Criteria Mapping

```
Map each functional requirement in requirements-analysis.md to testable acceptance criteria.

Format each criterion as:
- Clear, testable statement (checkbox format)
- Link to requirement ID (FR-01, etc.)
- Note if verified by test, manual check, or both

Cover Core only: ticket CRUD, comments, search/filter, state machine, validation, persistence, integration tests.

Output for acceptance-criteria.md and tool-specific/cursor-workflow/acceptance-criteria.md.
```

---

## Recorded Session — Scope control (2026-07-14)

**Prompt used:** Prompt 1 (Requirements Breakdown)

**AI suggested:** Phase 1 including JWT authentication and user registration.

**My decision:** ❌ Rejected auth from Core phases. Moved to Stretch in `requirements-analysis.md`.

**Why:** Assignment brief states users are seed data only for Core. Protecting artifact time (reflection, prompt history, debugging notes) over expanding the application.

**Outcome:** `implementation-plan.md` Phase 1 = setup + seed only. See `iteration-log.md` Session 1.

---

## Usage Notes

- Run planning prompts **before** writing application code.
- Save AI output to root-level files and review/edit before proceeding.
- Reference `implementation-plan.md` and `tool-specific/cursor-workflow/tasks.md` when starting each phase.
- Log accept/change/reject decisions in `iteration-log.md`.
