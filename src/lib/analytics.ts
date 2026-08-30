/**
 * The analytics seam.
 *
 * PostHog is observational only: it never decides what a learner may study and
 * never becomes the source of truth for progress. Everything the application
 * emits goes through `AnalyticsClient`, so the real client, the no-op client
 * used when analytics is unconfigured, and the E2E sink are interchangeable and
 * the firing rules can be tested without a network or a global.
 */

export type PracticeMode = 'topic' | 'review' | 'concept';
export type PracticeEntryPoint = 'practice' | 'home' | 'learn';
export type MockEntryPoint = 'mock_exam' | 'home' | 'practice';
export type SignupMethod = 'google' | 'email_otp';
export type AuthDiagnosticMethod = 'google' | 'email_otp' | 'beta_code';
export type AuthDiagnosticStage =
  | 'authorize'
  | 'send'
  | 'verify'
  | 'restore'
  | 'enter';
export type AuthDiagnosticCategory =
  | 'network'
  | 'timeout'
  | 'expired'
  | 'invalid'
  | 'rate_limit'
  | 'provider';
/**
 * `unknown` is the session check itself failing. Entry during a Supabase
 * outage is exactly when it matters most that someone showed up, so it is
 * still reported rather than dropped.
 */
export type AuthState = 'signed-out' | 'signed-in' | 'unknown';

/** Non-identifying onboarding buckets. These are the only person properties we set. */
export interface OnboardingBuckets {
  exam_timing: string;
  current_status: string;
  sailing_experience: string;
}

/**
 * The canonical event set. Property values are deliberately restricted to ids,
 * topic slugs, booleans, counts, durations, and fixed bucket tokens — never a
 * prompt, an answer, an email address, or any other free text.
 */
export interface AnalyticsEventMap {
  beta_opened: { auth_state: AuthState };
  signup_started: { method: SignupMethod };
  signup_completed: { method?: SignupMethod };
  auth_diagnostic: {
    method: AuthDiagnosticMethod;
    stage: AuthDiagnosticStage;
    outcome: 'success' | 'failure';
    category?: AuthDiagnosticCategory;
  };
  onboarding_completed: OnboardingBuckets & { answered_count: number };
  home_viewed: HomeEventProperties;
  home_action_taken: HomeEventProperties;
  practice_started:
    | { mode: 'topic'; topic: string; question_count: number; entry_point: 'practice' | 'home' }
    | { mode: 'concept'; lesson_id: string; question_count: number; entry_point: 'learn' };
  practice_completed:
    | ({ mode: 'topic'; topic: string } & SessionCompletionProperties)
    | ({ mode: 'concept'; lesson_id: string } & SessionCompletionProperties);
  missed_review_started: { mode: 'review'; question_count: number };
  missed_review_completed: {
    mode: 'review';
    answered: number;
    correct: number;
    incorrect: number;
    skipped: number;
    duration_ms: number;
  };
  question_answered: {
    question_id: string;
    topic: string;
    correct: boolean;
    attempt: number;
    mode: PracticeMode;
  };
  question_skipped: { question_id: string; topic: string; mode: PracticeMode };
  /**
   * One `lesson_started` per lesson open, guarded by a ref rather than by
   * rendered state. Reversing a completion is deliberately silent: it is a
   * correction, not a study event.
   */
  lesson_started: { lesson_id: string; module_id: string };
  lesson_completed: { lesson_id: string; module_id: string };
  mock_started: { question_count: number; entry_point: MockEntryPoint };
  mock_completed: {
    score: number;
    total: number;
    score_pct: number;
    unanswered: number;
    duration_ms: number;
  };
}

export interface HomeEventProperties {
  learner_state: 'new' | 'returning';
  recommendation:
    | 'start_learning'
    | 'resume_lesson'
    | 'next_lesson'
    | 'practice_weak_topic'
    | 'take_mock_exam';
  completed_lessons: number;
  total_lessons: number;
  destination_id?: string;
  evidence_count?: number;
}

export type AnalyticsEventName = keyof AnalyticsEventMap;

export type AnalyticsEvent = {
  [Name in AnalyticsEventName]: { name: Name; properties: AnalyticsEventMap[Name] };
}[AnalyticsEventName];

export interface AnalyticsClient {
  /** True when captures actually leave the page. Drives the honesty of the sign-in disclosure. */
  readonly enabled: boolean;
  capture(event: AnalyticsEvent): void;
  identify(userId: string): void;
  setPersonProperties(buckets: OnboardingBuckets): void;
  reset(): void;
}

/* ---------------------------------------------------------------------------
 * Session summaries
 * ------------------------------------------------------------------------- */

export interface SessionTally {
  correct: number;
  wrong: number;
  skipped: number;
}

type SessionCompletionProperties = ReturnType<typeof sessionCompletionProperties>;

/**
 * `answered` counts only submitted answers, so a session's answered + skipped
 * total equals the questions the learner actually reached — not the questions
 * the session was built from, which an abandoned session never completes.
 */
export function sessionCompletionProperties(tally: SessionTally, durationMs: number) {
  return {
    answered: tally.correct + tally.wrong,
    correct: tally.correct,
    incorrect: tally.wrong,
    skipped: tally.skipped,
    duration_ms: durationMs,
  };
}

/** Percentage is precomputed so every consumer reads the same rounding. */
export function mockCompletionProperties(
  score: number,
  total: number,
  unanswered: number,
  durationMs: number,
): AnalyticsEventMap['mock_completed'] {
  return {
    score,
    total,
    score_pct: total > 0 ? Math.round((score / total) * 100) : 0,
    unanswered,
    duration_ms: durationMs,
  };
}

/* ---------------------------------------------------------------------------
 * URL scrubbing
 *
 * Magic-link and OAuth callbacks put `access_token`, `refresh_token`, and
 * `code` in the query string or hash of the page URL, and PostHog attaches the
 * page URL to every event it sends. Nothing that carries a URL may keep its
 * search or hash.
 * ------------------------------------------------------------------------- */

export const REDACTED = '[redacted]';

/** Authentication material that must never reach analytics, in any string field. */
const CREDENTIAL_PATTERN =
  /(?:access|refresh|provider|id)_token["']?\s*[=:]|(?:^|[?&#\s])code=|\beyJ[A-Za-z0-9_-]{6,}\.[A-Za-z0-9_-]{6,}\./i;

const URL_BEARING_KEY = /(?:url|href|referrer|location|uri)$/i;

/**
 * rrweb meta events keep their `href` at `$snapshot_data[i].data.href`, three
 * levels down. The budget stops there deliberately: a full DOM snapshot nests
 * far deeper, and walking it on every captured frame would cost real CPU for
 * no privacy gain.
 */
const MAX_SCRUB_DEPTH = 4;

/** Reduce a URL to origin + pathname; anything unparseable is kept unless it looks like a credential. */
export function scrubUrl(value: string): string {
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch {
    return CREDENTIAL_PATTERN.test(value) ? REDACTED : value;
  }
}

function scrubValue(key: string, value: unknown, depth: number): unknown {
  if (typeof value === 'string') {
    if (URL_BEARING_KEY.test(key)) return scrubUrl(value);
    return CREDENTIAL_PATTERN.test(value) ? REDACTED : value;
  }
  if (depth >= MAX_SCRUB_DEPTH || typeof value !== 'object' || value === null) return value;
  if (Array.isArray(value)) return value.map((item) => scrubValue(key, item, depth + 1));
  return scrubRecord(value as Record<string, unknown>, depth + 1);
}

function scrubRecord(properties: Record<string, unknown>, depth: number): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(properties)) out[key] = scrubValue(key, value, depth);
  return out;
}

/**
 * Applied to every outgoing event, replay frames included.
 *
 * Total by construction. The vendor decides what it hands a `before_send`
 * hook, and an event whose property bag is absent or not an object must not
 * make this throw: a hook that throws is a hook that silently stops analytics,
 * which is far harder to notice than a missing property.
 */
export function scrubAnalyticsProperties(
  properties: Record<string, unknown> | null | undefined,
): Record<string, unknown> {
  if (typeof properties !== 'object' || properties === null) return {};
  return scrubRecord(properties, 0);
}

/* ---------------------------------------------------------------------------
 * Identity
 * ------------------------------------------------------------------------- */

export type IdentityTransition = 'none' | 'identify' | 'reset' | 'reset-and-identify';

/**
 * Decide what an auth change means for analytics identity. Re-identifying the
 * same learner is a no-op, signing out resets so the next anonymous visitor
 * does not inherit a distinct id, and switching accounts in one browser resets
 * first so the two identities cannot blend.
 */
export function identityTransition(
  currentUserId: string | null,
  nextUserId: string | null,
): IdentityTransition {
  if (nextUserId === null) return currentUserId === null ? 'none' : 'reset';
  if (currentUserId === nextUserId) return 'none';
  return currentUserId === null ? 'identify' : 'reset-and-identify';
}

/** Applies {@link identityTransition} to a client, remembering who is identified this page load. */
export class AnalyticsIdentity {
  private currentUserId: string | null = null;

  constructor(private readonly client: AnalyticsClient) {}

  apply(userId: string | null) {
    const transition = identityTransition(this.currentUserId, userId);
    if (transition === 'none') return;
    if (transition === 'reset' || transition === 'reset-and-identify') this.client.reset();
    if (userId !== null && (transition === 'identify' || transition === 'reset-and-identify')) {
      this.client.identify(userId);
    }
    this.currentUserId = userId;
  }
}

/**
 * Supabase creates the user on first login, so there is no separate signup
 * flow to observe. A session belongs to a brand-new account when the user row
 * was created moments ago.
 */
export const NEW_USER_WINDOW_MS = 5 * 60 * 1000;

export function isNewlyCreatedUser(
  createdAt: string | undefined,
  now: number = Date.now(),
  windowMs: number = NEW_USER_WINDOW_MS,
): boolean {
  if (!createdAt) return false;
  const created = Date.parse(createdAt);
  if (Number.isNaN(created)) return false;
  return created <= now && now - created <= windowMs;
}

/* ---------------------------------------------------------------------------
 * Signup method hand-off
 *
 * Google and email sign-in both leave the page, so the method chosen before
 * the redirect is only recoverable from same-tab session storage. It is a
 * fixed token, never free text, and is consumed exactly once.
 * ------------------------------------------------------------------------- */

const SIGNUP_METHOD_KEY = 'asa103.analytics.signup-method.v1';

export function rememberSignupMethod(method: SignupMethod, store = safeSessionStorage()) {
  store?.setItem(SIGNUP_METHOD_KEY, method);
}

export function consumeSignupMethod(store = safeSessionStorage()): SignupMethod | undefined {
  const value = store?.getItem(SIGNUP_METHOD_KEY);
  store?.removeItem(SIGNUP_METHOD_KEY);
  return value === 'google' || value === 'email_otp' ? value : undefined;
}

/** Private-mode browsers throw on storage access; analytics must never be fatal. */
function safeSessionStorage(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/* ---------------------------------------------------------------------------
 * Clients
 * ------------------------------------------------------------------------- */

/** Used when analytics is unconfigured. Study flows must work exactly the same. */
export class NoopAnalyticsClient implements AnalyticsClient {
  readonly enabled = false;
  capture() {}
  identify() {}
  setPersonProperties() {}
  reset() {}
}

/**
 * Defers construction of the real client until something is actually captured.
 *
 * This is the ordering seam that lets the client be leak-free *and* keep every
 * vendor feature. The first capture happens once the auth state has resolved,
 * so `start` runs after Supabase has consumed an OAuth/magic-link callback —
 * late enough to remove the callback fields from the address bar before the
 * vendor ever reads it. Starting is also fail-safe: a client that throws on
 * construction degrades to no-op rather than taking the study flow with it.
 */
export class DeferredAnalyticsClient implements AnalyticsClient {
  readonly enabled = true;
  private started: AnalyticsClient | null = null;

  constructor(private readonly start: () => AnalyticsClient) {}

  private client(): AnalyticsClient {
    if (!this.started) {
      try {
        this.started = this.start();
      } catch {
        this.started = new NoopAnalyticsClient();
      }
    }
    return this.started;
  }

  capture(event: AnalyticsEvent) {
    this.client().capture(event);
  }

  identify(userId: string) {
    this.client().identify(userId);
  }

  setPersonProperties(buckets: OnboardingBuckets) {
    this.client().setPersonProperties(buckets);
  }

  reset() {
    this.client().reset();
  }
}

export interface AnalyticsRecord {
  name: string;
  properties?: Record<string, unknown>;
}

/**
 * Test-only in-page sink. E2E builds route here instead of PostHog so browser
 * tests can assert exact firing, ordering, and property values. Identity calls
 * are recorded in the same ordered list as `$identify`, `$set`, and `$reset`
 * so a test can check that `beta_opened` really precedes identification.
 */
export class SinkAnalyticsClient implements AnalyticsClient {
  readonly enabled = true;

  constructor(private readonly sink: AnalyticsRecord[]) {}

  capture(event: AnalyticsEvent) {
    this.sink.push({
      name: event.name,
      properties: scrubAnalyticsProperties({
        ...event.properties,
        $current_url: window.location.href,
      }),
    });
  }

  identify(userId: string) {
    this.sink.push({ name: '$identify', properties: { distinct_id: userId } });
  }

  setPersonProperties(buckets: OnboardingBuckets) {
    this.sink.push({ name: '$set', properties: { ...buckets } });
  }

  reset() {
    this.sink.push({ name: '$reset' });
  }
}

/* ---------------------------------------------------------------------------
 * Configuration
 * ------------------------------------------------------------------------- */

export interface PublicPostHogConfig {
  key: string;
  host: string;
}

/**
 * Both values are browser-public. The key pattern accepts only a PostHog
 * *project* key: a personal API key pasted into a `VITE_` variable would be
 * shipped to every visitor, so it fails closed into the no-op client instead.
 * The host is required rather than defaulted so a misconfiguration cannot
 * silently ship a learner's events to the wrong region.
 */
export function readPublicPostHogConfig(
  env: Record<string, string | boolean | undefined> = import.meta.env,
): PublicPostHogConfig | null {
  const key = env.VITE_POSTHOG_KEY;
  const host = env.VITE_POSTHOG_HOST;
  if (typeof key !== 'string' || typeof host !== 'string') return null;
  if (!/^phc_[A-Za-z0-9_-]{16,}$/.test(key)) return null;
  if (!/^https:\/\/[a-z0-9.-]+$/.test(host)) return null;
  return { key, host };
}
