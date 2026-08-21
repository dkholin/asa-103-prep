import { describe, expect, it } from 'vitest';
import { SaveGate } from './save-gate';

describe('SaveGate', () => {
  it('atomically rejects writes begun after sign-out starts and drains every earlier write', async () => {
    const gate = new SaveGate();
    gate.open();
    const events: string[] = [];
    let releaseAccepted!: () => void;
    const acceptedGate = new Promise<void>((resolve) => { releaseAccepted = resolve; });

    const accepted = gate.enqueue(async () => {
      events.push('accepted-start');
      await acceptedGate;
      events.push('accepted-finish');
    });
    const drain = gate.closeAndDrain();
    const tooLate = gate.enqueue(async () => { events.push('too-late'); });

    expect(accepted).not.toBeNull();
    expect(tooLate).toBeNull();
    releaseAccepted();
    await drain;
    expect(events).toEqual(['accepted-start', 'accepted-finish']);
  });

  it('can reopen after a canceled sign-out', async () => {
    const gate = new SaveGate();
    gate.open();
    await gate.closeAndDrain();
    expect(gate.enqueue(async () => undefined)).toBeNull();
    gate.open();
    await expect(gate.enqueue(async () => undefined)).resolves.toBeUndefined();
  });
});
