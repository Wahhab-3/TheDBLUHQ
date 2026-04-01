# Directive 05: Site Build & Deploy

> **Owner:** Astro (Gemini IDE Local Builder)
> **Trigger:** CLIENT_BRIEF message in Astro's inbox
> **Output:** STAGING_URL → then PRODUCTION_DEPLOYED message → Kaborya's inbox

---

## Purpose

Take a client brief, build a professional website, deploy to staging for review, then push to production.

---

## Inputs

- CLIENT_BRIEF message from Kaborya (in `Shared_Memory/Astro/inbox/`)
- Site templates (in `projects/NeverMisleads/templates/`)
- Deployment config from CONFIG.json

---

## Process

### Step 1: Read CLIENT_BRIEF
- Parse the message payload
- Extract: client name, domain, brand colors, services, contact info, special notes
- Check deployment deadline

### Step 2: Scaffold Project
```bash
# Create client project directory
mkdir -p projects/NeverMisleads/active_clients/{client_id}/

# Copy template
cp -r projects/NeverMisleads/templates/service_business/* projects/NeverMisleads/active_clients/{client_id}/
```

Create `site.json` in the client directory:
```json
{
  "client_id": "joes-plumbing-001",
  "client_name": "Joe's Plumbing",
  "domain": "joesplumbing.com",
  "template": "service_business",
  "created_date": "2025-03-02",
  "status": "BUILDING",
  "tier": "pro"
}
```

### Step 3: Customize
Using the CLIENT_BRIEF data:
- Update brand colors (CSS variables or Tailwind config)
- Replace placeholder business name, phone, email
- Add services list
- Add service area
- Insert logo if provided
- Configure contact form / call-to-action
- Add any special elements from `special_notes`

### Step 4: Test Locally
- `npm run dev` — verify site loads
- Check mobile responsiveness
- Verify all links work
- Verify contact form submits
- Verify SEO basics (title, meta description, OG tags)

### Step 5: Deploy to Staging
Using `execution/site_deploy.py`:
```bash
python3 execution/site_deploy.py \
  --client-id joes-plumbing-001 \
  --domain joesplumbing.com \
  --env staging
```

### Step 6: Send STAGING_URL to Kaborya
```bash
python3 execution/message_queue.py create astro kaborya STAGING_URL HIGH '{
  "client_id": "joes-plumbing-001",
  "client_name": "Joes Plumbing",
  "staging_url": "https://staging-joes.hostinger.com",
  "production_domain": "joesplumbing.com",
  "status": "READY_FOR_REVIEW",
  "checklist": {
    "mobile_responsive": true,
    "contact_form": true,
    "seo_basics": true,
    "ssl": true,
    "page_speed": "good"
  },
  "next_steps": "Client review, then DNS cutover"
}'
```

### Step 7: Production Deploy (After Client Approval)
When Kaborya confirms client approved:
```bash
python3 execution/site_deploy.py \
  --client-id joes-plumbing-001 \
  --domain joesplumbing.com \
  --env production
```

### Step 8: Send PRODUCTION_DEPLOYED
```bash
python3 execution/message_queue.py create astro kaborya PRODUCTION_DEPLOYED HIGH '{
  "client_id": "joes-plumbing-001",
  "domain": "joesplumbing.com",
  "live_url": "https://joesplumbing.com",
  "deployed_at": "2025-03-05T14:30:00Z",
  "ssl_status": "active",
  "dns_configured": true
}'
```

### Step 9: Update Registries
Update `Shared_Memory/client_registry.json` — add new client entry
Update `Shared_Memory/deployment_registry.json` — add deployment record

### Step 10: Sync
```bash
python3 execution/drive_sync.py upload Shared_Memory/ Kaborya/Shared_Memory/
```

---

## Build Standards

- **Framework:** Next.js (or template-specific framework from CONFIG.json)
- **Hosting:** Hostinger VPS with Nginx (see `execution/site_deploy.py`)
- **SSL:** Let's Encrypt via Certbot
- **Mobile-first:** All sites must pass Google Mobile-Friendly Test
- **Page speed:** Target 90+ on Lighthouse
- **SEO:** Title tags, meta descriptions, OG tags, structured data for local business

---

## Template System

Templates live in `projects/NeverMisleads/templates/`:
- `service_business/` — general local service (plumbing, HVAC, electrical)
- Additional templates added as needed

Each template includes:
- Pre-built pages (Home, Services, About, Contact)
- CSS variable system for easy color swaps
- Placeholder content with clear markers
- Mobile-responsive layout
- Contact form integration

---

## Error Handling

| Issue | Action |
|-------|--------|
| Template doesn't exist for client type | Build from closest template + customize |
| Client logo is low quality | Use text-based logo with brand colors |
| Domain not yet registered | Note in STAGING_URL message, Kaborya handles domain purchase |
| Build fails | Fix, test, retry. Don't send STAGING_URL until it works |
| Client requests changes after staging | Create MAINTENANCE message (see directive 06) |

---

## Output Destinations

1. `Shared_Memory/Kaborya/inbox/` — STAGING_URL message
2. `Shared_Memory/Kaborya/inbox/` — PRODUCTION_DEPLOYED message
3. `Shared_Memory/client_registry.json` — updated client entry
4. `Shared_Memory/deployment_registry.json` — deployment record

---

## Success Criteria

- Site is live, loads fast, looks professional
- Client can see their business name, colors, services, and contact info
- Kaborya can share the URL with the client without caveats
- Registry files are up to date
