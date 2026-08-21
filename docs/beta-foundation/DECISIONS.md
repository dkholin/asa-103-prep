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
