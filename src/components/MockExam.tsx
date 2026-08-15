import { useEffect, useState } from 'react';
import {
  MOCK_EXAM_SIZE,
  MOCK_STUDY_TARGET_PCT,
  QUESTIONS,
  selectMockQuestions,
} from '../content/questions';
import { TOPICS } from '../content/topics';
import type { Question, TopicId } from '../content/types';
import { createRng, withShuffledChoices } from '../lib/shuffle';
import {
  gradeMock,
  recordAnswer,
  recordMockResult,
  type MockGrade,
  type Progress,
} from '../lib/progress';
import { ChoiceList, ProgressBar, QuestionLayout } from './shared';

const questionById = new Map(QUESTIONS.map((q) => [q.id, q]));
const topicTitle = (id: TopicId) => TOPICS.find((t) => t.id === id)?.title ?? id;

/** Below this share of a topic's exam questions, the topic is called out as a weak area. */
const WEAK_AREA_THRESHOLD = 0.7;

/**
 * Build one attempt: a fresh proportional draw of MOCK_EXAM_SIZE questions in a
 * random order, each with its choices in a random display order. Called once,
 * from lazy state initialisation, so the attempt never reshuffles on rerender.
 */
function buildAttempt(): Question[] {
  const rng = createRng();
  return selectMockQuestions(MOCK_EXAM_SIZE, rng)
    .map((id) => questionById.get(id))
    .filter((q): q is Question => q !== undefined)
    .map((q) => withShuffledChoices(q, rng));
}

export function MockExam(props: {
  progress: Progress;
  updateProgress: (p: Progress) => void;
  onExit: () => void;
}) {
  // Remounting on a new attempt key is what makes "take another mock" draw a
  // genuinely fresh exam rather than replaying the previous one.
  const [attemptKey, setAttemptKey] = useState(0);
  return (
    <MockAttempt
      key={attemptKey}
      {...props}
      onRestart={() => setAttemptKey((n) => n + 1)}
    />
  );
}

function MockAttempt(props: {
  progress: Progress;
  updateProgress: (p: Progress) => void;
  onExit: () => void;
  onRestart: () => void;
}) {
  const [questions] = useState<Question[]>(buildAttempt);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [grade, setGrade] = useState<MockGrade | null>(null);

  // An attempt lives in component state only: a reload discards it. Rebuilding
  // it from storage would mean persisting the question ids, every question's
  // shuffled choice order, the answers and the index — a second stored shape
  // this project does not need. Guarding the unload is the small version: the
  // browser asks before an accidental refresh throws away answered work.
  const hasUnsubmittedWork = grade === null && Object.keys(answers).length > 0;
  useEffect(() => {
    if (!hasUnsubmittedWork) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [hasUnsubmittedWork]);

  if (grade) {
    return (
      <MockResults
        questions={questions}
        grade={grade}
        onExit={props.onExit}
        onRestart={props.onRestart}
      />
    );
  }

  const question = questions[index];
  const selected = answers[question.id] ?? null;
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const unanswered = questions.length - answeredCount;
  const last = index === questions.length - 1;

  const finish = () => {
    if (
      unanswered > 0 &&
      !window.confirm(
        `You have ${unanswered} unanswered question${unanswered === 1 ? '' : 's'}. Submit anyway?`,
      )
    ) {
      return;
    }
    const g = gradeMock(questions, answers);
    let p = props.progress;
    for (const r of g.perQuestion) {
      // Unanswered questions grade as incorrect and, like any miss, join the
      // review queue so the mock keeps feeding the rest of the study loop.
      p = recordAnswer(p, r.questionId, r.correct);
    }
    p = recordMockResult(p, { finishedAt: Date.now(), score: g.score, total: g.total });
    props.updateProgress(p);
    setGrade(g);
  };

  return (
    <section className="card" aria-label="Mock exam question">
      <div className="session-head">
        <div className="session-title">
          <h2>Practice Mock Exam</h2>
          <span className="exam-badge">Exam mode</span>
        </div>
        <span className="qcount">
          Question {index + 1} of {questions.length}
        </span>
      </div>
      <div className="session-progress">
        <ProgressBar value={answeredCount} max={questions.length} />
        <p className="exam-progress-caption muted" data-testid="mock-answered">
          Answered {answeredCount} of {questions.length}
          {unanswered > 0 && ` · ${unanswered} left`}
        </p>
      </div>
      <p className="exam-note">
        Full Practice Mock — {questions.length} questions drawn from every topic. This is our own
        practice format, not the official ASA 103 exam. No feedback or scoring until you submit.
      </p>
      <QuestionLayout question={question}>
        <ChoiceList
          question={question}
          selected={selected}
          onSelect={(choiceId) => setAnswers({ ...answers, [question.id]: choiceId })}
        />
        {selected === null && (
          <p className="unanswered-flag" data-testid="unanswered-flag">
            Not answered yet
          </p>
        )}
        <div className="actions">
          <button
            className="secondary"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            Previous
          </button>
          <button disabled={last} onClick={() => setIndex(index + 1)}>
            Next
          </button>
          <button className="large" onClick={finish}>
            Submit exam
          </button>
          <span className="spacer" />
          <button className="danger" onClick={props.onExit}>
            Abandon exam
          </button>
        </div>
      </QuestionLayout>
    </section>
  );
}

interface TopicScore {
  topic: TopicId;
  correct: number;
  total: number;
}

function MockResults(props: {
  questions: Question[];
  grade: MockGrade;
  onExit: () => void;
  onRestart: () => void;
}) {
  const { grade, questions } = props;
  const shownById = new Map(questions.map((q) => [q.id, q]));
  const pct = grade.total > 0 ? Math.round((grade.score / grade.total) * 100) : 0;

  const byTopic = new Map<TopicId, TopicScore>();
  for (const r of grade.perQuestion) {
    const q = shownById.get(r.questionId)!;
    const entry = byTopic.get(q.topic) ?? { topic: q.topic, correct: 0, total: 0 };
    entry.total += 1;
    if (r.correct) entry.correct += 1;
    byTopic.set(q.topic, entry);
  }
  const topicScores = [...byTopic.values()].sort(
    (a, b) => a.correct / a.total - b.correct / b.total,
  );
  const weakAreas = topicScores.filter((t) => t.correct / t.total < WEAK_AREA_THRESHOLD);
  const missed = grade.perQuestion.filter((r) => !r.correct);

  return (
    <section className="card" aria-label="Mock exam results">
      <h2>Practice mock results</h2>
      <p className="big-stat" data-testid="mock-score">
        {grade.score} / {grade.total} correct — {pct}%
      </p>
      <p className="muted">
        Study target: {MOCK_STUDY_TARGET_PCT}%+. That is our own prep goal for feeling ready, not an
        ASA pass mark or a certification threshold.
      </p>

      <h3>Topic breakdown</h3>
      <ul className="topic-list" aria-label="Per-topic results">
        {topicScores.map((t) => {
          const share = t.correct / t.total;
          const weak = share < WEAK_AREA_THRESHOLD;
          return (
            <li key={t.topic} className="topic-row">
              <div className="topic-name">{topicTitle(t.topic)}</div>
              <div className="topic-side">
                <span className={`chip ${weak ? 'chip-weak' : 'chip-solid'}`}>
                  {t.correct}/{t.total} · {Math.round(share * 100)}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {weakAreas.length > 0 ? (
        <p className="weak-areas" data-testid="weak-areas">
          {/* Several topic titles contain commas, so they are separated with a
              middot rather than a comma to keep the list unambiguous. */}
          <strong>Weak areas to practice next:</strong>{' '}
          {weakAreas.map((t) => topicTitle(t.topic)).join(' · ')}
        </p>
      ) : (
        <p className="muted" data-testid="weak-areas">
          No weak areas on this attempt — every topic scored at or above{' '}
          {Math.round(WEAK_AREA_THRESHOLD * 100)}%.
        </p>
      )}

      <h3>Questions you missed ({missed.length})</h3>
      {missed.length === 0 ? (
        <p className="muted">Nothing missed on this attempt.</p>
      ) : (
        <ul className="mock-results">
          {missed.map((r) => {
            const q = shownById.get(r.questionId)!;
            const chosen = q.choices.find((c) => c.id === r.chosenChoiceId);
            const correct = q.choices.find((c) => c.id === q.correctChoiceId)!;
            return (
              <li key={r.questionId} className="mock-wrong">
                <p className="verdict">Incorrect</p>
                <p className="prompt">{q.prompt}</p>
                <p className="answer-line">
                  Your answer: {chosen ? chosen.text : 'not answered'}
                </p>
                <p className="answer-line">
                  Correct answer: <strong>{correct.text}</strong>
                </p>
                {chosen?.whyWrong && (
                  <p className="why-wrong">Why your answer is wrong: {chosen.whyWrong}</p>
                )}
                <p className="muted">{q.explanation}</p>
                <p className="meta source">Source: {q.source}</p>
              </li>
            );
          })}
        </ul>
      )}
      <p className="muted">
        Everything you missed here has been added to your Missed Questions review queue.
      </p>
      <div className="actions">
        <button onClick={props.onExit}>Back to dashboard</button>
        <button className="secondary" onClick={props.onRestart}>
          Take another mock
        </button>
      </div>
    </section>
  );
}
