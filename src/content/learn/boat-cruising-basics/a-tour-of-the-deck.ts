import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'boat-cruising-basics-a-tour-of-the-deck',
  moduleId: 'boat-cruising-basics',
  order: 3,
  title: 'A Tour of the Deck',
  intro: 'A walk forward from the cockpit to the bow, naming what is underfoot, what is to hand, and what is holding the rig up.',
  concepts: ['deck-hardware-and-rigging-attachments'],
  blocks: [
    { kind: 'heading', text: 'Leaving the cockpit' },
    { kind: 'text', text: 'A boat’s deck is a working surface with obstacles on it, and the way to learn it is to walk it. Step over the cockpit coaming and you are on the sidedeck — the strip of deck running between the coach roof and the outer edge of the hull. It is narrower than it looks, it is the only route forward on most boats, and it slopes outboard.' },
    { kind: 'text', text: 'Along the outer edge runs the toerail, a raised strip — often aluminium, sometimes moulded — that gives your foot something to push against when the boat is heeled. Just inboard of it stand the stanchions, vertical posts bolted through the deck, and threaded through them are the lifelines: wires or covered cable running fore and aft, with the upper one somewhere around hip height on a standing adult. That is lower than it feels, and lifelines are a barrier, not a handhold. They keep you from going over the side, but they flex, and leaning your weight outboard against one is a poor habit.' },
    {
      kind: 'figure',
      assetId: 'custom-deck-plan-labelled',
      caption: 'The deck from above, bow to the left — the map for the walk that follows. The sidedeck is the strip running between the coach roof and the toerail at the outer edge, and the stanchions carrying the lifelines stand just inboard of that rail. Most of the fittings met later in the lesson are named here in the places they are found.',
    },
    { kind: 'text', text: 'The handrails on top of the coach roof are the real handholds. They are inboard, they are through-bolted, and they are rigid. Working your way forward along them keeps your weight low and toward the centreline of the boat, which is where you want it.' },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'One hand for the ship, one for yourself',
      text: 'Move deliberately on deck, never at a run. Keep at least one hand on a fixed handhold at all times, stay low, and plan the next handhold before you let go of the last one. Going forward on the windward — higher — side keeps you falling into the boat rather than out of it. A deck that feels perfectly stable alongside the dock behaves very differently once the boat is moving and heeled.',
    },
    { kind: 'heading', text: 'Deck fittings along the way' },
    { kind: 'text', text: 'The metal fittings on the deck are mostly there for lines. Cleats — the horned fittings you tie to — are set near the bow, near the stern, and often amidships, and they take docklines, spring lines and mooring lines. Beside them you will find chocks, also called fairleads: smooth-throated fittings that guide a line over the edge of the deck at the right angle and keep it from sawing on the toerail.' },
    { kind: 'text', text: 'Running fore and aft along the sidedeck on many boats is a jibsheet track, a length of perforated rail carrying a sliding car with a block on it. The headsail sheet runs through that block on its way aft to a winch, and moving the car changes the angle of pull. Identifying it is the point here; setting it is trimming, and belongs to Sails & Trim.' },
    { kind: 'heading', text: 'Where the rig meets the boat' },
    { kind: 'text', text: 'Abreast of the mast you will come to the shrouds — the wires running from the mast down to the deck on each side, which hold the mast up sideways. Follow one down and you can see the whole load path in a few inches of hardware.' },
    {
      kind: 'definition',
      term: 'Chainplate',
      text: 'The strong metal plate through-bolted to the hull or deck structure that a shroud or stay ultimately attaches to. It is what carries rigging loads out of the wire and into the structure of the boat.',
    },
    {
      kind: 'definition',
      term: 'Turnbuckle',
      text: 'The threaded fitting between the lower end of a shroud and its chainplate. Turning its barrel draws the two threaded ends together or apart, so the shroud can be tightened or slackened.',
    },
    {
      kind: 'figure',
      assetId: 'photo-chainplate',
      caption: 'A chainplate at deck level, its base plate through-bolted into the structure beneath. The turnbuckle and shroud pin to one of the holes in the upstanding tang, so the whole load of that piece of rigging arrives here and passes into the boat.',
    },
    { kind: 'text', text: 'Two small details are worth noticing on a walk-around. A turnbuckle is normally secured against unscrewing itself — commonly by cotter pins through the threaded ends — and a chainplate penetrates the deck, so the sealant around it is a place where water gets in if it is neglected. Both belong to Seamanship for inspection and tuning; here it is enough to know what they are, where they are, and that they are highly loaded.' },
    { kind: 'heading', text: 'The foredeck' },
    { kind: 'text', text: 'Forward of the mast the deck opens out into the foredeck. It is the widest clear space on the boat and the least sheltered. Around its edge, the bow pulpit is the stainless framework at the very front; its counterpart aft is the stern pulpit. Both are structural terminations for the lifelines as well as something to brace against.' },
    { kind: 'text', text: 'A hatch in the foredeck usually opens into the anchor locker, the compartment where the anchor rode is stowed. Right at the tip of the bow is the stemhead fitting, a substantial metal fabrication capping the stem. It typically anchors the forestay, and it usually incorporates a bow roller — a grooved wheel that lets the anchor and its rode run out over the bow without chafing on the hull.' },
    {
      kind: 'figure',
      assetId: 'custom-stemhead-bow-roller',
      caption: 'The bow in profile, with the fitting capping the tip of the stem. The anchor rode runs up from the anchor stowed on deck and over the roller in that fitting, clearing the hull instead of chafing across it.',
    },
    { kind: 'text', text: 'Handling anchors and using the windlass are Hands-On Cruising material. For this module the foredeck and anchor locker are places on the boat, and the stemhead fitting is a piece of hardware you can name and point to.' },
    {
      kind: 'list',
      items: [
        'Sidedeck, toerail, stanchions, lifelines — the route forward and its edge.',
        'Handrails on the coach roof — the handholds you should actually be using.',
        'Cleats and chocks — where lines are made fast and where they leave the boat.',
        'Jibsheet track — the sliding lead for the headsail sheet.',
        'Shrouds, turnbuckles, chainplates — the rig’s load path into the hull.',
        'Bow and stern pulpits, foredeck, anchor locker, stemhead fitting — the ends of the boat.',
      ],
    },
  ],
};
