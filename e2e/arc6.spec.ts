import { expect, test } from '@playwright/test';
import {
  SEED,
  correctText,
  openPractice,
  seeded,
  seededPracticeOrder,
  wrongChoice,
} from './helpers';

// Order is randomized per session; `?seed=` pins it so the spec can name the
// question it expects to be shown first.
const EMERGENCIES = seededPracticeOrder('emergencies', SEED);
const RIGHT_OF_WAY = seededPracticeOrder('right-of-way', SEED);
const NAV_LIGHTS_ORDER = seededPracticeOrder('nav-lights', SEED);
const emerQ = EMERGENCIES[0];

test('emergency review flow: wrong answer lands in Missed Questions, retry clears it', async ({
  page,
}) => {
  await page.goto(seeded());
  await openPractice(page);
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Emergencies' })
    .getByRole('button', { name: 'Practice' })
    .click();
  await expect(page.getByText(emerQ.prompt)).toBeVisible();

  const wrong = wrongChoice(emerQ);
  await page.getByRole('radio', { name: wrong.text, exact: true }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Incorrect', { exact: true })).toBeVisible();
  await expect(page.getByText(emerQ.explanation)).toBeVisible();
  await expect(page.getByText(`Source: ${emerQ.source}`)).toBeVisible();

  await page.getByRole('button', { name: 'Back to Practice' }).click();
  await page.getByRole('button', { name: /Missed questions/ }).click();
  await expect(page.getByText(emerQ.prompt)).toBeVisible();

  await page
    .getByRole('listitem')
    .filter({ hasText: emerQ.prompt })
    .getByRole('button', { name: 'Review', exact: true })
    .click();
  await expect(page.getByText(emerQ.prompt)).toBeVisible();
  await page.getByRole('radio', { name: correctText(emerQ), exact: true }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Correct', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Finish session' }).click();
  await page.getByRole('button', { name: 'Back to Practice' }).click();
  await expect(page.getByRole('button', { name: 'Missed questions (0)' })).toBeVisible();
});

test('adaptive recommendation favors a weak topic built through real study history', async ({
  page,
}) => {
  await page.goto(seeded());
  await openPractice(page);

  // Fresh state: recommendation copy explains why (nothing studied yet).
  await expect(page.getByText('Recommended next')).toBeVisible();
  await expect(page.getByText(/not yet studied/)).toBeVisible();

  // Miss several Navigation Lights questions to make it the weak topic.
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Navigation Lights' })
    .getByRole('button', { name: 'Practice' })
    .click();
  for (let i = 0; i < 3; i++) {
    const q = NAV_LIGHTS_ORDER[i];
    const wrong = wrongChoice(q);
    await page.getByRole('radio', { name: wrong.text, exact: true }).check();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: /Next question|Finish session/ }).click();
  }
  await page.getByRole('button', { name: 'Back to Practice' }).click();

  // Answer several Right of Way questions correctly (a strong topic) so the
  // test proves the app picks the weak topic over a topic that's just first
  // in the list or that has plenty of solid answers.
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Right of Way' })
    .getByRole('button', { name: 'Practice' })
    .click();
  for (let i = 0; i < 3; i++) {
    const q = RIGHT_OF_WAY[i];
    await page.getByRole('radio', { name: correctText(q), exact: true }).check();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: /Next question|Finish session/ }).click();
  }
  await page.getByRole('button', { name: 'Back to Practice' }).click();

  // The recommendation should now point at Navigation Lights (missed
  // questions to clear) rather than Right of Way or a default first topic.
  await expect(page.getByRole('heading', { name: /Navigation Lights/ })).toBeVisible();
  await expect(page.getByText(/missed question.*to clear/)).toBeVisible();

  // Resolve the review queue by correctly retrying the missed questions, and
  // confirm the recommendation moves off Navigation Lights once cleared.
  await page.getByRole('button', { name: /Missed questions/ }).click();
  await page.getByRole('button', { name: 'Practice all missed questions' }).click();
  let guard = 0;
  while (guard < 10) {
    const finishVisible = await page
      .getByRole('heading', { name: 'Session complete' })
      .isVisible()
      .catch(() => false);
    if (finishVisible) break;
    const promptLocator = page.locator('.prompt').first();
    const promptText = (await promptLocator.textContent()) ?? '';
    const q = NAV_LIGHTS_ORDER.find((x) => x.prompt === promptText.trim());
    if (q) {
      await page.getByRole('radio', { name: correctText(q), exact: true }).check();
      await page.getByRole('button', { name: 'Submit' }).click();
    }
    await page.getByRole('button', { name: /Next question|Finish session/ }).click();
    guard++;
  }
  await page.getByRole('button', { name: 'Back to Practice' }).click();
  await expect(page.getByRole('button', { name: 'Missed questions (0)' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Navigation Lights/ })).not.toBeVisible();
});
