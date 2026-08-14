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

export function serialize(p: Progress): string {
  return JSON.stringify(p);
}

/** Parse stored progress; any corrupt/foreign/missing payload falls back to empty progress. */
export function deserialize(raw: string | null): Progress {
  if (!raw) return emptyProgress();
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
      return emptyProgress();
    }
    return parsed as Progress;
  } catch {
    return emptyProgress();
  }
}
