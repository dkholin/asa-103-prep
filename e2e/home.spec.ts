import { expect, test } from '@playwright/test';
import { LESSONS } from '../src/content/learn';
import { QUESTIONS } from '../src/content/questions';
import { TOPICS } from '../src/content/topics';
import { capturedOnce, seeded } from './helpers';

const PROGRESS_KEY = 'asa103.e2e.fake-cloud-progress.v1';

test('a new learner lands on Home and Start Learning opens the first lesson', async ({ page }) => {
  await page.goto(seeded());

  await expect(page.getByRole('region', { name: 'Home' })).toBeVisible();
  const flow = page.getByRole('list', { name: 'Study flow' });
  await expect(flow.getByRole('listitem')).toHaveCount(3);
  await expect(flow.getByRole('listitem').nth(0)).toContainText('Learn');
  await expect(flow.getByRole('listitem').nth(1)).toContainText('Practice');
  await expect(flow.getByRole('listitem').nth(2)).toContainText('Mock Exam');
  await page.getByRole('button', { name: 'Start Learning' }).click();
  await expect(page.getByRole('heading', { name: LESSONS[0].title })).toBeVisible();
  expect((await capturedOnce(page, 'home_action_taken')).properties).toMatchObject({
    learner_state: 'new',
    recommendation: 'start_learning',
    destination_id: LESSONS[0].id,
  });
});

test('a returning learner sees persisted Learn progress and resumes the right lesson', async ({ page }) => {
  const lesson = LESSONS[4];
  await page.addInitScript(({ key, lessonId }) => {
    localStorage.setItem(key, JSON.stringify({
      version: 1,
      stats: {},
      reviewQueue: [],
      mockResults: [],
      learn: { lessons: { [lessonId]: 'in-progress' }, lastLessonId: lessonId },
    }));
  }, { key: PROGRESS_KEY, lessonId: lesson.id });

  await page.goto(seeded());
  await expect(page.getByText('0 of 45 lessons covered')).toBeVisible();
  await expect(page.getByTestId('home-recommendation')).toContainText(lesson.title);
  await page.getByRole('button', { name: 'Continue Learning' }).click();
  await expect(page.getByRole('heading', { name: lesson.title })).toBeVisible();
  expect((await capturedOnce(page, 'home_action_taken')).properties).toMatchObject({
    learner_state: 'returning',
    recommendation: 'resume_lesson',
    destination_id: lesson.id,
  });
});

test('Home only calls out a weak topic with enough evidence and records a followed action', async ({ page }) => {
  const topic = TOPICS.find(
    (candidate) => QUESTIONS.filter((question) => question.topic === candidate.id).length >= 5,
  )!;
  const questions = QUESTIONS.filter((question) => question.topic === topic.id).slice(0, 5);
  await page.addInitScript(({ key, questionIds }) => {
    localStorage.setItem(key, JSON.stringify({
      version: 1,
      stats: Object.fromEntries(questionIds.map((id) => [id, {
        attempts: 1,
        correct: 0,
        lastResult: 'incorrect',
      }])),
      reviewQueue: questionIds,
      mockResults: [],
    }));
  }, { key: PROGRESS_KEY, questionIds: questions.map((question) => question.id) });

  await page.goto(seeded());
  await expect(page.getByTestId('home-recommendation')).toContainText(`Practice ${topic.title}`);
  await expect(page.getByTestId('home-recommendation')).toContainText('5 attempted questions');
  await page.getByRole('button', { name: 'Practice This Topic' }).click();
  await expect(page.getByRole('heading', { name: topic.title })).toBeVisible();
  expect((await capturedOnce(page, 'home_action_taken')).properties).toMatchObject({
    recommendation: 'practice_weak_topic',
    destination_id: topic.id,
    evidence_count: 5,
  });
  expect((await capturedOnce(page, 'practice_started')).properties).toMatchObject({
    mode: 'topic',
    topic: topic.id,
    entry_point: 'home',
  });
});

test('completing all published lessons makes Mock Exam the next action', async ({ page }) => {
  await page.addInitScript(({ key, lessonIds }) => {
    localStorage.setItem(key, JSON.stringify({
      version: 1,
      stats: {},
      reviewQueue: [],
      mockResults: [],
      learn: {
        lessons: Object.fromEntries(lessonIds.map((id) => [id, 'completed'])),
      },
    }));
  }, { key: PROGRESS_KEY, lessonIds: LESSONS.map((lesson) => lesson.id) });

  await page.goto(seeded());
  await expect(page.getByText('45 of 45 lessons covered')).toBeVisible();
  await page.getByRole('button', { name: 'Take a Mock Exam' }).click();
  await expect(page.getByRole('heading', { name: 'Practice Mock Exam' })).toBeVisible();
  expect((await capturedOnce(page, 'mock_started')).properties).toMatchObject({ entry_point: 'home' });
});
