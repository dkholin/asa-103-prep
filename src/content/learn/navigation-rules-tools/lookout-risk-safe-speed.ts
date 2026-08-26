import type { Lesson } from '../types';

/**
 * Draft skeleton. Structure, ordering and concept tags are final; the teaching
 * copy and any figures are still to be written.
 */
export const lesson: Lesson = {
  id: 'navigation-rules-tools-lookout-risk-safe-speed', moduleId: 'navigation-rules-tools', order: 1,
  title: 'Lookout, Risk & Safe Speed',
  intro: 'How the Rules expect you to watch, judge whether a risk of collision exists, and pick a speed that leaves you able to act.',
  concepts: ['lookout-and-risk-of-collision', 'safe-speed', 'stand-on-give-way', 'avoiding-action'],
  blocks: [
    { kind: 'callout', tone: 'note', title: 'Draft lesson', text: 'This lesson is an outline. The Practice questions below are already mapped to its concepts and work today; the written explanation is still being drafted.' },
    { kind: 'text', text: 'Planned coverage: Proper lookout, the steady-bearing test for risk of collision, safe speed under Rule 6, the stand-on and give-way roles, and what counts as early, substantial avoiding action.' },
  ],
};
