// Captures the Arc 8 defect-remediation review screenshots against a running
// preview server (http://localhost:4173). Output: screenshots/25-*.png … 34-*.png
// Covers only the items changed by the remediation pass.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:4173';
mkdirSync('screenshots', { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const shot = async (name) => {
  await page.waitForFunction(() =>
    [...document.querySelectorAll('img')].every((i) => i.complete && i.naturalWidth > 0),
  );
  await page.screenshot({ path: `screenshots/${name}.png` });
};

const practice = async (topicLabel) => {
  await page
    .getByRole('listitem')
    .filter({ hasText: topicLabel })
    .getByRole('button', { name: 'Practice' })
    .click();
  await page.getByText('Question 1 of').waitFor();
};

/** Skip forward until the visible prompt contains `needle`. */
const skipUntil = async (needle, max = 40) => {
  for (let i = 0; i < max; i++) {
    const prompt = await page.locator('.prompt').first().innerText();
    if (prompt.includes(needle)) return;
    await page.getByRole('button', { name: 'Skip' }).click();
    await page.waitForTimeout(60);
  }
  throw new Error(`prompt containing "${needle}" not reached`);
};

await page.goto(BASE);
await page.evaluate(() => localStorage.clear());
await page.reload();
await page.getByRole('heading', { name: 'Overall progress' }).waitFor();

// --- Navigation Lights: the four re-sourced daylight figures ---
await practice('Navigation Lights');
await skipUntil('engaged in trawling');
await shot('25-lights-trawling-question');

await page.getByRole('button', { name: 'Back to dashboard' }).click();
await practice('Navigation Lights');
await skipUntil('power-driven vessel less than 50 meters');
await shot('26-lights-power-underway-question');

await skipUntil('under sail alone');
await shot('27-lights-sail-underway-question');

await skipUntil('lying at anchor');
await shot('28-lights-anchored-question');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// --- Anchoring: replaced Danforth photograph + corrected anchorage diagram ---
await practice('Anchoring & Mooring');
await skipUntil('two flat, sharp-edged flukes');
await shot('29-danforth-anchor-question');

await page.getByRole('button', { name: 'Back to dashboard' }).click();
await practice('Anchoring & Mooring');
await skipUntil('which spot is the better anchorage choice');
await shot('31-anchorage-selection-corrected');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// --- Sail Trim: redesigned heaving-to diagram ---
await practice('Sail Plan, Trim & Reefing');
await skipUntil('boat hove-to');
await shot('30-heaving-to-question');

// Wrong-answer explanation on a changed visual (the heaving-to diagram).
await page.getByRole('radio').first().check();
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByText('Incorrect', { exact: true }).waitFor();
await shot('33-heaving-to-wrong-answer-explanation');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// --- Unchanged control: mirrored north arrows on the crossing diagrams ---
await practice('Right of Way');
await page.getByRole('img').first().waitFor();
await shot('32-north-arrow-crossing-unchanged');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// --- Mock exam containing a changed nav-lights question ---
await page.getByRole('button', { name: 'Mock exam' }).click();
await page.getByRole('heading', { name: 'Mock exam' }).waitFor();
await shot('34-mock-exam-with-changed-visual');

await browser.close();
console.log('captured arc8 remediation screenshots');
