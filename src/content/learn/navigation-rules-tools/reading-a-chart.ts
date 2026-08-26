import type { Lesson } from '../types';

/**
 * Draft skeleton. Structure, ordering and concept tags are final; the teaching
 * copy and any figures are still to be written.
 */
export const lesson: Lesson = {
  id: 'navigation-rules-tools-reading-a-chart', moduleId: 'navigation-rules-tools', order: 7,
  title: 'Reading a Nautical Chart',
  intro: 'What the printed page is telling you: symbols, depths, and the coordinate grid every position is stated in.',
  concepts: ['chart-symbols', 'soundings-and-chart-datum', 'latitude-longitude'],
  blocks: [
    { kind: 'callout', tone: 'note', title: 'Draft lesson', text: 'This lesson is an outline. The Practice questions below are already mapped to its concepts and work today; the written explanation is still being drafted.' },
    { kind: 'text', text: 'Planned coverage: Chart title block and margins, hazard and seabed symbols, soundings and chart datum, depth contours and shading, and reading latitude and longitude off the borders.' },
  ],
};
