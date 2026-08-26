import type { Lesson } from '../types';

/**
 * Draft skeleton. Structure, ordering and concept tags are final; the teaching
 * copy and any figures are still to be written.
 */
export const lesson: Lesson = {
  id: 'navigation-rules-tools-distance-speed-time-electronics', moduleId: 'navigation-rules-tools', order: 9,
  title: 'Distance, Speed, Time & Electronic Navigation',
  intro: 'Measuring how far and how long, and where the electronics fit alongside the paper.',
  concepts: ['distance-speed-time', 'electronic-navigation'],
  blocks: [
    { kind: 'callout', tone: 'note', title: 'Draft lesson', text: 'This lesson is an outline. The Practice questions below are already mapped to its concepts and work today; the written explanation is still being drafted.' },
    { kind: 'text', text: 'Planned coverage: The nautical mile and the latitude scale, walking dividers along a track, the distance-speed-time relationship, and how GPS, chartplotters and depth sounders support rather than replace the chart.' },
  ],
};
