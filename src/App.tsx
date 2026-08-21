import { useState, type ReactNode } from 'react';
import { Dashboard } from './components/Dashboard';
import { MissedQuestions } from './components/MissedQuestions';
import { MockExam } from './components/MockExam';
import { PracticeSession } from './components/PracticeSession';
import { QUESTIONS } from './content/questions';
import { authRedirectUrl, type CloudGateway } from './lib/cloud';
import { emptyProgress, type Progress } from './lib/progress';
import { useCloudProgress } from './lib/useCloudProgress';

type View =
  | { name: 'dashboard' }
  | { name: 'practice'; title: string; questionIds: string[] }
  | { name: 'missed' }
  | { name: 'mock' };

export default function App(props: {
  gateway: CloudGateway | null;
  authCallbackMessage?: string | null;
}) {
  const { gateway, authCallbackMessage = null } = props;
  if (!gateway) return <ConfigurationRequired />;
  return <CloudApp gateway={gateway} authCallbackMessage={authCallbackMessage} />;
}

function CloudApp(props: { gateway: CloudGateway; authCallbackMessage: string | null }) {
  const { gateway, authCallbackMessage } = props;
  const cloud = useCloudProgress(gateway);

  if (cloud.state.phase === 'starting') return <StatusCard title="Restoring your session…" />;
  if (cloud.state.phase === 'session-error') {
    return (
      <StatusCard title="We couldn’t check your session" detail={cloud.state.message}>
        <button onClick={() => void cloud.restoreSession()}>Try again</button>
      </StatusCard>
    );
  }
  if (cloud.state.phase === 'signed-out') {
    return <SignIn gateway={gateway} initialMessage={authCallbackMessage} />;
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
            <button className={view.name === 'missed' ? 'active' : ''} onClick={() => setView({ name: 'missed' })}>
              Review ({props.progress.reviewQueue.length})
            </button>
            <button className={view.name === 'mock' ? 'active' : ''} onClick={() => setView({ name: 'mock' })}>Exam</button>
          </nav>
          <div className="account-controls">
            <span className="account-label">{props.userLabel}</span>
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
            progress={props.progress}
            updateProgress={props.updateProgress}
            onExit={goDashboard}
          />
        )}
        {view.name === 'missed' && (
          <MissedQuestions
            progress={props.progress}
            onReviewAll={(ids) => setView({ name: 'practice', title: 'Missed question review', questionIds: ids })}
            onReviewOne={(id) => setView({ name: 'practice', title: 'Missed question review', questionIds: [id] })}
            onExit={goDashboard}
          />
        )}
        {view.name === 'mock' && (
          <MockExam progress={props.progress} updateProgress={props.updateProgress} onExit={goDashboard} />
        )}
      </main>
    </div>
  );
}

function SignIn(props: { gateway: CloudGateway; initialMessage: string | null }) {
  const { gateway, initialMessage } = props;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(initialMessage);
  const [busy, setBusy] = useState(false);
  const redirectTo = authRedirectUrl();

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
        <button className="large auth-primary" disabled={busy} onClick={() => void run(() => gateway.signInWithGoogle(redirectTo))}>
          Continue with Google
        </button>
        <div className="auth-divider"><span>or use email</span></div>
        <form onSubmit={(event) => {
          event.preventDefault();
          void run(() => gateway.sendMagicLink(email.trim(), redirectTo), 'Check your email for a secure sign-in link.');
        }}>
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <button className="secondary" disabled={busy || !email.trim()} type="submit">Email me a sign-in link</button>
        </form>
        {message && <p role="alert" className="auth-message">{message}</p>}
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
