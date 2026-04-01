# Directive 07: NeverMisleads Master Workflow

> **Type:** Master SOP — connects all agent workflows end-to-end
> **Scope:** Full client lifecycle from lead discovery to ongoing revenue

---

## The Pipeline

```
GINA (Prospecting)          KABORYA (Sales)             ASTRO (Build)
─────────────────           ───────────────             ─────────────

Search → Qualify            Read prospects              Read brief
     ↓                           ↓                          ↓
PROSPECT_LIST ──────→    Outreach → Close              Scaffold site
                               ↓                          ↓
                         CLIENT_BRIEF ──────→        Customize → Test
                                                         ↓
                         Review staging  ←────── STAGING_URL
                               ↓
                         Client approves
                               ↓
                         Approve deploy  ──────→  Deploy production
                                                         ↓
                         Notify client  ←────── PRODUCTION_DEPLOYED
                               ↓
                         Collect payment
                               ↓
                         Monthly support ←────→ MAINTENANCE (loop)
```

---

## Message Flow Reference

| Step | Message Type | From | To | Directive |
|------|-------------|------|----|-----------|
| 1 | PROSPECT_LIST | Gina | Kaborya | 03 |
| 2 | CLIENT_BRIEF | Kaborya | Astro | 04 |
| 3 | STAGING_URL | Astro | Kaborya | 05 |
| 4 | PRODUCTION_DEPLOYED | Astro | Kaborya | 05 |
| 5 | MAINTENANCE | Any | Astro | 06 |

---

## Execution Scripts Reference

| Script | Purpose | Used By |
|--------|---------|---------|
| `config_loader.py` | Load centralized config | All agents |
| `drive_sync.py` | Google Drive upload/download/sync | All agents |
| `message_queue.py` | Create/read/complete messages | All agents |
| `vault.py` | Encrypt/decrypt secrets | All agents |
| `site_deploy.py` | Deploy client sites to Hostinger | Astro |

---

## Shared Memory Files

| File | Purpose | Updated By |
|------|---------|-----------|
| `lead_pipeline.json` | Track all prospects by stage | Gina (new leads), Kaborya (stage changes) |
| `client_registry.json` | Track active paying clients | Kaborya (new clients), Astro (deploy status) |
| `deployment_registry.json` | Track all deployed sites | Astro (on deploy) |

---

## Sync Protocol

**Every agent, after making changes to Shared_Memory:**
```bash
python3 execution/drive_sync.py sync Shared_Memory/ Kaborya/Shared_Memory/
```

**Every agent, on startup:**
```bash
python3 execution/drive_sync.py download Kaborya/Shared_Memory/ Shared_Memory/
```

**Kaborya (VPS), every 30 minutes:**
Heartbeat sync runs automatically, pushing/pulling from Google Drive.

---

## MRR Tracking

Target: $3,000/month (from CONFIG.json)

Each closed client adds to MRR:
- Starter: +$149/mo
- Pro: +$249/mo
- Premium: +$399/mo

**Breakeven examples:**
- 21 Starter clients = $3,129/mo
- 13 Pro clients = $3,237/mo
- 8 Premium clients = $3,192/mo

Track current MRR in `client_registry.json` → `mrr_total` field.

---

## Weekly Check

Every Monday, Kaborya runs status check:
1. `python3 execution/message_queue.py status` — any stuck messages?
2. Review `lead_pipeline.json` — how many leads at each stage?
3. Review `client_registry.json` — current MRR?
4. Report to Wahhab via Telegram with summary

---

## Rules

1. **No agent acts without a directive** — if there's no SOP, ask Wahhab first
2. **No agent edits another agent's outbox** — inbox only
3. **soul.md is read-only** — only Wahhab can modify it
4. **Shared_Memory is the single source of truth** — if it's not in the JSON, it didn't happen
5. **Sync after every change** — stale data = broken handoffs
6. **When in doubt, message Kaborya** — Kaborya is the coordination hub
