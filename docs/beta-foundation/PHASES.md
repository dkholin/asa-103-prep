# Beta Foundation phases

## Status

- **Current:** no active phase; Phase 1 is closed
- **Completed:** Phase 1 — Web Deployment Foundation (independently verified
  and accepted 2026-08-21)
- **Next:** Phase 2 — Authentication + Persistent Progress, in a fresh CONTROL
  chat
- **Blocking findings:** none currently recorded
- **Useful later:** the production build warns that its single JavaScript chunk
  exceeds 500 kB (about 668 kB minified / 188 kB gzip). Measure real beta load
  performance before adding code splitting; it is not a Phase 1 blocker.

## Phase 1 — Web Deployment Foundation

Keep the learning product and local `localStorage` behavior intact while making
the React/Vite production build and GitHub Pages deployment repeatable. Verify a
clean install, development server, automated tests, production build/preview,
core study flows, base URL and reload behavior, static assets, secret hygiene,
and the live hosted site. Do not add authentication, cloud state, analytics, or
onboarding.

Accepted 2026-08-21 after independent verification of clean install,
development and production serving, 55 unit/content tests, 15 browser tests,
base-path reload and asset delivery, local persistence, secret hygiene, and the
live GitHub Pages deployment. No blocker or material finding remained.

## Phase 2 — Authentication + Persistent Progress

Add Supabase Google login with email magic-link fallback and replace local-only
progress with the minimum cloud schema that preserves actual study behavior.
Enable RLS and independently prove user isolation. A learner must be able to
study, leave, sign in later on another browser/device, and recover correct
progress. No production-user migration or local/cloud conflict system is needed.

## Phase 3 — Analytics + Beta Onboarding

Add PostHog identity, a reviewed non-duplicative semantic event taxonomy,
conservatively masked session replay, and the optional three-question onboarding
(ASA 103 timing, current status, sailing experience). Prove the visit-to-study
journey is observable without leaking authentication material or unnecessary
personal data. Use PostHog views rather than a custom dashboard.

## Phase 4 — Soft Beta Readiness

Validate the complete production flow: authentication, persistent progress,
analytics/replay privacy, onboarding, study/review/mock flows, and sufficient
mobile/desktop usability. Fix only real beta blockers, record non-blocking
issues, and leave a short procedure for inviting and observing the first cohort.

## Draft Phase 2 CONTROL handoff

Use only after Phase 1 is verified and closed:

> Start a fresh CONTROL for Beta Foundation Phase 2. Read `AGENT.md` and all
> `docs/beta-foundation/` canonical docs, inspect the current progress model and
> storage behavior before designing schema, then run one Builder and one
> independent Verifier. Implement Supabase Google auth plus email magic links,
> minimal cloud-backed learner state, RLS, and live cross-user/cross-device
> verification. Do not begin analytics, onboarding, or Phase 3.
