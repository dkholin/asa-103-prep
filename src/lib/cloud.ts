import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { emptyProgress, parseProgress, type Progress } from './progress';
import {
  parseOnboardingRow,
  toOnboardingRow,
  type OnboardingAnswers,
} from './onboarding';

export interface AuthUser {
  id: string;
  email?: string;
  /** Account creation time, used only to tell a brand-new signup from a returning sign-in. */
  createdAt?: string;
}

export interface CloudGateway {
  getUser(): Promise<AuthUser | null>;
  onAuthChange(listener: (user: AuthUser | null) => void): () => void;
  signInWithGoogle(redirectTo: string): Promise<void>;
  sendMagicLink(email: string, redirectTo: string): Promise<void>;
  loadProgress(userId: string): Promise<Progress>;
  saveProgress(userId: string, progress: Progress): Promise<void>;
  /** Resolves to null when the learner has no onboarding record yet. */
  loadOnboarding(userId: string): Promise<OnboardingAnswers | null>;
  saveOnboarding(userId: string, answers: OnboardingAnswers): Promise<void>;
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
  'provider_token',
  'provider_refresh_token',
  'expires_in',
  'expires_at',
  'token_type',
  'type',
] as const;

/** The relative URL that remains once every OAuth/OTP callback field is removed. */
function withoutAuthCallbackParams(url: URL, hashParams: URLSearchParams): string {
  for (const key of AUTH_CALLBACK_KEYS) {
    url.searchParams.delete(key);
    hashParams.delete(key);
  }
  const cleanedHash = hashParams.toString();
  url.hash = cleanedHash ? `#${cleanedHash}` : '';
  return `${url.pathname}${url.search}${url.hash}`;
}

const parseHash = (url: URL) =>
  new URLSearchParams(url.hash.startsWith('#') ? url.hash.slice(1) : '');

const replaceUrlInPlace = (relativeUrl: string) =>
  window.history.replaceState(window.history.state, '', relativeUrl);

/**
 * Removes the callback fields from the address bar.
 *
 * Called at the analytics boundary rather than at load: Supabase needs the
 * callback params first (`detectSessionInUrl`), and analytics starts only once
 * the auth state has resolved, by which point they have been consumed. Doing
 * it here means every downstream analytics consumer — the flags request, the
 * stored initial-person info, replay metadata — sees a clean URL by
 * construction, instead of relying on each of them being scrubbed on the way
 * out.
 */
export function stripAuthCallbackParams(
  href = window.location.href,
  replaceUrl: (relativeUrl: string) => void = replaceUrlInPlace,
): void {
  const url = new URL(href);
  const original = `${url.pathname}${url.search}${url.hash}`;
  const cleaned = withoutAuthCallbackParams(url, parseHash(url));
  if (cleaned !== original) replaceUrl(cleaned);
}

/**
 * Consumes failed OAuth/OTP callback fields without exposing provider details.
 * Successful callbacks are deliberately untouched so Supabase can exchange
 * their code/token normally.
 */
export function consumeAuthCallbackError(
  href = window.location.href,
  replaceUrl: (relativeUrl: string) => void = replaceUrlInPlace,
): string | null {
  const url = new URL(href);
  const hashParams = parseHash(url);
  const hasError = url.searchParams.has('error') || hashParams.has('error');
  if (!hasError) return null;

  const errorCode = url.searchParams.get('error_code') ?? hashParams.get('error_code');
  replaceUrl(withoutAuthCallbackParams(url, hashParams));

  if (errorCode === 'otp_expired') {
    return 'That sign-in link is invalid or has expired. Request a new email link and try again.';
  }
  return 'We couldn’t complete sign-in. Please try Google again or request a new email link.';
}

function asAuthUser(
  user: { id: string; email?: string; created_at?: string } | null,
): AuthUser | null {
  return user ? { id: user.id, email: user.email, createdAt: user.created_at } : null;
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

  async loadOnboarding(userId: string) {
    const { data, error } = await this.client
      .from('learner_onboarding')
      .select('exam_timing, current_status, sailing_experience')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    const answers = parseOnboardingRow(data);
    // A malformed row is not a skip. Failing closed keeps the caller from
    // reporting invented buckets; onboarding is optional, so the caller simply
    // does not ask again this session.
    if (!answers) throw new Error('Stored onboarding answers have an invalid shape.');
    return answers;
  }

  async saveOnboarding(userId: string, answers: OnboardingAnswers) {
    const { error } = await this.client
      .from('learner_onboarding')
      .upsert({ user_id: userId, ...toOnboardingRow(answers) }, { onConflict: 'user_id' });
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
