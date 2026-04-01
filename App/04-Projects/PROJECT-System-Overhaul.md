# Project: System Overhaul & Infrastructure Migration
**Owner:** Wahhab
**Started:** March 31, 2026
**Target MVP:** April 3, 2026 (Day 3)
**Target Full Completion:** April 14, 2026 (Day 14)
**Status:** In Progress

---

## Overview

Migrating the entire DBLU operation from a flat-folder Google Drive setup with a 3-agent VPS model (Kaborya/Gina/Astro) to a clean, automated split-architecture system. The new system puts automation on the VPS via n8n, AI processing on a local Mac via Ollama/Qwen, and syncs everything through an Obsidian vault backed by Git. Claude Cowork is reserved exclusively for interactive building — never burned on automation.

This project also includes cleaning out ~8 GB of junk from DBLU HQ before anything gets migrated to the new vault.

---

## Architecture

| Component | Machine | Role |
|-----------|---------|------|
| **n8n** | VPS (76.13.99.181, Ubuntu 24.04) | All scheduled/automated workflows, cron jobs, webhook handlers |
| **Obsidian Vault (master)** | VPS | Canonical copy of all project files, synced via Git |
| **Obsidian Vault (local)** | Mac M3 | Working copy, synced every 5 min via Obsidian Git plugin |
| **Ollama + Qwen 2.5 3B** | Mac M3 | Local LLM for AI tasks (lead scoring, email drafts, content) |
| **AI Queue Watcher** | Mac M3 | Python script watching _Queue/needs-ai/, processing via Ollama |
| **Claude Cowork** | Mac M3 | Interactive building sessions with Wahhab only |
| **Git/GitHub** | Both | The glue — vault sync, no tunnels or SSH needed |

**Communication flow:** n8n writes task files to `_Queue/needs-ai/` → VPS Git cron pushes → Mac pulls via Obsidian Git → watcher script runs task through Qwen → result to `_Queue/ai-results/` → Git syncs back to VPS → n8n reads result. ~10 min round trip.

---

## Key Decisions Made

1. **NOT replacing VPS** — splitting workload instead. VPS handles automation, Mac handles AI and interactive work.
2. **Local LLM over API** — Qwen 2.5 3B on Mac M3 (Metal GPU, ~2 GB RAM). Avoids burning Claude messages on routine tasks.
3. **Git over Tailscale** — No SSH tunnels or direct connections. Git push/pull every 5 min is fast enough for async automation.
4. **Obsidian as single source of truth** — Everything lives in the vault. n8n reads/writes to it. Claude Cowork reads/writes to it. No more scattered Google Drive folders.
5. **DBLU HQ cleanup before migration** — No junk enters the new vault. node_modules, dist, and dead projects get purged first.
6. **NeverMisleads is revenue priority #1** — All automation efforts prioritize lead gen and client pipeline before anything else.

---

## Task Roadmap

### Week 1: April 1–7, 2026

#### Days 1–3: MVP Sprint (April 1–3)

**Day 1 — Laptop + Foundations** `~1 hr total` `Wahhab`

- [ ] Install AlDente, cap battery at 80% `Mac` `5 min`
- [ ] Configure macOS to never sleep `Mac` `3 min`
- [ ] Install Obsidian, create DBLU-Vault at ~/DBLU-Vault `Mac` `5 min`
- [ ] Create private GitHub repo: DBLU-Vault `GitHub` `3 min`
- [ ] Initialize Git in vault and push `Mac` `5 min`
- [ ] Install + configure Obsidian Git plugin (5 min pull/push, 10 min commit) `Mac` `5 min`
- [ ] Create vault folder structure (00-Core through _Queue) `Mac` `10 min`
- [ ] Migrate core files from DBLU HQ to vault (soul.md, Wahhab.md, INSTRUCTIONS.md, sales docs, directives) `Mac + Claude` `30 min`

**Day 2 — VPS + n8n + Git Sync** `~2 hr total` `Wahhab`

- [ ] SSH into VPS, audit running processes and disk `VPS` `15 min`
- [ ] Install n8n via Docker, set up Nginx reverse proxy + SSL `VPS` `30 min`
- [ ] Clone DBLU-Vault repo on VPS, set up deploy key `VPS` `10 min`
- [ ] Set up VPS Git auto-sync cron (every 5 min) `VPS` `15 min`
- [ ] Test full sync loop — Mac → VPS and VPS → Mac `Both` `15 min`
- [ ] Build first n8n workflow: Site Uptime Monitor (every 6 hr) `VPS` `30 min`

**Day 3 — Local LLM + AI Queue** `~2.5 hr total` `Wahhab + Claude`

- [ ] Install Ollama, pull Qwen 2.5 3B, test locally `Mac` `10 min`
- [ ] Build AI queue watcher script (Python, watches _Queue/needs-ai/, launchd) `Mac + Claude` `45 min`
- [ ] Test full AI loop: n8n → Git → Mac → Qwen → Git → VPS `Both` `20 min`
- [ ] Write per-project .claude/INSTRUCTIONS.md files `Mac + Claude` `1 hr`

> **MVP checkpoint (April 3):** Always-on Mac, n8n on VPS, vault syncing, AI queue operational, Claude project instructions loaded.

#### Days 4–7: NeverMisleads Automation (April 4–7)

- [ ] Build n8n workflow: Automated Lead Gen (Mon/Wed/Fri 10 AM via Apify) `VPS + Claude` `1.5 hr`
- [ ] Build n8n workflow: Lead Scoring via AI Queue (Qwen scores 1-10) `Both` `1 hr`
- [ ] Build n8n workflow: Outreach Email Drafts (AI-personalized from sales playbook) `Both` `1 hr`
- [ ] Build n8n workflow: Weekly SEO Audit (Monday 9 AM, all client sites) `VPS` `1 hr`
- [ ] Set up Vapi AI receptionist template (clonable per client) `Mac + Claude` `1 hr`
- [ ] Migrate NeverMisleads client files to vault (no node_modules/dist) `Mac` `30 min`

> **End of Week 1:** NeverMisleads lead gen, scoring, and outreach drafting running automatically. SEO monitoring weekly. AI receptionist ready.

---

### Week 2: April 8–14, 2026

#### Days 8–10: Content Pipeline + Workflows

- [ ] Build n8n workflow: Social Trend Scanner (Tue/Thu 9 AM, TikTok/IG) `VPS` `1 hr`
- [ ] Build n8n workflow: Email Triage (3x daily, Gmail API, keyword matching) `VPS` `1 hr`
- [ ] Build n8n workflow: Weekly MRR Report (Sunday 6 PM) `VPS` `45 min`
- [ ] Create Obsidian templates (Daily Note, Client Brief, Lead List, Content Idea) `Mac` `30 min`

#### Days 11–12: Cleanup + Archive

- [ ] Archive dead projects from DBLU HQ (Gravity Claw, Dialer, Immigration Records, Flying Carpet) `Mac` `15 min`
- [ ] Finish DBLU HQ cleanup audit (Kaborya_Brain, Side_projects, School, remaining folders) `Mac + Claude` `2 hr`
- [ ] Execute all approved deletions from cleanup reports `Mac` `30 min`

#### Days 13–14: Stress Test + Documentation

- [ ] Stress test: let full system run 48 hours untouched, fix what breaks `Both` `Monitor`
- [ ] Write 00-Core/systems.md — full architecture doc, restart procedures, workflow descriptions `Mac + Claude` `30 min`

> **End of Week 2:** Full system live, tested, and documented. All automation running. DBLU HQ cleaned out. Vault is the single source of truth.

---

## Recurring Tasks (Post-Setup)

These run automatically via n8n once built. Wahhab reviews outputs, not inputs.

| Task | Frequency | Runs On | Output Location |
|------|-----------|---------|-----------------|
| Site Uptime Monitor | Every 6 hours | VPS/n8n | _Queue/alerts/ |
| Lead Gen (Apify scrape) | Mon/Wed/Fri 10 AM | VPS/n8n | 01-NeverMisleads/Prospects/ |
| Lead Scoring | After each lead gen run | Mac/Qwen | 01-NeverMisleads/Prospects/ |
| Outreach Email Drafts | After lead scoring | Mac/Qwen | 01-NeverMisleads/Prospects/outreach-drafts/ |
| Weekly SEO Audit | Monday 9 AM | VPS/n8n | 01-NeverMisleads/SEO/ |
| Social Trend Scanner | Tue/Thu 9 AM | VPS/n8n | 02-Artist/Content-Calendar/ |
| Email Triage | 3x daily | VPS/n8n | _Daily/ |
| Weekly MRR Report | Sunday 6 PM | VPS/n8n | 01-NeverMisleads/Reports/ |
| Git Vault Sync | Every 5 min | Both | Automatic |

---

## DBLU HQ Cleanup Status

Cleanup must finish before migration. One folder at a time, nothing in use gets deleted.

| Folder | Status | Recoverable | Report |
|--------|--------|-------------|--------|
| DBLUofficial | Done — moved to SafeToDelete | ~5.4 GB | Cleanup-Report-01-DBLUofficial.md |
| NeverMisleads | Report written, awaiting approval | ~2.2 GB | Cleanup-Report-02-NeverMisleads.md |
| Kaborya_Brain | Pending | TBD | — |
| Side_projects | Pending | TBD | — |
| School | Pending | TBD | — |
| AbdulWahab / Abdulwahhab | Pending | TBD | — |
| Assets / Fonts | Pending | TBD | — |
| Creative Spaces | Pending | TBD | — |
| The Global Ikon | Pending | TBD | — |

---

## Time Budget

| Phase | Estimated Hours | When |
|-------|-----------------|------|
| Day 1: Foundations | 1 hr | April 1 |
| Day 2: VPS + n8n | 2 hr | April 2 |
| Day 3: LLM + AI Queue | 2.5 hr | April 3 |
| Days 4–7: NeverMisleads Automation | 6 hr | April 4–7 |
| Days 8–14: Content + Polish | 6 hr | April 8–14 |
| **Total setup time** | **~17.5 hr** | **Over 14 days** |

Claude Cowork sessions are used only for: building n8n workflows, writing the AI queue watcher, writing per-project instructions, and building Vapi templates. Everything else is manual terminal/GUI work.

---

## Key Contacts & Outreach Tracking

| Contact/Service | Purpose | Status |
|-----------------|---------|--------|
| Luxx Barbershop | Active client — site built and deployed | Maintaining |
| Nexus Mission Critical | Active client — site built and deployed | Maintaining |
| Exit420 | Prospect — site in progress | In pipeline |
| Apify | Lead gen scraping (Google Maps) | Integrate into n8n |
| Vapi | AI phone receptionist for clients | Set up template |
| Hostinger VPS | Client site hosting + n8n + vault | Active (76.13.99.181) |

---

## Notes for Scheduling Agent

This file covers infrastructure and automation setup only. It should be combined with project files for NeverMisleads (client work, outreach), Artist (content, releases), School (assignments, deadlines), and any other active projects to build a complete day-to-day schedule.

Key constraints for scheduling:
- Claude Cowork has message limits — batch building sessions, don't spread thin across the day.
- n8n workflow building requires focused blocks (1–1.5 hr each) in Claude Cowork.
- Manual tasks (installs, config, Git setup) can be done outside Claude sessions.
- NeverMisleads revenue work takes priority over everything else.
- Stress test period (Days 13–14) means no new changes — just monitor.
