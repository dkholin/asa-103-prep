import { expect, test } from '@playwright/test';
import { NAV_LIGHTS, SEED, correctText, seeded, seededPracticeOrder, wrongChoice } from './helpers';

// The app randomizes question and choice order per session; `?seed=` makes one
// run reproducible so the spec can name the questions it expects to see.
const ORDER = seededPracticeOrder('nav-lights', SEED);
const q1 = ORDER[0];
const q2 = ORDER[1];

test('practice flow: answer correctly, see feedback, advance', async ({ page }) => {
  await page.goto(seeded());
  await expect(page.getByRole('heading', { name: 'ASA 103 Prep' })).toBeVisible();

  await page.getByRole('button', { name: 'Continue studying' }).click();
  await expect(page.getByText(`Question 1 of ${NAV_LIGHTS.length}`)).toBeVisible();
  await expect(page.getByText(q1.prompt)).toBeVisible();

  await page.getByRole('radio', { name: correctText(q1), exact: true }).check();
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Correct', { exact: true })).toBeVisible();
  await expect(page.getByText(q1.explanation)).toBeVisible();

  await page.getByRole('button', { name: 'Next question' }).click();
  await expect(page.getByText(`Question 2 of ${NAV_LIGHTS.length}`)).toBeVisible();
  await expect(page.getByText(q2.prompt)).toBeVisible();
});

test('wrong answer flow: explanation shown, question enters review queue, retry clears it', async ({
  page,
}) => {
  await page.goto(seeded());
  await page.getByRole('button', { name: 'Continue studying' }).click();

  const wrong = wrongChoice(q1);
  await page.getByRole('radio', { name: wrong.text, exact: true }).check();
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Incorrect', { exact: true })).toBeVisible();
  await expect(page.getByText(`Correct answer: ${correctText(q1)}`)).toBeVisible();
  await expect(page.getByText(q1.explanation)).toBeVisible();
  if (wrong.whyWrong) {
    await expect(page.getByText(wrong.whyWrong)).toBeVisible();
  }

  // The missed question is now reviewable.
  await page.getByRole('button', { name: 'Back to dashboard' }).click();
  await page.getByRole('button', { name: 'Missed questions (1)' }).click();
  await expect(page.getByText(q1.prompt)).toBeVisible();

  // Reopen it, read the explanation again by answering, and clear it.
  await page.getByRole('button', { name: 'Review', exact: true }).click();
  await expect(page.getByText(q1.prompt)).toBeVisible();
  await page.getByRole('radio', { name: correctText(q1), exact: true }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Correct', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Finish session' }).click();
  await expect(page.getByRole('heading', { name: 'Session complete' })).toBeVisible();
  await page.getByRole('button', { name: 'Back to dashboard' }).click();
  await expect(page.getByRole('button', { name: 'Missed questions (0)' })).toBeVisible();
});

test('skip flow: skipped question advances and enters review queue', async ({ page }) => {
  await page.goto(seeded());
  await page.getByRole('button', { name: 'Continue studying' }).click();
  await expect(page.getByText(q1.prompt)).toBeVisible();

  await page.getByRole('button', { name: 'Skip' }).click();
  await expect(page.getByText(`Question 2 of ${NAV_LIGHTS.length}`)).toBeVisible();

  await page.getByRole('button', { name: 'Back to dashboard' }).click();
  await page.getByRole('button', { name: 'Missed questions (1)' }).click();
  await expect(page.getByText(q1.prompt)).toBeVisible();
});
