import type { LearnModule } from './types';

/**
 * Course modules in study order. These are app-friendly labels following the
 * broad ASA 103 textbook progression — deliberately not the Practice
 * question-bank topic taxonomy in `src/content/topics.ts`. Learn and Practice
 * organise the same material differently on purpose and meet only through
 * concept ids.
 *
 * A `coming-soon` module has no lessons and is not openable.
 */
export const MODULES: LearnModule[] = [
  {
    id: 'boat-cruising-basics',
    title: 'Boat & Cruising Basics',
    blurb: 'How a cruising boat is put together and what everything is called',
    status: 'published',
  },
  {
    id: 'motoring',
    title: 'Motoring',
    blurb: 'The auxiliary engine, propeller effects, handling under power, and docking',
    status: 'published',
  },
  {
    id: 'cruising-life-safety',
    title: 'Cruising Life & Safety',
    blurb: 'Living aboard, onboard systems, required gear, and emergency response',
    status: 'published',
  },
  {
    id: 'sails-trim',
    title: 'Sails & Trim',
    blurb: 'Sail plan, trimming for each point of sail, reefing, and heavy air',
    status: 'published',
  },
  {
    id: 'navigation-rules-tools',
    title: 'Navigation Rules & Tools',
    blurb: 'Right of way, lights and sounds, charts, and aids to navigation',
    status: 'published',
  },
  {
    id: 'hands-on-cruising',
    title: 'Hands-On Cruising',
    blurb: 'Anchoring, mooring, crew overboard, and the drills you practise afloat',
    status: 'coming-soon',
  },
  {
    id: 'seamanship',
    title: 'Seamanship',
    blurb: 'Lines and knots, boat handling judgement, and looking after the boat',
    status: 'coming-soon',
  },
  {
    id: 'cruise-planning-independence',
    title: 'Cruise Planning & Independence',
    blurb: 'Weather, passage planning, and skippering a cruise on your own',
    status: 'coming-soon',
  },
];
