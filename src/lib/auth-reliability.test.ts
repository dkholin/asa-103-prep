import { describe, expect, it, vi } from 'vitest';
import {
  OperationTimeoutError,
  authFailureMessage,
  classifyAuthFailure,
  withDeadline,
} from './auth-reliability';

describe('bounded authentication operations', () => {
  it('rejects a request that never resolves', async () => {
    vi.useFakeTimers();
    const bounded = withDeadline(new Promise<never>(() => {}), 50);
    const assertion = expect(bounded).rejects.toBeInstanceOf(OperationTimeoutError);
    await vi.advanceTimersByTimeAsync(50);
    await assertion;
    vi.useRealTimers();
  });

  it('does not let a late result change the already timed-out outcome', async () => {
    vi.useFakeTimers();
    let resolve!: (value: string) => void;
    const source = new Promise<string>((done) => { resolve = done; });
    const bounded = withDeadline(source, 50);
    const outcomes: string[] = [];
    void bounded.then((value) => outcomes.push(value), () => outcomes.push('timeout'));
    await vi.advanceTimersByTimeAsync(50);
    resolve('late-success');
    await Promise.resolve();
    expect(outcomes).toEqual(['timeout']);
    vi.useRealTimers();
  });
});

describe('stable authentication errors', () => {
  it('maps WebKit transport errors without exposing the raw browser error', () => {
    const category = classifyAuthFailure(new TypeError('Load failed'));
    expect(category).toBe('network');
    expect(authFailureMessage(category)).not.toContain('Load failed');
  });

  it('distinguishes invalid, expired, rate-limited, and provider failures', () => {
    expect(classifyAuthFailure({ message: 'Token has expired' })).toBe('expired');
    expect(classifyAuthFailure({ message: 'Token is invalid' })).toBe('invalid');
    expect(classifyAuthFailure({ status: 429, message: 'Too many requests' })).toBe('rate_limit');
    expect(classifyAuthFailure({ status: 400, message: 'OAuth failed' })).toBe('provider');
  });
});
