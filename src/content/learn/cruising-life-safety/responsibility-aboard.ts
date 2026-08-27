import type { Lesson } from '../types';

/**
 * Step 1 skeleton. The id, order, title and concept tags are final; the copy
 * below is a neutral placeholder that exists only so the lesson renders and
 * exercises Learn navigation, progress and the Practice resolver. Step 2
 * replaces every block with finished teaching content.
 */
export const lesson: Lesson = {
  id: 'cruising-life-safety-responsibility-aboard',
  moduleId: 'cruising-life-safety',
  order: 1,
  title: 'Who Is Responsible Aboard',
  intro:
    'Every boat has one skipper, and everyone else aboard has a part to play in keeping the boat and her crew safe.',
  concepts: ['crew-briefing', 'skipper-and-crew-responsibility'],
  blocks: [
    { kind: 'heading', text: 'Placeholder heading' },
    {
      kind: 'text',
      text: 'Placeholder lesson body. Planned coverage: the skipper’s authority and final responsibility, the roles crew and passengers take on, what may and may not be delegated, keeping situational awareness aboard, the pre-departure crew briefing, and how a crew learns its roles over a cruise.',
    },
  ],
};
