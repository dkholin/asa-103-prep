import { expect, test } from '@playwright/test';
import { captured, capturedNames, capturedOnce } from './helpers';

/**
 * The optional beta onboarding. `?onboarding=1` is the test double's knob for
 * "this learner has no onboarding record yet"; without it every learner
 * already has one, which is why the rest of the suite lands on the dashboard.
 */

const ONBOARDING = '/?onboarding=1';

test('a first-time learner answers, is stored, and is not asked again', async ({ page }) => {
  await page.goto(ONBOARDING);
  await expect(page.getByRole('region', { name: 'Beta onboarding' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).not.toBeVisible();

  await page.getByLabel('In 2–4 weeks').check();
  await page.getByLabel('Refreshing what I already learned').check();
  await page.getByLabel('Prefer not to say').last().check();
  await page.getByRole('button', { name: 'Start studying' }).click();

  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();

  const completed = await capturedOnce(page, 'onboarding_completed');
  expect(completed.properties).toMatchObject({
    exam_timing: '2_4_weeks',
    current_status: 'refreshing',
    sailing_experience: 'skipped',
    answered_count: 2,
  });

  const personProperties = (await captured(page)).filter((event) => event.name === '$set');
  expect(personProperties.at(-1)?.properties).toEqual({
    exam_timing: '2_4_weeks',
    current_status: 'refreshing',
    sailing_experience: 'skipped',
  });

  await page.reload();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Beta onboarding' })).not.toBeVisible();
  expect(await capturedNames(page)).not.toContain('onboarding_completed');
});

test('every question can be skipped and the submission is still reported', async ({ page }) => {
  await page.goto(ONBOARDING);
  await page.getByRole('button', { name: 'Skip all' }).click();

  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  expect((await capturedOnce(page, 'onboarding_completed')).properties).toMatchObject({
    exam_timing: 'skipped',
    current_status: 'skipped',
    sailing_experience: 'skipped',
    answered_count: 0,
  });
});

test('an onboarding load failure sends the learner straight to studying', async ({ page }) => {
  await page.goto('/?onboarding=1&onboardingLoadError=1');

  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Beta onboarding' })).not.toBeVisible();
});

test('a failed save is shown inline, can be retried, and never re-reports the submission', async ({ page }) => {
  await page.goto('/?onboarding=1&onboardingSaveError=1');
  await page.getByLabel('Within 2 weeks').check();
  await page.getByRole('button', { name: 'Start studying' }).click();

  await expect(page.getByRole('alert')).toContainText('Simulated onboarding save failure');
  await expect(page.getByRole('heading', { name: 'Overall progress' })).not.toBeVisible();

  await page.getByRole('button', { name: 'Retry' }).click();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();

  const submissions = (await captured(page)).filter(
    (event) => event.name === 'onboarding_completed',
  );
  expect(submissions).toHaveLength(1);
});

test('a learner may continue studying without a saved answer set', async ({ page }) => {
  await page.goto('/?onboarding=1&onboardingSaveError=1');
  await page.getByRole('button', { name: 'Skip all' }).click();
  await expect(page.getByRole('alert')).toBeVisible();

  await page.getByRole('button', { name: 'Continue without saving' }).click();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
});
