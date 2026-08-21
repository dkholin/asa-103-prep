import type { OnboardingBuckets } from './analytics';

/**
 * The optional three-question beta onboarding.
 *
 * The answers are learner state, so Supabase owns them — in their own table,
 * not inside the `learner_progress` snapshot, so a malformed onboarding answer
 * can never invalidate a learner's study progress. Every question is skippable
 * and a skip is stored as SQL NULL.
 */

export const EXAM_TIMING = [
  'within_2_weeks',
  '2_4_weeks',
  '1_3_months',
  'later_or_unscheduled',
] as const;

export const CURRENT_STATUS = [
  'taking',
  'registered_not_started',
  'planning',
  'refreshing',
] as const;

export const SAILING_EXPERIENCE = [
  'beginner',
  'under_1_year',
  '1_3_years',
  '3_plus_years',
] as const;

export type ExamTiming = (typeof EXAM_TIMING)[number];
export type CurrentStatus = (typeof CURRENT_STATUS)[number];
export type SailingExperience = (typeof SAILING_EXPERIENCE)[number];

/** `null` means the learner skipped that question. */
export interface OnboardingAnswers {
  examTiming: ExamTiming | null;
  currentStatus: CurrentStatus | null;
  sailingExperience: SailingExperience | null;
}

export function emptyOnboardingAnswers(): OnboardingAnswers {
  return { examTiming: null, currentStatus: null, sailingExperience: null };
}

/** The token analytics uses for a question the learner chose not to answer. */
export const SKIPPED = 'skipped';

function token<T extends string>(value: T | null): string {
  return value ?? SKIPPED;
}

export function onboardingBuckets(answers: OnboardingAnswers): OnboardingBuckets {
  return {
    exam_timing: token(answers.examTiming),
    current_status: token(answers.currentStatus),
    sailing_experience: token(answers.sailingExperience),
  };
}

export function answeredCount(answers: OnboardingAnswers): number {
  return [answers.examTiming, answers.currentStatus, answers.sailingExperience].filter(
    (value) => value !== null,
  ).length;
}

/** The exact row shape stored in `public.learner_onboarding`. */
export interface OnboardingRow {
  exam_timing: string | null;
  current_status: string | null;
  sailing_experience: string | null;
}

export function toOnboardingRow(answers: OnboardingAnswers): OnboardingRow {
  return {
    exam_timing: answers.examTiming,
    current_status: answers.currentStatus,
    sailing_experience: answers.sailingExperience,
  };
}

function parseToken<T extends string>(allowed: readonly T[], value: unknown): T | null | undefined {
  if (value === null || value === undefined) return null;
  return allowed.includes(value as T) ? (value as T) : undefined;
}

/**
 * Strict parser for the Supabase trust boundary: an unknown token is a
 * malformed row, not a skip, and returns null so the caller can distinguish it
 * from "no record yet" and simply not show onboarding.
 */
export function parseOnboardingRow(row: unknown): OnboardingAnswers | null {
  if (typeof row !== 'object' || row === null) return null;
  const candidate = row as Partial<OnboardingRow>;
  const examTiming = parseToken(EXAM_TIMING, candidate.exam_timing);
  const currentStatus = parseToken(CURRENT_STATUS, candidate.current_status);
  const sailingExperience = parseToken(SAILING_EXPERIENCE, candidate.sailing_experience);
  if (examTiming === undefined || currentStatus === undefined || sailingExperience === undefined) {
    return null;
  }
  return { examTiming, currentStatus, sailingExperience };
}
