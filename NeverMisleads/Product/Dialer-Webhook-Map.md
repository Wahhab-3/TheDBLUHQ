---
title: Dialer Webhook Map (n8n)
type: spec
project: NeverMisleads
created: 2026-03-17
source: DBLU HQ/NeverMisleads/Website/NeverMisleads-Webhook-Map.md
---

# NeverMisleads Dialer — Webhook Map for n8n

Every interactive element on the frontend fires a webhook to n8n. n8n handles the logic and returns the data. The frontend is dumb — it just sends and displays.

---

## How It Works

```
[Frontend Button Click] → POST to n8n webhook URL → [n8n workflow runs] → JSON response → [Frontend updates UI]
```

All webhooks are POST requests. All send and receive JSON. The frontend stores the current `lead_id` in state and sends it with every request.

---

## Webhook #1: CALL BUTTON (Green Phone Icon)

**Trigger**: User clicks the green call button
**Keyboard shortcut**: Space

```
POST /webhook/call-lead
```

**Frontend sends:**
```json
{
  "lead_id": "abc123",
  "phone": "+15550123456",
  "lead_name": "Michael Chen",
  "business_name": "Apex Plumbing Experts"
}
```

**n8n does:**
1. Receives webhook
2. Calls Twilio API → creates outbound call from your Twilio number to `phone`
3. (Optional) Starts call recording
4. Returns call SID to frontend

**n8n returns:**
```json
{
  "status": "calling",
  "call_sid": "CA1234567890",
  "from_number": "+14075551234"
}
```

**Frontend updates:**
- Changes "Ready to call" → "Calling..." with timer
- Green dot pulses

---

## Webhook #2: LOG OUTCOME (Buttons 1-6)

**Trigger**: User clicks any outcome button (1. Interested through 6. Drop Voicemail)
**Keyboard shortcuts**: 1, 2, 3, 4, 5, 6

```
POST /webhook/log-outcome
```

**Frontend sends:**
```json
{
  "lead_id": "abc123",
  "outcome": "interested",
  "call_sid": "CA1234567890",
  "notes": "Loves the idea, wants to see the website mockup",
  "call_duration_seconds": 142
}
```

**Possible outcome values:** `interested`, `callback`, `not_interested`, `no_answer`, `wrong_number`, `voicemail`

**n8n does:**
1. Receives webhook
2. Logs call to database (Google Sheets, Supabase, or Airtable)
3. Updates lead stage based on outcome:
   - `interested` → stage = "Warm Lead"
   - `callback` → stage = "Contacted", set follow-up reminder
   - `not_interested` → stage = "Closed Lost"
   - `no_answer` → stage stays "Contacted", schedule retry in 24h
   - `wrong_number` → stage = "Archived"
   - `voicemail` → stage = "Contacted" + trigger voicemail drop workflow
4. If outcome is `voicemail` → call Twilio to drop pre-recorded voicemail
5. Fetches the NEXT lead in the queue
6. Returns next lead data to frontend

**n8n returns:**
```json
{
  "status": "logged",
  "outcome_saved": "interested",
  "next_lead": {
    "lead_id": "def456",
    "business_name": "Sunshine Roofing Co",
    "owner_name": "Carlos Rivera",
    "phone": "+15559876543",
    "industry": "Roofing",
    "address": "456 Oak Ave, Tampa, FL 33601",
    "website": "https://sunshineroofing.com",
    "google_rating": 3.9,
    "review_count": 18,
    "tags": ["Roofing", "Tampa", "No Website"],
    "source": "Google Maps Scrape",
    "pitch_script": "Hey Carlos, this is Wahhab. We build your website before we even meet. Give me 3 days and I'll show you the completed site on a quick Google Meet. If you don't like it, you'll never hear from me again."
  },
  "queue_position": "2 / 3",
  "daily_stats": {
    "calls_today": 12,
    "connections": 4,
    "interested": 2
  }
}
```

**Frontend updates:**
- Loads next lead into all fields
- Resets call timer
- Updates queue counter (2/3)
- Website preview iframe loads new URL
- Notes field clears
- Activity timeline refreshes

---

## Webhook #3: SKIP LEAD

**Trigger**: User clicks "Skip (N)"
**Keyboard shortcut**: N

```
POST /webhook/skip-lead
```

**Frontend sends:**
```json
{
  "lead_id": "abc123",
  "reason": "skipped"
}
```

**n8n does:**
1. Logs the skip (so you know which leads were skipped)
2. Does NOT change lead stage
3. Fetches next lead in queue

**n8n returns:** Same structure as Webhook #2's `next_lead` response

---

## Webhook #4: SAVE NOTES

**Trigger**: Auto-save when notes field loses focus, or when outcome is logged
**Keyboard shortcut**: Notes auto-save with outcome

```
POST /webhook/save-notes
```

**Frontend sends:**
```json
{
  "lead_id": "abc123",
  "notes": "Interested but wants to wait until April. Follow up in 2 weeks."
}
```

**n8n does:**
1. Appends note to lead record with timestamp
2. Returns confirmation

**n8n returns:**
```json
{
  "status": "saved",
  "timestamp": "2026-03-09T14:23:00Z"
}
```

---

## Webhook #5: LOAD QUEUE (Page Load)

**Trigger**: When the dialer page first loads
**No keyboard shortcut — automatic**

```
POST /webhook/load-queue
```

**Frontend sends:**
```json
{
  "filter": {
    "stage": "new_lead",
    "industry": null,
    "location": null,
    "tags": null
  },
  "limit": 50
}
```

**n8n does:**
1. Queries lead database for leads matching filter
2. Sorts by priority (high priority first, then by date added)
3. Returns the first lead's full data + queue count

**n8n returns:**
```json
{
  "queue_total": 47,
  "current_position": 1,
  "current_lead": {
    "lead_id": "abc123",
    "business_name": "Apex Plumbing Experts",
    "owner_name": "Michael Chen",
    "phone": "+15550123456",
    "industry": "Plumber",
    "address": "123 Main St, Orlando, FL 32801",
    "website": "https://example.com/apex-plumbing",
    "google_rating": 4.8,
    "review_count": 42,
    "tags": ["Plumber", "Orlando", "High Priority"],
    "source": "Google Maps Scrape",
    "activity_timeline": [
      {
        "date": "2026-03-09T10:00:00Z",
        "event": "Found via Google Maps Scrape"
      }
    ]
  },
  "daily_stats": {
    "calls_today": 0,
    "connections": 0,
    "interested": 0
  }
}
```

---

## Webhook #6: SEND SMS (Future — Messenger Tab)

**Trigger**: User types a message and hits Send
**This is for when you add the SMS tab**

```
POST /webhook/send-sms
```

**Frontend sends:**
```json
{
  "lead_id": "abc123",
  "phone": "+15550123456",
  "message": "Hey Michael, I actually went ahead and put together a free preview of what a new website could look like for Apex Plumbing. Want me to send it over?",
  "template_id": "website_hook"
}
```

**n8n does:**
1. Calls Twilio Messaging API to send SMS
2. Logs message to database
3. Returns delivery status

**n8n returns:**
```json
{
  "status": "sent",
  "message_sid": "SM1234567890",
  "timestamp": "2026-03-09T14:30:00Z"
}
```

---

## Webhook #7: RECEIVE SMS (Inbound)

**Trigger**: Lead texts back — Twilio sends webhook to n8n
**This is a Twilio → n8n webhook, not frontend → n8n**

```
Twilio POSTs to: /webhook/inbound-sms
```

**Twilio sends:**
```json
{
  "From": "+15550123456",
  "To": "+14075551234",
  "Body": "Yeah send it over!"
}
```

**n8n does:**
1. Looks up lead by phone number
2. Logs inbound message
3. Pauses any active SMS sequence for this lead
4. (Optional) Sends notification to Wahhab (browser push, Slack, or SMS alert)

---

## Webhook #8: SCRAPE LEADS (Scraper Page)

**Trigger**: User enters industry + location and clicks "Scrape"
**This is for the scraper module/page**

```
POST /webhook/scrape-leads
```

**Frontend sends:**
```json
{
  "industry": "plumber",
  "location": "Orlando, FL",
  "radius": "25mi"
}
```

**n8n does:**
1. Calls SerpAPI or Outscraper with Google Maps search
2. Parses results
3. Deduplicates against existing leads
4. Returns list for user to review

**n8n returns:**
```json
{
  "results_count": 87,
  "new_leads": 64,
  "duplicates_skipped": 23,
  "leads": [
    {
      "business_name": "Ace Plumbing & Drain",
      "phone": "+14075559999",
      "address": "789 Pine St, Orlando, FL 32803",
      "website": null,
      "google_rating": 4.1,
      "review_count": 12,
      "has_website": false
    }
  ]
}
```

---

## Webhook #9: SAVE SCRAPED LEADS (After Review)

**Trigger**: User selects leads from scrape results and clicks "Save to Queue"

```
POST /webhook/save-leads
```

**Frontend sends:**
```json
{
  "leads": ["temp_id_1", "temp_id_2", "temp_id_3"],
  "tags": ["Plumber", "Orlando"],
  "priority": "high"
}
```

**n8n does:**
1. Saves selected leads to database with stage = "New Lead"
2. Tags them
3. Returns count saved

---

## Webhook #10: GET DAILY STATS (Dashboard)

**Trigger**: Page load + refreshes every 60 seconds

```
POST /webhook/daily-stats
```

**n8n returns:**
```json
{
  "today": {
    "calls_made": 23,
    "connections": 8,
    "interested": 3,
    "callbacks_scheduled": 2,
    "sms_sent": 5,
    "sms_received": 2
  },
  "pipeline": {
    "new_leads": 284,
    "contacted": 47,
    "warm_leads": 12,
    "website_sent": 5,
    "meeting_booked": 3,
    "closed_won": 1
  }
}
```

---

## n8n Webhook URLs

Once you create these in n8n, your webhook URLs will look like:

```
https://your-n8n-instance.com/webhook/call-lead
https://your-n8n-instance.com/webhook/log-outcome
https://your-n8n-instance.com/webhook/skip-lead
https://your-n8n-instance.com/webhook/save-notes
https://your-n8n-instance.com/webhook/load-queue
https://your-n8n-instance.com/webhook/send-sms
https://your-n8n-instance.com/webhook/inbound-sms
https://your-n8n-instance.com/webhook/scrape-leads
https://your-n8n-instance.com/webhook/save-leads
https://your-n8n-instance.com/webhook/daily-stats
```

For local dev, these would be `http://localhost:5678/webhook/...`

---

## Build Order for n8n Workflows

### Phase 1: Core Dialer (Build First)
1. `/webhook/load-queue` — Load leads on page open
2. `/webhook/call-lead` — Twilio outbound call
3. `/webhook/log-outcome` — Save outcome + load next lead
4. `/webhook/skip-lead` — Skip + load next
5. `/webhook/save-notes` — Save notes

### Phase 2: Scraper
6. `/webhook/scrape-leads` — Google Maps scrape via SerpAPI
7. `/webhook/save-leads` — Save to database

### Phase 3: SMS
8. `/webhook/send-sms` — Twilio outbound SMS
9. `/webhook/inbound-sms` — Twilio inbound webhook

### Phase 4: Dashboard
10. `/webhook/daily-stats` — Aggregate stats

---

## Database (Start Simple)

For the MVP, use **Google Sheets** or **Airtable** as the database via n8n nodes. You can migrate to Supabase/Postgres later. One sheet/table with columns:

| lead_id | business_name | owner_name | phone | industry | address | website | google_rating | review_count | stage | tags | notes | source | created_at | last_contacted | next_followup |

---

## Frontend Config

The frontend needs ONE config variable — the n8n base URL:

```javascript
const N8N_BASE = "http://localhost:5678/webhook"
// or in production:
// const N8N_BASE = "https://your-n8n.com/webhook"
```

Every button just calls:
```javascript
fetch(`${N8N_BASE}/call-lead`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ lead_id, phone, lead_name, business_name })
})
```

That's it. The frontend stays dumb. n8n does all the work.

---

## Related

- [[NeverMisleads]]
- [[LeadEngine-App-Spec]]
- [[n8n-Form-To-Maya-Setup]]
