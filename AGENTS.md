# AGENTS.md — Persistent AI Context
**Vault:** TheDBLUHQ (Obsidian, GitHub-synced)
**Purpose:** This file is read automatically by any AI agent (Gemini Scribe, Claude, etc.) at the start of every session. It gives the agent full context without requiring any re-introduction.

---

> **For all AI agents:** Read `SYSTEM_STATE.md` (in this same folder) as your primary knowledge base. It contains the full context on who Wahhab is, his brands, his workflow, his tech stack, and current priorities. Treat it as your system prompt.

---

## Quick Boot Instructions for Agents

1. Read `SYSTEM_STATE.md` first — this is your source of truth.
2. The vault is organized into numbered folders (00–07) by domain. Key ones:
   - `01-NeverMisleads/` — B2B agency work (revenue priority #1)
   - `02-DBLU/` — Artist brand, talent management, superfan hub
   - `00-HQ/` — System ops, SOPs, infrastructure
3. `_Inbox/` is for unprocessed notes. `_Queue/` is for tasks pending execution.
4. Do not delete, overwrite, or reorganize files without explicit confirmation.
5. Do not trigger paid API calls without asking first.
6. When Wahhab is overwhelmed, give ONE next step only.

---

## Vault Sync Model
- GitHub is the sync layer. VPS pushes → Mac pulls. Mac pushes → VPS pulls.
- This file travels with the vault. Any machine that pulls the repo has this context.
- Keep `SYSTEM_STATE.md` updated when major decisions or pivots happen.

---

*Last updated: April 3, 2026*
