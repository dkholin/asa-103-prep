import type { Lesson } from '../../content/learn';
import { lessonState, type Progress } from '../../lib/progress';

export function ProgressCharacteristic(props: {
  lessons: Lesson[];
  progress: Progress;
  currentLessonId?: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}) {
  const { lessons, progress, currentLessonId, size = 'sm', className = '' } = props;
  const completed = lessons.filter((lesson) => lessonState(progress, lesson.id) === 'completed').length;
  const current = currentLessonId && lessons.find((lesson) => lesson.id === currentLessonId);
  const currentPosition = current ? lessons.indexOf(current) + 1 : null;
  const summary = [
    `${completed} of ${lessons.length} lessons complete`,
    currentPosition ? `current lesson ${currentPosition} of ${lessons.length}` : null,
  ].filter(Boolean).join('; ');

  return (
    <div
      className={`characteristic characteristic-${size}${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={summary}
    >
      <span className="characteristic-ticks" aria-hidden="true">
        {lessons.map((lesson) => {
          const completedLesson = lessonState(progress, lesson.id) === 'completed';
          const currentLesson = lesson.id === currentLessonId;
          const tickClass = currentLesson
            ? `characteristic-tick tick-current${completedLesson ? ' tick-current-complete' : ''}`
            : completedLesson
              ? 'characteristic-tick tick-done'
              : 'characteristic-tick tick-todo';
          return <span className={tickClass} key={lesson.id} />;
        })}
      </span>
    </div>
  );
}
