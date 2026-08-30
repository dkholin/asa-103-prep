import { deserialize, serialize, type Progress } from './progress';
import { OperationTimeoutError } from './auth-reliability';
import type { AuthChange, AuthUser, CloudGateway, VerifiedEmailOtp } from './cloud';
import {
  emptyOnboardingAnswers,
  parseOnboardingRow,
  toOnboardingRow,
  type OnboardingAnswers,
} from './onboarding';

const PROGRESS_KEY = 'asa103.e2e.fake-cloud-progress.v1';
const ONBOARDING_KEY = 'asa103.e2e.fake-cloud-onboarding.v1';
const AUTH_USER_KEY = 'asa103.e2e.fake-auth-user.v1';
const EXISTING_ACCOUNT_CREATED_AT = '2026-01-01T00:00:00.000Z';
const USER: AuthUser = {
  id: '00000000-0000-4000-8000-000000000103',
  email: 'learner@example.test',
  createdAt: EXISTING_ACCOUNT_CREATED_AT,
};
const USER_A: AuthUser = { ...USER, id: '00000000-0000-4000-8000-00000000010a' };
const USER_B: AuthUser = { ...USER, id: '00000000-0000-4000-8000-00000000010b' };

declare global {
  interface Window {
    /** Present only in E2E builds using the providerSignOut knob. */
    __fakeProviderSignOut?: () => void;
  }
}

/** Test-only browser double. Production builds cannot enable this at runtime. */
export class FakeCloudGateway implements CloudGateway {
  private user: AuthUser | null;
  private listeners = new Set<(change: AuthChange) => void>();
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
  private params = new URLSearchParams(window.location.search);
  private sessionCalls = 0;
  private hangSaveOnce = new URLSearchParams(window.location.search).has('saveHangOnce');

  constructor(startSignedOut = new URLSearchParams(window.location.search).has('signedOut')) {
    this.user = startSignedOut ? null : this.account();
    if (this.params.has('otpCloudRace')) {
      const persisted = localStorage.getItem(AUTH_USER_KEY);
      if (persisted === USER_A.id) this.user = USER_A;
      if (persisted === USER_B.id) this.user = USER_B;
    }
    if (this.params.has('authNewerDuringRestore')) {
      window.setTimeout(() => this.setUser(this.account(), 'SIGNED_IN'), 50);
    }
    if (this.params.has('providerSignOut')) {
      // Stands in for auth-js emitting SIGNED_OUT on its own: a revoked refresh
      // token, or a sign-out broadcast from another tab.
      window.__fakeProviderSignOut = () => this.setUser(null, 'SIGNED_OUT');
    }
  }

  private account(): AuthUser {
    return this.newAccount ? { ...USER, createdAt: new Date().toISOString() } : USER;
  }

  async getUser() {
    this.sessionCalls += 1;
    if (this.params.has('sessionHang') && this.sessionCalls === 1) {
      return new Promise<AuthUser | null>(() => {});
    }
    if (this.params.has('sessionOldLate') && this.sessionCalls === 1) {
      return new Promise<AuthUser | null>((resolve) => window.setTimeout(() => resolve(null), 350));
    }
    if (this.params.has('authNewerDuringRestore') && this.sessionCalls === 1) {
      return new Promise<AuthUser | null>((resolve) => window.setTimeout(() => resolve(null), 350));
    }
    if (this.params.has('sessionTimeoutLate') && this.sessionCalls === 1) {
      return new Promise<AuthUser | null>((resolve) => window.setTimeout(() => resolve(this.user), 400));
    }
    if (this.failSessionOnce) {
      this.failSessionOnce = false;
      throw new Error('Simulated session check failure');
    }
    return this.user;
  }

  onAuthChange(listener: (change: AuthChange) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async signInWithGoogle() {
    this.setUser(this.account(), 'SIGNED_IN');
  }

  async sendEmailOtp() {
    if (this.params.has('otpSendHang')) return new Promise<void>(() => {});
    if (this.params.has('otpSendTimeout')) throw new OperationTimeoutError();
    if (this.params.has('otpRateLimit')) {
      this.params.delete('otpRateLimit');
      throw { status: 429, message: 'over_email_send_rate_limit' };
    }
  }

  async verifyEmailOtp(_email: string, token: string) {
    if (this.params.has('otpVerifyHang')) return new Promise<VerifiedEmailOtp>(() => {});
    if (this.params.has('otpVerifyTimeout')) throw new OperationTimeoutError();
    if (this.params.has('otpVerifyLate')) {
      await new Promise((resolve) => window.setTimeout(resolve, 350));
    }
    if (this.params.has('otpCloudRace') && token.toUpperCase() === 'USERA') {
      await new Promise((resolve) => window.setTimeout(resolve, 400));
      return { user: USER_A, activate: async () => {
        localStorage.setItem(AUTH_USER_KEY, USER_A.id);
        this.setUser(USER_A, 'SIGNED_IN');
      } };
    }
    if (this.params.has('otpCloudRace') && token.toUpperCase() === 'USERB') {
      return { user: USER_B, activate: async () => {
        localStorage.setItem(AUTH_USER_KEY, USER_B.id);
        this.setUser(USER_B, 'SIGNED_IN');
      } };
    }
    if (token.toUpperCase() === 'EXPIRED') throw new Error('Token has expired');
    if (token.toUpperCase() === 'INVALID') throw new Error('Token is invalid');
    const user = this.account();
    return { user, activate: async () => this.setUser(user, 'SIGNED_IN') };
  }

  async clearLocalSession() {
    if (this.params.has('clearHang')) return new Promise<void>(() => {});
    if (this.params.has('clearLate')) {
      localStorage.removeItem(AUTH_USER_KEY);
      this.user = null;
      await new Promise((resolve) => window.setTimeout(resolve, 350));
      return;
    }
    localStorage.removeItem(AUTH_USER_KEY);
    this.user = null;
  }

  async loadProgress() {
    if (this.params.has('loadHang')) return new Promise<Progress>(() => {});
    if (this.params.has('loadNetwork')) throw new TypeError('Load failed');
    if (this.failLoadOnce) {
      this.failLoadOnce = false;
      throw new Error('Simulated cloud load failure');
    }
    return deserialize(localStorage.getItem(PROGRESS_KEY));
  }

  async saveProgress(_userId: string, progress: Progress) {
    if (this.params.has('saveHang')) return new Promise<void>(() => {});
    if (this.hangSaveOnce) {
      this.hangSaveOnce = false;
      return new Promise<void>(() => {});
    }
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
    if (this.params.has('onboardingLoadHang')) return new Promise<OnboardingAnswers | null>(() => {});
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
    if (this.params.has('onboardingSaveHang')) return new Promise<void>(() => {});
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
    localStorage.removeItem(AUTH_USER_KEY);
    this.setUser(null, 'SIGNED_OUT');
  }

  private setUser(user: AuthUser | null, event: AuthChange['event']) {
    this.user = user;
    for (const listener of this.listeners) listener({ event, user });
  }
}
