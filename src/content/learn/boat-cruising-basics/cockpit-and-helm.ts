import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'boat-cruising-basics-cockpit-and-helm',
  moduleId: 'boat-cruising-basics',
  order: 2,
  title: 'The Cockpit & Helm',
  intro: 'The working space you will spend most of your time in, and how a cruising cockpit is arranged around the job of sailing the boat.',
  concepts: ['cockpit-layout'],
  blocks: [
    { kind: 'heading', text: 'The cockpit is a workspace first' },
    { kind: 'text', text: 'The cockpit is the recessed well aft of the coach roof where the crew sits, steers and handles lines. In harbour it becomes the boat’s porch and dining room, but its proportions are set by working needs: the seats are spaced so a crew member can brace across the boat when it heels, the sole is low enough to keep everyone’s weight down, and the raised sides — the coamings — give something to sit on, lean against and shelter behind.' },
    { kind: 'text', text: 'Because the cockpit is a hollow in an otherwise watertight deck, the first design question is what happens to water that lands in it.' },
    { kind: 'heading', text: 'A self-bailing cockpit' },
    {
      kind: 'definition',
      term: 'Self-bailing cockpit',
      text: 'A cockpit whose sole sits above the waterline and is sealed from the interior, so that any water shipped aboard drains overboard by gravity through drains in the sole rather than into the boat.',
    },
    { kind: 'text', text: 'Those drains are usually called scuppers. On many boats they lead through hoses to fittings in the hull or transom, and the arrangement is deliberately crossed on some designs so a drain stays above water when the boat heels. Nothing is pumped and nothing is switched on; the cockpit empties because it is higher than the sea. What matters at this stage is recognising the concept — a cockpit that fills with a wave is meant to empty itself, and the drains that let it do so need to stay clear.' },
    { kind: 'heading', text: 'The helm station' },
    { kind: 'text', text: 'The helm is where the boat is steered. Cruising boats of this size are commonly steered by a wheel mounted on a pedestal near the after end of the cockpit, though tiller steering is entirely normal and is what most smaller boats use. A tiller is a lever attached directly to the top of the rudder; a wheel works through a mechanism between the two. The lesson on Steering & the Rudder covers what sits between them and why the choice is made.' },
    { kind: 'text', text: 'What the helm position dictates is where the helmsman ends up. With a tiller you sit forward and to one side, facing partly aft, tucked in among the crew. With a wheel you sit or stand further aft and see over the coach roof, which is why wheel-steered boats often have a dedicated helm seat at the transom. Either way, the helmsman needs an unobstructed view forward, so the rest of the cockpit is arranged not to block it.' },
    { kind: 'callout', tone: 'note', title: 'Your boat will differ in the details', text: 'Cockpit arrangements vary a great deal between builders and model years — how many lockers, where the winches sit, whether the traveler crosses the cockpit or the coach roof. Learn the pattern here, then walk your own boat and find each item on it before you need it. Asking the skipper "where does this one drain?" or "which locker is the steering in?" on a quiet morning is a lot easier than working it out later.' },
    { kind: 'heading', text: 'Lockers and access' },
    { kind: 'text', text: 'Most cruising cockpits have at least one locker built into the seating, opening through a hinged lid. These are the boat’s general stowage for the gear you use on deck: fenders, docklines, buckets, tools, spare line, and cleaning kit. A deep locker on one side is common; a shallower one on the other side is often shallow because the engine or a berth is directly beneath it.' },
    { kind: 'text', text: 'Cockpit lockers do a second job that is easy to overlook. On many boats they are the way in to spaces you cannot otherwise reach — the back of the engine compartment, and very often the top of the rudder post and the steering gear. That is where the emergency tiller is fitted when it is needed, which is one reason a locker crammed to the lid is worse than an organised one.' },
    {
      kind: 'list',
      items: [
        'Deck gear you use often: fenders, docklines, boat hook.',
        'Bulky items with nowhere better: buckets, spare line, cleaning kit.',
        'Access to the steering gear and rudder post on many boats.',
        'Access to parts of the engine space on many boats.',
      ],
    },
    { kind: 'heading', text: 'Sail controls around the cockpit' },
    { kind: 'text', text: 'You will also find sail-handling hardware within reach of the cockpit, because on most modern cruising boats the control lines are led aft so they can be worked without going forward. Recognise the fittings now and their use will make sense when you come to trim.' },
    {
      kind: 'list',
      items: [
        'Winches — drum-shaped and turned with a removable handle, mounted on the coamings for the headsail sheets and often on the coach roof for lines coming aft.',
        'Rope clutches — banks of levers, usually just forward of a winch, that hold a line under load so the winch can be used for the next one.',
        'Traveler — a track carrying a sliding car for the mainsheet, running athwartships either across the cockpit or over the coach roof.',
        'Turning blocks and organisers — the pulleys and guides that route halyards and control lines aft along the coach roof.',
      ],
    },
    { kind: 'text', text: 'Locating them is enough for now. Which line runs through which clutch, and what each one does to the shape of a sail, belongs to Sails & Trim.' },
  ],
};
