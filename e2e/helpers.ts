import { expect, type Page } from '@playwright/test';
import { MOCK_EXAM_SIZE, QUESTIONS, selectMockQuestions } from '../src/content/questions';
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
