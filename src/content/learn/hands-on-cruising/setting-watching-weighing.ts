import type { Lesson } from '../types';

/** Step 1 skeleton — see `holding-a-course.ts`. */
export const lesson: Lesson = {
  id: 'hands-on-cruising-setting-watching-weighing',
  moduleId: 'hands-on-cruising',
  order: 3,
  title: 'Setting, Watching & Weighing',
  intro:
    'Anchoring is a sequence carried out by two people who cannot easily hear each other, and it is not finished when the anchor lands on the bottom.',
  concepts: ['setting-and-weighing-anchor', 'anchor-watch-and-dragging'],
  blocks: [
    { kind: 'heading', text: 'Placeholder heading' },
    {
      kind: 'text',
      text: 'Placeholder lesson body. Planned coverage: preparing and deploying the anchor, setting it and confirming it has set, coordination between foredeck and helm, keeping an anchor watch, recognising that the boat is dragging and what to do about it, and weighing the anchor — with the windlass treated at a practical level. Engine-handling theory belongs to Motoring, VHF distress to Cruising Life & Safety, and windlass maintenance to neither.',
    },
  ],
};
