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
  'cruising-life-safety-responsibility-aboard': [
    'sea-resp-skipper-authority',
    'sea-resp-crew-briefing',
    'sea-resp-situational-awareness',
    'sea-resp-delegation',
  ],
  'cruising-life-safety-staying-on-the-boat': [
    'safety-pfd-type-id',
    'safety-pfd-fit-check',
    'safety-pfd-stowage-accessible',
    'safety-pfd-child',
    'safety-pfd-inflatable-maintenance',
    'safety-harness-id',
    'safety-harness-when-clip',
    'safety-harness-clip-point',
  ],
  'cruising-life-safety-safety-gear': [
    'safety-req-pfd-count',
    'safety-req-throwable-length',
    'safety-req-visual-distress-coastal',
    'safety-req-visual-distress-inland-under16',
    'safety-req-sound-device',
    'safety-req-fire-extinguisher-condition',
    'safety-req-nav-lights-general',
    'safety-prudent-first-aid-kit',
    'safety-prudent-flashlight-handheld',
    'safety-prudent-vhf-handheld-backup',
    'safety-prudent-tool-spares',
  ],
  'cruising-life-safety-living-aboard-resources': [
    'safety-stow-heavy-gear-low',
    'safety-stow-loose-gear-underway',
    'safety-stow-galley-items-passage',
  ],
  'cruising-life-safety-power-fuel-hazards': [
    'safety-fuel-spill-response',
    'safety-fuel-vapor-density',
  ],
  'cruising-life-safety-when-things-go-wrong': [
    'sea-vhf-ch16',
    'sea-vhf-distress-mayday',
    'emer-fire-classes-onboard',
    'emer-fire-extinguisher-class-b',
    'emer-fire-engine-compartment-response',
    'emer-fire-galley-priorities',
    'emer-fire-fuel-vapor-prevention',
    'emer-fire-immediate-priorities',
    'emer-flooding-seacock-response',
    'emer-flooding-recognize-priority',
    'emer-vhf-distress-mayday',
    'emer-crew-injury-priorities',
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
    //
    // Rolled a third time, deliberately: `safety-pfd-child` taught that federal
    // law contributes only carriage ("one appropriately sized wearable PFD per
    // person aboard") and that child *wear* rules are a state layer on top of
    // it. 33 CFR 175.15(c) is itself a federal wear requirement — no one may
    // operate a recreational vessel under way with a child under 13 aboard
    // unless that child is wearing an approved PFD or is below decks / in an
    // enclosed cabin — and under 33 CFR 175.25 a state's own child wear age
    // applies on its waters *instead of* the federal rule rather than in
    // addition to it. The prompt no longer frames the answer as prudent
    // practice, correct choice `a` now states the federal rule and the state
    // supersession, the `whyWrong` on `b` and `d` were made consistent with it,
    // and the explanation and source were rewritten. `correctChoiceId` is
    // unchanged and no other question was touched; `content.test.ts` pins the
    // corrected wording. Any other change to this digest is a question-bank
    // edit that was not approved.
    expect(digest).toBe('fd3b50a7c8f541e3129b704bfdbb7e13a3ecb69586a09d016a68bd979bc1106f');
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

  it('carries concept metadata on exactly 218 questions across the whole bank', () => {
    // 158 before Boat & Cruising Basics, plus the 24 previously untagged
    // `cruising-systems` questions its six lessons claim, plus Cruising Life &
    // Safety Step 1. That module claims 40 questions, but four of them were
    // already tagged — `sea-resp-crew-briefing` reuses the existing
    // `crew-briefing` concept unchanged, and the three fuel-vapour questions
    // keep their Motoring `fueling-safety`/`blower-ventilation` tags and gain
    // a second concept — so only 36 previously untagged questions became
    // tagged. Additive metadata only, with no question content touched.
    expect(QUESTIONS.filter((question) => question.concepts?.length)).toHaveLength(218);
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
  /**
   * Cruising Life & Safety, Step 1. The literal id lists above are the
   * contract; these are the session sizes a learner actually sees behind
   * "Practice this material" on each of the six lessons, taken from the app's
   * own resolver rather than counted by hand.
   */
  it('resolves a pinned Practice count for every Cruising Life & Safety lesson', () => {
    const counts = lessonsForModule('cruising-life-safety').map((lesson) => [
      lesson.id,
      practiceIdsForConcepts(lesson.concepts).length,
    ]);
    expect(counts).toEqual([
      ['cruising-life-safety-responsibility-aboard', 4],
      ['cruising-life-safety-staying-on-the-boat', 8],
      ['cruising-life-safety-safety-gear', 11],
      ['cruising-life-safety-living-aboard-resources', 3],
      ['cruising-life-safety-power-fuel-hazards', 2],
      ['cruising-life-safety-when-things-go-wrong', 12],
    ]);
    // Every lesson resolves to a real session: none of the six is a dead
    // "Practice this material" button.
    expect(counts.every(([, count]) => (count as number) > 0)).toBe(true);
  });

  /**
   * The module claims 40 distinct questions and practises none of them twice.
   * Lesson 1 and lesson 6 each carry more than one concept, so this is the
   * guard that a multi-concept lesson resolves to the union of its concepts
   * exactly once each, and that no question is served by two lessons of the
   * same module.
   */
  it('claims exactly 40 distinct questions across Cruising Life & Safety', () => {
    const lessons = lessonsForModule('cruising-life-safety');
    const ids = lessons.flatMap((lesson) => practiceIdsForConcepts(lesson.concepts));
    expect(ids).toHaveLength(40);
    expect(new Set(ids).size).toBe(40);
  });

  /**
   * The module boundary, enforced from the question side. Crew overboard,
   * hypothermia, grounding, a dragging anchor, steering and prop failures
   * belong to Hands-On Cruising; rigging failure, knots and routine radio
   * etiquette to Seamanship; fuelling and blower procedure to Motoring. Engine
   * failure is deliberately still unassigned. None of them may be pulled into
   * a Cruising Life & Safety session.
   */
  it('leaves reserved Hands-On, Seamanship and Motoring questions out of the module', () => {
    const moduleConcepts = new Set<ConceptId>(
      lessonsForModule('cruising-life-safety').flatMap((lesson) => lesson.concepts),
    );
    const claimed = new Set(practiceIdsForConcepts([...moduleConcepts]));
    const reserved = QUESTIONS.filter(
      (question) =>
        /^emer-(mob|hypothermia|grounding|anchor-dragging|steering-failure|fouled-prop|rigging-failure|engine-failure)/.test(
          question.id,
        ) || /^sea-(knot-|vhf-concise-comms|vhf-working-channel-switch)/.test(question.id),
    );
    expect(reserved.length).toBeGreaterThan(0);
    for (const question of reserved) {
      expect(claimed, `${question.id} claimed by Cruising Life & Safety`).not.toContain(question.id);
    }
    // The three Motoring fuelling/blower questions this module must not claim
    // keep exactly the concepts they already had.
    for (const id of ['safety-fuel-gas-diesel-diagram', 'safety-fuel-blower-purpose', 'safety-fuel-shutdown-before']) {
      const question = QUESTIONS.find((item) => item.id === id);
      expect(question, `missing question ${id}`).toBeDefined();
      expect(claimed, `${id} claimed by Cruising Life & Safety`).not.toContain(id);
    }
    // `stowage` and the Boat Basics system concepts stayed out of the module's
    // tags: reusing them would have dragged their questions in with them.
    for (const concept of ['stowage', 'dc-electrical-system', 'bilge-and-pumps', 'through-hulls-and-seacocks', 'fueling-safety', 'blower-ventilation']) {
      expect([...moduleConcepts], `${concept} tagged on a Cruising Life & Safety lesson`).not.toContain(concept);
    }
  });
});
