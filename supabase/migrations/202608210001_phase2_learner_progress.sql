-- The row is the exact durable boundary used by src/lib/progress.ts: one
-- versioned Progress snapshot per authenticated learner.
create table public.learner_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{"version":1,"stats":{},"reviewQueue":[],"mockResults":[]}'::jsonb,
  constraint learner_progress_v1_shape check (
    progress->>'version' = '1'
    and jsonb_typeof(progress->'stats') = 'object'
    and jsonb_typeof(progress->'reviewQueue') = 'array'
    and jsonb_typeof(progress->'mockResults') = 'array'
  )
);

alter table public.learner_progress enable row level security;
alter table public.learner_progress force row level security;

create policy "learners select their own progress"
  on public.learner_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "learners insert their own progress"
  on public.learner_progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "learners update their own progress"
  on public.learner_progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "learners delete their own progress"
  on public.learner_progress for delete
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on public.learner_progress from anon;
grant select, insert, update, delete on public.learner_progress to authenticated;
