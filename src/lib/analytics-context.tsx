import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { NoopAnalyticsClient, type AnalyticsClient } from './analytics';

/**
 * Injection point for the analytics client, mirroring how `CloudGateway` is
 * handed to the application from `main.tsx`. Components never reach for a
 * global, so a test can render any subtree against the sink or the no-op
 * client. An un-provided tree falls back to the no-op client rather than
 * throwing: analytics must never be able to break a study screen.
 */
const AnalyticsContext = createContext<AnalyticsClient>(new NoopAnalyticsClient());

export function AnalyticsProvider(props: { client: AnalyticsClient; children: ReactNode }) {
  return (
    <AnalyticsContext.Provider value={props.client}>{props.children}</AnalyticsContext.Provider>
  );
}

export function useAnalytics(): AnalyticsClient {
  return useContext(AnalyticsContext);
}

/**
 * Fire an effect at most once per mounted component instance, the first time
 * `when` is true.
 *
 * `StrictMode` deliberately mounts, unmounts, and remounts effects in
 * development, so a plain mount effect would emit every session-start event
 * twice. The ref survives that remount because React keeps component state
 * across it, which makes this the guard rather than the effect's dependency
 * list. A genuinely new session gets a new component instance — App remounts
 * `PracticeSession` per session and `MockAttempt` per attempt — and therefore
 * a fresh, unfired ref.
 */
export function useFireOnceWhen(when: boolean, fire: () => void) {
  const fired = useRef(false);
  useEffect(() => {
    if (!when || fired.current) return;
    fired.current = true;
    fire();
  });
}
