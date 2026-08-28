import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'cruising-life-safety-power-fuel-hazards',
  moduleId: 'cruising-life-safety',
  order: 5,
  title: 'Power, Fuel & Invisible Hazards',
  intro:
    'The hazards that hurt people aboard are often the ones nobody can see: a heavy fuel vapour in the bilge, exhaust in the cockpit, a battery quietly running flat.',
  concepts: ['power-and-invisible-hazards'],
  blocks: [
    { kind: 'heading', text: 'What you cannot see' },
    {
      kind: 'text',
      text: 'Most of what goes wrong on a boat announces itself: a sail flogs, a line jams, a fitting bangs. The hazards in this lesson do none of that. Gasoline vapour is invisible and collects where you do not look, carbon monoxide has no colour and no smell, and a battery bank draws down over hours without a sound. Each has to be managed by habit and instrument rather than by noticing.',
    },
    { kind: 'heading', text: 'Electrical power as a resource' },
    {
      kind: 'text',
      text: 'Away from the dock, everything electrical aboard comes out of a finite store. The house bank runs lights, instruments, the fridge and the water pump; the start battery is held in reserve so that whatever else happens, the engine will turn over. Treat the house bank the way you treat the water tank.',
    },
    {
      kind: 'list',
      items: [
        'Know what is on. The fridge and the pressure-water pump are the two loads that quietly dominate a day’s consumption on a small cruising boat.',
        'Switch off what is not being used, and switch off cabin lights when leaving a space, rather than trusting to the panel to remind you.',
        'Charging happens when the engine runs, when shore power is connected, or from solar if fitted. If none of those is going to happen today, the bank is all you have.',
        'Watch the voltage rather than assuming. A house bank that has been worked hard needs a real charge, not ten minutes of motoring out of the harbour.',
        'Keep the start battery out of the domestic budget so that a flat house bank is an inconvenience and not a failure to start.',
      ],
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'Flat batteries are a safety problem, not just a comfort one',
      text: 'The same bank runs the navigation lights, the fixed VHF and the electric bilge pump. A crew that has spent the day’s capacity on the fridge has spent the evening’s ability to be seen, to call for help and to pump. This is why the charging discipline sits in a safety lesson rather than a comfort one.',
    },
    { kind: 'heading', text: 'Shore power is a different animal' },
    {
      kind: 'text',
      text: 'Everything else electrical aboard is low-voltage direct current, which will spoil your day but is unlikely to kill you. Shore power is mains alternating current, running along a dock, into a boat, over water. It is a separate system with its own rules.',
    },
    {
      kind: 'list',
      items: [
        'Use proper marine shore-power cordage, plugs and receptacles that are listed by a recognised testing laboratory. Household extension leads have no place in this.',
        'Inspect the cord and both ends before connecting — cracked insulation, corroded or discoloured pins, a loose collar. Heat discolouration around a pin means stop.',
        'Connect at the boat first and the pedestal last, and disconnect in the reverse order, with the breaker off at each stage.',
        'Keep the cord out of the water and clear of where it can be chafed by a piling or trapped by a fender.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Do not swim around energised docks',
      text: 'A fault in a boat’s or a marina’s wiring can energise the water around it. A swimmer in that water can be paralysed by the current and drown without any visible sign of what happened — electric shock drowning. Modern practice adds leakage-detection protection at the boat and the pedestal precisely because of this, but the rule for people is simpler: do not swim in a marina, and do not let anyone else.',
    },
    { kind: 'heading', text: 'Fuel vapour' },
    {
      kind: 'text',
      text: 'The single fact that governs gasoline safety afloat is that gasoline vapour is heavier than air. It does not rise and vent away through an open hatch — it sinks, flows downhill inside the hull, and pools in the bilge and the engine compartment: the lowest, most enclosed, least ventilated parts of the boat, and the ones with electrical equipment in them.',
    },
    {
      kind: 'text',
      text: 'A boat is therefore an unusually good machine for turning a small fuel spill into an explosion, in a way a car is not. That is why the smell of petrol below is treated as an emergency rather than a nuisance: stop, operate no switch, ventilate, and find the source before anything else happens.',
    },
    {
      kind: 'text',
      text: 'Diesel is far less volatile and does not form an explosive vapour the same way, which is much of why cruising auxiliaries are diesels. That is a reason for relief, not relaxation: diesel still burns, and a diesel spill is still a pollution incident.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'The procedure itself belongs to Motoring',
      text: 'Fuelling technique and the pre-start sequence itself are Motoring’s material and are taught there. What belongs here is the reason underneath them. A blower moves the air in the engine space, but it moves it from where the ducting reaches — and vapour heavier than air settles into low pockets the airflow may never touch. That is why the blower is followed by opening up and using your nose, or a vapour detector where one is fitted: the second check exists because the first one has a blind spot, not because anyone is being thorough for its own sake.',
    },
    {
      kind: 'text',
      text: 'Spills have a legal dimension as well as a fire one. Federal law prohibits discharging oil or fuel that causes a film, sheen or discoloration on the water, with no minimum quantity that makes it acceptable. Stop fuelling immediately, contain what you can, follow the marina’s procedure — and know that a spill producing a sheen is reportable to the National Response Center. Vessels of 26 feet and over must carry a "Discharge of Oil Prohibited" placard as the reminder of exactly this.',
    },
    {
      kind: 'text',
      text: 'The same rule reaches inside the boat: oil or fuel that leaks into the bilge must not be pumped overboard, because the bilge pump does not launder it. Clean it up with absorbent pads and dispose of them ashore.',
    },
    { kind: 'heading', text: 'Carbon monoxide' },
    {
      kind: 'definition',
      term: 'Carbon monoxide (CO)',
      text: 'A colourless, odourless, tasteless gas produced by anything burning fuel — the engine, a generator, a fuel-burning heater, even a neighbouring boat’s exhaust. It gives no warning at all, and a dangerous concentration can build in a confined space in a very short time.',
    },
    {
      kind: 'text',
      text: 'The hazard is largely one of geometry. Exhaust leaves aft, and a boat moving slowly, idling or lying at anchor has no airflow to carry it away — so it is drawn back into the cockpit, the cabin, or the pocket of air under a stern deck or swim platform, where concentrations can be lethal in a very short time. A boat running a generator alongside neighbours creates the same problem for other people.',
    },
    {
      kind: 'list',
      items: [
        'Fit and maintain a CO detector listed for marine use in the accommodation, and test it rather than assuming it works.',
        'Ventilate. Get real airflow through the cabin when the engine is running, and be wary of enclosing a cockpit with canvas while it does.',
        'Keep people off and away from the area immediately behind an exhaust outlet, and out of the space under a stern deck.',
        'Keep clear of neighbouring boats running an engine or a generator — around twenty feet is the usual advice for where to anchor, berth or beach.',
        'Inspect the exhaust system for leaks. Hot gas and salt water is a corrosive mixture and the system is not a fit-and-forget one.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'CO looks exactly like seasickness',
      text: 'Headache, dizziness, weakness, nausea, confusion — the early symptoms are the ones a crew will happily attribute to the motion, the sun or last night. If more than one person feels ill at once, or somebody feels better on deck and worse below, treat carbon monoxide as the working hypothesis: get everyone into fresh air, shut down the source, ventilate, and get help if anyone does not recover quickly.',
    },
    { kind: 'heading', text: 'The engine space itself' },
    {
      kind: 'text',
      text: 'The engine compartment concentrates most of this lesson in one box: fuel, hot metal, exhaust and the heaviest cabling on the boat, in a confined space that is awkward to see into. Servicing what is in there is Motoring’s subject; what belongs here is that the space deserves a look, and what a look is for.',
    },
    {
      kind: 'text',
      text: 'Open it when the engine is cold and check by eye and finger for chafed wiring, weeping fuel connections, cracked hoses, loose clamps and corrosion. Each is a small job now and a fire, a flood or a breakdown later. Keep the space clean, too: a bilge with a film of oil in it is both a fire that spreads faster and a pollution incident waiting for the pump to run.',
    },
  ],
};
