---
title: LeadEngine App Specification
type: spec
project: NeverMisleads
created: 2026-03-17
source: DBLU HQ/NeverMisleads/Website/NeverMisleads-LeadEngine-App-Prompt.md
---

# NeverMisleads Lead Engine — Full App Prompt

## Who This Is For
You are building a lead generation and outreach app for **NeverMisleads**, a full-service branding, marketing, and automation agency that serves local small businesses (plumbers, contractors, roofers, HVAC, real estate agents, barbers, restaurants, auto shops, etc.). The owner (Wahhab) needs to find these businesses, call them, text them, and track everything in one place.

---

## What This App Does (High Level)

A single web app with 4 core modules:

1. **Scraper** — Pulls local business leads from Google Maps by industry + location
2. **Dialer** — Click-to-call power dialer with call logging, powered by Twilio
3. **Messenger** — SMS outreach and follow-up sequences, also powered by Twilio
4. **CRM** — Simple pipeline tracker to move leads through stages

All modules share one unified lead database.

---

## Tech Stack

- **Frontend**: React + Tailwind CSS (or Next.js if SSR is preferred)
- **Backend**: Node.js (Express) or Python (FastAPI)
- **Database**: PostgreSQL (Supabase works great here for speed) or SQLite for local-first
- **Telephony**: Twilio (Voice API for dialer, Messaging API for SMS)
- **Scraping**: Google Maps via SerpAPI, Outscraper API, or a custom Puppeteer/Playwright scraper hitting Google Maps
- **Auth**: Simple single-user auth (this is an internal tool, not multi-tenant)
- **Deployment**: Local-first is fine. Can also deploy to Vercel/Railway later.

---

## Module 1: Google Maps Scraper

### Purpose
Search for local businesses by industry and location, pull their details, and save them as leads.

### User Flow
1. User enters: **Industry** (e.g., "plumber") + **Location** (e.g., "Orlando, FL") + **Radius** (optional, e.g., 25 miles)
2. User clicks "Scrape"
3. App searches Google Maps and returns a list of businesses
4. User reviews results in a table
5. User can "Add All" or select specific businesses to save as leads
6. Saved leads go into the CRM pipeline at the "New Lead" stage

### Data Points to Scrape Per Business
- **Business name**
- **Owner name** (if available from the listing or website)
- **Phone number** (primary)
- **Website URL**
- **Google Maps URL**
- **Address** (full: street, city, state, zip)
- **Google rating** (e.g., 4.2)
- **Number of reviews** (e.g., 47)
- **Business category/type** (e.g., "Plumber", "Roofing Contractor")
- **Hours of operation** (if available)
- **Photos count** (indicator of how active their listing is)
- **Has website: yes/no** (boolean flag)
- **Website quality score** (basic: does it load? is it mobile-friendly? is it modern or outdated?) — this can be a stretch goal

### Scraping Approach Options (pick one or offer both):

**Option A: SerpAPI / Outscraper (Recommended for speed)**
- Use SerpAPI's Google Maps API or Outscraper's Google Maps endpoint
- Pros: Fast, reliable, handles pagination, no proxy headaches
- Cons: Costs money per search (but cheap — ~$0.001-0.005 per result)

**Option B: Custom Scraper (Puppeteer/Playwright)**
- Headless browser hits Google Maps, scrolls through results, extracts data
- Pros: Free, no API dependency
- Cons: Slower, needs proxy rotation, can break if Google changes their DOM

### Deduplication
- Before saving a lead, check if the phone number or business name + city already exists in the database
- If duplicate found, skip or flag it — don't create a new lead

### Saved Searches
- Save the search query (industry + location) so user can re-run it later
- Track which leads came from which search

---

## Module 2: Power Dialer

### Purpose
Call leads one by one with a click-to-call interface. Log call outcomes. Move fast.

### User Flow
1. User opens the Dialer view
2. User sees the next lead to call with their full profile (name, business, phone, website, Google rating, notes)
3. User clicks **"Call"** — Twilio places an outbound call from the user's Twilio number to the lead's phone
4. Call connects through the browser (Twilio Client JS SDK / WebRTC)
5. During the call, user sees a timer and can:
   - Take notes in a text field
   - Click a **call outcome** button: `Interested` / `Callback` / `Not Interested` / `No Answer` / `Wrong Number` / `Voicemail`
6. After call ends (or outcome selected), the lead automatically advances:
   - `Interested` → moves to "Warm Lead" stage in CRM
   - `Callback` → stays in pipeline, gets a scheduled callback reminder
   - `Not Interested` → moves to "Dead" or "Archived"
   - `No Answer` → stays, auto-schedules a retry in 24-48 hours
   - `Voicemail` → optionally drops a pre-recorded voicemail (Twilio supports this)
   - `Wrong Number` → flagged and removed from active pipeline
7. Next lead auto-loads. User keeps dialing.

### Twilio Setup
- **Twilio Account SID + Auth Token** stored in environment variables
- **Twilio Phone Number** purchased (local number preferred, e.g., Orlando area code)
- **Twilio Client JS SDK** for browser-based calling (WebRTC)
- Outbound calls use Twilio's `<Dial>` TwiML or the REST API
- Call duration and recording (optional, with consent) logged per lead

### Dialer Features
- **Auto-advance**: After logging an outcome, the next lead loads automatically
- **Call queue**: User can filter which leads to dial (e.g., "only New Leads in Orlando" or "only plumbers")
- **Skip button**: Skip a lead without calling (stays in queue)
- **Call history**: Every call logged with timestamp, duration, outcome, and notes
- **Daily stats**: Calls made today, connections, interested leads — displayed at the top

### Voicemail Drop (Nice to Have)
- Pre-record a voicemail message
- If user hits "Voicemail", Twilio plays the pre-recorded message after the beep
- Uses Twilio's AMD (Answering Machine Detection) to detect voicemail

---

## Module 3: SMS Messenger

### Purpose
Send texts to leads — both one-off messages and automated follow-up sequences.

### User Flow — Single Message
1. User selects a lead (or is on their profile)
2. User types a message or picks from a template
3. User clicks "Send" — Twilio sends the SMS
4. Message appears in a chat-style thread view for that lead

### User Flow — Bulk Messaging
1. User selects multiple leads (by filter: industry, location, stage, etc.)
2. User picks a template or writes a message
3. User clicks "Send to All" — messages go out with slight delays (to avoid carrier flagging)
4. Each lead gets a personalized version if template has variables (e.g., {{business_name}}, {{first_name}})

### User Flow — Automated Sequences
1. User creates a "Sequence" (e.g., "New Lead Follow-up"):
   - Day 0: "Hey {{first_name}}, I came across {{business_name}} and loved what you're doing..."
   - Day 2: "Just following up — I actually put together a quick mockup of what your website could look like..."
   - Day 5: "Last message from me! If you ever want to chat about getting more customers online, I'm here."
2. When a lead enters a certain CRM stage, they automatically get enrolled in the sequence
3. If the lead replies, the sequence pauses (so you can have a real conversation)
4. If the lead is marked "Not Interested" or "Dead", the sequence stops

### Message Templates
Pre-built templates based on NeverMisleads' pitch:

**Template 1 — Cold Intro:**
"Hey {{first_name}}, I found {{business_name}} on Google and I was impressed with your {{rating}}-star rating. I help local businesses like yours get more customers through a better online presence. Would you be open to a quick chat?"

**Template 2 — Website Hook:**
"Hey {{first_name}} — I actually went ahead and put together a free preview of what a new website could look like for {{business_name}}. No strings attached. Want me to send it over?"

**Template 3 — Follow-up:**
"Hey {{first_name}}, just circling back. I know you're busy running {{business_name}} — if now isn't the right time, no worries at all. Just wanted to make sure you saw my message."

**Template 4 — Social Proof:**
"Hey {{first_name}}, just helped a {{industry}} business in {{city}} revamp their entire online presence — new website, Google optimization, the works. They're already seeing more calls. Happy to show you what we could do for {{business_name}}."

### Twilio SMS Setup
- Use the same Twilio number as the dialer (or a separate one for SMS)
- Register for A2P 10DLC (required for business SMS in the US — Twilio will guide through this)
- Rate limit: Max 1 SMS per second per number, stagger bulk sends
- Handle inbound SMS: When a lead texts back, it shows up in the chat thread and notifies the user

### Opt-Out Handling
- If a lead replies "STOP", automatically flag them as opted-out
- Never send another message to opted-out leads
- This is legally required (TCPA compliance)

---

## Module 4: CRM Pipeline

### Purpose
Track every lead from first scrape to closed deal.

### Pipeline Stages
1. **New Lead** — Just scraped, not contacted yet
2. **Contacted** — Called or texted, awaiting response
3. **Warm Lead** — Showed interest, conversation ongoing
4. **Website Sent** — Sent them the free website preview (the NeverMisleads hook)
5. **Meeting Booked** — Discovery call or Zoom scheduled
6. **Proposal Sent** — Sent pricing / package details
7. **Closed Won** — They signed up!
8. **Closed Lost** — Said no (with reason logged)
9. **Archived** — Wrong number, out of business, not a fit

### Lead Profile View
Each lead has a full profile page showing:
- **Business info**: Name, owner, phone, website, address, Google rating, reviews
- **Pipeline stage**: Current stage with ability to drag/move to another stage
- **Activity timeline**: Every call, text, note, and stage change — chronologically
- **Notes**: Free-form notes field
- **Tags**: Custom tags (e.g., "plumber", "Orlando", "high priority", "has website")
- **Source**: Which scrape search this lead came from
- **Next action**: Scheduled callback, next sequence message, or manual reminder

### CRM Views
- **Kanban board**: Drag-and-drop cards across pipeline stages (like Trello)
- **Table view**: Sortable/filterable spreadsheet-style view of all leads
- **Dashboard**: Key metrics at a glance:
  - Total leads in pipeline
  - Leads by stage (bar chart)
  - Calls made today / this week
  - Texts sent today / this week
  - Conversion rate (leads → closed won)
  - Revenue closed this month

### Filters & Search
- Filter by: stage, industry, location, tags, date added, last contacted, Google rating, has website
- Search by: business name, owner name, phone number

---

## Database Schema (Simplified)

### leads
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| business_name | string | Required |
| owner_name | string | Nullable |
| phone | string | Required, unique constraint with city |
| email | string | Nullable |
| website | string | Nullable |
| google_maps_url | string | Nullable |
| address | string | Full address |
| city | string | |
| state | string | |
| zip | string | |
| google_rating | float | 0-5 |
| review_count | integer | |
| industry | string | e.g., "Plumber" |
| stage | enum | Pipeline stage |
| tags | string[] | Array of custom tags |
| source_search_id | UUID | FK to saved_searches |
| opted_out | boolean | SMS opt-out flag |
| created_at | timestamp | |
| updated_at | timestamp | |

### calls
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| lead_id | UUID | FK to leads |
| outcome | enum | interested/callback/not_interested/no_answer/wrong_number/voicemail |
| duration_seconds | integer | |
| notes | text | |
| recording_url | string | Nullable, Twilio recording URL |
| created_at | timestamp | |

### messages
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| lead_id | UUID | FK to leads |
| direction | enum | inbound/outbound |
| body | text | Message content |
| twilio_sid | string | Twilio message SID |
| status | enum | sent/delivered/failed/received |
| created_at | timestamp | |

### sequences
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| name | string | e.g., "New Lead Follow-up" |
| steps | JSON | Array of {delay_days, template_text} |
| trigger_stage | enum | Which stage auto-enrolls leads |
| active | boolean | |

### sequence_enrollments
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| lead_id | UUID | FK to leads |
| sequence_id | UUID | FK to sequences |
| current_step | integer | Which step they're on |
| status | enum | active/paused/completed/cancelled |
| next_send_at | timestamp | When the next message fires |

### saved_searches
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| industry | string | |
| location | string | |
| radius | string | |
| result_count | integer | How many results returned |
| created_at | timestamp | |

### activity_log
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| lead_id | UUID | FK to leads |
| type | enum | call/sms/note/stage_change/sequence |
| description | text | Human-readable description |
| created_at | timestamp | |

---

## Environment Variables Needed

```
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
SERPAPI_KEY=your_serpapi_key (if using SerpAPI for scraping)
DATABASE_URL=postgresql://...
```

---

## Build Order (Suggested)

### Phase 1: Scraper + Basic CRM (Week 1)
- Set up database and lead model
- Build the scraper UI (industry + location input → results table)
- Connect to SerpAPI or build Puppeteer scraper
- Save leads to database
- Build basic CRM table view with stage management
- Kanban board view

### Phase 2: Dialer (Week 2)
- Integrate Twilio Voice (browser-based calling via Twilio Client JS)
- Build the dialer UI (lead card + call button + outcome buttons)
- Call logging (outcome, duration, notes)
- Auto-advance to next lead
- Daily stats dashboard

### Phase 3: SMS Messenger (Week 3)
- Integrate Twilio Messaging API
- Build chat thread UI per lead
- Message templates with variable substitution
- Bulk send functionality
- Inbound SMS webhook (Twilio → app)
- Opt-out handling

### Phase 4: Sequences + Polish (Week 4)
- Sequence builder UI
- Auto-enrollment triggers
- Scheduled message sending (cron job or queue)
- Pause on reply logic
- Dashboard with full metrics
- Lead profile activity timeline

---

## Key Business Context for AI Models

NeverMisleads' value proposition: "We build your website before we even meet." The agency finds local businesses that need a better online presence, builds a free preview website using their existing brand assets (from Google, Instagram, Facebook), and uses that as the hook to get on a call. Pricing is $149/mo (Starter), $249/mo (Growth), $399/mo (Pro).

**The ideal lead looks like:**
- Local service business (plumber, contractor, HVAC, roofer, barber, restaurant, auto shop, real estate agent, chiropractor, dentist, lawyer)
- 1-50 employees
- Has a Google Business Profile
- Low-to-medium review count (under 100 reviews = room to grow)
- No website OR an outdated website
- Located anywhere in the US (business is remote)

**What makes a lead NOT a fit:**
- Large corporations or franchises (they have agencies already)
- Ecommerce/product companies (not local service)
- Consultants, coaches, or B2B SaaS (different market)
- Already has a polished online presence (modern website, 500+ reviews, active social media)

---

## UI/UX Notes

- Keep it clean and fast. This is a tool for speed-dialing 50+ leads per day.
- Dark mode preferred (easier on the eyes during long calling sessions)
- Minimal clicks to get from one lead to the next
- The dialer should feel like a "flow state" tool — call, log, next, call, log, next
- Mobile-responsive is nice but desktop-first (this is a desk workflow)
- Keyboard shortcuts for power users:
  - `Space` = Call / Hang up
  - `1-6` = Outcome buttons (1=Interested, 2=Callback, 3=Not Interested, 4=No Answer, 5=Wrong Number, 6=Voicemail)
  - `N` = Next lead (skip)
  - `Tab` = Jump to notes field

---

## That's It. Build This.

Start with Phase 1 (Scraper + CRM). Get the Google Maps scraping working first — that's the foundation. Everything else plugs into the lead database.

---

## Related

- [[NeverMisleads]]
- [[Dialer-Webhook-Map]]
- [[NeverMisleads-Website-Spec]]
