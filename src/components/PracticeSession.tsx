import { useState } from 'react';
import { QUESTIONS } from '../content/questions';
import type { Question } from '../content/types';
import { recordAnswer, recordSkip, type Progress } from '../lib/progress';
import { createRng, prepareAttempt } from '../lib/shuffle';
import { ChoiceList, Feedback, ProgressBar, QuestionLayout } from './shared';

const questionById = new Map(QUESTIONS.map((q) => [q.id, q]));

export function PracticeSession(props: {
  title: string;
  questionIds: string[];
  progress: Progress;
  updateProgress: (p: Progress) => void;
  onExit: () => void;
}) {
  // Question order and each question's displayed choice order are randomized
  // once, when the session starts (App remounts this component per session via
  // its `key`), and then held in state — so nothing reshuffles on rerender and
  // the order stays stable for the whole session.
  const [questions] = useState<Question[]>(() =>
    prepareAttempt(
      props.questionIds
        .map((id) => questionById.get(id))
        .filter((q): q is Question => q !== undefined),
      createRng(),
    ),
  );
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
          <p className="muted">Missed and skipped questions were added to your review queue.</p>
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
        <span className="qcount">
          Question {index + 1} of {questions.length}
        </span>
      </div>
      <div className="session-progress">
        <ProgressBar value={index + (submitted ? 1 : 0)} max={questions.length} />
      </div>
      <QuestionLayout question={question}>
        <ChoiceList
          question={question}
          selected={selected}
          onSelect={setSelected}
          disabled={submitted !== null}
          revealed={submitted}
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
                  correct ? { ...t, correct: t.correct + 1 } : { ...t, wrong: t.wrong + 1 },
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
      </QuestionLayout>
    </section>
  );
}
