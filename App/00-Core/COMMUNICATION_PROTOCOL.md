# The Kaborya Ecosystem: Communication Protocol

This is the central brain and routing station for Wahhab's 3-Agent ecosystem. It contains everything: identity, config, directives, execution scripts, skills, and agent communication queues.

## 1. Folder Map

```
Kaborya_Brain/
├── core/                  ← Identity, config, and operating docs
│   ├── soul.md            ← Master personality & rules (READ-ONLY)
│   ├── Wahhab.md          ← Full profile & context
│   ├── INSTRUCTIONS.md    ← 3-layer architecture instructions
│   ├── COMMUNICATION_PROTOCOL.md  ← This file
│   └── CONFIG.json        ← Centralized config (vault refs)
├── agents/                ← Inter-agent communication
│   ├── Kaborya/inbox/     ← Messages FOR Kaborya
│   ├── Kaborya/outbox/    ← Messages FROM Kaborya (copies)
│   ├── Gina/inbox/        ← Messages FOR Gina
│   ├── Gina/outbox/       ← Messages FROM Gina (copies)
│   ├── Astro/inbox/       ← Messages FOR Astro
│   ├── Astro/outbox/      ← Messages FROM Astro (copies)
│   ├── registries/        ← Pipeline & state tracking
│   │   ├── client_registry.json
│   │   ├── deployment_registry.json
│   │   └── lead_pipeline.json
│   ├── tasks/             ← Shared task queue
│   └── processed/         ← Completed messages (archive)
├── directives/            ← Markdown SOPs (what to do)
├── execution/             ← Python scripts (how to do it)
├── skills/                ← Agent skill definitions
├── tools/                 ← MCP tools & integrations
└── data/                  ← Reference data & source files
```

## 2. Who is Who?

| Agent | Location | Role | Capabilities |
|-------|----------|------|-------------|
| **Kaborya** | VPS (24/7) | Sales closer, accountability, notifications | Telegram, client outreach, schedule tracking |
| **Gina** | Claude Desktop (laptop) | SDR, browser research, lead gen | Web scraping, browser automation, prospecting |
| **Astro** | Gemini IDE (laptop) | Builder, deployer, infrastructure | Code generation, Git, deployment, scripting |

## 3. The 3-Layer Architecture

**Layer 1 — Directives** (`directives/`): Markdown SOPs that define what to do, step by step. Written in natural language.

**Layer 2 — Orchestration** (You, the AI agent): Read directives, make decisions, call execution scripts in the right order, handle errors.

**Layer 3 — Execution** (`execution/`): Deterministic Python scripts that do the actual work. Reliable, testable, fast.

## 4. How to Pass the Baton (Message Queue System)

All inter-agent communication goes through `agents/`.

### Creating Messages
Use `execution/message_queue.py`:
```bash
python3 execution/message_queue.py create <from> <to> <type> <priority> '<payload_json>'
```

### Message Types
| Type | From | To | Purpose |
|------|------|----|---------|
| PROSPECT_LIST | Gina | Kaborya | Qualified leads for outreach |
| CLIENT_BRIEF | Kaborya | Astro | Closed client specs for build |
| STAGING_URL | Astro | Kaborya | Staging site ready for review |
| PRODUCTION_DEPLOYED | Astro | Kaborya | Site is live |
| MAINTENANCE | Any | Any | Post-deploy update request |

### Message Format
JSON files named: `YYYYMMDD_HHmmss_{TYPE}_{PRIORITY}.json`

### Checking Status
```bash
python3 execution/message_queue.py status
python3 execution/message_queue.py list_inbox kaborya
```

## 5. Sync Protocol (Google Drive)

Google Drive is the sync backbone. All agents sync `agents/` to/from Drive.

**On startup:**
```bash
python3 execution/drive_sync.py download Kaborya/agents/ agents/
```

**After making changes:**
```bash
python3 execution/drive_sync.py sync agents/ Kaborya/agents/
```

**Kaborya (VPS):** Heartbeat runs every 30 minutes automatically.

## 6. Execution Scripts Reference

| Script | Purpose |
|--------|---------|
| `config_loader.py` | Load CONFIG.json, resolve vault secrets |
| `vault.py` | Encrypt/decrypt API keys and credentials |
| `drive_sync.py` | Google Drive upload/download/sync |
| `message_queue.py` | Create, read, and complete inter-agent messages |
| `site_deploy.py` | Deploy client sites to Hostinger VPS |

## 7. Directives Reference

| # | Name | Owner |
|---|------|-------|
| 00 | Agency Architecture | All |
| 01 | Secrets Management | All |
| 02 | Sync Heartbeat | All |
| 03 | Lead Gen Workflow | Gina |
| 04 | Client Onboarding | Kaborya |
| 05 | Site Build & Deploy | Astro |
| 06 | Client Maintenance | Astro |
| 07 | NeverMisleads Master SOP | All |

## 8. Strict Rules

1. **NEVER** edit files inside another agent's `/outbox/` — write to their `/inbox/` only
2. **NEVER** overwrite `soul.md` without Wahhab's explicit command
3. **ALWAYS** use `message_queue.py` for inter-agent communication (not raw file creation)
4. **ALWAYS** sync to Google Drive after modifying `agents/`
5. **ALWAYS** update registry files in `agents/registries/` when state changes
6. Archive processed messages — don't let inboxes pile up
