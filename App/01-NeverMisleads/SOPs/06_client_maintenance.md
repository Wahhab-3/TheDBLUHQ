# Directive 06: Client Maintenance

> **Owner:** Astro (primary) or any agent depending on task
> **Trigger:** MAINTENANCE message in any agent's inbox
> **Output:** Updated site + completion confirmation → Kaborya's inbox

---

## Purpose

Handle post-deployment updates, fixes, and ongoing maintenance for active clients.

---

## Inputs

- MAINTENANCE message (from any agent's inbox)
- Client project files (in `projects/NeverMisleads/active_clients/{client_id}/`)
- Client record (in `Shared_Memory/client_registry.json`)

---

## Process

### Step 1: Read MAINTENANCE Message
Parse payload:
```json
{
  "client_id": "joes-plumbing-001",
  "domain": "joesplumbing.com",
  "task": "Update phone number in footer",
  "details": "Change 555-1234 to 555-5678",
  "priority": "HIGH",
  "requested_by": "client",
  "deadline": "2025-03-10"
}
```

### Step 2: Assess Scope
- **Minor** (< 30 min): Text changes, color tweaks, image swaps → execute immediately
- **Medium** (30 min - 2 hours): New section, layout changes, form updates → schedule
- **Major** (> 2 hours): Redesign, new pages, feature additions → escalate to Wahhab for approval

### Step 3: Make Changes
- Pull client project from `projects/NeverMisleads/active_clients/{client_id}/`
- Make the requested changes
- Test locally (`npm run dev`)
- Verify the fix matches the request

### Step 4: Deploy
```bash
python3 execution/site_deploy.py \
  --client-id joes-plumbing-001 \
  --domain joesplumbing.com \
  --env production
```

### Step 5: Confirm
Send confirmation to Kaborya:
```bash
python3 execution/message_queue.py create astro kaborya MAINTENANCE MEDIUM '{
  "client_id": "joes-plumbing-001",
  "task_completed": "Updated phone number in footer",
  "changes_made": ["Footer phone: 555-1234 → 555-5678"],
  "deployed": true,
  "verified_url": "https://joesplumbing.com"
}'
```

### Step 6: Update Registry
Update `client_registry.json`:
- Set `last_maintenance` to current date
- Add entry to `support_tickets` array

---

## Response Time SLA

| Priority | Response Time | Resolution Time |
|----------|--------------|-----------------|
| HIGH | Same day | 24 hours |
| MEDIUM | 48 hours | 5 days |
| LOW | 1 week | 2 weeks |

---

## Error Handling

| Issue | Action |
|-------|--------|
| Client project files not found | Check deployment registry for source location |
| Change breaks the site | Revert, fix, redeploy |
| Scope exceeds maintenance tier | Notify Kaborya → Kaborya discusses upsell with client |
| Unclear request | Kaborya asks client for clarification before Astro begins |

---

## Output

`Shared_Memory/Kaborya/inbox/` — completion confirmation (MAINTENANCE type message)
