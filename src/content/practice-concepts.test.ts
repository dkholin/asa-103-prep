import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { CONCEPT_IDS, type ConceptId } from './concepts';
import { LESSONS, MODULES } from './learn';
import { practiceIdsForConcepts } from './practice-concepts';
import { QUESTIONS } from './questions';

const EXPECTED_BY_LESSON: Record<string, string[]> = {
  'motoring-before-getting-under-way': [
    'sea-resp-crew-briefing',
    'sea-departure-checklist',
    'sea-departure-lines-fenders',
  ],
  'motoring-engine-basics-prestart': [
    'safety-fuel-gas-diesel-diagram',
    'safety-fuel-blower-purpose',
    'safety-fuel-vapor-density',
    'eng-auxiliary-engine-types',
    'eng-prestart-compartment-inspect',
    'eng-prestart-fluids-check',
    'eng-prestart-ventilation-blower',
    'eng-prestart-transmission-neutral',
    'eng-prestart-cooling-water-check',
    'eng-start-procedure-order',
    'emer-fire-fuel-vapor-prevention',
  ],
  'motoring-controls-instruments': ['eng-control-panel-id'],
  'motoring-propeller-effects': [
    'eng-prop-walk-id',
    'eng-prop-wash-rudder',
    'eng-prop-forward-vs-reverse-response',
    'eng-prop-walk-use-docking',
  ],
  'motoring-maneuvering-under-power': [
    'eng-stopping-distance-momentum',
    'eng-backing-steerage-way',
    'eng-turning-short-radius-technique',
    'eng-pivot-point-location',
  ],
  'motoring-docking-mooring': [
    'eng-dock-wind-onto-approach',
    'eng-dock-wind-off-approach',
    'eng-dock-current-parallel-approach',
    'eng-dock-strongest-force-priority',
    'eng-dock-spring-line-use',
    'eng-dock-abort-goaround',
    'eng-mooring-approach-id',
    'eng-mooring-speed-control',
    'eng-mooring-pendant-pickup',
  ],
  'motoring-outboards-fueling-etiquette': [
    'safety-fuel-gas-diesel-diagram',
    'safety-fuel-shutdown-before',
    'safety-fuel-spill-response',
    'safety-fuel-vapor-density',
    'eng-auxiliary-engine-types',
    'emer-fire-fuel-vapor-prevention',
  ],
  'sails-trim-lines-winches-sail-controls': [
    'sail-trim-traveler-concept',
    'sea-line-hand-wraps',
    'sea-line-winch-turns',
    'sea-line-load-awareness',
    'sea-line-standing-clear',
  ],
  'sails-trim-preparing-to-sail': [
    'sea-resp-crew-briefing',
    'sea-departure-checklist',
  ],
  'sails-trim-setting-sail': ['sea-departure-lines-fenders'],
  'sails-trim-sail-trim-fundamentals': [
    'sail-trim-heel-diagram',
    'sail-trim-easing-sheet',
    'sail-trim-balance-helm',
    'sail-trim-heel-safety',
  ],
  'sails-trim-trim-by-point-of-sail': [],
  'sails-trim-reefing-reducing-sail': [
    'wx-interp-gusts-sustained',
    'wx-interp-wind-vs-forecast-mismatch',
    'wx-interp-sea-state-diagram',
    'sail-select-light-air',
    'sail-select-moderate',
    'sail-select-increasing-early',
    'sail-select-signs-to-reduce',
    'sail-select-visual-diagram',
    'sail-select-genoa-vs-jib',
    'sail-select-combo-heavy',
    'sail-select-conservative-principle',
    'sail-furl-photo-id',
    'sail-furl-shape-change',
    'sail-furl-when-to-use',
    'sail-furl-limitations',
    'sail-furl-load-control',
    'sail-reef-when-why',
    'sail-reef-effect-heel',
    'sail-reef-diagram',
    'sail-reef-sequence-concept',
    'sail-reef-early-principle',
  ],
  'sails-trim-special-situations': [
    'rules-motorsailing',
    'sail-heave-purpose',
    'sail-heave-diagram',
    'sail-heave-behavior',
    'sail-heave-when-useful',
    'sail-heave-setup-concept',
  ],
};

describe('concept Practice mapping', () => {
  it('resolves each published lesson to its exact literal question mapping', () => {
    const published = new Set(MODULES.filter((module) => module.status === 'published').map((module) => module.id));
    for (const lesson of LESSONS.filter((item) => published.has(item.moduleId))) {
      const ids = practiceIdsForConcepts(lesson.concepts);
      expect(ids, lesson.id).toEqual(EXPECTED_BY_LESSON[lesson.id]);
    }
  });

  it('has no topic fallback and never duplicates a multi-concept match', () => {
    expect(practiceIdsForConcepts([])).toEqual([]);
    expect(practiceIdsForConcepts(['engine-instruments'])).toEqual([]);
    expect(practiceIdsForConcepts(['prop-walk', 'prop-wash', 'prop-walk'])).toEqual([
      'eng-prop-walk-id',
      'eng-prop-wash-rudder',
      'eng-prop-forward-vs-reverse-response',
      'eng-prop-walk-use-docking',
    ]);
  });

  it('uses only canonical concepts and leaves no dead canonical id', () => {
    const canonical = new Set<string>(CONCEPT_IDS);
    const referenced = new Set<ConceptId>();
    for (const lesson of LESSONS) for (const concept of lesson.concepts) referenced.add(concept);
    for (const question of QUESTIONS) {
      for (const concept of question.concepts ?? []) {
        expect(canonical, `${question.id} references ${concept}`).toContain(concept);
        referenced.add(concept);
      }
    }
    expect([...referenced].sort()).toEqual([...CONCEPT_IDS].sort());
  });

  it('keeps all pre-Step-3 question content byte-stable after removing concepts', () => {
    const stripped = QUESTIONS.map(({ concepts: _concepts, ...question }) => question);
    const digest = createHash('sha256').update(JSON.stringify(stripped)).digest('hex');
    expect(digest).toBe('fd86aaa573af75dc5a9bb56656d59ca91e3cde3ed848a0b2c6f0ac6eea2f2280');
  });

  it('adds concept metadata to exactly 36 questions for Sails & Trim', () => {
    const sailsConcepts = new Set<ConceptId>([
      'line-handling-safety',
      'sail-control-equipment',
      'sail-trim-response',
      'sail-area-selection',
      'roller-furling',
      'reefing',
      'heaving-to',
      'motorsailing',
    ]);
    expect(
      QUESTIONS.filter((question) =>
        question.concepts?.some((concept) => sailsConcepts.has(concept)),
      ),
    ).toHaveLength(36);
    expect(QUESTIONS.filter((question) => question.concepts?.length)).toHaveLength(70);
  });
});
