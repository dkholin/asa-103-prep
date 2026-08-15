import { describe, expect, it } from 'vitest';
import {
  MOCK_EXAM_SIZE,
  QUESTIONS,
  mockTopicAllocation,
  selectMockQuestions,
} from './questions';
import { TOPIC_IDS } from './topics';
import { mulberry32 } from '../lib/shuffle';

const bankCount = (topic: string) => QUESTIONS.filter((q) => q.topic === topic).length;

describe('mock exam selection', () => {
  it('defaults to a 100-question exam', () => {
    expect(MOCK_EXAM_SIZE).toBe(100);
  });

  it('draws exactly MOCK_EXAM_SIZE unique question ids', () => {
    for (const seed of [1, 2, 3, 99]) {
      const ids = selectMockQuestions(MOCK_EXAM_SIZE, mulberry32(seed));
      expect(ids).toHaveLength(MOCK_EXAM_SIZE);
      expect(new Set(ids).size).toBe(MOCK_EXAM_SIZE);
    }
  });

  it('only draws ids that exist in the bank', () => {
    const known = new Set(QUESTIONS.map((q) => q.id));
    for (const id of selectMockQuestions(MOCK_EXAM_SIZE, mulberry32(5))) {
      expect(known).toContain(id);
    }
  });

  it('represents every topic at least once', () => {
    for (const seed of [1, 7, 21]) {
      const ids = selectMockQuestions(MOCK_EXAM_SIZE, mulberry32(seed));
      const topics = new Set(ids.map((id) => QUESTIONS.find((q) => q.id === id)!.topic));
      for (const t of TOPIC_IDS) {
        expect(topics, `seed ${seed} missing topic ${t}`).toContain(t);
      }
    }
  });

  it('allocates roughly proportionally to each topic share of the bank', () => {
    const alloc = mockTopicAllocation(MOCK_EXAM_SIZE);
    const total = [...alloc.values()].reduce((a, b) => a + b, 0);
    expect(total).toBe(MOCK_EXAM_SIZE);
    for (const t of TOPIC_IDS) {
      const got = alloc.get(t)!;
      const pool = bankCount(t);
      expect(got, `topic ${t}`).toBeGreaterThanOrEqual(1);
      expect(got, `topic ${t} exceeds its pool`).toBeLessThanOrEqual(pool);
      const ideal = (MOCK_EXAM_SIZE * pool) / QUESTIONS.length;
      // Largest-remainder allocation never strays more than one seat from the
      // ideal share, except where the min-one floor lifts a tiny topic.
      expect(Math.abs(got - Math.max(1, ideal)), `topic ${t} ideal ${ideal} got ${got}`).toBeLessThan(1.5);
    }
  });

  it('matches the per-topic allocation in the actual draw', () => {
    const alloc = mockTopicAllocation(MOCK_EXAM_SIZE);
    const ids = selectMockQuestions(MOCK_EXAM_SIZE, mulberry32(13));
    for (const t of TOPIC_IDS) {
      const drawn = ids.filter((id) => QUESTIONS.find((q) => q.id === id)!.topic === t).length;
      expect(drawn, `topic ${t}`).toBe(alloc.get(t));
    }
  });

  it('varies its draw and its order between attempts', () => {
    const a = selectMockQuestions(MOCK_EXAM_SIZE, mulberry32(1));
    const b = selectMockQuestions(MOCK_EXAM_SIZE, mulberry32(2));
    expect(a).not.toEqual(b);
    // Different content, not merely a reordering of the same 100.
    expect([...a].sort()).not.toEqual([...b].sort());
  });

  it('is reproducible for a fixed seed', () => {
    expect(selectMockQuestions(MOCK_EXAM_SIZE, mulberry32(8))).toEqual(
      selectMockQuestions(MOCK_EXAM_SIZE, mulberry32(8)),
    );
  });

  it('never exceeds the bank when asked for more than it holds', () => {
    const ids = selectMockQuestions(QUESTIONS.length + 50, mulberry32(4));
    expect(ids).toHaveLength(QUESTIONS.length);
    expect(new Set(ids).size).toBe(QUESTIONS.length);
  });

  it('still covers every topic on a small exam', () => {
    const ids = selectMockQuestions(TOPIC_IDS.length, mulberry32(6));
    expect(ids).toHaveLength(TOPIC_IDS.length);
    const topics = new Set(ids.map((id) => QUESTIONS.find((q) => q.id === id)!.topic));
    expect(topics.size).toBe(TOPIC_IDS.length);
  });
});

/**
 * Choice order is randomized at display time, so no question may depend on
 * where its choices happen to sit ("all of the above", "both A and C",
 * "the first option", …). Documented exceptions: none — every match below is
 * reviewed and none is a positional dependency.
 */
describe('positional-wording audit', () => {
  const PATTERNS: [string, RegExp][] = [
    ['all of the above', /\ball of the above\b/i],
    ['none of the above', /\bnone of the above\b/i],
    ['both X and Y', /\bboth\s+[a-d]\s+and\s+[a-d]\b/i],
    ['answer letter', /\banswers?\s+[a-d]\b/i],
    ['option letter', /\boptions?\s+[a-d]\b/i],
    ['choice letter', /\bchoices?\s+[a-d]\b/i],
    ['ordinal option', /\b(first|second|third|fourth|last)\s+(answer|option|choice)\b/i],
    ['the above', /\bthe above\b/i],
    ['roman numerals', /\bi+\s+and\s+i+\b/i],
    ['both of these', /\bboth of these\b/i],
  ];

  it('finds no positional dependency in any question field', () => {
    const hits: string[] = [];
    for (const q of QUESTIONS) {
      const fields: [string, string][] = [
        ['prompt', q.prompt],
        ['explanation', q.explanation],
      ];
      for (const c of q.choices) {
        fields.push([`choice ${c.id} text`, c.text]);
        if (c.whyWrong) fields.push([`choice ${c.id} whyWrong`, c.whyWrong]);
      }
      for (const [field, text] of fields) {
        for (const [name, pattern] of PATTERNS) {
          if (pattern.test(text)) hits.push(`${q.id} / ${field} / ${name}`);
        }
      }
    }
    expect(hits, `positional wording found:\n${hits.join('\n')}`).toEqual([]);
  });
});
