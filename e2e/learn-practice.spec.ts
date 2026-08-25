import { expect, test } from '@playwright/test';
import {
  captured,
  correctText,
  displayedPositionOf,
  question,
  revealLesson,
  seeded,
} from './helpers';

async function openControlsLesson(page: import('@playwright/test').Page) {
  await openLearnLesson(page, 'Controls & Instruments');
}

/** Learn home, the owning accordion module expanded, then the lesson. */
async function openLearnLesson(page: import('@playwright/test').Page, title: string) {
  await page.getByRole('button', { name: 'Learn', exact: true }).click();
  await revealLesson(page, title);
  await page
    .getByRole('listitem')
    .filter({ hasText: title })
    .getByRole('button', { name: 'Open lesson' })
    .click();
}

test('lesson concept Practice launches only mapped questions and exits back to its lesson', async ({ page }) => {
  await page.goto(seeded());
  await openControlsLesson(page);
  await expect(page.getByTestId('lesson-state')).toHaveText('In progress');

  await page.getByRole('button', { name: 'Practice this material' }).click();
  const mapped = question('eng-control-panel-id');
  await expect(page.getByRole('heading', { name: 'Controls & Instruments practice' })).toBeVisible();
  await expect(page.getByText('Question 1 of 1')).toBeVisible();
  await expect(page.getByText(mapped.prompt)).toBeVisible();

  const started = (await captured(page)).find(
    (event) => event.name === 'practice_started' && event.properties?.mode === 'concept',
  );
  expect(started?.properties).toMatchObject({
    mode: 'concept',
    lesson_id: 'motoring-controls-instruments',
    question_count: 1,
  });
  expect(started?.properties).not.toHaveProperty('topic');

  await page.getByRole('button', { name: 'Back to lesson' }).click();
  await expect(page.getByRole('heading', { name: 'Controls & Instruments' })).toBeVisible();
  await expect(page.getByTestId('lesson-state')).toHaveText('In progress');
});

test('completed concept Practice keeps shuffled choices stable and returns without completing Learn', async ({ page }) => {
  await page.goto(seeded(1));
  await openControlsLesson(page);
  const mapped = question('eng-control-panel-id');

  await page.getByRole('button', { name: 'Practice this material' }).click();
  expect(await displayedPositionOf(page, correctText(mapped))).toBeGreaterThan(1);
  const choiceOrder = await page.locator('.choices .choice-text').allTextContents();
  await page.getByRole('radio', { name: correctText(mapped), exact: true }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  expect(await page.locator('.choices .choice-text').allTextContents()).toEqual(choiceOrder);
  await expect(page.getByText(mapped.explanation)).toBeVisible();
  await page.getByRole('button', { name: 'Finish session' }).click();
  await expect(page.getByRole('heading', { name: 'Session complete' })).toBeVisible();

  const events = await captured(page);
  const answered = events.find(
    (event) => event.name === 'question_answered' && event.properties?.question_id === mapped.id,
  );
  expect(answered?.properties).toMatchObject({ mode: 'concept', correct: true });
  const completed = events.find(
    (event) => event.name === 'practice_completed' && event.properties?.mode === 'concept',
  );
  expect(completed?.properties).toMatchObject({
    lesson_id: 'motoring-controls-instruments',
    answered: 1,
    correct: 1,
    incorrect: 0,
    skipped: 0,
  });
  expect(completed?.properties).not.toHaveProperty('topic');

  await page.getByRole('button', { name: 'Back to lesson' }).click();
  await expect(page.getByRole('heading', { name: 'Controls & Instruments' })).toBeVisible();
  await expect(page.getByTestId('lesson-state')).toHaveText('In progress');
});

test('Sails & Trim Practice uses concept resolution and never falls back by topic', async ({ page }) => {
  await page.goto(seeded());
  await openLearnLesson(page, 'Reefing & Reducing Sail');
  await page.getByRole('button', { name: 'Practice this material' }).click();
  await expect(page.getByRole('heading', { name: 'Reefing & Reducing Sail practice' })).toBeVisible();
  await expect(page.getByText('Question 1 of 21')).toBeVisible();
  await page.getByRole('button', { name: 'Back to lesson' }).click();

  await page.getByRole('button', { name: 'Back to Learn' }).click();
  await revealLesson(page, 'Trim by Point of Sail');
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Trim by Point of Sail' })
    .getByRole('button', { name: 'Open lesson' })
    .click();
  await expect(page.getByRole('heading', { name: 'Trim by Point of Sail' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Practice this material' })).toHaveCount(0);
});
