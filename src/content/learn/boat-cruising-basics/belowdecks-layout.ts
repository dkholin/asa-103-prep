import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'boat-cruising-basics-belowdecks-layout',
  moduleId: 'boat-cruising-basics',
  order: 5,
  title: 'Belowdecks: Living Space & Layout',
  intro: 'The spaces under the companionway, what each one is called, and how a cruising interior is fitted into the shape of a hull.',
  concepts: ['belowdecks-layout'],
  blocks: [
    { kind: 'heading', text: 'Down the companionway' },
    {
      kind: 'definition',
      term: 'Companionway',
      text: 'The main entrance between the cockpit and the cabin: a hatch, usually with a sliding cover and removable boards, and a short ladder or set of steps leading below.',
    },
    { kind: 'text', text: 'It sits at the forward end of the cockpit, and everything belowdecks is described in relation to it. Go down the steps and you are in the interior of the hull, which is a very different design problem from a house. The space is not rectangular, it moves, and nothing may be left free to slide. So a cruising interior is built as a set of fitted compartments, and almost every surface does two jobs.' },
    {
      kind: 'figure',
      assetId: 'custom-cabin-layout',
      caption: 'A simplified plan seen from above, bow to the left: the V-berth filling the point of the bow, the head to one side of it, the saloon amidships, the galley aft of that, and the companionway leading up to the cockpit. Real interiors carry more than this — the running order of the spaces is the part that generalises.',
    },
    { kind: 'heading', text: 'The main living spaces' },
    { kind: 'text', text: 'The saloon is the main cabin, usually amidships, with settees along each side around a table. It is the living room, the dining room and, since the settees are long enough to sleep on, extra berths for the crew. It is where most of the boat’s daylight and headroom is, because the coach roof above it is what created them.' },
    { kind: 'text', text: 'The galley is the cooking area — never the kitchen — normally close to the companionway so the cook has ventilation, a way out, and a place to brace. It is fitted with a stove, commonly gimballed so it stays level as the boat heels, a sink, and stowage for food and cookware.' },
    { kind: 'text', text: 'The head is the bathroom, and the word is used for both the compartment and the marine toilet in it. On a boat of this size it is typically a small enclosed space holding a toilet, a basin and a handheld shower, all in about the footprint of a shower stall ashore.' },
    { kind: 'text', text: 'The chart table, or nav station, is a desk dedicated to navigation, usually near the companionway and often facing the galley across the cabin. Charts, instruments and pilot books live there. It also tends to be where the electrical panel is mounted, which makes it the practical nerve centre of the boat — a point the systems lesson comes back to.' },
    { kind: 'heading', text: 'Berths and cabins' },
    { kind: 'text', text: 'A bed aboard is a berth, and an enclosed sleeping cabin is a stateroom. Two arrangements are worth naming because the words describe the shape of the space rather than the furniture in it.' },
    {
      kind: 'list',
      items: [
        'V-berth — the berth filling the forward stateroom, right in the bow. It is V-shaped because the hull narrows toward the stem, so the two sides converge at the forward end.',
        'Quarter berth — a berth tucked aft into the quarter of the boat, running under the cockpit seat or sole. It is long, snug and low, close to the centreline, and often the most comfortable berth at sea for exactly those reasons.',
      ],
    },
    { kind: 'text', text: 'On smaller boats the saloon settees may be the only other berths. On larger ones the after quarters open out into a full stateroom of their own.' },
    { kind: 'heading', text: 'Structure and stowage' },
    { kind: 'text', text: 'The partitions dividing the interior into compartments are bulkheads. Some are just joinery, but others are structural: the main bulkhead near the forward end of the saloon typically braces the hull against the loads the mast and rigging put into it, so it is part of the boat, not part of the furniture.' },
    { kind: 'text', text: 'The floor you walk on is the cabin sole. Beneath it is the bilge, the lowest interior space of the hull, and lifting a floorboard is how you get to it.' },
    {
      kind: 'definition',
      term: 'Bilge',
      text: 'The lowest part of the boat’s interior, below the cabin sole. Any water that gets aboard — rain, spray, a drip from a fitting — runs down and collects there, which is why it is also where the bilge pumps live.',
    },
    { kind: 'text', text: 'Stowage fills everything left over. Lockers are fitted behind and beneath the settees, around the galley and in the head, and the cushions lift off flat surfaces that turn out to be bins underneath. A cabinet aboard is called a locker for a reason: its door needs a catch that actually holds when the boat heels, or the contents end up on the sole.' },
    { kind: 'heading', text: 'Light and air' },
    { kind: 'text', text: 'A sealed hull is dark and gets humid fast, so a cruising boat is full of carefully engineered holes. Openings cut in the deck are hatches; they let in light and air and serve as access, and the large one over the saloon or V-berth doubles as an escape route. Fixed windows in the cabin or hull sides are deadlights; ones that open are portlights or opening ports.' },
    { kind: 'text', text: 'Because every one of these has to be shut in rough weather, most cruising boats also carry ventilation that works when they are closed. The usual solution is a dorade vent — a cowl mounted on a box with internal baffles, arranged so air passes through but water that comes aboard drains back out rather than running below.' },
    {
      kind: 'callout',
      tone: 'note',
      title: 'Every interior is different',
      text: 'Belowdecks is where cruising boats vary most. Galleys move from port to starboard, heads swap ends, chart tables face different ways, and open-plan modern interiors combine spaces that older boats separate. Learn the names of the spaces and the general bow-to-stern sequence, then find each one on the boat you actually step aboard rather than expecting a standard plan.',
    },
  ],
};
