import { expect, test } from '@playwright/test';
import { NAV_LIGHTS, correctText } from './helpers';

test('every navigation control reaches the expected screen', async ({ page }) => {
  await page.goto('/');

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
    await page.getByRole('button', { name: 'Back to dashboard' }).click();
    await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  }

  // Missed questions screen and back.
  await page.getByRole('button', { name: /Missed questions/ }).click();
  await expect(page.getByRole('heading', { name: 'Missed questions' })).toBeVisible();
  await expect(page.getByText('No missed or skipped questions')).toBeVisible();
  await page.getByRole('button', { name: 'Back to dashboard' }).click();

  // Mock exam and abandon.
  await page.getByRole('button', { name: 'Mock exam' }).click();
  await expect(page.getByRole('heading', { name: 'Mock exam' })).toBeVisible();
  await page.getByRole('button', { name: 'Abandon exam' }).click();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();

  // Header title acts as home from inside a session.
  await page.getByRole('button', { name: 'Continue studying' }).click();
  await page.getByRole('button', { name: 'ASA 103 Prep' }).click();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();

  // Reset progress clears saved state (confirm dialog accepted).
  await page.getByRole('button', { name: 'Continue studying' }).click();
  await page.getByRole('radio', { name: correctText(NAV_LIGHTS[0]) }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Back to dashboard' }).click();
  await expect(page.getByTestId('overall-readiness')).toContainText('1 of');
  page.on('dialog', (d) => d.accept());
  await page.getByRole('button', { name: 'Reset progress' }).click();
  await expect(page.getByTestId('overall-readiness')).toContainText('0 of');
});
