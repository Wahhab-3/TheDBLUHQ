---
title: n8n Workflow — Form to Maya Callback
type: reference
project: NeverMisleads
created: 2026-04-02
source: "migrated from DBLU HQ/NeverMisleads/n8n-workflows/"
---

# n8n Workflow — Form to Maya Callback

> Automation workflow that connects the NeverMisleads website contact form to the Maya AI Receptionist for automated prospect callbacks.

---

## How It Works

1. Prospect fills out contact form on nevermisleads.com
2. Form POSTs to n8n webhook
3. n8n immediately responds (so the website shows success)
4. n8n checks if prospect consented to AI call:
   - **YES** → Triggers VAPI outbound call (Maya calls them) → Logs to Google Sheets → Emails Wahhab
   - **NO** → Logs to Google Sheets with "Manual Follow-up" status → Emails Wahhab to follow up manually

---

## Setup Steps

### Step 1: Import the Workflow
Open n8n → Workflows → Import from File → Select `form-to-maya-callback.json`

### Step 2: Set Up VAPI Credential
In n8n → Credentials → Add Credential → "Header Auth":
- Name: `VAPI API Key`
- Header Name: `Authorization`
- Header Value: `Bearer [API_KEY]`
Then open the "VAPI - Call Prospect" node → select this credential.

### Step 3: Connect Google Account
In n8n → Credentials → "Google Sheets OAuth2" → Follow OAuth flow. Requires Google Cloud project with Sheets API enabled.

### Step 4: Create Google Sheet CRM
Create sheet named **"NeverMisleads CRM"** with these column headers:

| Name | Business Name | Email | Phone | Industry | Social Media | Website URL | Message | AI Call Consent | Source | Submitted At | Status | VAPI Call ID |

Then connect both Google Sheets nodes in the workflow.

### Step 5: Set Up Email (SMTP)
Gmail SMTP: Host `smtp.gmail.com`, Port `465`, SSL/TLS `true`. Use a Gmail **App Password** (not regular password).

### Step 6: Test the Webhook
Activate workflow. Webhook URL: `https://n8n.[host]/webhook/contact-form`

### Step 7: Update Website .env
If webhook URL differs from default: `VITE_N8N_WEBHOOK_URL=https://n8n.[host]/webhook/contact-form`

---

## Credentials Summary

| Service | Credential Type | What You Need |
|---|---|---|
| VAPI | Header Auth | API Key |
| Google Sheets | Google Sheets OAuth2 | Google account + Cloud project |
| Email (SMTP) | SMTP | Gmail + App Password |

---

## Troubleshooting

- **Maya doesn't call:** Check VAPI credential (Header Auth with "Bearer " prefix), phone format (needs country code e.g. +15551234567), n8n execution log
- **CORS errors:** Webhook has CORS configured for nevermisleads.com and localhost:5173
- **Sheets not logging:** Column headers must EXACTLY match field names in the Set node
- **Email not sending:** Use Gmail App Password, not regular password

---

## Related Files

- [[AI-Receptionist-PRD]] — Full AI Receptionist technical spec
- [[NeverMisleads-Website-Spec]] — Website specification
- [[Dialer-Webhook-Map]] — Dialer webhook architecture

Back to [[NeverMisleads]]
