import { expect, test } from '@playwright/test';
import { SEED, correctText, revealLesson, seeded, seededPracticeOrder } from './helpers';

test('every navigation control reaches the expected screen', async ({ page }) => {
  await page.goto(seeded());
  await expect(page.getByRole('region', { name: 'Home' })).toBeVisible();
  await page.getByRole('button', { name: 'Practice', exact: true }).click();

  // Topic practice buttons open the matching session, Back returns.
  for (const topic of [
    'Navigation Lights',
    'Right of Way',
    'Sound Signals',
    'Signal Flags',
    'Coastal Navigation & Charts',
    'Anchoring & Mooring',
  ]) {
    await page
      .getByRole('listitem')
      .filter({ hasText: topic })
      .getByRole('button', { name: 'Practice' })
      .click();
    await expect(page.getByRole('heading', { name: topic })).toBeVisible();
    await page.getByRole('button', { name: 'Back to Practice' }).click();
    await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  }

  // Missed questions screen and back.
  await page.getByRole('button', { name: /Missed questions/ }).click();
  await expect(page.getByRole('heading', { name: 'Missed questions' })).toBeVisible();
  await expect(page.getByText('No missed or skipped questions')).toBeVisible();
  await page.getByRole('button', { name: 'Back to Practice' }).click();

  // Mock exam and abandon.
  await page.getByRole('button', { name: 'Mock exam', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Practice Mock Exam' })).toBeVisible();
  await page.getByRole('button', { name: 'Abandon exam' }).click();
  await expect(page.getByRole('region', { name: 'Home' })).toBeVisible();

  // Learn: the module outline, a lesson, and prev/next within the module.
  await page.getByRole('button', { name: 'Learn', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Motoring', exact: true })).toBeVisible();
  // Boat & Cruising Basics is the first published module, so it is the one the
  // accordion opens on with no prior activity — Motoring stays collapsed.
  await expect(
    page.getByRole('button', { name: 'Boat & Cruising Basics', exact: true }),
  ).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('button', { name: 'Motoring', exact: true })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  // A coming-soon module states its status in text, and offers nothing to open.
  // Seamanship is locally published for Step 1; Cruise Planning & Independence
  // remains coming soon. The same non-openable contract still applies.
  const comingSoon = page.locator('.card').filter({ hasText: 'Cruise Planning & Independence' });
  await expect(comingSoon.getByText('Coming soon')).toBeVisible();
  await expect(comingSoon.getByRole('button', { name: 'Open lesson' })).toHaveCount(0);

  await revealLesson(page, 'Before Getting Under Way');
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Before Getting Under Way' })
    .getByRole('button', { name: 'Open lesson' })
    .click();
  await expect(page.getByRole('heading', { name: 'Before Getting Under Way' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Previous lesson' })).toBeDisabled();

  await page.getByRole('button', { name: 'Next lesson' }).click();
  await expect(page.getByRole('heading', { name: 'Engine Basics & Pre-Start Checks' })).toBeVisible();
  await page.getByRole('button', { name: 'Previous lesson' }).click();
  await expect(page.getByRole('heading', { name: 'Before Getting Under Way' })).toBeVisible();

  await page.getByRole('button', { name: 'Back to Learn' }).click();
  await expect(page.getByRole('heading', { name: 'Learn', exact: true })).toBeVisible();
  await revealLesson(page, 'Outboards, Fueling & Motoring Etiquette');
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Outboards, Fueling & Motoring Etiquette' })
    .getByRole('button', { name: 'Open lesson' })
    .click();
  await expect(page.getByRole('button', { name: 'Next lesson' })).toBeDisabled();

  // A lesson in the other published module needs that module expanded first.
  await page.getByRole('button', { name: 'Back to Learn' }).click();
  await revealLesson(page, 'Preparing to Sail');
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Preparing to Sail' })
    .getByRole('button', { name: 'Open lesson' })
    .click();
  await expect(page.getByRole('heading', { name: 'Preparing to Sail' })).toBeVisible();

  await page.getByRole('button', { name: 'Practice', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();

  // Header title acts as home from inside a session.
  await page.getByRole('button', { name: 'Continue studying' }).click();
  await page.getByRole('button', { name: 'ASA 103 Prep' }).click();
  await expect(page.getByRole('region', { name: 'Home' })).toBeVisible();

  // Reset progress clears saved state (confirm dialog accepted).
  await page.getByRole('button', { name: 'Practice', exact: true }).click();
  await page.getByRole('button', { name: 'Continue studying' }).click();
  await page
    .getByRole('radio', { name: correctText(seededPracticeOrder('nav-lights', SEED)[0]), exact: true })
    .check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Back to Practice' }).click();
  await expect(page.getByTestId('overall-readiness')).toContainText('1 of');
  page.on('dialog', (d) => d.accept());
  await page.getByRole('button', { name: 'Reset progress' }).click();
  await expect(page.getByTestId('overall-readiness')).toContainText('0 of');
});
