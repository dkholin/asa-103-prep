import { describe, expect, it } from 'vitest';
import {
  deserialize,
  emptyProgress,
  gradeMock,
  recordAnswer,
  recordMockResult,
  recordSkip,
  serialize,
  topicReadiness,
} from './progress';
import { QUESTIONS } from '../content/questions';

const q = (i: number) => QUESTIONS[i];

describe('recordAnswer', () => {
  it('adds a wrong answer to the review queue once', () => {
    let p = emptyProgress();
    p = recordAnswer(p, 'q1', false);
    p = recordAnswer(p, 'q1', false);
    expect(p.reviewQueue).toEqual(['q1']);
    expect(p.stats['q1']).toEqual({ attempts: 2, correct: 0, lastResult: 'incorrect' });
  });

  it('clears a question from the review queue when answered correctly', () => {
    let p = emptyProgress();
    p = recordAnswer(p, 'q1', false);
    p = recordAnswer(p, 'q1', true);
    expect(p.reviewQueue).toEqual([]);
    expect(p.stats['q1'].lastResult).toBe('correct');
  });

  it('does not enqueue correct answers', () => {
    const p = recordAnswer(emptyProgress(), 'q1', true);
    expect(p.reviewQueue).toEqual([]);
  });
});

describe('recordSkip', () => {
  it('enqueues a skipped question without counting an attempt', () => {
    const p = recordSkip(emptyProgress(), 'q1');
    expect(p.reviewQueue).toEqual(['q1']);
    expect(p.stats['q1'].attempts).toBe(0);
    expect(p.stats['q1'].lastResult).toBe('skipped');
  });

  it('does not duplicate a question already queued', () => {
    let p = recordSkip(emptyProgress(), 'q1');
    p = recordSkip(p, 'q1');
    expect(p.reviewQueue).toEqual(['q1']);
  });
});

describe('serialization', () => {
  it('round-trips progress through serialize/deserialize', () => {
    let p = emptyProgress();
    p = recordAnswer(p, 'a', true);
    p = recordSkip(p, 'b');
    p = recordMockResult(p, { finishedAt: 123, score: 4, total: 6 });
    expect(deserialize(serialize(p))).toEqual(p);
  });

  it('falls back to empty progress on corrupt JSON', () => {
    expect(deserialize('{not json')).toEqual(emptyProgress());
  });

  it('falls back to empty progress on missing or foreign payloads', () => {
    expect(deserialize(null)).toEqual(emptyProgress());
    expect(deserialize('{"version":99}')).toEqual(emptyProgress());
    expect(deserialize('"just a string"')).toEqual(emptyProgress());
  });
});

describe('gradeMock', () => {
  const questions = [q(0), q(1), q(2)];

  it('scores only correct answers and treats unanswered as incorrect', () => {
    const answers = {
      [q(0).id]: q(0).correctChoiceId,
      [q(1).id]: q(1).choices.find((c) => c.id !== q(1).correctChoiceId)!.id,
      // q(2) left unanswered
    };
    const g = gradeMock(questions, answers);
    expect(g.score).toBe(1);
    expect(g.total).toBe(3);
    expect(g.perQuestion.find((r) => r.questionId === q(2).id)).toEqual({
      questionId: q(2).id,
      chosenChoiceId: null,
      correct: false,
    });
  });

  it('exposes no correctness information until grading is invoked', () => {
    // The mock-mode contract: an in-progress exam is just a map of chosen ids.
    // Correctness only exists on the object returned by gradeMock.
    const inProgress: Record<string, string | null> = { [q(0).id]: q(0).correctChoiceId };
    expect(JSON.stringify(inProgress)).not.toContain('correct');
    const g = gradeMock(questions, inProgress);
    expect(g.perQuestion[0].correct).toBe(true);
  });
});

describe('topicReadiness', () => {
  it('counts a question as mastered only when the last result is correct', () => {
    let p = emptyProgress();
    const first = QUESTIONS[0];
    p = recordAnswer(p, first.id, true);
    p = recordAnswer(p, first.id, false); // regression: last result now wrong
    const r = topicReadiness(p, QUESTIONS).find((t) => t.topic === first.topic)!;
    expect(r.mastered).toBe(0);
    expect(r.attempted).toBe(1);
  });

  it('covers every topic present in the bank', () => {
    const r = topicReadiness(emptyProgress(), QUESTIONS);
    const total = r.reduce((n, t) => n + t.total, 0);
    expect(total).toBe(QUESTIONS.length);
  });
});
