import { describe, expect, it } from 'vitest';
import { SaveQueue } from './save-queue';

describe('SaveQueue', () => {
  it('finishes snapshots in enqueue order even when the first request is slower', async () => {
    const queue = new SaveQueue();
    const events: string[] = [];
    let releaseFirst!: () => void;
    let markStarted!: () => void;
    const firstGate = new Promise<void>((resolve) => { releaseFirst = resolve; });
    const started = new Promise<void>((resolve) => { markStarted = resolve; });

    const first = queue.enqueue(async () => {
      events.push('first-start');
      markStarted();
      await firstGate;
      events.push('first-finish');
    });
    const second = queue.enqueue(async () => { events.push('second'); });

    await started;
    expect(events).toEqual(['first-start']);
    releaseFirst();
    await Promise.all([first, second]);
    expect(events).toEqual(['first-start', 'first-finish', 'second']);
  });

  it('allows a retry after a failed write', async () => {
    const queue = new SaveQueue();
    await expect(queue.enqueue(async () => { throw new Error('offline'); })).rejects.toThrow('offline');
    await expect(queue.enqueue(async () => undefined)).resolves.toBeUndefined();
    await expect(queue.settled()).resolves.toBeUndefined();
  });
});
