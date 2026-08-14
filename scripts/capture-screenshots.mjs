// Captures the review screenshots against a running preview server
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
  await page.screenshot({ path: `screenshots/${name}.png` });
};

await page.goto(BASE);
await page.evaluate(() => localStorage.clear());
await page.reload();

// 1. Fresh dashboard
await page.getByRole('heading', { name: 'Overall progress' }).waitFor();
await shot('01-dashboard');

// 2. Text-only question (Sound Signals topic)
await page
  .getByRole('listitem')
  .filter({ hasText: 'Sound Signals' })
  .getByRole('button', { name: 'Practice' })
  .click();
await page.getByText('Question 1 of').waitFor();
await shot('02-text-question');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// 3. Question with sourced USCG graphic + selected-but-unsubmitted state
await page.getByRole('button', { name: 'Continue studying' }).click();
await page.getByRole('img').first().waitFor();
await shot('03-question-sourced-graphic');
await page.getByRole('radio', { name: 'Masthead light, sidelights, and a sternlight' }).check();
await shot('04-selected-unsubmitted');

// 4. Correct-answer explanation
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByText('Correct', { exact: true }).waitFor();
await shot('05-correct-explanation');

// 5. Wrong-answer explanation
await page.getByRole('button', { name: 'Next question' }).click();
await page.getByRole('radio').last().check();
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByText('Incorrect', { exact: true }).waitFor();
await shot('06-wrong-answer-explanation');

// 6. Custom vessel-geometry diagram (Right of Way)
await page.getByRole('button', { name: 'Back to dashboard' }).click();
await page
  .getByRole('listitem')
  .filter({ hasText: 'Right of Way' })
  .getByRole('button', { name: 'Practice' })
  .click();
await page.getByRole('img').first().waitFor();
await shot('07-right-of-way-diagram');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// 7. Night (dark) light-ID question
await page
  .getByRole('listitem')
  .filter({ hasText: 'Navigation Lights' })
  .getByRole('button', { name: 'Practice' })
  .click();
for (let i = 0; i < 9; i++) {
  const alt = await page.locator('.question-figure img').getAttribute('alt').catch(() => null);
  if (alt && alt.includes('green light visible low over the water')) break;
  await page.getByRole('button', { name: 'Skip' }).click();
  await page.waitForTimeout(80);
}
await shot('08-night-dark-question');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// 8. Missed questions review list
await page.getByRole('button', { name: /Missed questions/ }).click();
await page.getByRole('heading', { name: 'Missed questions' }).waitFor();
await shot('09-missed-review');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// 9. Mock exam in progress
await page.getByRole('button', { name: 'Mock exam' }).click();
await page.getByRole('heading', { name: 'Mock exam' }).waitFor();
await shot('10-mock-question');

// 10. Mock exam results
for (let i = 0; i < 20; i++) {
  const r = page.getByRole('radio');
  if (await r.count()) await r.first().check();
  const submit = page.getByRole('button', { name: 'Submit exam' });
  if (await submit.isVisible().catch(() => false)) {
    await submit.click();
    break;
  }
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.waitForTimeout(60);
}
await page.getByRole('heading', { name: 'Mock exam results' }).waitFor();
await shot('11-mock-results');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// 11. Moderate-width (~800px) view
await page.setViewportSize({ width: 800, height: 900 });
await page.waitForTimeout(100);
await shot('12-moderate-width-800');
await page.setViewportSize({ width: 1280, height: 900 });

// --- Arc 3: Coastal Navigation / Charts / ATONs ---
// Skip counts below are deterministic offsets into the chart-nav / anchoring
// question order (see src/content/questions.ts), avoiding open-ended search
// loops that can stall if a label doesn't match exactly.
const skipTimes = async (n) => {
  for (let i = 0; i < n; i++) {
    await page.getByRole('button', { name: 'Skip' }).click();
    await page.waitForTimeout(60);
  }
};

await page.getByRole('button', { name: 'ASA 103 Prep' }).click();
await page
  .getByRole('listitem')
  .filter({ hasText: 'Coastal Navigation & Charts' })
  .getByRole('button', { name: 'Practice' })
  .click();

// index 4: chart-nav-sym-danger-line (a real NOAA Chart No. 1 crop)
await skipTimes(4);
await page.getByRole('img').first().waitFor();
await shot('13-chart-symbol-question');

// index 20: chart-nav-aton-lateral-colors (IALA Region B crop)
await skipTimes(16);
await page.getByRole('img').first().waitFor();
await shot('14-aton-question');

// Answer this ATON question incorrectly to capture the wrong-answer state.
await page.getByRole('radio').last().check();
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByText('Incorrect', { exact: true }).waitFor();
await shot('15-chart-question-wrong-answer');
await page.getByRole('button', { name: 'Next question' }).click();

// index 28: chart-nav-latlong-reading (custom lat/long grid diagram)
await skipTimes(7);
await page.getByRole('img').first().waitFor();
await shot('16-latlong-question');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// --- Arc 3: Anchoring / Mooring ---
await page
  .getByRole('listitem')
  .filter({ hasText: 'Anchoring & Mooring' })
  .getByRole('button', { name: 'Practice' })
  .click();

// index 0: anchor-type-cqr-plow (photo)
await page.getByRole('img').first().waitFor();
await shot('17-anchor-type-question');

// index 6: anchor-selection-wind-protection (anchorage-selection diagram)
await skipTimes(6);
await page.getByRole('img').first().waitFor();
await shot('18-anchorage-selection-question');

// index 12: anchor-scope-calc-basic (scope calculation, text)
await skipTimes(6);
await shot('19-scope-question');
await page.getByRole('radio').first().check();
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByText('Correct', { exact: true }).waitFor();
await shot('20-scope-explanation');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// 21. Missed Questions containing an Arc 3 item (the ATON question answered wrong above).
await page.getByRole('button', { name: /Missed questions/ }).click();
await shot('21-missed-questions-with-arc3');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// 22. Mock exam containing an Arc 3 item.
await page.getByRole('button', { name: 'Mock exam' }).click();
await shot('22-mock-exam-with-arc3');
await page.getByRole('button', { name: 'Abandon exam' }).click();

// 23. Moderate-width (~800px) layout with a chart question.
await page
  .getByRole('listitem')
  .filter({ hasText: 'Coastal Navigation & Charts' })
  .getByRole('button', { name: 'Practice' })
  .click();
await page.getByRole('img').first().waitFor();
await page.setViewportSize({ width: 800, height: 900 });
await page.waitForTimeout(100);
await shot('23-moderate-width-chart-question');

await browser.close();
console.log('captured screenshots');
