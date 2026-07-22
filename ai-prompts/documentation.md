# Documentation Prompts

Reusable prompts for generating project documentation. **Recorded sessions** show submission prep.

---

## Prompt 1: README Update (Core — used)

```
Update root README.md for the Support Ticket Management System.

Include:
1. Prerequisites (Node 18+, MongoDB 6+)
2. Clone with -b dev branch
3. Install backend, frontend, tests
4. Env setup, db:init, seed, run dev servers
5. Run tests (30/30 expected)
6. Environment variable table
7. Troubleshooting section

No placeholder text. Reference database/setup-notes.md.
```

---

## Prompt 2: PR Description (Core — used)

```
Generate pr-description.md for submission.

Include: summary, features, technical changes, test checklist, AI usage summary, known limitations (no auth, no pagination).
Map test plan to acceptance criteria.
```

---

## Prompt 3: AI Usage Summary (Core — used)

```
Generate final-ai-usage-summary.md.

Document:
1. Cursor usage by lifecycle phase
2. What AI did well vs what needed human judgment
3. Accept/change/reject examples (reference iteration-log.md)
4. What I avoided sharing (secrets, credentials)
5. Honest assessment of AI limitations

Cross-reference ai-prompts/ files.
```

---

## Prompt 4: Reflection (Core — used)

```
Help write reflection.md for the assignment.

Cover:
1. What I built (Core scope only)
2. How I used AI across lifecycle
3. What AI got wrong
4. How I validated output
5. Time allocation (Core ~10h, artifacts ~22h)
6. Reusable workflow for real projects

Professional but personal tone.
```

---

## Prompt 5: Candidate Info (Core — used)

```
Update candidate-info.md with:
- Name, role, dates, stack
- Repository URL (dev branch)
- Tools used, setup summary, deliverables checklist
- Link to ai-prompts/ for prompt history
```

---

## Prompt 6: Tool Workflow (Core — used)

```
Document tool-workflow.md — how Cursor is used across:
requirements, planning, design, implementation, testing, debugging, review, documentation.

Include context-setting pattern, validation gates, what not to share with AI.
Reference ai-prompts/README.md and iteration-log.md.
```

---

## Prompt 7: Sync Docs with Implementation (Core — used)

```
Implementation changed. Update docs to match.

Checklist:
- [ ] api-contract.md
- [ ] data-model.md
- [ ] ui-flow.md
- [ ] acceptance-criteria.md (tick completed items)
- [ ] README.md
- [ ] tasks.md status
```

---

## Recorded Session — Submission docs (2026-07-21 – 2026-07-22)

**Prompts used:** 3, 4, 5, 7

**AI draft issues:**
- Claimed auth was implemented — **incorrect**
- Generic time estimates — **too vague**

**My decisions:**
- ✏️ Corrected Core scope in reflection (seed users only)
- ✏️ Added time allocation table
- ✏️ Created `ai-prompts/iteration-log.md` for prompt history evidence
- ✏️ Ticked acceptance criteria checkboxes

**Artifacts:** `reflection.md`, `final-ai-usage-summary.md`, `candidate-info.md`, `acceptance-criteria.md`

**Commit:** `9b550d8`. See `iteration-log.md` Session 9.

---

## Usage Notes

- Update documentation as you go — not only at the end.
- Run Prompt 7 whenever implementation diverges from design docs.
- Keep `ai-prompts/` and root lifecycle docs in sync.
- Prompt history for evaluators: start at `ai-prompts/README.md` → `iteration-log.md`.
