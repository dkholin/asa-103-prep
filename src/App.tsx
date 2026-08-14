import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { MissedQuestions } from './components/MissedQuestions';
import { MockExam } from './components/MockExam';
import { PracticeSession } from './components/PracticeSession';
import { QUESTIONS } from './content/questions';
import { emptyProgress, type Progress } from './lib/progress';
import { clearProgress, loadProgress, saveProgress } from './lib/storage';

type View =
  | { name: 'dashboard' }
  | { name: 'practice'; title: string; questionIds: string[] }
  | { name: 'missed' }
  | { name: 'mock' };

export default function App() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const [view, setView] = useState<View>({ name: 'dashboard' });

  const updateProgress = (next: Progress) => {
    setProgress(next);
    saveProgress(next);
  };

  const goDashboard = () => setView({ name: 'dashboard' });

  return (
    <div className="app">
      <header className="app-shell-header">
        <div className="app-shell-row">
          <div className="brand">
            <h1 style={{ margin: 0 }}>
              <button className="linklike title" onClick={goDashboard}>
                ASA 103 Prep
              </button>
            </h1>
            <p className="subtitle">Navigation Rules, Charts &amp; Anchoring — practice tool</p>
          </div>
          <nav className="shell-nav" aria-label="Sections">
            <button
              className={view.name === 'dashboard' ? 'active' : ''}
              onClick={goDashboard}
            >
              Dashboard
            </button>
            <button
              className={view.name === 'missed' ? 'active' : ''}
              onClick={() => setView({ name: 'missed' })}
            >
              Review ({progress.reviewQueue.length})
            </button>
            <button
              className={view.name === 'mock' ? 'active' : ''}
              onClick={() => setView({ name: 'mock' })}
            >
              Exam
            </button>
          </nav>
        </div>
      </header>
      <main>
        {view.name === 'dashboard' && (
          <Dashboard
            progress={progress}
            onStartTopic={(topicId, title) =>
              setView({
                name: 'practice',
                title,
                questionIds: QUESTIONS.filter((q) => q.topic === topicId).map((q) => q.id),
              })
            }
            onOpenMissed={() => setView({ name: 'missed' })}
            onStartMock={() => setView({ name: 'mock' })}
            onReset={() => {
              if (window.confirm('Reset all saved study progress?')) {
                clearProgress();
                setProgress(emptyProgress());
              }
            }}
          />
        )}
        {view.name === 'practice' && (
          <PracticeSession
            key={view.title + view.questionIds.join(',')}
            title={view.title}
            questionIds={view.questionIds}
            progress={progress}
            updateProgress={updateProgress}
            onExit={goDashboard}
          />
        )}
        {view.name === 'missed' && (
          <MissedQuestions
            progress={progress}
            onReviewAll={(ids) =>
              setView({ name: 'practice', title: 'Missed question review', questionIds: ids })
            }
            onReviewOne={(id) =>
              setView({ name: 'practice', title: 'Missed question review', questionIds: [id] })
            }
            onExit={goDashboard}
          />
        )}
        {view.name === 'mock' && (
          <MockExam progress={progress} updateProgress={updateProgress} onExit={goDashboard} />
        )}
      </main>
    </div>
  );
}
