import { expect, test, type Page } from '@playwright/test';
import { answerCurrentPractice, signOut } from './helpers';

const home = (page: Page) => page.getByRole('region', { name: 'Home' });
const openPractice = (page: Page) =>
  page.getByRole('button', { name: 'Practice', exact: true }).click();

test('signed-out learners can use Google as the primary sign-in method', async ({ page }) => {
  await page.goto('/?signedOut=1');
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue with Google' }).click();
  await expect(home(page)).toBeVisible();
  // Success is silent now, so the positive signal is the absence of a failure
  // rather than a standing "Progress saved" label.
  await expect(page.getByText(/Progress not saved/)).toHaveCount(0);
});

test('an expired email callback shows a safe error, cleans the URL, and keeps sign-in usable', async ({ page }) => {
  await page.goto(
    '/asa-103-prep/?signedOut=1&seed=7#error=access_denied&error_code=otp_expired&error_description=Email+address+and+token+details&state=sensitive-state',
  );

  await expect(page.getByRole('alert')).toContainText('sign-in link is invalid or has expired');
  await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeEnabled();
  await expect(page.getByLabel('Email address')).toBeEnabled();
  await expect.poll(() => new URL(page.url()).pathname).toBe('/asa-103-prep/');
  expect(new URL(page.url()).searchParams.get('signedOut')).toBe('1');
  expect(new URL(page.url()).searchParams.get('seed')).toBe('7');
  expect(new URL(page.url()).hash).toBe('');
  expect(page.url()).not.toContain('error');
  expect(page.url()).not.toContain('sensitive-state');

  await page.getByLabel('Email address').fill('learner@example.test');
  await page.getByRole('button', { name: 'Send code' }).click();
  await page.getByLabel('Enter the code we sent to your email').fill('123456');
  await page.getByRole('button', { name: 'Verify', exact: true }).click();
  await expect(home(page)).toBeVisible();
});

test('typed email OTP is available as the fallback', async ({ page }) => {
  await page.goto('/?signedOut=1');
  await page.getByLabel('Email address').fill('learner@example.test');
  await page.getByRole('button', { name: 'Send code' }).click();
  await expect(page.getByLabel('Enter the code we sent to your email')).toBeVisible();
  await page.getByLabel('Enter the code we sent to your email').fill('123456');
  await page.getByRole('button', { name: 'Verify', exact: true }).click();
  await expect(home(page)).toBeVisible();
});

test('sign out returns to the authenticated-only entry screen', async ({ page }) => {
  await page.goto('/');
  await expect(home(page)).toBeVisible();
  await signOut(page);
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
});

test('a load failure never exposes an empty dashboard and can be retried', async ({ page }) => {
  await page.goto('/?loadError=1');
  await expect(page.getByRole('heading', { name: 'We couldn’t load your progress' })).toBeVisible();
  await expect(home(page)).not.toBeVisible();
  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(home(page)).toBeVisible();
});

test('a session-check failure is explicit and retryable rather than appearing signed out', async ({ page }) => {
  await page.goto('/?sessionError=1');
  await expect(page.getByRole('heading', { name: 'We couldn’t check your session' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).not.toBeVisible();
  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(home(page)).toBeVisible();
});

test('a failed save is visible, retryable, and blocks sign-out', async ({ page }) => {
  await page.goto('/?saveError=1');
  await openPractice(page);
  await page.getByRole('button', { name: 'Continue studying' }).click();
  await answerCurrentPractice(page, 'correct');
  await expect(page.getByText(/Progress not saved: Simulated cloud save failure/)).toBeVisible();

  await signOut(page);
  await expect(page.getByText(/Sign-out canceled until progress is saved/)).toBeVisible();
  await page.getByRole('button', { name: 'Retry', exact: true }).click();
  // The retry succeeding is now shown by the failure clearing, not by a label.
  await expect(page.getByText(/Progress not saved/)).toHaveCount(0);
  await expect(page.getByText(/Sign-out canceled/)).toHaveCount(0);
  await signOut(page);
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
});

test('sign-out removes study controls and drains a previously accepted slow save', async ({ page }) => {
  await page.goto('/?slowSave=1');
  await openPractice(page);
  await page.getByRole('button', { name: 'Continue studying' }).click();
  await answerCurrentPractice(page, 'correct');
  await signOut(page);

  await expect(page.getByRole('heading', { name: 'Finishing saves and signing out…' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit' })).not.toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
});

test('a gateway sign-out failure restores usable study controls and can be retried', async ({ page }) => {
  await page.goto('/?signOutError=1');
  await signOut(page);
  await expect(home(page)).toBeVisible();
  await expect(page.getByText(/Unable to sign out: Simulated sign-out failure/)).toBeVisible();

  await openPractice(page);
  await page.getByRole('button', { name: 'Continue studying' }).click();
  await expect(page.getByRole('region', { name: 'Practice question' })).toBeVisible();
  await signOut(page);
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
});
