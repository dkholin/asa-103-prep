import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'cruising-life-safety-staying-on-the-boat',
  moduleId: 'cruising-life-safety',
  order: 2,
  title: 'Staying On the Boat',
  intro:
    'The surest way to survive going overboard is never to go over in the first place, which is what on-deck safety is really about.',
  concepts: ['personal-on-deck-safety'],
  blocks: [
    { kind: 'heading', text: 'The deck is not a floor' },
    {
      kind: 'text',
      text: 'Most of what a cruising boat needs doing can be done from the cockpit, but not all of it. Sooner or later somebody goes forward — to shackle on a halyard, to sort a fouled sheet, to pick up a mooring — and the surface they walk on is sloping, wet, moving in two directions at once and cluttered with hardware. Waves are irregular, so the motion is not a rhythm you settle into; it is a series of small surprises.',
    },
    {
      kind: 'text',
      text: 'The habits that keep people aboard are unremarkable and worth making automatic before they are needed. Go forward along the windward side, where the deck is higher and a slip throws you into the boat rather than away from her. Keep your weight low, and time each step to the boat rather than hurrying and hoping.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'Three points planted',
      text: 'ASA’s phrasing for this is to keep "three points planted". Any three will do — two feet and a hand, or a foot and a knee with a shoulder wedged against the coachroof — because what you are after is being braced in more than one direction at once rather than balanced on two feet. Choose what you brace against with some care. Handrails, shrouds and the mast are structure and will take you; sheets, halyards and the boom are not, and they move without warning.',
    },
    {
      kind: 'text',
      text: 'The other habit is priority. Whatever job sent you forward is the second most important thing you are doing; the first is staying on board. If the two start to compete — the sail wants both hands, the boat has picked up a corkscrewing motion — stop, get secure, and either wait or ask the helm to make the boat easier to work on.',
    },
    { kind: 'heading', text: 'Flotation: wearable and throwable' },
    {
      kind: 'text',
      text: 'Federal regulations divide personal flotation into two categories that do different jobs and are counted separately. A wearable device is put on before anything goes wrong and keeps you afloat from the moment you hit the water. A throwable is not worn at all: it is kept where it can be reached in seconds and thrown to somebody already in the water.',
    },
    {
      kind: 'figure',
      assetId: 'custom-pfd-wearable-throwable',
      caption:
        'Two flotation devices side by side. One is a vest, cut to be worn all day and fastened before you need it; the other is a ring with a line attached, made to be picked up and thrown. They are counted as separate categories under the carriage rules and neither substitutes for the other.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'A note on “Type III” and “Type IV”',
      text: 'You will still hear and see the old Type I–V codes on gear and in older books. The Coast Guard removed them from the carriage and labelling regulations in 2014, and the rules now simply say wearable and throwable; a harmonised set of performance labels is replacing them on new products. Devices approved under the old labels remain approved and still count, so both generations are in circulation. Learn the wearable/throwable distinction — that is the one the regulation turns on.',
    },
    { kind: 'heading', text: 'Fit, and why it decides everything' },
    {
      kind: 'text',
      text: 'A life jacket that does not fit does not work, and the failure is not subtle: in the water a loose device rides up around the wearer’s ears while the wearer slides down inside it. Size is not a comfort preference; it is the whole mechanism.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Put it on and fasten everything — zip, buckles, waist strap, crotch strap if fitted.',
        'Snug the straps down until it is firm rather than merely closed.',
        'Have somebody pull straight up on the shoulders.',
        'If it slides up toward the chin or over the ears, it is too big or too loose. Adjust, or get a different one.',
      ],
    },
    {
      kind: 'text',
      text: 'The same test applies to children, and no amount of goodwill makes an adult jacket work on a small body. Children need devices rated for their weight range, checked on the child rather than assumed from the label.',
    },
    { kind: 'heading', text: 'Carriage, wear, and the difference between them' },
    {
      kind: 'text',
      text: 'Three different kinds of obligation get muddled together here, and keeping them apart is one of the more useful things this module can give you.',
    },
    {
      kind: 'table',
      caption: 'Carriage, wear and seamanship are three separate questions with three separate answers.',
      headers: ['Obligation', 'What it says', 'Where it comes from'],
      rows: [
        [
          'Carriage',
          'One wearable device aboard for every person, readily accessible; plus a throwable on vessels 16 ft and over',
          'Federal regulation, everywhere',
        ],
        [
          'Wear — children',
          'A child under 13 must wear an approved device on a recreational vessel under way, unless below decks or in an enclosed cabin',
          'Federal regulation — but where a state has set its own child wear age, the state rule applies on its waters instead',
        ],
        [
          'Wear — adults',
          'Generally left to judgement on a recreational boat, subject to the skipper’s instruction and to local rules',
          'Seamanship and the skipper, not federal law',
        ],
      ],
    },
    {
      kind: 'definition',
      term: 'Readily accessible',
      text: 'Reachable quickly, by anyone, without hunting. Not locked in a cockpit locker with the key somewhere below, not buried under fenders and a folded awning, and not still in the shrink-wrap it was sold in. If getting one out takes a minute, the requirement is not met in any sense that matters.',
    },
    {
      kind: 'text',
      text: 'For adults, then, the question is not "must I?" but "should I, now?", and the honest difficulty is that conditions change faster than you can go below and dig a jacket out. Three questions cover most of it. Would going in be worse than usual — cold water, heavy clothing, a weak swimmer? Would anyone notice quickly, and could they do much about it — darkness, poor visibility, a crew that is short-handed, tired, or new enough to the boat that a recovery would be slow? And is the chance of going in raised at all — a sea building, no lifelines, or simply that you are about to leave the cockpit? One yes anywhere is reason enough, and so is wanting to.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Inflatables need looking after',
      text: 'An inflatable device is a bladder plus a gas cartridge plus a firing mechanism, and all three can fail quietly. Check the cartridge is full weight and not corroded, that the bobbin or cartridge in an automatic head is within date, and that the bladder holds air. Rearm it after any inflation, deliberate or accidental. A foam jacket needs none of this, which is part of why it is still a reasonable choice.',
    },
    { kind: 'heading', text: 'Harness, tether and jackline' },
    {
      kind: 'text',
      text: 'Flotation is what saves you after you go over. A harness and tether are what stop you going over at all, and at night or in a seaway that is a far better outcome — getting a person back aboard is difficult, slow and by no means certain.',
    },
    {
      kind: 'definition',
      term: 'Safety harness',
      text: 'A load-bearing webbing garment, worn outside the foul-weather gear where it can be reached and checked. It carries the load across the chest and shoulders rather than the waist, closes with a heavy clasp, and on better designs adds a leg strap so it cannot ride up over the wearer’s head. Many inflatable life jackets have one built in, which is how most cruisers come to own a harness at all.',
    },
    {
      kind: 'definition',
      term: 'Tether',
      text: 'The link itself: a short, strong strap carrying a self-closing hook at each end, one of which lives permanently on the harness and one of which is in your hand. Length is the design compromise — long enough to let you work at arm’s reach, short enough to stop you before the rail rather than past it. A two-legged version solves the transfer problem, since you can hook the second leg on before the first comes off, and so are never attached to nothing.',
    },
    {
      kind: 'definition',
      term: 'Jackline',
      text: 'A dedicated anchorage for tethers: a strong line or strap run the length of the deck and made fast at each end to through-bolted padeyes or substantial cleats. Flat webbing is preferred to round line for a very practical reason — it does not roll away under a boot in the dark.',
    },
    {
      kind: 'figure',
      assetId: 'custom-harness-tether-jackline',
      caption:
        'Looking down on the deck: lines run fore and aft along each side, and a crew member’s tether is clipped to one so they can move between cockpit and bow without ever unclipping. The jacklines are set inboard rather than out at the rail.',
    },
    {
      kind: 'text',
      text: 'The point of the system is continuity: clip on before you leave the cockpit, go forward, do the job, come back, and unclip only once you are safely in the cockpit again. That works only if the jackline runs far enough aft for the helm to reach it and far enough forward to cover the job.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Never clip to the lifelines',
      text: 'Lifelines exist to stop you rolling off the side deck at rest. They are not rated to arrest a falling body, and the terminals and stanchion bases are where they let go. Worse, when they do hold, what they hold is a person outside the boat and in the water, being towed. Clip to a jackline or a purpose-installed padeye instead, and keep the attachment as far inboard as the job allows, so that a fall ends with you sprawled on the side deck rather than suspended alongside.',
    },
    {
      kind: 'text',
      text: 'One boundary is worth stating plainly, because the exam and the dock both blur it: on a recreational cruising boat none of this is law. Carriage of flotation is a federal requirement; wearing a harness is prudent seamanship, drawn from the offshore racing rules and from bodies like US Sailing and the RYA. That is guidance with a great deal of experience behind it — a different thing from a regulation, and you should be able to say which is which.',
    },
    {
      kind: 'text',
      text: 'You may well not meet the system on a 103 course. Coastal daysailing rarely calls for it, and a boat that has never needed jacklines will not have the padeyes to take them — a spare line made fast at each end of the deck is the usual improvisation, and it beats nothing. Two harnesses and tethers in a locker cost little and cover the day the forecast is wrong. The judgement that goes with them is simpler still: at this stage, decline the weather that would make one essential rather than equipping for it.',
    },
  ],
};
