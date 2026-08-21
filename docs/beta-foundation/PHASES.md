# Beta Foundation phases

## Status

- **Current:** no active phase; Phase 2 is closed
- **Completed:** Phase 1 — Web Deployment Foundation and Phase 2 —
  Authentication + Persistent Progress (both independently verified and
  accepted 2026-08-21)
- **Next:** Phase 3 — Analytics + Beta Onboarding, in a fresh CONTROL chat
- **Blocking findings:** none currently recorded
- **Useful later:** the production build warns that its single JavaScript chunk
  exceeds 500 kB (about 899 kB minified / 249 kB gzip after Phase 2). Measure
  real beta load performance before adding code splitting; it is not a Phase 2
  blocker. Supabase's default mailer is limited to two messages per hour; add
  production SMTP before broader beta use if that limit is unsuitable.

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

Accepted 2026-08-21 after independent verification of 67 unit tests, 24 browser
tests, production build/deployment, callback failure handling, secret hygiene,
remote migration history, forced RLS, minimal authenticated grants, and
bidirectional cross-user isolation. Live Google and email magic-link flows both
returned to the local and production Pages subpaths; a complete learner snapshot
containing correct, incorrect, skipped, review-queue, and mock-result state was
restored from the production origin. Sign-out remained signed out after reload.

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

## Draft Phase 3 CONTROL handoff

Use only after Phase 2 is verified and closed:

> Start a fresh CONTROL for Beta Foundation Phase 3. Read `AGENT.md` and all
> `docs/beta-foundation/` canonical docs, inspect the current authenticated
> application and reviewed semantic event set before designing instrumentation,
> then run one Builder and one independent Verifier. Add PostHog identity,
> non-duplicative semantic events, conservatively masked session replay, and the
> optional three-question beta onboarding. Keep Supabase as the learner-state
> source of truth. Do not begin Phase 4.
