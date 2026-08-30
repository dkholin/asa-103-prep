# Phase 2 external setup and verification

The repository migrations and `supabase/config.toml` are the canonical live
Supabase configuration. Apply them through the Supabase CLI before independent
verification and deployment.

## Supabase project

1. Create/select the production Supabase project.
2. Apply every file in `supabase/migrations/` in filename order with the
   Supabase CLI or SQL editor. Migration `202608210002` is required even when
   `202608210001` was already applied: it removes Supabase default `TRUNCATE`,
   `TRIGGER`, and `REFERENCES` table privileges and restores authenticated CRUD
   only. Do not rely on RLS to protect `TRUNCATE`.
3. Put the Google web-client credentials in ignored `supabase/.env.local` as
   `SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID` and
   `SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET`, then source that file and run
   `supabase config push`. Typed email OTP authentication remains enabled;
   legacy callback handling stays only for older/admin-generated links.
4. `supabase config push` configures these local and production URLs:
   - `http://localhost:5173/asa-103-prep/` (or the exact printed local URL)
   - `http://127.0.0.1:4173/asa-103-prep/`
   - `https://dkholin.github.io/asa-103-prep/`
5. The Google web client must authorize
   `https://kgphhrxjjwnavxtzdczx.supabase.co/auth/v1/callback`. The app's own
   `redirectTo` remains the environment-aware Pages base URL above.

## Local and GitHub configuration

Copy `.env.example` to `.env.local` and fill in the project URL and browser-
public publishable key. Do not use a service-role key.

In the GitHub repository configure:

- Actions variable `SUPABASE_URL`
- Actions secret `SUPABASE_PUBLISHABLE_KEY` (the value is browser-public after
  build, but storing it here avoids committing environment-specific config)

The deployment workflow fails before building if either value is absent. It
does not print either value.

## Required live verification

Use supported browsers and at least two test users:

1. Google sign-in returns to the correct Pages subpath and loads the dashboard.
2. After the SMTP/template actions in `AUTH_BETA_ROLLOUT.md`, typed email OTP
   works for both a new user and a returning external-mailbox user.
3. Record a wrong answer, a correct answer, a skip, and a mock result. Wait for
   “Progress saved,” then open another browser/profile and confirm the same
   readiness, review queue, attempt counts, and mock history appear.
4. Sign in as test user B. Confirm user A's state is absent. From user B's JWT,
   attempt REST select/insert/update/delete against user A's UUID and confirm
   every operation returns no row or an RLS error. Repeat A against B.
   Also inspect `information_schema.role_table_grants` and confirm `anon` has no
   privileges and `authenticated` has exactly `SELECT`, `INSERT`, `UPDATE`, and
   `DELETE` on `public.learner_progress` (no `TRUNCATE`, `TRIGGER`, or
   `REFERENCES`).
5. Temporarily block/fail the progress request. Confirm loading failures expose
   retry without showing an empty study dashboard; save failures remain visible,
   retryable, and prevent sign-out until saved.
6. Confirm sign-out returns to the auth screen and a reload remains signed out.

Mocks prove UI and race behavior only. They cannot certify OAuth delivery,
cross-device recovery, or RLS isolation; retain screenshots/request evidence for
the independent Verifier.
