import { expect, test, type Page } from '@playwright/test';
import { answerCurrentPractice, signOut } from './helpers';

const TEST_BETA_CODE = 'SAIL-T35T-C9DE';
const ACTIVE_KEY = 'asa103.beta-access.active.v1';
const BETA_PROGRESS_KEY = 'asa103.beta-progress.v1';
const CLOUD_PROGRESS_KEY = 'asa103.e2e.fake-cloud-progress.v1';

async function enterBeta(page: Page) {
  await page.getByLabel('Beta access code').fill(TEST_BETA_CODE);
  await page.getByRole('button', { name: 'Enter', exact: true }).click();
  await expect(page.getByText('Beta access · progress saved on this device')).toBeVisible();
}

async function reachOtp(page: Page) {
  await page.getByLabel('Email address').fill('learner@example.test');
  await page.getByRole('button', { name: 'Send code' }).click();
  await expect(page.getByLabel('Enter the code we sent to your email')).toBeVisible();
}

test('a session request that never resolves becomes a bounded actionable failure', async ({ page }) => {
  await page.goto('/?signedOut=1&sessionHang=1');
  await expect(page.getByRole('heading', { name: 'We couldn’t check your session' })).toBeVisible();
  await expect(page.getByText("We couldn't reach the sign-in service")).toBeVisible();
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start over' })).toBeVisible();
  await expect(page.getByLabel('Beta access code')).toBeVisible();
});

test('start over remains bounded when Supabase local sign-out never resolves', async ({ page }) => {
  await page.goto('/?signedOut=1&sessionHang=1&clearHang=1');
  await expect(page.getByRole('heading', { name: 'We couldn’t check your session' })).toBeVisible();
  await page.getByRole('button', { name: 'Start over' }).click();
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
});

test('a late start-over result cannot replace a newer successful sign-in', async ({ page }) => {
  await page.goto('/?signedOut=1&sessionHang=1&clearLate=1');
  await expect(page.getByRole('heading', { name: 'We couldn’t check your session' })).toBeVisible();
  await page.getByRole('button', { name: 'Start over' }).click();
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue with Google' }).click();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  await page.waitForTimeout(500);
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
});

test('a stalled callback is not observed by initializing analytics early', async ({ page }) => {
  await page.goto('/asa-103-prep/?signedOut=1&sessionHang=1&code=sensitive-auth-code');
  await expect(page.getByRole('heading', { name: 'We couldn’t check your session' })).toBeVisible();
  expect(await page.evaluate(() => window.__analyticsEvents)).toEqual([]);
  expect(page.url()).toContain('code=sensitive-auth-code');
});

test('a timed-out session resolving later cannot replace the recovery state', async ({ page }) => {
  await page.goto('/?signedOut=1&sessionTimeoutLate=1');
  await expect(page.getByRole('heading', { name: 'We couldn’t check your session' })).toBeVisible();
  await page.waitForTimeout(500);
  await expect(page.getByRole('heading', { name: 'We couldn’t check your session' })).toBeVisible();
});

test('retry wins even when the obsolete restore resolves afterward', async ({ page }) => {
  await page.goto('/?sessionOldLate=1');
  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  await page.waitForTimeout(500);
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
});

test('a newer auth event wins when the original restore resolves afterward', async ({ page }) => {
  await page.goto('/?signedOut=1&authNewerDuringRestore=1');
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  await page.waitForTimeout(500);
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
});

test('beta entry invalidates a pending Supabase restore', async ({ page }) => {
  await page.goto('/?sessionOldLate=1');
  await enterBeta(page);
  await page.waitForTimeout(500);
  await expect(page.getByText('Beta access · progress saved on this device')).toBeVisible();
});

test('OTP send and verification requests cannot wait forever', async ({ page }) => {
  await page.goto('/?signedOut=1&otpSendHang=1');
  await page.getByLabel('Email address').fill('learner@example.test');
  await page.getByRole('button', { name: 'Send code' }).click();
  await expect(page.getByRole('alert')).toContainText("couldn't reach the sign-in service");

  await page.goto('/?signedOut=1&otpVerifyHang=1');
  await reachOtp(page);
  await page.getByLabel('Enter the code we sent to your email').fill('123456');
  await page.getByRole('button', { name: 'Verify', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText("couldn't reach the sign-in service");
});

test('an obsolete OTP verification resolving late cannot escape beta mode', async ({ page }) => {
  await page.goto('/?signedOut=1&otpVerifyLate=1');
  await reachOtp(page);
  await page.getByLabel('Enter the code we sent to your email').fill('123456');
  await page.getByRole('button', { name: 'Verify', exact: true }).click({ noWaitAfter: true });
  await enterBeta(page);
  await page.waitForTimeout(500);
  await expect(page.getByText('Beta access · progress saved on this device')).toBeVisible();
});

test('a late obsolete OTP result cannot replace a newer successful cloud user', async ({ page }) => {
  await page.goto('/?signedOut=1&otpCloudRace=1');
  await reachOtp(page);
  const input = page.getByLabel('Enter the code we sent to your email');
  await input.fill('USERA');
  await page.getByRole('button', { name: 'Verify', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText("couldn't reach the sign-in service");
  await input.fill('USERB');
  await page.getByRole('button', { name: 'Verify', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  await page.waitForTimeout(500);
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  const identified = await page.evaluate(() => window.__analyticsEvents
    ?.filter((event) => event.name === '$identify')
    .map((event) => event.properties?.distinct_id));
  expect(identified).toContain('00000000-0000-4000-8000-00000000010b');
  expect(identified).not.toContain('00000000-0000-4000-8000-00000000010a');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  const restored = await page.evaluate(() => window.__analyticsEvents
    ?.filter((event) => event.name === '$identify')
    .map((event) => event.properties?.distinct_id));
  expect(restored).toContain('00000000-0000-4000-8000-00000000010b');
  expect(restored).not.toContain('00000000-0000-4000-8000-00000000010a');
});

test('a provider sign-out is still observed after an email OTP sign-in', async ({ page }) => {
  await page.goto('/?signedOut=1&providerSignOut=1');
  await reachOtp(page);
  await page.getByLabel('Enter the code we sent to your email').fill('123456');
  await page.getByRole('button', { name: 'Verify', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  // A revoked refresh token or another tab signing out must not leave this tab
  // showing a signed-in dashboard it can no longer save from.
  await page.evaluate(() => window.__fakeProviderSignOut?.());
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
});

test('a failed OTP attempt does not deafen the app to a later provider event', async ({ page }) => {
  await page.goto('/?signedOut=1&providerSignOut=1');
  await reachOtp(page);
  const input = page.getByLabel('Enter the code we sent to your email');
  await input.fill('INVALID');
  await page.getByRole('button', { name: 'Verify', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('That code is invalid');
  await input.fill('123456');
  await page.getByRole('button', { name: 'Verify', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  await page.evaluate(() => window.__fakeProviderSignOut?.());
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
});

test('a stalled save cannot strand the learner on the signing-out card', async ({ page }) => {
  await page.goto('/?saveHang=1');
  await page.getByRole('button', { name: 'Continue studying' }).click();
  await answerCurrentPractice(page, 'correct');
  await signOut(page);
  // Bounded: the card carries no controls, so it must resolve into a screen
  // that does rather than waiting on the save queue forever.
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible({ timeout: 10_000 });
  // And it must not claim the unfinished write succeeded: a write we gave up
  // waiting for is a failure the learner can see and retry.
  await expect(page.getByText(/Saving took too long/)).toBeVisible();
  await expect(page.getByText(/Sign-out canceled until progress is saved/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry', exact: true })).toBeVisible();
  await expect(page.locator('.cloud-saved')).toHaveCount(0);
});

test('a write the app gave up on does not stall every write behind it', async ({ page }) => {
  await page.goto('/?saveHangOnce=1');
  await page.getByRole('button', { name: 'Continue studying' }).click();
  await answerCurrentPractice(page, 'correct');
  await expect(page.getByText(/Saving took too long/)).toBeVisible({ timeout: 10_000 });
  // The abandoned write must not remain the queue tail, or every later answer
  // would sit in 'saving' forever and be lost without ever being reported.
  await page.getByRole('button', { name: /Next question|Finish session/ }).click();
  await answerCurrentPractice(page, 'correct');
  await expect(page.getByText(/Saving took too long/)).toHaveCount(0);
  await expect(page.getByText(/Progress not saved/)).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
});

test('invalid and expired OTPs use stable specific messages', async ({ page }) => {
  await page.goto('/?signedOut=1');
  await reachOtp(page);
  const input = page.getByLabel('Enter the code we sent to your email');
  await input.fill('INVALID');
  await page.getByRole('button', { name: 'Verify', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('That code is invalid');
  await input.fill('EXPIRED');
  await page.getByRole('button', { name: 'Verify', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('That code has expired');
});

test('rate limiting and resend cooldown are actionable', async ({ page }) => {
  await page.goto('/?signedOut=1&otpRateLimit=1');
  await page.getByLabel('Email address').fill('learner@example.test');
  await page.getByRole('button', { name: 'Send code' }).click();
  await expect(page.getByRole('alert')).toContainText('Too many attempts');
  await page.getByRole('button', { name: 'Send code' }).click();
  const resend = page.getByRole('button', { name: /Resend code/ });
  await expect(resend).toBeDisabled();
  await expect(resend).toBeEnabled({ timeout: 2_000 });
  await resend.click();
  await expect(page.getByRole('alert')).toContainText('We sent a new sign-in code');
});

test('beta rejects invalid codes and persists a valid session across reload', async ({ page }) => {
  await page.goto('/?signedOut=1');
  await page.getByLabel('Beta access code').fill('SAIL-WRNG-CODE');
  await page.getByRole('button', { name: 'Enter', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('not valid');
  await page.getByLabel('Beta access code').fill(TEST_BETA_CODE);
  await page.getByRole('button', { name: 'Enter', exact: true }).click();
  await page.reload();
  await expect(page.getByText('Beta access · progress saved on this device')).toBeVisible();
});

test('a beta session is revoked on reload when its derived id is no longer shipped', async ({ page }) => {
  await page.goto('/?signedOut=1');
  await enterBeta(page);
  await page.evaluate((key) => localStorage.setItem(key, JSON.stringify({ version: 1, codeId: 'revoked-id' })), ACTIVE_KEY);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), ACTIVE_KEY)).toBeNull();
});

test('beta progress survives reload and never writes the cloud namespace', async ({ page }) => {
  await page.goto('/?signedOut=1');
  const cloudSentinel = JSON.stringify({ sentinel: 'cloud-only' });
  await page.evaluate(([key, value]) => localStorage.setItem(key, value), [CLOUD_PROGRESS_KEY, cloudSentinel]);
  await enterBeta(page);
  await page.getByRole('button', { name: 'Continue studying' }).click();
  await answerCurrentPractice(page, 'correct');
  const betaBefore = await page.evaluate((key) => localStorage.getItem(key), BETA_PROGRESS_KEY);
  expect(betaBefore).toContain('"version":1');
  expect(await page.evaluate((key) => localStorage.getItem(key), CLOUD_PROGRESS_KEY)).toBe(cloudSentinel);
  await page.reload();
  expect(await page.evaluate((key) => localStorage.getItem(key), BETA_PROGRESS_KEY)).toBe(betaBefore);
  expect(await page.evaluate((key) => localStorage.getItem(key), CLOUD_PROGRESS_KEY)).toBe(cloudSentinel);
});

test('stalled progress and onboarding loads cannot block the study UI indefinitely', async ({ page }) => {
  await page.goto('/?loadHang=1');
  await expect(page.getByRole('heading', { name: 'We couldn’t load your progress' })).toBeVisible();
  await expect(page.getByLabel('Beta access code')).toBeVisible();

  await page.goto('/?onboarding=1&onboardingLoadHang=1');
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
});

test('progress transport errors never expose raw browser text', async ({ page }) => {
  await page.goto('/?loadNetwork=1');
  await expect(page.getByRole('heading', { name: 'We couldn’t load your progress' })).toBeVisible();
  await expect(page.getByText("We couldn't reach the progress service")).toBeVisible();
  await expect(page.getByText('Load failed')).toHaveCount(0);
});

test('a stalled onboarding save becomes a non-blocking recovery choice', async ({ page }) => {
  await page.goto('/?onboarding=1&onboardingSaveHang=1');
  await page.getByRole('button', { name: 'Start studying' }).click();
  await expect(page.getByRole('alert')).toContainText('We couldn’t save your answers');
  await page.getByRole('button', { name: 'Continue without saving' }).click();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
});

test('exit beta clears only the active marker and retains beta progress', async ({ page }) => {
  await page.goto('/?signedOut=1');
  await enterBeta(page);
  await page.getByRole('button', { name: 'Continue studying' }).click();
  await answerCurrentPractice(page, 'correct');
  await page.getByRole('button', { name: 'Beta access', exact: true }).click();
  await page.getByRole('button', { name: 'Exit beta access' }).click();
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), ACTIVE_KEY)).toBeNull();
  expect(await page.evaluate((key) => localStorage.getItem(key), BETA_PROGRESS_KEY)).not.toBeNull();
});

test('auth diagnostics never capture email, OTP, beta code, or raw errors', async ({ page }) => {
  await page.goto('/?signedOut=1');
  await reachOtp(page);
  await page.getByLabel('Enter the code we sent to your email').fill('INVALID');
  await page.getByRole('button', { name: 'Verify', exact: true }).click();
  const corpus = await page.evaluate(() => JSON.stringify(window.__analyticsEvents));
  expect(corpus).not.toContain('learner@example.test');
  expect(corpus).not.toContain('INVALID');
  expect(corpus).not.toContain(TEST_BETA_CODE);
  expect(corpus).not.toContain('Token is invalid');
});
