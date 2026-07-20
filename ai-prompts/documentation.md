# Documentation Prompts

Reusable prompts for generating and updating project documentation.

---

## Prompt 1: README Update

```
Update the root README.md for the Support Ticket Management System.

The application is now implemented with:
- Backend: [e.g. Express on port 3000]
- Frontend: [e.g. React/Vite on port 5173]
- Database: MongoDB (Mongoose)

Include accurate:
1. Prerequisites and versions
2. Step-by-step setup (clone, install, env vars, migrate, seed, run)
3. Environment variable table with descriptions
4. How to run tests
5. Project structure overview
6. Link to docs/ folder

Verify all commands work. Do not include placeholder text.
```

---

## Prompt 2: PR Description

```
Generate a pull request description for the Support Ticket Management System submission.

Include:
1. Summary of what was built (3-5 bullet points)
2. Changes by area (backend, frontend, database, tests, docs)
3. Test plan checklist (mapped to acceptance criteria)
4. Links to key docs (requirements, API contract, test results)
5. Notes for reviewer (assumptions, known limitations)

Format for docs/pr-description.md. Use checkbox syntax for test plan items.
```

---

## Prompt 3: AI Usage Summary

```
Generate a final AI usage summary for the Support Ticket Management System assignment.

Document:
1. Which AI tool was used (Cursor)
2. Usage by category: planning, code generation, debugging, review, documentation
3. What AI did well vs. what required human judgment
4. Key prompts used (reference ai-prompts/ files)
5. Rough estimate of AI-assisted vs. human-written code per category
6. Lessons learned about effective AI-assisted development

Be transparent and honest. Format for docs/final-ai-usage-summary.md.
```

---

## Prompt 4: Reflection

```
Help me write a reflection for the Support Ticket Management System assignment.

Cover:
1. What went well
2. Challenges faced and how they were addressed
3. What I would do differently
4. Skills developed (technical, process, tooling)
5. AI tool effectiveness rating (1-5 per aspect)
6. Time breakdown by phase (planned vs. actual)

Tone: professional but personal. Format for docs/reflection.md.
I will fill in specific details — provide the structure and guiding questions.
```

---

## Prompt 5: Candidate Info

```
Create a candidate info template for docs/candidate-info.md.

Include fields for:
- Name, email, assignment title, submission date
- Development environment (IDE, Node version, database, OS)
- Repository URL, branch, commit hash
- Notes section for reviewer context

Use table format. Mark personal fields as placeholders to fill in.
```

---

## Prompt 6: Tool Workflow

```
Document the development tool workflow for docs/tool-workflow.md.

Tools used:
- Cursor (AI-assisted IDE)
- Git (version control)
- Node.js / npm
- MongoDB
- Browser DevTools

Phases:
1. Planning — requirements, API contract, data model
2. Implementation — backend first, then frontend
3. Testing & review — automated + manual tests, self-review
4. Submission — docs, PR description, AI usage summary

Include AI usage guidelines and prompt strategy notes.
Reference ai-prompts/ folder for stored prompts.
```

---

## Prompt 7: Sync Docs with Implementation

```
The Support Ticket Management System implementation has changed. Update documentation to match.

Changes made:
[Describe what changed — new endpoints, schema changes, UI updates, etc.]

Files to update:
- [ ] docs/api-contract.md
- [ ] docs/data-model.md
- [ ] docs/ui-flow.md
- [ ] docs/acceptance-criteria.md
- [ ] README.md

For each file, show only the sections that need updating. Keep unchanged sections as-is.
```

---

## Usage Notes

- Update documentation as you go — do not leave it all for the end.
- Run Prompt 7 whenever implementation diverges from the original design docs.
- Prompts 3 and 4 are for final submission prep.
- Keep `docs/` and `ai-prompts/` in sync — if you change a prompt, update the corresponding doc template.
