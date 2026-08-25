/**
 * Learn concept ids.
 *
 * This module is deliberately neutral: it imports nothing and is imported by
 * both the Learn lessons and (from a later step) the question bank, so the two
 * can be cross-referenced without either owning the vocabulary. The list stays
 * flat — no hierarchy, weights, or groupings — per the Learn Foundation
 * discovery decision that a concept tag is a label, not a taxonomy.
 */
export const CONCEPT_IDS = [
  'pre-departure-checks',
  'crew-briefing',
  'stowage',
  'auxiliary-engine-types',
  'pre-departure-engine-checks',
  'engine-starting-procedure',
  'cooling-water-check',
  'blower-ventilation',
  'engine-controls',
  'engine-instruments',
  'prop-walk',
  'prop-wash',
  'right-hand-propeller',
  'stopping-distance',
  'steerage-way',
  'pivot-point',
  'turning-in-confined-space',
  'docking-approach',
  'docking-wind',
  'docking-current',
  'spring-line',
  'abort-and-go-around',
  'mooring-approach',
  'mooring-pickup',
  'outboard-motors',
  'fueling-safety',
  'motoring-etiquette',
] as const;

export type ConceptId = (typeof CONCEPT_IDS)[number];
