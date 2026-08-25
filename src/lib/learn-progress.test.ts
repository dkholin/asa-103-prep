import { describe, expect, it } from 'vitest';
import { MODULES, lessonsForModule } from '../content/learn';
import {
  continueLearning,
  defaultExpandedModuleId,
  lessonChipClass,
  lessonStateLabel,
  moduleLessonProgress,
  publishedLessons,
} from './learn-progress';
import {
  emptyProgress,
  markLessonCompleted,
  markLessonOpened,
  type Progress,
} from './progress';

const MOTORING = lessonsForModule('motoring');
const SAILS_TRIM = lessonsForModule('sails-trim');
const completeAll = (p: Progress) =>
  publishedLessons().reduce((acc, l) => markLessonCompleted(markLessonOpened(acc, l.id), l.id), p);
const completeMotoring = (p: Progress) =>
  MOTORING.reduce((acc, l) => markLessonCompleted(markLessonOpened(acc, l.id), l.id), p);

describe('published lesson catalogue', () => {
  it('contains only lessons from published modules', () => {
    const published = new Set(MODULES.filter((m) => m.status === 'published').map((m) => m.id));
    expect(published.size).toBeGreaterThan(0);
    for (const lesson of publishedLessons()) expect(published.has(lesson.moduleId)).toBe(true);
  });

  it('keeps course order within a module', () => {
    expect(publishedLessons().map((l) => l.id)).toEqual(
      [...MOTORING, ...SAILS_TRIM].map((l) => l.id),
    );
  });
});

describe('moduleLessonProgress', () => {
  it('counts completions, not opens', () => {
    let p = markLessonOpened(emptyProgress(), MOTORING[0].id);
    expect(moduleLessonProgress(p, 'motoring')).toEqual({ completed: 0, total: MOTORING.length });
    p = markLessonCompleted(p, MOTORING[0].id);
    expect(moduleLessonProgress(p, 'motoring')).toEqual({ completed: 1, total: MOTORING.length });
  });

  it('reports zero of zero for a coming-soon module', () => {
    expect(moduleLessonProgress(emptyProgress(), 'seamanship')).toEqual({ completed: 0, total: 0 });
  });
});

describe('continueLearning', () => {
  it('starts at the first lesson with no prior activity', () => {
    const target = continueLearning(emptyProgress());
    expect(target).toEqual({ kind: 'lesson', lesson: MOTORING[0], resume: false });
  });

  it('resumes the last opened lesson while it is still in progress', () => {
    const p = markLessonOpened(emptyProgress(), MOTORING[2].id);
    expect(continueLearning(p)).toEqual({ kind: 'lesson', lesson: MOTORING[2], resume: true });
  });

  it('moves on to the first unfinished lesson once the last one is complete', () => {
    let p = markLessonOpened(emptyProgress(), MOTORING[0].id);
    p = markLessonCompleted(p, MOTORING[0].id);
    expect(continueLearning(p)).toEqual({ kind: 'lesson', lesson: MOTORING[1], resume: false });
  });

  it('skips completed lessons when finding the next one', () => {
    let p = emptyProgress();
    for (const lesson of MOTORING.slice(0, 3)) {
      p = markLessonCompleted(markLessonOpened(p, lesson.id), lesson.id);
    }
    // The last open was lesson 3, now complete, so rule 1 does not apply.
    expect(continueLearning(p)).toEqual({ kind: 'lesson', lesson: MOTORING[3], resume: false });
  });

  it('moves from completed Motoring to the first Sails & Trim lesson', () => {
    expect(continueLearning(completeMotoring(emptyProgress()))).toEqual({
      kind: 'lesson',
      lesson: SAILS_TRIM[0],
      resume: false,
    });
  });

  it('resumes an in-progress Sails & Trim lesson', () => {
    const progress = markLessonOpened(emptyProgress(), SAILS_TRIM[3].id);
    expect(continueLearning(progress)).toEqual({
      kind: 'lesson',
      lesson: SAILS_TRIM[3],
      resume: true,
    });
  });

  // Stored state can name a lesson this build no longer ships. Learn must fall
  // through to the sequential rule rather than dead-end on it.
  it('ignores a last lesson id that no longer exists', () => {
    const p: Progress = {
      ...emptyProgress(),
      learn: { lessons: { 'motoring-removed-lesson': 'in-progress' }, lastLessonId: 'motoring-removed-lesson' },
    };
    expect(continueLearning(p)).toEqual({ kind: 'lesson', lesson: MOTORING[0], resume: false });
  });

  // The card and the outline sit on one screen. Offering to "start" a lesson
  // the list below labels "In progress" is a self-contradiction, so `resume`
  // is a fact about the destination, not about which rule selected it.
  it('reports a resume when the first unfinished lesson is itself in progress', () => {
    let p = markLessonOpened(emptyProgress(), MOTORING[0].id);
    p = markLessonCompleted(markLessonOpened(p, MOTORING[2].id), MOTORING[2].id);
    // Rule 1 does not apply: the last-opened lesson is now complete.
    expect(p.learn!.lastLessonId).toBe(MOTORING[2].id);
    // Rule 2 lands back on lesson one, which the outline shows as "In progress".
    expect(continueLearning(p)).toEqual({ kind: 'lesson', lesson: MOTORING[0], resume: true });
  });

  it('never targets a coming-soon module', () => {
    const comingSoon = MODULES.filter((m) => m.status === 'coming-soon').map((m) => m.id);
    const p: Progress = {
      ...emptyProgress(),
      learn: { lessons: { 'seamanship-knots': 'in-progress' }, lastLessonId: 'seamanship-knots' },
    };
    const target = continueLearning(p);
    expect(target?.kind).toBe('lesson');
    expect(comingSoon).not.toContain(
      target?.kind === 'lesson' ? target.lesson.moduleId : undefined,
    );
  });

  it('reports a module-neutral terminal state once every published lesson is done', () => {
    const target = continueLearning(completeAll(emptyProgress()));
    expect(target).toEqual({ kind: 'all-published-complete' });
  });
});

describe('defaultExpandedModuleId', () => {
  const FIRST_PUBLISHED = MODULES.find((m) => m.status === 'published')!;

  it('opens the first published module with no prior activity', () => {
    // Not the first module in `MODULES` — that one is coming-soon.
    expect(FIRST_PUBLISHED.id).toBe('motoring');
    expect(defaultExpandedModuleId(emptyProgress())).toBe('motoring');
  });

  it('opens the module holding the last opened lesson', () => {
    const p = markLessonOpened(emptyProgress(), SAILS_TRIM[2].id);
    expect(defaultExpandedModuleId(p)).toBe('sails-trim');
  });

  // Rule 1 asks only that the lesson resolve, not that it still be unfinished:
  // returning from a lesson must reopen the module it came from even once that
  // lesson is complete, which is where this parts company with
  // `continueLearning`.
  it('keeps the last opened lesson’s module open after that lesson is completed', () => {
    const p = markLessonCompleted(markLessonOpened(emptyProgress(), SAILS_TRIM[0].id), SAILS_TRIM[0].id);
    expect(continueLearning(p)).toMatchObject({ kind: 'lesson', lesson: MOTORING[0] });
    expect(defaultExpandedModuleId(p)).toBe('sails-trim');
  });

  it('falls back to the Continue learning target when the stored id is unknown', () => {
    const p: Progress = {
      ...emptyProgress(),
      learn: {
        lessons: Object.fromEntries(MOTORING.map((l) => [l.id, 'completed' as const])),
        lastLessonId: 'motoring-removed-lesson',
      },
    };
    // Motoring is finished, so Continue learning is in Sails & Trim.
    expect(defaultExpandedModuleId(p)).toBe('sails-trim');
  });

  it('never opens a coming-soon module named by stored state', () => {
    const p: Progress = {
      ...emptyProgress(),
      learn: { lessons: { 'seamanship-knots': 'in-progress' }, lastLessonId: 'seamanship-knots' },
    };
    const opened = defaultExpandedModuleId(p);
    expect(MODULES.find((m) => m.id === opened)?.status).toBe('published');
  });

  it('opens the last lesson’s module once the whole course is complete', () => {
    const p = completeAll(emptyProgress());
    expect(continueLearning(p)).toEqual({ kind: 'all-published-complete' });
    // `completeAll` opens every lesson in course order, so the last one wins.
    expect(defaultExpandedModuleId(p)).toBe(SAILS_TRIM[SAILS_TRIM.length - 1].moduleId);
  });
});

describe('lesson state presentation', () => {
  it('labels the three states', () => {
    expect(lessonStateLabel(undefined)).toBe('Not started');
    expect(lessonStateLabel('in-progress')).toBe('In progress');
    expect(lessonStateLabel('completed')).toBe('Completed');
  });

  it('reuses the existing chip classes rather than inventing new ones', () => {
    expect(lessonChipClass(undefined)).toBe('chip chip-not-started');
    expect(lessonChipClass('in-progress')).toBe('chip chip-in-progress');
    expect(lessonChipClass('completed')).toBe('chip chip-solid');
  });
});
