import type { Lesson } from '../types';

/**
 * Step 1 skeleton. Final id, order, title and concept tags; the teaching copy,
 * the research pass and any figures are Steps 2/3. Enough structure to render,
 * navigate, drive progress and exercise concept resolution — no more.
 */
export const lesson: Lesson = {
  id: 'hands-on-cruising-holding-a-course',
  moduleId: 'hands-on-cruising',
  order: 1,
  title: 'Holding a Course',
  intro:
    'Steering a boat is mostly a matter of noticing that she has wandered before anyone else does, and putting her back with a very small movement of the helm.',
  concepts: ['steering-a-course'],
  blocks: [
    { kind: 'heading', text: 'Placeholder heading' },
    {
      kind: 'text',
      text: 'Placeholder lesson body. Planned coverage: steering to a selected heading with small helm inputs, steering to a visual mark, checking the compass rather than staring at it, turning onto a new heading, noticing and correcting course error, using transits and ranges as visual references, and reading leeway as an observed course-keeping error. Compass construction, variation and deviation, plotting and bearings belong to Navigation Rules & Tools; points of sail and tactical sailing belong to Sails & Trim.',
    },
  ],
};
