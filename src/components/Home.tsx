import { ArrowRight } from 'lucide-react';
import type { TopicId } from '../content/types';
import { useAnalytics, useFireOnceWhen } from '../lib/analytics-context';
import {
  homeAnalyticsProperties,
  homeRecommendation,
} from '../lib/home-recommendation';
import type { Progress } from '../lib/progress';
import { ProgressBar } from './shared';

export function Home(props: {
  progress: Progress;
  onOpenLesson: (lessonId: string) => void;
  onStartTopic: (topicId: TopicId, title: string) => void;
  onStartMock: () => void;
}) {
  const analytics = useAnalytics();
  const recommendation = homeRecommendation(props.progress);
  const eventProperties = homeAnalyticsProperties(recommendation);

  useFireOnceWhen(true, () => {
    analytics.capture({ name: 'home_viewed', properties: eventProperties });
  });

  const followRecommendation = () => {
    analytics.capture({ name: 'home_action_taken', properties: eventProperties });
    if (
      recommendation.kind === 'start_learning' ||
      recommendation.kind === 'resume_lesson' ||
      recommendation.kind === 'next_lesson'
    ) {
      props.onOpenLesson(recommendation.destinationId!);
      return;
    }
    if (recommendation.kind === 'practice_weak_topic') {
      props.onStartTopic(recommendation.destinationId! as TopicId, recommendation.title.replace(/^Practice /, ''));
      return;
    }
    props.onStartMock();
  };

  if (recommendation.learnerState === 'new') {
    return (
      <section className="home" aria-label="Home">
        <div className="home-welcome">
          <p className="eyebrow">Your ASA 103 study guide</p>
          <h2>Learn the material. Practise it. Then test the whole course.</h2>
          <p>
            ASA 103 Prep turns the course into short lessons, focused question practice, and a
            full-course mock exam so you always know what to do next.
          </p>
          <ol className="home-flow" aria-label="Study flow">
            <li><span>1</span><strong>Learn</strong><small>Build the foundations</small></li>
            <li><span>2</span><strong>Practice</strong><small>Work topic questions</small></li>
            <li><span>3</span><strong>Mock Exam</strong><small>Put it all together</small></li>
          </ol>
          <button className="large home-primary-action" onClick={followRecommendation}>
            Start Learning
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="home" aria-label="Home">
      <div className="home-heading">
        <p className="eyebrow">Welcome back</p>
        <h2>What should I do next?</h2>
      </div>
      <div className="hero-card home-recommendation" data-testid="home-recommendation">
        <p className="eyebrow">Recommended next</p>
        <h2>{recommendation.title}</h2>
        <p>{recommendation.detail}</p>
        <button className="large" onClick={followRecommendation}>
          {recommendation.actionLabel}
        </button>
      </div>
      <div className="card home-progress">
        <div className="home-progress-copy">
          <div>
            <p className="eyebrow">Learn progress</p>
            <h2>{recommendation.completedLessons} of {recommendation.totalLessons} lessons covered</h2>
          </div>
          <span>{recommendation.totalLessons > 0
            ? Math.round((recommendation.completedLessons / recommendation.totalLessons) * 100)
            : 0}%</span>
        </div>
        <ProgressBar
          value={recommendation.completedLessons}
          max={recommendation.totalLessons}
          complete={recommendation.completedLessons === recommendation.totalLessons}
        />
      </div>
    </section>
  );
}
