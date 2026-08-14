import { useMemo, useState } from 'react';
import { MOCK_QUESTION_IDS, QUESTIONS } from '../content/questions';
import type { Question } from '../content/types';
import {
  gradeMock,
  recordAnswer,
  recordMockResult,
  type MockGrade,
  type Progress,
} from '../lib/progress';
import { ChoiceList, ProgressBar, QuestionLayout } from './shared';

const questionById = new Map(QUESTIONS.map((q) => [q.id, q]));

export function MockExam(props: {
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
                <p className="answer-line">
                  Your answer: {chosen ? chosen.text : 'not answered'}
                  {!r.correct && (
                    <>
                      {' — '}correct answer:{' '}
                      <strong>{q.choices.find((c) => c.id === q.correctChoiceId)!.text}</strong>
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
        <div className="session-title">
          <h2>Mock exam</h2>
          <span className="exam-badge">Exam mode</span>
        </div>
        <span className="qcount">
          Question {index + 1} of {questions.length}
        </span>
      </div>
      <div className="session-progress">
        <ProgressBar value={index} max={questions.length} />
      </div>
      <p className="exam-note">No feedback or scoring until you submit the exam at the end.</p>
      <QuestionLayout question={question}>
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
            <button className="large" onClick={finish}>
              Submit exam
            </button>
          )}
          <button className="danger" onClick={props.onExit}>
            Abandon exam
          </button>
        </div>
      </QuestionLayout>
    </section>
  );
}
