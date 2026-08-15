import { describe, expect, it } from 'vitest';
import {
  deserialize,
  emptyProgress,
  gradeMock,
  recordAnswer,
  recordMockResult,
  recordSkip,
  recommendTopic,
  serialize,
  topicReadiness,
} from './progress';
import { QUESTIONS } from '../content/questions';
import { TOPIC_IDS } from '../content/topics';

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
    expect(
      deserialize('{"version":1,"stats":null,"reviewQueue":[],"mockResults":[]}'),
    ).toEqual(emptyProgress());
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

describe('recommendTopic', () => {
  const byTopic = (t: string) => QUESTIONS.filter((q) => q.topic === t);

  it('recommends an unseen topic on fresh/empty progress', () => {
    const rec = recommendTopic(emptyProgress(), QUESTIONS);
    expect(TOPIC_IDS).toContain(rec.topic);
    expect(rec.reason).toBe('unseen');
  });

  it('favors a topic with several wrong answers over a topic answered correctly', () => {
    let p = emptyProgress();
    const weakTopicQs = byTopic('nav-lights').slice(0, 3);
    const strongTopicQs = byTopic('right-of-way').slice(0, 3);
    for (const q of weakTopicQs) p = recordAnswer(p, q.id, false);
    for (const q of strongTopicQs) p = recordAnswer(p, q.id, true);
    const rec = recommendTopic(p, QUESTIONS);
    expect(rec.topic).toBe('nav-lights');
  });

  it('keeps a completely unmastered topic ranked above a mostly-mastered topic with only a couple stale wrong answers', () => {
    let p = emptyProgress();
    // Mark most of "emergencies" correct, but leave two wrong (stale review items).
    const emerQs = byTopic('emergencies');
    emerQs.forEach((q, i) => {
      p = recordAnswer(p, q.id, i >= 2); // first two wrong, rest correct
    });
    // "flags" is left completely unseen.
    const rec = recommendTopic(p, QUESTIONS);
    expect(rec.topic).not.toBe('emergencies');
    expect(rec.reason).toBe('unseen');
  });

  it('gives an unresolved review-queue item a boost, reflected in the reason and count', () => {
    let p = emptyProgress();
    const allTopics = TOPIC_IDS;
    // Mark every topic's questions mostly-correct except one wrong answer in "anchoring".
    for (const t of allTopics) {
      const qs = byTopic(t);
      qs.forEach((q, i) => {
        p = recordAnswer(p, q.id, !(t === 'anchoring' && i === 0));
      });
    }
    const rec = recommendTopic(p, QUESTIONS);
    expect(rec.topic).toBe('anchoring');
    expect(rec.reason).toBe('review-queue');
    expect(rec.queueCount).toBe(1);
  });

  it('reflects a mock-exam miss (recorded via recordAnswer) in the recommendation', () => {
    let p = emptyProgress();
    // Simulate everything else being solid, then a single mock-exam miss in "flags".
    for (const t of TOPIC_IDS) {
      if (t === 'flags') continue;
      for (const q of byTopic(t)) p = recordAnswer(p, q.id, true);
    }
    for (const q of byTopic('flags')) p = recordAnswer(p, q.id, true);
    const missedFlag = byTopic('flags')[0];
    p = recordAnswer(p, missedFlag.id, false); // mock-exam-style miss
    const rec = recommendTopic(p, QUESTIONS);
    expect(rec.topic).toBe('flags');
    expect(rec.reason).toBe('review-queue');
  });
});
