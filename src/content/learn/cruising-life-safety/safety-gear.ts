import type { Lesson } from '../types';

/** Step 1 skeleton — see `responsibility-aboard.ts`. */
export const lesson: Lesson = {
  id: 'cruising-life-safety-safety-gear',
  moduleId: 'cruising-life-safety',
  order: 3,
  title: 'Safety Gear: Required & Recommended',
  intro:
    'Some equipment a boat must carry because the law says so, and some she should carry because a prudent skipper would not leave the dock without it.',
  concepts: ['safety-equipment-readiness'],
  blocks: [
    { kind: 'heading', text: 'Placeholder heading' },
    {
      kind: 'text',
      text: 'Placeholder lesson body. Planned coverage falls in two deliberately separate halves. Federally required carriage: flotation devices, a throwable device, visual distress signals, a sound-producing device, and fire extinguishers kept in serviceable condition. Prudent additions a cruising boat carries by choice: a first-aid kit, a handheld flashlight, a backup handheld radio, and tools and spares. Step 2 verifies the regulatory half against current primary regulation before any figure or requirement is stated.',
    },
  ],
};
