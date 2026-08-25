import { lessonById, moduleById, neighbours } from '../../content/learn';
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
      <p className="eyebrow">
        {module?.title ?? lesson.moduleId} · Lesson {index + 1} of {total}
      </p>
      <div className="topic-row module-header">
        <h2>{lesson.title}</h2>
        <div className="topic-side">
          <span className={lessonChipClass(state)} data-testid="lesson-state">
            {lessonStateLabel(state)}
          </span>
        </div>
      </div>
      <p className="muted lesson-intro">{lesson.intro}</p>
      <hr className="hairline" />

      <Blocks blocks={lesson.blocks} />

      {practiceQuestionIds.length > 0 && (
        <div className="actions">
          <button onClick={() => props.onStartPractice(lesson, practiceQuestionIds)}>
            Practice this material
          </button>
        </div>
      )}

      {/* Completion is always an explicit act and always reversible: nothing
          here infers it from scroll position or time on the page. */}
      <div className="actions">
        <button onClick={toggleCompletion}>
          {completed ? 'Mark as not complete' : 'Mark complete'}
        </button>
      </div>

      {/* Prev/next are always rendered and disabled at the ends, so the pair
          does not shift position between the first and last lesson. */}
      <div className="actions">
        <button
          className="secondary"
          disabled={!previous}
          onClick={() => previous && props.onOpenLesson(previous.id)}
        >
          Previous lesson
        </button>
        <button
          className="secondary"
          disabled={!next}
          onClick={() => next && props.onOpenLesson(next.id)}
        >
          Next lesson
        </button>
        <span className="spacer" />
        <button className="secondary" onClick={props.onExit}>
          Back to Learn
        </button>
      </div>
    </section>
  );
}
