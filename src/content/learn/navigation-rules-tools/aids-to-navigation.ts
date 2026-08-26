import type { Lesson } from '../types';

/**
 * Draft skeleton. Structure, ordering and concept tags are final; the teaching
 * copy and any figures are still to be written.
 */
export const lesson: Lesson = {
  id: 'navigation-rules-tools-aids-to-navigation', moduleId: 'navigation-rules-tools', order: 6,
  title: 'Aids to Navigation',
  intro: 'The buoys, beacons and markers that tell you where the water is and what to keep clear of.',
  concepts: ['lateral-system-aton', 'buoys-beacons-and-lights', 'regulatory-markers'],
  blocks: [
    { kind: 'callout', tone: 'note', title: 'Draft lesson', text: 'This lesson is an outline. The Practice questions below are already mapped to its concepts and work today; the written explanation is still being drafted.' },
    { kind: 'text', text: 'Planned coverage: The IALA Region B lateral system, buoy versus beacon, light characteristics and their chart abbreviations, and the regulatory markers that carry non-lateral meaning.' },
  ],
};
