import type { Question, TopicId } from '../content/types';

export type LastResult = 'correct' | 'incorrect' | 'skipped';

export interface QuestionStat {
  attempts: number;
  correct: number;
  lastResult: LastResult;
}

export interface MockResult {
  finishedAt: number;
  score: number;
  total: number;
}

export interface Progress {
  version: 1;
  stats: Record<string, QuestionStat>;
  /** Question ids missed or skipped, awaiting review. */
  reviewQueue: string[];
  mockResults: MockResult[];
}

export function emptyProgress(): Progress {
  return { version: 1, stats: {}, reviewQueue: [], mockResults: [] };
}

function withStat(
  p: Progress,
  questionId: string,
  update: (s: QuestionStat) => QuestionStat,
): Progress {
  const prev = p.stats[questionId] ?? { attempts: 0, correct: 0, lastResult: 'skipped' as LastResult };
  return { ...p, stats: { ...p.stats, [questionId]: update(prev) } };
}

/** Record an answered question. Correct answers clear it from the review queue; wrong ones enqueue it. */
export function recordAnswer(p: Progress, questionId: string, correct: boolean): Progress {
  const next = withStat(p, questionId, (s) => ({
    attempts: s.attempts + 1,
    correct: s.correct + (correct ? 1 : 0),
    lastResult: correct ? 'correct' : 'incorrect',
  }));
  const inQueue = next.reviewQueue.includes(questionId);
  if (correct && inQueue) {
    return { ...next, reviewQueue: next.reviewQueue.filter((id) => id !== questionId) };
  }
  if (!correct && !inQueue) {
    return { ...next, reviewQueue: [...next.reviewQueue, questionId] };
  }
  return next;
}

/** Record a skipped question; it joins the review queue without counting as an attempt. */
export function recordSkip(p: Progress, questionId: string): Progress {
  const next = withStat(p, questionId, (s) => ({
    ...s,
    lastResult: s.lastResult === 'correct' ? s.lastResult : 'skipped',
  }));
  if (next.reviewQueue.includes(questionId)) return next;
  return { ...next, reviewQueue: [...next.reviewQueue, questionId] };
}

export function recordMockResult(p: Progress, result: MockResult): Progress {
  return { ...p, mockResults: [...p.mockResults, result] };
}

export interface MockGrade {
  score: number;
  total: number;
  perQuestion: { questionId: string; chosenChoiceId: string | null; correct: boolean }[];
}

/** Grade a completed mock exam. Unanswered questions count as incorrect. */
export function gradeMock(
  questions: Question[],
  answers: Record<string, string | null>,
): MockGrade {
  const perQuestion = questions.map((q) => {
    const chosen = answers[q.id] ?? null;
    return { questionId: q.id, chosenChoiceId: chosen, correct: chosen === q.correctChoiceId };
  });
  return {
    score: perQuestion.filter((r) => r.correct).length,
    total: questions.length,
    perQuestion,
  };
}

export interface TopicReadiness {
  topic: TopicId;
  total: number;
  mastered: number; // last attempt was correct
  attempted: number;
}

/**
 * Simple documented readiness: a question is "mastered" when its most recent
 * result is correct. Topic readiness = mastered / total questions in topic.
 */
export function topicReadiness(p: Progress, questions: Question[]): TopicReadiness[] {
  const byTopic = new Map<TopicId, TopicReadiness>();
  for (const q of questions) {
    const entry = byTopic.get(q.topic) ?? { topic: q.topic, total: 0, mastered: 0, attempted: 0 };
    entry.total += 1;
    const stat = p.stats[q.id];
    if (stat && stat.attempts > 0) entry.attempted += 1;
    if (stat && stat.lastResult === 'correct') entry.mastered += 1;
    byTopic.set(q.topic, entry);
  }
  return [...byTopic.values()];
}

export interface TopicRecommendation {
  topic: TopicId;
  reason: 'unseen' | 'review-queue' | 'weak' | 'default';
  /** Number of this topic's questions currently sitting in the review queue. */
  queueCount: number;
}

/** A topic with no attempts yet counts as fully "weak" so it's never buried. */
function weakness(r: TopicReadiness): number {
  if (r.total === 0) return 0;
  return r.attempted === 0 ? 1 : 1 - r.mastered / r.total;
}

/**
 * Pick one topic to recommend next.
 *
 * One-sentence rule: score each topic by how unmastered it is (unseen topics
 * count as fully unmastered) plus a small flat bump if it has unresolved
 * review-queue items, and recommend the highest-scoring topic — so a topic
 * that's overwhelmingly unmastered or entirely unseen always outranks a
 * mostly-solid topic that merely has a couple of stale wrong answers, while
 * any open review items still give a topic a nudge up the list.
 */
export function recommendTopic(
  p: Progress,
  questions: Question[],
  readiness: TopicReadiness[] = topicReadiness(p, questions),
): TopicRecommendation {
  const queueCountByTopic = new Map<TopicId, number>();
  for (const id of p.reviewQueue) {
    const q = questions.find((x) => x.id === id);
    if (!q) continue;
    queueCountByTopic.set(q.topic, (queueCountByTopic.get(q.topic) ?? 0) + 1);
  }

  // A flat, capped bump for having review-queue items — enough to break ties
  // and favor a topic with open review items, but never enough to outweigh
  // a topic that's substantially less mastered overall.
  const REVIEW_QUEUE_BUMP = 0.15;

  const scored = readiness.map((r) => {
    const queueCount = queueCountByTopic.get(r.topic) ?? 0;
    const score = weakness(r) + (queueCount > 0 ? REVIEW_QUEUE_BUMP : 0);
    return { r, queueCount, score };
  });

  if (scored.length === 0) {
    return { topic: readiness[0]?.topic as TopicId, reason: 'default', queueCount: 0 };
  }

  const best = scored.reduce((a, b) => (b.score > a.score ? b : a));
  const reason: TopicRecommendation['reason'] =
    best.queueCount > 0 ? 'review-queue' : best.r.attempted === 0 ? 'unseen' : 'weak';
  return { topic: best.r.topic, reason, queueCount: best.queueCount };
}

export function serialize(p: Progress): string {
  return JSON.stringify(p);
}

function isNonnegativeInteger(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) >= 0;
}

function isQuestionStat(value: unknown): value is QuestionStat {
  if (typeof value !== 'object' || value === null) return false;
  const stat = value as Partial<QuestionStat>;
  return (
    isNonnegativeInteger(stat.attempts) &&
    isNonnegativeInteger(stat.correct) &&
    stat.correct <= stat.attempts &&
    (stat.lastResult === 'correct' || stat.lastResult === 'incorrect' || stat.lastResult === 'skipped')
  );
}

function isMockResult(value: unknown): value is MockResult {
  if (typeof value !== 'object' || value === null) return false;
  const result = value as Partial<MockResult>;
  return (
    isNonnegativeInteger(result.finishedAt) &&
    isNonnegativeInteger(result.score) &&
    isNonnegativeInteger(result.total) &&
    result.score <= result.total
  );
}

/** Strict parser used at trust boundaries that must distinguish invalid from empty. */
export function parseProgress(raw: string | null): Progress | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      (parsed as { version?: unknown }).version !== 1 ||
      typeof (parsed as { stats?: unknown }).stats !== 'object' ||
      (parsed as { stats?: unknown }).stats === null ||
      !Array.isArray((parsed as { reviewQueue?: unknown }).reviewQueue) ||
      !Array.isArray((parsed as { mockResults?: unknown }).mockResults)
    ) {
      return null;
    }
    const candidate = parsed as Progress;
    if (
      !Object.values(candidate.stats).every(isQuestionStat) ||
      !candidate.reviewQueue.every((id) => typeof id === 'string') ||
      new Set(candidate.reviewQueue).size !== candidate.reviewQueue.length ||
      !candidate.mockResults.every(isMockResult)
    ) {
      return null;
    }
    return candidate;
  } catch {
    return null;
  }
}

/** Parse legacy/test storage; corrupt, foreign, or missing payloads start empty. */
export function deserialize(raw: string | null): Progress {
  return parseProgress(raw) ?? emptyProgress();
}
