import { expect, test } from '@playwright/test';

test('production base URL survives reload and serves built assets', async ({ page, request }) => {
  await page.goto('/asa-103-prep/?seed=20250815');
  const entryHeading = process.env.E2E_BASE_URL ? 'Sign in to study' : 'Overall progress';
  await expect(page.getByRole('heading', { name: entryHeading })).toBeVisible();

  const scriptPath = await page.locator('script[type="module"]').getAttribute('src');
  const stylesheetPath = await page.locator('link[rel="stylesheet"]').getAttribute('href');

  expect(scriptPath).toMatch(/^\/asa-103-prep\/assets\/.*\.js$/);
  expect(stylesheetPath).toMatch(/^\/asa-103-prep\/assets\/.*\.css$/);

  for (const path of [
    scriptPath!,
    stylesheetPath!,
    '/asa-103-prep/assets/alpha-flag.svg',
    '/asa-103-prep/assets/noaa-buoy-beacon-basic.png',
  ]) {
    const response = await request.get(path);
    expect(response.ok(), `${path} should be served`).toBe(true);
  }

  await page.reload();
  await expect(page.getByRole('heading', { name: entryHeading })).toBeVisible();
});
