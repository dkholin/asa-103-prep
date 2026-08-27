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
   * Cruising Life & Safety is at Step 1: the six lesson objects, their order,
   * ids, titles and concept tags are final and pinned here, while the copy is
   * still a neutral skeleton — so this guard deliberately does NOT assert the
   * placeholder-free, block-count, prose-length shape the finished modules
   * above do.
   *
   * STEP 2 MUST REPLACE THIS TEST with the normal finished-module content
   * guard: drop the skeleton allowance, assert placeholder-free substantial
   * copy and a block-count floor, and pin the module's figure list in document
   * order the way Boat & Cruising Basics and Navigation Rules & Tools do.
   *
   * Note on the last assertion: it pins that no concept repeats *within this
   * module*, so practising one lesson never re-serves a neighbour's set. It is
   * not a general rule — a concept may legitimately be tagged on lessons in
   * different modules, which is how `crew-briefing` reaches both Motoring and
   * lesson 1 here.
   */
  it('publishes six Cruising Life & Safety lesson skeletons in order, tagged and figure-free', () => {
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
      // Skeleton-tolerant: a real title, a real intro sentence, and something
      // to render. Nothing about length or placeholder wording until Step 2.
      expect(lesson.intro.trim().split(/\s+/).length, `stub intro on ${lesson.id}`).toBeGreaterThanOrEqual(8);
      expect(lesson.blocks.length, `empty lesson ${lesson.id}`).toBeGreaterThan(0);
    }
    // Step 1 creates no assets and uses none: the figure work is Step 2/3.
    expect(
      lessons.flatMap((lesson) => lesson.blocks).filter((block) => block.kind === 'figure'),
    ).toEqual([]);
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
