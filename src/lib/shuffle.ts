import type { Question } from '../content/types';

/**
 * Shared randomization primitives.
 *
 * Everything that varies between attempts — mock-exam selection, question
 * order, and displayed choice order — goes through these helpers so there is
 * exactly one shuffling implementation in the project. The `rng` parameter is
 * the seam that makes all of it testable: tests inject a deterministic
 * generator instead of `Math.random`.
 */

/** Fisher-Yates. Returns a NEW array; the input is never mutated. */
export function shuffle<T>(items: T[], rng: () => number = Math.random): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

/**
 * Small deterministic PRNG (mulberry32). Used only by tests and by the
 * `?seed=` debug seam — production runs on `Math.random`.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The RNG the app actually uses. Normally `Math.random`; when the page URL
 * carries `?seed=<integer>` it returns a fresh seeded generator instead, which
 * is the deterministic seam end-to-end tests use to predict question and
 * choice order. Each call returns an independent generator, so a seeded run is
 * reproducible attempt for attempt.
 */
export function createRng(): () => number {
  if (typeof window === 'undefined') return Math.random;
  const raw = new URLSearchParams(window.location.search).get('seed');
  if (raw === null) return Math.random;
  const seed = Number.parseInt(raw, 10);
  if (!Number.isFinite(seed)) return Math.random;
  return mulberry32(seed);
}

/**
 * A display copy of a question with its choices in a random order.
 *
 * Only the array order changes: `correctChoiceId`, each choice's `id`, and each
 * choice's `whyWrong` travel with the choice itself, so scoring, the reveal,
 * the explanation and the why-wrong note all continue to key off semantic ids
 * and never off an array index or a displayed A/B/C/D label.
 */
export function withShuffledChoices(question: Question, rng: () => number = Math.random): Question {
  return { ...question, choices: shuffle(question.choices, rng) };
}

/**
 * Prepare one attempt: randomize question order AND each question's displayed
 * choice order, once. Callers hold the result in state for the life of the
 * attempt so nothing reshuffles on rerender.
 */
export function prepareAttempt(questions: Question[], rng: () => number = Math.random): Question[] {
  return shuffle(questions, rng).map((q) => withShuffledChoices(q, rng));
}
