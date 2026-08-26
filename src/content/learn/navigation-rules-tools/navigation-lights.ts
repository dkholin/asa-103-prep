import type { Lesson } from '../types';

/**
 * Draft skeleton. Structure, ordering and concept tags are final; the teaching
 * copy and any figures are still to be written.
 */
export const lesson: Lesson = {
  id: 'navigation-rules-tools-navigation-lights', moduleId: 'navigation-rules-tools', order: 4,
  title: 'Navigation Lights',
  intro: 'Reading a vessel\'s lights at night to work out what she is, where she is heading, and what she is doing.',
  concepts: ['navigation-lights', 'special-vessel-lights'],
  blocks: [
    { kind: 'callout', tone: 'note', title: 'Draft lesson', text: 'This lesson is an outline. The Practice questions below are already mapped to its concepts and work today; the written explanation is still being drafted.' },
    { kind: 'text', text: 'Planned coverage: Sidelights, masthead lights and sternlights on power and sail; the all-round light combinations that mark anchored, fishing, not-under-command and restricted-in-ability-to-maneuver vessels.' },
  ],
};
