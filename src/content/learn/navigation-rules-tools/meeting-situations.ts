import type { Lesson } from '../types';

/**
 * Draft skeleton. Structure, ordering and concept tags are final; the teaching
 * copy and any figures are still to be written.
 */
export const lesson: Lesson = {
  id: 'navigation-rules-tools-meeting-situations', moduleId: 'navigation-rules-tools', order: 2,
  title: 'Meeting Situations: Overtaking, Head-On, Crossing',
  intro: 'The three power-driven encounters the Rules name, and who does what in each.',
  concepts: ['overtaking-situation', 'head-on-situation', 'crossing-situation'],
  blocks: [
    { kind: 'callout', tone: 'note', title: 'Draft lesson', text: 'This lesson is an outline. The Practice questions below are already mapped to its concepts and work today; the written explanation is still being drafted.' },
    { kind: 'text', text: 'Planned coverage: Recognizing overtaking, head-on and crossing geometry, the duty each one assigns, and the doubt rules that resolve an ambiguous encounter.' },
  ],
};
