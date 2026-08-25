import type { ConceptId } from './concepts';
import { QUESTIONS } from './questions';

/**
 * Resolve the existing question bank in its canonical order. A question that
 * matches more than one requested concept is still returned exactly once.
 * Deliberately has no topic fallback: an empty mapping stays empty.
 */
export function practiceIdsForConcepts(concepts: readonly ConceptId[]): string[] {
  if (concepts.length === 0) return [];
  const requested = new Set<ConceptId>(concepts);
  return QUESTIONS
    .filter((question) => question.concepts?.some((concept) => requested.has(concept)))
    .map((question) => question.id);
}
