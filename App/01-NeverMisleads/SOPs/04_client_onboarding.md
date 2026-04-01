# Directive 04: Client Onboarding (Sales → Build Handoff)

> **Owner:** Kaborya (VPS Telegram Agent)
> **Trigger:** New PROSPECT_LIST message in Kaborya's inbox
> **Output:** CLIENT_BRIEF message → Astro's inbox

---

## Purpose

Take qualified leads from Gina, run outreach, close the deal, and hand off a complete build spec to Astro.

---

## Inputs

- PROSPECT_LIST message from Gina (in `Shared_Memory/Kaborya/inbox/`)
- Sales knowledge base (`data/V3 Sales SOURCE FILE — INTERNAL.txt`)
- Pricing from CONFIG.json (`nevermisleads.pricing`)

---

## Process

### Step 1: Read and Prioritize Leads
- Pull PROSPECT_LIST from inbox
- Rank leads by:
  1. Higher review count (more established = more likely to pay)
  2. Worse website (bigger pain point = easier sell)
  3. Contact info completeness (email + phone > phone only)

### Step 2: Outreach (via Telegram or SMS)
For each prioritized lead:
- **First contact:** Introduce NeverMisleads, reference their specific site issues
- **Value prop:** "We build you a professional website for free — you just pay a monthly subscription for hosting, SEO, and maintenance"
- **Qualification questions:**
  1. How do you currently handle new customer calls?
  2. Do you have a budget for marketing/web presence?
  3. What's your biggest pain point with your current online presence?

### Step 3: Close the Deal
If lead is interested:
- Present pricing tier (reference CONFIG.json pricing)
- Confirm: business name, domain preference, brand colors, logo (if any), services offered, service area
- Collect: contact email, phone, preferred communication method
- Agree on: tier, start date, expectations

### Step 4: Create CLIENT_BRIEF Message
```bash
python3 execution/message_queue.py create kaborya astro CLIENT_BRIEF HIGH '{
  "client_name": "Joe'\''s Plumbing",
  "client_id": "joes-plumbing-001",
  "industry": "plumbing",
  "location": "Denver, CO",
  "domain": "joesplumbing.com",
  "brand_colors": ["#FF6B35", "#004E89"],
  "logo_url": "if provided",
  "services": ["Emergency plumbing", "Drain cleaning", "Water heater repair"],
  "service_area": "Denver metro area",
  "contact_phone": "555-1234",
  "contact_email": "joe@example.com",
  "tier": "pro",
  "contract_value_monthly": 249,
  "setup_fee": 199,
  "special_notes": "Wants emergency call routing prominently displayed",
  "deployment_deadline": "2025-03-15"
}'
```

### Step 5: Update Pipeline
Update `Shared_Memory/lead_pipeline.json`:
- Move lead from `QUALIFIED` → `CLOSED`
- Add contract details

### Step 6: Sync
```bash
python3 execution/drive_sync.py upload Shared_Memory/ Kaborya/Shared_Memory/
```

---

## Communication Rules

- **Always identify as AI** when communicating with leads
- **Never claim guaranteed results** (no "we guarantee #1 on Google")
- **Never negotiate below minimum pricing** without Wahhab's approval
- **Escalate to Wahhab** for: contract negotiations, custom pricing, confused/upset prospects

---

## Pricing Reference (from CONFIG.json)

| Tier | Monthly | Setup Fee | Includes |
|------|---------|-----------|----------|
| Starter | $149/mo | $199 | Website hosting + basic SEO |
| Pro | $249/mo | $199 | + AI receptionist + on-site SEO |
| Premium | $399/mo | $199 | + off-site SEO + social media management |

---

## Error Handling

| Issue | Action |
|-------|--------|
| Lead doesn't respond after 2 attempts | Move to COLD in pipeline, try again in 2 weeks |
| Lead interested but wants custom pricing | Escalate to Wahhab via Telegram |
| Lead wants features we don't offer | Note it, close as REJECTED with reason |
| Can't reach lead by phone | Try email, then mark as "needs follow-up" |

---

## Output Destination

`Shared_Memory/Astro/inbox/` as a CLIENT_BRIEF message (JSON)

---

## Success Criteria

- Astro can build the entire site from the CLIENT_BRIEF without asking Kaborya questions
- Pipeline is updated with accurate stage transitions
- No client is promised something we can't deliver
