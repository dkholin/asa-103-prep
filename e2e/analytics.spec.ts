import { expect, test, type Page } from '@playwright/test';
import {
  AUTH_MATERIAL,
  answerCurrentPractice,
  captured,
  capturedNames,
  capturedOnce,
  seeded,
  signOut,
} from './helpers';

/**
 * Firing invariants for the Phase 3 taxonomy, asserted against the in-page
 * analytics sink that E2E builds use instead of PostHog.
 */

const dashboard = (page: Page) => page.getByRole('heading', { name: 'Overall progress' });
const home = (page: Page) => page.getByRole('region', { name: 'Home' });

const startFlagsTopic = async (page: Page) => {
  if (!(await dashboard(page).isVisible())) {
    await page.getByRole('button', { name: 'Practice', exact: true }).click();
  }
  await page
    .locator('li.topic-row', { hasText: 'Signal Flags' })
    .getByRole('button', { name: 'Practice' })
    .click();
};

test('entry is captured once per page load and before the learner is identified', async ({ page }) => {
  await page.goto(seeded());
  await expect(home(page)).toBeVisible();

  await expect.poll(() => capturedNames(page)).toEqual([
    'beta_opened', '$identify', '$set', 'home_viewed',
  ]);
  const opened = await capturedOnce(page, 'beta_opened');
  expect(opened.properties).toMatchObject({ auth_state: 'signed-in' });

  const identify = (await captured(page)).find((event) => event.name === '$identify');
  expect(identify?.properties).toEqual({ distinct_id: '00000000-0000-4000-8000-000000000103' });
});

test('a signed-out visit reports anonymous entry and never identifies anyone', async ({ page }) => {
  await page.goto('/?signedOut=1');
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();

  await expect.poll(() => capturedNames(page)).toEqual(['beta_opened']);
  expect((await capturedOnce(page, 'beta_opened')).properties).toMatchObject({
    auth_state: 'signed-out',
  });
});

test('a failed session check still reports the entry, with an unknown auth state', async ({ page }) => {
  await page.goto('/?sessionError=1');
  await expect(page.getByRole('heading', { name: 'We couldn’t check your session' })).toBeVisible();

  // A Supabase outage is exactly when it matters most whether anyone showed up.
  await expect.poll(() => capturedNames(page)).toEqual(['beta_opened']);
  expect((await capturedOnce(page, 'beta_opened')).properties).toMatchObject({
    auth_state: 'unknown',
  });

  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(home(page)).toBeVisible();

  // The retry succeeds, but the page load already had its one entry event.
  const names = await capturedNames(page);
  expect(names.filter((n) => n === 'beta_opened')).toHaveLength(1);
  expect(names).toContain('$identify');
});

test('a reload re-emits only a fresh entry event', async ({ page }) => {
  await page.goto(seeded());
  await startFlagsTopic(page);
  await answerCurrentPractice(page, 'correct');
  await page.getByRole('button', { name: 'Back to Practice' }).click();
  expect(await capturedNames(page)).toContain('practice_started');

  await page.reload();
  await expect(home(page)).toBeVisible();
  await expect.poll(() => capturedNames(page)).toEqual([
    'beta_opened', '$identify', '$set', 'home_viewed',
  ]);
});

test('Home distinguishes a recommendation shown from the action followed', async ({ page }) => {
  await page.goto(seeded());
  await expect(home(page)).toBeVisible();

  const viewed = await capturedOnce(page, 'home_viewed');
  expect(viewed.properties).toMatchObject({
    learner_state: 'new',
    recommendation: 'start_learning',
    completed_lessons: 0,
    total_lessons: 45,
    destination_id: 'boat-cruising-basics-anatomy-of-a-cruising-boat',
  });
  expect(await capturedNames(page)).not.toContain('home_action_taken');

  await page.getByRole('button', { name: 'Start Learning' }).click();
  await expect(page.getByRole('heading', { name: 'Anatomy of a Cruising Boat' })).toBeVisible();
  const followed = await capturedOnce(page, 'home_action_taken');
  expect(followed.properties).toEqual(viewed.properties);
  await expect.poll(() => capturedNames(page)).toContain('lesson_started');
});

test('a topic session starts and completes exactly once and reports its own tally', async ({ page }) => {
  await page.goto(seeded());
  await startFlagsTopic(page);

  const started = await capturedOnce(page, 'practice_started');
  expect(started.properties).toMatchObject({
    mode: 'topic', topic: 'flags', question_count: 2, entry_point: 'practice',
  });

  const answered = await answerCurrentPractice(page, 'correct');
  const answeredEvent = await capturedOnce(page, 'question_answered');
  expect(answeredEvent.properties).toMatchObject({
    question_id: answered.id,
    topic: 'flags',
    correct: true,
    attempt: 1,
    mode: 'topic',
  });

  await page.getByRole('button', { name: 'Next question' }).click();
  await page.getByRole('button', { name: 'Skip' }).click();
  await expect(page.getByRole('heading', { name: 'Session complete' })).toBeVisible();

  const skipped = await capturedOnce(page, 'question_skipped');
  expect(skipped.properties).toMatchObject({ topic: 'flags', mode: 'topic' });

  const completed = await capturedOnce(page, 'practice_completed');
  expect(completed.properties).toMatchObject({
    mode: 'topic',
    topic: 'flags',
    answered: 1,
    correct: 1,
    incorrect: 0,
    skipped: 1,
  });
  expect(completed.properties?.duration_ms).toBeGreaterThanOrEqual(0);

  // Review is a different session type and must never be reported alongside it.
  expect(await capturedNames(page)).not.toContain('missed_review_started');
  expect(await capturedNames(page)).not.toContain('missed_review_completed');
});

test('abandoning a session emits no completion event', async ({ page }) => {
  await page.goto(seeded());
  await startFlagsTopic(page);
  await answerCurrentPractice(page, 'wrong');
  await page.getByRole('button', { name: 'Back to Practice' }).click();
  await expect(dashboard(page)).toBeVisible();

  const names = await capturedNames(page);
  expect(names).toContain('practice_started');
  expect(names).not.toContain('practice_completed');
});

test('re-entering the same topic starts a genuinely new session', async ({ page }) => {
  await page.goto(seeded());
  await startFlagsTopic(page);
  await page.getByRole('button', { name: 'Back to Practice' }).click();
  await startFlagsTopic(page);

  await expect
    .poll(() => capturedNames(page).then((names) => names.filter((n) => n === 'practice_started')))
    .toEqual(['practice_started', 'practice_started']);
});

test('a review session reports the review pair and never the topic pair', async ({ page }) => {
  await page.goto(seeded());
  await startFlagsTopic(page);
  const missed = await answerCurrentPractice(page, 'wrong');
  await page.getByRole('button', { name: 'Back to Practice' }).click();

  await page.getByRole('button', { name: /^Missed questions/ }).click();
  await page
    .locator('li.missed-row', { hasText: missed.prompt })
    .getByRole('button', { name: 'Review' })
    .click();

  const started = await capturedOnce(page, 'missed_review_started');
  expect(started.properties).toMatchObject({ mode: 'review', question_count: 1 });

  await answerCurrentPractice(page, 'correct');
  await page.getByRole('button', { name: 'Finish session' }).click();
  await expect(page.getByRole('heading', { name: 'Session complete' })).toBeVisible();

  const completed = await capturedOnce(page, 'missed_review_completed');
  expect(completed.properties).toMatchObject({
    mode: 'review',
    answered: 1,
    correct: 1,
    incorrect: 0,
    skipped: 0,
  });

  const names = await capturedNames(page);
  expect(names.filter((n) => n === 'practice_started')).toHaveLength(1); // the topic session only
  expect(names).not.toContain('practice_completed');

  // The review answer is still a question_answered, tagged as review.
  const reviewAnswer = (await captured(page))
    .filter((event) => event.name === 'question_answered')
    .at(-1);
  expect(reviewAnswer?.properties).toMatchObject({ mode: 'review', correct: true, attempt: 2 });
});

test('a mock attempt reports one start and one grade, with no per-question events', async ({ page }) => {
  await page.goto(seeded());
  await page.getByRole('button', { name: 'Mock exam' }).click();
  await expect(page.getByRole('region', { name: 'Mock exam question' })).toBeVisible();

  const started = await capturedOnce(page, 'mock_started');
  expect(started.properties).toMatchObject({ entry_point: 'mock_exam' });
  expect(started.properties?.question_count).toBeGreaterThan(0);

  page.once('dialog', (d) => d.accept());
  await page.getByRole('button', { name: 'Submit exam' }).click();
  await expect(page.getByRole('region', { name: 'Mock exam results' })).toBeVisible();

  const completed = await capturedOnce(page, 'mock_completed');
  expect(completed.properties).toMatchObject({
    score: 0,
    score_pct: 0,
    unanswered: started.properties?.question_count as number,
  });
  expect(await capturedNames(page)).not.toContain('question_answered');

  await page.getByRole('button', { name: 'Take another mock' }).click();
  await expect
    .poll(() => capturedNames(page).then((names) => names.filter((n) => n === 'mock_started')))
    .toHaveLength(2);
  await expect
    .poll(() => capturedNames(page).then((names) => names.filter((n) => n === 'mock_completed')))
    .toHaveLength(1);
});

test('two submissions in one frame still grade the mock exactly once', async ({ page }) => {
  await page.goto(seeded());
  await page.getByRole('button', { name: 'Mock exam' }).click();
  await expect(page.getByRole('region', { name: 'Mock exam question' })).toBeVisible();

  // Both activations run in a single task with nothing to yield to, which is
  // the case a state-based guard cannot see: React has not re-rendered between
  // them, so the second call's closure still reads an ungraded attempt.
  await page.evaluate(() => {
    window.confirm = () => true;
    const submit = [...document.querySelectorAll('button')].find(
      (button) => button.textContent?.trim() === 'Submit exam',
    ) as HTMLButtonElement;
    submit.click();
    submit.click();
  });
  await expect(page.getByRole('region', { name: 'Mock exam results' })).toBeVisible();

  await expect
    .poll(() => capturedNames(page).then((names) => names.filter((n) => n === 'mock_completed')))
    .toHaveLength(1);
});

test('no captured payload carries authentication material from a callback URL', async ({ page }) => {
  await page.goto(
    '/asa-103-prep/?signedOut=1&code=b7f1e9a2-auth#access_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.s1gnatur3&refresh_token=r3fr3sh&expires_in=3600&token_type=bearer&type=magiclink',
  );
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();

  // The tokens are still in the address bar — Supabase is what consumes them —
  // so this is the exact state in which analytics must not leak them.
  expect(page.url()).toContain('access_token');

  await page.getByRole('button', { name: 'Continue with Google' }).click();
  await expect(home(page)).toBeVisible();
  await startFlagsTopic(page);
  await answerCurrentPractice(page, 'correct');

  const payload = JSON.stringify(await captured(page));
  expect(payload.length).toBeGreaterThan(0);
  for (const pattern of AUTH_MATERIAL) expect(payload).not.toMatch(pattern);
  expect(payload).toContain('/asa-103-prep/');
});

test('sign-in reports the method and sign-out resets the analytics identity', async ({ page }) => {
  await page.goto('/?signedOut=1&newUser=1');
  await page.getByRole('button', { name: 'Continue with Google' }).click();
  await expect(home(page)).toBeVisible();

  expect((await capturedOnce(page, 'signup_started')).properties).toMatchObject({ method: 'google' });
  expect((await capturedOnce(page, 'signup_completed')).properties).toMatchObject({
    method: 'google',
  });

  await signOut(page);
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();

  const names = await capturedNames(page);
  expect(names.indexOf('$reset')).toBeGreaterThan(names.indexOf('$identify'));
  expect(names.indexOf('beta_opened')).toBeLessThan(names.indexOf('$identify'));
});

test('a returning sign-in reports no signup completion', async ({ page }) => {
  await page.goto('/?signedOut=1');
  await page.getByLabel('Email address').fill('learner@example.test');
  await page.getByRole('button', { name: 'Send code' }).click();
  await page.getByLabel('Enter the code we sent to your email').fill('12345678');
  await page.getByRole('button', { name: 'Verify', exact: true }).click();
  await expect(home(page)).toBeVisible();

  const names = await capturedNames(page);
  expect(names).toContain('signup_started');
  expect(names).not.toContain('signup_completed');
});

test('the sign-in card discloses analytics and masked replay before anyone signs in', async ({ page }) => {
  await page.goto('/?signedOut=1');
  const disclosure = page.getByTestId('analytics-disclosure');
  await expect(disclosure).toBeVisible();
  await expect(disclosure).toContainText('masked session replay');
  await expect(disclosure).toContainText('never sent to analytics');
});
