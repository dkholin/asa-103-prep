import { expect, test } from '@playwright/test';
import { MOCK_QUESTIONS, correctText, wrongChoice } from './helpers';

test('mock exam withholds feedback until submission, then reveals results', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Mock exam' }).click();
  await expect(page.getByRole('heading', { name: 'Mock exam' })).toBeVisible();

  for (let i = 0; i < MOCK_QUESTIONS.length; i++) {
    const q = MOCK_QUESTIONS[i];
    await expect(page.getByText(`Question ${i + 1} of ${MOCK_QUESTIONS.length}`)).toBeVisible();
    await expect(page.getByText(q.prompt)).toBeVisible();

    // Answer: last question deliberately wrong, the rest correct.
    const last = i === MOCK_QUESTIONS.length - 1;
    const answer = last ? wrongChoice(q).text : correctText(q);
    await page.getByRole('radio', { name: answer }).check();

    // Exam conditions: no correctness verdicts, no explanations after answering.
    await expect(page.getByText('Correct', { exact: true })).toHaveCount(0);
    await expect(page.getByText('Incorrect', { exact: true })).toHaveCount(0);
    await expect(page.getByText(q.explanation)).toHaveCount(0);

    if (!last) {
      await page.getByRole('button', { name: 'Next', exact: true }).click();
    }
  }

  await page.getByRole('button', { name: 'Submit exam' }).click();

  // Results become available only now.
  await expect(page.getByRole('heading', { name: 'Mock exam results' })).toBeVisible();
  await expect(
    page.getByText(`Score: ${MOCK_QUESTIONS.length - 1} / ${MOCK_QUESTIONS.length}`),
  ).toBeVisible();
  await expect(page.getByText('Incorrect', { exact: true })).toHaveCount(1);
  const lastQ = MOCK_QUESTIONS[MOCK_QUESTIONS.length - 1];
  await expect(page.getByText(lastQ.explanation)).toBeVisible();

  await page.getByRole('button', { name: 'Back to dashboard' }).click();
  await expect(
    page.getByText(
      `Last mock exam: ${MOCK_QUESTIONS.length - 1} / ${MOCK_QUESTIONS.length} correct.`,
    ),
  ).toBeVisible();
});
