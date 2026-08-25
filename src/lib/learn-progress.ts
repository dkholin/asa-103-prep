/**
 * Learn state read against the lesson catalogue.
 *
 * `progress.ts` stays deliberately ignorant of which lessons exist — it is the
 * durable boundary and must round-trip ids it does not recognise. Everything
 * that needs to resolve a stored id to a real lesson lives here instead, which
 * is also where the "unknown lesson ids must not crash Learn" half of that
 * contract is enforced.
 */
import { MODULES, lessonsForModule } from '../content/learn';
import type { Lesson } from '../content/learn';
import { lessonState, type LessonState, type Progress } from './progress';

/** Lessons a learner can actually reach today, in course order. */
export function publishedLessons(): Lesson[] {
  return MODULES.filter((m) => m.status === 'published').flatMap((m) => lessonsForModule(m.id));
}

export interface ModuleLessonProgress {
  completed: number;
  total: number;
}

/** "3 of 7 lessons complete" — counts, never a percentage or a score. */
export function moduleLessonProgress(progress: Progress, moduleId: string): ModuleLessonProgress {
  const lessons = lessonsForModule(moduleId);
  return {
    completed: lessons.filter((l) => lessonState(progress, l.id) === 'completed').length,
    total: lessons.length,
  };
}

export type ContinueTarget =
  /**
   * `resume` is a fact about the destination — whether that lesson is already
   * `in-progress` — not about which resolution rule produced it. Deriving it
   * from the rule instead let rule 2 offer to "start" a lesson the outline on
   * the same screen labelled "In progress".
   */
  | { kind: 'lesson'; lesson: Lesson; resume: boolean }
  | { kind: 'all-published-complete' }
  | null;

/**
 * Where "Continue learning" goes, in this exact order:
 *
 * 1. the last-opened lesson, if it still exists, sits in a published module,
 *    and is still `in-progress`;
 * 2. otherwise the first published lesson that is not complete, in course
 *    order — which with no prior activity is simply lesson 1, with no special
 *    case for the empty state;
 * 3. and if every published lesson is complete, a course-wide terminal state,
 *    so the card reports completion without attributing it to one module.
 *
 * A coming-soon module is never a target: it contributes no lessons.
 */
export function continueLearning(progress: Progress): ContinueTarget {
  const lessons = publishedLessons();
  if (lessons.length === 0) return null;

  const lastLessonId = progress.learn?.lastLessonId;
  if (lastLessonId !== undefined) {
    // Resolved against the published catalogue, so a stored id that names a
    // removed lesson — or one in a module that is no longer published — falls
    // through to the sequential rule instead of dead-ending.
    const last = lessons.find((l) => l.id === lastLessonId);
    if (last && lessonState(progress, last.id) === 'in-progress') {
      return { kind: 'lesson', lesson: last, resume: true };
    }
  }

  // The first unfinished lesson in course order, which may be an earlier one
  // the learner left part-read. `resume` therefore comes from that lesson's
  // own state, so the card never offers to "start" something the outline on
  // the same screen shows as in progress.
  const next = lessons.find((l) => lessonState(progress, l.id) !== 'completed');
  if (next) {
    return { kind: 'lesson', lesson: next, resume: lessonState(progress, next.id) === 'in-progress' };
  }

  return { kind: 'all-published-complete' };
}

/**
 * Which published module the Learn accordion opens on, in this exact order:
 *
 * 1. the module owning `lastLessonId`, whenever that id still resolves to a
 *    published lesson — regardless of that lesson's state, so returning from a
 *    lesson reopens the module it came from even once it is complete;
 * 2. otherwise the module owning whatever `continueLearning` points at, so the
 *    hero card and the expanded module always agree;
 * 3. otherwise the first published module in course order, which is also where
 *    rule 2 lands with no prior activity — the empty state needs no special
 *    case.
 *
 * Presentation state only: the caller seeds local React state with it and
 * never persists the result.
 */
export function defaultExpandedModuleId(progress: Progress): string | null {
  const firstPublished = MODULES.find((m) => m.status === 'published');
  if (!firstPublished) return null;

  const lastLessonId = progress.learn?.lastLessonId;
  if (lastLessonId !== undefined) {
    const last = publishedLessons().find((l) => l.id === lastLessonId);
    if (last) return last.moduleId;
  }

  const target = continueLearning(progress);
  if (target?.kind === 'lesson') return target.lesson.moduleId;
  return firstPublished.id;
}

/** The three Learn labels, matching the readiness vocabulary in `shared.tsx`. */
export function lessonStateLabel(state: LessonState | undefined): string {
  if (state === 'completed') return 'Completed';
  if (state === 'in-progress') return 'In progress';
  return 'Not started';
}

/**
 * Follows the same `chip chip-<label>` convention as `readinessChipClass`,
 * except that "Completed" reuses the existing `.chip-solid` swatch rather than
 * adding a fourth chip style for the same "you are done here" meaning.
 */
export function lessonChipClass(state: LessonState | undefined): string {
  if (state === 'completed') return 'chip chip-solid';
  if (state === 'in-progress') return 'chip chip-in-progress';
  return 'chip chip-not-started';
}
