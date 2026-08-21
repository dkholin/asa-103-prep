import { deserialize, serialize, type Progress } from './progress';
import type { AuthUser, CloudGateway } from './cloud';
import {
  emptyOnboardingAnswers,
  parseOnboardingRow,
  toOnboardingRow,
  type OnboardingAnswers,
} from './onboarding';

const PROGRESS_KEY = 'asa103.e2e.fake-cloud-progress.v1';
const ONBOARDING_KEY = 'asa103.e2e.fake-cloud-onboarding.v1';
const EXISTING_ACCOUNT_CREATED_AT = '2026-01-01T00:00:00.000Z';
const USER: AuthUser = {
  id: '00000000-0000-4000-8000-000000000103',
  email: 'learner@example.test',
  createdAt: EXISTING_ACCOUNT_CREATED_AT,
};

/** Test-only browser double. Production builds cannot enable this at runtime. */
export class FakeCloudGateway implements CloudGateway {
  private user: AuthUser | null;
  private listeners = new Set<(user: AuthUser | null) => void>();
  private failSessionOnce = new URLSearchParams(window.location.search).has('sessionError');
  private failLoadOnce = new URLSearchParams(window.location.search).has('loadError');
  private failSaveOnce = new URLSearchParams(window.location.search).has('saveError');
  private slowSaveOnce = new URLSearchParams(window.location.search).has('slowSave');
  private failSignOutOnce = new URLSearchParams(window.location.search).has('signOutError');
  private failOnboardingLoadOnce = new URLSearchParams(window.location.search).has('onboardingLoadError');
  private failOnboardingSaveOnce = new URLSearchParams(window.location.search).has('onboardingSaveError');
  // Onboarding is opt-in for browser tests: without the knob every learner
  // already has a record, so the existing specs still land on the dashboard.
  private onboarding = new URLSearchParams(window.location.search).has('onboarding');
  private newAccount = new URLSearchParams(window.location.search).has('newUser');

  constructor(startSignedOut = new URLSearchParams(window.location.search).has('signedOut')) {
    this.user = startSignedOut ? null : this.account();
  }

  private account(): AuthUser {
    return this.newAccount ? { ...USER, createdAt: new Date().toISOString() } : USER;
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
    this.setUser(this.account());
  }

  async sendMagicLink() {
    this.setUser(this.account());
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

  async loadOnboarding() {
    if (this.failOnboardingLoadOnce) {
      this.failOnboardingLoadOnce = false;
      throw new Error('Simulated onboarding load failure');
    }
    if (!this.onboarding) return emptyOnboardingAnswers();
    const raw = localStorage.getItem(ONBOARDING_KEY);
    if (!raw) return null;
    const answers = parseOnboardingRow(JSON.parse(raw));
    if (!answers) throw new Error('Stored onboarding answers have an invalid shape.');
    return answers;
  }

  async saveOnboarding(_userId: string, answers: OnboardingAnswers) {
    if (this.failOnboardingSaveOnce) {
      this.failOnboardingSaveOnce = false;
      throw new Error('Simulated onboarding save failure');
    }
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(toOnboardingRow(answers)));
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
