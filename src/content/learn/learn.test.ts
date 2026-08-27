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
   * Boat & Cruising Basics is at Step 1: the six lesson objects, their order,
   * ids, titles and concept tags are final and pinned here, while the copy is
   * still placeholder — so this guard deliberately does NOT assert the
   * placeholder-free, block-count shape the finished modules above do. Step 2
   * tightens it; until then this is what stops a lesson being dropped,
   * reordered or retagged while the prose is being written.
   */
  it('publishes six Boat & Cruising Basics lesson skeletons in order, tagged and figure-free', () => {
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
      // Step 1 ships no figures: the module's artwork is a Step 3 decision.
      expect(
        lesson.blocks.filter((block) => block.kind === 'figure'),
        `figure in Step 1 skeleton ${lesson.id}`,
      ).toEqual([]);
      // Enough blocks to render, and no more.
      expect(lesson.blocks.length, `empty skeleton ${lesson.id}`).toBeGreaterThan(0);
    }
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
