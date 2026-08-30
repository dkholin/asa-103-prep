import { useState } from 'react';
import {
  Anchor,
  ArrowRight,
  ChevronDown,
  Compass,
  Cog,
  Map,
  Sailboat,
  ShieldCheck,
  Triangle,
  Waypoints,
  type LucideIcon,
} from 'lucide-react';
import { MODULES, lessonsForModule } from '../../content/learn';
import {
  continueLearning,
  defaultExpandedModuleId,
  lessonChipClass,
  lessonStateLabel,
  moduleLessonProgress,
} from '../../lib/learn-progress';
import { lessonState, type Progress } from '../../lib/progress';
import { ProgressCharacteristic } from './ProgressCharacteristic';

const MODULE_ICONS: Record<string, LucideIcon> = {
  'boat-cruising-basics': Sailboat,
  motoring: Cog,
  'cruising-life-safety': ShieldCheck,
  'sails-trim': Triangle,
  'navigation-rules-tools': Compass,
  'hands-on-cruising': Anchor,
  seamanship: Waypoints,
  'cruise-planning-independence': Map,
};

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
    <section className="learn-home" aria-label="Learn">
      <div className="card learn-intro">
        <p className="eyebrow">Course outline</p>
        <h2>Learn</h2>
        <p className="muted">
          Course modules to read alongside the question bank. Lessons are never locked — open any of
          them in any order.
        </p>
      </div>

      {target && (
        <div className="card hero-card learn-continue" data-testid="continue-learning">
          <p className="eyebrow">Continue learning</p>
          {target.kind === 'lesson' ? (
            <>
              <h2>{target.lesson.title}</h2>
              <p className="muted">
                {target.resume ? 'Pick up where you left off.' : 'Next up in your course.'}
              </p>
              <div className="actions">
                <button className="learn-primary-action" onClick={() => props.onOpenLesson(target.lesson.id)}>
                  {target.resume ? 'Resume lesson' : 'Start lesson'}
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
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
        const ModuleIcon = MODULE_ICONS[module.id] ?? Map;
        const currentLessonId = lessons.some((lesson) => lesson.id === props.progress.learn?.lastLessonId)
          ? props.progress.learn?.lastLessonId
          : undefined;
        return (
          <article
            className={`card learn-module-card${expanded ? ' learn-module-expanded' : ''}${published ? '' : ' learn-module-soon'}`}
            key={module.id}
          >
            <div className="topic-row module-header">
              <span className="module-icon" aria-hidden="true">
                <ModuleIcon size={24} strokeWidth={1.75} />
              </span>
              <div className="module-copy">
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
                      {module.title}
                    </button>
                  ) : (
                    module.title
                  )}
                </h2>
                <div className="muted">{module.blurb}</div>
              </div>
              <div className="module-progress">
                {published ? (
                  <>
                    <ProgressCharacteristic
                      lessons={lessons}
                      progress={props.progress}
                      currentLessonId={currentLessonId}
                      size="sm"
                    />
                    {/* Counts only. No percentage, score, or streak: marking a
                        lesson read is not evidence of mastery. */}
                    <span className="module-progress-label" data-testid={`module-progress-${module.id}`}>
                      {completed} of {total} lessons complete
                    </span>
                  </>
                ) : (
                  <span className="chip chip-not-started">Coming soon</span>
                )}
              </div>
              {published && (
                <ChevronDown
                  className="module-chevron"
                  aria-hidden="true"
                  size={20}
                  strokeWidth={1.75}
                />
              )}
            </div>
            {/*
              Collapsed lessons are not rendered at all rather than hidden with
              CSS, so their buttons leave the tab order with them.
            */}
            {expanded && (
              <ul className="topic-list learn-lesson-list" id={listId}>
                {lessons.map((lesson) => {
                  const state = lessonState(props.progress, lesson.id);
                  return (
                    <li key={lesson.id} className="topic-row learn-lesson-row">
                      <div className="lesson-row-copy">
                        <div className="topic-name">
                          {lesson.order}. {lesson.title}
                        </div>
                        <div className="muted">{lesson.intro}</div>
                      </div>
                      <div className="topic-side">
                        <span className={lessonChipClass(state)}>{lessonStateLabel(state)}</span>
                        <button className="secondary lesson-open-button" onClick={() => props.onOpenLesson(lesson.id)}>
                          Open lesson
                          <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </article>
        );
      })}

      <div className="actions">
        <button className="secondary" onClick={props.onExit}>
          Back to Home
        </button>
      </div>
    </section>
  );
}
