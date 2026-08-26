import { lessonById, lessonsForModule, moduleById, neighbours } from '../../content/learn';
import type { Lesson } from '../../content/learn';
import { practiceIdsForConcepts } from '../../content/practice-concepts';
import { useAnalytics, useFireOnceWhen } from '../../lib/analytics-context';
import { lessonChipClass, lessonStateLabel } from '../../lib/learn-progress';
import {
  lessonState,
  markLessonCompleted,
  markLessonNotCompleted,
  markLessonOpened,
  type Progress,
} from '../../lib/progress';
import { Blocks } from './Blocks';
import { ProgressCharacteristic } from './ProgressCharacteristic';

export function LessonView(props: {
  lessonId: string;
  progress: Progress;
  updateProgress: (progress: Progress) => void;
  onOpenLesson: (lessonId: string) => void;
  onStartPractice: (lesson: Lesson, questionIds: string[]) => void;
  onExit: () => void;
}) {
  const lesson = lessonById(props.lessonId);
  // Resolved before the body mounts, so a stored id naming a lesson that no
  // longer exists renders this notice instead of recording an open or firing
  // `lesson_started` for a lesson nobody can see.
  if (!lesson) {
    return (
      <section className="card" aria-label="Lesson">
        <h2>Lesson not found</h2>
        <p className="muted">This lesson is no longer part of the course.</p>
        <div className="actions">
          <button className="secondary" onClick={props.onExit}>Back to Learn</button>
        </div>
      </section>
    );
  }
  return <LessonBody {...props} lesson={lesson} />;
}

function LessonBody(props: {
  lesson: Lesson;
  progress: Progress;
  updateProgress: (progress: Progress) => void;
  onOpenLesson: (lessonId: string) => void;
  onStartPractice: (lesson: Lesson, questionIds: string[]) => void;
  onExit: () => void;
}) {
  const { lesson } = props;
  const analytics = useAnalytics();
  const module = moduleById(lesson.moduleId);
  const { previous, next, index, total } = neighbours(lesson.id);
  const state = lessonState(props.progress, lesson.id);
  const completed = state === 'completed';
  const practiceQuestionIds = practiceIdsForConcepts(lesson.concepts);
  const moduleLessons = lessonsForModule(lesson.moduleId);
  const terms = lesson.blocks.flatMap((block) => block.kind === 'definition' ? [block.term] : []);

  /**
   * One open per mounted lesson. App keys this component by lesson id, so
   * prev/next produces a fresh instance and therefore a fresh guard, while
   * `StrictMode`'s remount reuses the ref and fires nothing twice.
   *
   * `markLessonOpened` returns the same snapshot when a re-open changes
   * nothing, and skipping the write in that case is what keeps a no-op open
   * from triggering a cloud save and flipping the header to "Saving progress…".
   */
  useFireOnceWhen(true, () => {
    const opened = markLessonOpened(props.progress, lesson.id);
    if (opened !== props.progress) props.updateProgress(opened);
    analytics.capture({
      name: 'lesson_started',
      properties: { lesson_id: lesson.id, module_id: lesson.moduleId },
    });
  });

  const toggleCompletion = () => {
    if (completed) {
      props.updateProgress(markLessonNotCompleted(props.progress, lesson.id));
      return;
    }
    props.updateProgress(markLessonCompleted(props.progress, lesson.id));
    analytics.capture({
      name: 'lesson_completed',
      properties: { lesson_id: lesson.id, module_id: lesson.moduleId },
    });
  };

  return (
    <section className="card lesson" aria-label={lesson.title}>
      <div className="lesson-layout">
        <header className="lesson-header">
          <button className="linklike lesson-back" onClick={props.onExit}>← Back to Learn</button>
          <p className="eyebrow">
            {module?.title ?? lesson.moduleId} · Lesson {index + 1} of {total}
          </p>
          <div className="lesson-title-row">
            <h2>{lesson.title}</h2>
          <span className={lessonChipClass(state)} data-testid="lesson-state">
            {lessonStateLabel(state)}
          </span>
          </div>
          <p className="lesson-intro">{lesson.intro}</p>
        </header>

        <aside className="lesson-margin" aria-label="Lesson reference">
          <div className="lesson-margin-section">
            <p className="lesson-margin-label">Module progress</p>
            <ProgressCharacteristic
              lessons={moduleLessons}
              progress={props.progress}
              currentLessonId={lesson.id}
              size="md"
            />
            <p className="lesson-margin-detail">Lesson {index + 1} of {total}</p>
          </div>
          {terms.length > 0 && (
            <div className="lesson-margin-section">
              <h3>Terms in this lesson</h3>
              <ul>{terms.map((term) => <li key={term}>{term}</li>)}</ul>
            </div>
          )}
        </aside>

        <main className="lesson-reading">
          <Blocks blocks={lesson.blocks} />

          <div className="lesson-actions">
            {practiceQuestionIds.length > 0 && (
              <button className="large" onClick={() => props.onStartPractice(lesson, practiceQuestionIds)}>
                Practice this material
              </button>
            )}
            {/* Completion is always an explicit act and always reversible. */}
            <button
              className="secondary"
              aria-label={completed ? 'Mark as not complete' : 'Mark complete'}
              onClick={toggleCompletion}
            >
              {completed ? 'Completed' : 'Mark complete'}
            </button>
          </div>

          <nav className="lesson-neighbours" aria-label="Adjacent lessons">
            <button
              className="secondary lesson-neighbour lesson-neighbour-previous"
              aria-label={`Previous lesson${previous ? `: ${previous.title}` : ''}`}
              disabled={!previous}
              onClick={() => previous && props.onOpenLesson(previous.id)}
            >
              <span className="lesson-neighbour-direction">← Previous</span>
              <span className="lesson-neighbour-title">{previous?.title ?? 'No previous lesson'}</span>
            </button>
            <button
              className="secondary lesson-neighbour lesson-neighbour-next"
              aria-label={`Next lesson${next ? `: ${next.title}` : ''}`}
              disabled={!next}
              onClick={() => next && props.onOpenLesson(next.id)}
            >
              <span className="lesson-neighbour-direction">Next →</span>
              <span className="lesson-neighbour-title">{next?.title ?? 'No next lesson'}</span>
            </button>
          </nav>
        </main>
      </div>
    </section>
  );
}
