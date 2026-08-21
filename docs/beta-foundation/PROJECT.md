# Beta Foundation project

## Objective

Move the existing local study tool through a deliberately small sequence:

```text
local ASA 103 study app
  -> production web app
  -> authentication
  -> persistent progress
  -> behavioral analytics
  -> small invited beta
```

The result should let real learners sign in with little friction, study across
devices, retain progress, and produce enough trustworthy evidence to improve
the learning product.

## Architecture

- **Frontend/hosting:** keep the React/Vite single-page application. GitHub
  Pages hosts the static production build; GitHub Actions deploys `main`.
- **Authentication/product state (Phase 2):** Supabase Auth with Google as the
  primary method and email magic links as fallback. No passwords, MFA, or
  profile system in Beta 1. Supabase stores learner state and enforces per-user
  access with Row Level Security.
- **Analytics (Phase 3):** PostHog records a small semantic event set, funnels,
  retention, individual journeys, and conservatively masked session replay.
  The Supabase user UUID is the analytics identity; unnecessary personal data
  is excluded.
- **Boundary:** Supabase is the source of truth for product state. PostHog is
  observational and never determines learner progress. No custom backend is
  planned unless a concrete requirement makes browser-to-Supabase unsuitable.

The current app uses in-memory view state rather than URL routes and persists
progress under `asa103.progress.v1` in browser `localStorage`. Phase 1 preserves
that behavior. Phase 2 replaces the persistence boundary with account-backed
state; there are no production users or legacy-data migration requirements.

## Product principles and beta definition

- Keep the learning experience recognizable and the infrastructure minimal.
- Prefer reversible, low-risk choices and managed services.
- Soft invite-only means the URL is public and normal authentication is
  available, but the owner shares it only with selected testers. There is no
  whitelist, invite code, or custom admin tool.
- Start with about three learners, observe journeys and interview them, fix
  meaningful issues, then grow to roughly 3–5 and later 10–20 learners.
- Measure meaningful study and learning (practice completed, accuracy change,
  recovery from misses, mock-score change, and context-aware return usage), not
  raw clicks. The initial activation hypothesis is 10 completed questions.

Phase 3 starts from this reviewed semantic event set: `beta_opened`,
`signup_started`, `signup_completed`, `onboarding_completed`,
`practice_started`, `question_answered`, `question_skipped`,
`practice_completed`, `missed_review_started`, `missed_review_completed`,
`mock_started`, `mock_completed`, and `feedback_submitted`. Use only relevant
non-sensitive properties such as question/topic, correctness, attempt, score,
count, and duration; avoid duplicate click-level events.

Optional onboarding asks only ASA 103 timing (within 2 weeks, 2–4 weeks, 1–3
months, or later/not scheduled), current status (taking, registered/not started,
planning, or refreshing), and sailing experience (beginner, under 1 year, 1–3
years, or 3+ years). Every question may be skipped.

Broader public use should be considered only after the production flow is
reliable, user isolation and privacy are verified, important journeys are
observable, core study flows work on mobile and desktop, and initial cohorts
show useful learning/engagement evidence without unresolved beta blockers.

## Non-goals

No payments, subscriptions, pricing tiers, growth/referral automation,
instructor/classroom tools, leaderboards/social features, elaborate profiles,
notifications, additional courses, AI tutor, custom admin portal, hard invite
system, complex offline sync, data warehouse, A/B platform, custom auth/session
management, Next.js migration, microservices, containers, queues, Kubernetes,
or new global-state framework without a demonstrated requirement.
