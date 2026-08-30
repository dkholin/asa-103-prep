import { useEffect, useState, type ReactNode } from 'react';
import { AccountMenu } from './components/AccountMenu';
import { Dashboard } from './components/Dashboard';
import { Home } from './components/Home';
import { LearnHome } from './components/learn/LearnHome';
import { LessonView } from './components/learn/LessonView';
import { MissedQuestions } from './components/MissedQuestions';
import { MockExam } from './components/MockExam';
import { Onboarding } from './components/Onboarding';
import { PracticeSession, type PracticeSessionMode } from './components/PracticeSession';
import { QUESTIONS } from './content/questions';
import { NoopAnalyticsClient, type AnalyticsClient } from './lib/analytics';
import { AnalyticsProvider } from './lib/analytics-context';
import type { CloudGateway } from './lib/cloud';
import { emptyProgress, type Progress } from './lib/progress';
import { useCloudProgress } from './lib/useCloudProgress';
import type { AuthActionResult } from './lib/useCloudProgress';
import { useOnboarding } from './lib/useOnboarding';

type View =
  | { name: 'home' }
  | { name: 'dashboard' }
  | { name: 'practice'; title: string; questionIds: string[]; session: PracticeSessionMode }
  | { name: 'missed' }
  | { name: 'mock'; entryPoint: 'mock_exam' | 'home' | 'practice' }
  | { name: 'learn' }
  | { name: 'lesson'; lessonId: string };

export default function App(props: {
  gateway: CloudGateway | null;
  analytics?: AnalyticsClient;
  authCallbackMessage?: string | null;
  allowedBetaCodeIds?: readonly string[];
}) {
  const { gateway, analytics = new NoopAnalyticsClient(), authCallbackMessage = null } = props;
  return (
    <AnalyticsProvider client={analytics}>
      {gateway ? (
        <CloudApp
          gateway={gateway}
          analytics={analytics}
          authCallbackMessage={authCallbackMessage}
          allowedBetaCodeIds={props.allowedBetaCodeIds}
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
  allowedBetaCodeIds?: readonly string[];
}) {
  const { gateway, analytics, authCallbackMessage, allowedBetaCodeIds } = props;
  const cloud = useCloudProgress(gateway, analytics, allowedBetaCodeIds);

  if (cloud.state.phase === 'starting') {
    return (
      <StatusCard title="Restoring your session…">
        <RecoveryActions
          onTryAgain={cloud.restoreSession}
          onStartOver={cloud.startOver}
          onEnterBeta={cloud.enterBeta}
        />
      </StatusCard>
    );
  }
  if (cloud.state.phase === 'starting-over') {
    return (
      <StatusCard title="Starting over…" detail="Clearing this device’s account session.">
        <BetaAccessForm onEnter={cloud.enterBeta} />
      </StatusCard>
    );
  }
  if (cloud.state.phase === 'session-error') {
    return (
      <StatusCard title="We couldn’t check your session" detail={cloud.state.message}>
        <RecoveryActions
          onTryAgain={cloud.restoreSession}
          onStartOver={cloud.startOver}
          onEnterBeta={cloud.enterBeta}
        />
      </StatusCard>
    );
  }
  if (cloud.state.phase === 'signed-out') {
    return (
      <SignIn
        analytics={analytics}
        initialMessage={authCallbackMessage}
        onGoogle={cloud.signInWithGoogle}
        onSendEmailOtp={cloud.sendEmailOtp}
        onVerifyEmailOtp={cloud.verifyEmailOtp}
        onEnterBeta={cloud.enterBeta}
      />
    );
  }
  if (cloud.state.phase === 'loading') {
    return (
      <StatusCard title="Loading your progress…" detail="Study controls unlock after the cloud copy is ready.">
        <BetaAccessForm onEnter={cloud.enterBeta} />
      </StatusCard>
    );
  }
  if (cloud.state.phase === 'load-error') {
    return (
      <StatusCard title="We couldn’t load your progress" detail={cloud.state.message}>
        <RecoveryActions
          onTryAgain={cloud.retryLoad}
          onStartOver={cloud.startOver}
          onEnterBeta={cloud.enterBeta}
        />
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

  if (cloud.state.mode === 'beta') {
    return (
      <AuthenticatedApp
        progress={cloud.state.progress}
        updateProgress={cloud.updateProgress}
        saveState={cloud.state.saveState}
        saveMessage={cloud.state.saveMessage}
        accountLabel="Beta access"
        accountDetail="Beta access · progress saved on this device"
        accountActionLabel="Exit beta access"
        accountAction={cloud.exitBeta}
      />
    );
  }

  return (
    <CloudAuthenticatedApp
      gateway={gateway}
      analytics={analytics}
      userId={cloud.state.user.id}
      progress={cloud.state.progress}
      updateProgress={cloud.updateProgress}
      saveState={cloud.state.saveState}
      saveMessage={cloud.state.saveMessage}
      accountMessage={cloud.state.accountMessage}
      retrySave={cloud.retrySave}
      signOut={cloud.signOut}
    />
  );
}

function CloudAuthenticatedApp(props: {
  gateway: CloudGateway;
  analytics: AnalyticsClient;
  userId: string;
  progress: Progress;
  updateProgress: (progress: Progress) => void;
  saveState: 'saved' | 'saving' | 'error';
  saveMessage?: string;
  accountMessage?: string;
  retrySave: () => void;
  signOut: () => Promise<void>;
}) {
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
    <AuthenticatedApp
      progress={props.progress}
      updateProgress={props.updateProgress}
      saveState={props.saveState}
      saveMessage={props.saveMessage}
      accountMessage={props.accountMessage}
      retrySave={props.retrySave}
      accountLabel="Account"
      accountActionLabel="Sign out"
      accountAction={() => void props.signOut()}
    />
  );
}

function AuthenticatedApp(props: {
  progress: Progress;
  updateProgress: (progress: Progress) => void;
  saveState: 'saved' | 'saving' | 'error';
  saveMessage?: string;
  accountMessage?: string;
  retrySave?: () => void;
  accountLabel: string;
  accountDetail?: string;
  accountActionLabel: string;
  accountAction: () => void;
}) {
  const [view, setView] = useState<View>({ name: 'home' });
  const goHome = () => setView({ name: 'home' });
  const goPractice = () => setView({ name: 'dashboard' });
  const exitPractice = (session: PracticeSessionMode) => {
    if (session.mode === 'concept') {
      setView({ name: 'lesson', lessonId: session.lessonId });
      return;
    }
    goPractice();
  };

  return (
    <div className="app">
      <header className="app-shell-header">
        <div className="app-shell-row">
          <div className="brand">
            <h1 style={{ margin: 0 }}>
              <button className="linklike title" onClick={goHome}>ASA 103 Prep</button>
            </h1>
            <p className="subtitle">Navigation Rules, Charts, Systems &amp; Safety — practice tool</p>
          </div>
          {/* Account sits alongside the section links rather than inside the
              <nav>: it opens a menu, not a screen, so it is not a "section". */}
          <div className="shell-controls">
            <nav className="shell-nav" aria-label="Sections">
              <button className={view.name === 'home' ? 'active' : ''} onClick={goHome}>Home</button>
              {/* A lesson is reached only through Learn, so it keeps Learn lit. */}
              <button
                className={view.name === 'learn' || view.name === 'lesson' ? 'active' : ''}
                onClick={() => setView({ name: 'learn' })}
              >
                Learn
              </button>
              {/* "Practice" is the label for the dashboard view; the view, its
                  component, and its landmark keep their original names. */}
              <button
                className={view.name === 'dashboard' || view.name === 'practice' || view.name === 'missed' ? 'active' : ''}
                onClick={goPractice}
              >
                Practice
              </button>
              <button
                className={view.name === 'mock' ? 'active' : ''}
                onClick={() => setView({ name: 'mock', entryPoint: 'mock_exam' })}
              >
                Mock Exam
              </button>
            </nav>
            <div className="account-cluster">
              {props.accountDetail && <span className="beta-mode-label">{props.accountDetail}</span>}
              <AccountMenu
                label={props.accountLabel}
                actionLabel={props.accountActionLabel}
                onAction={props.accountAction}
              />
            </div>
          </div>
        </div>
        {/*
          Success is silent. The region is always in the DOM so that assistive
          technology has a live region to announce into, but it renders — and
          occupies — nothing unless a save actually failed or an account action
          has something to report. `accountMessage` is checked independently of
          `saveState` because "Unable to sign out: …" arrives with `saved`.
        */}
        <div className={`cloud-status cloud-${props.saveState}`} role="status">
          {props.saveState === 'error' && (
            <>
              Progress not saved{props.saveMessage ? `: ${props.saveMessage}` : ''}{' '}
            {props.retrySave && <button className="linklike" onClick={props.retrySave}>Retry</button>}
            </>
          )}
          {props.accountMessage && (
            <span>{props.saveState === 'error' ? ' · ' : ''}{props.accountMessage}</span>
          )}
        </div>
      </header>
      <main>
        {view.name === 'home' && (
          <Home
            progress={props.progress}
            onOpenLesson={(lessonId) => setView({ name: 'lesson', lessonId })}
            onStartTopic={(topicId, title) => setView({
              name: 'practice',
              title,
              questionIds: QUESTIONS.filter((q) => q.topic === topicId).map((q) => q.id),
              session: { mode: 'topic', topic: topicId, entryPoint: 'home' },
            })}
            onStartMock={() => setView({ name: 'mock', entryPoint: 'home' })}
          />
        )}
        {view.name === 'dashboard' && (
          <Dashboard
            progress={props.progress}
            onStartTopic={(topicId, title) => setView({
              name: 'practice', title,
              questionIds: QUESTIONS.filter((q) => q.topic === topicId).map((q) => q.id),
              session: { mode: 'topic', topic: topicId, entryPoint: 'practice' },
            })}
            onOpenMissed={() => setView({ name: 'missed' })}
            onStartMock={() => setView({ name: 'mock', entryPoint: 'practice' })}
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
            onExit={goPractice}
          />
        )}
        {view.name === 'mock' && (
          <MockExam
            progress={props.progress}
            updateProgress={props.updateProgress}
            entryPoint={view.entryPoint}
            onExit={goHome}
          />
        )}
        {view.name === 'learn' && (
          <LearnHome
            progress={props.progress}
            onOpenLesson={(lessonId) => setView({ name: 'lesson', lessonId })}
            onExit={goHome}
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
              session: { mode: 'concept', lessonId: lesson.id, entryPoint: 'learn' },
            })}
            onExit={() => setView({ name: 'learn' })}
          />
        )}
      </main>
    </div>
  );
}

function SignIn(props: {
  analytics: AnalyticsClient;
  initialMessage: string | null;
  onGoogle: () => Promise<AuthActionResult>;
  onSendEmailOtp: (email: string) => Promise<AuthActionResult>;
  onVerifyEmailOtp: (email: string, token: string) => Promise<AuthActionResult>;
  onEnterBeta: (code: string) => Promise<AuthActionResult>;
}) {
  const { analytics, initialMessage } = props;
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [emailStage, setEmailStage] = useState<'address' | 'code'>('address');
  const [message, setMessage] = useState<string | null>(initialMessage);
  const [busy, setBusy] = useState(false);
  const [resendAt, setResendAt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const resendDelayMs = import.meta.env.VITE_E2E_FAKE_CLOUD === 'true' ? 500 : 60_000;
  const resendSeconds = Math.max(0, Math.ceil((resendAt - now) / 1000));

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timer = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(timer);
  }, [resendSeconds]);

  const run = async (operation: () => Promise<AuthActionResult>, success?: () => void) => {
    setBusy(true);
    setMessage(null);
    const result = await operation();
    if (result.ok) success?.();
    else setMessage(result.message);
    setBusy(false);
  };

  const sendCode = () => run(() => props.onSendEmailOtp(email.trim()), () => {
    setEmailStage('code');
    setResendAt(Date.now() + resendDelayMs);
    setNow(Date.now());
    setMessage('We sent a sign-in code to your email.');
  });

  const verifyCode = () => run(() => props.onVerifyEmailOtp(email.trim(), token.trim()));

  const resend = () => run(() => props.onSendEmailOtp(email.trim()), () => {
    setResendAt(Date.now() + resendDelayMs);
    setNow(Date.now());
    setMessage('We sent a new sign-in code.');
  });

  const changeEmail = () => {
    setEmailStage('address');
    setToken('');
    setMessage(null);
  };

  return (
    <div className="auth-shell">
      <section className="card auth-card" aria-label="Sign in">
        <h1>ASA 103 Prep</h1>
        <h2>Sign in to study</h2>
        <p className="muted">Your progress is saved to your account and available on your other devices.</p>
        <button className="large auth-primary" disabled={busy} onClick={() => void run(props.onGoogle)}>
          Continue with Google
        </button>
        <div className="auth-divider"><span>or use email</span></div>
        {emailStage === 'address' ? (
          <form onSubmit={(event) => { event.preventDefault(); void sendCode(); }}>
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <button className="secondary" disabled={busy || !email.trim()} type="submit">Send code</button>
          </form>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); void verifyCode(); }}>
            <label htmlFor="email-code">Enter the code we sent to your email</label>
            <input
              id="email-code"
              type="text"
              required
              autoComplete="one-time-code"
              value={token}
              onChange={(event) => setToken(event.target.value)}
            />
            <button disabled={busy || !token.trim()} type="submit">Verify</button>
            <div className="auth-inline-actions">
              <button className="linklike" type="button" disabled={busy || resendSeconds > 0} onClick={() => void resend()}>
                {resendSeconds > 0 ? `Resend code in ${resendSeconds}s` : 'Resend code'}
              </button>
              <button className="linklike" type="button" disabled={busy} onClick={changeEmail}>Use a different email</button>
            </div>
          </form>
        )}
        {message && <p role="alert" className="auth-message">{message}</p>}
        <BetaAccessForm onEnter={props.onEnterBeta} />
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

function RecoveryActions(props: {
  onTryAgain: () => void;
  onStartOver: () => void;
  onEnterBeta: (code: string) => Promise<AuthActionResult>;
}) {
  return (
    <div className="recovery-actions">
      <div className="actions">
        <button onClick={props.onTryAgain}>Try again</button>
        <button className="secondary" onClick={props.onStartOver}>Start over</button>
      </div>
      <BetaAccessForm heading="Use beta access code" onEnter={props.onEnterBeta} />
    </div>
  );
}

function BetaAccessForm(props: {
  heading?: string;
  onEnter: (code: string) => Promise<AuthActionResult>;
}) {
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  return (
    <div className="beta-access-panel">
      <h3>{props.heading ?? 'Have a beta access code?'}</h3>
      <p className="muted">Temporary access only. Progress is saved on this device, not to an account.</p>
      <form onSubmit={(event) => {
        event.preventDefault();
        setBusy(true);
        setMessage(null);
        void props.onEnter(code).then((result) => {
          if (!result.ok) setMessage(result.message);
          setBusy(false);
        });
      }}>
        <label htmlFor="beta-code">Beta access code</label>
        <div className="beta-code-row">
          <input
            id="beta-code"
            type="text"
            autoCapitalize="characters"
            autoComplete="off"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <button className="secondary" type="submit" disabled={busy || !code.trim()}>Enter</button>
        </div>
      </form>
      {message && <p role="alert" className="auth-message">{message}</p>}
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
