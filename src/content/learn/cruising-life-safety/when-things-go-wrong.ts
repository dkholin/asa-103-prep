import type { Lesson } from '../types';

/** Step 1 skeleton — see `responsibility-aboard.ts`. */
export const lesson: Lesson = {
  id: 'cruising-life-safety-when-things-go-wrong',
  moduleId: 'cruising-life-safety',
  order: 6,
  title: 'Fire, Flooding & Calling for Help',
  intro:
    'Fire and flooding both give a crew very little time, so the response has to be decided before it is needed rather than worked out on the spot.',
  concepts: ['fire-and-flooding-response', 'distress-communications', 'crew-injury-response'],
  blocks: [
    { kind: 'heading', text: 'Placeholder heading' },
    {
      kind: 'text',
      text: 'Placeholder lesson body. Planned coverage: preventing fire aboard and what to do when one starts, recognising flooding and finding its source, calling for help on VHF and the MAYDAY procedure, and the immediate priorities when a crew member is injured. Crew overboard, hypothermia, grounding and a dragging anchor belong to Hands-On Cruising.',
    },
  ],
};
