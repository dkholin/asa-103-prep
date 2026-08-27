import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'boat-cruising-basics-anatomy-of-a-cruising-boat',
  moduleId: 'boat-cruising-basics',
  order: 1,
  title: 'Anatomy of a Cruising Boat',
  intro: 'The outside of the boat, end to end, and the names you will hear used for each part of it.',
  concepts: ['boat-anatomy-and-terms'],
  blocks: [
    { kind: 'heading', text: 'What makes a boat a cruising boat' },
    { kind: 'text', text: 'A cruising sailboat is one you can live aboard while you travel in it. That is the whole definition: it has enclosed accommodation, it carries its own water, fuel and power, and it is built to keep a crew fed and rested away from the dock. Length is not what decides it. Cruising boats range from compact weekenders to serious ocean boats, and the same vocabulary applies across all of them.' },
    { kind: 'text', text: 'What separates one from the small open keelboat or dinghy you may have learned on is mostly enclosure and self-sufficiency. The open boat is a cockpit and a rig. The cruiser adds a cabin under a raised deck, a galley and berths inside it, an auxiliary engine, plumbing, batteries, and the stowage to keep it all aboard. Everything is heavier, and everything is arranged so it can be worked by a small crew.' },
    {
      kind: 'table',
      caption: 'The same sail, a different boat around it',
      headers: ['', 'Small open keelboat', 'Cruising sailboat'],
      rows: [
        ['Below deck', 'Open, or a shallow cuddy', 'Enclosed cabin you can stand and sleep in'],
        ['Range', 'Hours, within sight of the ramp', 'Days or weeks, carrying its own supplies'],
        ['Auxiliary power', 'Often none, or a small outboard', 'An inboard engine as standard equipment'],
        ['Systems', 'Essentially none', 'Fresh water, waste, DC electrics, bilge pumps'],
        ['Crew loads', 'Handled by hand', 'Winches, clutches and purchases to manage the loads'],
      ],
    },
    { kind: 'heading', text: 'From bow to stern' },
    { kind: 'text', text: 'Start at the front. The bow is the forward end of the boat, and the stem is its leading edge — the part that cuts the water. Walk aft along the hull, the watertight shell that holds everything up, and you reach the stern, the after end. On most cruising boats the stern is closed off by a flat or gently curved panel called the transom, which is where you will find the swim ladder, the stern light and, on smaller boats, an outboard bracket.' },
    { kind: 'definition', term: 'Transom', text: 'The surface that forms the aft face of the hull, closing off the stern. Not to be confused with the stem at the opposite end, or with the keel underneath.' },
    { kind: 'text', text: 'Two things hang below the hull. The keel is the ballasted fin on the centreline; its weight is most of what keeps the boat upright, and its area is what stops the boat sliding sideways through the water. Aft of it, the rudder is the steerable blade that turns the boat — a separate structure on most modern designs, and the subject of its own lesson later in this module.' },
    { kind: 'heading', text: 'The deck and what sits on it' },
    { kind: 'text', text: 'The deck is the walking surface that caps the hull. Forward of the mast it is called the foredeck; the narrow strips running down each side are the sidedecks. Amidships the deck rises into a coach roof — also called a trunk cabin — which is simply the raised structure that buys headroom for the cabin below. Aft of that is the cockpit, the recessed well where the crew sits and steers, and at its forward end the companionway, the hatch and ladder that lead below.' },
    {
      kind: 'list',
      items: [
        'Bow and stem — the forward end and its leading edge.',
        'Hull, keel and rudder — the shell, the ballasted fin, and the steering blade.',
        'Transom and stern — the after end of the boat.',
        'Foredeck, sidedeck and coach roof — the deck forward, along the sides, and raised over the cabin.',
        'Cockpit and companionway — where the crew works, and the way below.',
        'Mast and boom — the vertical spar and the horizontal one at its foot, useful as landmarks for describing where anything else is.',
      ],
    },
    { kind: 'text', text: 'Those last two are worth fixing in mind even before you touch a sail, because almost every instruction you are given aboard is positional: forward of the mast, aft of the companionway, outboard of the coach roof. The rig doubles as the boat’s system of coordinates.' },
    { kind: 'heading', text: 'Scale changes everything but the names' },
    { kind: 'text', text: 'The illustrations and examples in this module describe a boat of roughly thirty-three feet, which is a common size for a cruising boat used for instruction. That is the working example, not a definition — plenty of cruising boats are considerably smaller or larger, and the parts are named identically on all of them.' },
    { kind: 'callout', tone: 'note', title: 'What does change with size is force', text: 'A bigger boat carries more sail, more ballast and more mass. The loads in a sheet, the momentum you carry into a berth, and the sheer weight of an anchor or a sail all scale up with it. That is why a cruising boat has winches and clutches where a dinghy has a hand on a rope: the gear grows because the forces do. Nothing you learn about handling a small boat becomes wrong on a larger one, but everything happens harder and slower.' },
  ],
};
