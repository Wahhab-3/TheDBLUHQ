# The 3-Agent OS: File System Architecture

> This document defines exactly where each agent (Kaborya, Gina, Antigravity) reads and writes data. If you are an AI reading this, you must strictly respect this folder hierarchy to prevent conflicts, overwrites, or lost context.

---

## 1. The Core Brain
**`/soul.md`** 
- **What it is:** The master Context & Personality Profile.
- **Rules:** Read-only for all agents. Only Wahhab (or an agent acting on direct textual orders from Wahhab) can modify this file.

---

## 2. The Handoff Queues (`/inbox/`)
This is the central nervous system. Agents do not speak directly; they drop state files here for the others to pick up.

**`/inbox/gina_drops/`**
- **Written by:** Gina (Claude Cowork).
- **Contents:** Raw lead lists, downloaded brand assets, scraped competitor data, competitor research.
- **Picked up by:** Kaborya (to start outreach) or Antigravity (to scaffold a demo build).

**`/inbox/kaborya_drops/`**
- **Written by:** Kaborya (VPS Telegram Bot).
- **Contents:** `Client_Brief.md`, project specs based on concluded Telegram sales calls, or alerts that a client replied.
- **Picked up by:** Antigravity (to write code) or Gina (to scrape more info on the client).

**`/inbox/antigravity_drops/`**
- **Written by:** Antigravity (Local Builder).
- **Contents:** Vercel staging URLs, completed project links, bug status updates.
- **Picked up by:** Kaborya (to text the client "Hey, your site is up! Here is the link.").

---

## 3. The 3-Layer Execution System (`/directives/` & `/execution/`)

**`/directives/` (Layer 1: SOPs)**
- Written in Markdown. These are natural-language SOPs (Standard Operating Procedures) for the agents. 
- Example: `nevermisleads_prospecting.md`, `street_team_contest_rules.md`.
- Read by all agents to understand *how* to do a task.

**`/execution/` (Layer 2: Scripts)**
- Deterministic Python/Node scripts. 
- Example: An email sender script, a scraping script, or API utilities.
- Handled by Antigravity or Kaborya. 

**`/.tmp/` (Layer 3: Intermediates)**
- Toss junk data, test files, or large raw downloads here. Regenerated automatically; do not store permanent work here.

---

## 4. Work Zones (`/projects/`)

**`/projects/nevermisleads/`**
- `active_clients/`: Built websites, code, and finalized `.env` files.
- `templates/`: Boilerplate code for quickly cloning local service/HVAC sites.

**`/projects/dblu/`**
- `street_team/`: Rosters, leaderboards, and contest structures for the Egyptian Street Team rollout.
- `assets/`: Merch designs, logos, and mockups.

**`/projects/wahhab_music/`**
- `releases/`: Audio bounces, visualizers, lyrical context, and release schedules for music.
