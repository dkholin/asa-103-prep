import { expect, test, type Page } from '@playwright/test';
import { MODULES, lessonsForModule } from '../src/content/learn';
import {
  NAV_LIGHTS,
  QUESTIONS_TOTAL,
  SEED,
  answerCurrentPractice,
  correctText,
  revealLesson,
  seeded,
  seededPracticeOrder,
} from './helpers';

const q1 = seededPracticeOrder('nav-lights', SEED)[0];

test('progress survives a browser reload', async ({ page }) => {
  await page.goto(seeded());
  await expect(page.getByTestId('overall-readiness')).toContainText(
    `0 of ${QUESTIONS_TOTAL} questions solid`,
  );

  await page.getByRole('button', { name: 'Continue studying' }).click();
  await page.getByRole('radio', { name: correctText(q1), exact: true }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Correct', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Back to dashboard' }).click();

  await expect(page.getByTestId('overall-readiness')).toContainText(
    `1 of ${QUESTIONS_TOTAL} questions solid`,
  );

  await page.reload();

  await expect(page.getByTestId('overall-readiness')).toContainText(
    `1 of ${QUESTIONS_TOTAL} questions solid`,
  );
  await expect(page.getByText(`In progress — 1/${NAV_LIGHTS.length}`)).toBeVisible();
});

/* ---------------------------------------------------------------------------
 * Learn state
 *
 * Learn state rides on the same snapshot as question progress, so these drive
 * the real save path — open, mark, reload — rather than asserting on storage.
 * Titles come from the content module so a lesson rename cannot leave a spec
 * quietly matching nothing.
 * ------------------------------------------------------------------------- */

const MOTORING = lessonsForModule('motoring');
const SAILS_TRIM = lessonsForModule('sails-trim');
const PUBLISHED_LESSONS = MODULES.filter((module) => module.status === 'published').flatMap(
  (module) => lessonsForModule(module.id),
);
const FIRST = MOTORING[0];
const THIRD = MOTORING[2];

const openLearn = async (page: Page) => {
  await page.getByRole('button', { name: 'Learn', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Learn', exact: true })).toBeVisible();
};

/** The state chip shown for one lesson on the Learn home outline. */
const lessonRow = (page: Page, title: string) =>
  page.getByRole('listitem').filter({ hasText: title });

/**
 * Learn home is an accordion, so a lesson row exists only while its module is
 * expanded. Both helpers expand first, which is a no-op when the module is
 * already the open one.
 */
const openLesson = async (page: Page, title: string) => {
  await revealLesson(page, title);
  await lessonRow(page, title).getByRole('button', { name: 'Open lesson' }).click();
  await expect(page.getByRole('heading', { name: title })).toBeVisible();
};

/** The state chip for one lesson, with its module expanded first. */
const revealedLessonRow = async (page: Page, title: string) => {
  await revealLesson(page, title);
  return lessonRow(page, title);
};

test('an opened lesson stays in progress across a reload', async ({ page }) => {
  await page.goto(seeded());
  await openLearn(page);
  await expect((await revealedLessonRow(page, FIRST.title)).locator('.chip')).toHaveText('Not started');

  await openLesson(page, FIRST.title);
  await expect(page.getByTestId('lesson-state')).toHaveText('In progress');
  await page.getByRole('button', { name: 'Back to Learn' }).click();
  await expect(page.getByTestId('module-progress-motoring')).toHaveText(
    `0 of ${MOTORING.length} lessons complete`,
  );

  await page.reload();
  await openLearn(page);
  await expect((await revealedLessonRow(page, FIRST.title)).locator('.chip')).toHaveText('In progress');
});

test('a completed lesson survives a reload and can be reversed', async ({ page }) => {
  await page.goto(seeded());
  await openLearn(page);
  await openLesson(page, FIRST.title);
  await page.getByRole('button', { name: 'Mark complete' }).click();
  await expect(page.getByTestId('lesson-state')).toHaveText('Completed');

  await page.reload();
  await openLearn(page);
  await expect((await revealedLessonRow(page, FIRST.title)).locator('.chip')).toHaveText('Completed');
  await expect(page.getByTestId('module-progress-motoring')).toHaveText(
    `1 of ${MOTORING.length} lessons complete`,
  );

  // Reversal is explicit, and it persists the same way completion does.
  await openLesson(page, FIRST.title);
  await page.getByRole('button', { name: 'Mark as not complete' }).click();
  await expect(page.getByTestId('lesson-state')).toHaveText('In progress');

  await page.reload();
  await openLearn(page);
  await expect((await revealedLessonRow(page, FIRST.title)).locator('.chip')).toHaveText('In progress');
  await expect(page.getByTestId('module-progress-motoring')).toHaveText(
    `0 of ${MOTORING.length} lessons complete`,
  );
});

test('Continue learning starts at lesson one and later resumes the lesson in progress', async ({ page }) => {
  await page.goto(seeded());
  await openLearn(page);

  // No prior activity: the first lesson in course order, with no special case.
  const card = page.getByTestId('continue-learning');
  await expect(card.getByRole('heading')).toHaveText(FIRST.title);
  await card.getByRole('button', { name: 'Start lesson' }).click();
  await expect(page.getByRole('heading', { name: FIRST.title })).toBeVisible();
  await page.getByRole('button', { name: 'Back to Learn' }).click();

  // A lesson left in progress is what Continue learning resumes.
  await openLesson(page, THIRD.title);
  await page.getByRole('button', { name: 'Back to Learn' }).click();
  await expect(card.getByRole('heading')).toHaveText(THIRD.title);

  await page.reload();
  await openLearn(page);
  await expect(card.getByRole('heading')).toHaveText(THIRD.title);
  await card.getByRole('button', { name: 'Resume lesson' }).click();
  await expect(page.getByRole('heading', { name: THIRD.title })).toBeVisible();

  // Completing it hands Continue learning back to the sequential rule, which
  // is the first *unfinished* lesson — lesson one, still only in progress —
  // not the lesson after the one just completed.
  await page.getByRole('button', { name: 'Mark complete' }).click();
  await page.getByRole('button', { name: 'Back to Learn' }).click();
  await expect(card.getByRole('heading')).toHaveText(FIRST.title);

  // The card and the outline are on one screen, so they must agree: lesson one
  // is in progress, so the card resumes it rather than offering to start it.
  await expect((await revealedLessonRow(page, FIRST.title)).locator('.chip')).toHaveText('In progress');
  await expect(card.getByRole('button')).toHaveText('Resume lesson');
});

test('Continue learning crosses published modules and ends in a module-neutral state', async ({ page }) => {
  const completedMotoring = Object.fromEntries(MOTORING.map((lesson) => [lesson.id, 'completed']));
  await page.addInitScript(({ key, lessons }) => {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, JSON.stringify({
      version: 1,
      stats: {},
      reviewQueue: [],
      mockResults: [],
      learn: { lessons },
    }));
  }, { key: PROGRESS_KEY, lessons: completedMotoring });
  await page.goto(seeded());
  await openLearn(page);

  const card = page.getByTestId('continue-learning');
  await expect(card.getByRole('heading')).toHaveText(SAILS_TRIM[0].title);
  await expect(card.getByRole('button')).toHaveText('Start lesson');

  await openLesson(page, SAILS_TRIM[3].title);
  await page.getByRole('button', { name: 'Back to Learn' }).click();
  await expect(card.getByRole('heading')).toHaveText(SAILS_TRIM[3].title);
  await expect(card.getByRole('button')).toHaveText('Resume lesson');

  // Derived from the catalogue, not from a hard-coded pair of modules: the
  // terminal state means "every published lesson", so publishing a third
  // module must widen this seed automatically rather than break the test.
  const allCompleted = Object.fromEntries(
    PUBLISHED_LESSONS.map((lesson) => [lesson.id, 'completed']),
  );
  await page.evaluate(({ key, lessons }) => {
    localStorage.setItem(key, JSON.stringify({
      version: 1,
      stats: {},
      reviewQueue: [],
      mockResults: [],
      learn: { lessons },
    }));
  }, { key: PROGRESS_KEY, lessons: allCompleted });
  await page.reload();
  await openLearn(page);
  await expect(page.getByTestId('continue-learning').getByRole('heading')).toHaveText(
    'All available lessons complete',
  );
});

test('Reset progress clears Learn state', async ({ page }) => {
  await page.goto(seeded());
  await openLearn(page);
  await openLesson(page, FIRST.title);
  await page.getByRole('button', { name: 'Mark complete' }).click();
  await page.getByRole('button', { name: 'Back to Learn' }).click();
  await expect(page.getByTestId('module-progress-motoring')).toHaveText(
    `1 of ${MOTORING.length} lessons complete`,
  );

  await page.getByRole('button', { name: 'Practice', exact: true }).click();
  page.on('dialog', (d) => d.accept());
  await page.getByRole('button', { name: 'Reset progress' }).click();

  await openLearn(page);
  await expect(page.getByTestId('module-progress-motoring')).toHaveText(
    `0 of ${MOTORING.length} lessons complete`,
  );
  await expect((await revealedLessonRow(page, FIRST.title)).locator('.chip')).toHaveText('Not started');

  // And it is the stored snapshot that was cleared, not just the rendered view.
  await page.reload();
  await openLearn(page);
  await expect((await revealedLessonRow(page, FIRST.title)).locator('.chip')).toHaveText('Not started');
  await expect(page.getByTestId('continue-learning').getByRole('heading')).toHaveText(FIRST.title);
});

/**
 * The zero-write invariant.
 *
 * `useCloudProgress.updateProgress` persists the whole snapshot and flips the
 * header to "Saving progress…" on every call, so a re-open that changes
 * nothing must not call it. That guard lives in `LessonView`, and deleting it
 * leaves every unit and browser assertion green — the damage is an extra
 * network write and a flashing header, not a wrong value.
 *
 * Writes are counted at `Storage.prototype.setItem`, because the fake
 * gateway's `saveProgress` is the only thing that writes this key. The DOM's
 * saving state is deliberately not used: React can batch it away before paint,
 * which makes a DOM-based version of this test report "no save" for a save
 * that really happened, and pass every negative assertion vacuously.
 */
const PROGRESS_KEY = 'asa103.e2e.fake-cloud-progress.v1';

test('opening a lesson costs a cloud write only when the snapshot changes', async ({ page }) => {
  await page.addInitScript((key) => {
    const counted: string[] = [];
    (window as unknown as { __writes: string[] }).__writes = counted;
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (k: string, v: string) {
      if (k === key) counted.push(v);
      return original.call(this, k, v);
    };
  }, PROGRESS_KEY);

  await page.goto(seeded());
  const writes = () =>
    page.evaluate(() => (window as unknown as { __writes: string[] }).__writes.length);

  /** Writes caused by `action`, settled. */
  const writesFor = async (action: () => Promise<void>) => {
    const before = await writes();
    await action();
    // The save path is async; poll until it settles rather than sampling once.
    await expect.poll(async () => (await writes()) - before).toBeGreaterThanOrEqual(0);
    await page.waitForTimeout(300);
    return (await writes()) - before;
  };

  // Positive control on the pre-existing study path. If this is 0 the counter
  // is not observing writes at all, and every "no write" below is meaningless.
  await page.getByRole('button', { name: 'Continue studying' }).click();
  const control = await writesFor(async () => {
    await answerCurrentPractice(page, 'correct');
  });
  expect(control, 'write counter observed nothing: the instrument is broken').toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Back to dashboard' }).click();

  await openLearn(page);
  await revealLesson(page, FIRST.title);
  const open = () =>
    lessonRow(page, FIRST.title).getByRole('button', { name: 'Open lesson' }).click();

  expect(await writesFor(async () => {
    await open();
    await expect(page.getByTestId('lesson-state')).toHaveText('In progress');
  }), 'a first open must persist the new lesson state').toBe(1);

  expect(await writesFor(async () => {
    await page.getByRole('button', { name: 'Back to Learn' }).click();
    await open();
    await expect(page.getByTestId('lesson-state')).toHaveText('In progress');
  }), 'a re-open that changes nothing must not write').toBe(0);

  expect(await writesFor(async () => {
    await page.getByRole('button', { name: 'Mark complete' }).click();
    await expect(page.getByTestId('lesson-state')).toHaveText('Completed');
  }), 'marking complete must persist').toBe(1);

  expect(await writesFor(async () => {
    await page.getByRole('button', { name: 'Back to Learn' }).click();
    await open();
    await expect(page.getByTestId('lesson-state')).toHaveText('Completed');
  }), 're-opening a completed lesson must neither write nor downgrade it').toBe(0);

  // A different lesson genuinely changes lastLessonId, so it must still write.
  expect(await writesFor(async () => {
    await page.getByRole('button', { name: 'Next lesson' }).click();
    await expect(page.getByTestId('lesson-state')).toHaveText('In progress');
  }), 'opening a different lesson must persist').toBe(1);
});
