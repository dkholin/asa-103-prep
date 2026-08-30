export const AUTH_DEADLINE_MS = 12_000;
export const RESET_DEADLINE_MS = 3_000;
/**
 * Progress writes get a longer budget than an auth round trip: they carry a
 * full snapshot and are allowed to be slow. They are still bounded, because an
 * unbounded write would stall every write queued behind it.
 */
export const SAVE_DEADLINE_MS = 15_000;
/** Must exceed SAVE_DEADLINE_MS so a drain normally reports the write's own error. */
export const DRAIN_DEADLINE_MS = 20_000;

export class OperationTimeoutError extends Error {
  constructor() {
    super('Operation timed out');
    this.name = 'OperationTimeoutError';
  }
}

export function withDeadline<T>(promise: Promise<T>, timeoutMs = AUTH_DEADLINE_MS): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = globalThis.setTimeout(() => reject(new OperationTimeoutError()), timeoutMs);
    promise.then(
      (value) => {
        globalThis.clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        globalThis.clearTimeout(timer);
        reject(error);
      },
    );
  });
}

export type AuthFailureCategory =
  | 'network'
  | 'timeout'
  | 'expired'
  | 'invalid'
  | 'rate_limit'
  | 'provider';

export function classifyAuthFailure(error: unknown): AuthFailureCategory {
  if (error instanceof OperationTimeoutError) return 'timeout';
  const candidate = error as { status?: unknown; code?: unknown; message?: unknown } | null;
  const status = typeof candidate?.status === 'number' ? candidate.status : undefined;
  const text = `${String(candidate?.code ?? '')} ${String(candidate?.message ?? '')}`.toLowerCase();
  if (status === 429 || /rate.?limit|too many|over_email_send_rate_limit/.test(text)) return 'rate_limit';
  if (/expired|otp_expired/.test(text)) return 'expired';
  if (/invalid|token.*not found|otp_disabled/.test(text)) return 'invalid';
  if (
    /failed to fetch|load failed|network|fetch|connection|offline|timed? out|abort/.test(text)
    || (typeof status === 'number' && status >= 500)
  ) return 'network';
  return 'provider';
}

export function authFailureMessage(category: AuthFailureCategory): string {
  if (category === 'timeout' || category === 'network') {
    return "We couldn't reach the sign-in service. Check your connection or try another sign-in method.";
  }
  if (category === 'invalid') return 'That code is invalid. Check it and try again.';
  if (category === 'expired') return 'That code has expired. Send a new code and try again.';
  if (category === 'rate_limit') return 'Too many attempts. Wait a moment before trying again.';
  return 'We couldn’t complete sign-in. Try again or use another sign-in method.';
}
