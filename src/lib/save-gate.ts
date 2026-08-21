import { SaveQueue } from './save-queue';

/**
 * Atomically stops accepting writes before exposing the queue drain promise.
 * JavaScript runs both operations in one synchronous turn, so a caller cannot
 * enqueue between the close and the tail capture.
 */
export class SaveGate {
  private accepting = false;
  private readonly queue = new SaveQueue();

  open() {
    this.accepting = true;
  }

  close() {
    this.accepting = false;
  }

  enqueue(write: () => Promise<void>): Promise<void> | null {
    if (!this.accepting) return null;
    return this.queue.enqueue(write);
  }

  closeAndDrain(): Promise<void> {
    this.close();
    return this.queue.settled();
  }
}
