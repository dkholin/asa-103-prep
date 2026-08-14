import { useMemo, useState } from 'react';
import { QUESTIONS, MOCK_QUESTION_IDS } from './content/questions';
import { TOPICS } from './content/topics';
import type { Question, TopicId } from './content/types';
import { assetById, assetUrl } from './lib/assets';
import {
  emptyProgress,
  gradeMock,
  recordAnswer,
  recordMockResult,
  recordSkip,
  topicReadiness,
  type MockGrade,
  type Progress,
} from './lib/progress';
import { clearProgress, loadProgress, saveProgress } from './lib/storage';

const questionById = new Map(QUESTIONS.map((q) => [q.id, q]));

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
      <header className="app-header">
        <h1>
          <button className="linklike title" onClick={goDashboard}>
            ASA 103 Prep
          </button>
        </h1>
        <p className="subtitle">Navigation Rules &amp; Lights — practice tool</p>
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

function readinessLabel(mastered: number, total: number, attempted: number): string {
  if (attempted === 0) return 'Not started';
  if (mastered === total) return 'Solid';
  return 'In progress';
}

function Dashboard(props: {
  progress: Progress;
  onStartTopic: (topicId: TopicId, title: string) => void;
  onOpenMissed: () => void;
  onStartMock: () => void;
  onReset: () => void;
}) {
  const { progress } = props;
  const perTopic = useMemo(() => topicReadiness(progress, QUESTIONS), [progress]);
  const totals = perTopic.reduce(
    (acc, t) => ({
      total: acc.total + t.total,
      mastered: acc.mastered + t.mastered,
      attempted: acc.attempted + t.attempted,
    }),
    { total: 0, mastered: 0, attempted: 0 },
  );
  // Recommendation: the topic with the lowest mastered/total ratio.
  const recommended = [...perTopic].sort(
    (a, b) => a.mastered / a.total - b.mastered / b.total,
  )[0];
  const recommendedTopic = TOPICS.find((t) => t.id === recommended.topic)!;
  const lastMock = progress.mockResults.at(-1);

  return (
    <section aria-label="Dashboard">
      <div className="card">
        <h2>Study status</h2>
        <p className="big-stat" data-testid="overall-readiness">
          {totals.mastered} of {totals.total} questions solid
          {totals.attempted === 0 && ' — start with a practice session below'}
        </p>
        <p className="muted">
          A question counts as solid when your most recent answer to it was correct.
        </p>
        {lastMock && (
          <p>
            Last mock exam: {lastMock.score} / {lastMock.total} correct.
          </p>
        )}
        <p>
          Recommended next: <strong>{recommendedTopic.title}</strong>{' '}
          <button
            onClick={() => props.onStartTopic(recommendedTopic.id, recommendedTopic.title)}
          >
            Start practice
          </button>
        </p>
      </div>

      <div className="card">
        <h2>Topics</h2>
        <ul className="topic-list">
          {TOPICS.map((t) => {
            const r = perTopic.find((x) => x.topic === t.id)!;
            return (
              <li key={t.id} className="topic-row">
                <div>
                  <strong>{t.title}</strong>
                  <div className="muted">{t.blurb}</div>
                </div>
                <div className="topic-side">
                  <span className={`chip chip-${readinessLabel(r.mastered, r.total, r.attempted).replace(' ', '-').toLowerCase()}`}>
                    {readinessLabel(r.mastered, r.total, r.attempted)} — {r.mastered}/{r.total}
                  </span>
                  <button onClick={() => props.onStartTopic(t.id, t.title)}>Practice</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="card">
        <h2>Other study modes</h2>
        <div className="mode-buttons">
          <button onClick={props.onOpenMissed}>
            Missed questions ({progress.reviewQueue.length})
          </button>
          <button onClick={props.onStartMock}>Mock exam</button>
          <button className="danger" onClick={props.onReset}>
            Reset progress
          </button>
        </div>
      </div>
    </section>
  );
}

function QuestionFigure({ question }: { question: Question }) {
  if (question.format !== 'visual' || !question.assetId) return null;
  const asset = assetById(question.assetId);
  if (!asset) return null;
  return (
    <figure className="question-figure">
      <img src={assetUrl(question.assetId)} alt={asset.description} />
    </figure>
  );
}

function ChoiceList(props: {
  question: Question;
  selected: string | null;
  onSelect: (choiceId: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="choices" role="radiogroup" aria-label="Answer choices">
      {props.question.choices.map((c) => (
        <label key={c.id} className={`choice ${props.selected === c.id ? 'selected' : ''}`}>
          <input
            type="radio"
            name={`choice-${props.question.id}`}
            value={c.id}
            checked={props.selected === c.id}
            disabled={props.disabled}
            onChange={() => props.onSelect(c.id)}
          />
          <span>{c.text}</span>
        </label>
      ))}
    </div>
  );
}

function Feedback({ question, chosenId }: { question: Question; chosenId: string }) {
  const correct = chosenId === question.correctChoiceId;
  const correctChoice = question.choices.find((c) => c.id === question.correctChoiceId)!;
  const chosen = question.choices.find((c) => c.id === chosenId);
  return (
    <div className={`feedback ${correct ? 'feedback-correct' : 'feedback-wrong'}`}>
      <p className="verdict">{correct ? 'Correct' : 'Incorrect'}</p>
      {!correct && (
        <p>
          Correct answer: <strong>{correctChoice.text}</strong>
        </p>
      )}
      {!correct && chosen?.whyWrong && (
        <p className="why-wrong">Why your answer is wrong: {chosen.whyWrong}</p>
      )}
      <p>{question.explanation}</p>
      <p className="muted source">Source: {question.source}</p>
    </div>
  );
}

function PracticeSession(props: {
  title: string;
  questionIds: string[];
  progress: Progress;
  updateProgress: (p: Progress) => void;
  onExit: () => void;
}) {
  const questions = props.questionIds
    .map((id) => questionById.get(id))
    .filter((q): q is Question => q !== undefined);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [tally, setTally] = useState({ correct: 0, wrong: 0, skipped: 0 });

  if (questions.length === 0 || index >= questions.length) {
    return (
      <section className="card" aria-label="Session complete">
        <h2>Session complete</h2>
        <p>
          {tally.correct} correct, {tally.wrong} incorrect, {tally.skipped} skipped.
        </p>
        {(tally.wrong > 0 || tally.skipped > 0) && (
          <p>Missed and skipped questions were added to your review queue.</p>
        )}
        <button onClick={props.onExit}>Back to dashboard</button>
      </section>
    );
  }

  const question = questions[index];
  const advance = () => {
    setIndex(index + 1);
    setSelected(null);
    setSubmitted(null);
  };

  return (
    <section className="card" aria-label="Practice question">
      <div className="session-head">
        <h2>{props.title}</h2>
        <span className="muted">
          Question {index + 1} of {questions.length}
        </span>
      </div>
      <QuestionFigure question={question} />
      <p className="prompt">{question.prompt}</p>
      <ChoiceList
        question={question}
        selected={selected}
        onSelect={setSelected}
        disabled={submitted !== null}
      />
      {submitted === null ? (
        <div className="actions">
          <button
            disabled={selected === null}
            onClick={() => {
              if (selected === null) return;
              setSubmitted(selected);
              const correct = selected === question.correctChoiceId;
              setTally((t) =>
                correct
                  ? { ...t, correct: t.correct + 1 }
                  : { ...t, wrong: t.wrong + 1 },
              );
              props.updateProgress(recordAnswer(props.progress, question.id, correct));
            }}
          >
            Submit
          </button>
          <button
            className="secondary"
            onClick={() => {
              setTally((t) => ({ ...t, skipped: t.skipped + 1 }));
              props.updateProgress(recordSkip(props.progress, question.id));
              advance();
            }}
          >
            Skip
          </button>
          <button className="secondary" onClick={props.onExit}>
            Back to dashboard
          </button>
        </div>
      ) : (
        <>
          <Feedback question={question} chosenId={submitted} />
          <div className="actions">
            <button onClick={advance}>
              {index + 1 < questions.length ? 'Next question' : 'Finish session'}
            </button>
            <button className="secondary" onClick={props.onExit}>
              Back to dashboard
            </button>
          </div>
        </>
      )}
    </section>
  );
}

function MissedQuestions(props: {
  progress: Progress;
  onReviewAll: (ids: string[]) => void;
  onReviewOne: (id: string) => void;
  onExit: () => void;
}) {
  const queue = props.progress.reviewQueue
    .map((id) => questionById.get(id))
    .filter((q): q is Question => q !== undefined);
  return (
    <section className="card" aria-label="Missed questions">
      <h2>Missed questions</h2>
      {queue.length === 0 ? (
        <p>No missed or skipped questions — nice work.</p>
      ) : (
        <>
          <p className="muted">
            Questions you answered incorrectly or skipped. Answer one correctly to clear it.
          </p>
          <ul className="missed-list">
            {queue.map((q) => (
              <li key={q.id} className="missed-row">
                <div>
                  <span className="chip">{TOPICS.find((t) => t.id === q.topic)?.title}</span>{' '}
                  {q.prompt}
                </div>
                <button onClick={() => props.onReviewOne(q.id)}>Review</button>
              </li>
            ))}
          </ul>
          <div className="actions">
            <button onClick={() => props.onReviewAll(queue.map((q) => q.id))}>
              Practice all missed questions
            </button>
          </div>
        </>
      )}
      <div className="actions">
        <button className="secondary" onClick={props.onExit}>
          Back to dashboard
        </button>
      </div>
    </section>
  );
}

function MockExam(props: {
  progress: Progress;
  updateProgress: (p: Progress) => void;
  onExit: () => void;
}) {
  const questions = useMemo(
    () =>
      MOCK_QUESTION_IDS.map((id) => questionById.get(id)).filter(
        (q): q is Question => q !== undefined,
      ),
    [],
  );
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [grade, setGrade] = useState<MockGrade | null>(null);

  if (grade) {
    return (
      <section className="card" aria-label="Mock exam results">
        <h2>Mock exam results</h2>
        <p className="big-stat">
          Score: {grade.score} / {grade.total}
        </p>
        <ul className="mock-results">
          {grade.perQuestion.map((r) => {
            const q = questionById.get(r.questionId)!;
            const chosen = q.choices.find((c) => c.id === r.chosenChoiceId);
            return (
              <li key={r.questionId} className={r.correct ? 'mock-correct' : 'mock-wrong'}>
                <p className="verdict">{r.correct ? 'Correct' : 'Incorrect'}</p>
                <p className="prompt">{q.prompt}</p>
                <p>
                  Your answer: {chosen ? chosen.text : 'not answered'}
                  {!r.correct && (
                    <>
                      {' — '}correct answer:{' '}
                      <strong>
                        {q.choices.find((c) => c.id === q.correctChoiceId)!.text}
                      </strong>
                    </>
                  )}
                </p>
                <p className="muted">{q.explanation}</p>
              </li>
            );
          })}
        </ul>
        <button onClick={props.onExit}>Back to dashboard</button>
      </section>
    );
  }

  const question = questions[index];
  const selected = answers[question.id] ?? null;
  const last = index === questions.length - 1;

  const finish = () => {
    const g = gradeMock(questions, answers);
    let p = props.progress;
    for (const r of g.perQuestion) {
      p = recordAnswer(p, r.questionId, r.correct);
    }
    p = recordMockResult(p, { finishedAt: Date.now(), score: g.score, total: g.total });
    props.updateProgress(p);
    setGrade(g);
  };

  return (
    <section className="card" aria-label="Mock exam question">
      <div className="session-head">
        <h2>Mock exam</h2>
        <span className="muted">
          Question {index + 1} of {questions.length}
        </span>
      </div>
      <p className="muted">
        Exam conditions: no feedback until you submit the exam at the end.
      </p>
      <QuestionFigure question={question} />
      <p className="prompt">{question.prompt}</p>
      <ChoiceList
        question={question}
        selected={selected}
        onSelect={(choiceId) => setAnswers({ ...answers, [question.id]: choiceId })}
      />
      <div className="actions">
        {index > 0 && (
          <button className="secondary" onClick={() => setIndex(index - 1)}>
            Previous
          </button>
        )}
        {!last ? (
          <button onClick={() => setIndex(index + 1)}>Next</button>
        ) : (
          <button onClick={finish}>Submit exam</button>
        )}
        <button className="secondary" onClick={props.onExit}>
          Abandon exam
        </button>
      </div>
    </section>
  );
}
