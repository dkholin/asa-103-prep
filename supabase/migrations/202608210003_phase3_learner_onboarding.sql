-- Optional beta onboarding answers. Deliberately its own table rather than a
-- key inside learner_progress.progress: onboarding is not study progress, and
-- a malformed onboarding answer must not be able to invalidate a learner's
-- progress row against its v1 shape constraint. NULL means the learner skipped
-- that question.
create table public.learner_onboarding (
  user_id uuid primary key references auth.users(id) on delete cascade,
  exam_timing text
    check (exam_timing in ('within_2_weeks', '2_4_weeks', '1_3_months', 'later_or_unscheduled')),
  current_status text
    check (current_status in ('taking', 'registered_not_started', 'planning', 'refreshing')),
  sailing_experience text
    check (sailing_experience in ('beginner', 'under_1_year', '1_3_years', '3_plus_years')),
  completed_at timestamptz not null default now()
);

alter table public.learner_onboarding enable row level security;
alter table public.learner_onboarding force row level security;

create policy "learners select their own onboarding"
  on public.learner_onboarding for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "learners insert their own onboarding"
  on public.learner_onboarding for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "learners update their own onboarding"
  on public.learner_onboarding for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "learners delete their own onboarding"
  on public.learner_onboarding for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- Supabase provisions broad default table grants for the API roles, and RLS
-- does not protect TRUNCATE. Reset both browser-facing roles before restoring
-- only the row-level operations the application performs.
revoke all on table public.learner_onboarding from anon, authenticated;

grant select, insert, update, delete
  on table public.learner_onboarding
  to authenticated;
