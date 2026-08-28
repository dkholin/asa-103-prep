import { expect, test, type Page } from '@playwright/test';
import { QUESTIONS } from '../src/content/questions';
import { lessonsForModule } from '../src/content/learn';
import { revealLesson, seeded } from './helpers';

/**
 * The persistent shell: the five header controls, the Account menu behind the
 * fifth, and the Learn accordion.
 *
 * The header used to spend a column on the learner's email address and a
 * permanent "Progress saved" line. Both are gone, so what is asserted here is
 * that they stay gone while the failure paths they shared a region with stay
 * loud.
 */

const BOAT = lessonsForModule('boat-cruising-basics');
const MOTORING = lessonsForModule('motoring');
const SAILS_TRIM = lessonsForModule('sails-trim');
const PROGRESS_KEY = 'asa103.e2e.fake-cloud-progress.v1';

const navNames = (page: Page) =>
  page.locator('.shell-controls').getByRole('button').allInnerTexts();

/** Every `aria-controls` on the page, with whether its target actually exists. */
const danglingControls = (page: Page) =>
  page.evaluate(() =>
    [...document.querySelectorAll('[aria-controls]')]
      .map((el) => ({
        name: (el.textContent ?? '').trim(),
        target: el.getAttribute('aria-controls')!,
      }))
      .filter(({ target }) => !document.getElementById(target)),
  );

/** Whether the document itself scrolls sideways — the overflow that breaks layout. */
const bodyOverflows = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);

test('the header shows five controls in order and no account identity', async ({ page }) => {
  await page.goto(seeded());

  expect(await navNames(page)).toEqual(['Learn', 'Practice', 'Review (0)', 'Exam', 'Account']);

  // The learner's email address is no longer part of the persistent chrome.
  await expect(page.getByText('learner@example.test')).toHaveCount(0);
  await expect(page.locator('.account-label')).toHaveCount(0);
  // Neither is the standing success line.
  await expect(page.getByText('Progress saved')).toHaveCount(0);
  await expect(page.getByText('Saving progress…')).toHaveCount(0);
});

test('each header control lights its own screen and Account never does', async ({ page }) => {
  await page.goto(seeded());
  const nav = page.getByRole('navigation', { name: 'Sections' });

  // "Practice" is a label over the unchanged dashboard view, landmark included.
  await expect(nav.getByRole('button', { name: 'Practice', exact: true })).toHaveClass(/active/);
  await expect(page.getByRole('region', { name: 'Dashboard' })).toBeVisible();

  await nav.getByRole('button', { name: 'Learn', exact: true }).click();
  await expect(nav.getByRole('button', { name: 'Learn', exact: true })).toHaveClass(/active/);

  // A lesson is reached through Learn, so Learn stays lit inside one.
  await revealLesson(page, MOTORING[0].title);
  await page
    .getByRole('listitem')
    .filter({ hasText: MOTORING[0].title })
    .getByRole('button', { name: 'Open lesson' })
    .click();
  await expect(nav.getByRole('button', { name: 'Learn', exact: true })).toHaveClass(/active/);

  await nav.getByRole('button', { name: /^Review/ }).click();
  await expect(page.getByRole('heading', { name: 'Missed questions' })).toBeVisible();

  await nav.getByRole('button', { name: 'Exam', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Practice Mock Exam' })).toBeVisible();

  // Account is a menu trigger, not a destination: it never takes the
  // content-screen active styling and never leaves the current screen.
  const account = page.getByRole('button', { name: 'Account' });
  await account.click();
  await expect(account).not.toHaveClass(/(^|\s)active(\s|$)/);
  await expect(page.getByRole('heading', { name: 'Practice Mock Exam' })).toBeVisible();
});

test('the Account menu opens, signs out, and dismisses by Escape or outside click', async ({ page }) => {
  await page.goto(seeded());
  const account = page.getByRole('button', { name: 'Account' });
  const signOut = page.getByRole('button', { name: 'Sign out' });

  await expect(account).toHaveAttribute('aria-expanded', 'false');
  await expect(signOut).toHaveCount(0);

  // Keyboard opens it, and focus lands on the first action rather than being
  // left behind on the trigger.
  await account.focus();
  await page.keyboard.press('Enter');
  await expect(account).toHaveAttribute('aria-expanded', 'true');
  await expect(signOut).toBeFocused();

  // Escape closes and hands focus back to the trigger.
  await page.keyboard.press('Escape');
  await expect(account).toHaveAttribute('aria-expanded', 'false');
  await expect(signOut).toHaveCount(0);
  await expect(account).toBeFocused();

  // A click outside closes it without signing anyone out.
  await account.click();
  await expect(signOut).toBeVisible();
  await page.getByRole('heading', { name: 'Overall progress' }).click();
  await expect(account).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();

  // And the one action it holds still signs out.
  await account.click();
  await signOut.click();
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
});

test('a save failure and an account message still surface in the header', async ({ page }) => {
  await page.goto('/?saveError=1');
  await page.getByRole('button', { name: 'Continue studying' }).click();
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: 'Submit' }).click();

  const status = page.locator('.cloud-status');
  await expect(status).toContainText('Progress not saved: Simulated cloud save failure');
  await expect(status.getByRole('button', { name: 'Retry', exact: true })).toBeVisible();

  // The account message rides the same region and must appear alongside it.
  await page.getByRole('button', { name: 'Account' }).click();
  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(status).toContainText('Sign-out canceled until progress is saved.');

  // Retrying clears the region entirely rather than swapping in a success line.
  await status.getByRole('button', { name: 'Retry', exact: true }).click();
  await expect(status).toHaveText('');
});

test('an account message surfaces even when the save state is healthy', async ({ page }) => {
  await page.goto('/?signOutError=1');
  await page.getByRole('button', { name: 'Account' }).click();
  await page.getByRole('button', { name: 'Sign out' }).click();

  // saveState is 'saved' here, so this proves accountMessage is not gated on
  // the error state.
  await expect(page.locator('.cloud-status')).toContainText(
    'Unable to sign out: Simulated sign-out failure',
  );
  await expect(page.getByText(/Progress not saved/)).toHaveCount(0);
});

/* ---------------------------------------------------------------------------
 * Learn accordion
 * ------------------------------------------------------------------------- */

const moduleToggle = (page: Page, title: string) =>
  page.getByRole('button', { name: title, exact: true });

test('Learn opens one module at a time and hides the rest of the course', async ({ page }) => {
  await page.goto(seeded());
  await page.getByRole('button', { name: 'Learn', exact: true }).click();

  // With no prior activity the first published module is the open one — now
  // Boat & Cruising Basics, which leads the course.
  await expect(moduleToggle(page, 'Boat & Cruising Basics')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(moduleToggle(page, 'Motoring')).toHaveAttribute('aria-expanded', 'false');
  await expect(moduleToggle(page, 'Sails & Trim')).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('button', { name: 'Open lesson' })).toHaveCount(BOAT.length);

  // Opening another closes the first: never two at once, never none by
  // accident.
  await moduleToggle(page, 'Sails & Trim').click();
  await expect(moduleToggle(page, 'Boat & Cruising Basics')).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  await expect(moduleToggle(page, 'Sails & Trim')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('button', { name: 'Open lesson' })).toHaveCount(SAILS_TRIM.length);

  // Collapsing leaves the header, and its progress chip, in place.
  await moduleToggle(page, 'Sails & Trim').click();
  await expect(page.getByRole('button', { name: 'Open lesson' })).toHaveCount(0);
  await expect(page.getByTestId('module-progress-boat-cruising-basics')).toBeVisible();
  await expect(page.getByTestId('module-progress-motoring')).toBeVisible();
  await expect(page.getByTestId('module-progress-sails-trim')).toBeVisible();
});

test('a collapsed module leaves nothing behind in the tab order', async ({ page }) => {
  await page.goto(seeded());
  await page.getByRole('button', { name: 'Learn', exact: true }).click();
  await moduleToggle(page, 'Boat & Cruising Basics').click();
  await expect(moduleToggle(page, 'Boat & Cruising Basics')).toHaveAttribute(
    'aria-expanded',
    'false',
  );

  // Not merely hidden: the rows are not in the document, so nothing focusable
  // is left for a keyboard learner to tab into.
  expect(await page.locator('.topic-list').count()).toBe(0);

  // Tabbing on from the collapsed header reaches the next module, never a
  // lesson button inside the closed one.
  await moduleToggle(page, 'Boat & Cruising Basics').focus();
  await page.keyboard.press('Tab');
  await expect(moduleToggle(page, 'Motoring')).toBeFocused();
});

test('a coming-soon module is compact, non-expandable, and not a button', async ({ page }) => {
  await page.goto(seeded());
  await page.getByRole('button', { name: 'Learn', exact: true }).click();

  // Seamanship is locally published for Step 1; Cruise Planning & Independence
  // remains coming soon. The same non-openable contract still applies.
  const comingSoon = page.locator('.card').filter({ hasText: 'Cruise Planning & Independence' });
  await expect(comingSoon.getByText('Coming soon')).toBeVisible();
  await expect(comingSoon.getByRole('button')).toHaveCount(0);
  await expect(comingSoon.getByRole('button', { name: 'Open lesson' })).toHaveCount(0);
  await expect(comingSoon.locator('.topic-list')).toHaveCount(0);
});

test('Learn reopens the module the learner was last reading in', async ({ page }) => {
  await page.goto(seeded());
  await page.getByRole('button', { name: 'Learn', exact: true }).click();

  await moduleToggle(page, 'Sails & Trim').click();
  await page
    .getByRole('listitem')
    .filter({ hasText: SAILS_TRIM[1].title })
    .getByRole('button', { name: 'Open lesson' })
    .click();
  await page.getByRole('button', { name: 'Back to Learn' }).click();

  // Returning from the lesson, and coming back to Learn from another screen,
  // both land on the module that lesson lives in — Motoring is not reinstated.
  await expect(moduleToggle(page, 'Sails & Trim')).toHaveAttribute('aria-expanded', 'true');
  await expect(moduleToggle(page, 'Motoring')).toHaveAttribute('aria-expanded', 'false');

  await page.getByRole('button', { name: 'Practice', exact: true }).click();
  await page.getByRole('button', { name: 'Learn', exact: true }).click();
  await expect(moduleToggle(page, 'Sails & Trim')).toHaveAttribute('aria-expanded', 'true');

  // And it is presentation state: a reload re-derives it from progress rather
  // than restoring a stored accordion.
  await page.reload();
  await page.getByRole('button', { name: 'Learn', exact: true }).click();
  await expect(moduleToggle(page, 'Sails & Trim')).toHaveAttribute('aria-expanded', 'true');
});

test('no toggle advertises a control that is not on the page', async ({ page }) => {
  await page.goto(seeded());

  // Both triggers render their panel only while expanded, so `aria-controls`
  // has to come and go with it — an id that resolves to nothing sends a screen
  // reader looking for an element that was never there.
  const account = page.getByRole('button', { name: 'Account' });
  await expect(account).toHaveAttribute('aria-expanded', 'false');
  await expect(account).not.toHaveAttribute('aria-controls', /.*/);
  expect(await danglingControls(page)).toEqual([]);

  await account.click();
  await expect(account).toHaveAttribute('aria-controls', 'account-menu-panel');
  expect(await danglingControls(page)).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(account).not.toHaveAttribute('aria-controls', /.*/);

  // The same on Learn, where one module is expanded and the rest are not.
  await page.getByRole('button', { name: 'Learn', exact: true }).click();
  await expect(moduleToggle(page, 'Boat & Cruising Basics')).toHaveAttribute(
    'aria-controls',
    'module-lessons-boat-cruising-basics',
  );
  await expect(moduleToggle(page, 'Sails & Trim')).not.toHaveAttribute('aria-controls', /.*/);
  expect(await danglingControls(page)).toEqual([]);

  // And after the accordion swaps which one is open, in both directions.
  await moduleToggle(page, 'Sails & Trim').click();
  await expect(moduleToggle(page, 'Boat & Cruising Basics')).not.toHaveAttribute(
    'aria-controls',
    /.*/,
  );
  await expect(moduleToggle(page, 'Sails & Trim')).toHaveAttribute(
    'aria-controls',
    'module-lessons-sails-trim',
  );
  expect(await danglingControls(page)).toEqual([]);

  await moduleToggle(page, 'Sails & Trim').click();
  expect(await danglingControls(page)).toEqual([]);
});

/* ---------------------------------------------------------------------------
 * Responsive
 * ------------------------------------------------------------------------- */

/** A review queue big enough to stretch the widest header control. */
const BIG_QUEUE = [
  ...QUESTIONS.map((q) => q.id),
  ...Array.from({ length: 200 }, (_, i) => `synthetic-review-${i}`),
].slice(0, 154);

/** How many rows the five header controls occupy, by distinct top edge. */
async function controlRows(page: Page): Promise<number> {
  return page.evaluate(() => {
    const controls = [
      ...document.querySelectorAll('.shell-nav button'),
      document.querySelector('.account-menu-trigger')!,
    ];
    return new Set(controls.map((c) => Math.round(c.getBoundingClientRect().top))).size;
  });
}

// Row counts are asserted, not just overflow: the controls always *fit* at
// these widths, so only the row count catches the sticky header growing back
// to the three-row height it had before the narrow-width sizing.
for (const [label, width, height, rows] of [
  ['desktop', 1280, 800, 1],
  ['390px', 390, 844, 1],
  ['320px', 320, 568, 2],
] as const) {
  test(`the header fits at ${label} with a large review count`, async ({ page }) => {
    await page.addInitScript(({ key, queue }) => {
      localStorage.setItem(key, JSON.stringify({
        version: 1,
        stats: {},
        reviewQueue: queue,
        mockResults: [],
      }));
    }, { key: PROGRESS_KEY, queue: BIG_QUEUE });
    await page.setViewportSize({ width, height });
    await page.goto(seeded());
    await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();

    // All five controls, in order, with the wide count intact.
    expect(await navNames(page)).toEqual([
      'Learn',
      'Practice',
      'Review (154)',
      'Exam',
      'Account',
    ]);
    expect(await bodyOverflows(page), 'the page scrolls sideways').toBe(false);
    expect(await controlRows(page), 'the controls wrapped onto an extra row').toBe(rows);

    // The popover is reachable and stays inside the viewport.
    await page.getByRole('button', { name: 'Account' }).click();
    const panel = page.locator('.account-menu-panel');
    await expect(panel).toBeVisible();
    const box = (await panel.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width + 0.5);
    expect(await bodyOverflows(page), 'the open menu pushes the page sideways').toBe(false);

    // The accordion is usable at the same width.
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Learn', exact: true }).click();
    await moduleToggle(page, 'Sails & Trim').click();
    await expect(moduleToggle(page, 'Sails & Trim')).toHaveAttribute('aria-expanded', 'true');
    expect(await bodyOverflows(page), 'Learn scrolls sideways').toBe(false);
  });
}
