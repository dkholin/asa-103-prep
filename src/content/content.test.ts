import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import manifest from './asset-manifest.json';
import { MOCK_QUESTION_IDS, QUESTIONS } from './questions';
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
    expect(new Set(MOCK_QUESTION_IDS).size).toBe(MOCK_QUESTION_IDS.length);
    for (const id of MOCK_QUESTION_IDS) {
      expect(questionIds).toContain(id);
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
      const isCustom = a.sourcePage === 'created in-repo';
      if (!isCustom) {
        expect(a.sourcePage, `sourcePage of ${a.id}`).toMatch(/^https?:\/\//);
        expect(a.originalUrl, `originalUrl of ${a.id}`).toMatch(/^https?:\/\//);
      }
    }
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
});
