import type { Lesson } from '../types';

/** Step 1 skeleton — see `holding-a-course.ts`. */
export const lesson: Lesson = {
  id: 'hands-on-cruising-crew-overboard',
  moduleId: 'hands-on-cruising',
  order: 5,
  title: 'Crew Overboard & Cold Water',
  intro:
    'A crew overboard is the one emergency where the first ten seconds of the response decide whether the rest of it is possible at all.',
  concepts: ['crew-overboard-recovery', 'cold-water-immersion'],
  blocks: [
    { kind: 'heading', text: 'Placeholder heading' },
    {
      kind: 'text',
      text: 'Placeholder lesson body. Planned coverage: the immediate actions on hearing the shout, keeping visual contact and dedicating a spotter, crew roles, the recovery manoeuvre at ASA 103 level, the final approach, and getting the casualty back aboard — followed by what cold water does to a person in the water, recognising hypothermia, and handling a casualty carefully. PFD selection, harnesses and jacklines, the MAYDAY structure and general first aid belong to Cruising Life & Safety.',
    },
  ],
};
