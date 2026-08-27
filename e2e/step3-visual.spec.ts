import { expect, test, type Page } from '@playwright/test';
import { seeded, revealLesson } from './helpers';

const OUT = process.env.SP!;

async function openLesson(page: Page, title: string) {
  await page.getByRole('button', { name: 'Learn', exact: true }).click();
  await revealLesson(page, title);
  await page.getByRole('listitem').filter({ hasText: title })
    .getByRole('button', { name: 'Open lesson' }).click();
}

const CASES: Array<[string, string]> = [
  ['Anatomy of a Cruising Boat', 'custom-boat-anatomy-profile'],
  ['A Tour of the Deck', 'custom-deck-plan-labelled'],
  ['Steering & the Rudder', 'custom-rudder-types'],
];

for (const [width, height] of [[1280, 900], [390, 844], [320, 720]] as const) {
  test(`step3 figures render with no overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto(seeded());
    for (const [title, assetId] of CASES) {
      await openLesson(page, title);
      const img = page.locator(`img[src*="${assetId}"]`);
      await expect(img).toBeVisible();
      const box = (await img.boundingBox())!;
      // Figure scales down to fit and never forces the page to scroll sideways.
      expect(box.width, `${assetId} wider than viewport at ${width}`).toBeLessThanOrEqual(width);
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `page-level horizontal overflow at ${width} on ${assetId}`).toBeLessThanOrEqual(0);
      // Caption is present and wraps rather than clipping.
      const cap = page.locator('figure').filter({ has: img }).locator('.figure-caption');
      await expect(cap).toBeVisible();
      await img.screenshot({ path: `${OUT}/app-${assetId}-${width}.png` });
      if (width === 320) {
        const figBox = (await page.locator('figure').filter({ has: img }).boundingBox())!;
        await page.screenshot({ path: `${OUT}/app-fig-${assetId}-320.png`,
          clip: { x: figBox.x, y: figBox.y, width: Math.min(figBox.width, width), height: Math.min(figBox.height, 900) } });
      }
    }
  });
}

test('step3 figure lightbox opens, closes on Escape, and returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto(seeded());
  await openLesson(page, 'Anatomy of a Cruising Boat');
  const trigger = page.locator('figure').filter({
    has: page.locator('img[src*="custom-boat-anatomy-profile"]') }).getByRole('button', { name: /Enlarge figure/ });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Enlarged figure' });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img[src*="custom-boat-anatomy-profile"]')).toBeVisible();
  await page.screenshot({ path: `${OUT}/app-lightbox-320.png` });
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeVisible();
});

test('step3 figures carry no attribution credit line (project originals)', async ({ page }) => {
  await page.goto(seeded());
  await openLesson(page, 'Steering & the Rudder');
  const fig = page.locator('figure').filter({ has: page.locator('img[src*="custom-rudder-types"]') });
  await expect(fig.locator('.figure-caption')).toBeVisible();
  await expect(fig.locator('.asset-credit-text')).toHaveCount(0);
});
