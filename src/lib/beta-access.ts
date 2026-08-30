import { deserialize, serialize, type Progress } from './progress';

export const BETA_ACTIVE_KEY = 'asa103.beta-access.active.v1';
export const BETA_PROGRESS_KEY = 'asa103.beta-progress.v1';

// Public derived identifiers only. The corresponding plaintext codes are
// deliberately kept outside the repository.
export const ALLOWED_BETA_CODE_IDS = [
  'uEVlLR7kzzN3IMkZCIdl6GMng_C8I-cl9vzekjaEXuM',
] as const;

type BetaMarker = { version: 1; codeId: string };

export function normalizeBetaCode(value: string): string {
  return value.trim().toUpperCase();
}

export async function betaCodeId(code: string): Promise<string> {
  const bytes = new TextEncoder().encode(normalizeBetaCode(code));
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const binary = String.fromCharCode(...new Uint8Array(digest));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function validateBetaCode(
  code: string,
  allowedIds: readonly string[] = ALLOWED_BETA_CODE_IDS,
): Promise<string | null> {
  const normalized = normalizeBetaCode(code);
  if (!/^SAIL-[2-9A-HJKMNP-Z]{4}-[2-9A-HJKMNP-Z]{4}$/.test(normalized)) return null;
  const id = await betaCodeId(normalized);
  return allowedIds.includes(id) ? id : null;
}

function storageOrNull(storage?: Storage | null): Storage | null {
  if (storage !== undefined) return storage;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function rememberBetaAccess(codeId: string, storage?: Storage | null): boolean {
  try {
    const target = storageOrNull(storage);
    if (!target) return false;
    const marker: BetaMarker = { version: 1, codeId };
    target.setItem(BETA_ACTIVE_KEY, JSON.stringify(marker));
    return true;
  } catch {
    return false;
  }
}

export function clearActiveBetaAccess(storage?: Storage | null): void {
  try {
    storageOrNull(storage)?.removeItem(BETA_ACTIVE_KEY);
  } catch {
    // Storage can disappear in private mode. Exit still succeeds in memory.
  }
}

export function restoreBetaAccess(
  allowedIds: readonly string[] = ALLOWED_BETA_CODE_IDS,
  storage?: Storage | null,
): string | null {
  const target = storageOrNull(storage);
  if (!target) return null;
  try {
    const parsed = JSON.parse(target.getItem(BETA_ACTIVE_KEY) ?? 'null') as Partial<BetaMarker> | null;
    if (parsed?.version === 1 && typeof parsed.codeId === 'string' && allowedIds.includes(parsed.codeId)) {
      return parsed.codeId;
    }
    target.removeItem(BETA_ACTIVE_KEY);
    return null;
  } catch {
    try { target.removeItem(BETA_ACTIVE_KEY); } catch { /* best effort */ }
    return null;
  }
}

export function loadBetaProgress(storage?: Storage | null): Progress {
  try {
    return deserialize(storageOrNull(storage)?.getItem(BETA_PROGRESS_KEY) ?? null);
  } catch {
    return deserialize(null);
  }
}

export function saveBetaProgress(progress: Progress, storage?: Storage | null): boolean {
  try {
    const target = storageOrNull(storage);
    if (!target) return false;
    target.setItem(BETA_PROGRESS_KEY, serialize(progress));
    return true;
  } catch {
    return false;
  }
}
