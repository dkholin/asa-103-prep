import { useState, type ReactNode } from 'react';
import { Dashboard } from './components/Dashboard';
import { LearnHome } from './components/learn/LearnHome';
import { LessonView } from './components/learn/LessonView';
import { MissedQuestions } from './components/MissedQuestions';
import { MockExam } from './components/MockExam';
import { Onboarding } from './components/Onboarding';
import { PracticeSession, type PracticeSessionMode } from './components/PracticeSession';
import { QUESTIONS } from './content/questions';
import {
  NoopAnalyticsClient,
  rememberSignupMethod,
  type AnalyticsClient,
  type SignupMethod,
} from './lib/analytics';
import { AnalyticsProvider } from './lib/analytics-context';
import { authRedirectUrl, type CloudGateway } from './lib/cloud';
import { emptyProgress, type Progress } from './lib/progress';
import { useCloudProgress } from './lib/useCloudProgress';
import { useOnboarding } from './lib/useOnboarding';

type View =
  | { name: 'dashboard' }
  | { name: 'practice'; title: string; questionIds: string[]; session: PracticeSessionMode }
  | { name: 'missed' }
  | { name: 'mock' }
  | { name: 'learn' }
  | { name: 'lesson'; lessonId: string };

export default function App(props: {
  gateway: CloudGateway | null;
  analytics?: AnalyticsClient;
  authCallbackMessage?: string | null;
}) {
  const { gateway, analytics = new NoopAnalyticsClient(), authCallbackMessage = null } = props;
  return (
    <AnalyticsProvider client={analytics}>
      {gateway ? (
        <CloudApp
          gateway={gateway}
          analytics={analytics}
          authCallbackMessage={authCallbackMessage}
        />
      ) : (
        <ConfigurationRequired />
      )}
    </AnalyticsProvider>
  );
}

function CloudApp(props: {
  gateway: CloudGateway;
  analytics: AnalyticsClient;
  authCallbackMessage: string | null;
}) {
  const { gateway, analytics, authCallbackMessage } = props;
  const cloud = useCloudProgress(gateway, analytics);

  if (cloud.state.phase === 'starting') return <StatusCard title="Restoring your session…" />;
  if (cloud.state.phase === 'session-error') {
    return (
      <StatusCard title="We couldn’t check your session" detail={cloud.state.message}>
        <button onClick={() => void cloud.restoreSession()}>Try again</button>
      </StatusCard>
    );
  }
  if (cloud.state.phase === 'signed-out') {
    return (
      <SignIn
        gateway={gateway}
        analytics={analytics}
        initialMessage={authCallbackMessage}
      />
    );
  }
  if (cloud.state.phase === 'loading') {
    return <StatusCard title="Loading your progress…" detail="Study controls unlock after the cloud copy is ready." />;
  }
  if (cloud.state.phase === 'load-error') {
    return (
      <StatusCard title="We couldn’t load your progress" detail={cloud.state.message}>
        <button onClick={cloud.retryLoad}>Try again</button>
      </StatusCard>
    );
  }
  if (cloud.state.phase === 'signing-out') {
    return (
      <StatusCard
        title="Finishing saves and signing out…"
        detail="Please keep this page open while your accepted progress changes finish saving."
      />
    );
  }

  return (
    <AuthenticatedApp
      gateway={gateway}
      analytics={analytics}
      userId={cloud.state.user.id}
      progress={cloud.state.progress}
      updateProgress={cloud.updateProgress}
      userLabel={cloud.state.user.email ?? 'Signed-in learner'}
      saveState={cloud.state.saveState}
      saveMessage={cloud.state.saveMessage}
      accountMessage={cloud.state.accountMessage}
      retrySave={cloud.retrySave}
      signOut={cloud.signOut}
    />
  );
}

function AuthenticatedApp(props: {
  gateway: CloudGateway;
  analytics: AnalyticsClient;
  userId: string;
  progress: Progress;
  updateProgress: (progress: Progress) => void;
  userLabel: string;
  saveState: 'saved' | 'saving' | 'error';
  saveMessage?: string;
  accountMessage?: string;
  retrySave: () => void;
  signOut: () => Promise<void>;
}) {
  const [view, setView] = useState<View>({ name: 'dashboard' });
  const goDashboard = () => setView({ name: 'dashboard' });
  const exitPractice = (session: PracticeSessionMode) => {
    if (session.mode === 'concept') {
      setView({ name: 'lesson', lessonId: session.lessonId });
      return;
    }
    goDashboard();
  };
  const onboarding = useOnboarding(props.gateway, props.analytics, props.userId);

  // Onboarding is checked before the study shell renders so a first-time
  // learner never sees the dashboard flash behind it. The wording matches the
  // progress-loading screen it continues, so the transition stays seamless.
  if (onboarding.state.phase === 'checking') {
    return (
      <StatusCard
        title="Loading your progress…"
        detail="Study controls unlock after the cloud copy is ready."
      />
    );
  }
  if (onboarding.state.phase !== 'done') {
    return (
      <Onboarding
        state={onboarding.state}
        onSubmit={onboarding.submit}
        onRetry={onboarding.retry}
        onContinue={onboarding.dismiss}
      />
    );
  }

  return (
    <div className="app">
      <header className="app-shell-header">
        <div className="app-shell-row">
          <div className="brand">
            <h1 style={{ margin: 0 }}>
              <button className="linklike title" onClick={goDashboard}>ASA 103 Prep</button>
            </h1>
            <p className="subtitle">Navigation Rules, Charts, Systems &amp; Safety — practice tool</p>
          </div>
          <nav className="shell-nav" aria-label="Sections">
            <button className={view.name === 'dashboard' ? 'active' : ''} onClick={goDashboard}>Dashboard</button>
            {/* A lesson is reached only through Learn, so it keeps Learn lit. */}
            <button
              className={view.name === 'learn' || view.name === 'lesson' ? 'active' : ''}
              onClick={() => setView({ name: 'learn' })}
            >
              Learn
            </button>
            <button className={view.name === 'missed' ? 'active' : ''} onClick={() => setView({ name: 'missed' })}>
              Review ({props.progress.reviewQueue.length})
            </button>
            <button className={view.name === 'mock' ? 'active' : ''} onClick={() => setView({ name: 'mock' })}>Exam</button>
          </nav>
          <div className="account-controls">
            {/* The label is the learner's email address, so it is blocked
                from session replay rather than merely masked. */}
            <span className="account-label" data-ph-no-capture>{props.userLabel}</span>
            <button className="secondary compact" onClick={() => void props.signOut()}>Sign out</button>
          </div>
        </div>
        <div className={`cloud-status cloud-${props.saveState}`} role="status">
          {props.saveState === 'saved' && 'Progress saved'}
          {props.saveState === 'saving' && 'Saving progress…'}
          {props.saveState === 'error' && (
            <>
              Progress not saved{props.saveMessage ? `: ${props.saveMessage}` : ''}{' '}
              <button className="linklike" onClick={props.retrySave}>Retry</button>
            </>
          )}
          {props.accountMessage && <span> · {props.accountMessage}</span>}
        </div>
      </header>
      <main>
        {view.name === 'dashboard' && (
          <Dashboard
            progress={props.progress}
            onStartTopic={(topicId, title) => setView({
              name: 'practice', title,
              questionIds: QUESTIONS.filter((q) => q.topic === topicId).map((q) => q.id),
              session: { mode: 'topic', topic: topicId },
            })}
            onOpenMissed={() => setView({ name: 'missed' })}
            onStartMock={() => setView({ name: 'mock' })}
            onReset={() => {
              if (window.confirm('Reset all saved study progress?')) props.updateProgress(emptyProgress());
            }}
          />
        )}
        {view.name === 'practice' && (
          <PracticeSession
            key={view.title + view.questionIds.join(',')}
            title={view.title}
            questionIds={view.questionIds}
            session={view.session}
            progress={props.progress}
            updateProgress={props.updateProgress}
            onExit={() => exitPractice(view.session)}
          />
        )}
        {view.name === 'missed' && (
          <MissedQuestions
            progress={props.progress}
            onReviewAll={(ids) => setView({
              name: 'practice', title: 'Missed question review', questionIds: ids,
              session: { mode: 'review' },
            })}
            onReviewOne={(id) => setView({
              name: 'practice', title: 'Missed question review', questionIds: [id],
              session: { mode: 'review' },
            })}
            onExit={goDashboard}
          />
        )}
        {view.name === 'mock' && (
          <MockExam progress={props.progress} updateProgress={props.updateProgress} onExit={goDashboard} />
        )}
        {view.name === 'learn' && (
          <LearnHome
            progress={props.progress}
            onOpenLesson={(lessonId) => setView({ name: 'lesson', lessonId })}
            onExit={goDashboard}
          />
        )}
        {view.name === 'lesson' && (
          // Keyed by lesson id so each open is a fresh component instance, the
          // same way a practice session is: that is what makes the once-per-
          // open guard inside LessonView correct across prev/next.
          <LessonView
            key={view.lessonId}
            lessonId={view.lessonId}
            progress={props.progress}
            updateProgress={props.updateProgress}
            onOpenLesson={(lessonId) => setView({ name: 'lesson', lessonId })}
            onStartPractice={(lesson, questionIds) => setView({
              name: 'practice',
              title: `${lesson.title} practice`,
              questionIds,
              session: { mode: 'concept', lessonId: lesson.id },
            })}
            onExit={() => setView({ name: 'learn' })}
          />
        )}
      </main>
    </div>
  );
}

function SignIn(props: {
  gateway: CloudGateway;
  analytics: AnalyticsClient;
  initialMessage: string | null;
}) {
  const { gateway, analytics, initialMessage } = props;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(initialMessage);
  const [busy, setBusy] = useState(false);
  const redirectTo = authRedirectUrl();

  // Both methods leave the page, so the chosen method is remembered here for
  // the signup_completed that follows the callback. It is a fixed token.
  const begin = (method: SignupMethod) => {
    analytics.capture({ name: 'signup_started', properties: { method } });
    rememberSignupMethod(method);
  };

  const run = async (operation: () => Promise<void>, success?: string) => {
    setBusy(true);
    setMessage(null);
    try {
      await operation();
      if (success) setMessage(success);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Sign-in failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-shell">
      <section className="card auth-card" aria-label="Sign in">
        <h1>ASA 103 Prep</h1>
        <h2>Sign in to study</h2>
        <p className="muted">Your progress is saved to your account and available on your other devices.</p>
        <button className="large auth-primary" disabled={busy} onClick={() => {
          begin('google');
          void run(() => gateway.signInWithGoogle(redirectTo));
        }}>
          Continue with Google
        </button>
        <div className="auth-divider"><span>or use email</span></div>
        <form onSubmit={(event) => {
          event.preventDefault();
          begin('email');
          void run(() => gateway.sendMagicLink(email.trim(), redirectTo), 'Check your email for a secure sign-in link.');
        }}>
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <button className="secondary" disabled={busy || !email.trim()} type="submit">Email me a sign-in link</button>
        </form>
        {message && <p role="alert" className="auth-message">{message}</p>}
        {analytics.enabled && (
          <p className="muted privacy-note" data-testid="analytics-disclosure">
            We record anonymized product analytics and a masked session replay to improve this study
            tool. Every form input, including this email field, is masked in the replay, and your
            email address is never sent to analytics.
          </p>
        )}
      </section>
    </div>
  );
}

function StatusCard(props: { title: string; detail?: string; children?: ReactNode }) {
  return (
    <div className="auth-shell">
      <section className="card auth-card" role="status">
        <h1>ASA 103 Prep</h1>
        <h2>{props.title}</h2>
        {props.detail && <p className="muted">{props.detail}</p>}
        {props.children}
      </section>
    </div>
  );
}

function ConfigurationRequired() {
  return (
    <StatusCard
      title="Service configuration required"
      detail="Authentication is not configured for this deployment. The site owner must provide the public Supabase URL and publishable key."
    />
  );
}
