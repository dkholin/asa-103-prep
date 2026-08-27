import type { Lesson } from '../types';

/** Step 1 skeleton — see `responsibility-aboard.ts`. */
export const lesson: Lesson = {
  id: 'cruising-life-safety-power-fuel-hazards',
  moduleId: 'cruising-life-safety',
  order: 5,
  title: 'Power, Fuel & Invisible Hazards',
  intro:
    'The hazards that hurt people aboard are often the ones nobody can see: a heavy fuel vapour in the bilge, exhaust in the cockpit, a battery quietly running flat.',
  concepts: ['power-and-invisible-hazards'],
  blocks: [
    { kind: 'heading', text: 'Placeholder heading' },
    {
      kind: 'text',
      text: 'Placeholder lesson body. Planned coverage: budgeting the house battery bank over a cruise, a practical overview of shorepower safety, why fuel vapour behaves the way it does and where it collects, carbon monoxide and exhaust around the boat, and awareness of oil discharge. Engine starting, fuelling procedure, blower operation and the controls themselves stay with Motoring.',
    },
  ],
};
