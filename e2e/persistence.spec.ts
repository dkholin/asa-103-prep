import { expect, test } from '@playwright/test';
import { NAV_LIGHTS, QUESTIONS_TOTAL, SEED, correctText, seeded, seededPracticeOrder } from './helpers';

const q1 = seededPracticeOrder('nav-lights', SEED)[0];

test('progress survives a browser reload', async ({ page }) => {
  await page.goto(seeded());
  await expect(page.getByTestId('overall-readiness')).toContainText(
    `0 of ${QUESTIONS_TOTAL} questions solid`,
  );

  await page.getByRole('button', { name: 'Continue studying' }).click();
  await page.getByRole('radio', { name: correctText(q1), exact: true }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Correct', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Back to dashboard' }).click();

  await expect(page.getByTestId('overall-readiness')).toContainText(
    `1 of ${QUESTIONS_TOTAL} questions solid`,
  );

  await page.reload();

  await expect(page.getByTestId('overall-readiness')).toContainText(
    `1 of ${QUESTIONS_TOTAL} questions solid`,
  );
  await expect(page.getByText(`In progress — 1/${NAV_LIGHTS.length}`)).toBeVisible();
});
