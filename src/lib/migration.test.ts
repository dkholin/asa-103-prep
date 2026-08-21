import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const correctiveMigration = readFileSync(
  new URL('../../supabase/migrations/202608210002_restrict_learner_progress_grants.sql', import.meta.url),
  'utf8',
).toLowerCase();

const statements = correctiveMigration
  .replace(/--.*$/gm, '')
  .split(';')
  .map((statement) => statement.replace(/\s+/g, ' ').trim())
  .filter(Boolean);

describe('learner_progress database privileges', () => {
  it('resets default browser-role privileges before granting authenticated CRUD only', () => {
    const revokeAt = correctiveMigration.indexOf(
      'revoke all on table public.learner_progress from anon, authenticated',
    );
    const grantAt = correctiveMigration.indexOf(
      'grant select, insert, update, delete',
    );

    expect(revokeAt).toBeGreaterThanOrEqual(0);
    expect(grantAt).toBeGreaterThan(revokeAt);
    expect(statements).toEqual([
      'revoke all on table public.learner_progress from anon, authenticated',
      'grant select, insert, update, delete on table public.learner_progress to authenticated',
    ]);
  });
});
