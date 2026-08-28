import { describe, expect, it } from 'vitest';
import manifest from '../asset-manifest.json';
import { CONCEPT_IDS } from '../concepts';
import { LESSONS, MODULES, lessonsForModule } from './index';
import type { Block } from './types';

const moduleIds = new Set(MODULES.map((m) => m.id));
const conceptIds = new Set<string>(CONCEPT_IDS);
const assetIds = new Set(manifest.assets.map((a) => a.id));

describe('learn content integrity', () => {
  it('has unique lesson ids', () => {
    const ids = LESSONS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('assigns every lesson to a real module', () => {
    for (const l of LESSONS) {
      expect([...moduleIds], `module of ${l.id}`).toContain(l.moduleId);
    }
  });

  it('gives published modules lessons and coming-soon modules none', () => {
    for (const m of MODULES) {
      const count = lessonsForModule(m.id).length;
      if (m.status === 'published') {
        expect(count, `published module ${m.id} has no lessons`).toBeGreaterThan(0);
      } else {
        expect(count, `coming-soon module ${m.id} has lessons`).toBe(0);
      }
    }
  });

  it('numbers lessons contiguously from 1 within each module', () => {
    for (const m of MODULES) {
      const orders = lessonsForModule(m.id).map((l) => l.order);
      expect(orders, `order values of ${m.id}`).toEqual(orders.map((_, i) => i + 1));
    }
  });

  it('has a non-empty title and intro on every lesson', () => {
    for (const l of LESSONS) {
      expect(l.title.trim(), `title of ${l.id}`).not.toBe('');
      expect(l.intro.trim(), `intro of ${l.id}`).not.toBe('');
    }
  });

  it('locally publishes exactly four finished Seamanship lessons with the frozen ids, titles, order and concepts', () => {
    expect(MODULES.find((module) => module.id === 'seamanship')?.status).toBe('published');
    const lessons = lessonsForModule('seamanship');
    expect(lessons.map(({ id, title, order, concepts }) => ({ id, title, order, concepts }))).toEqual([
      { id: 'seamanship-loops-and-stoppers', title: 'Loops & Stoppers', order: 1, concepts: ['fixed-loops-and-stoppers'] },
      { id: 'seamanship-fastening-and-gripping-hitches', title: 'Fastening & Gripping Hitches', order: 2, concepts: ['fastening-and-gripping-hitches'] },
      { id: 'seamanship-routine-vhf', title: 'Routine VHF Communication', order: 3, concepts: ['routine-vhf-communication'] },
      { id: 'seamanship-rigging-trouble-and-assistance', title: 'Rigging Trouble & Assistance', order: 4, concepts: ['rigging-failure-response'] },
    ]);
    expect(CONCEPT_IDS).toHaveLength(96);
    expect(CONCEPT_IDS.slice(92)).toEqual([
      'fixed-loops-and-stoppers', 'fastening-and-gripping-hitches',
      'routine-vhf-communication', 'rigging-failure-response',
    ]);
    const expectedFigures = [['photo-bowline'], ['photo-rolling-hitch'], [], []];
    for (const [index, lesson] of lessons.entries()) {
      expect(lesson.intro.split(/\s+/).length, lesson.id).toBeGreaterThanOrEqual(20);
      expect(lesson.blocks.length, lesson.id).toBeGreaterThanOrEqual(12);
      const kinds = new Set(lesson.blocks.map((block) => block.kind));
      expect(kinds.size, lesson.id).toBeGreaterThanOrEqual(4);
      expect(kinds.has('list') && kinds.has('callout'), lesson.id).toBe(true);
      expect(lesson.blocks.filter((b) => b.kind === 'figure').map((b) => b.assetId)).toEqual(expectedFigures[index]);
      const prose = JSON.stringify(lesson);
      expect(prose).not.toMatch(/placeholder|skeleton|finished lesson will|tying practice will follow|TODO|TBD/i);
      expect(prose).not.toMatch(/custom-figure8-stopper|custom-round-turn-two-half-hitches/);
      // Catch regression to a skeleton, without imposing the editorial target as a quota.
      const words = lesson.blocks.flatMap((b) => {
        if (b.kind === 'list') return b.items;
        if (b.kind === 'table') return b.rows.flat();
        return 'text' in b ? [b.text] : [];
      }).join(' ').split(/\s+/);
      expect(words.length, lesson.id).toBeGreaterThan(350);
      expect(prose).not.toMatch(/wx-|barometer|forecast|cold front|cloud formation|MAYDAY|PAN.PAN|press.{0,30}distress/i);
      expect(prose).not.toMatch(/springing off|quick.stop maneuver|kedging|emergency tiller|prop walk|chainplate identification|turnbuckle identification/i);
    }

  });

  it('keeps finished Motoring copy substantial and free of placeholders', () => {
    for (const l of lessonsForModule('motoring')) {
      const serialized = JSON.stringify(l);
      expect(serialized, `placeholder copy in ${l.id}`).not.toMatch(/placeholder/i);
      expect(l.blocks.length, `thin lesson ${l.id}`).toBeGreaterThanOrEqual(6);
    }
  });

  /**
   * Boat & Cruising Basics is finished as of Step 2. Step 1's version of this
   * guard deliberately tolerated placeholder copy and asserted the module
   * shipped no figures; both allowances are gone. What is pinned now is the
   * same contract the other finished modules carry — ids, order, titles and
   * concept tags, placeholder-free substantial copy, and the exact list of
   * reused manifest figures in document order, so a new asset has to arrive
   * with a deliberate edit here rather than slipping in unreviewed.
   *
   * The block-count floor is 12 rather than the 6–7 used above because this is
   * a vocabulary module: its lessons are built from many short definition,
   * list and table blocks rather than a few long ones. It sits below the
   * current minimum (15) with room to spare, so an editorial trim does not
   * break the build — the job is to catch a lesson gutted back to a skeleton,
   * not to force any particular length.
   */
  it('publishes six finished Boat & Cruising Basics lessons in order, tagged and using only approved figures', () => {
    const module = MODULES.find((item) => item.id === 'boat-cruising-basics');
    expect(module?.status).toBe('published');
    const lessons = lessonsForModule('boat-cruising-basics');
    expect(lessons).toHaveLength(6);
    expect(lessons.map((lesson) => lesson.id)).toEqual([
      'boat-cruising-basics-anatomy-of-a-cruising-boat',
      'boat-cruising-basics-cockpit-and-helm',
      'boat-cruising-basics-a-tour-of-the-deck',
      'boat-cruising-basics-steering-and-rudder',
      'boat-cruising-basics-belowdecks-layout',
      'boat-cruising-basics-onboard-systems-orientation',
    ]);
    expect(lessons.map((lesson) => lesson.title)).toEqual([
      'Anatomy of a Cruising Boat',
      'The Cockpit & Helm',
      'A Tour of the Deck',
      'Steering & the Rudder',
      'Belowdecks: Living Space & Layout',
      'Onboard Systems at a Glance',
    ]);
    expect(lessons.map((lesson) => lesson.order)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(lessons.map((lesson) => lesson.concepts)).toEqual([
      ['boat-anatomy-and-terms'],
      ['cockpit-layout'],
      ['deck-hardware-and-rigging-attachments'],
      ['steering-systems'],
      ['belowdecks-layout'],
      ['through-hulls-and-seacocks', 'bilge-and-pumps', 'dc-electrical-system'],
    ]);
    for (const lesson of lessons) {
      for (const concept of lesson.concepts) {
        expect([...conceptIds], `concept ${concept} of ${lesson.id}`).toContain(concept);
      }
      expect(JSON.stringify(lesson), `placeholder copy in ${lesson.id}`)
        .not.toMatch(/placeholder|draft lesson|planned coverage|still being drafted|lesson coverage|\bTBD\b/i);
      expect(lesson.blocks.length, `thin lesson ${lesson.id}`).toBeGreaterThanOrEqual(12);
      // A finished lesson opens with a real sentence, not a stub label.
      expect(lesson.intro.trim().split(/\s+/).length, `stub intro on ${lesson.id}`).toBeGreaterThanOrEqual(8);
      // Substantial teaching copy, measured on prose only so the floor cannot
      // be met by piling on list items or table cells.
      const prose = [lesson.intro, ...lesson.blocks.filter((block) => block.kind === 'text').map((block) => block.text)];
      expect(prose.join(' ').split(/\s+/).length, `thin prose in ${lesson.id}`).toBeGreaterThanOrEqual(400);
      // Every lesson teaches with more than running text.
      expect(
        new Set(lesson.blocks.map((block) => block.kind)).size,
        `monotonous block use in ${lesson.id}`,
      ).toBeGreaterThanOrEqual(4);
    }
    // Every figure in the module is an approved manifest asset, pinned here in
    // document order. The three project-original schematics added last carry
    // the spatial teaching the close-ups cannot: the profile in lesson 1, the
    // deck plan in lesson 3, the rudder comparison in lesson 4.
    expect(
      lessons.flatMap((lesson) => lesson.blocks)
        .filter((block) => block.kind === 'figure')
        .map((block) => block.assetId),
    ).toEqual([
      'custom-boat-anatomy-profile',
      'custom-deck-plan-labelled',
      'photo-chainplate',
      'custom-stemhead-bow-roller',
      'custom-binnacle-compass',
      'custom-rudder-types',
      'custom-emergency-tiller',
      'custom-cabin-layout',
      'custom-seacock-throughhull',
      'custom-bilge-pump',
    ]);
    // Each new schematic sits in exactly the lesson whose spatial explanation
    // it illustrates, so a figure cannot silently drift to a neighbour.
    const boatFiguresOf = (order: number) =>
      lessons[order - 1].blocks.filter((block) => block.kind === 'figure').map((block) => block.assetId);
    expect(boatFiguresOf(1)).toEqual(['custom-boat-anatomy-profile']);
    expect(boatFiguresOf(3)[0]).toBe('custom-deck-plan-labelled');
    expect(boatFiguresOf(4)[1]).toBe('custom-rudder-types');
    // Every figure carries a caption: these assets have deliberately
    // answer-neutral alt text for Practice, so Learn supplies the teaching.
    for (const block of lessons.flatMap((lesson) => lesson.blocks)) {
      if (block.kind !== 'figure') continue;
      expect(block.caption?.trim(), `uncaptioned figure ${block.assetId}`).toBeTruthy();
    }
    // Regulatory carriage requirements belong to the future Cruising Life &
    // Safety module, and the source chapter's terminology for them is stale.
    // Deliberately no bare `flare`: the flare of a bow is this module's own
    // hull vocabulary, so only the signalling sense is matched.
    expect(JSON.stringify(lessons), 'deferred safety-regulation material in Boat Basics')
      .not.toMatch(/\bB-I\b|\bB-II\b|extinguisher|distress signal|\bflares\b|life ?jacket|\bPFD\b/i);
    // No concept is tagged on two lessons: practising one lesson never
    // re-serves the neighbour's question set.
    const tagged = lessons.flatMap((lesson) => lesson.concepts);
    expect(new Set(tagged).size).toBe(tagged.length);
  });

  /**
   * Cruising Life & Safety is finished as of Step 2. Step 1's version of this
   * guard deliberately tolerated placeholder copy and asserted the module
   * shipped no figures; both allowances are gone, replaced by the same contract
   * the other finished modules carry — ids, order, titles and concept tags,
   * placeholder-free substantial copy, a prose floor, varied block use, and the
   * exact list of reused manifest figures in document order.
   *
   * Two module-specific assertions sit below the generic ones, because this is
   * the module where getting them wrong is a safety problem rather than an
   * editorial one:
   *
   * - L3 must visibly separate federally required carriage from prudent gear
   *   carried by choice. The guard checks both halves are actually present, so
   *   a rewrite cannot quietly collapse them into one undifferentiated list.
   * - The module must not absorb Hands-On Cruising's boat-handling emergencies.
   *   `practice-concepts.test.ts` already enforces this on the question side;
   *   this is the content side of the same boundary.
   *
   * Note on the last assertion: it pins that no concept repeats *within this
   * module*, so practising one lesson never re-serves a neighbour's set. It is
   * not a general rule — a concept may legitimately be tagged on lessons in
   * different modules, which is how `crew-briefing` reaches both Motoring and
   * lesson 1 here.
   */
  it('publishes six finished Cruising Life & Safety lessons in order, tagged and using only approved figures', () => {
    const module = MODULES.find((item) => item.id === 'cruising-life-safety');
    expect(module?.status).toBe('published');
    const lessons = lessonsForModule('cruising-life-safety');
    expect(lessons).toHaveLength(6);
    expect(lessons.map((lesson) => lesson.id)).toEqual([
      'cruising-life-safety-responsibility-aboard',
      'cruising-life-safety-staying-on-the-boat',
      'cruising-life-safety-safety-gear',
      'cruising-life-safety-living-aboard-resources',
      'cruising-life-safety-power-fuel-hazards',
      'cruising-life-safety-when-things-go-wrong',
    ]);
    expect(lessons.map((lesson) => lesson.title)).toEqual([
      'Who Is Responsible Aboard',
      'Staying On the Boat',
      'Safety Gear: Required & Recommended',
      'Water, Galley & Head',
      'Power, Fuel & Invisible Hazards',
      'Fire, Flooding & Calling for Help',
    ]);
    expect(lessons.map((lesson) => lesson.order)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(lessons.map((lesson) => lesson.concepts)).toEqual([
      ['crew-briefing', 'skipper-and-crew-responsibility'],
      ['personal-on-deck-safety'],
      ['safety-equipment-readiness'],
      ['living-aboard-resources'],
      ['power-and-invisible-hazards'],
      ['fire-and-flooding-response', 'distress-communications', 'crew-injury-response'],
    ]);
    for (const lesson of lessons) {
      for (const concept of lesson.concepts) {
        expect([...conceptIds], `concept ${concept} of ${lesson.id}`).toContain(concept);
      }
      expect(JSON.stringify(lesson), `placeholder copy in ${lesson.id}`)
        .not.toMatch(/placeholder|draft lesson|planned coverage|still being drafted|lesson coverage|\bTBD\b/i);
      // A finished lesson opens with a real sentence, not a stub label.
      expect(lesson.intro.trim().split(/\s+/).length, `stub intro on ${lesson.id}`).toBeGreaterThanOrEqual(8);
      expect(lesson.blocks.length, `thin lesson ${lesson.id}`).toBeGreaterThanOrEqual(12);
      // Substantial teaching copy, measured on prose only so the floor cannot
      // be met by piling on list items or table cells. The floor sits below the
      // shortest finished lesson with room to spare: the job is to catch a
      // lesson gutted back to a skeleton, not to enforce a word count.
      const prose = [lesson.intro, ...lesson.blocks.filter((block) => block.kind === 'text').map((block) => block.text)];
      expect(prose.join(' ').split(/\s+/).length, `thin prose in ${lesson.id}`).toBeGreaterThanOrEqual(400);
      // Every lesson teaches with more than running text.
      expect(
        new Set(lesson.blocks.map((block) => block.kind)).size,
        `monotonous block use in ${lesson.id}`,
      ).toBeGreaterThanOrEqual(4);
    }
    // Every figure in the module is an approved manifest asset that already
    // existed, pinned here in document order — no asset was created for this
    // module, so a new one has to arrive with a deliberate edit here. L1, L4
    // and L5 carry none: nothing in the manifest illustrates responsibility
    // aboard, and the layout and fuelling diagrams that were considered for L4
    // and L5 belong to Boat Basics and Motoring respectively.
    expect(
      lessons.flatMap((lesson) => lesson.blocks)
        .filter((block) => block.kind === 'figure')
        .map((block) => block.assetId),
    ).toEqual([
      'custom-pfd-wearable-throwable',
      'custom-harness-tether-jackline',
      'custom-visual-distress-flare',
      'photo-fire-extinguisher-marine',
      'photo-fire-extinguisher-use',
      'custom-flooding-seacock',
    ]);
    const safetyFiguresOf = (order: number) =>
      lessons[order - 1].blocks.filter((block) => block.kind === 'figure').map((block) => block.assetId);
    expect(safetyFiguresOf(1)).toEqual([]);
    expect(safetyFiguresOf(4)).toEqual([]);
    expect(safetyFiguresOf(5)).toEqual([]);
    // The two extinguisher photographs are deliberately assigned to the lesson
    // that does NOT own them as a question asset, which keeps each figure a
    // step further from the answer of the question it sits beside.
    expect(safetyFiguresOf(3)).toContain('photo-fire-extinguisher-marine');
    expect(safetyFiguresOf(6)[0]).toBe('photo-fire-extinguisher-use');
    // Every figure carries a caption: these assets have deliberately
    // answer-neutral alt text for Practice, so Learn supplies the teaching.
    for (const block of lessons.flatMap((lesson) => lesson.blocks)) {
      if (block.kind !== 'figure') continue;
      expect(block.caption?.trim(), `uncaptioned figure ${block.assetId}`).toBeTruthy();
    }
    // L3's whole reason for existing is that "required" and "recommended" are
    // different lists. Both halves must be visibly present.
    const safetyGear = JSON.stringify(lessons[2]);
    expect(safetyGear, 'L3 lost the federally-required half').toMatch(/federal(ly)? (carriage )?requir/i);
    expect(safetyGear, 'L3 lost the recommended half').toMatch(/recommend|prudent/i);
    expect(safetyGear, 'L3 no longer flags that requirements vary').toMatch(/vary|varies|depends on/i);
    // Hands-On Cruising's boat-handling emergencies are not this module's, and
    // the fire/flooding lesson is where they would most easily creep in.
    //
    // These are named *techniques*, not topics: the module is free — and in the
    // last lesson expected — to say that crew overboard, hypothermia,
    // grounding, a dragging anchor and steering failure belong elsewhere, and
    // to explain that keeping people aboard matters precisely because getting
    // them back is hard. What it must not do is teach the manoeuvres. A recovery
    // method by name is the unambiguous evidence that it has started to.
    expect(JSON.stringify(lessons), 'Hands-On Cruising manoeuvres taught in Cruising Life & Safety')
      .not.toMatch(/quick.stop|figure.eight|quick.turn|lifesling|heaving line to the|kedge|set a second anchor|emergency tiller/i);
    // ...and the deferral itself is pinned, so the boundary is stated to the
    // learner rather than merely observed by this test.
    expect(JSON.stringify(lessons[5]), 'L6 lost its Hands-On Cruising deferral')
      .toMatch(/hands-on cruising/i);
    const tagged = lessons.flatMap((lesson) => lesson.concepts);
    expect(new Set(tagged).size).toBe(tagged.length);
  });

  it('publishes exactly seven finished Sails & Trim lessons using only approved figures', () => {
    const lessons = lessonsForModule('sails-trim');
    expect(lessons).toHaveLength(7);
    for (const lesson of lessons) {
      expect(JSON.stringify(lesson), `placeholder copy in ${lesson.id}`).not.toMatch(/placeholder|lesson coverage/i);
      expect(lesson.blocks.length, `thin lesson ${lesson.id}`).toBeGreaterThanOrEqual(7);
    }
    expect(
      lessons.flatMap((lesson) => lesson.blocks)
        .filter((block) => block.kind === 'figure')
        .map((block) => block.assetId),
    ).toEqual([
      'custom-sail-shape-fundamentals',
      'custom-heel-trim',
      'custom-trim-by-point-of-sail',
      'custom-sail-wind-strength',
      'custom-reefed-mainsail',
      'photo-furled-headsail',
      'custom-heaving-to',
      'custom-lee-shore',
    ]);
  });

  /**
   * Navigation Rules & Tools is finished: nine lessons, their order, their
   * concept tags and their teaching copy. This guard pins the shape so a later
   * edit cannot quietly drop, reorder or retag a lesson, and pins the exact
   * figure list in document order — every figure in this module is a reused,
   * already-approved manifest asset, so a new one has to arrive with a
   * deliberate change here rather than slipping in unreviewed.
   */
  it('publishes nine finished Navigation Rules & Tools lessons in order, tagged and using only approved figures', () => {
    const lessons = lessonsForModule('navigation-rules-tools');
    expect(lessons.map((lesson) => lesson.title)).toEqual([
      'Lookout, Risk & Safe Speed',
      'Meeting Situations: Overtaking, Head-On, Crossing',
      'Sailing Vessels & Special Rules',
      'Navigation Lights',
      'Reduced Visibility & Sound Signals',
      'Aids to Navigation',
      'Reading a Nautical Chart',
      'Compass, Courses & Bearings',
      'Distance, Speed, Time & Electronic Navigation',
    ]);
    expect(lessons.map((lesson) => lesson.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const lesson of lessons) {
      expect(lesson.id, `id prefix of ${lesson.id}`).toMatch(/^navigation-rules-tools-/);
      expect(lesson.concepts.length, `concepts of ${lesson.id}`).toBeGreaterThan(0);
      for (const concept of lesson.concepts) {
        expect([...conceptIds], `concept ${concept} of ${lesson.id}`).toContain(concept);
      }
      expect(JSON.stringify(lesson), `placeholder copy in ${lesson.id}`)
        .not.toMatch(/placeholder|draft lesson|planned coverage|still being drafted/i);
      expect(lesson.blocks.length, `thin lesson ${lesson.id}`).toBeGreaterThanOrEqual(7);
    }
    expect(
      lessons.flatMap((lesson) => lesson.blocks)
        .filter((block) => block.kind === 'figure')
        .map((block) => block.assetId),
    ).toEqual([
      'custom-overtaking',
      'custom-headon-bowview',
      'custom-crossing',
      'custom-crossing-standon',
      'custom-sail-opposite-tacks',
      'custom-sail-same-tack',
      'custom-navigation-light-sectors',
      'custom-night-headon',
      'custom-night-green-only',
      'photo-trawler-gear-out',
      'noaa-buoy-beacon-basic',
      'noaa-iala-region-b',
      'noaa-light-characters',
      'uscg-regulatory-marks',
      'noaa-chart-schematic',
      'custom-lat-long-grid',
      'noaa-soundings-basic',
      'noaa-depth-contours',
      'noaa-wreck-symbols',
      'custom-binnacle-compass',
      'noaa-compass-rose',
      'custom-true-magnetic-compass',
      'custom-compass-interference',
      'photo-plotting-tools',
      'custom-distance-scale',
    ]);
    // Each of the three Step 3 instructional figures sits in exactly one lesson,
    // beside the explanation it illustrates.
    const figuresOf = (order: number) =>
      lessons[order - 1].blocks.filter((block) => block.kind === 'figure').map((block) => block.assetId);
    expect(figuresOf(4)[0]).toBe('custom-navigation-light-sectors');
    expect(figuresOf(6)).toContain('uscg-regulatory-marks');
    expect(figuresOf(8)[2]).toBe('custom-true-magnetic-compass');
    // No concept is tagged on two lessons in this module: a learner who
    // practises a lesson never re-practises the same set from its neighbour.
    const tagged = lessons.flatMap((lesson) => lesson.concepts);
    expect(new Set(tagged).size).toBe(tagged.length);
  });

  /**
   * Hands-On Cruising is finished as of Step 2. Step 1's version of this guard
   * deliberately tolerated placeholder copy, two-block lessons and no figures;
   * all three allowances are gone, and what is pinned now is the same contract
   * the other finished modules carry — ids, order, titles and concept tags,
   * placeholder-free substantial copy, and the exact list of figures in
   * document order so a new asset arrives with a deliberate edit here.
   *
   * The prose floor is 400 words, matching Boat & Cruising Basics. It exists to
   * catch a lesson gutted back to a skeleton, not to force any particular
   * length — the shortest lesson here clears it with room to spare, so an
   * editorial trim does not break the build.
   */
  it('publishes six finished Hands-On Cruising lessons in order, tagged and using only approved figures', () => {
    const module = MODULES.find((item) => item.id === 'hands-on-cruising');
    expect(module?.status).toBe('published');
    const lessons = lessonsForModule('hands-on-cruising');
    expect(lessons).toHaveLength(6);
    expect(lessons.map((lesson) => lesson.id)).toEqual([
      'hands-on-cruising-holding-a-course',
      'hands-on-cruising-ground-tackle-and-anchorage',
      'hands-on-cruising-setting-watching-weighing',
      'hands-on-cruising-making-fast',
      'hands-on-cruising-crew-overboard',
      'hands-on-cruising-loss-of-control',
    ]);
    expect(lessons.map((lesson) => lesson.title)).toEqual([
      'Holding a Course',
      'Ground Tackle & Choosing the Spot',
      'Setting, Watching & Weighing',
      'Making Fast: Moorings & Dock Lines',
      'Crew Overboard & Cold Water',
      'Grounding, Steering & Propulsion Loss',
    ]);
    expect(lessons.map((lesson) => lesson.order)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(lessons.map((lesson) => lesson.concepts)).toEqual([
      ['steering-a-course'],
      ['ground-tackle-and-anchor-types', 'choosing-an-anchorage', 'anchor-scope'],
      ['setting-and-weighing-anchor', 'anchor-watch-and-dragging'],
      ['mooring-and-dock-line-handling'],
      ['crew-overboard-recovery', 'cold-water-immersion'],
      ['grounding-response', 'loss-of-steering-or-propulsion'],
    ]);
    for (const lesson of lessons) {
      for (const concept of lesson.concepts) {
        expect([...conceptIds], `concept ${concept} of ${lesson.id}`).toContain(concept);
      }
      expect(JSON.stringify(lesson), `placeholder copy in ${lesson.id}`)
        .not.toMatch(/placeholder|draft lesson|planned coverage|still being drafted|lesson coverage|\bTBD\b/i);
      expect(lesson.blocks.length, `thin lesson ${lesson.id}`).toBeGreaterThanOrEqual(12);
      expect(lesson.intro.trim().split(/\s+/).length, `stub intro on ${lesson.id}`).toBeGreaterThanOrEqual(8);
      const prose = [lesson.intro, ...lesson.blocks.filter((block) => block.kind === 'text').map((block) => block.text)];
      expect(prose.join(' ').split(/\s+/).length, `thin prose in ${lesson.id}`).toBeGreaterThanOrEqual(400);
      expect(
        new Set(lesson.blocks.map((block) => block.kind)).size,
        `monotonous block use in ${lesson.id}`,
      ).toBeGreaterThanOrEqual(4);
    }
    // Figures in document order. All but one are reused, already-approved
    // manifest assets; `custom-springing-off` is the single new asset this
    // module introduced, and it is a Learn-only figure with no question behind
    // it, which is why it appears here and nowhere in the question bank.
    expect(
      lessons.flatMap((lesson) => lesson.blocks)
        .filter((block) => block.kind === 'figure')
        .map((block) => block.assetId),
    ).toEqual([
      'photo-cqr-anchor',
      'photo-danforth-anchor',
      'custom-anchorage-selection',
      'custom-swing-circle',
      'custom-scope-geometry',
      'custom-dragging-anchor',
      'custom-springing-off',
      'custom-mob-recovery-approach',
      'custom-cold-water-1101',
      'photo-grounded-boat',
    ]);
    const figuresOf = (order: number) =>
      lessons[order - 1].blocks.filter((block) => block.kind === 'figure').map((block) => block.assetId);
    // L1 carries no figure on purpose: the only close candidate is the
    // dragging-anchor diagram, and dropping an anchoring scenario into the
    // steering lesson would teach the wrong subject. Transits are taught in
    // prose there instead.
    expect(figuresOf(1)).toEqual([]);
    // The two crude quiz stimuli stay out of the teaching content entirely.
    const allFigures = lessons.flatMap((lesson) => lesson.blocks)
      .filter((block) => block.kind === 'figure').map((block) => block.assetId);
    expect(allFigures, 'crude windlass stimulus used as a teaching figure')
      .not.toContain('custom-windlass-deck');
    expect(allFigures, 'crude emergency-tiller stimulus used as a teaching figure')
      .not.toContain('custom-emergency-tiller');
    // L4 must not reuse Motoring's mooring-approach diagram: this lesson is
    // line handling, not approach geometry.
    expect(figuresOf(4), 'L4 reuses the Motoring approach diagram')
      .not.toContain('custom-mooring-approach');
    for (const block of lessons.flatMap((lesson) => lesson.blocks)) {
      if (block.kind !== 'figure') continue;
      expect(block.caption?.trim(), `uncaptioned figure ${block.assetId}`).toBeTruthy();
    }
    // No concept repeats within the module, so practising one lesson never
    // re-serves a neighbour's set. The 11 concepts are exactly these, and in
    // particular there is still no `transits-and-ranges` — transits are taught
    // in lesson 1's prose without minting taxonomy that would resolve to zero
    // Practice questions.
    const tags = lessons.flatMap((lesson) => lesson.concepts);
    expect(new Set(tags).size, 'a concept is tagged on two Hands-On lessons').toBe(tags.length);
    expect(tags).toHaveLength(11);
    expect([...conceptIds]).not.toContain('transits-and-ranges');
  });

  /**
   * The module boundary, enforced on the prose rather than on the tags. Each
   * neighbouring module already owns a body of material that Hands-On Cruising
   * would find it easy to re-teach, and the failure mode is a duplicated
   * lesson rather than a wrong one.
   *
   * These are named *techniques and theory*, not topics. Hands-On is free — and
   * in several places expected — to say that docking approaches, compass
   * theory, sail trim and the distress call belong elsewhere, and to
   * cross-reference them. What it must not do is teach them.
   */
  it('does not re-teach Motoring, Navigation, Sails or Cruising Life & Safety material', () => {
    const lessons = lessonsForModule('hands-on-cruising');
    // Human-visible copy only. Matching against JSON.stringify would also see
    // structural keys — a table's `headers` array is not the sailing sense of
    // "header" — so the text a learner actually reads is reassembled here.
    const visible = (lesson: (typeof lessons)[number]) =>
      [
        lesson.title,
        lesson.intro,
        ...lesson.blocks.flatMap((block) => {
          switch (block.kind) {
            case 'text':
            case 'heading':
              return [block.text];
            case 'list':
              return block.items;
            case 'definition':
              return [block.term, block.text];
            case 'callout':
              return [block.title ?? '', block.text];
            case 'table':
              return [block.caption ?? '', ...block.headers, ...block.rows.flat()];
            case 'figure':
              return [block.caption ?? ''];
            default:
              return [];
          }
        }),
      ].join(' \n ');
    const prose = lessons.map(visible).join(' \n ');

    // Motoring owns approach geometry and propeller behaviour. L4 is the lesson
    // most at risk, so it is also checked on its own.
    const makingFast = visible(lessons[3]);
    for (const [label, pattern] of [
      ['prop walk', /prop\s*walk/i],
      ['prop wash', /prop\s*wash/i],
      ['pivot point', /pivot point/i],
      ['approach angle', /\b(30|45)[- ]degree angle|angle of approach|approach at an angle/i],
      ['wind onto/off the dock as an approach case', /wind (blowing )?(onto|off) the dock/i],
      ['the go-around', /go.around|abort the approach/i],
    ] as const) {
      expect(makingFast, `L4 teaches Motoring's ${label}`).not.toMatch(pattern);
    }

    // Navigation Rules & Tools owns the compass as an instrument and all
    // chartwork. L1 teaches steering to a heading, not where the heading came
    // from.
    for (const [label, pattern] of [
      ['variation', /\bvariation\b/i],
      ['deviation', /\bdeviation\b/i],
      // Deliberately narrow: naming chartwork in order to defer it to
      // Navigation is a cross-reference and is allowed. What is forbidden is
      // actually walking a learner through laying a course off on a chart.
      ['plotting a course', /how to plot|plot(ting)? a (course|position) on the chart/i],
    ] as const) {
      expect(prose, `Hands-On teaches Navigation's ${label}`).not.toMatch(pattern);
    }

    // Sails & Trim owns tactical sailing. The Advisory decision for L1 was to
    // omit headers, lifts and tacking-angle arithmetic outright.
    for (const [label, pattern] of [
      // The tactical sense specifically. "Lift" in the ordinary sense — a tide
      // lifting a boat off, lifting a casualty aboard — is not this module
      // straying into Sails & Trim.
      ['headers and lifts', /\bheaders? and lifts?\b|\b(header|lift)\b[^.]{0,60}wind ?shift|wind ?shift[^.]{0,60}\b(header|lift)\b|closest tack/i],
      ['tacking angle', /tacking angle|tacks? through (about )?\d+ degrees/i],
      ['points of sail', /points? of sail|broad reach/i],
    ] as const) {
      expect(prose, `Hands-On teaches Sails & Trim's ${label}`).not.toMatch(pattern);
    }

    // Cruising Life & Safety owns the distress call, the PFD/harness
    // curriculum, fire, flooding and injury care. L5 may say a life jacket
    // matters and must not teach how to choose or wear one, or how to call.
    for (const [label, pattern] of [
      ['the MAYDAY call', /mayday|channel 16|\bdsc\b/i],
      ['PFD selection and fit', /\bpfd\b|wearable (device|flotation)|throwable device|fit check/i],
      // Naming harnesses and jacklines in order to hand them to Cruising Life
      // & Safety is the deferral working as intended; instructing a learner in
      // their use is not.
      ['harnesses and jacklines', /how to (rig|use|wear) a (jackline|harness|tether)|clip (the|your) tether|where to clip/i],
      ['fire', /fire extinguisher|class [abc] fire/i],
      ['flooding', /flooding|seacock/i],
    ] as const) {
      expect(prose, `Hands-On teaches Cruising Life & Safety's ${label}`).not.toMatch(pattern);
    }

    // The deferrals are pinned positively as well, so the boundary is stated
    // to the learner rather than only enforced by the negatives above.
    expect(visible(lessons[3]), 'L4 lost its deferral of approach handling to Motoring')
      .toMatch(/motoring/i);
    expect(visible(lessons[4]), 'L5 lost its deferral of PFDs and distress calling')
      .toMatch(/cruising life & safety/i);
    expect(visible(lessons[0]), 'L1 lost its deferral of compass theory to Navigation')
      .toMatch(/navigation rules & tools/i);

    // Seamanship's reserved material: knots as knots, towing theory, and
    // physically clearing fouled propulsion. L6 stops at the immediate
    // response and says so.
    expect(prose, 'Hands-On teaches a prop-clearing technique')
      .not.toMatch(/cut(ting)? (the|away) (line|rope) (free|clear) (from|off) the prop|dive down to the prop/i);
    expect(visible(lessons[5]), 'L6 lost its refusal to teach in-water prop clearing')
      .toMatch(/does not teach it|do not go in/i);
  });

  it('tags every lesson with valid concept ids', () => {
    for (const l of LESSONS) {
      expect(l.concepts.length, `concepts of ${l.id}`).toBeGreaterThan(0);
      for (const c of l.concepts) {
        expect([...conceptIds], `concept ${c} of ${l.id}`).toContain(c);
      }
    }
  });

  // The manifest's JSON import widens ids to `string`, so this is the only
  // place a bad figure reference can be caught before it renders as nothing.
  it('references only assets that exist in the manifest', () => {
    for (const l of LESSONS) {
      for (const b of l.blocks) {
        if (b.kind !== 'figure') continue;
        expect([...assetIds], `asset ${b.assetId} of ${l.id}`).toContain(b.assetId);
      }
    }
  });

  // Keeps the block renderer honest: a kind nothing uses is a kind nobody has
  // seen render.
  it('exercises every block kind somewhere in the published content', () => {
    const used = new Set<string>();
    for (const l of LESSONS) {
      for (const b of l.blocks) {
        used.add(b.kind);
        if (b.kind === 'list') used.add(b.ordered ? 'list:ordered' : 'list:unordered');
        if (b.kind === 'callout') used.add(`callout:${b.tone}`);
      }
    }
    const required: (Block['kind'] | string)[] = [
      'text',
      'heading',
      'list',
      'list:ordered',
      'list:unordered',
      'definition',
      'callout',
      'callout:note',
      'callout:warning',
      'table',
      'figure',
    ];
    for (const kind of required) {
      expect([...used], `no lesson uses ${kind}`).toContain(kind);
    }
  });

  it('has well-formed tables', () => {
    for (const l of LESSONS) {
      for (const b of l.blocks) {
        if (b.kind !== 'table') continue;
        for (const row of b.rows) {
          expect(row.length, `row width in ${l.id}`).toBe(b.headers.length);
        }
      }
    }
  });
});
