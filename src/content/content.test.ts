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
