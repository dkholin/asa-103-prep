import { describe, expect, it } from 'vitest';
import {
  answeredCount,
  emptyOnboardingAnswers,
  onboardingBuckets,
  parseOnboardingRow,
  toOnboardingRow,
} from './onboarding';

describe('onboarding row parsing', () => {
  it('accepts a fully answered row', () => {
    expect(
      parseOnboardingRow({
        exam_timing: '2_4_weeks',
        current_status: 'registered_not_started',
        sailing_experience: '1_3_years',
      }),
    ).toEqual({
      examTiming: '2_4_weeks',
      currentStatus: 'registered_not_started',
      sailingExperience: '1_3_years',
    });
  });

  it('reads a SQL NULL as a skipped question rather than a missing row', () => {
    expect(
      parseOnboardingRow({ exam_timing: null, current_status: null, sailing_experience: null }),
    ).toEqual(emptyOnboardingAnswers());
  });

  it('fails closed on an unknown token, a wrong type, or a non-row', () => {
    expect(
      parseOnboardingRow({
        exam_timing: 'next_tuesday',
        current_status: null,
        sailing_experience: null,
      }),
    ).toBeNull();
    expect(
      parseOnboardingRow({ exam_timing: 3, current_status: null, sailing_experience: null }),
    ).toBeNull();
    expect(parseOnboardingRow(null)).toBeNull();
    expect(parseOnboardingRow('2_4_weeks')).toBeNull();
  });

  it('round-trips through the stored row shape', () => {
    const answers = {
      examTiming: 'within_2_weeks',
      currentStatus: null,
      sailingExperience: '3_plus_years',
    } as const;
    expect(parseOnboardingRow(toOnboardingRow(answers))).toEqual(answers);
  });
});

describe('onboarding analytics buckets', () => {
  it('reports a skipped question as the fixed skipped token, never as an empty value', () => {
    expect(
      onboardingBuckets({
        examTiming: '1_3_months',
        currentStatus: null,
        sailingExperience: 'beginner',
      }),
    ).toEqual({
      exam_timing: '1_3_months',
      current_status: 'skipped',
      sailing_experience: 'beginner',
    });
    expect(onboardingBuckets(emptyOnboardingAnswers())).toEqual({
      exam_timing: 'skipped',
      current_status: 'skipped',
      sailing_experience: 'skipped',
    });
  });

  it('counts only the questions the learner actually answered', () => {
    expect(answeredCount(emptyOnboardingAnswers())).toBe(0);
    expect(
      answeredCount({
        examTiming: 'later_or_unscheduled',
        currentStatus: 'refreshing',
        sailingExperience: null,
      }),
    ).toBe(2);
  });
});
