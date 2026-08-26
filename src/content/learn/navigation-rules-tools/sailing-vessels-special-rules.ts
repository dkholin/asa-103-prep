import type { Lesson } from '../types';

/**
 * Draft skeleton. Structure, ordering and concept tags are final; the teaching
 * copy and any figures are still to be written.
 */
export const lesson: Lesson = {
  id: 'navigation-rules-tools-sailing-vessels-special-rules', moduleId: 'navigation-rules-tools', order: 3,
  title: 'Sailing Vessels & Special Rules',
  intro: 'Sail-on-sail right of way, where a sailing vessel sits in the general hierarchy, and the places the ordinary answer does not apply.',
  concepts: ['sailing-vessel-encounters', 'vessel-status-hierarchy', 'narrow-channels-traffic-separation', 'motorsailing'],
  blocks: [
    { kind: 'callout', tone: 'note', title: 'Draft lesson', text: 'This lesson is an outline. The Practice questions below are already mapped to its concepts and work today; the written explanation is still being drafted.' },
    { kind: 'text', text: 'Planned coverage: Port and starboard tack, windward and leeward, the Rule 18 hierarchy, narrow channels and traffic separation schemes, and why motorsailing changes your status.' },
  ],
};
