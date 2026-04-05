---
title: "CreativeSpaces App Prototype — Code Reference"
type: code-reference
project: CreativeSpaces
created: 2026-04-02
source: "Creative Spaces/App/ (index.html, styles.css, app.js, package.json)"
---

# CreativeSpaces App Prototype — Code Reference

> Summary of the CreativeSpaces high-fidelity HTML/CSS/JS prototype. A static front-end mockup demonstrating the core user flows before development begins.

---

## Overview

The App directory contains a mobile-first prototype for the CreativeSpaces booking platform. It is a static site (no backend) designed to validate UX flows and visual design. Run locally with `npx serve .`.

## Tech Stack

- HTML / CSS / JavaScript (vanilla, no framework)
- Inter font (Google Fonts)
- PWA meta tags (apple-mobile-web-app-capable, viewport scaling disabled)
- No build step — served as static files

## Design System

Dark-mode-first design with CSS custom properties (design tokens):
- Background: `#0B0F1A` base → `#131929` surface → `#1A2235` card
- Accent: `#3B7BFF` (blue) + `#7C3FFF` (purple)
- Text: white primary → `#8B9BB4` secondary → `#556580` muted
- Status colors: green `#22C55E`, yellow `#FBBF24`, red `#EF4444`
- Font: Inter with full weight range (300–800)

## Screens & Features

The prototype includes the following screens, navigated via a custom JavaScript router with slide transitions:

1. **Home** — Main landing/discovery screen
2. **Venue** — Studio detail view (photos, amenities, pricing, availability)
3. **Talent** — Engineer/producer browsing
4. **Booking Backdrop** — Booking flow with modal overlay

### Key Interactions
- Screen-to-screen navigation with forward/back slide animations
- Booking modal (bottom sheet pattern) with open/close transitions
- Touch-optimized for mobile viewports

## Files

| File | Purpose |
|---|---|
| `index.html` | All screen markup, PWA meta, font imports, CSS inline + linked |
| `styles.css` | Full design system, component styles, responsive breakpoints |
| `app.js` | Navigation router, modal logic, screen transitions |
| `package.json` | Minimal — name, version, `npx serve .` dev script |

---

## Related Files

- [[CreativeSpaces-PRD]] — Product Requirements Document (references this prototype)
- [[CreativeSpaces-Brand-Exploration]] — Brand color exploration

Back to [[CreativeSpaces]]
