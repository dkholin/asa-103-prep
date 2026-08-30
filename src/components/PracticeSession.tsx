import { useRef, useState } from 'react';
import { QUESTIONS } from '../content/questions';
import type { Question, TopicId } from '../content/types';
import { sessionCompletionProperties } from '../lib/analytics';
import { useAnalytics, useFireOnceWhen } from '../lib/analytics-context';
import { recordAnswer, recordSkip, type Progress } from '../lib/progress';
import { createRng, prepareAttempt } from '../lib/shuffle';
import { ChoiceList, Feedback, ProgressBar, QuestionLayout } from './shared';

const questionById = new Map(QUESTIONS.map((q) => [q.id, q]));

/**
 * Review is the same session component with a different question set, so the
 * launching screen states which it is. Topic and review sessions report
 * mutually exclusive event pairs; emitting both would double-count one session.
 */
export type PracticeSessionMode =
  | { mode: 'topic'; topic: TopicId; entryPoint: 'practice' | 'home' }
  | { mode: 'review' }
  | { mode: 'concept'; lessonId: string; entryPoint: 'learn' };

export function PracticeSession(props: {
  title: string;
  questionIds: string[];
  session: PracticeSessionMode;
  progress: Progress;
  updateProgress: (p: Progress) => void;
  onExit: () => void;
}) {
  const analytics = useAnalytics();
  const startedAt = useRef(Date.now());
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
  const complete = questions.length === 0 || index >= questions.length;
  const { session } = props;
  const exitLabel = session.mode === 'concept' ? 'Back to lesson' : 'Back to Practice';

  useFireOnceWhen(true, () => {
    analytics.capture(
      session.mode === 'topic'
        ? {
            name: 'practice_started',
            properties: {
              mode: 'topic',
              topic: session.topic,
              question_count: questions.length,
              entry_point: session.entryPoint,
            },
          }
        : session.mode === 'concept'
          ? {
              name: 'practice_started',
              properties: {
                mode: 'concept',
                lesson_id: session.lessonId,
                question_count: questions.length,
                entry_point: session.entryPoint,
              },
            }
          : {
            name: 'missed_review_started',
            properties: { mode: 'review', question_count: questions.length },
          },
    );
  });

  // Only reaching the completion screen completes a session: leaving through
  // Leaving for Practice unmounts the component with this effect unfired.
  useFireOnceWhen(complete, () => {
    const totals = sessionCompletionProperties(tally, Date.now() - startedAt.current);
    analytics.capture(
      session.mode === 'topic'
        ? { name: 'practice_completed', properties: { mode: 'topic', topic: session.topic, ...totals } }
        : session.mode === 'concept'
          ? {
              name: 'practice_completed',
              properties: { mode: 'concept', lesson_id: session.lessonId, ...totals },
            }
          : { name: 'missed_review_completed', properties: { mode: 'review', ...totals } },
    );
  });

  if (complete) {
    return (
      <section className="card" aria-label="Session complete">
        <h2>Session complete</h2>
        <p>
          {tally.correct} correct, {tally.wrong} incorrect, {tally.skipped} skipped.
        </p>
        {(tally.wrong > 0 || tally.skipped > 0) && (
          <p className="muted">Missed and skipped questions were added to your review queue.</p>
        )}
        <button onClick={props.onExit}>{exitLabel}</button>
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
                const next = recordAnswer(props.progress, question.id, correct);
                props.updateProgress(next);
                analytics.capture({
                  name: 'question_answered',
                  properties: {
                    question_id: question.id,
                    topic: question.topic,
                    correct,
                    // The attempt number this answer became, read back from the
                    // recorded stat rather than recomputed.
                    attempt: next.stats[question.id].attempts,
                    mode: session.mode,
                  },
                });
              }}
            >
              Submit
            </button>
            <button
              className="secondary"
              onClick={() => {
                setTally((t) => ({ ...t, skipped: t.skipped + 1 }));
                props.updateProgress(recordSkip(props.progress, question.id));
                analytics.capture({
                  name: 'question_skipped',
                  properties: { question_id: question.id, topic: question.topic, mode: session.mode },
                });
                advance();
              }}
            >
              Skip
            </button>
            <button className="secondary" onClick={props.onExit}>
              {exitLabel}
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
                {exitLabel}
              </button>
            </div>
          </>
        )}
      </QuestionLayout>
    </section>
  );
}
