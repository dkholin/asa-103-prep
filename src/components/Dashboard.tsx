import { useMemo } from 'react';
import { QUESTIONS } from '../content/questions';
import { TOPICS } from '../content/topics';
import type { TopicId } from '../content/types';
import { topicReadiness, type Progress } from '../lib/progress';
import { ProgressBar, readinessChipClass, readinessLabel } from './shared';

export function Dashboard(props: {
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
  const estMinutes = Math.max(3, Math.round(recommended.total * 1.3));

  return (
    <section aria-label="Dashboard">
      <div className="hero-card">
        <p className="eyebrow">Recommended next</p>
        <h2>{recommendedTopic.title}</h2>
        <p>
          {recommendedTopic.blurb}. {recommended.total} questions · ~{estMinutes} min
          {recommended.attempted > 0 && ` · ${recommended.mastered}/${recommended.total} solid so far`}
        </p>
        <button
          className="large"
          onClick={() => props.onStartTopic(recommendedTopic.id, recommendedTopic.title)}
        >
          Continue studying
        </button>
      </div>

      <div className="card">
        <h2>Overall progress</h2>
        <div className="summary-row">
          <div className="progress-bar-labeled">
            <div className="progress-caption">
              <span data-testid="overall-readiness">
                {totals.mastered} of {totals.total} questions solid
              </span>
              <span>{totals.total > 0 ? Math.round((totals.mastered / totals.total) * 100) : 0}%</span>
            </div>
            <ProgressBar value={totals.mastered} max={totals.total} complete={totals.mastered === totals.total} />
          </div>
        </div>
        <p className="muted">
          A question counts as solid when your most recent answer to it was correct.
          {totals.attempted === 0 && ' Start with the recommended topic above.'}
        </p>
        {lastMock && (
          <p className="muted">
            Last mock exam: {lastMock.score} / {lastMock.total} correct.
          </p>
        )}
      </div>

      <div className="card">
        <h2>Topics</h2>
        <ul className="topic-list">
          {TOPICS.map((t) => {
            const r = perTopic.find((x) => x.topic === t.id)!;
            const label = readinessLabel(r.mastered, r.total, r.attempted);
            return (
              <li key={t.id} className="topic-row">
                <div>
                  <div className="topic-name">{t.title}</div>
                  <div className="muted">{t.blurb}</div>
                </div>
                <div className="topic-side">
                  <span className={readinessChipClass(label)}>
                    {label} — {r.mastered}/{r.total}
                  </span>
                  <button className="secondary" onClick={() => props.onStartTopic(t.id, t.title)}>
                    Practice
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="card">
        <h2>Other study modes</h2>
        <div className="mode-buttons">
          <button className="secondary" onClick={props.onOpenMissed}>
            Missed questions ({progress.reviewQueue.length})
          </button>
          <button className="secondary" onClick={props.onStartMock}>
            Mock exam
          </button>
          <span className="spacer" />
          <button className="danger" onClick={props.onReset}>
            Reset progress
          </button>
        </div>
      </div>
    </section>
  );
}
