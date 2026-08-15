import { expect, test } from '@playwright/test';
import {
  ANCHORING,
  CHART_NAV,
  correctText,
  question,
  seeded,
  skipToPrompt,
  wrongChoice,
} from './helpers';

const chartQ = question('chart-nav-tools-dividers');
const scopeQ = question('anchor-scope-calc-basic');

test('chart question: image loads, stays readable, answering works, explanation shows', async ({
  page,
}) => {
  await page.goto(seeded());
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Coastal Navigation & Charts' })
    .getByRole('button', { name: 'Practice' })
    .click();
  await expect(page.getByText(`Question 1 of ${CHART_NAV.length}`)).toBeVisible();
  // Session order is randomized; move to the question this spec is about.
  await skipToPrompt(page, chartQ.prompt);

  // The figure image loads and renders at a real, non-zero size.
  const img = page.locator('.question-figure img');
  await expect(img).toBeVisible();
  await expect
    .poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth))
    .toBeGreaterThan(0);
  const box = await img.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(50);

  const wrong = wrongChoice(chartQ);
  await page.getByRole('radio', { name: wrong.text, exact: true }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Incorrect', { exact: true })).toBeVisible();
  await expect(page.getByText(`Correct answer: ${correctText(chartQ)}`)).toBeVisible();
  await expect(page.getByText(chartQ.explanation)).toBeVisible();
  await expect(page.getByText(`Source: ${chartQ.source}`)).toBeVisible();
});

test('chart figure enlarges on click and closes on Escape', async ({ page }) => {
  await page.goto(seeded());
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Coastal Navigation & Charts' })
    .getByRole('button', { name: 'Practice' })
    .click();
  await skipToPrompt(page, chartQ.prompt);

  await page.getByRole('button', { name: /Enlarge figure/ }).click();
  const lightboxImg = page.locator('.lightbox-img');
  await expect(lightboxImg).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(lightboxImg).toHaveCount(0);
});

test('anchoring scope calculation: answer, scoring, and explanation', async ({ page }) => {
  await page.goto(seeded());
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Anchoring & Mooring' })
    .getByRole('button', { name: 'Practice' })
    .click();
  await expect(page.getByText(`Question 1 of ${ANCHORING.length}`)).toBeVisible();

  // Skip forward to the scope-calculation question.
  await skipToPrompt(page, scopeQ.prompt);
  await expect(page.getByText(scopeQ.prompt)).toBeVisible();

  await page.getByRole('radio', { name: correctText(scopeQ), exact: true }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Correct', { exact: true })).toBeVisible();
  await expect(page.getByText(scopeQ.explanation)).toBeVisible();
});
