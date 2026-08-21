import { describe, expect, it } from 'vitest';
import {
  authRedirectUrl,
  consumeAuthCallbackError,
  readPublicSupabaseConfig,
  SupabaseCloudGateway,
} from './cloud';

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
