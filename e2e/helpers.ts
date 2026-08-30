import { expect, type Page } from '@playwright/test';
import { MOCK_EXAM_SIZE, QUESTIONS, selectMockQuestions } from '../src/content/questions';
import { LESSONS, MODULES } from '../src/content/learn';
import { mulberry32, prepareAttempt, withShuffledChoices } from '../src/lib/shuffle';
import type { Question, TopicId } from '../src/content/types';

export function question(id: string): Question {
  const q = QUESTIONS.find((x) => x.id === id);
  if (!q) throw new Error(`unknown question id ${id}`);
  return q;
}

export function correctText(q: Question): string {
  return q.choices.find((c) => c.id === q.correctChoiceId)!.text;
}

export function wrongChoice(q: Question) {
  return q.choices.find((c) => c.id !== q.correctChoiceId)!;
}

/** The question bank for one topic, in bank order (not the order the app shows). */
export function topicQuestions(topic: TopicId): Question[] {
  return QUESTIONS.filter((q) => q.topic === topic);
}

export const NAV_LIGHTS = topicQuestions('nav-lights');
export const RIGHT_OF_WAY = topicQuestions('right-of-way');
export const EMERGENCIES = topicQuestions('emergencies');
export const CHART_NAV = topicQuestions('chart-nav');
export const ANCHORING = topicQuestions('anchoring');

export const QUESTIONS_TOTAL = QUESTIONS.length;
export const MOCK_SIZE = MOCK_EXAM_SIZE;

/* ---------------------------------------------------------------------------
 * Deterministic seam
 *
 * The app reads `?seed=<int>` and, when present, drives every shuffle from a
 * seeded generator instead of Math.random (see src/lib/shuffle.ts#createRng).
 * The helpers below reproduce exactly what the app will show for a given seed,
 * mirroring the same call order the components use.
 * ------------------------------------------------------------------------- */

export const SEED = 20250815;

export const seeded = (seed: number = SEED) => `/?seed=${seed}`;

/** Open the authenticated Practice surface from the Home-first shell. */
export async function openPractice(page: Page) {
  await page.getByRole('button', { name: 'Practice', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
}

/** The order a topic-practice session will show for `seed`, choices included. */
export function seededPracticeOrder(topic: TopicId, seed: number = SEED): Question[] {
  return prepareAttempt(topicQuestions(topic), mulberry32(seed));
}

/** The exam a mock attempt will show for `seed`, choices included. */
export function seededMockOrder(seed: number = SEED): Question[] {
  const rng = mulberry32(seed);
  return selectMockQuestions(MOCK_EXAM_SIZE, rng)
    .map(question)
    .map((q) => withShuffledChoices(q, rng));
}

/* ---------------------------------------------------------------------------
 * Order-agnostic page helpers
 *
 * Most specs do not care which question comes first, only that whatever is on
 * screen behaves correctly. These read the prompt from the page and look the
 * question up, so they work under any shuffle.
 * ------------------------------------------------------------------------- */

export async function currentPrompt(page: Page): Promise<string> {
  const text = await page.locator('.question-body .prompt').first().textContent();
  return (text ?? '').trim();
}

export async function currentQuestion(page: Page): Promise<Question> {
  const prompt = await currentPrompt(page);
  const q = QUESTIONS.find((x) => x.prompt.trim() === prompt);
  if (!q) throw new Error(`on-screen prompt matches no question: ${prompt}`);
  return q;
}

/** Displayed 1-based position of a choice id in the currently rendered choice list. */
export async function displayedPositionOf(page: Page, choiceText: string): Promise<number> {
  const texts = await page.locator('.choices .choice-text').allTextContents();
  const idx = texts.findIndex((t) => t.trim() === choiceText.trim());
  if (idx < 0) throw new Error(`choice not displayed: ${choiceText}`);
  return idx + 1;
}

/** Answer the question currently on screen, correctly or not, in a practice session. */
export async function answerCurrentPractice(page: Page, mode: 'correct' | 'wrong') {
  const q = await currentQuestion(page);
  const choice = mode === 'correct' ? correctText(q) : wrongChoice(q).text;
  await page.getByRole('radio', { name: choice, exact: true }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  return q;
}

/** Skip forward inside a practice session until `prompt` is on screen. */
export async function skipToPrompt(page: Page, prompt: string, limit = 60) {
  for (let i = 0; i < limit; i++) {
    if ((await currentPrompt(page)) === prompt.trim()) return;
    await page.getByRole('button', { name: 'Skip' }).click();
  }
  expect(await currentPrompt(page), `never reached prompt: ${prompt}`).toBe(prompt.trim());
}

/* ---------------------------------------------------------------------------
 * Header and Learn accordion
 *
 * Sign out lives behind the Account menu, and Learn shows one module expanded
 * at a time, so a spec that wants either has a step to take first. These are
 * idempotent on purpose: `revealLesson` on the already-open module is a no-op,
 * which lets a spec call it before every lesson without tracking which module
 * happens to be expanded.
 * ------------------------------------------------------------------------- */

/** Open the header Account menu and sign out. */
export async function signOut(page: Page) {
  await page.getByRole('button', { name: 'Account' }).click();
  await page.getByRole('button', { name: 'Sign out' }).click();
}

/** Expand the Learn module named `title` unless it is already expanded. */
export async function expandModule(page: Page, title: string) {
  const toggle = page.getByRole('button', { name: title, exact: true });
  if ((await toggle.getAttribute('aria-expanded')) !== 'true') await toggle.click();
}

/** Expand whichever module owns `lessonTitle`, so its row is on screen. */
export async function revealLesson(page: Page, lessonTitle: string) {
  const lesson = LESSONS.find((l) => l.title === lessonTitle);
  if (!lesson) throw new Error(`unknown lesson title: ${lessonTitle}`);
  const module = MODULES.find((m) => m.id === lesson.moduleId);
  if (!module) throw new Error(`lesson ${lesson.id} names no module`);
  await expandModule(page, module.title);
}

/* ---------------------------------------------------------------------------
 * Analytics sink
 *
 * E2E builds route analytics to an in-page array instead of PostHog (see
 * src/main.tsx), so a browser test can assert exactly what would have been
 * sent. Identity calls appear in the same ordered list as `$identify`, `$set`,
 * and `$reset`, which is what makes ordering assertions possible.
 * ------------------------------------------------------------------------- */

export interface CapturedEvent {
  name: string;
  properties?: Record<string, unknown>;
}

export async function captured(page: Page): Promise<CapturedEvent[]> {
  return page.evaluate(
    () =>
      (window as unknown as { __analyticsEvents?: CapturedEvent[] }).__analyticsEvents ?? [],
  ) as Promise<CapturedEvent[]>;
}

export async function capturedNames(page: Page): Promise<string[]> {
  return (await captured(page)).map((event) => event.name);
}

export async function capturedOnce(page: Page, name: string): Promise<CapturedEvent> {
  const matches = (await captured(page)).filter((event) => event.name === name);
  expect(matches, `expected exactly one ${name}`).toHaveLength(1);
  return matches[0];
}

/** Every form authentication material could take in a captured payload. */
export const AUTH_MATERIAL = [/access_token/i, /refresh_token/i, /code=/i, /eyJ[A-Za-z0-9_-]+\./];
