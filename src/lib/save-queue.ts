/** Serializes full-snapshot writes while allowing a later retry after failure. */
export class SaveQueue {
  private tail: Promise<void> = Promise.resolve();

  enqueue(write: () => Promise<void>): Promise<void> {
    this.tail = this.tail.catch(() => undefined).then(write);
    return this.tail;
  }

  settled(): Promise<void> {
    return this.tail;
  }
}
