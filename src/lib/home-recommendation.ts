import { TOPICS } from '../content/topics';
import { continueLearning, publishedLessons } from './learn-progress';
import { lessonState, topicReadiness, type Progress } from './progress';
import { QUESTIONS } from '../content/questions';

export type LearnerState = 'new' | 'returning';
export type HomeRecommendationKind =
  | 'start_learning'
  | 'resume_lesson'
  | 'next_lesson'
  | 'practice_weak_topic'
  | 'take_mock_exam';

export interface HomeRecommendation {
  kind: HomeRecommendationKind;
  learnerState: LearnerState;
  destinationId?: string;
  title: string;
  detail: string;
  actionLabel: string;
  completedLessons: number;
  totalLessons: number;
  evidenceCount?: number;
}

/** Five distinct attempted questions is the minimum before Home calls a topic weak. */
export const WEAK_TOPIC_MIN_ATTEMPTED = 5;
export const WEAK_TOPIC_THRESHOLD = 0.7;

export function hasStudyActivity(progress: Progress): boolean {
  return (
    Object.keys(progress.learn?.lessons ?? {}).length > 0 ||
    Object.keys(progress.stats).length > 0 ||
    progress.reviewQueue.length > 0 ||
    progress.mockResults.length > 0
  );
}

export function homeRecommendation(progress: Progress): HomeRecommendation {
  const lessons = publishedLessons();
  const completedLessons = lessons.filter(
    (lesson) => lessonState(progress, lesson.id) === 'completed',
  ).length;
  const totalLessons = lessons.length;
  const learnerState: LearnerState = hasStudyActivity(progress) ? 'returning' : 'new';
  const learningTarget = continueLearning(progress);

  if (learnerState === 'new' && learningTarget?.kind === 'lesson') {
    return {
      kind: 'start_learning',
      learnerState,
      destinationId: learningTarget.lesson.id,
      title: 'Build the knowledge, then put it to work',
      detail: 'Start with the first lesson. Practice and a full mock exam come after you have the foundations.',
      actionLabel: 'Start Learning',
      completedLessons,
      totalLessons,
    };
  }

  if (learningTarget?.kind === 'all-published-complete') {
    return {
      kind: 'take_mock_exam',
      learnerState,
      title: 'Put the full course together',
      detail: 'You have covered every published lesson. A mock exam is the clearest next check.',
      actionLabel: 'Take a Mock Exam',
      completedLessons,
      totalLessons,
    };
  }

  if (learningTarget?.kind === 'lesson' && learningTarget.resume) {
    return {
      kind: 'resume_lesson',
      learnerState,
      destinationId: learningTarget.lesson.id,
      title: learningTarget.lesson.title,
      detail: 'Pick up the lesson you most recently opened.',
      actionLabel: 'Continue Learning',
      completedLessons,
      totalLessons,
    };
  }

  const weak = topicReadiness(progress, QUESTIONS)
    .filter((topic) => topic.attempted >= WEAK_TOPIC_MIN_ATTEMPTED)
    .filter((topic) => topic.mastered / topic.attempted < WEAK_TOPIC_THRESHOLD)
    .sort((a, b) => a.mastered / a.attempted - b.mastered / b.attempted)[0];

  if (weak) {
    const topic = TOPICS.find((candidate) => candidate.id === weak.topic)!;
    return {
      kind: 'practice_weak_topic',
      learnerState,
      destinationId: topic.id,
      title: `Practice ${topic.title}`,
      detail: `Your latest answers show room to improve across ${weak.attempted} attempted questions in this topic.`,
      actionLabel: 'Practice This Topic',
      completedLessons,
      totalLessons,
      evidenceCount: weak.attempted,
    };
  }

  if (learningTarget?.kind === 'lesson') {
    return {
      kind: 'next_lesson',
      learnerState,
      destinationId: learningTarget.lesson.id,
      title: learningTarget.lesson.title,
      detail: 'Continue with the next unfinished lesson in course order.',
      actionLabel: 'Continue Learning',
      completedLessons,
      totalLessons,
    };
  }

  return {
    kind: 'take_mock_exam',
    learnerState,
    title: 'Take a Mock Exam',
    detail: 'Use a full-course attempt to decide what to review next.',
    actionLabel: 'Take a Mock Exam',
    completedLessons,
    totalLessons,
  };
}

export function homeAnalyticsProperties(recommendation: HomeRecommendation) {
  return {
    learner_state: recommendation.learnerState,
    recommendation: recommendation.kind,
    completed_lessons: recommendation.completedLessons,
    total_lessons: recommendation.totalLessons,
    ...(recommendation.destinationId ? { destination_id: recommendation.destinationId } : {}),
    ...(recommendation.evidenceCount ? { evidence_count: recommendation.evidenceCount } : {}),
  };
}
