// Captures the Arc 1 review screenshots against a running preview server
// (http://localhost:4173). Output: screenshots/*.png
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:4173';
mkdirSync('screenshots', { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const shot = async (name) => {
  // Wait for every visible image to finish decoding before capturing.
  await page.waitForFunction(() =>
    [...document.querySelectorAll('img')].every((i) => i.complete && i.naturalWidth > 0),
  );
  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
};

await page.goto(BASE);
await page.evaluate(() => localStorage.clear());
await page.reload();

// 1. Fresh dashboard
await page.getByRole('heading', { name: 'Study status' }).waitFor();
await shot('01-dashboard');

// 2. Question with sourced USCG graphic
await page.getByRole('button', { name: 'Start practice' }).click();
await page.getByRole('img').first().waitFor();
await shot('02-question-sourced-graphic');

// 3. Answered question with explanation (wrong answer path)
await page.getByRole('radio', { name: 'Sidelights and a sternlight only' }).check();
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByText('Incorrect', { exact: true }).waitFor();
await shot('03-answered-explanation');

// 4. Missed questions review list
await page.getByRole('button', { name: 'Back to dashboard' }).click();
await page.getByRole('button', { name: 'Missed questions (1)' }).click();
await page.getByRole('heading', { name: 'Missed questions' }).waitFor();
await shot('04-missed-review');

// 5. Mock exam question (custom night-scene asset appears at question 2)
await page.getByRole('button', { name: 'Back to dashboard' }).click();
await page.getByRole('button', { name: 'Mock exam' }).click();
await page.getByRole('heading', { name: 'Mock exam' }).waitFor();
await page.getByRole('radio').first().check();
await page.getByRole('button', { name: 'Next', exact: true }).click();
await page.getByText('Question 2 of 6').waitFor();
await shot('05-mock-question');

// 6. Right-of-way custom diagram question
await page.getByRole('button', { name: 'Abandon exam' }).click();
await page
  .getByRole('listitem')
  .filter({ hasText: 'Right of Way' })
  .getByRole('button', { name: 'Practice' })
  .click();
await page.getByRole('img').first().waitFor();
await shot('06-right-of-way-diagram');

await browser.close();
console.log('captured 6 screenshots');
