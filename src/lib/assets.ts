import manifest from '../content/asset-manifest.json';

export interface AssetRecord {
  id: string;
  filename: string;
  description: string;
  sourcePage: string;
  originalUrl: string;
  creator: string;
  license: string;
  attributionRequired: boolean;
  modified: boolean;
  usedByQuestions: string[];
}

export const ASSETS: AssetRecord[] = manifest.assets;

const byId = new Map(ASSETS.map((a) => [a.id, a]));

export function assetById(id: string): AssetRecord | undefined {
  return byId.get(id);
}

export function assetUrl(id: string): string {
  const a = byId.get(id);
  return a ? `${import.meta.env.BASE_URL}assets/${a.filename}` : '';
}
