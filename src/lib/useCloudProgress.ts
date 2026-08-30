import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AUTH_DEADLINE_MS,
  DRAIN_DEADLINE_MS,
  OperationTimeoutError,
  RESET_DEADLINE_MS,
  SAVE_DEADLINE_MS,
  authFailureMessage,
  classifyAuthFailure,
  withDeadline,
  type AuthFailureCategory,
} from './auth-reliability';
import {
  ALLOWED_BETA_CODE_IDS,
  clearActiveBetaAccess,
  loadBetaProgress,
  rememberBetaAccess,
  restoreBetaAccess,
  saveBetaProgress,
  validateBetaCode,
} from './beta-access';
import { emptyProgress, type Progress } from './progress';
import { hasAuthCallbackParams, type AuthChange, type AuthUser, type CloudGateway } from './cloud';
import {
  AnalyticsIdentity,
  consumeSignupMethod,
  isNewlyCreatedUser,
  rememberSignupMethod,
  type AnalyticsClient,
  type AuthDiagnosticMethod,
  type AuthDiagnosticStage,
  type AuthState,
} from './analytics';
import { SaveGate } from './save-gate';

export type CloudProgressState =
  | { phase: 'starting' }
  | { phase: 'starting-over' }
  | { phase: 'session-error'; message: string }
  | { phase: 'signed-out' }
  | { phase: 'loading'; user: AuthUser }
  | { phase: 'load-error'; user: AuthUser; message: string }
  | { phase: 'signing-out'; user: AuthUser; progress: Progress }
  | {
      phase: 'ready';
      mode: 'cloud';
      user: AuthUser;
      progress: Progress;
      saveState: 'saved' | 'saving' | 'error';
      saveMessage?: string;
      accountMessage?: string;
    }
  | {
      phase: 'ready';
      mode: 'beta';
      progress: Progress;
      saveState: 'saved' | 'error';
      saveMessage?: string;
    };

export type AuthActionResult =
  | { ok: true }
  | { ok: false; category: AuthFailureCategory; message: string };

const messageOf = (error: unknown) =>
  error instanceof Error ? error.message : 'The cloud service returned an unexpected error.';

const sessionMessage = () =>
  "We couldn't reach the sign-in service. Check your connection or try another sign-in method.";

export function useCloudProgress(
  gateway: CloudGateway,
  analytics: AnalyticsClient,
  allowedBetaCodeIds: readonly string[] = ALLOWED_BETA_CODE_IDS,
) {
  const deadlineMs = import.meta.env.VITE_E2E_FAKE_CLOUD === 'true' ? 250 : AUTH_DEADLINE_MS;
  const resetDeadlineMs = import.meta.env.VITE_E2E_FAKE_CLOUD === 'true' ? 100 : RESET_DEADLINE_MS;
  // A progress write is allowed to take longer than an auth round trip, but it
  // is still bounded: an unbounded one stalls every write queued behind it and
  // leaves the learner studying into a queue that will never drain.
  const saveDeadlineMs = import.meta.env.VITE_E2E_FAKE_CLOUD === 'true' ? 1_000 : SAVE_DEADLINE_MS;
  // Strictly longer, so a drain normally surfaces the write's own error rather
  // than a second, less specific timeout of its own.
  const drainDeadlineMs = import.meta.env.VITE_E2E_FAKE_CLOUD === 'true' ? 1_500 : DRAIN_DEADLINE_MS;
  const persistedBetaId = useRef(restoreBetaAccess(allowedBetaCodeIds));
  const initialBetaProgress = useRef(persistedBetaId.current ? loadBetaProgress() : emptyProgress());
  const [state, setState] = useState<CloudProgressState>(() => persistedBetaId.current
    ? { phase: 'ready', mode: 'beta', progress: initialBetaProgress.current, saveState: 'saved' }
    : { phase: 'starting' });
  const mode = useRef<'cloud' | 'beta' | 'teardown'>(persistedBetaId.current ? 'beta' : 'cloud');
  const modeBeforeCleanup = useRef<'cloud' | 'beta'>(persistedBetaId.current ? 'beta' : 'cloud');
  const lifecycleGeneration = useRef(0);
  const operationGeneration = useRef(0);
  const restoreSettled = useRef(false);
  const unsubscribeAuth = useRef<(() => void) | null>(null);
  const activeUserId = useRef<string | null>(null);
  const loadGeneration = useRef(0);
  const latestProgress = useRef<Progress>(initialBetaProgress.current);
  const saveGate = useRef(new SaveGate());
  const saveGeneration = useRef(0);
  const lastSaveError = useRef<string | null>(null);
  const signOutInProgress = useRef(false);
  const identity = useRef(new AnalyticsIdentity(analytics));
  const betaOpened = useRef(false);
  const signupCompletedFor = useRef(new Set<string>());

  const isCurrent = useCallback((generation: number) => (
    mode.current === 'cloud' && generation === lifecycleGeneration.current
  ), []);

  const captureEntryOnce = useCallback((authState: AuthState) => {
    if (betaOpened.current) return;
    betaOpened.current = true;
    analytics.capture({ name: 'beta_opened', properties: { auth_state: authState } });
  }, [analytics]);

  const diagnostic = useCallback((
    method: AuthDiagnosticMethod,
    stage: AuthDiagnosticStage,
    outcome: 'success' | 'failure',
    category?: AuthFailureCategory,
  ) => {
    // A completely stalled restore may still have credentials in its callback
    // URL. Missing that diagnostic is safer than initializing PostHog early.
    if (!betaOpened.current) return;
    analytics.capture({
      name: 'auth_diagnostic',
      properties: { method, stage, outcome, ...(category ? { category } : {}) },
    });
  }, [analytics]);

  const observeAuth = useCallback((user: AuthUser | null) => {
    captureEntryOnce(user ? 'signed-in' : 'signed-out');
    identity.current.apply(user?.id ?? null);
    if (!user) return;
    const method = consumeSignupMethod();
    if (!isNewlyCreatedUser(user.createdAt) || signupCompletedFor.current.has(user.id)) return;
    signupCompletedFor.current.add(user.id);
    analytics.capture({ name: 'signup_completed', properties: method ? { method } : {} });
  }, [analytics, captureEntryOnce]);

  const loadForUser = useCallback(async (user: AuthUser) => {
    if (mode.current !== 'cloud' || activeUserId.current === user.id) return;
    saveGate.current.close();
    activeUserId.current = user.id;
    const generation = ++loadGeneration.current;
    setState({ phase: 'loading', user });
    try {
      const progress = await withDeadline(gateway.loadProgress(user.id), deadlineMs);
      if (mode.current !== 'cloud' || generation !== loadGeneration.current || activeUserId.current !== user.id) return;
      latestProgress.current = progress;
      lastSaveError.current = null;
      signOutInProgress.current = false;
      saveGate.current.open();
      setState({ phase: 'ready', mode: 'cloud', user, progress, saveState: 'saved' });
    } catch (error) {
      if (mode.current !== 'cloud' || generation !== loadGeneration.current || activeUserId.current !== user.id) return;
      const category = classifyAuthFailure(error);
      const message = category === 'timeout'
        ? 'Loading your cloud progress took too long. Try again or use beta access.'
        : category === 'network'
          ? "We couldn't reach the progress service. Check your connection, try again, or use beta access."
        : messageOf(error);
      setState({ phase: 'load-error', user, message });
    }
  }, [gateway]);

  const acceptUser = useCallback((user: AuthUser | null) => {
    if (mode.current !== 'cloud') return;
    ++operationGeneration.current;
    observeAuth(user);
    if (user) {
      void loadForUser(user);
    } else {
      saveGate.current.close();
      signOutInProgress.current = false;
      activeUserId.current = null;
      ++loadGeneration.current;
      setState({ phase: 'signed-out' });
    }
  }, [loadForUser, observeAuth]);

  const installSubscription = useCallback((generation: number, ignoreInitial: boolean) => {
    unsubscribeAuth.current?.();
    unsubscribeAuth.current = gateway.onAuthChange((change: AuthChange) => {
      if (!isCurrent(generation)) return;
      if (change.event === 'INITIAL_SESSION') {
        if (ignoreInitial || restoreSettled.current) return;
        restoreSettled.current = true;
      } else {
        // A later auth event is newer than the restore snapshot. Settle the
        // restore before accepting it so an old getSession result cannot roll
        // back this transition.
        restoreSettled.current = true;
      }
      // There is no in-app account-switch action. Once a cloud user is active,
      // a different SIGNED_IN user can only be an obsolete provider operation;
      // accepting it would cross account state after a newer success.
      if (change.user && activeUserId.current && change.user.id !== activeUserId.current) return;
      acceptUser(change.user);
    });
  }, [acceptUser, gateway, isCurrent]);

  const restoreSession = useCallback(() => {
    mode.current = 'cloud';
    const generation = ++lifecycleGeneration.current;
    ++operationGeneration.current;
    restoreSettled.current = false;
    activeUserId.current = null;
    ++loadGeneration.current;
    setState({ phase: 'starting' });
    try {
      installSubscription(generation, false);
    } catch {
      restoreSettled.current = true;
      if (!hasAuthCallbackParams()) captureEntryOnce('unknown');
      setState({ phase: 'session-error', message: sessionMessage() });
      return;
    }
    void withDeadline(gateway.getUser(), deadlineMs)
      .then((user) => {
        if (!isCurrent(generation) || restoreSettled.current) return;
        restoreSettled.current = true;
        acceptUser(user);
      })
      .catch(() => {
        if (!isCurrent(generation) || restoreSettled.current) return;
        restoreSettled.current = true;
        if (!hasAuthCallbackParams()) {
          captureEntryOnce('unknown');
        }
        setState({ phase: 'session-error', message: sessionMessage() });
      });
  }, [acceptUser, captureEntryOnce, gateway, installSubscription, isCurrent]);

  useEffect(() => {
    // React development StrictMode runs setup → cleanup → setup while keeping
    // refs. Restore the pre-cleanup mode for that second setup; a real unmount
    // has no second setup, so its generation remains permanently invalid.
    if (mode.current === 'teardown') mode.current = modeBeforeCleanup.current;
    if (mode.current === 'cloud') restoreSession();
    return () => {
      if (mode.current !== 'teardown') modeBeforeCleanup.current = mode.current;
      mode.current = 'teardown';
      ++lifecycleGeneration.current;
      ++operationGeneration.current;
      ++loadGeneration.current;
      unsubscribeAuth.current?.();
      unsubscribeAuth.current = null;
      activeUserId.current = null;
    };
  }, [restoreSession]);

  const startOver = useCallback(() => {
    mode.current = 'cloud';
    const generation = ++lifecycleGeneration.current;
    ++operationGeneration.current;
    ++loadGeneration.current;
    restoreSettled.current = true;
    unsubscribeAuth.current?.();
    unsubscribeAuth.current = null;
    activeUserId.current = null;
    saveGate.current.close();
    identity.current.apply(null);
    setState({ phase: 'starting-over' });
    void withDeadline(gateway.clearLocalSession(), resetDeadlineMs)
      .catch(() => undefined)
      .then(() => {
        if (!isCurrent(generation)) return;
        setState({ phase: 'signed-out' });
      });
  }, [gateway, isCurrent]);

  const runAuthAction = useCallback(async (
    method: AuthDiagnosticMethod,
    stage: AuthDiagnosticStage,
    operation: () => Promise<void>,
  ): Promise<AuthActionResult> => {
    if (mode.current !== 'cloud') return { ok: false, category: 'provider', message: 'That sign-in attempt is no longer active.' };
    const generation = ++operationGeneration.current;
    try {
      await withDeadline(operation(), deadlineMs);
      if (mode.current !== 'cloud' || generation !== operationGeneration.current) {
        return { ok: false, category: 'provider', message: 'That sign-in attempt is no longer active.' };
      }
      diagnostic(method, stage, 'success');
      return { ok: true };
    } catch (error) {
      if (mode.current !== 'cloud' || generation !== operationGeneration.current) {
        return { ok: false, category: 'provider', message: 'That sign-in attempt is no longer active.' };
      }
      const category = classifyAuthFailure(error);
      diagnostic(method, stage, 'failure', category);
      return { ok: false, category, message: authFailureMessage(category) };
    }
  }, [diagnostic]);

  const signInWithGoogle = useCallback(async () => {
    analytics.capture({ name: 'signup_started', properties: { method: 'google' } });
    rememberSignupMethod('google');
    const result = await runAuthAction('google', 'authorize', () => gateway.signInWithGoogle(
      new URL(import.meta.env.BASE_URL, window.location.origin).toString(),
    ));
    // OAuth normally navigates away. The fallback covers non-navigating test
    // doubles and provider completions after Start over, when no auth callback
    // subscription is installed so a late reset callback stays harmless.
    if (result.ok && mode.current === 'cloud' && !activeUserId.current) {
      const generation = operationGeneration.current;
      try {
        const user = await withDeadline(gateway.getUser(), deadlineMs);
        // Same epoch authority as every other auth operation: Start over or a
        // newer sign-in during this lookup invalidates its result.
        if (user && mode.current === 'cloud' && generation === operationGeneration.current) {
          acceptUser(user);
        }
      } catch { /* the stable result from the authorize request remains primary */ }
    }
    return result;
  }, [acceptUser, analytics, gateway, runAuthAction]);

  const sendEmailOtp = useCallback((email: string) => {
    analytics.capture({ name: 'signup_started', properties: { method: 'email_otp' } });
    rememberSignupMethod('email_otp');
    return runAuthAction('email_otp', 'send', () => gateway.sendEmailOtp(email));
  }, [analytics, gateway, runAuthAction]);

  const verifyEmailOtp = useCallback(async (email: string, token: string): Promise<AuthActionResult> => {
    if (mode.current !== 'cloud') {
      return { ok: false, category: 'provider', message: 'That sign-in attempt is no longer active.' };
    }
    // Supabase emits SIGNED_IN while verifyOtp is resolving. Detach the shared
    // listener for the duration so only this generation-checked direct result
    // can accept the user; late results from a timed-out attempt then have no
    // React state path after a newer cloud success. The listener is restored
    // under the new generation once this attempt settles, so genuine later
    // provider events -- a revoked refresh token, a sign-out in another tab --
    // are still observed.
    const lifecycle = ++lifecycleGeneration.current;
    unsubscribeAuth.current?.();
    unsubscribeAuth.current = null;
    restoreSettled.current = true;
    const generation = ++operationGeneration.current;
    const isLive = () => mode.current === 'cloud' && generation === operationGeneration.current;
    const stale: AuthActionResult = {
      ok: false, category: 'provider', message: 'That sign-in attempt is no longer active.',
    };
    // Only an attempt that is still authoritative may reattach; a superseded
    // one would otherwise install a listener the newer operation does not own.
    const resubscribe = () => {
      if (mode.current !== 'cloud' || lifecycle !== lifecycleGeneration.current) return;
      try { installSubscription(lifecycle, true); } catch { /* restore stays reachable via Try again */ }
    };
    try {
      const verified = await withDeadline(gateway.verifyEmailOtp(email, token), deadlineMs);
      // Check the epoch before activating: activate() commits the session to
      // browser storage, and a post-hoc check could suppress the UI transition
      // while leaving a superseded account as the storage/cloud target.
      if (!isLive()) return stale;
      await verified.activate();
      if (!isLive()) return stale;
      diagnostic('email_otp', 'verify', 'success');
      acceptUser(verified.user);
      resubscribe();
      return { ok: true };
    } catch (error) {
      if (!isLive()) return stale;
      const category = classifyAuthFailure(error);
      diagnostic('email_otp', 'verify', 'failure', category);
      resubscribe();
      return { ok: false, category, message: authFailureMessage(category) };
    }
  }, [acceptUser, diagnostic, gateway, installSubscription]);

  const enterBeta = useCallback(async (code: string): Promise<AuthActionResult> => {
    const attemptedOperation = operationGeneration.current;
    const codeId = await validateBetaCode(code, allowedBetaCodeIds);
    if (operationGeneration.current !== attemptedOperation || mode.current === 'teardown') {
      return { ok: false, category: 'provider', message: 'That beta access attempt is no longer active.' };
    }
    if (!codeId) {
      diagnostic('beta_code', 'enter', 'failure', 'invalid');
      return { ok: false, category: 'invalid', message: 'That beta access code is not valid.' };
    }
    if (!rememberBetaAccess(codeId)) {
      diagnostic('beta_code', 'enter', 'failure', 'provider');
      return { ok: false, category: 'provider', message: 'Beta access requires working local storage on this device.' };
    }
    mode.current = 'beta';
    ++lifecycleGeneration.current;
    ++operationGeneration.current;
    ++loadGeneration.current;
    unsubscribeAuth.current?.();
    unsubscribeAuth.current = null;
    activeUserId.current = null;
    saveGate.current.close();
    identity.current.apply(null);
    latestProgress.current = loadBetaProgress();
    diagnostic('beta_code', 'enter', 'success');
    setState({ phase: 'ready', mode: 'beta', progress: latestProgress.current, saveState: 'saved' });
    return { ok: true };
  }, [allowedBetaCodeIds, diagnostic]);

  const exitBeta = useCallback(() => {
    if (mode.current !== 'beta') return;
    clearActiveBetaAccess();
    restoreSession();
  }, [restoreSession]);

  const persist = useCallback((user: AuthUser, progress: Progress) => {
    const write = saveGate.current.enqueue(() => {
      const controller = new AbortController();
      return withDeadline(gateway.saveProgress(user.id, progress, controller.signal), saveDeadlineMs)
        .catch((error) => {
          // Give up on the request as well as on waiting for it, so it cannot
          // land later and overwrite a newer snapshot.
          if (error instanceof OperationTimeoutError) controller.abort();
          throw error;
        });
    });
    if (!write) return false;
    const generation = ++saveGeneration.current;
    latestProgress.current = progress;
    lastSaveError.current = null;
    setState({ phase: 'ready', mode: 'cloud', user, progress, saveState: 'saving' });
    void write.then(() => {
      if (mode.current !== 'cloud' || generation !== saveGeneration.current || activeUserId.current !== user.id) return;
      lastSaveError.current = null;
      if (!signOutInProgress.current) setState({ phase: 'ready', mode: 'cloud', user, progress: latestProgress.current, saveState: 'saved' });
    }).catch((error) => {
      if (mode.current !== 'cloud' || generation !== saveGeneration.current || activeUserId.current !== user.id) return;
      const message = error instanceof OperationTimeoutError
        ? 'Saving took too long. Check your connection and try again.'
        : messageOf(error);
      lastSaveError.current = message;
      if (!signOutInProgress.current) setState({ phase: 'ready', mode: 'cloud', user, progress: latestProgress.current, saveState: 'error', saveMessage: message });
    });
    return true;
  }, [gateway]);

  const updateProgress = useCallback((progress: Progress) => {
    if (mode.current === 'beta') {
      latestProgress.current = progress;
      const saved = saveBetaProgress(progress);
      setState({
        phase: 'ready', mode: 'beta', progress,
        saveState: saved ? 'saved' : 'error',
        ...(saved ? {} : { saveMessage: 'Progress could not be saved on this device.' }),
      });
      return;
    }
    const userId = activeUserId.current;
    if (!userId) return;
    const user = state.phase === 'ready' && state.mode === 'cloud' ? state.user : { id: userId };
    persist(user, progress);
  }, [persist, state]);

  const retryLoad = useCallback(() => {
    if (state.phase !== 'load-error') return;
    activeUserId.current = null;
    void loadForUser(state.user);
  }, [loadForUser, state]);

  const retrySave = useCallback(() => {
    if (state.phase !== 'ready' || state.mode !== 'cloud') return;
    persist(state.user, latestProgress.current);
  }, [persist, state]);

  const signOut = useCallback(async () => {
    if (state.phase !== 'ready' || state.mode !== 'cloud') return;
    const user = state.user;
    const progress = latestProgress.current;
    signOutInProgress.current = true;
    const drain = saveGate.current.closeAndDrain();
    setState({ phase: 'signing-out', user, progress });
    let drainTimedOut = false;
    try {
      // The signing-out card offers no controls, so every wait behind it has to
      // be bounded. An in-flight save is the one gateway call the save queue
      // owns rather than this hook, and a stalled one would otherwise hold the
      // learner on a card that tells them to keep the page open.
      // Bound to the specific await, not to the whole block: the sign-out
      // request times out with the same error type, and blaming that on the
      // save path would report a save failure that did not happen.
      try {
        await withDeadline(drain, drainDeadlineMs);
      } catch (error) {
        drainTimedOut = error instanceof OperationTimeoutError;
        throw error;
      }
      if (lastSaveError.current) throw new Error(lastSaveError.current);
      await withDeadline(gateway.signOut(), deadlineMs);
      acceptUser(null);
    } catch (error) {
      const saveMessage = lastSaveError.current;
      signOutInProgress.current = false;
      saveGate.current.open();
      setState({
        phase: 'ready', mode: 'cloud', user, progress: latestProgress.current,
        // A drain that timed out is positive proof the write did not land, so
        // it must never be reported as saved: that would hide the failure and
        // leave the learner studying with no Retry and no way to know.
        saveState: saveMessage || drainTimedOut ? 'error' : 'saved',
        saveMessage: saveMessage
          ?? (drainTimedOut ? 'Saving took too long. Check your connection and try again.' : undefined),
        accountMessage: saveMessage || drainTimedOut
          ? 'Sign-out canceled until progress is saved.'
          : error instanceof OperationTimeoutError
            ? 'Signing out took too long. Check your connection and try again.'
            : `Unable to sign out: ${messageOf(error)}`,
      });
    }
  }, [acceptUser, gateway, state]);

  return {
    state,
    restoreSession,
    startOver,
    signInWithGoogle,
    sendEmailOtp,
    verifyEmailOtp,
    enterBeta,
    exitBeta,
    updateProgress,
    retryLoad,
    retrySave,
    signOut,
  };
}
