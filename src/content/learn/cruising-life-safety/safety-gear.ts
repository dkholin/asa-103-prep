import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'cruising-life-safety-safety-gear',
  moduleId: 'cruising-life-safety',
  order: 3,
  title: 'Safety Gear: Required & Recommended',
  intro:
    'Some equipment a boat must carry because the law says so, and some she should carry because a prudent skipper would not leave the dock without it.',
  concepts: ['safety-equipment-readiness'],
  blocks: [
    { kind: 'heading', text: 'Two lists, not one' },
    {
      kind: 'text',
      text: 'Ask what safety equipment a cruising boat carries and you will get a single long answer. That answer conceals a distinction worth keeping sharp, because it is the one a boarding officer applies and the one an exam asks about. Some items are required by federal regulation, in specified numbers and in serviceable condition. Everything else is carried because it is a good idea. Both lists matter. Only one of them can get you a citation.',
    },
    {
      kind: 'text',
      text: 'There is a second, subtler point in the split. The required list is almost all equipment that acts at the far end of an incident: it comes out once flotation, fire or rescue is already the question. Much of the recommended list acts at the near end, on the small failure that has not become anything yet — a spare impeller, a torch, a hose clamp. Regulation can only sensibly mandate the first kind. Carrying the second is a large part of what keeps you from needing the first.',
    },
    { kind: 'heading', text: 'The federally required list' },
    {
      kind: 'text',
      text: 'What follows is the shape of the requirement rather than a self-inspection checklist. Read it with one thing in mind: almost every row has a condition attached. Requirements vary with the length of the vessel, with the water she is on, with her model year, and sometimes with her propulsion. A number that is right for a 20-foot boat on Long Island Sound may be wrong for a 14-foot boat on an inland lake.',
    },
    {
      kind: 'table',
      caption:
        'Federal carriage requirements in outline. The third column is the part people forget — almost nothing here applies to every boat unconditionally.',
      headers: ['Equipment', 'Requirement', 'Depends on'],
      rows: [
        [
          'Wearable flotation',
          'One approved wearable device for each person aboard, readily accessible and sized for the wearer',
          'Nothing — this one applies to every boat',
        ],
        [
          'Throwable device',
          'One approved throwable, immediately available, in addition to the wearables',
          'Vessel length: 16 ft and over',
        ],
        [
          'Visual distress signals',
          'Devices for day use and for night use (or combined devices), in the required number',
          'Waters and length: coastal waters, Great Lakes and territorial seas. Boats under 16 ft need only night signals, and only between sunset and sunrise',
        ],
        [
          'Sound-producing device',
          'A means of making an efficient sound signal',
          'Length: under 12 m may use any efficient means; 12 m and over must carry a whistle, and 20 m and over a bell as well',
        ],
        [
          'Fire extinguishers',
          'A minimum number by length, in good and serviceable condition',
          'Length, model year, and whether a fixed system is fitted in the machinery space',
        ],
        [
          'Navigation lights',
          'Lights meeting the Navigation Rules, fitted and working, displayed from sunset to sunrise and in restricted visibility',
          'Length and vessel type determine the configuration',
        ],
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Check the rules for the water you are actually on',
      text: 'Federal requirements are a floor, and states and local authorities add their own — on child life-jacket wear, on carriage of extra gear, on where you may and may not go. The applicable rule can change between the harbour you left and the one you are heading for. Look it up for the trip rather than assuming what was true at home.',
    },
    { kind: 'heading', text: 'Distress signals' },
    {
      kind: 'text',
      text: 'The visual distress signal requirement is tied to operating area, not to boat size in the way people expect. It applies on the US waters of the Great Lakes, on the territorial seas, and on waters directly connected to them — bays, sounds, harbours, rivers, inlets — out to the first point where the shorelines narrow to two miles. A boat that never leaves an inland lake with no such connection is outside that operating area entirely and the requirement does not reach her, whatever her length.',
    },
    {
      kind: 'figure',
      assetId: 'custom-visual-distress-flare',
      caption:
        'Two signalling devices. One is a hand-held pyrotechnic, visible at a distance in darkness; the other is a flag, meaningless at night but conspicuous from the air by day. The distinction the regulation draws is between devices suitable for day use and devices suitable for night use.',
    },
    {
      kind: 'text',
      text: 'A common combination on a coastal cruising boat is a set of approved pyrotechnic flares, an orange distress flag for daylight, and an electric distress light for the dark. Pyrotechnics carry an expiry date and stop counting toward the requirement once it passes; expired ones are worth keeping aboard as extras, but they do not satisfy the rule and they are not to be disposed of casually.',
    },
    { kind: 'heading', text: 'Fire extinguishers' },
    {
      kind: 'text',
      text: 'Extinguishers are the required item most likely to be aboard and simultaneously not counting. Two things have to be true: the unit must be of an acceptable rating for the vessel, and it must be in good and serviceable condition.',
    },
    {
      kind: 'figure',
      assetId: 'photo-fire-extinguisher-marine',
      caption:
        'A hand-portable marine-type extinguisher of the kind carried on a cruising boat, with its pressure gauge at the top of the cylinder and its operating instructions on the body. This is the check that gets skipped: the gauge, the pin and the nozzle, before you leave the dock.',
    },
    {
      kind: 'list',
      items: [
        'Rating — vessels of model year 2018 and newer carry units rated 5-B or 20-B with a date stamp. Vessels of model years 1953 through 2017 may carry those, or the legacy marine types rated B-I or B-II if they remain in good condition.',
        'Substitution — one 20-B counts as two 5-B. A 10-B does not, despite holding more agent than a 5-B.',
        'Age — a disposable extinguisher must come out of service 12 years after the date of manufacture stamped on the bottle, regardless of how it looks.',
        'Condition — gauge needle in the operable band, lock pin seated, nozzle clear, no significant corrosion or damage.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'A discharged extinguisher is not equipment',
      text: 'A unit with the gauge in the red does not satisfy the requirement, and more to the point it will not put out a fire. Recharge or replace it. Checking the gauges is a thirty-second pre-departure habit and one of the few safety checks that gives an unambiguous answer.',
    },
    { kind: 'heading', text: 'The recommended list' },
    {
      kind: 'text',
      text: 'None of what follows is a federal carriage requirement, and you should be able to say so. All of it is standard on a well-found cruising boat, and ASA recommends it for day cruising on a boat of this size. The unifying idea is self-sufficiency: the ability to fix a small failure, see in the dark, call for help by a second route, or slow down water coming in.',
    },
    {
      kind: 'table',
      caption: 'Prudent gear — carried by choice, not by mandate.',
      headers: ['Item', 'What it is for'],
      rows: [
        ['First-aid kit', 'Treating what happens aboard before you can reach help. Scale it to how far from assistance you go'],
        ['Flashlights, plus spare batteries', 'Working in dark corners, checking the rig, being seen. Red lenses preserve night vision'],
        ['Handheld VHF', 'A radio that still works when ship’s power or the fixed set does not, and that goes with the crew into a dinghy or raft'],
        ['Tools and spares', 'Impeller, fuses, hose clamps, filters, tape. Turns a small failure into an inconvenience rather than a tow'],
        ['Binoculars', 'Reading a buoy, identifying a mark, resolving a shape on the horizon before it becomes a problem'],
        ['Softwood plugs', 'Tapered bungs sized to the through-hulls, tied beside them, to drive into a fitting that has failed'],
        ['Bucket with a lanyard', 'Bailing, dousing, washing down. The oldest damage-control tool aboard and still one of the best'],
        ['Boathook', 'Reaching a mooring pendant, a dock line, or something that has gone over the side'],
        ['Radar reflector', 'A fibreglass hull returns very little energy. A reflector hoisted in the rigging is what puts you on a ship’s screen in fog'],
        ['Portable manual bilge pump', 'Capacity that does not depend on the batteries, and a substitute if the fitted pump fails'],
        ['Rigging knife', 'Cutting a line under load. Kept somewhere reachable with one hand'],
      ],
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'Where the rest of the list lives',
      text: 'ASA’s recommended gear also includes charts and plotting tools, and an anchor and rode. Those belong to Navigation Rules & Tools and to Hands-On Cruising respectively, and are taught there rather than here — carry them, but learn them where the skill lives.',
    },
    { kind: 'heading', text: 'Aboard is not the same as ready' },
    {
      kind: 'text',
      text: 'Every item above has a stowage question attached, and it is the question that actually decides whether the gear works. The throwable needs to be in the cockpit, not in a locker. The plugs need to be beside the fittings they match. The extinguishers need to be reachable from outside the space they might have to be aimed into, not from inside it. The handheld VHF needs to be charged.',
    },
    {
      kind: 'text',
      text: 'And the crew needs to know where all of it is — which brings this lesson back to the briefing in the last one. Equipment nobody can find in the dark is equipment the boat does not have.',
    },
  ],
};
