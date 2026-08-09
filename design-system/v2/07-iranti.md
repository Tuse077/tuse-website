# Phase Seven — iRanti Product Language

iRanti is the intelligence layer, not another dashboard. Its visual language is the Tușe language at **lower saturation and higher density** — no new palette, no new typefaces, no "AI" chrome.

**Its job is to make someone confident enough to act.** Every element is judged against that.

---

## The four laws

**1. Confidence is always visible.** No prediction, estimate or recommendation appears without a stated confidence and the evidence behind it. An unqualified number reads as fact, and when it is wrong it takes the rest of the product's credibility with it.

**2. Every insight ends in an action.** An insight the user cannot act on is a distraction. If there is no action, it belongs in a report, not in iRanti.

**3. Charts support decisions.** No chart exists to fill space. Every one answers a stated question, and the question is written above it in plain words.

**4. The AI never speaks in the first person.** No "I think", no assistant persona, no avatar. iRanti presents evidence; the human decides. A system that performs personality invites trust it has not earned.

---

## Visual treatment

| Element | Treatment |
|---|---|
| Ground | `--color-surface`, more whitespace than the operational products |
| iRanti mark | A single hairline glyph, `--icon-stroke-hairline`, `--text-muted`. Never coloured, never animated |
| Insight text | `--font-body`, `--size-body-sm` — sans, because it is operational, not editorial |
| Numbers | `--font-display`, `tabular-nums` — same as money elsewhere |
| Accent | `--color-primary` used **once per view**, on the recommended action only |
| Charts | `--color-info` for data, `--color-primary` for the highlighted point only |

**No gradients. No glow. No purple.** The generic "AI product" look is exactly the thing that makes an intelligence layer feel like a toy.

---

## Confidence

Three levels. Always shown as a **word plus a basis**, never a bare percentage — "87% confident" implies a precision the model does not have.

| Level | Rendering | Meaning |
|---|---|---|
| **High** | Filled bar, `--color-success` | Large sample, stable pattern |
| **Moderate** | Half bar, `--color-warning` | Sufficient sample, some variance |
| **Low** | Outline bar, `--text-muted` | Thin data. Directional only |

Every confidence indicator states its basis on the same line:

> **Moderate confidence** · based on 340 bookings across 6 weeks

**Low confidence must still be shown.** Hiding weak signals means the user never learns which insights to weigh — and silently withholding is a worse failure than admitting uncertainty.

---

## The insight card

One shape for every insight, everywhere.

```
┌────────────────────────────────────────────────┐
│ ◇ MARKETPLACE                    High confidence│  ← type · confidence
│                                                 │
│ Cleaning demand in Gwarinpa is                  │  ← the finding, plain
│ outpacing verified supply by 3.2×               │
│                                                 │
│ 47 unmatched requests in 14 days. Nearest       │  ← the evidence
│ available cleaners average 11km away.           │
│                                                 │
│ [ Prioritise Gwarinpa verification ]  Dismiss   │  ← the action
│                                                 │
│ Based on 612 requests · updated 2h ago          │  ← basis · freshness
└────────────────────────────────────────────────┘
```

**Every field is mandatory.** Finding, evidence, action, basis, freshness. An insight missing its evidence is an assertion; missing its freshness, it is potentially stale advice presented as current.

**Ranked by impact × confidence.** Never by recency. The newest insight is rarely the most important one, and sorting by time trains users to treat the list as a feed rather than a queue.

---

## Insight types

| Type | Answers | Example |
|---|---|---|
| **Observation** | What happened? | Bookings in Wuse rose 22% this week |
| **Trend** | What is changing? | Response times have risen for 3 consecutive weeks |
| **Prediction** | What is likely? | Saturday demand will exceed supply in 4 areas |
| **Recommendation** | What should we do? | Verify 12 more cleaners in Gwarinpa |
| **Alert** | What needs attention now? | 3 disputes have passed their response deadline |

Types are visually distinct by **glyph and label**, not colour alone. Only alerts may use `--color-error`, and only when a stated commitment has actually been missed.

---

## Charts

**Every chart carries its question as a heading.** Not "Bookings" — *"Is demand outgrowing supply in Gwarinpa?"*

Rules:
- Line for time, bar for comparison, area only for cumulative totals.
- **No pie charts.** Humans compare angles badly; a sorted bar is strictly better.
- Y-axis starts at zero for magnitude. If truncated, say so on the axis.
- One emphasised point per chart — the endpoint or the anomaly — in `--color-primary`. Everything else in `--color-info` at reduced opacity.
- Grid lines are hairlines at `--color-border`. They orient; they must not compete.
- **Every chart has a one-sentence plain reading beneath it.** If the sentence cannot be written, the chart is not answering anything.
- Sample size is always stated.

**Accessibility.** Every chart has a data table equivalent reachable by keyboard, and a text summary in the accessible name. Series are distinguished by pattern or direct label, never by colour alone. Charts are not decorative and must never be `aria-hidden`.

---

## Recommendations

A recommendation must state: **what to do · expected effect · confidence · what it is based on · what happens if ignored.**

The action button is the only `--color-primary` element in the view. Dismiss is always available, and **dismissal is feedback** — a dismissed recommendation asks one optional question ("not useful / not now / disagree") and that answer must visibly change what surfaces next. A dismissal that changes nothing teaches the user the controls are fake.

---

## Alerts

Only for a **breached commitment or a live risk**: disputes past deadline, payouts failed, verification backlog beyond SLA, coverage collapse in a live area.

Ordered by severity, then by age. Each names the owner and the deadline. **Alerts must be resolvable from the alert** — routing a user elsewhere to act is how alert lists become wallpaper.

---

## When iRanti is wrong

It will be. The interface must survive it.

- **Predictions are labelled as predictions**, always, in the past tense too. A prediction shown later without that label reads as a false claim.
- **Accuracy is visible.** Show how previous predictions performed. A system that never grades itself cannot be calibrated by its users.
- **Wrong recommendations are correctable** — the feedback control exists, and its effect is visible.
- **Never auto-act on a recommendation.** iRanti proposes. A human disposes. The moment the intelligence layer acts unilaterally, every unrelated part of the product inherits the suspicion.

---

## Copy

| Say | Not |
|---|---|
| Demand is outpacing supply 3.2× in Gwarinpa | We detected an anomaly |
| Based on 612 requests over 14 days | Our AI analysed your data |
| Moderate confidence — 6 weeks of data | 73% confidence score |
| Likely to exceed supply on Saturday | Will exceed supply on Saturday |
| Prioritise Gwarinpa verification | Optimise your marketplace |

**Name the thing. State the evidence. Propose the action.** Nothing in an intelligence product should require the user to trust a tone of voice.
