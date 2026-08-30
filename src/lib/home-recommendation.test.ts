import { describe, expect, it } from 'vitest';
import { QUESTIONS } from '../content/questions';
import { publishedLessons } from './learn-progress';
import {
  WEAK_TOPIC_MIN_ATTEMPTED,
  homeAnalyticsProperties,
  homeRecommendation,
} from './home-recommendation';
import {
  emptyProgress,
  markLessonCompleted,
  markLessonOpened,
  recordAnswer,
} from './progress';

describe('homeRecommendation', () => {
  it('starts a new learner in the first published lesson', () => {
    const first = publishedLessons()[0];
    const recommendation = homeRecommendation(emptyProgress());

    expect(recommendation).toMatchObject({
      kind: 'start_learning',
      learnerState: 'new',
      destinationId: first.id,
      actionLabel: 'Start Learning',
    });
  });

  it('resumes the last in-progress lesson before making another recommendation', () => {
    const lesson = publishedLessons()[3];
    const recommendation = homeRecommendation(markLessonOpened(emptyProgress(), lesson.id));

    expect(recommendation).toMatchObject({
      kind: 'resume_lesson',
      learnerState: 'returning',
      destinationId: lesson.id,
    });
  });

  it('does not call a topic weak from tiny evidence', () => {
    let progress = emptyProgress();
    for (const question of QUESTIONS.slice(0, WEAK_TOPIC_MIN_ATTEMPTED - 1)) {
      progress = recordAnswer(progress, question.id, false);
    }

    expect(homeRecommendation(progress).kind).toBe('next_lesson');
  });

  it('can recommend a weak topic after enough distinct attempted questions', () => {
    const topic = QUESTIONS.find(
      (candidate) =>
        QUESTIONS.filter((question) => question.topic === candidate.topic).length >=
        WEAK_TOPIC_MIN_ATTEMPTED,
    )!.topic;
    const evidence = QUESTIONS.filter((question) => question.topic === topic).slice(
      0,
      WEAK_TOPIC_MIN_ATTEMPTED,
    );
    let progress = emptyProgress();
    for (const question of evidence) progress = recordAnswer(progress, question.id, false);

    expect(homeRecommendation(progress)).toMatchObject({
      kind: 'practice_weak_topic',
      learnerState: 'returning',
      destinationId: topic,
      evidenceCount: WEAK_TOPIC_MIN_ATTEMPTED,
    });
  });

  it('recommends a mock only after all published lessons are complete', () => {
    let progress = emptyProgress();
    for (const lesson of publishedLessons()) progress = markLessonCompleted(progress, lesson.id);

    expect(homeRecommendation(progress)).toMatchObject({
      kind: 'take_mock_exam',
      completedLessons: publishedLessons().length,
      totalLessons: publishedLessons().length,
    });
  });

  it('uses the same bounded properties for shown and followed events', () => {
    const properties = homeAnalyticsProperties(homeRecommendation(emptyProgress()));

    expect(properties).toEqual({
      learner_state: 'new',
      recommendation: 'start_learning',
      completed_lessons: 0,
      total_lessons: publishedLessons().length,
      destination_id: publishedLessons()[0].id,
    });
  });
});
