import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import manifest from './asset-manifest.json';
import { LESSONS } from './learn';
import { QUESTIONS, selectMockQuestions } from './questions';
import { TOPIC_IDS } from './topics';

const questionIds = QUESTIONS.map((q) => q.id);

/**
 * Assets an asset can legitimately be reached from. A manifest record earns its
 * keep by being rendered somewhere, and Learn lesson figures are a second, equal
 * consumer alongside visual questions — `learn.test.ts` enforces the other
 * direction (a lesson figure must name a real manifest record).
 */
const lessonFigureAssetIds = new Set(
  LESSONS.flatMap((l) => l.blocks.filter((b) => b.kind === 'figure').map((b) => b.assetId)),
);

describe('question bank integrity', () => {
  it('keeps researched Seamanship knot limitations and excludes unsafe attachment advice', () => {
    const get = (id: string) => QUESTIONS.find((q) => q.id === id)!;
    const bowline = get('sea-knot-bowline');
    expect(bowline.correctChoiceId).toBe('a');
    expect(bowline.choices.find((c) => c.id === 'a')!.text).toMatch(/fixed loop/);
    expect(JSON.stringify(bowline)).not.toMatch(/won't slip or jam|secure, non-slipping|loop to clip a harness/);
    expect(bowline.explanation).toMatch(/dressing.*tail/);
    expect(bowline.explanation).toMatch(/work loose.*cyclic/);
    expect(bowline.explanation).toMatch(/not a recommendation.*life-safety/);
    const stopper = get('sea-knot-figure8-stopper');
    expect(stopper.correctChoiceId).toBe('a');
    expect(stopper.choices.find((c) => c.id === 'c')!.whyWrong).toMatch(/manufacturer.*instructions/);
    expect(stopper.choices.find((c) => c.id === 'c')!.whyWrong).not.toMatch(/calls for.*bowline/);
    const cleat = get('sea-knot-cleat-hitch');
    expect(cleat.correctChoiceId).toBe('a');
    expect(cleat.format).toBe('text');
    expect(cleat.assetId).toBeUndefined();
    expect(cleat.choices.find((c) => c.id === 'a')!.text).toMatch(/farther horn/);
    expect(cleat.explanation).toMatch(/base turns.*trap.*jam/);
    expect(cleat.explanation).toMatch(/not a universal finish for towlines/);
    const round = get('sea-knot-round-turn-two-half-hitches');
    expect(round.correctChoiceId).toBe('a');
    expect(round.explanation).toMatch(/friction.*initial strain.*standing part/);
    expect(round.explanation).toMatch(/chafe still needs/);
    expect(round.explanation).not.toMatch(/reduces chafe on the standing part/);
    const rolling = get('sea-knot-rolling-hitch');
    expect(rolling.correctChoiceId).toBe('a');
    expect(rolling.choices.find((c) => c.id === 'a')!.text).not.toMatch(/without slipping/);
    expect(rolling.explanation).toMatch(/dressing, pull direction.*materials and diameters/);
    expect(rolling.explanation).toMatch(/may slip/);
  });

  it('has unique question ids', () => {
    expect(new Set(questionIds).size).toBe(questionIds.length);
  });

  it('uses only valid topic ids', () => {
    for (const q of QUESTIONS) {
      expect(TOPIC_IDS, `topic of ${q.id}`).toContain(q.topic);
    }
  });

  it('has well-formed choices with exactly one intended correct answer', () => {
    for (const q of QUESTIONS) {
      const choiceIds = q.choices.map((c) => c.id);
      expect(new Set(choiceIds).size, `choice ids of ${q.id}`).toBe(choiceIds.length);
      expect(choiceIds, `correct choice of ${q.id}`).toContain(q.correctChoiceId);
      expect(q.choices.length, `choice count of ${q.id}`).toBeGreaterThanOrEqual(3);
      for (const c of q.choices) {
        expect(c.text.trim(), `choice text ${q.id}/${c.id}`).not.toBe('');
      }
    }
  });

  it('has a prompt, explanation, and source on every question', () => {
    for (const q of QUESTIONS) {
      expect(q.prompt.trim(), `prompt of ${q.id}`).not.toBe('');
      expect(q.explanation.trim(), `explanation of ${q.id}`).not.toBe('');
      expect(q.source.trim(), `source of ${q.id}`).not.toBe('');
    }
  });

  it('references only assets that exist in the manifest', () => {
    const assetIds = new Set(manifest.assets.map((a) => a.id));
    for (const q of QUESTIONS) {
      if (q.format === 'visual') {
        expect(q.assetId, `assetId of visual question ${q.id}`).toBeTruthy();
        expect(assetIds, `asset ${q.assetId} of ${q.id}`).toContain(q.assetId!);
      }
    }
  });

  it('selects valid, unique mock exam questions', () => {
    const mockIds = selectMockQuestions();
    expect(new Set(mockIds).size).toBe(mockIds.length);
    for (const id of mockIds) {
      expect(questionIds).toContain(id);
    }
  });

  it('dynamically includes every topic (including newly added ones) in the mock exam', () => {
    const mockIds = selectMockQuestions();
    const mockTopics = new Set(mockIds.map((id) => QUESTIONS.find((q) => q.id === id)!.topic));
    for (const t of TOPIC_IDS) {
      expect(mockTopics, `mock exam missing topic ${t}`).toContain(t);
    }
  });

  it('does not let any answer position dominate the correct answer (Arc 7 normalization)', () => {
    const positionOf = (q: (typeof QUESTIONS)[number]) => q.choices.findIndex((c) => c.id === q.correctChoiceId);
    const counts = [0, 0, 0, 0];
    for (const q of QUESTIONS) counts[positionOf(q)]++;
    for (const count of counts) {
      expect(count, `answer position counts ${JSON.stringify(counts)}`).toBeGreaterThan(0);
      expect(count / QUESTIONS.length, `answer position counts ${JSON.stringify(counts)}`).toBeLessThan(0.4);
    }
  });

  /**
   * Regression guard for the one factual correction made during Cruising Life
   * & Safety Step 2. `safety-pfd-child` used to teach that federal law
   * contributes only carriage and that requiring a child to actually *wear* a
   * PFD is a state layer added on top. It is not: 33 CFR 175.15(c) is itself a
   * federal wear requirement for children under 13 on a recreational vessel
   * under way (unless below decks or in an enclosed cabin), and under
   * 33 CFR 175.25 a state's own child wear age applies on its waters *instead
   * of* the federal rule.
   *
   * Both halves are pinned, because dropping either one puts the question back
   * where it was: without the federal citation a reader concludes there is no
   * federal wear rule, and without the supersession clause they conclude the
   * age is 13 everywhere. The "prudent practice" framing that made the old
   * prompt wrong is pinned out of the prompt as well.
   */
  it('states the child PFD wear rule as federal law with the state supersession', () => {
    const question = QUESTIONS.find((item) => item.id === 'safety-pfd-child');
    expect(question, 'missing question safety-pfd-child').toBeDefined();
    const correct = question!.choices.find((choice) => choice.id === question!.correctChoiceId);
    const answer = `${correct?.text ?? ''} ${question!.explanation}`;

    expect(question!.prompt, 'prompt reintroduces the prudent-practice framing')
      .not.toMatch(/prudent practice/i);
    expect(answer, 'correct answer no longer names the federal rule').toMatch(/federal/i);
    expect(answer, 'correct answer no longer names the under-13 threshold').toMatch(/\b13\b/);
    expect(answer, 'correct answer no longer requires the child to be wearing it').toMatch(/wear/i);
    expect(answer, 'correct answer lost the below-decks / enclosed-cabin exception')
      .toMatch(/below decks|enclosed cabin/i);
    expect(answer, 'correct answer lost the state supersession').toMatch(/state/i);
    // The old wording made the federal contribution carriage-only. That claim
    // must not come back in the answer a learner is shown as correct.
    expect(answer, 'correct answer reasserts that federal law is carriage only')
      .not.toMatch(/federal law sets the baseline/i);
    expect(question!.source, 'source no longer cites the governing regulation').toMatch(/175\.15/);
    expect(question!.source, 'source no longer cites the state-supersession regulation').toMatch(/175\.25/);
  });

  /**
   * The second question-content correction, made during Hands-On Cruising
   * Step 2. `emer-mob-final-approach` already had the right answer — bring the
   * person alongside to leeward — but justified it with inverted physics: its
   * `whyWrong` on choice `c` and its explanation both claimed that leeward is
   * the side "the boat drifts away from" and that a windward pickup risks
   * "drifting down onto the victim".
   *
   * A boat with no way on drifts downwind. So a person to leeward is one the
   * boat drifts TOWARD (which is why they stay reachable, and why the hull
   * shelters them), and a person to windward is one it drifts AWAY from. The
   * old rationale taught a learner to reason backwards about drift, which is
   * the part that mattered.
   *
   * This pins the direction claim in both places, so the inverted wording
   * cannot come back, and pins that the heavy-sea counter-case survives — the
   * one real argument for a windward pickup is that a hull drifting down on a
   * person in steep waves can land on them, and that trade-off is what stops
   * the leeward rule being taught as universal.
   */
  it('explains the crew-overboard leeward pickup with the drift direction the right way round', () => {
    const question = QUESTIONS.find((item) => item.id === 'emer-mob-final-approach');
    expect(question, 'missing question emer-mob-final-approach').toBeDefined();
    // The answer itself is unchanged by the correction and stays the leeward one.
    const correct = question!.choices.find((choice) => choice.id === question!.correctChoiceId);
    expect(correct?.text, 'correct choice is no longer the leeward pickup').toMatch(/leeward/i);
    const windward = question!.choices.find((choice) => /windward/i.test(choice.text));
    expect(windward?.whyWrong, 'the windward distractor lost its rationale').toBeTruthy();

    const rationale = `${windward!.whyWrong} ${question!.explanation}`;
    // The inverted claims, in the forms they actually took.
    expect(rationale, 'leeward is described as drifting away from the victim again')
      .not.toMatch(/leeward[^.]*drifts? away from/i);
    expect(rationale, 'windward is described as drifting onto the victim again')
      .not.toMatch(/windward[^.]*drift(ing|s)? down onto/i);
    // The corrected direction, stated positively.
    expect(question!.explanation, 'explanation no longer says the boat drifts toward the victim')
      .toMatch(/drifts? (gently )?toward/i);
    expect(windward!.whyWrong!, 'windward rationale no longer says the boat drifts away')
      .toMatch(/drift(ing|s)? away from/i);
    // The trade-off that keeps this from being taught as an absolute rule.
    expect(question!.explanation, 'explanation lost the heavy-sea counter-case')
      .toMatch(/steep sea|heavy|waves/i);
  });

  /**
   * Seamanship Step 1, Advisory-approved correction. ASA Chapter 7 p.140,
   * Storm Trysail's US Sailing-sanctioned Safety-at-Sea damage-control table,
   * and Annapolis Sailing School agree on unloading a failed windward shroud
   * by tacking. Peerless's generic head-to-wind sequence does not distinguish
   * which support failed; it does not govern this close-hauled scenario.
   * See docs/seamanship-step-1.md for original wording, URLs and reconciliation.
   */
  it('unloads the failed windward shroud by tacking, then stabilizes without making tacking universal', () => {
    const question = QUESTIONS.find((item) => item.id === 'emer-rigging-failure-response');
    expect(question, 'missing rigging question').toBeDefined();
    expect(question!.prompt).toMatch(/close-hauled.*windward shroud/i);
    expect(question!.correctChoiceId).toBe('a');
    const correct = question!.choices.find((choice) => choice.id === question!.correctChoiceId)!;
    // Pin the action, changed load-bearing side and subsequent load reduction,
    // not a whole editorial sentence. The old bear-away answer fails these.
    expect(correct.text).toMatch(/tack.*failed windward shroud.*leeward.*unload/i);
    expect(correct.text).toMatch(/then.*reduce sail.*stabili[sz]/i);
    expect(correct.text).not.toMatch(/bear away|always tack/i);
    const explanation = question!.explanation;
    expect(explanation).toMatch(/unload the failed support/i);
    expect(explanation).toMatch(/because.*windward.*close-hauled.*tack/i);
    expect(explanation).toMatch(/intact shrouds.*new windward side.*load/i);
    expect(explanation).toMatch(/then.*reduce sail.*controlled.*stabili[sz]/i);
    expect(explanation).toMatch(/not a universal instruction to tack.*every shroud or stay failure/i);
    expect(explanation).toMatch(/depends on which support failed.*loaded/i);
    for (const id of ['b', 'c']) {
      const rationale = question!.choices.find((choice) => choice.id === id)!.whyWrong!;
      expect(rationale, id).toMatch(/tack/i);
      expect(rationale, id).not.toMatch(/bearing away and easing|increases rig load/i);
    }
    expect(question!.source).toMatch(/ASA Chapter 7, p\. 140/);
    expect(question!.source).toMatch(/Storm Trysail.*US Sailing-sanctioned/);
    expect(question!.source).toMatch(/Annapolis Sailing School/);
  });

});

describe('asset manifest integrity', () => {
  it('has a file on disk for every asset', () => {
    for (const a of manifest.assets) {
      const path = join(process.cwd(), 'public', 'assets', a.filename);
      expect(existsSync(path), `missing asset file ${a.filename}`).toBe(true);
    }
  });

  it('has provenance recorded for every asset', () => {
    for (const a of manifest.assets) {
      expect(a.id.trim()).not.toBe('');
      expect(a.description.trim(), `description of ${a.id}`).not.toBe('');
      expect(a.creator.trim(), `creator of ${a.id}`).not.toBe('');
      expect(a.license.trim(), `license of ${a.id}`).not.toBe('');
      expect(a.altText?.trim(), `neutral altText of ${a.id}`).not.toBe('');
      const isCustom = a.sourcePage === 'created in-repo';
      if (!isCustom) {
        expect(a.sourcePage, `sourcePage of ${a.id}`).toMatch(/^https?:\/\//);
        expect(a.originalUrl, `originalUrl of ${a.id}`).toMatch(/^https?:\/\//);
      }
      if (a.attributionRequired) {
        expect(a.creator.trim(), `attribution creator of ${a.id}`).not.toBe('');
        expect(a.sourcePage, `attribution source of ${a.id}`).toMatch(/^https?:\/\//);
        if ('licenseUrl' in a) {
          expect(a.licenseUrl, `licenseUrl of ${a.id}`).toMatch(/^https?:\/\//);
        }
      }
    }

    const turnbuckle = manifest.assets.find((asset) => asset.id === 'photo-turnbuckle');
    expect(turnbuckle?.attributionText).toBe('Pütting (Boot) · Sastognuti · Wikimedia Commons');
    expect(turnbuckle?.altText).toBe(
      'Open-body threaded metal fittings connecting wire shrouds to deck-mounted plates.',
    );
    expect(turnbuckle?.license).toBe('CC BY-SA 3.0');
    expect(turnbuckle?.licenseUrl).toBe('https://creativecommons.org/licenses/by-sa/3.0/');
  });

  it('cross-references questions correctly', () => {
    const idSet = new Set(questionIds);
    for (const a of manifest.assets) {
      for (const qid of a.usedByQuestions) {
        expect(idSet, `asset ${a.id} references unknown question ${qid}`).toContain(qid);
        const q = QUESTIONS.find((x) => x.id === qid)!;
        expect(q.assetId, `question ${qid} should use asset ${a.id}`).toBe(a.id);
      }
    }
  });

  it('records the reverse mapping: every visual question is listed on the asset it uses', () => {
    const byId = new Map(manifest.assets.map((a) => [a.id, a]));
    for (const q of QUESTIONS) {
      if (q.format !== 'visual' || !q.assetId) continue;
      const asset = byId.get(q.assetId);
      expect(asset, `question ${q.id} references unknown asset ${q.assetId}`).toBeTruthy();
      expect(asset!.usedByQuestions, `asset ${q.assetId} does not list question ${q.id}`).toContain(q.id);
    }
  });

  it('has no orphaned asset records', () => {
    for (const a of manifest.assets) {
      const used = a.usedByQuestions.length > 0 || lessonFigureAssetIds.has(a.id);
      expect(used, `asset ${a.id} is not used by any question or lesson figure`).toBe(true);
    }
  });

  it('records the USCG regulatory-marks plate as a cropped U.S. Government work, not a project original', () => {
    const plate = manifest.assets.find((asset) => asset.id === 'uscg-regulatory-marks');
    expect(plate?.filename).toBe('uscg-regulatory-marks.png');
    expect(plate?.creator).toBe('U.S. Coast Guard, Office of Boating Safety');
    expect(plate?.license).toMatch(/Public domain/);
    expect(plate?.sourcePage).toBe('https://uscgboating.org/images/486.PDF');
    expect(plate?.attributionRequired).toBe(true);
    expect(plate?.modified).toBe(true);
    expect(plate?.modificationNote).toMatch(/Cropped from PDF sheet 9/);
  });

  it('keeps the navigation-light sector geometry auditable and arithmetically closed', () => {
    const svg = readFileSync(
      join(process.cwd(), 'public', 'assets', 'custom-navigation-light-sectors.svg'),
      'utf8',
    );
    // Every sector's bearing range is stated in a comment so the drawing can be checked.
    expect(svg).toContain('000.0 -> 112.5   = 112.5 deg');
    expect(svg).toContain('247.5 -> 360.0   = 112.5 deg');
    expect(svg).toContain('112.5 -> 247.5   = 135.0 deg');
    expect(svg).toContain('247.5 -> 112.5 through 000 = 225.0 deg');
    expect(112.5 + 112.5 + 135).toBe(360);
    expect(112.5 + 112.5).toBe(225);
    // The masthead arc is a separate annular band, not an overlay on the sidelights.
    expect(svg).toMatch(/A290,290 0 1,1 .*A240,240 0 1,0/);
  });

  it('draws variation and deviation with different fills, not different colours alone', () => {
    const svg = readFileSync(
      join(process.cwd(), 'public', 'assets', 'custom-true-magnetic-compass.svg'),
      'utf8',
    );
    // Deterministic hatch for deviation; flat tint for variation.
    expect(svg).toContain('<pattern id="deviation-hatch"');
    expect(svg).toContain('fill="url(#deviation-hatch)"');
    expect(svg).toMatch(/fill="#4a90c4" fill-opacity="0\.35"/);
    // Matches the Lesson 8 sign convention: westerly corrections are added.
    expect(svg).toContain('add west, subtract east');
    expect(svg).toContain('000° T  +12° W → 012° M  +6° W → 018° C');
  });

  it('draws the two corrected knot diagrams as continuous rope with documented topology', () => {
    const read = (name: string) =>
      readFileSync(join(process.cwd(), 'public', 'assets', name), 'utf8');
    const fig8 = read('custom-figure8-stopper.svg');
    const round = read('custom-round-turn-two-half-hitches.svg');

    // ---------------------------------------------------------------------
    // Topology is re-derived from the drawn path, not read off the comment.
    // A comment can survive any redraw; these assertions cannot.
    // ---------------------------------------------------------------------

    type Pt = [number, number];
    /** Every `class="rope"` path in the file, longest first. */
    const ropePaths = (svg: string): Pt[][] =>
      [...svg.matchAll(/<path class="rope" d="([^"]+)"/g)]
        .map((m) => m[1].replace(/^M/, '').split(/\s*L\s*/)
          .map((p) => p.trim().split(/\s+/).map(Number) as Pt))
        .sort((a, b) => b.length - a.length);

    /**
     * Self-intersections of the centreline, as parameter pairs into `poly`.
     * Near-parallel hits are dropped: where the rope turns back on itself at a
     * silhouette edge, consecutive samples graze without really crossing.
     */
    const selfCrossings = (poly: Pt[]) => {
      const out: Array<{ a: number; b: number; x: number; y: number }> = [];
      for (let i = 0; i < poly.length - 1; i++) {
        for (let j = i + 8; j < poly.length - 1; j++) {
          const [p, q, r, s2] = [poly[i], poly[i + 1], poly[j], poly[j + 1]];
          const d1: Pt = [q[0] - p[0], q[1] - p[1]];
          const d2: Pt = [s2[0] - r[0], s2[1] - r[1]];
          const den = d1[0] * d2[1] - d1[1] * d2[0];
          if (den === 0) continue;
          const t = ((r[0] - p[0]) * d2[1] - (r[1] - p[1]) * d2[0]) / den;
          const u = ((r[0] - p[0]) * d1[1] - (r[1] - p[1]) * d1[0]) / den;
          if (t < 0 || t > 1 || u < 0 || u > 1) continue;
          const n1 = Math.hypot(...d1), n2 = Math.hypot(...d2);
          if (Math.abs(den) / (n1 * n2) < 0.15) continue;   // grazing, not a crossing
          const hit = { a: i + t, b: j + u, x: p[0] + d1[0] * t, y: p[1] + d1[1] * t };
          if (out.some((o) => Math.abs(o.a - hit.a) < 3 && Math.abs(o.b - hit.b) < 3)) continue;
          out.push(hit);
        }
      }
      return out;
    };

    // ---- figure-eight: a reduced, alternating, 4-crossing diagram is 4_1 ----
    const [f8rope, ...f8overs] = ropePaths(fig8);
    expect(f8rope, 'figure-eight has no rope path at all').toBeDefined();
    const f8x = selfCrossings(f8rope);
    expect(f8x, 'figure-eight is not a four-crossing diagram').toHaveLength(4);

    // Occurrences in the order the rope passes through them.
    const occ = f8x.flatMap((c, k) => [{ at: c.a, k }, { at: c.b, k }])
      .sort((p, q) => p.at - q.at);
    // Reduced: a crossing at two consecutive positions is a removable kink,
    // which would mean the real knot has fewer crossings than are drawn.
    for (let i = 0; i < occ.length - 1; i++) {
      expect(occ[i].k, 'figure-eight carries a removable kink').not.toBe(occ[i + 1].k);
    }
    // Interlacement: for the figure-eight every crossing interleaves exactly
    // two of the other three. This is what separates it from the other
    // four-crossing diagrams that share the same crossing count.
    const span = new Map<number, [number, number]>();
    occ.forEach((o, i) => {
      const cur = span.get(o.k);
      span.set(o.k, cur ? [cur[0], i] : [i, i]);
    });
    const interleaves = (p: number, q: number) => {
      const [a0, a1] = span.get(p)!, [b0, b1] = span.get(q)!;
      return (a0 < b0 && b0 < a1) !== (a0 < b1 && b1 < a1);
    };
    for (const k of span.keys()) {
      const deg = [...span.keys()].filter((j) => j !== k && interleaves(k, j)).length;
      expect(deg, `figure-eight interlacement is not a 4-cycle at crossing ${k}`).toBe(2);
    }
    // Alternating: the short redrawn slices are exactly the passes that go in
    // front, so the front/behind sequence along the rope can be read off them.
    const index = new Map(f8rope.map((p, i) => [`${p[0]},${p[1]}`, i]));
    const overRanges = f8overs.map((slice) => {
      const lo = index.get(`${slice[0][0]},${slice[0][1]}`);
      const hi = index.get(`${slice[slice.length - 1][0]},${slice[slice.length - 1][1]}`);
      expect(lo, 'an over-slice is not a sub-path of the rope').toBeDefined();
      return [lo!, hi!] as const;
    });
    expect(overRanges, 'figure-eight has no over/under at all').toHaveLength(4);
    const sequence = occ.map(({ at }) =>
      overRanges.some(([lo, hi]) => at >= lo && at <= hi) ? 'O' : 'U').join('');
    expect(sequence, `figure-eight is not alternating: ${sequence}`).toMatch(/^(OU){4}$|^(UO){4}$/);
    // Each crossing must have exactly one front pass and one behind pass.
    for (const k of span.keys()) {
      const [i, j] = span.get(k)!;
      expect(sequence[i], `crossing ${k} is front or behind on both passes`).not.toBe(sequence[j]);
    }

    // ---- round turn: two complete passes, hitches clear of the piling ------
    const [rtRope] = ropePaths(round);
    expect(rtRope, 'round turn has no rope path at all').toBeDefined();
    // The wrap reaches past the piling's right edge once per pass. Counting the
    // returns to that extreme counts the passes, and two is a round turn.
    const FAR = 335;
    let passes = 0;
    for (let i = 1; i < rtRope.length; i++) {
      if (rtRope[i - 1][0] < FAR && rtRope[i][0] >= FAR) passes++;
    }
    expect(passes, 'the wrap is not two complete passes around the piling').toBe(2);
    // Both ends leave on the same side, which is what a round turn produces.
    expect(rtRope[0][0]).toBeLessThan(0);
    expect(rtRope[rtRope.length - 1][0]).toBeLessThan(0);
    // Three crossings per half hitch: across the standing part, behind it, and
    // the working end tucking under its own incoming leg.
    const rtx = selfCrossings(rtRope);
    expect(rtx, 'round turn does not carry two three-crossing half hitches').toHaveLength(6);
    // Every one of them is on the rope, well clear of the piling: the hitches
    // are tied round the standing part, not round the post.
    for (const c of rtx) {
      expect(c.x, 'a hitch crossing sits on the piling').toBeLessThan(250);
    }

    for (const [id, svg] of [['figure-eight', fig8], ['round turn', round]] as const) {
      // The rejected geometry drew free-standing ellipses and circles instead of
      // a rope path, in a different palette, with its own baked-in captions.
      expect(svg, `${id} still uses free-standing ellipses`).not.toMatch(/<(ellipse|circle)\b/);
      expect(svg, `${id} still uses the rejected palette`).not.toMatch(/#c05621|#2b6cb0|#f5f0e6|#a68f5c/i);
      expect(svg).not.toContain('Figure-eight stopper knot');
      expect(svg).not.toContain('Two half hitches finish the bend');
      // One rope: a single full-length path, plus short redrawn slices that
      // carry the over/under. Nothing is a closed shape.
      expect(svg, `${id} fills a shape instead of stroking rope`).not.toMatch(/class="rope"[^>]*fill="(?!none)/);
      expect(svg).toMatch(/\.rope \{ fill:none;/);
    }

    // Neither diagram may carry its question's answer, or the wording of one.
    const visible = (svg: string) =>
      [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/gi)].map((m) => m[1]).join(' ').toLowerCase();
    for (const svg of [fig8, round]) {
      for (const leak of [
        'stopper', 'block', 'fairlead', 'halyard', 'sheet', 'runs out',
        'initial strain', 'friction', 'securely fasten', 'non-slip', 'bowline',
      ]) {
        expect(visible(svg), `visible label leaks "${leak}"`).not.toContain(leak);
      }
    }
    // Only the geometry is named.
    expect(visible(fig8).split(/\s+/).filter(Boolean).length).toBeLessThanOrEqual(6);
    expect(visible(round).split(/\s+/).filter(Boolean).length).toBeLessThanOrEqual(8);
  });

  it('keeps known answer-bearing phrases out of visible custom SVG labels', () => {
    const prohibited = [
      'stemhead fitting',
      'bow roller',
      'binnacle pedestal',
      'compass card',
      'lubber line',
      'emergency tiller',
      'rudder post head',
      'through-hull fitting',
      'seacock (shutoff valve)',
      'wearable pfd',
      'throwable device',
      'run blower',
      'engine-blower',
      'single-lever throttle/shift',
      'cold incapacitation',
      'meaningful movement',
      'overpowered — sheeted hard',
      'eased sheet / traveler',
      'smaller heel angle',
      'steel toolbox',
      'handheld radio',
      "1' = 1 nm",
    ];

    for (const asset of manifest.assets.filter((item) => item.filename.endsWith('.svg'))) {
      const svg = readFileSync(join(process.cwd(), 'public', 'assets', asset.filename), 'utf8');
      expect(svg, `${asset.id} internal SVG alternative`).toContain(`aria-label="${asset.altText}"`);
      const visibleText = [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/gi)]
        .map((match) => match[1])
        .join(' ')
        .toLowerCase();
      for (const phrase of prohibited) {
        expect(visibleText, `${asset.id} visibly contains "${phrase}"`).not.toContain(phrase);
      }
    }
  });
});
