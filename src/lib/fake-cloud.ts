import { deserialize, serialize, type Progress } from './progress';
import type { AuthUser, CloudGateway } from './cloud';

const PROGRESS_KEY = 'asa103.e2e.fake-cloud-progress.v1';
const USER: AuthUser = { id: '00000000-0000-4000-8000-000000000103', email: 'learner@example.test' };

/** Test-only browser double. Production builds cannot enable this at runtime. */
export class FakeCloudGateway implements CloudGateway {
  private user: AuthUser | null;
  private listeners = new Set<(user: AuthUser | null) => void>();
  private failSessionOnce = new URLSearchParams(window.location.search).has('sessionError');
  private failLoadOnce = new URLSearchParams(window.location.search).has('loadError');
  private failSaveOnce = new URLSearchParams(window.location.search).has('saveError');
  private slowSaveOnce = new URLSearchParams(window.location.search).has('slowSave');
  private failSignOutOnce = new URLSearchParams(window.location.search).has('signOutError');

  constructor(startSignedOut = new URLSearchParams(window.location.search).has('signedOut')) {
    this.user = startSignedOut ? null : USER;
  }

  async getUser() {
    if (this.failSessionOnce) {
      this.failSessionOnce = false;
      throw new Error('Simulated session check failure');
    }
    return this.user;
  }

  onAuthChange(listener: (user: AuthUser | null) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async signInWithGoogle() {
    this.setUser(USER);
  }

  async sendMagicLink() {
    this.setUser(USER);
  }

  async loadProgress() {
    if (this.failLoadOnce) {
      this.failLoadOnce = false;
      throw new Error('Simulated cloud load failure');
    }
    return deserialize(localStorage.getItem(PROGRESS_KEY));
  }

  async saveProgress(_userId: string, progress: Progress) {
    if (this.slowSaveOnce) {
      this.slowSaveOnce = false;
      await new Promise((resolve) => window.setTimeout(resolve, 500));
    }
    if (this.failSaveOnce) {
      this.failSaveOnce = false;
      throw new Error('Simulated cloud save failure');
    }
    localStorage.setItem(PROGRESS_KEY, serialize(progress));
  }

  async signOut() {
    if (this.failSignOutOnce) {
      this.failSignOutOnce = false;
      throw new Error('Simulated sign-out failure');
    }
    this.setUser(null);
  }

  private setUser(user: AuthUser | null) {
    this.user = user;
    for (const listener of this.listeners) listener(user);
  }
}
