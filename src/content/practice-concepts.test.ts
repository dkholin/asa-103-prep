import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { CONCEPT_IDS, type ConceptId } from './concepts';
import { LESSONS, MODULES, lessonsForModule } from './learn';
import { practiceIdsForConcepts } from './practice-concepts';
import { QUESTIONS } from './questions';

const EXPECTED_BY_LESSON: Record<string, string[]> = {
  'boat-cruising-basics-anatomy-of-a-cruising-boat': ['sys-transom-defn'],
  'boat-cruising-basics-cockpit-and-helm': ['sys-cockpit-locker-use'],
  'boat-cruising-basics-a-tour-of-the-deck': [
    'sys-turnbuckle-id',
    'sys-turnbuckle-function',
    'sys-chainplate-id',
    'sys-chainplate-function',
    'sys-stemhead-id',
  ],
  'boat-cruising-basics-steering-and-rudder': [
    'sys-rudder-post-location',
    'sys-binnacle-compass-id',
    'sys-emergency-tiller-id',
    'sys-emergency-tiller-when',
  ],
  'boat-cruising-basics-belowdecks-layout': [
    'sys-companionway-defn',
    'sys-saloon-location',
    'sys-galley-defn',
    'sys-vberth-location',
    'sys-bilge-defn',
    'sys-hatches-function',
  ],
  'boat-cruising-basics-onboard-systems-orientation': [
    'sys-bilge-pump-id',
    'sys-bilge-pump-function',
    'sys-seacock-id',
    'sys-seacock-hose-failure-reasoning',
    'sys-through-hull-defn',
    'sys-battery-basics',
    'sys-electrical-panel-basics',
  ],
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
  'navigation-rules-tools-lookout-risk-safe-speed': [
    'rule6-safe-speed-factors',
    'rule6-safe-speed-radar',
    'rule7-risk-bearing',
    'rule7-scanty-information',
    'rule8-early-substantial',
    'rule8-substantial-alterations',
    'rule8-slacken-stop-reverse',
    'rules-give-way-early',
    'rules-standon-may-act-no-port',
    'rules-standon-must-act',
    'rules-standon-duty-not-relieved',
  ],
  'navigation-rules-tools-meeting-situations': [
    'rules-crossing-power',
    'rules-overtaking',
    'rules-overtaking-defn-angle',
    'rules-overtaking-doubt',
    'rules-overtaking-duty-persists',
    'rules-headon-defn',
    'rules-headon-doubt',
    'rules-headon-standon',
    'rules-headon-sail-not-power',
    'rules-crossing-standon',
    'rules-crossing-power-only',
    'rules-crossing-astern-rationale',
  ],
  'navigation-rules-tools-sailing-vessels-special-rules': [
    'rules-sail-opposite-tacks',
    'rules-sail-same-tack',
    'rules-sail-uncertain-tack',
    'rules-sail-windward-defn',
    'rules-sail-give-way-exceptions',
    'rules-sail-same-tack-text',
    'rules-motorsailing',
    'rules-pecking-order',
  ],
  'navigation-rules-tools-navigation-lights': [
    'lights-power-underway',
    'lights-sail-underway',
    'lights-anchored',
    'lights-trawling',
    'lights-id-green-only',
    'lights-id-headon-night',
    'lights-two-masthead-50m',
    'lights-nuc',
    'lights-ram',
  ],
  'navigation-rules-tools-reduced-visibility-sound-signals': [
    'sound-one-short',
    'sound-five-short',
    'sound-fog-power-making-way',
    'rule19-avoid-alter-port-forward',
    'rule19-safe-speed-fog',
    'rule19-fog-signal-forward',
    'wx-interp-visibility-change',
  ],
  'navigation-rules-tools-aids-to-navigation': [
    'chart-nav-sym-buoy-beacon-default',
    'chart-nav-aton-lateral-colors',
    'chart-nav-aton-numbering',
    'chart-nav-aton-red-right-returning',
    'chart-nav-aton-preferred-channel',
    'chart-nav-aton-daymark-shapes',
    'chart-nav-aton-light-quick',
    'chart-nav-aton-light-occulting',
    'chart-nav-aton-beacon-vs-buoy',
  ],
  'navigation-rules-tools-reading-a-chart': [
    'chart-nav-tools-chart-parts',
    'chart-nav-sym-danger-line',
    'chart-nav-sym-wk-abbrev',
    'chart-nav-sym-rk-abbrev',
    'chart-nav-sym-obstn-abbrev',
    'chart-nav-sym-foul-ground',
    'chart-nav-sym-wreck-known-depth',
    'chart-nav-sym-wreck-unknown-depth',
    'chart-nav-sym-chart-datum-abbrev',
    'chart-nav-sound-true-position',
    'chart-nav-sound-out-of-position',
    'chart-nav-sound-least-depth-channel',
    'chart-nav-sound-depth-contour-shading',
    'chart-nav-sound-bottom-abbrev',
    'chart-nav-sound-isolated-danger',
    'chart-nav-sound-rock-awash',
    'chart-nav-latlong-reading',
    'chart-nav-latlong-dms-format',
    'chart-nav-latlong-equator',
    'chart-nav-latlong-prime-meridian',
  ],
  'navigation-rules-tools-compass-courses-bearings': [
    'chart-nav-tools-dividers',
    'chart-nav-tools-parallel-rules',
    'chart-nav-tools-compass-rose-rings',
    'chart-nav-compass-true-vs-magnetic',
    'chart-nav-compass-variation-defn',
    'chart-nav-compass-apply-variation',
    'chart-nav-compass-deviation-vs-variation',
    'chart-nav-compass-interference-sources',
    'chart-nav-compass-interference-siting',
  ],
  'navigation-rules-tools-distance-speed-time-electronics': [
    'chart-nav-latlong-minute-equals-nm',
    'chart-nav-distance-latitude-scale',
    'chart-nav-distance-nm-length',
    'chart-nav-distance-dividers-method',
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
    // Rolled once, deliberately: the malformed correct answer on
    // `chart-nav-compass-apply-variation` ("About 3°N/A") was corrected to
    // "About 3°11'W" to agree with its own explanation. Any other change to
    // this digest is a question-bank edit that was not approved.
    //
    // Rolled a second time, deliberately: `chart-nav-aton-preferred-channel`
    // marked choice `a` correct, asserting that a red-topped preferred-channel
    // mark puts the preferred channel to starboard. Under 33 CFR 62.25(c) and
    // NOAA Chart No. 1 Appendix 1 (this project's own `noaa-iala-region-b`
    // asset, which labels red-over-green "Preferred Channel to Port"), red on
    // top means the mark is a starboard-hand mark kept to starboard, so the
    // preferred channel lies to PORT of it. `correctChoiceId` moved to `b`,
    // `b` gained the mark-handling clause, `a` gained a `whyWrong` defusing the
    // compound-statement trap, and the explanation was updated to agree. Any
    // other change to this digest is a question-bank edit that was not approved.
    expect(digest).toBe('bddc31c3403161b945d2436fb690decbc44e27237370be76acd4c11d7d2725cd');
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
  });

  it('carries concept metadata on exactly 182 questions across the whole bank', () => {
    // 158 before Boat & Cruising Basics, plus the 24 previously untagged
    // `cruising-systems` questions its six lessons claim — additive metadata
    // only, with no question content touched.
    expect(QUESTIONS.filter((question) => question.concepts?.length)).toHaveLength(182);
  });

  /**
   * The six Boat & Cruising Basics lessons, pinned the same way Navigation
   * Rules & Tools is: the literal id lists above are the contract, and these
   * are the session sizes a learner actually sees behind "Practice this
   * material".
   */
  it('resolves a pinned Practice count for every Boat & Cruising Basics lesson', () => {
    const counts = lessonsForModule('boat-cruising-basics').map((lesson) => [
      lesson.id,
      practiceIdsForConcepts(lesson.concepts).length,
    ]);
    expect(counts).toEqual([
      ['boat-cruising-basics-anatomy-of-a-cruising-boat', 1],
      ['boat-cruising-basics-cockpit-and-helm', 1],
      ['boat-cruising-basics-a-tour-of-the-deck', 5],
      ['boat-cruising-basics-steering-and-rudder', 4],
      ['boat-cruising-basics-belowdecks-layout', 6],
      ['boat-cruising-basics-onboard-systems-orientation', 7],
    ]);
    expect(counts.every(([, count]) => (count as number) > 0)).toBe(true);
  });

  /**
   * The module's three-concept lesson resolves to the union of its concepts
   * exactly once each, and the module as a whole claims 24 distinct questions
   * — no question is practised twice within the module.
   */
  it('claims exactly 24 distinct questions across Boat & Cruising Basics', () => {
    const lessons = lessonsForModule('boat-cruising-basics');
    const ids = lessons.flatMap((lesson) => practiceIdsForConcepts(lesson.concepts));
    expect(ids).toHaveLength(24);
    expect(new Set(ids).size).toBe(24);
  });

  /**
   * Neighbouring material that deliberately stayed unclaimed in Step 1:
   * anchoring hardware belongs to Hands-On Cruising, the compass questions to
   * Navigation subject matter, and steering-failure response to Cruising Life
   * & Safety. A later module claims them; Boat Basics must not.
   */
  it('leaves adjacent Hands-On, Navigation and emergency questions unclaimed', () => {
    const boatConcepts = new Set<ConceptId>(
      lessonsForModule('boat-cruising-basics').flatMap((lesson) => lesson.concepts),
    );
    const claimed = new Set(practiceIdsForConcepts([...boatConcepts]));
    for (const id of [
      'sys-windlass-id',
      'sys-windlass-function',
      'sys-ground-tackle-defn',
      'sys-compass-purpose',
      'sys-compass-interference-note',
      'emer-steering-failure-response',
    ]) {
      const question = QUESTIONS.find((item) => item.id === id);
      expect(question, `missing question ${id}`).toBeDefined();
      expect(question?.concepts ?? [], `${id} gained concepts`).toEqual([]);
      expect(claimed, `${id} claimed by Boat & Cruising Basics`).not.toContain(id);
    }
  });

  /**
   * The literal mapping above is the contract; this pins the number a learner
   * actually sees on each Navigation Rules & Tools lesson's "Practice this
   * material" session, so a concept retag cannot quietly change the size of a
   * session while the id list is being edited.
   */
  it('resolves a pinned Practice count for every Navigation Rules & Tools lesson', () => {
    const counts = lessonsForModule('navigation-rules-tools').map((lesson) => [
      lesson.id,
      practiceIdsForConcepts(lesson.concepts).length,
    ]);
    expect(counts).toEqual([
      ['navigation-rules-tools-lookout-risk-safe-speed', 11],
      ['navigation-rules-tools-meeting-situations', 12],
      ['navigation-rules-tools-sailing-vessels-special-rules', 8],
      ['navigation-rules-tools-navigation-lights', 9],
      ['navigation-rules-tools-reduced-visibility-sound-signals', 7],
      ['navigation-rules-tools-aids-to-navigation', 9],
      ['navigation-rules-tools-reading-a-chart', 20],
      ['navigation-rules-tools-compass-courses-bearings', 9],
      ['navigation-rules-tools-distance-speed-time-electronics', 4],
    ]);
    // Every lesson resolves to a real session: none of the nine is a dead
    // "Practice this material" button.
    expect(counts.every(([, count]) => (count as number) > 0)).toBe(true);
  });
});
