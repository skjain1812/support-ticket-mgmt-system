# Planning Prompts

Reusable prompts for the planning phase of the Support Ticket Management System.

---

## Prompt 1: Requirements Breakdown

```
You are helping me plan a Support Ticket Management System assignment.

Context:
- Full-stack web app for support teams to create, track, assign, and resolve tickets
- Stack: Node.js backend, React frontend, MongoDB database (Mongoose)
- Existing docs: docs/requirements-analysis.md, docs/acceptance-criteria.md

Task:
1. Review the functional requirements (ticket CRUD, auth, assignment, search/filter).
2. Break them into Must / Should / Could priorities.
3. Identify dependencies between features.
4. List assumptions and out-of-scope items.
5. Output a phased implementation plan with time estimates.

Keep the plan realistic for a single-developer assignment. Do not add features beyond the stated requirements.
```

---

## Prompt 2: Implementation Plan

```
Based on docs/requirements-analysis.md and docs/acceptance-criteria.md, create a phased implementation plan for the Support Ticket Management System.

Phases should follow this order:
1. Foundation — project setup, database, authentication
2. Core Ticket CRUD — API + frontend for create, list, detail, update
3. Assignment & Filtering — admin assignment, search/filter UI
4. Testing & Polish — tests, error handling, documentation

For each phase, provide:
- Goal statement
- Task list with time estimates
- Deliverable / milestone
- Dependencies on prior phases

Output in markdown suitable for implementation-plan.md.
```

---

## Prompt 3: Risk Assessment

```
Review the implementation plan for a Support Ticket Management System (REST API, React SPA, MongoDB).

Identify:
1. Technical risks (auth complexity, schema changes, CORS, etc.)
2. Scope creep risks
3. Time estimation risks

For each risk, suggest a mitigation strategy.

Keep suggestions practical for an assignment-sized project.
```

---

## Prompt 4: Acceptance Criteria Mapping

```
Map each functional requirement in requirements-analysis.md to testable acceptance criteria.

Format each criterion as:
- Unique ID (AC-01, AC-02, ...)
- Clear, testable statement
- Link to requirement ID (FR-01, etc.)
- Pass/fail checkbox

Cover: authentication, ticket creation, list/search, status updates, assignment, API error handling, and quality gates.

Output for acceptance-criteria.md.
```

---

## Usage Notes

- Run planning prompts **before** writing application code.
- Save AI output to the corresponding root-level file and review/edit before proceeding.
- Reference `implementation-plan.md` when starting each development phase.
