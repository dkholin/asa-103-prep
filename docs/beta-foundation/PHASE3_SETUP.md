# Phase 3 external setup and verification

Supabase stays the learner-state source of truth. PostHog is observational only
and never decides what a learner may study.

## Supabase

Apply `supabase/migrations/202608210003_phase3_learner_onboarding.sql`, which
adds `public.learner_onboarding`: one nullable, token-constrained column per
onboarding question (NULL means the learner skipped it) under the same forced
RLS and reset grants as `learner_progress`.

Verify against the live database, not just the migration file:

- RLS enabled **and** forced, with four owner policies scoped to `authenticated`.
- `authenticated` holds exactly `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
- `anon` holds nothing. No `TRUNCATE`, `TRIGGER`, or `REFERENCES` on either role.

A database password is not required for any of this. The Supabase Management API
runs SQL with a personal access token:

```bash
curl -sS -X POST "https://api.supabase.com/v1/projects/<ref>/database/query" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" -d '{"query":"select 1;"}'
```

## PostHog project

US cloud, project `569977`. Two browser-public values configure the client:

- Actions variable `POSTHOG_KEY` — the `phc_` project key
- Actions variable `POSTHOG_HOST` — `https://us.i.posthog.com`

Both are repository *variables*, not secrets, because both ship to the browser.
Locally they live in `.env.local` as `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST`.
A missing or malformed key fails closed to a no-op client: analytics never
breaks a study flow. **A personal API key must never appear in a `VITE_*` value,
in tracked files, or in these docs**; the deploy workflow's secret scan fails
the build if the personal-key environment variable name appears anywhere in
tracked files. That scan matches the literal name, so write *about* it the way
this paragraph does rather than spelling it out — otherwise the documentation
itself fails the build.

Project defaults are wrong for this project and were changed. Re-check them if
anything looks off, because several are ingestion-side and the client cannot
override them:

| Setting | Default | Required |
| --- | --- | --- |
| `autocapture_opt_out` | unset (autocapture on) | `true` |
| `session_recording_opt_in` | `false` | `true` |
| `capture_console_log_opt_in` | `true` | `false` |
| `capture_performance_opt_in` | `true` | `false` |
| `session_recording_masking_config` | none | `maskAllInputs`, `blockSelector` |
| `session_recording_network_payload_capture_config` | none | headers and bodies off |

Console-log capture matters: replay would otherwise record console output, and
authentication errors can carry token material.

These live on the **environment** record. `GET /api/projects/<id>/` returns a
stale view of them and will make a successful change look like it failed — read
and write `/api/environments/<id>/` instead.

## Current product views

Use PostHog insights rather than a custom dashboard. The original Practice-first
funnel is obsolete now that Home and Learn are first-class product surfaces. The
current minimum reporting set is:

- **New learner to first lesson** — `beta_opened` → `home_viewed` filtered to
  `learner_state = new` → `home_action_taken` filtered to
  `recommendation = start_learning` → `lesson_started` → `lesson_completed`.
- **Returning recommendation follow-through** — `home_viewed` filtered to
  `learner_state = returning` → `home_action_taken`, broken down by
  `recommendation`.
- **Learn to Practice** — `lesson_started` or `lesson_completed` →
  `practice_started`, with `practice_started.entry_point` distinguishing Learn,
  Home, and the Practice surface.
- **Mock adoption and completion** — `mock_started` → `mock_completed`, broken
  down by `mock_started.entry_point`.
- **Auth reach and blockers** — `beta_opened` or `signup_started` → `home_viewed`,
  with failed `auth_diagnostic` events inspected between them.
- **Weekly meaningful-study retention** — return to at least one of
  `lesson_started`, `practice_started`, or `mock_started`, rather than a raw page
  return.

The existing ten-answered-question insight can remain as a Practice-depth
measure. It is no longer the sole definition of product activation.

PostHog also auto-created default insights when the project was made
("Pageviews", "DAUs", "Sessions", "Top referrers"). **These read empty and that
is expected**: the app sets `capture_pageview: false`, because it has one URL
and no router, so pageviews would only duplicate `beta_opened`. Ignore them or
delete them; do not "fix" them by enabling pageview capture.

## Required live verification

Mocks and the in-page sink cannot certify any of this. See the analytics traps
in `TESTING.md` before writing any automated check — several obvious ones pass
while proving nothing.

1. A signed-out visit emits `beta_opened` with an anonymous distinct id, never
   the Supabase UUID.
2. After sign-in, `distinct_id` equals the Supabase user UUID. After sign-out,
   a *fresh* anonymous id — identities must not blend across an account switch.
3. Onboarding appears once, every question is skippable, a skipped question is
   stored as `NULL`, and a load failure sends the learner straight to studying.
4. Practice, answers, skips, review, mock, and completion events fire exactly
   once with correct properties. Abandoning a session emits no completion event.
   A review session emits only the review pair; a mock emits no per-question
   events. A reload adds only a new `beta_opened`.
5. A real magic-link callback puts `access_token` and `refresh_token` in the URL
   hash. Confirm no PostHog request carries auth material, and that
   `$current_url` and `$initial_current_url` are only ever origin + pathname.
6. A session recording exists, is keyed to the learner UUID, and masks both the
   typed email and the email rendered in the signed-in header. Inflate the
   replay payload before asserting, and include a positive control.
