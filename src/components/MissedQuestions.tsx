import { QUESTIONS } from '../content/questions';
import { TOPICS } from '../content/topics';
import type { Question } from '../content/types';
import type { Progress } from '../lib/progress';

const questionById = new Map(QUESTIONS.map((q) => [q.id, q]));

export function MissedQuestions(props: {
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
        <p className="muted">No missed or skipped questions — nice work.</p>
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
                <button className="secondary" onClick={() => props.onReviewOne(q.id)}>
                  Review
                </button>
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
