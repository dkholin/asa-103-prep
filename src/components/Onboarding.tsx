import { useState } from 'react';
import {
  emptyOnboardingAnswers,
  type CurrentStatus,
  type ExamTiming,
  type OnboardingAnswers,
  type SailingExperience,
} from '../lib/onboarding';
import type { OnboardingState } from '../lib/useOnboarding';

/**
 * The optional three-question beta onboarding. Every question carries an
 * explicit "Prefer not to say" choice, and leaving a question untouched means
 * the same thing, so a learner is never required to answer anything to start
 * studying.
 */

const SKIP_VALUE = '';

const EXAM_TIMING_OPTIONS = [
  { value: 'within_2_weeks', label: 'Within 2 weeks' },
  { value: '2_4_weeks', label: 'In 2–4 weeks' },
  { value: '1_3_months', label: 'In 1–3 months' },
  { value: 'later_or_unscheduled', label: 'Later, or not scheduled yet' },
] as const satisfies readonly { value: ExamTiming; label: string }[];

const CURRENT_STATUS_OPTIONS = [
  { value: 'taking', label: 'Taking the course now' },
  { value: 'registered_not_started', label: 'Registered, not started yet' },
  { value: 'planning', label: 'Planning to take it' },
  { value: 'refreshing', label: 'Refreshing what I already learned' },
] as const satisfies readonly { value: CurrentStatus; label: string }[];

const SAILING_EXPERIENCE_OPTIONS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'under_1_year', label: 'Under a year' },
  { value: '1_3_years', label: '1–3 years' },
  { value: '3_plus_years', label: '3+ years' },
] as const satisfies readonly { value: SailingExperience; label: string }[];

export function Onboarding(props: {
  state: OnboardingState;
  onSubmit: (answers: OnboardingAnswers) => void;
  onRetry: () => void;
  onContinue: () => void;
}) {
  const [answers, setAnswers] = useState<OnboardingAnswers>(emptyOnboardingAnswers);
  const busy = props.state.phase === 'saving';

  return (
    <div className="auth-shell">
      <section className="card onboarding-card" aria-label="Beta onboarding">
        <h1>ASA 103 Prep</h1>
        <h2>Three optional questions</h2>
        <p className="muted">
          They help us shape the study material. Skip any of them — you can start studying either
          way.
        </p>

        <form
          className="onboarding-form"
          onSubmit={(event) => {
            event.preventDefault();
            props.onSubmit(answers);
          }}
        >
          <QuestionGroup
            legend="When are you taking ASA 103?"
            name="exam-timing"
            options={EXAM_TIMING_OPTIONS}
            value={answers.examTiming}
            onChange={(examTiming) => setAnswers({ ...answers, examTiming })}
          />
          <QuestionGroup
            legend="Where are you with the course?"
            name="current-status"
            options={CURRENT_STATUS_OPTIONS}
            value={answers.currentStatus}
            onChange={(currentStatus) => setAnswers({ ...answers, currentStatus })}
          />
          <QuestionGroup
            legend="How much sailing experience do you have?"
            name="sailing-experience"
            options={SAILING_EXPERIENCE_OPTIONS}
            value={answers.sailingExperience}
            onChange={(sailingExperience) => setAnswers({ ...answers, sailingExperience })}
          />

          <div className="actions">
            <button type="submit" disabled={busy}>
              {busy ? 'Saving…' : 'Start studying'}
            </button>
            <button
              type="button"
              className="secondary"
              disabled={busy}
              onClick={() => props.onSubmit(emptyOnboardingAnswers())}
            >
              Skip all
            </button>
          </div>
        </form>

        {props.state.phase === 'save-error' && (
          <p role="alert" className="auth-message">
            We couldn’t save your answers: {props.state.message}{' '}
            <button className="linklike" onClick={props.onRetry}>
              Retry
            </button>{' '}
            <button className="linklike" onClick={props.onContinue}>
              Continue without saving
            </button>
          </p>
        )}
      </section>
    </div>
  );
}

function QuestionGroup<T extends string>(props: {
  legend: string;
  name: string;
  options: readonly { value: T; label: string }[];
  value: T | null;
  onChange: (value: T | null) => void;
}) {
  return (
    <fieldset className="onboarding-question">
      <legend>{props.legend}</legend>
      {[...props.options, { value: SKIP_VALUE as T, label: 'Prefer not to say' }].map((option) => {
        const id = `${props.name}-${option.value || 'skip'}`;
        return (
          <div key={id} className="onboarding-choice">
            <input
              type="radio"
              id={id}
              name={props.name}
              checked={props.value === (option.value || null)}
              onChange={() => props.onChange(option.value === SKIP_VALUE ? null : option.value)}
            />
            <label htmlFor={id}>{option.label}</label>
          </div>
        );
      })}
    </fieldset>
  );
}
