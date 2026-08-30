import { describe, expect, it } from 'vitest';
import {
  authRedirectUrl,
  consumeAuthCallbackError,
  hasAuthCallbackParams,
  readPublicSupabaseConfig,
  stripAuthCallbackParams,
  SupabaseCloudGateway,
} from './cloud';
import { emptyProgress } from './progress';

describe('public Supabase configuration', () => {
  it('accepts only a complete public project configuration', () => {
    expect(readPublicSupabaseConfig({
      VITE_SUPABASE_URL: 'https://project-ref.supabase.co',
      VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_example',
    })).toEqual({
      url: 'https://project-ref.supabase.co',
      publishableKey: 'sb_publishable_example',
    });
    expect(readPublicSupabaseConfig({ VITE_SUPABASE_URL: 'https://project-ref.supabase.co' })).toBeNull();
    expect(readPublicSupabaseConfig({
      VITE_SUPABASE_URL: 'https://attacker.example',
      VITE_SUPABASE_PUBLISHABLE_KEY: 'value',
    })).toBeNull();
  });

  it('constructs OAuth and magic-link returns at the deployment subpath', () => {
    expect(authRedirectUrl('https://dkholin.github.io', '/asa-103-prep/')).toBe(
      'https://dkholin.github.io/asa-103-prep/',
    );
    expect(authRedirectUrl('http://127.0.0.1:5173', '/')).toBe('http://127.0.0.1:5173/');
  });
});

describe('session restoration', () => {
  it('treats an absent session as normally signed out', async () => {
    const gateway = new SupabaseCloudGateway({
      auth: { getSession: async () => ({ data: { session: null }, error: null }) },
    } as never);
    await expect(gateway.getUser()).resolves.toBeNull();
  });

  it('preserves a session restoration error for the UI to handle', async () => {
    const failure = new Error('session storage unavailable');
    const gateway = new SupabaseCloudGateway({
      auth: { getSession: async () => ({ data: { session: null }, error: failure }) },
    } as never);
    await expect(gateway.getUser()).rejects.toThrow('session storage unavailable');
  });
});

describe('typed email OTP', () => {
  it('sends an OTP without adding a visible magic-link redirect option', async () => {
    let request: unknown;
    const gateway = new SupabaseCloudGateway({
      auth: {
        signInWithOtp: async (value: unknown) => {
          request = value;
          return { data: {}, error: null };
        },
      },
    } as never);
    await gateway.sendEmailOtp('learner@example.test');
    expect(request).toEqual({ email: 'learner@example.test' });
  });

  it('verifies the typed token with Supabase email OTP semantics', async () => {
    let request: unknown;
    let activated = false;
    const session = {
      access_token: 'isolated-access',
      refresh_token: 'isolated-refresh',
      user: { id: 'user-103', email: 'learner@example.test' },
    };
    const primary = { auth: {} } as never;
    const verification = {
      auth: {
        verifyOtp: async (value: unknown) => {
          request = value;
          return { data: { user: session.user, session }, error: null };
        },
      },
    } as never;
    const gateway = new SupabaseCloudGateway(
      primary,
      () => verification,
      async (value) => { activated = value === session; },
    );
    const verified = await gateway.verifyEmailOtp('learner@example.test', '123456');
    expect(verified.user).toEqual({
      id: 'user-103',
      email: 'learner@example.test',
      createdAt: undefined,
    });
    expect(activated).toBe(false);
    await verified.activate();
    expect(activated).toBe(true);
    expect(request).toEqual({ email: 'learner@example.test', token: '123456', type: 'email' });
  });

  it('preserves the Supabase auth event type for lifecycle decisions', async () => {
    let providerListener!: (event: 'INITIAL_SESSION', session: { user: { id: string } }) => void;
    const gateway = new SupabaseCloudGateway({
      auth: {
        onAuthStateChange: (listener: typeof providerListener) => {
          providerListener = listener;
          return { data: { subscription: { unsubscribe() {} } } };
        },
      },
    } as never);
    const changes: unknown[] = [];
    gateway.onAuthChange((change) => changes.push(change));
    providerListener('INITIAL_SESSION', { user: { id: 'user-103' } });
    await Promise.resolve();
    expect(changes).toEqual([{ event: 'INITIAL_SESSION', user: { id: 'user-103', email: undefined, createdAt: undefined } }]);
  });
});

describe('bounded local reset', () => {
  it('removes the local session directly without starting a provider logout request', async () => {
    let removed = 0;
    let signOutCalled = false;
    const gateway = new SupabaseCloudGateway({
      auth: {
        _removeSession: async () => { removed += 1; },
        signOut: async () => {
          signOutCalled = true;
          return { error: null };
        },
      },
    } as never);
    await gateway.clearLocalSession();
    expect(removed).toBe(1);
    expect(signOutCalled).toBe(false);
  });
});

describe('failed auth callback cleanup', () => {
  it('maps an expired hash callback to a safe message and removes callback fields', () => {
    let replacement = '';
    const message = consumeAuthCallbackError(
      'https://dkholin.github.io/asa-103-prep/?seed=7#error=access_denied&error_code=otp_expired&error_description=private+provider+detail&state=sensitive',
      (url) => { replacement = url; },
    );

    expect(message).toBe(
      'That sign-in link is invalid or has expired. Request a new email link and try again.',
    );
    expect(replacement).toBe('/asa-103-prep/?seed=7');
    expect(replacement).not.toContain('private');
    expect(replacement).not.toContain('sensitive');
  });

  it('cleans query-form errors but leaves successful callback codes untouched', () => {
    let replacement = '';
    expect(consumeAuthCallbackError(
      'http://127.0.0.1:4173/asa-103-prep/?error=server_error&error_description=detail',
      (url) => { replacement = url; },
    )).toContain('couldn’t complete sign-in');
    expect(replacement).toBe('/asa-103-prep/');

    let successReplacementCalled = false;
    expect(consumeAuthCallbackError(
      'http://127.0.0.1:4173/asa-103-prep/?code=valid-code',
      () => { successReplacementCalled = true; },
    )).toBeNull();
    expect(successReplacementCalled).toBe(false);
  });
});

describe('clearing the callback before analytics starts', () => {
  it('detects callback material without reading it into diagnostics', () => {
    expect(hasAuthCallbackParams('https://example.test/asa-103-prep/?code=sensitive')).toBe(true);
    expect(hasAuthCallbackParams('https://example.test/asa-103-prep/#access_token=sensitive')).toBe(true);
    expect(hasAuthCallbackParams('https://example.test/asa-103-prep/?seed=7')).toBe(false);
  });
  it('removes every callback field from the query and the hash, keeping the rest', () => {
    let replacement: string | null = null;
    stripAuthCallbackParams(
      'https://dkholin.github.io/asa-103-prep/?seed=7&code=b7f1e9a2#access_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.sig&refresh_token=r3fr3sh&expires_at=1787340000&expires_in=3600&token_type=bearer&type=magiclink',
      (url) => { replacement = url; },
    );

    expect(replacement).toBe('/asa-103-prep/?seed=7');
    expect(replacement).not.toContain('access_token');
    expect(replacement).not.toContain('refresh_token');
    expect(replacement).not.toContain('code=');
  });

  it('leaves an ordinary URL untouched so it never rewrites history needlessly', () => {
    let called = false;
    stripAuthCallbackParams('http://127.0.0.1:4173/asa-103-prep/?seed=7', () => { called = true; });
    expect(called).toBe(false);
  });
});

describe('progress writes', () => {
  /** Builds a `from()` chain that records whether the caller's signal reached it. */
  const upsertSpy = () => {
    const seen: { signal?: AbortSignal; aborted?: boolean } = {};
    const result = { error: null };
    const builder = {
      abortSignal(signal: AbortSignal) {
        seen.signal = signal;
        seen.aborted = signal.aborted;
        return this;
      },
      then(resolve: (value: typeof result) => unknown) {
        return Promise.resolve(result).then(resolve);
      },
    };
    const client = { from: () => ({ upsert: () => builder }) };
    return { client, seen };
  };

  it('hands the caller its abort signal so an abandoned write can be cancelled', async () => {
    const { client, seen } = upsertSpy();
    const gateway = new SupabaseCloudGateway(client as never);
    const controller = new AbortController();
    await gateway.saveProgress('user-1', emptyProgress(), controller.signal);
    // The abort is the load-bearing half of "a write we gave up on cannot land
    // after a newer one". Without this the signal could be silently dropped.
    expect(seen.signal).toBe(controller.signal);
  });

  it('omits the abort seam entirely when the caller passes no signal', async () => {
    const { client, seen } = upsertSpy();
    const gateway = new SupabaseCloudGateway(client as never);
    await gateway.saveProgress('user-1', emptyProgress());
    expect(seen.signal).toBeUndefined();
  });
});
