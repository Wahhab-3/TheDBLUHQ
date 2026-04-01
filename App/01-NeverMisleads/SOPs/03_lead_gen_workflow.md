# Directive 03: Lead Generation Workflow

> **Owner:** Gina (Claude Desktop Browser Agent)
> **Trigger:** Manual request from Wahhab or scheduled prospecting session
> **Output:** PROSPECT_LIST message → Kaborya's inbox

---

## Purpose

Find local businesses that need better websites, qualify them, and hand off a structured lead list to Kaborya for outreach.

---

## Inputs

- **Industry:** e.g., plumbing, HVAC, garage door, restoration, barbershop, restaurant
- **Location:** City + State (e.g., "Denver, CO")
- **Quantity:** Number of leads to find (default: 10 per session)

---

## Process

### Step 1: Search
- Open Google Maps or Google Search for `{industry} near {location}`
- Browse results, focusing on businesses that:
  - Have reviews but poor/no website
  - Have a website that is broken, non-mobile, or outdated
  - Are clearly active (recent reviews, listed hours)

### Step 2: Qualify Each Lead
For each potential lead, check:
- [ ] Business is active (updated hours, recent reviews)
- [ ] Website is missing, broken, or outdated
- [ ] Contact info is findable (phone, email, or contact form)
- [ ] Business type matches NeverMisleads target market (local service SMBs)

### Step 3: Capture Lead Data
For each qualified lead, record:
```json
{
  "business_name": "...",
  "industry": "plumbing",
  "location": "Denver, CO",
  "website": "current URL or 'none'",
  "site_issues": ["not mobile friendly", "no contact form", "outdated design"],
  "google_rating": 4.2,
  "review_count": 87,
  "contact_phone": "555-1234",
  "contact_email": "if found",
  "notes": "Any extra context"
}
```

### Step 4: Create PROSPECT_LIST Message
Use message_queue.py to create and send:
```bash
python3 execution/message_queue.py create gina kaborya PROSPECT_LIST HIGH '{
  "search_criteria": "plumbers near Denver, CO",
  "date_scraped": "2025-03-02",
  "leads": [ ...array of lead objects... ],
  "total_count": 10
}'
```

### Step 5: Sync to Drive
```bash
python3 execution/drive_sync.py upload Shared_Memory/Kaborya/inbox/ Kaborya/Shared_Memory/Kaborya/inbox/
```

---

## Quality Rules

- **Minimum 5 leads per session** (unless the market is very small)
- **No duplicate leads** — check `Shared_Memory/lead_pipeline.json` before adding
- **No cold data** — every lead must have at least a phone number
- **Site issues must be specific** — not just "bad website" but what exactly is wrong
- **Never fabricate data** — if contact info isn't findable, note it as missing

---

## Error Handling

| Issue | Action |
|-------|--------|
| Can't find enough leads in target area | Expand radius or try adjacent cities |
| All businesses already have good websites | Switch industry or location |
| Contact info not available | Still include lead but mark contact as "needs manual lookup" |
| Browser automation blocked | Switch to manual browsing |

---

## Output Destination

`Shared_Memory/Kaborya/inbox/` as a PROSPECT_LIST message (JSON)

---

## Success Criteria

- Kaborya can read the prospect list without asking for clarification
- Every lead has enough info to start outreach (name + phone minimum)
- No duplicates with existing pipeline
