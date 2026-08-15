import { describe, expect, it } from 'vitest';
import { mulberry32, prepareAttempt, shuffle, withShuffledChoices } from './shuffle';
import { QUESTIONS } from '../content/questions';
import type { Question } from '../content/types';

const sample = (n: number): Question[] => QUESTIONS.slice(0, n);

describe('shuffle', () => {
  it('returns a permutation: same members, no loss, no duplicates', () => {
    const input = Array.from({ length: 50 }, (_, i) => `id-${i}`);
    const out = shuffle(input, mulberry32(7));
    expect(out).toHaveLength(input.length);
    expect(new Set(out).size).toBe(input.length);
    expect([...out].sort()).toEqual([...input].sort());
  });

  it('does not mutate its input', () => {
    const input = [1, 2, 3, 4, 5];
    const copy = input.slice();
    shuffle(input, mulberry32(1));
    expect(input).toEqual(copy);
  });

  it('is deterministic for a fixed injected rng', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8];
    const a = shuffle(input, mulberry32(42));
    const b = shuffle(input, mulberry32(42));
    expect(a).toEqual(b);
    // Pinned expectation: guards against an accidental algorithm change.
    expect(a).toEqual([3, 8, 2, 1, 7, 6, 4, 5]);
    expect(a).not.toEqual(input);
  });

  it('produces different orders for different seeds', () => {
    const input = Array.from({ length: 30 }, (_, i) => i);
    const a = shuffle(input, mulberry32(1));
    const b = shuffle(input, mulberry32(2));
    expect(a).not.toEqual(b);
  });

  it('handles empty and single-element arrays', () => {
    expect(shuffle([], mulberry32(1))).toEqual([]);
    expect(shuffle(['only'], mulberry32(1))).toEqual(['only']);
  });
});

describe('withShuffledChoices', () => {
  it('keeps the correct choice id correct after reordering', () => {
    for (const q of QUESTIONS) {
      const shown = withShuffledChoices(q, mulberry32(q.id.length + 3));
      expect(shown.correctChoiceId).toBe(q.correctChoiceId);
      const correct = shown.choices.find((c) => c.id === q.correctChoiceId);
      expect(correct).toBeDefined();
      expect(correct!.text).toBe(q.choices.find((c) => c.id === q.correctChoiceId)!.text);
    }
  });

  it('keeps every choice id present exactly once', () => {
    const q = QUESTIONS[0];
    const shown = withShuffledChoices(q, mulberry32(11));
    expect(shown.choices.map((c) => c.id).sort()).toEqual(q.choices.map((c) => c.id).sort());
  });

  it('keeps whyWrong attached to its own choice id', () => {
    for (const q of QUESTIONS) {
      const shown = withShuffledChoices(q, mulberry32(5));
      for (const c of shown.choices) {
        const original = q.choices.find((o) => o.id === c.id)!;
        expect(c.text).toBe(original.text);
        expect(c.whyWrong).toBe(original.whyWrong);
      }
    }
  });

  it('actually moves the correct answer out of first position for some questions', () => {
    const positions = new Set<number>();
    for (const q of QUESTIONS.slice(0, 60)) {
      const shown = withShuffledChoices(q, mulberry32(q.prompt.length));
      positions.add(shown.choices.findIndex((c) => c.id === q.correctChoiceId));
    }
    // All four displayed positions are reachable.
    expect([...positions].sort()).toEqual([0, 1, 2, 3]);
  });

  it('does not mutate the source question', () => {
    const q = QUESTIONS[0];
    const before = q.choices.map((c) => c.id);
    withShuffledChoices(q, mulberry32(99));
    expect(q.choices.map((c) => c.id)).toEqual(before);
  });
});

describe('prepareAttempt', () => {
  it('returns every question exactly once', () => {
    const input = sample(20);
    const out = prepareAttempt(input, mulberry32(3));
    expect(out).toHaveLength(input.length);
    expect(new Set(out.map((q) => q.id)).size).toBe(input.length);
  });

  it('varies question order between attempts', () => {
    const input = sample(30);
    const a = prepareAttempt(input, mulberry32(1)).map((q) => q.id);
    const b = prepareAttempt(input, mulberry32(2)).map((q) => q.id);
    expect(a).not.toEqual(b);
  });

  it('preserves semantic correctness for every prepared question', () => {
    const out = prepareAttempt(sample(40), mulberry32(17));
    for (const shown of out) {
      const original = QUESTIONS.find((q) => q.id === shown.id)!;
      expect(shown.correctChoiceId).toBe(original.correctChoiceId);
      const correctText = shown.choices.find((c) => c.id === shown.correctChoiceId)!.text;
      const originalText = original.choices.find((c) => c.id === original.correctChoiceId)!.text;
      expect(correctText).toBe(originalText);
    }
  });
});
