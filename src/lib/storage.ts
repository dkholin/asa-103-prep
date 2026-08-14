import { deserialize, serialize, type Progress } from './progress';

export const STORAGE_KEY = 'asa103.progress.v1';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function loadProgress(storage: StorageLike = localStorage): Progress {
  return deserialize(storage.getItem(STORAGE_KEY));
}

export function saveProgress(p: Progress, storage: StorageLike = localStorage): void {
  storage.setItem(STORAGE_KEY, serialize(p));
}

export function clearProgress(storage: StorageLike = localStorage): void {
  storage.removeItem(STORAGE_KEY);
}
