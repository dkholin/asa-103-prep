import { expect, test } from '@playwright/test';
import { answerCurrentPractice, capturedNames } from './helpers';

/**
 * The same once-only invariants, against the development server.
 *
 * React double-invokes `StrictMode` effects only in development, so the
 * production preview the rest of the suite uses cannot prove that the
 * mount-effect events are idempotent under it. This spec drives the dev server
 * directly for exactly that reason.
 */

const devPort = process.env.E2E_DEV_PORT ?? '5174';
const devURL = (query: string) => `http://127.0.0.1:${devPort}/asa-103-prep/${query}`;

test.skip(
  !!process.env.E2E_BASE_URL,
  'the development server is not part of a hosted deployment smoke check',
);

test('StrictMode does not double-fire the entry or session-start events', async ({ page }) => {
  await page.goto(devURL('?seed=20250815'));
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();

  await expect.poll(() => capturedNames(page)).toEqual(['beta_opened', '$identify', '$set']);

  await page
    .locator('li.topic-row', { hasText: 'Signal Flags' })
    .getByRole('button', { name: 'Practice' })
    .click();
  await answerCurrentPractice(page, 'correct');
  await page.getByRole('button', { name: 'Next question' }).click();
  await page.getByRole('button', { name: 'Skip' }).click();
  await expect(page.getByRole('heading', { name: 'Session complete' })).toBeVisible();

  const names = await capturedNames(page);
  for (const event of [
    'beta_opened',
    'practice_started',
    'practice_completed',
    'question_answered',
    'question_skipped',
  ]) {
    expect(names.filter((n) => n === event), `${event} fired ${names.filter((n) => n === event).length} times`).toHaveLength(1);
  }
});

test('StrictMode does not double-fire a mock attempt start', async ({ page }) => {
  await page.goto(devURL('?seed=20250815'));
  await page.getByRole('button', { name: 'Mock exam' }).click();
  await expect(page.getByRole('region', { name: 'Mock exam question' })).toBeVisible();

  await expect
    .poll(() => capturedNames(page).then((names) => names.filter((n) => n === 'mock_started')))
    .toHaveLength(1);
});
