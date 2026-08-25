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
};

describe('concept Practice mapping', () => {
  it('resolves each published lesson to its exact literal question mapping', () => {
    const published = new Set(MODULES.filter((module) => module.status === 'published').map((module) => module.id));
    for (const lesson of LESSONS.filter((item) => published.has(item.moduleId))) {
      const ids = practiceIdsForConcepts(lesson.concepts);
      expect(ids, lesson.id).toEqual(EXPECTED_BY_LESSON[lesson.id]);
      expect(ids.length, `${lesson.id} has no Practice coverage`).toBeGreaterThan(0);
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

  it('tags exactly the intentionally mapped 34 questions', () => {
    expect(QUESTIONS.filter((question) => question.concepts?.length).length).toBe(34);
  });
});
