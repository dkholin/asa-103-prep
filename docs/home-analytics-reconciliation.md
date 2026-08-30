# Home experience and analytics reconciliation

## Audited baseline

The post-authentication shell opened on the Practice `Dashboard` and exposed
`Learn | Practice | Review | Exam`. Learn already had durable per-lesson progress and deterministic
resume logic. Practice had a separate question-readiness recommendation which could label the
least-good topic "weakest" without a minimum evidence rule. The three PostHog insights documented
in `PHASE3_SETUP.md` still described the original Practice-first product.

The implemented product model is now `Home | Learn | Practice | Mock Exam`. Missed-question review
remains available inside Practice rather than occupying a fifth top-level position. Home uses the
existing progress snapshot and catalogue; it does not store a parallel recommendation state.

## Recommendation rule

Home resolves exactly one action in this order:

1. A learner with no stored study activity starts the first published lesson.
2. A returning learner resumes their last in-progress lesson.
3. A Practice topic may be recommended only after at least five distinct questions in that topic
   have been attempted and fewer than 70% currently have a correct latest answer.
4. Otherwise, the learner continues with the first unfinished published lesson.
5. A Mock Exam is recommended when all published lessons are complete.

This is deterministic, local to the current progress snapshot, and deliberately not a mastery or
predicted-score model.

## Event reconciliation

| Decision | Events | Current interpretation |
| --- | --- | --- |
| KEEP | `beta_opened`, `signup_started`, `signup_completed`, `auth_diagnostic` | Arrival, auth attempt/outcome, and blockers. `beta_opened` remains a page-load event rather than product success. |
| KEEP | `onboarding_completed` | Optional onboarding submission; still not a diagnostic or activation event. |
| ADD | `home_viewed` | A rendered Home exposure with `learner_state`, recommendation, bounded destination id, and Learn counts. |
| ADD | `home_action_taken` | The dominant Home recommendation was followed. Its properties intentionally match `home_viewed`, allowing shown-versus-followed analysis without an impression id. |
| UPDATE | `practice_started` | Keep the event and existing mode/topic/lesson properties; add `entry_point` so Home, Practice, and Learn-launched sessions can be distinguished. |
| KEEP | `practice_completed`, `missed_review_started`, `missed_review_completed`, `question_answered`, `question_skipped` | Meaningful Practice outcomes and review behavior. No navigation-click duplicate is added. |
| KEEP | `lesson_started`, `lesson_completed` | Current Learn lesson/module ids already match the live 7-module, 45-lesson catalogue. |
| UPDATE | `mock_started` | Add `entry_point` to distinguish Home, Practice, and direct Mock Exam entry. |
| KEEP | `mock_completed` | Full-attempt outcome and completion remain correct. |
| REMOVE | none from capture code | The event names still describe real current actions. The obsolete item is the old Practice-first PostHog funnel, not an emitted event. |

No page-view event or generic navigation-click event is added. A start without its paired completion
continues to represent abandonment; an explicit abandonment event is unnecessary for this product
stage.

## Reporting changes

Replace the old `beta_opened → practice_started → question_answered → practice_completed` primary
funnel with:

- New learner: `beta_opened → home_viewed (new) → home_action_taken (start_learning) → lesson_started → lesson_completed`.
- Returning learner: `home_viewed (returning) → home_action_taken → lesson_started/practice_started/mock_started`.
- Home recommendation follow-through: compare `home_viewed` and `home_action_taken` by
  `recommendation`.
- Learn-to-Practice: `lesson_started/lesson_completed → practice_started`, segmented by
  `entry_point = learn` versus other entry points.
- Mock adoption and completion: `mock_started → mock_completed`, segmented by `entry_point`.
- Auth blockers: `beta_opened/signup_started → auth_diagnostic (failure)` and successful arrival at
  `home_viewed`.

Keep the existing ten-answered-question activation insight if it remains useful as a Practice depth
measure, but do not present it as overall product activation now that Learn is a first-class path.
