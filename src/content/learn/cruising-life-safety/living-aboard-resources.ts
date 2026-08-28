import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'cruising-life-safety-living-aboard-resources',
  moduleId: 'cruising-life-safety',
  order: 4,
  title: 'Water, Galley & Head',
  intro:
    'A cruising boat carries her own water, cooks her own meals and deals with her own waste, and all three want managing rather than assuming.',
  concepts: ['living-aboard-resources'],
  blocks: [
    { kind: 'heading', text: 'Everything aboard is finite' },
    {
      kind: 'text',
      text: 'Ashore, water arrives when you open a tap and waste leaves when you flush. On a boat both are your problem: each is a tank of known size, and running out of either ends a cruise. You already know where these systems are — this lesson is about running them.',
    },
    { kind: 'heading', text: 'Fresh water' },
    {
      kind: 'text',
      text: 'The boat’s fresh water does cooking, washing up, hands, faces and possibly a shower. A boat of this size typically holds enough for a week if it is used with a bit of thought, and rather less than a day if it is not. The difference is entirely behavioural.',
    },
    {
      kind: 'list',
      items: [
        'Know the level. Read the gauge, or dip the tank, before you leave rather than discovering the answer at the far end of a passage.',
        'Wash up in a basin rather than under a running tap, and rinse with as little as the job needs.',
        'If the boat has a hand or foot pump at the galley as well as pressure water, use it. A pump that only runs while you are actively pumping is a natural rationing device.',
        'Turn the pressure pump off at the panel when nobody is using water.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Pressure water can empty the tank without anyone noticing',
      text: 'A pressure pump cannot tell an open tap from a split hose. Given either, it will move the whole tank into the bilge, and it will do it while everyone is on deck. The symptom is audible long before it is visible: a pump cycling when nobody is drawing water. Learn that sound, and get into the habit of killing the circuit at the panel when the system is idle. Alongside, that is untidy. At sea, it is the water gone.',
    },
    {
      kind: 'text',
      text: 'Filling has one failure mode worth naming before all the others: the deck plates for water and for fuel sit near each other, look much alike and open with the same key. Read the one you are about to unscrew. Beyond that, the job is mostly about not importing anything along with the water. Marinas commonly run a washdown supply beside the drinking one, so take it from a tap marked potable. A hose that has been lying in the sun holds a slug of stale water that is better run off onto the dock than into the tank, and a hose end that has been trailing in the harbour has no business in a drinking-water fill at all. Grit on the side deck will follow the flow below unless it is washed away first.',
    },
    {
      kind: 'text',
      text: 'Watch for the tank telling you it is full. Air pushed out ahead of the water leaves by a vent, and that vent commonly ends up in a sink or a basin below — so water arriving somewhere nobody turned a tap is the signal to stop and close up. Hot water, incidentally, tends to be a by-product: a calorifier plumbed into the engine’s cooling circuit means an hour under power is also an hour of heating.',
    },
    { kind: 'heading', text: 'The galley, working' },
    {
      kind: 'text',
      text: 'A galley is a kitchen that is small, moving and equipped with an open flame. The fire risk aboard is concentrated here and in the engine space more than anywhere else.',
    },
    {
      kind: 'text',
      text: 'The stove burns either alcohol or liquefied petroleum gas — LPG, usually propane. Neither is forgiving of carelessness, and lighting one is boat-specific enough that on a course boat or a charter you should expect either to be shown the sequence or to have the stove worked for you. Treat that as proportionate rather than fussy: along with the engine space, this is where boat fires most often start.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Why LPG is installed the way it is',
      text: 'Propane vapour is heavier than air, so a leak does not disperse upward and out — it sinks into the bilge and sits there waiting for a spark. That is why a properly installed system keeps the cylinder in a locker sealed from the interior and drained overboard, runs the supply through a solenoid valve you can shut from the galley, and why the habit is to close the valve at the cylinder end when cooking is finished rather than just turning off the burner. Smelling gas below is a stop-everything moment: no switches, no flames, ventilate, and find the leak.',
    },
    {
      kind: 'definition',
      term: 'Gimbals',
      text: 'A pair of bearings on a fore-and-aft axis, set above the stove’s centre of mass, so that as the boat heels the stove swings athwartships and its top stays level. It is a pendulum, and the rest of the fitting follows from that: the weight slung beneath the burners is what keeps it hanging true, and the fiddle rails around the top are what keep the pan on it once it is.',
    },
    {
      kind: 'text',
      text: 'The rest of galley safety is about what loose objects do when the boat heels. Latch cabinet doors positively rather than pushing them shut; a catch that holds at rest and lets go at thirty degrees is worse than none. Wedge or strap pots and pans, set the stove’s locking arrangement for the conditions, and keep surfaces clear — anything left out ends up on the cabin sole, and if it was hot on the way down, on somebody as well.',
    },
    { kind: 'heading', text: 'Provisioning and stowing for sea' },
    {
      kind: 'text',
      text: 'Stowage is a stability question before it is a tidiness one. Heavy things — tinned provisions, tools, spare batteries — go low and near the centreline, because weight low keeps the centre of gravity low and the boat stiffer. Stowed high, the same weight makes her more tender: she heels further and comes back more slowly.',
    },
    {
      kind: 'text',
      text: 'The other half is that nothing may be free to move. In a building sea an unsecured object is a projectile, a trip hazard, or something that jams a bilge access or a steering quadrant at the worst moment. Securing for sea is a deliberate pass through the boat before departure, on deck as well as below.',
    },
    {
      kind: 'list',
      items: [
        'Repack provisions out of bulky supermarket packaging into containers that stow and come home again — less rubbish aboard, less to stow.',
        'Bottles and cans in preference to glass, and bring water as well as whatever else the crew is drinking.',
        'Food that can be eaten one-handed and does not disintegrate — a cockpit that is already wet does not need to be sticky as well.',
        'The galley strainer in place, and a standing rule that nothing solid goes down a drain whose pipe is narrower than a garden hose.',
        'A last look round the deck: fenders, boathook, winch handles, bags, all stowed or lashed.',
      ],
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'The sink can be below the waterline',
      text: 'A drain only drains while it is above the water. A sink set well outboard can dip under as the boat lies over on one tack, and at that point the pipe runs the other way. Boats plumbed like that are sailed with the sink seacock shut, which is something to establish alongside rather than discover on the second tack. Ask how the boat you are on is arranged.',
    },
    { kind: 'heading', text: 'The head and where waste may go' },
    {
      kind: 'text',
      text: 'Operating a marine toilet is boat-specific, and the skipper will show you the sequence. Two things generalise. Nothing goes in that did not come out of a person or a roll of paper thin enough to break up — a blockage in a small enclosed compartment is everyone’s problem for the rest of the cruise. And every flush consumes holding-tank capacity.',
    },
    {
      kind: 'definition',
      term: 'Marine sanitation device (MSD)',
      text: 'The regulated equipment that treats or holds sewage aboard. Type I and Type II treat waste to a standard and may discharge the treated effluent, Type I being permitted only on vessels 65 feet and under. Type III does not treat anything — it is a holding tank, emptied ashore at a pumpout or, outside the limit, overboard.',
    },
    {
      kind: 'text',
      text: 'The framework a coastal cruiser needs is short. Discharging untreated sewage is prohibited within three miles of shore, so inside that line the choice is a treating device or a holding tank; beyond it, a holding tank may be discharged. A state may go further and declare a No-Discharge Zone, in which nothing may go overboard at all — treated or not — and NDZs cover a great many popular cruising areas.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'In a no-discharge zone the valve has to be secured',
      text: 'It is not enough to intend not to discharge. Where discharge is prohibited, the regulations require the device to be physically secured against it — the seacock closed and its handle removed, or padlocked, or held shut with a non-releasable tie, or the compartment locked. An inspector checks the valve, not your intentions.',
    },
    {
      kind: 'text',
      text: 'Practically, that means knowing where the pumpouts are before the tank is full. Many marinas have one, and in some areas a pumpout boat will come to you at anchor. Plan the tank the way you plan the water and the fuel.',
    },
    { kind: 'heading', text: 'Rubbish' },
    {
      kind: 'text',
      text: 'Throwing rubbish overboard is, besides being unpleasant, largely illegal. Plastic may not be discharged anywhere in the world under MARPOL, and garbage discharge generally is prohibited in United States navigable waters. Vessels of 26 feet and over must display a placard setting out the rules. The only policy that survives contact with a small boat is to treat everything that comes aboard as something you will be carrying home again.',
    },
    {
      kind: 'text',
      text: 'Which loops back to provisioning: the less packaging that comes aboard, the less there is to stow for several days in a small space. Ask where the boat keeps trash and recyclables before you generate any.',
    },
  ],
};
