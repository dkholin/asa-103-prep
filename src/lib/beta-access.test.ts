import { beforeAll, describe, expect, it } from 'vitest';
import {
  BETA_ACTIVE_KEY,
  BETA_PROGRESS_KEY,
  betaCodeId,
  clearActiveBetaAccess,
  loadBetaProgress,
  rememberBetaAccess,
  restoreBetaAccess,
  saveBetaProgress,
  validateBetaCode,
} from './beta-access';
import { emptyProgress, recordAnswer } from './progress';

beforeAll(async () => {
  if (!globalThis.crypto?.subtle) {
    const { webcrypto } = await import('node:crypto');
    Object.defineProperty(globalThis, 'crypto', { value: webcrypto });
  }
  if (!globalThis.btoa) {
    Object.defineProperty(globalThis, 'btoa', {
      value: (value: string) => Buffer.from(value, 'binary').toString('base64'),
    });
  }
});

function memoryStorage(): Storage {
  const values = new Map<string, string>();
  return {
    get length() { return values.size; },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    removeItem: (key) => void values.delete(key),
    setItem: (key, value) => void values.set(key, value),
  };
}

describe('beta access', () => {
  it('accepts a shipped derived id and rejects invalid codes without storing plaintext', async () => {
    const code = 'SAIL-7K4P-Q9M2';
    const id = await betaCodeId(code);
    expect(await validateBetaCode(code.toLowerCase(), [id])).toBe(id);
    expect(await validateBetaCode('SAIL-WRNG-CODE', [id])).toBeNull();
    expect(id).not.toContain(code);
  });

  it('persists access only while the code id remains shipped', async () => {
    const storage = memoryStorage();
    const id = await betaCodeId('SAIL-7K4P-Q9M2');
    expect(rememberBetaAccess(id, storage)).toBe(true);
    expect(restoreBetaAccess([id], storage)).toBe(id);
    expect(storage.getItem(BETA_ACTIVE_KEY)).not.toContain('SAIL-');

    expect(restoreBetaAccess([], storage)).toBeNull();
    expect(storage.getItem(BETA_ACTIVE_KEY)).toBeNull();
  });

  it('retains beta progress when beta access is exited', async () => {
    const storage = memoryStorage();
    const id = await betaCodeId('SAIL-7K4P-Q9M2');
    const progress = recordAnswer(emptyProgress(), 'rules-1', false);
    rememberBetaAccess(id, storage);
    expect(saveBetaProgress(progress, storage)).toBe(true);

    clearActiveBetaAccess(storage);
    expect(restoreBetaAccess([id], storage)).toBeNull();
    expect(loadBetaProgress(storage)).toEqual(progress);
    expect(storage.getItem(BETA_PROGRESS_KEY)).not.toBeNull();
  });

  it('isolates the beta namespace from cloud and legacy progress keys', () => {
    const storage = memoryStorage();
    storage.setItem('asa103.e2e.fake-cloud-progress.v1', JSON.stringify(recordAnswer(emptyProgress(), 'cloud', true)));
    storage.setItem('asa103.progress.v1', JSON.stringify(recordAnswer(emptyProgress(), 'legacy', true)));
    expect(loadBetaProgress(storage)).toEqual(emptyProgress());
  });
});
