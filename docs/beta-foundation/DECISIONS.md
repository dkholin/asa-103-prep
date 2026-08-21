# Decision log

Append only decisions that a future agent might reasonably reconsider.

## 2026-08-21 — Retain React/Vite and the client-only application shape

Reason: The existing app builds and tests cleanly, uses simple component state,
and has no requirement for server rendering or a custom backend.

Impact: Do not migrate frameworks or add global state/backend infrastructure
without a concrete blocker.

## 2026-08-21 — Keep GitHub Pages as the Phase 1 managed host

Reason: The repository already has a successful GitHub Actions Pages pipeline,
an HTTPS project URL, and base-path-aware assets. The static application needs
no server runtime. Adding Vercel now would duplicate working hosting and account
integration without improving Phase 1 acceptance.

Impact: Production is `https://dkholin.github.io/asa-103-prep/`, builds use the
`/asa-103-prep/` base path, and pushes to `main` deploy after automated checks.
Local production preview is the preview environment; GitHub Pages does not
provide per-pull-request deployments in this project. Reconsider hosting only
if a later concrete requirement is incompatible with Pages.

## 2026-08-21 — Preserve view-state navigation in Phase 1

Reason: The application has one document URL and changes screens through React
state; no feature requires deep-linked study screens. Adding a router would be
product work, not deployment correctness.

Impact: The supported direct/reload URL is the Pages base URL (query strings are
allowed). Nested page paths are not part of the current product contract.

## 2026-08-21 — Preserve localStorage only until account-backed state exists

Reason: `asa103.progress.v1` currently stores question attempts, review state,
and mock results locally. Phase 1 must preserve current behavior, while Phase 2
requires durable per-user state and there are no production users to migrate.

Impact: Phase 2 should map the actual `Progress` behavior to Supabase and may
start production state cleanly; it should not build legacy migration or
local/cloud conflict resolution.

## 2026-08-21 — Use Supabase for product state and PostHog for analytics

Reason: These managed services meet the project requirements with clear data
ownership and no custom backend.

Impact: Supabase Auth/state arrives in Phase 2 with RLS and no privileged browser
secret. PostHog arrives in Phase 3, uses the Supabase UUID for identity, excludes
unnecessary PII, and never becomes the learner-state source of truth.

## 2026-08-21 — Store one versioned progress snapshot per authenticated learner

Reason: The actual `Progress` behavior updates question statistics, a derived
review queue, and mock history together. One JSONB row preserves those atomic
invariants with less schema and synchronization machinery than three normalized
tables. There are no production users to migrate or offline conflicts to merge.

Impact: `learner_progress.user_id` is both the primary key and RLS ownership
boundary. Study UI remains locked until the row is loaded, same-client writes
are serialized, invalid rows fail closed, and visible failed writes must be
retried before logout. Reconsider normalization only if query or concurrency
requirements become concrete.

## 2026-08-21 — Reset browser-role table grants before relying on RLS

Reason: Live verification found that Supabase's default table grants gave the
`authenticated` role `TRUNCATE`, `TRIGGER`, and `REFERENCES` in addition to CRUD.
RLS does not protect `TRUNCATE`, so owner policies alone would not prevent one
authenticated learner from erasing every learner's progress.

Impact: Browser-exposed learner tables must explicitly revoke all privileges
from `anon` and `authenticated`, then grant only the operations the application
requires. Verify both RLS policies and effective role grants against the live
database; migration `202608210002` performs that reset for `learner_progress`.

## 2026-08-21 — Do not instrument `feedback_submitted`

Reason: The reviewed event set in `PROJECT.md` lists it, but the application has
no feedback UI. Building one is product work, and an event that can never fire
is worse than an absent event because it looks like a broken funnel.

Impact: Phase 3 ships twelve of the thirteen reviewed events. Add
`feedback_submitted` in the same phase that adds a feedback surface.

## 2026-08-21 — One event pair per session type, and no per-question mock events

Reason: Review is implemented as a `PracticeSession` with a different question
set, so emitting the topic pair alongside the review pair would count one
session twice. Mock grading records every answer in a single action, so N
`question_answered` events would only restate `mock_completed`.

Impact: A review session emits `missed_review_started`/`missed_review_completed`
and never the `practice_*` pair, and vice versa. A mock emits `mock_started` and
`mock_completed` only; `question_answered` and `question_skipped` belong to
practice and review sessions.

## 2026-08-21 — Derive signup completion from the Supabase account age

Reason: Supabase creates the user on first login, so there is no separate signup
flow to observe and no server-side hook in this architecture to report one.

Impact: `signup_started` is an auth attempt, and `signup_completed` is the first
authenticated session of a user created within five minutes. A returning
sign-in emits neither a completion nor an invented `signed_in` event; it is
already observable through `beta_opened` with `auth_state: "signed-in"` plus the
identify call.

## 2026-08-21 — Store onboarding answers in their own table

Reason: `learner_progress.progress` is an accepted Phase 2 invariant with a
strict fail-closed parser and a database check constraint. Onboarding is not
study progress, and a malformed onboarding answer must never be able to
invalidate a learner's progress row.

Impact: `public.learner_onboarding` holds one nullable, token-constrained column
per question (NULL means skipped) under the same forced RLS and reset grants as
`learner_progress`. Onboarding failures are non-blocking: a load failure skips
onboarding, and a save failure offers a retry while the learner may continue.
The Phase 2 sign-out save gate deliberately does not cover it.

## 2026-08-21 — Clean the callback out of the URL before analytics starts

Reason: Live inspection found the `/flags/` request carrying
`$initial_current_url` with its query string intact. That request is not an
event, so it never passes through the `before_send` scrubber, and a magic-link
or OAuth callback would have leaked `code=` through it. The first fix disabled
the flags request — which silently disabled session replay too, because
posthog-js learns from the flags/remote-config response that recording is
enabled. Replay is explicit Phase 3 scope, so trading it away was wrong.

Impact: The leak is fixed at the source instead. `createAnalyticsClient` returns
a `DeferredAnalyticsClient` that constructs the real client on the first
capture, which happens once the auth state has resolved — by which point
Supabase has consumed the callback params — and strips those params from the
address bar immediately before `posthog.init`. Every downstream consumer
(flags, the stored `$initial_person_info`, replay metadata) is then clean by
construction rather than scrubbed on the way out, and flags stay enabled so
replay records. `before_send` remains as defence in depth. Surveys and web
experiments stay disabled: both are out of scope and each adds a request that
bypasses `before_send`. Enabling either reopens the same class of leak and
needs a scrubbing path for non-event requests.

Residual, accepted and reproducible: the flags request still reports non-auth
query parameters in `$initial_current_url`. Entering at
`?seed=20250815&someparam=leakme` puts both parameters in the `/flags/` body,
while every event's `$current_url` and `$set_once.$initial_current_url` are
exactly origin + pathname. It reproduces only when posthog-js actually issues
`/flags/`, which it skips when the `/array/<token>/config.js` remote config
loads successfully — so an observer who checks the events, or who checks a run
that had no flags request, will not see it. Accepted because stripping the whole
query string would rewrite a URL the product supports (`?seed=` is the
deterministic-shuffle debug seam, and production URLs carry no parameters), and
because no auth material can reach it: those fields are removed from the address
bar before the client is constructed. Closing it entirely would mean clearing
the whole query string at that same point.

## 2026-08-21 — Cover the analytics transport with its own build

Reason: The E2E analytics sink replaces PostHog's transport, so it can prove
what the application decides to capture but never that anything leaves the
page. A review build that initialised PostHog correctly and transmitted nothing
passed the entire sink suite. The cause was posthog-js's bot filter, which
checks `navigator.userAgent`, the brands in `navigator.userAgentData`, and
`navigator.webdriver`, and silently drops every capture when any of them looks
automated — `userAgentData.brands` still announces "HeadlessChrome" in a
Playwright browser whose user-agent string has been overridden.

Impact: `VITE_E2E_REAL_ANALYTICS=true` builds keep the fake cloud but wire up
the real client against a stubbed host, and `e2e/analytics-transport.spec.ts`
asserts that a capture becomes a real HTTP request. That spec must present all
three fingerprint signals as an ordinary browser or it passes vacuously, so it
self-checks them. The same filter means any live ingestion check must use a
real browser: an automated one will report zero events and look like a broken
integration. The flag has no effect on a production build, which never enables
the E2E cloud double.

## 2026-08-21 — Report a failed session check as `auth_state: "unknown"`

Reason: The spec's event table gives `beta_opened` two auth states. When the
Supabase session check itself fails, neither is true, and dropping the event
would make a provider outage look like nobody arrived — which is exactly when
knowing whether anyone arrived matters most.

Impact: `auth_state` is a three-value enum. `unknown` means the session check
failed, not that the learner is signed out; a successful retry does not emit a
second `beta_opened`, because a page load still has exactly one entry.

## 2026-08-21 — Guard once-only firing with refs, not with rendered state

Reason: Two activations of "Submit exam" inside one task both observe the
pre-render state, because React has not re-rendered between them. A guard of
the form `if (grade) return` therefore still grades and reports the attempt
twice; only a ref is updated synchronously enough to stop the second call. The
same reasoning is why the session-start events use a ref guard rather than an
effect dependency list under `StrictMode`.

Impact: `MockExam.finish` checks a `graded` ref, and `e2e/analytics.spec.ts`
dispatches two clicks in a single task to hold that. Any future "fires exactly
once" requirement should be guarded the same way and tested the same way; a
state-based guard passes casual review and fails this test.
