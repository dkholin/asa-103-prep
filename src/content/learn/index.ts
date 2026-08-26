import { MODULES } from './modules';
import type { Lesson, LearnModule } from './types';
import { lesson as beforeGettingUnderWay } from './motoring/before-getting-under-way';
import { lesson as engineBasicsPrestart } from './motoring/engine-basics-prestart';
import { lesson as controlsInstruments } from './motoring/controls-instruments';
import { lesson as propellerEffects } from './motoring/propeller-effects';
import { lesson as maneuveringUnderPower } from './motoring/maneuvering-under-power';
import { lesson as dockingMooring } from './motoring/docking-mooring';
import { lesson as outboardsFuelingEtiquette } from './motoring/outboards-fueling-etiquette';
import { lesson as linesWinchesSailControls } from './sails-trim/lines-winches-sail-controls';
import { lesson as preparingToSail } from './sails-trim/preparing-to-sail';
import { lesson as settingSail } from './sails-trim/setting-sail';
import { lesson as sailTrimFundamentals } from './sails-trim/sail-trim-fundamentals';
import { lesson as trimByPointOfSail } from './sails-trim/trim-by-point-of-sail';
import { lesson as reefingReducingSail } from './sails-trim/reefing-reducing-sail';
import { lesson as specialSituations } from './sails-trim/special-situations';
import { lesson as lookoutRiskSafeSpeed } from './navigation-rules-tools/lookout-risk-safe-speed';
import { lesson as meetingSituations } from './navigation-rules-tools/meeting-situations';
import { lesson as sailingVesselsSpecialRules } from './navigation-rules-tools/sailing-vessels-special-rules';
import { lesson as navigationLights } from './navigation-rules-tools/navigation-lights';
import { lesson as reducedVisibilitySoundSignals } from './navigation-rules-tools/reduced-visibility-sound-signals';
import { lesson as aidsToNavigation } from './navigation-rules-tools/aids-to-navigation';
import { lesson as readingAChart } from './navigation-rules-tools/reading-a-chart';
import { lesson as compassCoursesBearings } from './navigation-rules-tools/compass-courses-bearings';
import { lesson as distanceSpeedTimeElectronics } from './navigation-rules-tools/distance-speed-time-electronics';

export type { Block, Lesson, LearnModule } from './types';
export { MODULES } from './modules';

/**
 * Every lesson in the course. Adding a lesson is one new content file plus one
 * line here — no application logic changes. Module grouping and ordering are
 * derived from `moduleId`/`order` rather than from this array's order, so a
 * mistake here shows up as a test failure, not as a silently reordered course.
 */
export const LESSONS: Lesson[] = [
  beforeGettingUnderWay,
  engineBasicsPrestart,
  controlsInstruments,
  propellerEffects,
  maneuveringUnderPower,
  dockingMooring,
  outboardsFuelingEtiquette,
  linesWinchesSailControls,
  preparingToSail,
  settingSail,
  sailTrimFundamentals,
  trimByPointOfSail,
  reefingReducingSail,
  specialSituations,
  lookoutRiskSafeSpeed,
  meetingSituations,
  sailingVesselsSpecialRules,
  navigationLights,
  reducedVisibilitySoundSignals,
  aidsToNavigation,
  readingAChart,
  compassCoursesBearings,
  distanceSpeedTimeElectronics,
];

const byId = new Map(LESSONS.map((l) => [l.id, l]));

export function lessonById(id: string): Lesson | undefined {
  return byId.get(id);
}

export function moduleById(id: string): LearnModule | undefined {
  return MODULES.find((m) => m.id === id);
}

/** The module's lessons in study order. */
export function lessonsForModule(moduleId: string): Lesson[] {
  return LESSONS.filter((l) => l.moduleId === moduleId).sort((a, b) => a.order - b.order);
}

/** The lessons either side of `id` within its own module, for prev/next. */
export function neighbours(id: string): { previous?: Lesson; next?: Lesson; index: number; total: number } {
  const lesson = byId.get(id);
  if (!lesson) return { index: -1, total: 0 };
  const siblings = lessonsForModule(lesson.moduleId);
  const index = siblings.findIndex((l) => l.id === id);
  return {
    previous: index > 0 ? siblings[index - 1] : undefined,
    next: index < siblings.length - 1 ? siblings[index + 1] : undefined,
    index,
    total: siblings.length,
  };
}
