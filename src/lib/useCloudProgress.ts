import { useCallback, useEffect, useRef, useState } from 'react';
import { emptyProgress, type Progress } from './progress';
import type { AuthUser, CloudGateway } from './cloud';
import { SaveGate } from './save-gate';

export type CloudProgressState =
  | { phase: 'starting' }
  | { phase: 'session-error'; message: string }
  | { phase: 'signed-out' }
  | { phase: 'loading'; user: AuthUser }
  | { phase: 'load-error'; user: AuthUser; message: string }
  | { phase: 'signing-out'; user: AuthUser; progress: Progress }
  | {
      phase: 'ready';
      user: AuthUser;
      progress: Progress;
      saveState: 'saved' | 'saving' | 'error';
      saveMessage?: string;
      accountMessage?: string;
    };

const messageOf = (error: unknown) =>
  error instanceof Error ? error.message : 'The cloud service returned an unexpected error.';

export function useCloudProgress(gateway: CloudGateway) {
  const [state, setState] = useState<CloudProgressState>({ phase: 'starting' });
  const activeUserId = useRef<string | null>(null);
  const loadGeneration = useRef(0);
  const latestProgress = useRef<Progress>(emptyProgress());
  const saveGate = useRef(new SaveGate());
  const saveGeneration = useRef(0);
  const lastSaveError = useRef<string | null>(null);
  const signOutInProgress = useRef(false);

  const loadForUser = useCallback(
    async (user: AuthUser) => {
      if (activeUserId.current === user.id) return;
      saveGate.current.close();
      activeUserId.current = user.id;
      const generation = ++loadGeneration.current;
      setState({ phase: 'loading', user });
      try {
        const progress = await gateway.loadProgress(user.id);
        if (generation !== loadGeneration.current || activeUserId.current !== user.id) return;
        latestProgress.current = progress;
        lastSaveError.current = null;
        signOutInProgress.current = false;
        saveGate.current.open();
        setState({ phase: 'ready', user, progress, saveState: 'saved' });
      } catch (error) {
        if (generation !== loadGeneration.current || activeUserId.current !== user.id) return;
        setState({ phase: 'load-error', user, message: messageOf(error) });
      }
    },
    [gateway],
  );

  const acceptUser = useCallback(
    (user: AuthUser | null) => {
      if (user) {
        void loadForUser(user);
      } else {
        saveGate.current.close();
        signOutInProgress.current = false;
        activeUserId.current = null;
        ++loadGeneration.current;
        setState({ phase: 'signed-out' });
      }
    },
    [loadForUser],
  );

  const restoreSession = useCallback(async () => {
    setState({ phase: 'starting' });
    try {
      acceptUser(await gateway.getUser());
    } catch (error) {
      setState({ phase: 'session-error', message: messageOf(error) });
    }
  }, [acceptUser, gateway]);

  useEffect(() => {
    let live = true;
    const unsubscribe = gateway.onAuthChange((user) => live && acceptUser(user));
    void gateway
      .getUser()
      .then((user) => live && acceptUser(user))
      .catch((error) => {
        if (live) setState({ phase: 'session-error', message: messageOf(error) });
      });
    return () => {
      live = false;
      unsubscribe();
      activeUserId.current = null;
      ++loadGeneration.current;
    };
  }, [acceptUser, gateway]);

  const persist = useCallback(
    (user: AuthUser, progress: Progress) => {
      const write = saveGate.current.enqueue(() => gateway.saveProgress(user.id, progress));
      if (!write) return false;
      const generation = ++saveGeneration.current;
      latestProgress.current = progress;
      lastSaveError.current = null;
      setState({ phase: 'ready', user, progress, saveState: 'saving' });

      // Every write waits for the prior write. This prevents an older request
      // finishing after a newer request and replacing the newer snapshot.
      void write
        .then(() => {
          if (generation !== saveGeneration.current || activeUserId.current !== user.id) return;
          lastSaveError.current = null;
          if (signOutInProgress.current) return;
          setState({ phase: 'ready', user, progress: latestProgress.current, saveState: 'saved' });
        })
        .catch((error) => {
          if (generation !== saveGeneration.current || activeUserId.current !== user.id) return;
          const message = messageOf(error);
          lastSaveError.current = message;
          if (signOutInProgress.current) return;
          setState({
            phase: 'ready',
            user,
            progress: latestProgress.current,
            saveState: 'error',
            saveMessage: message,
          });
        });
      return true;
    },
    [gateway],
  );

  const updateProgress = useCallback(
    (progress: Progress) => {
      const userId = activeUserId.current;
      if (!userId) return;
      const user = state.phase === 'ready' ? state.user : { id: userId };
      persist(user, progress);
    },
    [persist, state],
  );

  const retryLoad = useCallback(() => {
    if (state.phase !== 'load-error') return;
    activeUserId.current = null;
    void loadForUser(state.user);
  }, [loadForUser, state]);

  const retrySave = useCallback(() => {
    if (state.phase !== 'ready') return;
    persist(state.user, latestProgress.current);
  }, [persist, state]);

  const signOut = useCallback(async () => {
    const userId = activeUserId.current;
    if (!userId) return;
    const user = state.phase === 'ready' ? state.user : { id: userId };
    const progress = latestProgress.current;
    // closeAndDrain closes synchronously before it captures the queue tail.
    signOutInProgress.current = true;
    const drain = saveGate.current.closeAndDrain();
    setState({ phase: 'signing-out', user, progress });
    try {
      await drain;
      if (lastSaveError.current) throw new Error(lastSaveError.current);
      await gateway.signOut();
      acceptUser(null);
    } catch (error) {
      const saveMessage = lastSaveError.current;
      signOutInProgress.current = false;
      saveGate.current.open();
      setState({
        phase: 'ready',
        user,
        progress: latestProgress.current,
        saveState: saveMessage ? 'error' : 'saved',
        saveMessage: saveMessage ?? undefined,
        accountMessage: saveMessage
          ? 'Sign-out canceled until progress is saved.'
          : `Unable to sign out: ${messageOf(error)}`,
      });
    }
  }, [acceptUser, gateway, state]);

  return { state, restoreSession, updateProgress, retryLoad, retrySave, signOut };
}
