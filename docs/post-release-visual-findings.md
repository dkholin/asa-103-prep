# Post-release visual findings

Observations recorded during Arc 9 release-candidate hardening while driving the
production preview build (`npm run build` + `npm run preview`, port 4173).

None of these block release. Under the Arc 9 rule, a visual is fixed before
release only when it is factually wrong, materially misleading, broken or
unreadable, legally/licensing problematic, or leaks the answer. Everything below
failed that bar and is recorded for a later pass instead.

## Fixed during Arc 9 (met the blocking bar)

- **Mock results — weak-areas list.** The list of weak topics was joined with
  commas, but several topic titles themselves contain commas ("Seamanship,
  Communications & Lines"; "Engine, Motoring & Docking"), so a run with several
  weak areas read as roughly twice as many topics as it actually named. Changed
  the separator to a middot in `src/components/MockExam.tsx`. This was fixed
  because the miscount is materially misleading, not for polish.

## Recorded for a later pass

| # | Asset / screen | What was seen | Why it may be worth improving |
| - | -------------- | ------------- | ----------------------------- |
| 1 | App shell — sticky header (`.app-shell-header`) | While scrolling a long page (clearest at 800 px width, `screenshots/47-arc9-moderate-width-dashboard.png`), page content is faintly visible through the sticky header band. | Slightly muddies the header; an opaque background or a backdrop blur would read cleaner. Purely cosmetic — nothing becomes unreadable. |
| 2 | Missed Questions screen (`src/components/MissedQuestions.tsx`) | "Practice all missed questions" and "Back to dashboard" render in two separate stacked action rows (`screenshots/40-arc9-missed-questions.png`). | Every other screen puts its actions on one row; the stacked pair looks unintentional. |
| 3 | Mock results — missed-question list | After a weak attempt the list can run to ~90 entries in one continuous scroll (`screenshots/46-arc9-mock-missed-review.png`). | Long single scroll is tiring to work through; grouping by topic or collapsing entries would help review. No information is wrong or missing. |
| 4 | Question bank — answer-length tell (examples: `safety-fuel-spill-obligation`, `chart-nav-cd-datum`) | The correct choice is the strictly longest option in **262 of 301 questions (87.0%)**, tied-longest in 4 more, and the shortest in only 14 (4.7%); it averages **+63.9 characters** over the mean distractor. | **Highest-priority post-release follow-up.** Random baseline is 25%, so a student who always picks the longest option scores about 87% without knowing any sailing — a stronger exploitable tell than the answer-position bias Arcs 7 and 9 were built to remove. Not introduced or worsened by Arc 9: it is pre-existing content design, not a rendering defect, and evening out ~262 questions' distractor lengths is a content arc of its own. Measured during Arc 9 independent verification. |
| 5 | Mock exam — progress bar semantics | The bar tracks *answered* count while the header reads "Question 76 of 100", so at a glance the two can look inconsistent (`screenshots/42-arc9-mock-progress-navigation.png`). | Both readings are correct and the caption under the bar spells out "Answered N of 100", but a second progress indicator (or a position marker) would remove the momentary double-take. |
| 6 | Mock exam — unanswered-submit confirmation | The confirmation is a native `window.confirm` ("You have 49 unanswered questions. Submit anyway?"), matching the existing Reset Progress pattern. | Consistent with the rest of the app and behaviourally correct, but it cannot be styled and cannot be captured in a page screenshot, which is why the packet contains `43-arc9-mock-before-unanswered-submit.png` (the state immediately before) rather than the dialog itself. Its exact text is asserted in `e2e/mock.spec.ts`. |
| 7 | Mock results — weak-areas banner | On a low-scoring attempt the banner can name nearly every topic. | Technically accurate but low-signal; a cap ("your 3 weakest topics") would be more actionable. |

## Checks that came back clean

- **No answer-leaking visuals found.** Every figure encountered across all 13
  topics during live testing was inspected alongside its choice list; none
  labelled or otherwise gave away its own answer.
- **No licensing defects found.** Every raster photo that is not
  attribution-required is public-domain (US Government work) or CC0; all
  attribution-required assets rendered their credit, license link, source link
  and, where applicable, their modification note (verified live on
  `photo-trawler-gear-out`, `photo-vessel-at-anchor`; `photo-clove-hitch` is CC0
  and correctly renders no credit).
- **All figures loaded.** Every sampled visual question rendered a decoded image
  with non-zero natural width in the production build.
- **Arc 8 deferred items were not reopened.** No major functional, factual, or
  legal problem was found in any of them during this pass.
