import type { Lesson } from '../types';

/**
 * Step 1 skeleton. Ids, order, title and concept tags are final; the teaching
 * copy is placeholder and is written in Step 2.
 */
export const lesson: Lesson = {
  id: 'boat-cruising-basics-anatomy-of-a-cruising-boat',
  moduleId: 'boat-cruising-basics',
  order: 1,
  title: 'Anatomy of a Cruising Boat',
  intro: 'Placeholder intro — the exterior mental model and vocabulary of a cruising boat.',
  concepts: ['boat-anatomy-and-terms'],
  blocks: [
    { kind: 'heading', text: 'Placeholder heading' },
    { kind: 'text', text: 'Placeholder lesson body. Planned coverage: hull, keel, rudder, stem, transom, coach roof, foredeck and cockpit on a reference cruising boat.' },
  ],
};
