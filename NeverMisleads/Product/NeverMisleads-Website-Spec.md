---
title: NeverMisleads Website Spec
type: spec
project: NeverMisleads
created: 2026-03-09
source: DBLU HQ/NeverMisleads/Website/NeverMisleads-Website-Spec.md
---

# NeverMisleads Website Spec
## For Antigravity — Build Reference Document

---

## Overview

A single-page marketing website for NeverMisleads, a branding/marketing/automation agency for local service businesses. The site needs to look like it was built by someone who builds incredible websites for a living — because that's literally the product. This is the portfolio piece AND the sales tool.

**URL:** NeverMisleads.com
**Framework:** Next.js + Tailwind CSS + shadcn/ui
**Animations:** Framer Motion for scroll-triggered reveals, WebGL for hero smoke effect
**Tone:** Premium but approachable. Not corporate stiff. Not startup bro. Professional with edge.

---

## Design Language

### Theme
- **Dark-dominant** — Primary backgrounds: `#0A0A0A` to `#151515`
- Hero section: Full-bleed smoke animation on black canvas
- Remaining sections: Clean dark backgrounds with subtle gradients between sections
- White and light gray text for readability
- Accent color for CTAs and highlights (burgundy `#410000` or gold `#FFB400` — TBD, pending brand kit finalization)

### Typography
- **Display/Headings:** A distinctive serif or display sans — something with personality (consider: Clash Grotesk, Bodoni Moda, or similar from Google Fonts)
- **Body:** Clean, readable sans-serif — not Inter or Arial (consider: Satoshi, General Sans, or similar)
- **Scale:** 16px body / 48-72px hero heading / 32-40px section headings / 18-20px subheadings
- All text should feel intentional and well-spaced. Generous line-height (1.6-1.8 for body).

### Spacing & Layout
- Generous padding between sections (120-160px vertical)
- Max content width: 1200px, centered
- Cards and content blocks: Subtle borders (`rgba(255,255,255,0.08)`) or soft shadows
- No hard edges — use rounded corners (8-12px) on cards and containers

### Animation Strategy
- **Hero:** Interactive WebGL smoke animation (spooky-smoke-animation.tsx with mouse-repel effect)
- **All other sections:** Subtle scroll-triggered fade-ins using Framer Motion
  - Elements fade up with slight Y-translate (20-30px) on scroll into view
  - Staggered delays for grouped elements (cards, list items)
  - Duration: 0.6-0.8s, ease-out
- **Hover states:** Subtle scale (1.02-1.05) and shadow lift on cards
- **NO:** Parallax overload, spinning elements, bouncing text, or anything that feels like a template

### Mobile Responsive
- Fully responsive, mobile-first
- Breakpoints: 480px / 768px / 1024px / 1440px
- Navigation collapses to hamburger on mobile
- Hero text and CTA stack vertically on mobile
- Card grids go single-column on mobile

---

## Section 1: Hero

**Background:** Full-viewport spooky smoke animation (`spooky-smoke-animation.tsx`)
- Smoke color should match brand accent (pass hex via `smokeColor` prop)
- Mouse-repel effect active — smoke parts gently around cursor
- Canvas covers full viewport behind text content

**Content (centered over smoke):**
- **Headline:** "We Build Your Website Before You Pay a Dime."
- **Subheadline:** "Full-service branding, marketing, and automation for local businesses. See your site in 3 days — no commitment, no risk."
- **CTA Button:** "Get Your Free Website" → scrolls to contact section
- **Secondary link:** "See How It Works" → scrolls to Section 2

**Design Notes:**
- Text should have a subtle text-shadow or backdrop for readability over the smoke
- Headline in display font, large and bold
- CTA button: solid fill with accent color, rounded, with hover glow effect
- Scroll indicator at bottom (subtle animated chevron)

---

## Section 2: How It Works

**Layout:** 3-step horizontal flow on desktop, vertical stack on mobile

**Headline:** "Your Website, Built in 3 Days. Here's How."

**Steps:**
1. **"We Talk" (60 seconds)**
   - Icon: Phone or chat bubble
   - Text: "Quick intro call. Tell us about your business. That's it — 60 seconds, no pitch, no pressure."

2. **"We Build" (3 days)**
   - Icon: Code brackets or laptop
   - Text: "We study your brand, your competitors, and your market. Then we build your full website — before you spend a dollar."

3. **"You Decide" (Google Meet)**
   - Icon: Video camera or checkmark
   - Text: "Jump on a quick Google Meet. See your finished site live. Love it? We'll talk next steps. Don't? No hard feelings."

**Design Notes:**
- Steps connected by a subtle horizontal line or arrow flow
- Each step is a card with icon, number, title, and description
- Numbers styled as large, semi-transparent accent-colored text behind the card
- Staggered fade-in on scroll (step 1, then 2, then 3 with 150ms delays)

---

## Section 3: Services & Pricing

**Headline:** "Everything Your Business Needs to Look Professional and Run Smoother."

**Layout:** 3 pricing cards side by side (desktop), stacked (mobile)

### Card 1: Starter — $149/mo
- Professional website
- On-page SEO optimization
- Mobile responsive design
- SSL certificate included
- CTA: "Get Started"

### Card 2: Growth — $249/mo (Highlighted/Recommended)
- Everything in Starter, plus:
- Custom-designed website
- Local search visibility (Google Maps, directories)
- Google Business Profile setup & optimization
- Monthly performance reporting
- CTA: "Most Popular — Get Started"

### Card 3: Pro — $399/mo
- Everything in Growth, plus:
- Weekly strategy check-ins
- Priority support & faster turnaround
- Advanced SEO & content strategy
- Dedicated account management
- CTA: "Go Pro"

### Below the pricing cards — Add-Ons strip:

| Add-On | Price | Description |
|---|---|---|
| AI Receptionist | +$99–149/mo | Never miss a call. AI answers 24/7, books appointments, captures leads. |
| Business Automation | +$99–149/mo | Automated follow-ups, reminders, review requests, lead routing. |
| Social Media Management | +$199/mo | Consistent content without lifting a finger. |

**Design Notes:**
- Middle card (Growth) should be visually elevated — slightly larger, accent border, or "Most Popular" badge
- "No setup fees" callout prominently displayed above the cards
- Pricing cards have a subtle glass-morphism or frosted glass effect on dark background
- Add-ons section is a clean horizontal strip below with icon + text for each

---

## Section 4: Portfolio / Before & After

**Headline:** "Real Businesses. Real Results."

**Layout:** 2-3 portfolio pieces in a masonry or alternating layout

**For each project:**
- Business name and industry
- Before screenshot or description ("No website" / "Outdated Wix site")
- After screenshot (the NeverMisleads-built site)
- Key result or quote from the client

**Design Notes:**
- If portfolio pieces aren't ready yet, use a placeholder design:
  - "Portfolio Coming Soon" with a subtle animation
  - Or mock up 2-3 example sites using screenshots of work already done (barber shop, construction agency)
- Before/after slider component would be a nice touch (drag to reveal)
- Each piece gets a card with image, overlay text, and hover reveal for details

---

## Section 5: Why NeverMisleads

**Headline:** "Why Business Owners Choose Us Over Every Other Agency."

**Layout:** 2-column grid of differentiators

**Points:**
1. **"We Build Before You Buy"**
   "No other agency builds your website before you commit. We put our work where our mouth is."

2. **"Not Just a Website — A System"**
   "Your site is the foundation. We layer on automation, visibility, and AI tools that actually grow your business."

3. **"One Person. Full Attention."**
   "You're not ticket #347 at some agency. You work directly with the founder — every call, every update, every decision."

4. **"Built for Trades & Service Businesses"**
   "We don't do tech startups or e-commerce. We specialize in making local service businesses look world-class online."

**Design Notes:**
- Each point is a compact card with an icon/emoji, bold title, and 1-2 sentence description
- Grid: 2x2 on desktop, stacked on mobile
- Subtle accent-colored left border on each card, or accent icon color
- Fade-in staggered on scroll

---

## Section 6: Testimonials / Social Proof

**Headline:** "Don't Take Our Word For It."

**Layout:** Carousel or 2-3 static testimonial cards

**Content:** Actual client testimonials when available. Placeholder structure:

> "Quote from the client about their experience."
> — Client Name, Business Name

**Design Notes:**
- Quote marks styled as large decorative accent-colored typography
- Client name and business underneath
- Star rating (if applicable)
- If testimonials aren't ready, this section can be hidden or replaced with a trust strip:
  - "Trusted by service businesses across Orlando"
  - Logos or industry icons (plumbing, HVAC, construction, barber)

---

## Section 7: CTA / Contact

**Headline:** "Ready to See What Your Business Could Look Like?"
**Subheadline:** "It takes 60 seconds. We'll have your website ready in 3 days."

**CTA Options:**
- **Primary:** "Book Your Free Website Call" → Links to Calendly or booking system
- **Secondary:** Phone number + email displayed cleanly

**Contact Form (simple):**
- Business Name (required)
- Your Name (required)
- Phone or Email (required)
- Industry / What do you do? (optional)
- Submit button: "Let's Build Something"

**Design Notes:**
- This section should have a slightly different background treatment — maybe a subtle gradient shift or the accent color bleeding through at low opacity
- Form fields: clean, dark-themed, with subtle border glow on focus
- After submit: success message, no page redirect
- The CTA headline should be punchy and urgent without being salesy

---

## Navigation

**Fixed top nav, transparent over hero, solid dark on scroll**

- Logo (left): "NeverMisleads" wordmark (text-based until logo is finalized)
- Nav links (right): How It Works | Services | Portfolio | Contact
- CTA button (far right): "Get Your Free Website"
- Mobile: Hamburger menu with slide-in drawer

**Design Notes:**
- Nav transitions from transparent to solid `#0A0A0A` with backdrop-blur on scroll
- Smooth scroll to sections on click
- Active section highlighted in nav as user scrolls

---

## Footer

- Logo / wordmark
- Quick links: Home, Services, Portfolio, Contact
- Social links: Instagram, LinkedIn (if applicable)
- Copyright: "2026 NeverMisleads. All rights reserved."
- Built by DBLU (subtle credit)

---

## Component References

### From 21st.dev (already have):
- **Spooky Smoke Animation** — `components/ui/spooky-smoke-animation.tsx`
  - Modified with mouse-repel effect
  - Props: `smokeColor` (hex string, default `#808080`)
  - Use as hero background, full viewport

### Recommended shadcn/ui components:
- Button (CTA buttons throughout)
- Card (pricing cards, portfolio, differentiators)
- Input + Textarea (contact form)
- Sheet (mobile nav drawer)
- Badge ("Most Popular" on Growth tier)

### Recommended animations (Framer Motion):
- `fadeInUp` — default scroll-triggered entrance for all sections
- `staggerChildren` — for card groups and list items
- `whileHover` — subtle scale and shadow on interactive cards
- `useScroll` + `useTransform` — for nav background opacity transition

---

## Content Tone Guide

- **Confident, not cocky.** We know we're good. We don't need to brag about it — the 3-day guarantee speaks for itself.
- **Direct, not salesy.** No "revolutionary" or "cutting-edge" or "synergy." Talk like a real person.
- **Empathetic to the audience.** These are busy tradespeople. They don't want jargon. They want their phone to ring and their business to look good online.
- **Short sentences. Punchy copy.** Every word earns its place.

---

## Technical Notes

- **Performance:** Smoke animation is WebGL — canvas should lazy-load or only render when in viewport on mobile to preserve battery
- **SEO:** Proper meta tags, Open Graph tags, structured data for local business
- **Analytics:** Google Analytics 4 + Google Tag Manager ready
- **Hosting:** Vercel (Next.js native) or similar edge-deployed
- **Domain:** NeverMisleads.com

---

## Brand Assets Still Needed (Before Final Build)

- [ ] Logo design (wordmark at minimum)
- [ ] Final brand colors confirmed (accent color: burgundy vs gold vs other)
- [ ] Font pairing finalized
- [ ] Portfolio screenshots (barber shop + construction agency sites)
- [ ] Client testimonials (at least 2)
- [ ] Headshot or team photo for About section (optional)
- [ ] Calendly/booking link for CTA

---

*This spec is the build reference for Antigravity. All content, structure, and design direction is here. Build it section by section, hero first.*

*Last updated: March 9, 2026*

---

## Related

- [[NeverMisleads]]
- [[NeverMisleads-Website-Pages-Spec]]
