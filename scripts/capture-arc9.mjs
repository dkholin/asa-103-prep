// Arc 9 release-candidate screenshot packet. Captures against a running
// production preview server (http://localhost:4173). Output: screenshots/*.png
//
// Run with vite-node so the question bank and the shared shuffle primitives can
// be imported directly, letting the script reproduce the exact seeded order the
// app will render:  npx vite-node scripts/capture-arc9.mjs
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { QUESTIONS, MOCK_EXAM_SIZE, selectMockQuestions } from '../src/content/questions.ts';
import { mulberry32, prepareAttempt, withShuffledChoices } from '../src/lib/shuffle.ts';

const BASE = 'http://localhost:4173';
const SEED = 20250815;
const seeded = (path = '/') => `${BASE}${path}?seed=${SEED}`;
mkdirSync('screenshots', { recursive: true });

const correctText = (q) => q.choices.find((c) => c.id === q.correctChoiceId).text;
const wrongChoice = (q) => q.choices.find((c) => c.id !== q.correctChoiceId);

const practiceOrder = (topic) =>
  prepareAttempt(QUESTIONS.filter((q) => q.topic === topic), mulberry32(SEED));

const mockOrder = () => {
  const rng = mulberry32(SEED);
  return selectMockQuestions(MOCK_EXAM_SIZE, rng)
    .map((id) => QUESTIONS.find((q) => q.id === id))
    .map((q) => withShuffledChoices(q, rng));
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const shot = async (name) => {
  await page.waitForFunction(() =>
    [...document.querySelectorAll('img')].every((i) => i.complete && i.naturalWidth > 0),
  );
  await page.screenshot({ path: `screenshots/${name}.png` });
};
const topicPractice = async (title) => {
  await page
    .getByRole('listitem')
    .filter({ hasText: title })
    .getByRole('button', { name: 'Practice' })
    .click();
};

await page.goto(seeded());
await page.evaluate(() => localStorage.clear());
await page.goto(seeded());

// 35. Fresh dashboard
await page.getByRole('heading', { name: 'Overall progress' }).waitFor();
await shot('35-arc9-dashboard-fresh');

// 36. Topic practice, visual question (Navigation Lights)
const navOrder = practiceOrder('nav-lights');
const navVisual = navOrder.find((q) => q.format === 'visual');
await topicPractice('Navigation Lights');
for (let i = 0; i < navOrder.length; i++) {
  const prompt = (await page.locator('.question-body .prompt').textContent()).trim();
  if (prompt === navVisual.prompt.trim()) break;
  await page.getByRole('button', { name: 'Skip' }).click();
}
await shot('36-arc9-topic-visual-question');

// 37. Wrong-answer explanation (why-wrong keyed to the chosen choice)
await page.getByRole('radio', { name: wrongChoice(navVisual).text, exact: true }).check();
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByText('Incorrect', { exact: true }).waitFor();
await shot('37-arc9-wrong-answer-explanation');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// 38. Text-only question (Sound Signals)
await topicPractice('Sound Signals');
await page.getByText('Question 1 of').waitFor();
await shot('38-arc9-text-only-question');
await page.getByRole('button', { name: 'Skip' }).click();
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// 39. Dashboard with mixed progress
await page.getByRole('heading', { name: 'Overall progress' }).waitFor();
await shot('39-arc9-dashboard-mixed');

// 40. Missed questions review list
await page.getByRole('button', { name: /Missed questions/ }).click();
await page.getByRole('heading', { name: 'Missed questions' }).waitFor();
await shot('40-arc9-missed-questions');
await page.getByRole('button', { name: 'Back to dashboard' }).click();

// 41. Full mock exam question (start of attempt)
const mock = mockOrder();
await page.getByRole('button', { name: 'Exam', exact: true }).click();
await page.getByRole('heading', { name: 'Practice Mock Exam' }).waitFor();
await shot('41-arc9-mock-question');

// 42. Mock progress + Previous/Next navigation, part-way through
for (let i = 0; i < 12; i++) {
  await page.getByRole('radio', { name: correctText(mock[i]), exact: true }).check();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
}
await page.getByRole('button', { name: 'Previous' }).click();
await shot('42-arc9-mock-progress-navigation');
await page.getByRole('button', { name: 'Next', exact: true }).click();

// 43. State immediately before an unanswered submit. The confirmation itself is
// a native browser confirm() and cannot appear in a page screenshot; its text is
// asserted in e2e/mock.spec.ts.
await shot('43-arc9-mock-before-unanswered-submit');

// Answer a few more wrong so the results page has a mix, then submit.
for (let i = 12; i < 20; i++) {
  await page.getByRole('radio', { name: wrongChoice(mock[i]).text, exact: true }).check();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
}
page.once('dialog', (d) => d.accept());
await page.getByRole('button', { name: 'Submit exam' }).click();

// 44. Mock results header + study target
await page.getByRole('heading', { name: 'Practice mock results' }).waitFor();
await shot('44-arc9-mock-results');

// 45. Topic breakdown / weak areas
await page.getByRole('heading', { name: 'Topic breakdown' }).scrollIntoViewIfNeeded();
await shot('45-arc9-mock-topic-breakdown');

// 46. Missed-answer review inside the results
await page.locator('.mock-results li').first().scrollIntoViewIfNeeded();
await shot('46-arc9-mock-missed-review');

// 47. Moderate-width view
await page.setViewportSize({ width: 800, height: 1000 });
await page.getByRole('button', { name: 'Back to dashboard' }).click();
await page.getByRole('heading', { name: 'Overall progress' }).waitFor();
await page.evaluate(() => window.scrollTo(0, 0));
await shot('47-arc9-moderate-width-dashboard');
await topicPractice('Coastal Navigation & Charts');
await page.getByText('Question 1 of').waitFor();
await shot('48-arc9-moderate-width-question');

await browser.close();
console.log('Arc 9 screenshot packet captured.');
