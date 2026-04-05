---
title: AI Receptionist — Product Requirements Document
type: PRD
project: NeverMisleads
created: 2026-04-02
source: "migrated from DBLU HQ/NeverMisleads/AI_Receptionist_PRD.docx"
---

# AI Receptionist — Product Requirements Document

> Technical Specification for Development Team
> Version 1.0 | March 2026 | Prepared by [[Wahhab]]
> Platform: VAPI (primary) | Synthflow (MVP fallback)

---

## 1. Executive Summary

The [[NeverMisleads]] AI Receptionist is a 24/7 voice agent that answers inbound phone calls on behalf of NeverMisleads and its clients. It greets callers, captures lead information, books appointments directly into the calendar, answers common questions, and sends confirmation messages — all without human involvement.

This is both an **internal tool** (NeverMisleads' own business phone line) and a **white-label product** sold to clients as a monthly add-on at $99–149/mo. The technical team builds the infrastructure that powers both use cases.

### 1.1 Primary Platform: VAPI

VAPI (vapi.ai) is the chosen platform for production. It provides: a low-latency conversation engine, full control over the LLM/STT/TTS layers, a REST API and real-time webhooks for integration, function calling (tool use) so the AI can take live actions during a call, and per-minute billing (~$0.05/min) with no seat fees.

### 1.2 MVP Fallback: Synthflow

Synthflow is an optional no-code starting point if the VAPI build is not ready before the first client deployment. Synthflow allows rapid configuration via drag-and-drop, has white-label support, and integrates with Twilio, Calendly, and Zapier. The intent is to launch one or two early clients on Synthflow while the VAPI production system is being built.

> **NOTE:** If Synthflow is used for MVP clients, the onboarding data schema and call flow scripts defined in this document must still be followed, so that migration to VAPI later is seamless.

### 1.3 Scope

This document covers: VAPI system architecture and configuration, Twilio phone number setup and call routing, call flow scripts and conversation decision trees, live tool/function calls during conversations (calendar lookup, lead creation), post-call webhooks and n8n automation integration, white-label client onboarding process, cost model and billing logic, and testing protocol and go-live checklist.

---

## 2. System Architecture

### 2.1 High-Level Flow

1. Caller dials the business phone number (provisioned via Twilio)
2. Twilio receives the call and routes it to VAPI via SIP connection or TwiML webhook
3. VAPI initiates the AI assistant — loads the system prompt, business context, and available tools
4. The AI greets the caller and begins the conversation
5. During the call, the AI can invoke live functions: check calendar availability, create a lead record in Supabase, look up FAQs
6. Call ends — VAPI sends a post-call webhook to n8n containing full transcript, extracted data, and call metadata
7. n8n processes the webhook: stores data in Supabase, sends SMS/email notifications, schedules follow-ups
8. Caller receives an SMS confirmation (if appointment booked) or a missed-call follow-up (if after hours)

### 2.2 Technology Stack

| Component | Technology |
|---|---|
| Voice AI Platform | VAPI (vapi.ai) — conversation engine, function calling, webhooks |
| Phone Numbers | Twilio — number provisioning, SIP routing, inbound call handling |
| LLM (AI Brain) | Claude Sonnet via VAPI (primary) or GPT-4o (fallback) |
| Speech-to-Text | Deepgram Nova-2 — low latency, high accuracy, handles accented English |
| Text-to-Speech | ElevenLabs — warm, professional voice; specific voice ID to be selected |
| Automation Engine | n8n — orchestrates all post-call workflows via VAPI webhooks |
| Database | Supabase (Postgres) — stores all call records, leads, and transcripts |
| Notifications | Twilio SMS (to business owner) + Resend (email confirmations) |
| Calendar | Google Calendar API or Calendly API — real-time availability lookup + booking |
| Hosting | VAPI cloud-hosted (no server management needed for the voice layer) |

### 2.3 Architecture Flow

```
CALLER → [Twilio Phone Number] → [VAPI Assistant]
    ↕ (live function calls during conversation)
    [Google Calendar API] → check availability, book slot
    [Supabase REST API] → create lead record mid-call
    [VAPI Post-Call Webhook] → [n8n]
        → [Supabase] (store transcript + call record)
        → [Twilio SMS] (notify owner + send caller confirmation)
        → [Resend Email] (detailed lead summary to owner)
```

---

## 3. VAPI Assistant Configuration

### 3.1 Assistant Object (Core Config)

Each business (NeverMisleads internal + each client) gets its own VAPI Assistant object:

| Property | Value | Notes |
|---|---|---|
| name | "[Business Name] Receptionist" | e.g. "NeverMisleads Receptionist" |
| model.provider | "anthropic" | Use Claude as the LLM |
| model.model | "claude-sonnet-4-6" | Best balance of quality and speed |
| model.systemPrompt | See Section 4 | Full prompt template below |
| transcriber.provider | "deepgram" | |
| transcriber.model | "nova-2" | Best accuracy for conversational speech |
| transcriber.language | "en-US" | Switch to "es" for Spanish-speaking clients |
| voice.provider | "11labs" | ElevenLabs for voice synthesis |
| voice.voiceId | TBD | See Section 3.2 |
| firstMessage | See Section 4.1 | The greeting the AI says on answer |
| endCallFunctionEnabled | true | Allow AI to end the call gracefully |
| recordingEnabled | true | Store call recordings in VAPI |
| silenceTimeoutSeconds | 30 | End call after 30s of silence |
| maxDurationSeconds | 600 | Hard cap calls at 10 minutes |
| backgroundSound | "office" | Subtle ambient sound reduces robotic feel |

### 3.2 Voice Selection

The voice must sound warm, professional, and human. Recommended ElevenLabs voices for evaluation:

| Voice | Character |
|---|---|
| Rachel | Warm, clear American female. Good default for most service businesses. |
| Adam | Professional American male. Good for contractors and trade businesses. |
| Bella | Friendly, slightly younger female. Good for beauty/barbershops. |
| Josh | Calm, measured male. Good for HVAC/plumbing where trust is key. |
| Custom Clone | Future option: clone Wahhab's or a hired voice actor's voice. |

> **TBD:** Build the system with Rachel as default. Expose a config field to swap voice IDs per client without code changes.

### 3.3 VAPI Tools (Function Calling)

During a call, the AI assistant can invoke real-time functions. The following tools are required:

**Tool 1: check_availability** — Check open appointment slots before offering times to the caller. Calls Google Calendar API (or Calendly API) to get next 5 open slots. Error handling: "Let me take your details and we'll confirm a time by text shortly."

**Tool 2: book_appointment** — Confirm and lock in an appointment slot after the caller selects a time. Creates Google Calendar event with caller details as attendee notes. Post-action: AI confirms verbally and triggers SMS.

**Tool 3: create_lead** — Save the caller's info to Supabase during the call, so no data is lost even if the call drops. Triggered as soon as AI has name and phone number (not waiting for end of call). Fire-and-forget — if Supabase is down, do NOT interrupt the conversation.

**Tool 4: send_sms_confirmation** — Send the caller an SMS with appointment details or follow-up message. POSTs to Twilio Messages API via n8n webhook (keeps Twilio credentials server-side).

**Tool 5: get_business_info** — Look up live business information (hours, services, pricing) rather than relying solely on the system prompt. Reads from Supabase 'business_config' table.

---

## 4. System Prompts & Call Scripts

### 4.1 Master System Prompt Template

Variables in [BRACKETS] are replaced per client during onboarding:

> You are a professional receptionist named [RECEPTIONIST_NAME] working for [BUSINESS_NAME], a [BUSINESS_TYPE] based in [BUSINESS_CITY].
>
> Your job is to answer calls, help callers, book appointments, and capture their information. You are warm, professional, and concise. You never ramble. You speak naturally — not like a robot reading a script.
>
> BUSINESS HOURS: [BUSINESS_HOURS]. If a caller contacts you outside of hours, let them know and offer to take a message or book for the next available time.
>
> SERVICES OFFERED: [SERVICES_LIST]. If asked about a service not on this list, say you'll pass the message to the team to follow up.
>
> PRICING: [PRICING_NOTES]. Never quote exact prices unless they are listed here. If unsure, say the owner will follow up with specific pricing.
>
> RULES: (1) Always get the caller's first name and phone number early in the call. (2) Never make up information. (3) Never discuss competitor businesses. (4) If a caller is rude or abusive, calmly say "I'll let the team know you called" and end the call. (5) Keep responses under 3 sentences wherever possible.
>
> EMERGENCY ESCALATION: If a caller describes an emergency (burst pipe, gas leak, electrical fire), say: "For emergencies, please call 911 first. I'll also alert our team right now so someone can contact you immediately." Then invoke create_lead with urgency: 'EMERGENCY'.

### 4.2 Call Flow 1: New Inquiry (Standard)

Most common call type — someone calling to ask about services or get a quote. AI follows: Greet → Qualify (what service, what's the situation) → Offer to book → Collect info → Create lead → Confirm next steps → End call.

### 4.3 Call Flow 2: Appointment Booking

Caller wants to schedule. AI follows: Greet → Ask what service → Check availability (tool call) → Offer 2-3 slots → Confirm selection → Book (tool call) → Send SMS confirmation (tool call) → End call.

### 4.4 Call Flow 3: After-Hours

Call comes in outside business hours. AI follows: Greet → Acknowledge after-hours → Offer to take message or book for next available → Create lead with "after_hours" tag → Promise callback next business day → End call.

### 4.5 Call Flow 4: Emergency

Caller describes an emergency. AI follows: Immediately tell caller to call 911 → Create lead with EMERGENCY urgency → Inform that team is being notified → End call quickly.

---

## 5. White-Label Client Onboarding

Each new client requires:

1. **Twilio phone number** provisioned in the client's area code
2. **VAPI Assistant** created with client-specific system prompt (business name, hours, services, pricing)
3. **Business config** row in Supabase with all client details
4. **n8n webhook** configured to route that client's post-call data correctly
5. **Voice selection** — default Rachel unless client requests otherwise
6. **Test calls** — minimum 5 test calls covering: booking, FAQ, after-hours, Spanish, edge cases

Estimated onboarding time per client: 1-2 hours once infrastructure is built.

---

## 6. Cost Model

| Component | Cost | Notes |
|---|---|---|
| VAPI | ~$0.05/min | Includes LLM + STT + TTS |
| Twilio phone number | $1.15/mo per number | One per client |
| Twilio SMS | $0.0079/message | Confirmation texts |
| Supabase | Free tier | Up to 500MB, 50K rows |
| n8n | Self-hosted on VPS | Already running |
| ElevenLabs | Included in VAPI pricing | |

At 100 minutes/month per client: ~$5/month VAPI + $1.15 Twilio = **~$6.15/month variable cost per client**.

Client pays $99-149/mo for the add-on → **93-96% gross margin on AI Receptionist**.

---

## Related Files

- [[NeverMisleads-PRD-Revenue-Plan]] — Full business PRD and revenue execution roadmap
- [[NeverMisleads-Website-Spec]] — Website specification
- [[Dialer-Webhook-Map]] — Dialer webhook architecture
- [[n8n-Form-to-Maya-Callback]] — n8n workflow that connects website forms to Maya

Back to [[NeverMisleads]]
