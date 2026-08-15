import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import manifest from './asset-manifest.json';
import { QUESTIONS, selectMockQuestions } from './questions';
import { TOPIC_IDS } from './topics';

const questionIds = QUESTIONS.map((q) => q.id);

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
