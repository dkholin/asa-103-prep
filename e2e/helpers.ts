import { QUESTIONS, selectMockQuestions } from '../src/content/questions';
import type { Question } from '../src/content/types';

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

/** Question order the app uses for the Navigation Lights practice session. */
export const NAV_LIGHTS = QUESTIONS.filter((q) => q.topic === 'nav-lights');

/** Question order the app uses for the Right of Way practice session. */
export const RIGHT_OF_WAY = QUESTIONS.filter((q) => q.topic === 'right-of-way');

/** Question order the app uses for the Emergencies practice session. */
export const EMERGENCIES = QUESTIONS.filter((q) => q.topic === 'emergencies');

/** Question order the app uses for the Coastal Navigation & Charts practice session. */
export const CHART_NAV = QUESTIONS.filter((q) => q.topic === 'chart-nav');

/** Question order the app uses for the Anchoring & Mooring practice session. */
export const ANCHORING = QUESTIONS.filter((q) => q.topic === 'anchoring');

export const MOCK_QUESTIONS = selectMockQuestions().map(question);

export const QUESTIONS_TOTAL = QUESTIONS.length;
