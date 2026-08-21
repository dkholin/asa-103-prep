import { useCallback, useEffect, useRef, useState } from 'react';
import type { AnalyticsClient } from './analytics';
import type { CloudGateway } from './cloud';
import {
  answeredCount,
  onboardingBuckets,
  type OnboardingAnswers,
} from './onboarding';

export type OnboardingState =
  | { phase: 'checking' }
  | { phase: 'needed' }
  | { phase: 'saving' }
  | { phase: 'save-error'; message: string }
  | { phase: 'done' };

const messageOf = (error: unknown) =>
  error instanceof Error ? error.message : 'The cloud service returned an unexpected error.';

/**
 * The optional beta onboarding, kept deliberately outside the Phase 2 progress
 * state machine.
 *
 * Onboarding is not study progress, so its failures are not study failures: a
 * load failure goes straight to the dashboard rather than blocking, and a save
 * failure is shown inline with a retry while the learner may still continue.
 * It is also outside the sign-out save gate for the same reason.
 */
export function useOnboarding(
  gateway: CloudGateway,
  analytics: AnalyticsClient,
  userId: string,
) {
  const [state, setState] = useState<OnboardingState>({ phase: 'checking' });
  const submitted = useRef(false);
  const lastAnswers = useRef<OnboardingAnswers | null>(null);

  useEffect(() => {
    let live = true;
    setState({ phase: 'checking' });
    void gateway
      .loadOnboarding(userId)
      .then((answers) => {
        if (!live) return;
        if (!answers) {
          setState({ phase: 'needed' });
          return;
        }
        analytics.setPersonProperties(onboardingBuckets(answers));
        setState({ phase: 'done' });
      })
      .catch(() => {
        if (live) setState({ phase: 'done' });
      });
    return () => {
      live = false;
    };
  }, [analytics, gateway, userId]);

  const persist = useCallback(
    (answers: OnboardingAnswers) => {
      setState({ phase: 'saving' });
      gateway
        .saveOnboarding(userId, answers)
        .then(() => setState({ phase: 'done' }))
        .catch((error: unknown) => setState({ phase: 'save-error', message: messageOf(error) }));
    },
    [gateway, userId],
  );

  const submit = useCallback(
    (answers: OnboardingAnswers) => {
      lastAnswers.current = answers;
      // The event describes the submission, not the write, so a retried save
      // must not report a second onboarding.
      if (!submitted.current) {
        submitted.current = true;
        analytics.capture({
          name: 'onboarding_completed',
          properties: { ...onboardingBuckets(answers), answered_count: answeredCount(answers) },
        });
        analytics.setPersonProperties(onboardingBuckets(answers));
      }
      persist(answers);
    },
    [analytics, persist],
  );

  const retry = useCallback(() => {
    if (lastAnswers.current) persist(lastAnswers.current);
  }, [persist]);

  /** Continue studying with an unsaved answer set rather than trapping the learner. */
  const dismiss = useCallback(() => setState({ phase: 'done' }), []);

  return { state, submit, retry, dismiss };
}
