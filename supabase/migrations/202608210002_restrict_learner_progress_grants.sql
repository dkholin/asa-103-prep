-- Supabase projects may provision broad default table grants for API roles.
-- RLS does not protect TRUNCATE, so reset both browser-facing roles before
-- restoring only the row-level operations required by the application.
revoke all on table public.learner_progress from anon, authenticated;

grant select, insert, update, delete
  on table public.learner_progress
  to authenticated;
