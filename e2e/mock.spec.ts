import { expect, test } from '@playwright/test';
import {
  MOCK_SIZE,
  SEED,
  correctText,
  currentPrompt,
  currentQuestion,
  displayedPositionOf,
  seeded,
  seededMockOrder,
  wrongChoice,
} from './helpers';

/** Answer the mock question currently on screen. */
async function answerCurrentMock(page: import('@playwright/test').Page, mode: 'correct' | 'wrong') {
  const q = await currentQuestion(page);
  const text = mode === 'correct' ? correctText(q) : wrongChoice(q).text;
  await page.getByRole('radio', { name: text, exact: true }).check();
  return q;
}

const startMock = async (page: import('@playwright/test').Page) => {
  await page.getByRole('button', { name: 'Exam', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Practice Mock Exam' })).toBeVisible();
};

test('full mock: 100 questions, stable order through Previous/Next, submit shows results', async ({
  page,
}) => {
  await page.goto(seeded());
  await startMock(page);

  await expect(page.getByText(`Question 1 of ${MOCK_SIZE}`)).toBeVisible();
  await expect(page.getByTestId('mock-answered')).toContainText(`Answered 0 of ${MOCK_SIZE}`);
  await expect(page.getByText(/not the official ASA 103 exam/)).toBeVisible();

  // The seeded exam is predictable, so the on-screen order can be checked exactly.
  const expected = seededMockOrder(SEED);
  expect(expected).toHaveLength(MOCK_SIZE);

  const seen: string[] = [];
  for (let i = 0; i < 5; i++) {
    await expect(page.getByText(`Question ${i + 1} of ${MOCK_SIZE}`)).toBeVisible();
    expect(await currentPrompt(page)).toBe(expected[i].prompt.trim());
    seen.push(await currentPrompt(page));
    await answerCurrentMock(page, i === 0 ? 'wrong' : 'correct');
    await expect(page.getByTestId('mock-answered')).toContainText(`Answered ${i + 1} of`);
    await page.getByRole('button', { name: 'Next', exact: true }).click();
  }

  // Walk back: order must be identical, and selections must be remembered.
  for (let i = 4; i >= 0; i--) {
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByText(`Question ${i + 1} of ${MOCK_SIZE}`)).toBeVisible();
    expect(await currentPrompt(page)).toBe(seen[i]);
    await expect(page.locator('.choices input:checked')).toHaveCount(1);
  }

  // No feedback leaks before submission.
  await expect(page.getByText('Correct', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Incorrect', { exact: true })).toHaveCount(0);
  await expect(page.locator('.feedback')).toHaveCount(0);

  // Submitting with unanswered questions asks for confirmation first.
  page.once('dialog', async (d) => {
    expect(d.message()).toContain(`${MOCK_SIZE - 5} unanswered questions`);
    await d.dismiss();
  });
  await page.getByRole('button', { name: 'Submit exam' }).click();
  await expect(page.getByRole('heading', { name: 'Practice Mock Exam' })).toBeVisible();

  page.once('dialog', (d) => d.accept());
  await page.getByRole('button', { name: 'Submit exam' }).click();

  await expect(page.getByRole('heading', { name: 'Practice mock results' })).toBeVisible();
  await expect(page.getByTestId('mock-score')).toContainText(`4 / ${MOCK_SIZE} correct`);
  await expect(page.getByText(/Study target: 85%\+/)).toBeVisible();
  await expect(page.getByRole('list', { name: 'Per-topic results' })).toBeVisible();
  await expect(page.getByTestId('weak-areas')).toBeVisible();
  await expect(page.getByRole('heading', { name: `Questions you missed (${MOCK_SIZE - 4})` })).toBeVisible();

  // Mock misses feed the review queue.
  await page.getByRole('button', { name: 'Back to dashboard' }).click();
  await expect(page.getByText(`Last mock exam: 4 / ${MOCK_SIZE} correct.`)).toBeVisible();
  await expect(page.getByRole('button', { name: `Missed questions (${MOCK_SIZE - 4})` })).toBeVisible();
});

test('a fresh mock attempt is a different exam from the previous one', async ({ page }) => {
  // No seed here: production randomness. Two independent draws of 100 from 301
  // sharing an identical first-five sequence is not a realistic outcome.
  await page.goto('/');
  await startMock(page);
  const first: string[] = [];
  for (let i = 0; i < 5; i++) {
    first.push(await currentPrompt(page));
    await page.getByRole('button', { name: 'Next', exact: true }).click();
  }

  await page.getByRole('button', { name: 'Abandon exam' }).click();
  await startMock(page);
  const second: string[] = [];
  for (let i = 0; i < 5; i++) {
    second.push(await currentPrompt(page));
    await page.getByRole('button', { name: 'Next', exact: true }).click();
  }

  expect(second).not.toEqual(first);
});

test('correct answers score correctly from every displayed position', async ({ page }) => {
  await page.goto(seeded());
  await startMock(page);

  const positionsSeen = new Set<number>();
  const answered: { id: string; position: number }[] = [];

  // Walk forward answering correctly until all four displayed positions of the
  // correct answer have been exercised.
  for (let i = 0; i < MOCK_SIZE && positionsSeen.size < 4; i++) {
    const q = await currentQuestion(page);
    const position = await displayedPositionOf(page, correctText(q));
    positionsSeen.add(position);
    answered.push({ id: q.id, position });
    await page.getByRole('radio', { name: correctText(q), exact: true }).check();
    await page.getByRole('button', { name: 'Next', exact: true }).click();
  }
  expect([...positionsSeen].sort()).toEqual([1, 2, 3, 4]);

  page.once('dialog', (d) => d.accept());
  await page.getByRole('button', { name: 'Submit exam' }).click();

  // Every one of those answers scored, regardless of where it was displayed.
  await expect(page.getByTestId('mock-score')).toContainText(
    `${answered.length} / ${MOCK_SIZE} correct`,
  );
});

test('a wrong answer chosen from a non-first position gets the right reveal and why-wrong', async ({
  page,
}) => {
  await page.goto(seeded(777));
  await startMock(page);

  // Find a question whose correct answer is NOT displayed first, then pick a
  // specific wrong choice and confirm the results page reports both correctly.
  let target = await currentQuestion(page);
  let position = await displayedPositionOf(page, correctText(target));
  for (let i = 0; i < 20 && position === 1; i++) {
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    target = await currentQuestion(page);
    position = await displayedPositionOf(page, correctText(target));
  }
  expect(position, 'expected a question with the answer outside position 1').toBeGreaterThan(1);

  const wrong = wrongChoice(target);
  await page.getByRole('radio', { name: wrong.text, exact: true }).check();

  page.once('dialog', (d) => d.accept());
  await page.getByRole('button', { name: 'Submit exam' }).click();

  await expect(page.getByRole('heading', { name: 'Practice mock results' })).toBeVisible();
  const row = page.locator('.mock-results li').filter({ hasText: target.prompt });
  await expect(row).toHaveCount(1);
  await expect(row).toContainText(`Your answer: ${wrong.text}`);
  await expect(row).toContainText(`Correct answer: ${correctText(target)}`);
  if (wrong.whyWrong) {
    await expect(row).toContainText(wrong.whyWrong);
  }
  await expect(row).toContainText(target.explanation);
});
