import { useState } from 'react';
import { MODULES, lessonsForModule } from '../../content/learn';
import {
  continueLearning,
  defaultExpandedModuleId,
  lessonChipClass,
  lessonStateLabel,
  moduleLessonProgress,
} from '../../lib/learn-progress';
import { lessonState, type Progress } from '../../lib/progress';

export function LearnHome(props: {
  progress: Progress;
  onOpenLesson: (lessonId: string) => void;
  onExit: () => void;
}) {
  const target = continueLearning(props.progress);
  /**
   * Which module is open. Exactly one at a time — opening another closes the
   * previous one — and purely presentational: it is seeded once per mount from
   * the learner's real progress and is never written back to `Progress`, so
   * reopening Learn always reflects where the learner actually is rather than
   * an accordion state saved from some earlier session.
   */
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(() =>
    defaultExpandedModuleId(props.progress),
  );

  return (
    <section aria-label="Learn">
      <div className="card">
        <h2>Learn</h2>
        <p className="muted">
          Course modules to read alongside the question bank. Lessons are never locked — open any of
          them in any order.
        </p>
      </div>

      {target && (
        <div className="card hero-card" data-testid="continue-learning">
          <p className="eyebrow">Continue learning</p>
          {target.kind === 'lesson' ? (
            <>
              <h2>{target.lesson.title}</h2>
              <p className="muted">
                {target.resume ? 'Pick up where you left off.' : 'Next up in your course.'}
              </p>
              <div className="actions">
                <button onClick={() => props.onOpenLesson(target.lesson.id)}>
                  {target.resume ? 'Resume lesson' : 'Start lesson'}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>All available lessons complete</h2>
              <p className="muted">You have marked every published lesson complete.</p>
            </>
          )}
        </div>
      )}

      {MODULES.map((module) => {
        const lessons = lessonsForModule(module.id);
        const { completed, total } = moduleLessonProgress(props.progress, module.id);
        const published = module.status === 'published';
        const expanded = published && expandedModuleId === module.id;
        const listId = `module-lessons-${module.id}`;
        return (
          <div className="card" key={module.id}>
            <div className="topic-row module-header">
              <div>
                {/*
                  Heading wrapping a button is the accordion pattern: the module
                  keeps its place in the heading outline while the control that
                  opens it is a real button. A coming-soon module has nothing to
                  open, so it stays plain text and never looks clickable.
                */}
                <h2>
                  {published ? (
                    <button
                      type="button"
                      className="module-toggle"
                      aria-expanded={expanded}
                      // Omitted while collapsed: the list is not rendered at
                      // all — that is what keeps its buttons out of the tab
                      // order — so naming it here would dangle.
                      aria-controls={expanded ? listId : undefined}
                      onClick={() =>
                        setExpandedModuleId((current) => (current === module.id ? null : module.id))
                      }
                    >
                      <span className="module-toggle-icon" aria-hidden="true" />
                      {module.title}
                    </button>
                  ) : (
                    module.title
                  )}
                </h2>
                <div className="muted">{module.blurb}</div>
              </div>
              <div className="topic-side">
                {published ? (
                  // Counts only. No percentage, score, or streak: marking a
                  // lesson read is not evidence of mastery.
                  <span className="chip" data-testid={`module-progress-${module.id}`}>
                    {completed} of {total} lessons complete
                  </span>
                ) : (
                  <span className="chip chip-not-started">Coming soon</span>
                )}
              </div>
            </div>
            {/*
              Collapsed lessons are not rendered at all rather than hidden with
              CSS, so their buttons leave the tab order with them.
            */}
            {expanded && (
              <ul className="topic-list" id={listId}>
                {lessons.map((lesson) => {
                  const state = lessonState(props.progress, lesson.id);
                  return (
                    <li key={lesson.id} className="topic-row">
                      <div>
                        <div className="topic-name">
                          {lesson.order}. {lesson.title}
                        </div>
                        <div className="muted">{lesson.intro}</div>
                      </div>
                      <div className="topic-side">
                        <span className={lessonChipClass(state)}>{lessonStateLabel(state)}</span>
                        <button className="secondary" onClick={() => props.onOpenLesson(lesson.id)}>
                          Open lesson
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}

      <div className="actions">
        <button className="secondary" onClick={props.onExit}>
          Back to dashboard
        </button>
      </div>
    </section>
  );
}
