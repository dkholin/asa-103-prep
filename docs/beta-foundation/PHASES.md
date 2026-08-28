# Beta Foundation phases

## Status

- **Current:** no active phase; Phase 3 is closed
- **Completed:** Phase 1 — Web Deployment Foundation, Phase 2 — Authentication +
  Persistent Progress, and Phase 3 — Analytics + Beta Onboarding (all
  independently verified and accepted 2026-08-21)
- **Next:** Phase 4 — Soft Beta Readiness, in a fresh CONTROL chat
- **Blocking findings:** none currently recorded
- **Useful later:**
  - The production build warns that its single JavaScript chunk exceeds 500 kB
    (about 1,169 kB minified / 338 kB gzip after Phase 3; `posthog-js` accounts
    for the Phase 3 growth). Measure real beta load performance before adding
    code splitting. It has not blocked any phase so far.
  - Supabase's default mailer is limited to two messages per hour. Phase 3
    worked around this with admin-generated links rather than adding SMTP; add
    production SMTP before broader beta use if the limit becomes unsuitable.
  - If `getUser()` **hangs** — neither resolving nor rejecting — no
    `beta_opened` is emitted, so an entry is unobservable. Error paths are
    handled; only the hang path is not.
  - The same hang class applies to `loadProgress` and `loadOnboarding`: the app
    waits indefinitely on "Loading your progress…". This is a Phase 2-class
    exposure that Phase 3 inherited rather than introduced, and one shared
    timeout would close both items.
  - Google OAuth sign-in and the brand-new-account `signup_completed` path have
    no live coverage; both were verified through the test double and unit tests
    only. Confirm them with a real new Google account during Phase 4.

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

Accepted 2026-08-21 after independent verification of 91 unit tests, 48 browser
tests, production build, live PostHog ingestion, and live Supabase state. Twelve
of the thirteen reviewed events ship; `feedback_submitted` is deliberately not
instrumented because the app has no feedback surface. Autocapture and pageview
capture are off: the taxonomy is semantic, not click-level.

Verified live against the real project: anonymous entry observed on anonymous
distinct ids only; `distinct_id` equal to the Supabase user UUID after sign-in
and a fresh anonymous id after sign-out; onboarding saved with a skipped
question stored as `NULL`; every practice, answer, skip, review, mock, and
completion event firing exactly once with correct properties; abandoned sessions
emitting no completion; a reload adding only `beta_opened`; and a real
magic-link callback leaking no `access_token`, `refresh_token`, `code`, JWT, or
email address, with every URL property reduced to origin and pathname. A session
recording keyed to the learner UUID masks both the typed email and the email
rendered in the signed-in header. `learner_onboarding` matches `learner_progress`
byte-for-byte on grants and forced RLS, and cross-user isolation was proven with
a working positive control.

Two defects were found and fixed during the phase, both of which had passed
their own tests: the production client transmitted nothing under an automated
browser fingerprint, and disabling PostHog's flags request to close a URL leak
silently disabled session replay. The URL is now cleaned at the source before
the client is constructed, so replay and privacy hold together. See the
analytics traps in `TESTING.md` — checks that pass while proving nothing were
the dominant failure mode of this phase.

## Phase 4 — Soft Beta Readiness

Validate the complete production flow: authentication, persistent progress,
analytics/replay privacy, onboarding, study/review/mock flows, and sufficient
mobile/desktop usability. Fix only real beta blockers, record non-blocking
issues, and leave a short procedure for inviting and observing the first cohort.

## Draft Phase 4 CONTROL handoff

Use in a fresh CONTROL chat now that Phase 3 is verified and closed:

> Start a fresh CONTROL for Beta Foundation Phase 4 — Soft Beta Readiness. Read
> `AGENT.md` and every `docs/beta-foundation/` doc first, including
> `PHASE2_SETUP.md` and `PHASE3_SETUP.md`. Treat the Phase 3 commit as the
> accepted production baseline and do not reopen Phases 1–3 without a genuine
> blocker. Run one Builder and one independent Verifier.
>
> Phase 4 is a validation phase, not a feature phase. Exercise the complete
> production flow at `https://dkholin.github.io/asa-103-prep/` on real mobile
> and desktop browsers: Google and magic-link sign-in, progress persistence
> across devices, onboarding, practice, review, mock exams, sign-out, and the
> analytics and replay privacy posture. Close the live gaps `PHASES.md` records
> as useful later — Google OAuth sign-in and the brand-new-account
> `signup_completed` path have never been exercised with a real new account.
>
> Fix only genuine beta blockers. Record everything else as useful later rather
> than expanding scope. Then leave a short, concrete procedure for inviting the
> first roughly three learners and observing them: which PostHog views to read,
> what the activation hypothesis of ten completed questions looks like when it
> is met, and what would count as evidence to grow the cohort or to stop.
>
> Do not add payments, pricing, feature gating, invitation administration,
> marketing automation, a custom dashboard, or a fourth study surface. Consider
> the two hang-path items and code splitting only if real beta evidence makes
> them concrete. Do not begin any phase beyond Phase 4.

## Separate curriculum checkpoint — Seamanship Step 1 (local only)

This content packet does not start Beta Foundation Phase 4. On local branch
`seamanship/step-1`, four Seamanship lesson skeletons and four new concepts map
nine questions (`2/4/2/1`). One Advisory-authorized windward-shroud response
correction changes the question-content digest. Hands-On's finished release
at `803cda94d93d109b38422c88aee3029954cc7bda` remains unchanged.

CONTROL checks passed: clean dependency install, 176 unit/content tests,
production build, 80 full browser tests, five rejected mutations, exact mapping
and digest audits, and whitespace check. Independent Verifier returned **PASS**, with no blockers, before the local
commit. See `docs/seamanship-step-1.md` for the evidence,
full old/new question wording and source reconciliation.

Seamanship is locally `published` only to exercise the existing catalogue.
Do not merge or deploy these skeletons. Stop for Advisory before Step 2;
visual corrections remain deferred to Step 3.
