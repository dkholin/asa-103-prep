import type { Lesson } from '../types';

/** Step 1 skeleton — see `responsibility-aboard.ts`. */
export const lesson: Lesson = {
  id: 'cruising-life-safety-staying-on-the-boat',
  moduleId: 'cruising-life-safety',
  order: 2,
  title: 'Staying On the Boat',
  intro:
    'The surest way to survive going overboard is never to go over in the first place, which is what on-deck safety is really about.',
  concepts: ['personal-on-deck-safety'],
  blocks: [
    { kind: 'heading', text: 'Placeholder heading' },
    {
      kind: 'text',
      text: 'Placeholder lesson body. Planned coverage: moving safely about the deck, choosing a flotation device that fits and is ready to hand, when to actually wear one, the safety harness, the tether and its clips, jacklines and their run, and a clipping strategy that keeps a crew member attached from cockpit to foredeck.',
    },
  ],
};
