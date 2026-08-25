import { MODULES, lessonsForModule } from '../../content/learn';
import {
  continueLearning,
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
        return (
          <div className="card" key={module.id}>
            <div className="topic-row module-header">
              <div>
                <h2>{module.title}</h2>
                <div className="muted">{module.blurb}</div>
              </div>
              <div className="topic-side">
                {module.status === 'published' ? (
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
            {module.status === 'published' && (
              <ul className="topic-list">
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
