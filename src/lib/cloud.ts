import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { emptyProgress, parseProgress, type Progress } from './progress';

export interface AuthUser {
  id: string;
  email?: string;
}

export interface CloudGateway {
  getUser(): Promise<AuthUser | null>;
  onAuthChange(listener: (user: AuthUser | null) => void): () => void;
  signInWithGoogle(redirectTo: string): Promise<void>;
  sendMagicLink(email: string, redirectTo: string): Promise<void>;
  loadProgress(userId: string): Promise<Progress>;
  saveProgress(userId: string, progress: Progress): Promise<void>;
  signOut(): Promise<void>;
}

export interface PublicSupabaseConfig {
  url: string;
  publishableKey: string;
}

export function readPublicSupabaseConfig(
  env: Record<string, string | boolean | undefined> = import.meta.env,
): PublicSupabaseConfig | null {
  const url = env.VITE_SUPABASE_URL;
  const publishableKey = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (typeof url !== 'string' || typeof publishableKey !== 'string') return null;
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url)) return null;
  if (!publishableKey.trim()) return null;
  return { url, publishableKey };
}

export function authRedirectUrl(origin = window.location.origin, base = import.meta.env.BASE_URL) {
  return new URL(base, origin).toString();
}

const AUTH_CALLBACK_KEYS = [
  'error',
  'error_code',
  'error_description',
  'error_uri',
  'code',
  'state',
  'access_token',
  'refresh_token',
  'expires_in',
  'token_type',
  'type',
] as const;

/**
 * Consumes failed OAuth/OTP callback fields without exposing provider details.
 * Successful callbacks are deliberately untouched so Supabase can exchange
 * their code/token normally.
 */
export function consumeAuthCallbackError(
  href = window.location.href,
  replaceUrl: (relativeUrl: string) => void = (relativeUrl) =>
    window.history.replaceState(window.history.state, '', relativeUrl),
): string | null {
  const url = new URL(href);
  const hashParams = new URLSearchParams(url.hash.startsWith('#') ? url.hash.slice(1) : '');
  const hasError = url.searchParams.has('error') || hashParams.has('error');
  if (!hasError) return null;

  const errorCode = url.searchParams.get('error_code') ?? hashParams.get('error_code');
  for (const key of AUTH_CALLBACK_KEYS) {
    url.searchParams.delete(key);
    hashParams.delete(key);
  }
  const cleanedHash = hashParams.toString();
  url.hash = cleanedHash ? `#${cleanedHash}` : '';
  replaceUrl(`${url.pathname}${url.search}${url.hash}`);

  if (errorCode === 'otp_expired') {
    return 'That sign-in link is invalid or has expired. Request a new email link and try again.';
  }
  return 'We couldn’t complete sign-in. Please try Google again or request a new email link.';
}

function asAuthUser(user: { id: string; email?: string } | null): AuthUser | null {
  return user ? { id: user.id, email: user.email } : null;
}

export class SupabaseCloudGateway implements CloudGateway {
  constructor(private readonly client: SupabaseClient) {}

  async getUser() {
    // getSession distinguishes a normal first-time signed-out browser from a
    // genuine session-restoration failure. The subsequent progress request is
    // still authorized and identity-checked by Supabase/RLS.
    const { data, error } = await this.client.auth.getSession();
    if (error) throw error;
    return asAuthUser(data.session?.user ?? null);
  }

  onAuthChange(listener: (user: AuthUser | null) => void) {
    const { data } = this.client.auth.onAuthStateChange((_event, session) => {
      // Supabase advises keeping this callback synchronous. Deferring also
      // prevents auth callbacks from contending with a progress query.
      queueMicrotask(() => listener(asAuthUser(session?.user ?? null)));
    });
    return () => data.subscription.unsubscribe();
  }

  async signInWithGoogle(redirectTo: string) {
    const { error } = await this.client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) throw error;
  }

  async sendMagicLink(email: string, redirectTo: string) {
    const { error } = await this.client.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) throw error;
  }

  async loadProgress(userId: string) {
    const { data, error } = await this.client
      .from('learner_progress')
      .select('progress')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) throw error;
    if (!data) return emptyProgress();
    const progress = parseProgress(JSON.stringify(data.progress));
    if (!progress) throw new Error('Stored progress has an invalid shape. Nothing was overwritten.');
    return progress;
  }

  async saveProgress(userId: string, progress: Progress) {
    const { error } = await this.client
      .from('learner_progress')
      .upsert({ user_id: userId, progress }, { onConflict: 'user_id' });
    if (error) throw error;
  }

  async signOut() {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }
}

export function createSupabaseGateway(config: PublicSupabaseConfig): CloudGateway {
  return new SupabaseCloudGateway(
    createClient(config.url, config.publishableKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    }),
  );
}
