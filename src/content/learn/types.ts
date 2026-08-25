import type { ConceptId } from '../concepts';

/**
 * The rendered vocabulary of a lesson. Every kind must have a renderer in
 * `src/components/learn/Blocks.tsx`, whose `default:` arm narrows to `never`
 * so a kind added here without a renderer is a compile error. Separately,
 * `learn.test.ts` asserts the lessons collectively exercise every kind, which
 * keeps the renderers exercised by real content rather than only by the type.
 */
export type Block =
  | { kind: 'text'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'list'; ordered?: boolean; items: string[] }
  | { kind: 'definition'; term: string; text: string }
  | { kind: 'callout'; tone: 'note' | 'warning'; title?: string; text: string }
  | { kind: 'table'; caption?: string; headers: string[]; rows: string[][] }
  /**
   * `assetId` must name a record in `src/content/asset-manifest.json`. The JSON
   * import widens ids to `string`, so this cannot be checked by the compiler;
   * `learn.test.ts` enforces it at test time the same way `content.test.ts`
   * enforces question assets.
   */
  | { kind: 'figure'; assetId: string; caption?: string };

export interface Lesson {
  /** Stable across content edits — progress and links will be keyed on it. */
  id: string;
  moduleId: string;
  /** 1-based position within the module; contiguous and unique per module. */
  order: number;
  title: string;
  intro: string;
  concepts: ConceptId[];
  blocks: Block[];
}

export interface LearnModule {
  id: string;
  title: string;
  blurb: string;
  status: 'published' | 'coming-soon';
}
