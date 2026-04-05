---
title: "CreativeSpaces — 12-Month Revenue Model"
type: financial-model
project: CreativeSpaces
created: 2026-04-02
source: "migrated from Creative Spaces/Business/CreativeSpaces-Revenue-Model.xlsx (2 sheets: Assumptions + 12-Month Projection)"
---

# CreativeSpaces — 12-Month Revenue Model

> Financial projection model for CreativeSpaces. Two-sheet workbook covering editable assumptions and a full 12-month revenue projection with scenario analysis.

---

## Key Assumptions (Base Case)

### Platform Fees
- **Service Fee Rate:** 10% (charged on top of booking total; artist pays)

### Studio Metrics
- Average studio hourly rate: $150 (weighted across rooms, $85–$200 range)
- Average session duration: 3 hours
- **Average studio booking value: $450**

### Engineer Add-On
- Engineer hourly rate: $75
- Engineer bundle rate: 20% of bookings include an engineer add-on
- Average engineer add-on value: $225

### Blended Average Booking
- **Average booking value (blended): $495**
- **Average platform revenue per booking: $49.50**

### Growth Assumptions
- Studios at launch: 25 (pre-seeded supply)
- Monthly studio growth rate: 15%
- Bookings per studio per month (M1): 4 (~1/week, conservative)
- Monthly booking growth per studio: 10%

### Infrastructure Costs
- Stripe processing: 2.9% + $0.30 per transaction
- Monthly hosting/infra: $75 (Hostinger VPS + free-tier services)
- Monthly infra growth: 5% (scales modestly with usage)

### Marketing Costs
- Monthly base marketing budget: $500 (social tools, email, content, freelancers)
- Cost per acquired booking (paid ads): $25 (Instagram/TikTok targeting artists)
- Paid channel share at launch: 30% of bookings, declining 2% per month as organic grows

---

## 12-Month Projection Summary

### Supply Growth

| Metric | M1 | M3 | M6 | M9 | M12 |
|---|---|---|---|---|---|
| Active Studios | 25 | 33 | 51 | 78 | 120 |

### Demand Growth

| Metric | M1 | M3 | M6 | M9 | M12 |
|---|---|---|---|---|---|
| Bookings/Studio/Month | 4.0 | 4.8 | 6.4 | 8.5 | 11.3 |
| Total Monthly Bookings | 100 | 158 | 326 | 663 | 1,356 |

### Revenue

| Metric | M1 | M3 | M6 | M9 | M12 | TOTAL |
|---|---|---|---|---|---|---|
| Gross Booking Volume (GMV) | $49,500 | $78,300 | $161,325 | $328,275 | $671,175 | **$2,990,475** |
| Platform Revenue (10% fee) | $4,950 | $7,830 | $16,133 | $32,828 | $67,118 | **$299,048** |

### Costs

| Metric | M1 | M3 | M6 | M9 | M12 | TOTAL |
|---|---|---|---|---|---|---|
| Infrastructure Costs | $1,541 | $2,401 | $4,872 | $9,830 | $20,000 | $89,734 |
| Marketing Spend | $1,250 | $1,525 | $2,125 | $2,825 | $3,200 | $27,100 |
| **Total Costs** | **$2,791** | **$3,926** | **$6,997** | **$12,655** | **$23,200** | **$116,834** |

### Net Contribution

| Metric | M1 | M3 | M6 | M9 | M12 | TOTAL |
|---|---|---|---|---|---|---|
| Net Revenue | $2,160 | $3,904 | $9,135 | $20,173 | $43,918 | **$182,213** |
| Net Margin % | 43.6% | 49.9% | 56.6% | 61.5% | 65.4% | — |
| Marketing as % of Revenue | 25.3% | 19.5% | 13.2% | 8.6% | 4.8% | — |

### Cumulative Totals (End of Year 1)

- **Cumulative GMV:** $2,990,475
- **Cumulative Platform Revenue:** $299,048
- **Cumulative Net Revenue:** $182,213
- **Total Bookings:** 6,041
- **Blended CAC:** $4.49 per booking (declining from $12.50 in M1)

---

## Scenario Analysis

The workbook supports three scenarios by adjusting the blue (editable) cells on the Assumptions sheet:

- **Conservative:** 15 studios, 3 bookings/mo, $250 marketing → lower revenue, slower growth
- **Base Case:** 25 studios, 4 bookings/mo, $500 marketing → shown above
- **Optimistic:** 40 studios, 6 bookings/mo, $1K marketing → faster acquisition, higher spend

To model a zero-marketing scenario: set Base Marketing Budget and CPA to $0.

---

## Key Milestones

- **M6:** ~326 monthly bookings, $161K GMV, 51 active studios
- **M9:** ~663 monthly bookings, $328K GMV — approaching AWS migration trigger (1,000 bookings or $100K GMV)
- **M12:** 1,356 monthly bookings, $671K GMV, 120 active studios — well past scaling trigger

---

## Related Files

- [[CreativeSpaces-PRD]] — Product Requirements Document v1.0
- [[CreativeSpaces-Equity-Agreement]] — Founders equity agreement

Back to [[CreativeSpaces]]
