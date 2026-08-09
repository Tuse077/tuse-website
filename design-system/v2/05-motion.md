# Phase Five — Motion Language

**Motion communicates confidence. Never entertainment.**

The test for every animation: *remove it — is anything harder to understand?* If nothing is lost, it was decoration. Delete it.

## The three jobs

1. **Continuity** — show where something came from and where it went.
2. **Feedback** — confirm an input registered.
3. **Status** — show that something is genuinely live.

Nothing else is a reason to animate.

## Scale

| Token | Duration | Use |
|---|---|---|
| `instant` | 80ms | Colour on press |
| `fast` | 180ms | Button feedback |
| `quick` | 200ms | Exits, dismissals |
| **`normal`** | **250ms** | **Default — hover, colour, border** |
| `settle` | 300ms | Modals, toasts, step changes |
| `moderate` | 350ms | Nav state, disclosure |
| `slow` | 500ms | Sheets, map pans, balances |
| `very-slow` | 900ms | Entrance choreography, route draw |

**Things arrive gently and leave briskly.** Entrances use `decelerate`; exits use `accelerate`. A slow exit makes the interface feel reluctant.

## Curves

| Curve | Value | Use |
|---|---|---|
| **standard** | `.22,.61,.36,1` | Everything, unless stated |
| accelerate | `.4,0,1,1` | Exits |
| decelerate | `0,0,.2,1` | Entrances |
| emphasized | `.2,0,0,1` | A single hero moment per screen, at most |
| **spring** | `.34,1.4,.5,1` | **Confirmation only** — see below |
| linear | — | Progress, marquee, spinners only |

### The spring budget

`--ease-spring` overshoots. Overshoot reads as *delight*, and delight is only appropriate when something genuinely good has happened to the user's money or time.

**Permitted:** booking confirmed · payment released · verification approved · withdrawal completed.
**Forbidden:** navigation · hover · loading · errors · anything on a dispute screen.

One spring per user journey. If two things spring in the same session, one of them is decoration.

---

## Catalogue

**Page transitions.** Forward slides left at `settle`, back slides right — direction encodes history. Cross-fade only between peer tabs, where there is no hierarchy to express. Never a full-page fade-to-white; it reads as a reload.

**Navigation.** Nav bar solidifies at `moderate`. Tab indicator **slides** — never fades. Bottom nav icon fills at `fast`. Mobile menu slides down at `slow` with items staggered `--stagger-tight`, capped at six.

**Buttons.** Hover: `translateY(-2px)` at `fast`. Press: `scale(.97)` at `instant` — this is the most important animation in the product, because it is the only proof a tap registered. Never remove it on touch. Loading: label swaps to spinner, **width locks**.

**Cards.** Rest flat. Hover `translateY(-4px)` + `--shadow-level2` at `moderate`, image `scale(1.05)` at `very-slow` — the slow image drift is what makes the hover feel expensive rather than twitchy. Entrance: fade + 14px rise at `--duration-very-slow`, staggered, **once per session**.

**Expansion / collapse.** Height at `moderate` with `standard`. Chevron rotates in the same duration. Collapse is 50ms faster than expand — closing should feel decisive.

**Bottom sheets.** Slide from bottom at `slow`. Drag tracks the finger 1:1 with no easing — easing during a drag feels broken. Release: settle or dismiss at `settle`. Scrim fades in parallel.

**Loading.** < 300ms nothing. Skeletons shimmer at 1.4s linear. Spinners only where there is no layout to skeleton. **Never a spinner over content that is already visible.**

**Progress.** Determinate fills at `slow` with `standard`. Never animate backwards — recalculate and jump, because a reversing progress bar destroys confidence in the estimate.

**Map.** Pans at `slow` / `decelerate`. Marker interpolates between GPS points and never jumps. Route draws once at `very-slow`. **Never auto-recentre while the user is panning.**

**Tracking.** Live dot pulses at 2s — the only permanently looping animation in the product. It means "this is current"; using it anywhere else devalues it.

**Success.** Checkmark draws at `settle`. Balance counts up at `slow`. Both permitted a spring. Never animate a *decreasing* balance — it reads as loss.

**Errors.** No shake. No bounce. Error states appear at `quick` with no easing flourish. **An interface that jokes about a failure is an interface that does not take the user's problem seriously.**

**Gestures.** Swipe-to-dismiss tracks 1:1, dismisses past 40% or on velocity. Pull-to-refresh resists past the threshold. Long-press confirms at 500ms with haptic, never with a visual timer.

---

## Reduced motion

Under `prefers-reduced-motion: reduce`, all durations collapse to `0.001ms` and looping animations stop.

**The rule that matters:** meaning must never live in motion alone. If the tab indicator is the only thing telling you which tab is active, reduced-motion users lose it. Every animated state change has a static equivalent — position, weight, colour *plus* a second signal, or text.

The live pulse becomes a static dot. The skeleton becomes a flat block. The tracking marker still moves — position is data, not decoration — but stops interpolating.
