import { expect, test, type Page } from '@playwright/test';
import { seeded, revealLesson } from './helpers';

/**
 * The two corrected Seamanship knot diagrams, in the lessons they illustrate.
 *
 * Both replaced SVGs whose geometry was rejected as unreliable for instruction,
 * so what is guarded here is that each one actually reaches the learner, scales
 * into a narrow viewport without forcing the page sideways, keeps its caption,
 * and enlarges. The topology itself is pinned in `src/content/content.test.ts`;
 * pixels are deliberately not asserted.
 */

async function openLesson(page: Page, title: string) {
  await page.getByRole('button', { name: 'Learn', exact: true }).click();
  await revealLesson(page, title);
  await page.getByRole('listitem').filter({ hasText: title })
    .getByRole('button', { name: 'Open lesson' }).click();
}

const CASES: Array<[string, string]> = [
  ['Loops & Stoppers', 'custom-figure8-stopper'],
  ['Fastening & Gripping Hitches', 'custom-round-turn-two-half-hitches'],
];

for (const [width, height] of [[1280, 900], [390, 844], [320, 720]] as const) {
  test(`seamanship knot figures render with no overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto(seeded());
    for (const [title, assetId] of CASES) {
      await openLesson(page, title);
      const img = page.locator(`img[src*="${assetId}"]`);
      await expect(img).toBeVisible();
      const box = (await img.boundingBox())!;
      expect(box.width, `${assetId} wider than viewport at ${width}`).toBeLessThanOrEqual(width);
      // A diagram squeezed to a sliver would defeat the point of drawing it.
      expect(box.height, `${assetId} collapsed at ${width}`).toBeGreaterThan(90);
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `page-level horizontal overflow at ${width} on ${assetId}`).toBeLessThanOrEqual(0);
      const fig = page.locator('figure').filter({ has: img });
      await expect(fig.locator('.figure-caption')).toBeVisible();
      // Project originals: a credit line here would be a provenance error.
      await expect(fig.locator('.asset-credit-text')).toHaveCount(0);
      // The alt text describes the rope path, not merely "knot diagram".
      const alt = (await img.getAttribute('alt'))!;
      expect(alt.length, `thin alt text on ${assetId}`).toBeGreaterThan(120);
      expect(alt).toMatch(/continuous rope/);
    }
  });
}

test('seamanship knot figures enlarge, close on Escape, and return focus', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto(seeded());
  const inFlow: Record<string, number> = {};
  for (const [title, assetId] of CASES) {
    await openLesson(page, title);
    inFlow[assetId] = (await page.locator(`img[src*="${assetId}"]`).boundingBox())!.width;
    const trigger = page.locator('figure')
      .filter({ has: page.locator(`img[src*="${assetId}"]`) })
      .getByRole('button', { name: /Enlarge figure/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Enlarged figure' });
    await expect(dialog).toBeVisible();
    const big = dialog.locator(`img[src*="${assetId}"]`);
    await expect(big).toBeVisible();
    // The enlargement has to actually enlarge: compare against the figure it
    // was opened from, not against a fixed number the figure already exceeds.
    const box = (await big.boundingBox())!;
    expect(box.width, `${assetId} lightbox is no larger than the figure itself`)
      .toBeGreaterThan(inFlow[assetId]);
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeVisible();
  }
});

test('the rejected knot geometry is gone from the served assets', async ({ page }) => {
  await page.goto(seeded());
  for (const [title, assetId] of CASES) {
    await openLesson(page, title);
    // Fetch exactly what the page asked for, so the deployment base is whatever
    // the app itself resolved rather than something this spec guesses.
    const src = (await page.locator(`img[src*="${assetId}"]`).getAttribute('src'))!;
    const res = await page.request.get(new URL(src, page.url()).toString());
    expect(res.status(), assetId).toBe(200);
    const svg = await res.text();
    expect(svg, `${assetId} still draws free-standing ellipses`).not.toMatch(/<(ellipse|circle)\b/);
    expect(svg).not.toContain('Figure-eight stopper knot');
    expect(svg).not.toContain('Two half hitches finish the bend');
    // The topology each drawing was checked against travels with the file.
    expect(svg).toMatch(/O1 U2 O3 U4 O2 U1 O4 U3|theta = -90 to 630 degrees/);
  }
});
