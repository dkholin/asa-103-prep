import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'hands-on-cruising-loss-of-control',
  moduleId: 'hands-on-cruising',
  order: 6,
  title: 'Grounding, Steering & Propulsion Loss',
  intro:
    'Running aground, losing the rudder and losing the engine are three different failures with one thing in common: the immediate response decides how much worse the situation gets.',
  concepts: ['grounding-response', 'loss-of-steering-or-propulsion'],
  blocks: [
    { kind: 'heading', text: 'One habit covers all three' },
    {
      kind: 'text',
      text: 'These are three unrelated failures, and the same reflex gets people into trouble in all of them: doing something immediately and vigorously, usually with the throttle. It is an understandable reflex — something has gone wrong and the hand wants to fix it — and it reliably converts a recoverable situation into an expensive one.',
    },
    {
      kind: 'text',
      text: 'The habit worth building instead is short and unexciting. Stop making it worse. Find out what you are actually dealing with. Then choose. The pause costs a minute; skipping it can cost the boat, and none of what follows is a repair manual — this lesson is about keeping control of a boat, not about fixing machinery.',
    },
    { kind: 'heading', text: 'Aground' },
    {
      kind: 'text',
      text: 'The moment you touch, take the drive off — leave the engine in neutral rather than pushing on. Continuing to power forward drives the boat further onto whatever she found, and where the bottom is soft it also stirs up sediment that the engine will happily draw into its cooling water intake, adding a second problem to the first.',
    },
    {
      kind: 'text',
      text: 'Then account for your crew — a grounding can be an abrupt stop, and people fall — and go below and look for water. Check the bilge and check it again a few minutes later, because a slow leak is not obvious at first glance. Look particularly where things pass through the hull: the rudder and shaft where they enter, the stuffing boxes, and on a keelboat the keel bolts.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'The tide decides how much time you have',
      text: 'This is the question that changes everything else. On a rising tide, patience is a real strategy: the water that grounded you will lift you off, and doing nothing energetic is often the best available plan. On a falling tide the clock runs against you — the boat settles harder, may heel further as the water leaves, and may then be there until the next high water. Work out which you are on before you decide anything else.',
    },
    {
      kind: 'text',
      text: 'What comes next is conditional, and this is where general advice stops being safe. Backing off the way you came can work on a soft bottom where you grounded gently and there is no damage — you already know that water was deep enough. It is a poor idea on rock, with damage suspected, or when hard aground with a falling tide, where it may grind the keel or worsen a leak.',
    },
    {
      kind: 'text',
      text: 'Reducing draft is likewise sometimes useful and sometimes not. Heeling a boat — crew weight out on the rail, or weight on a boom swung out — lifts the keel a little and can be enough to slide off a shoal she is barely touching. But heeling a boat that is settling on a falling tide can be exactly the wrong thing, and on some bottoms and some hull forms it achieves nothing at all. Treat it as one option to weigh against your own boat and your own situation, not as the standard next step.',
    },
    {
      kind: 'figure',
      assetId: 'photo-grounded-boat',
      caption:
        'Not every grounding is a soft one. A boat hard aground on rock or structure is a situation to assess carefully and, very often, to call for professional help with — trying to power off can turn a stranding into a sinking.',
    },
    {
      kind: 'text',
      text: 'Knowing when to stop trying is part of the skill. If the boat is holed or taking water, if she is on rock, if the tide is falling and she is hard on, or if getting her off would put the crew at risk, the answer is to secure the boat, look after the people, and call for assistance. Being towed off by someone equipped for it is not a failure.',
    },
    { kind: 'heading', text: 'When the steering goes' },
    {
      kind: 'text',
      text: 'A wheel that suddenly spins freely is alarming and is usually survivable without drama, provided the first response is the right one: slow down. Speed is what makes a boat without steering dangerous, because it converts a manageable problem into a rapidly approaching one, and it also loads the rudder heavily enough to make any alternative steering arrangement hard to use. Take the way off, and look around to establish how much room you have and what is nearby.',
    },
    {
      kind: 'text',
      text: 'Then look for the obvious. Wheel steering runs through cables, chains or hydraulics to a quadrant on the rudder post, and a fair proportion of sudden failures are something that has come adrift rather than anything broken beyond reach. It is worth a quick look before you commit to the alternative.',
    },
    {
      kind: 'definition',
      term: 'Emergency tiller',
      text: 'A lever that fits directly onto the head of the rudder post, bypassing the wheel and everything between it and the rudder. Nearly every wheel-steered boat carries one, and where it is stowed, what has to be moved to reach the post, and how the arm engages are all specific to that boat.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Find yours at the dock, not at sea',
      text: 'This is the near-universal advice from people who have used one in anger, and it is worth taking literally. Fit the emergency tiller alongside on a calm day, and note what has to come out of the locker first, where the helmsman can actually stand, whether they can see anything from there, and how you would pass instructions. Expect it to be short, heavy and awkward: a stubby arm on a big rudder gives poor leverage, which is another reason speed comes down before it goes on.',
    },
    {
      kind: 'text',
      text: 'Sail balance is a genuine help here and worth knowing about. A boat’s trim affects how strongly she tries to turn on her own, so easing or reducing sail aft, or adjusting the balance between headsail and main, can take a great deal of load off the rudder and make an awkward tiller manageable. In the extreme, a well-balanced boat can be persuaded to hold a rough course on sail trim alone. What is out of scope here is repair — jury rudders, steering-gear diagnosis and rebuilding a broken quadrant at sea are a different subject, and the identification of the steering components themselves belongs to Boat & Cruising Basics.',
    },
    { kind: 'heading', text: 'Losing propulsion' },
    {
      kind: 'text',
      text: 'When the engine stops, the important question is not what is wrong with it. It is where you are, and how long you have before that becomes a problem. Two situations that feel identical in the cockpit call for opposite responses.',
    },
    {
      kind: 'table',
      caption: 'The same failure, in two places.',
      headers: ['Situation', 'What you actually have', 'Priority'],
      rows: [
        ['Open water, useful wind, sea room', 'A sailing boat that has lost a convenience', 'Make sail and carry on to a suitable harbour. Troubleshoot, or arrange help, at leisure — this is not by itself a distress situation'],
        ['Narrow channel, traffic, little wind', 'Minutes before you are a hazard to yourself and others', 'Get the anchor ready to go now, use whatever wind there is to get clear of the fairway, and be prepared to stop the boat rather than drift'],
      ],
    },
    {
      kind: 'text',
      text: 'The anchor is the piece of equipment people forget in the second case, and it is the one that solves it. An anchor stops an uncontrolled drift, which is the actual danger — not the silence from the engine box. Getting it ready costs nothing if you do not need it.',
    },
    {
      kind: 'text',
      text: 'Keep the traffic picture in mind throughout. A boat drifting without power in a channel is a hazard other vessels may not have understood yet, and making your situation and intentions visible early gives everyone else room to help.',
    },
    { kind: 'heading', text: 'A fouled propeller' },
    {
      kind: 'text',
      text: 'An engine that bogs down and stalls with a lump of noise, particularly near pot markers or mooring lines, has most likely wrapped something round the propeller. The immediate response is narrow and worth knowing exactly.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Shut the engine down. Do not try to shake the line off by working between ahead and astern — that winds it tighter and can damage the shaft, the coupling or the gearbox, and has been known to shift an engine on its mounts.',
        'Secure it against restart before anyone goes anywhere near the stern. Key out, or the starter battery off, so that everyone aboard can see it cannot turn.',
        'Stabilise the boat: make sail if there is room and wind, or anchor if there is not. You now have a boat without propulsion, which is the situation above.',
        'Then decide, unhurriedly, between sailing on, being towed, and asking for assistance.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Going in the water is a serious decision',
      text: 'Clearing a fouled propeller from in the water is not a routine fix and this lesson does not teach it. A pitching stern above a swimmer holding a knife is a way to generate a second, worse emergency, and the published advice for anyone sailing alone is unambiguous: do not go in — call for help. Even with crew aboard it is a decision to weigh against sea state, water temperature, whether the boat is secured, and whether you can simply be towed instead.',
    },
    {
      kind: 'text',
      text: 'Knowing where your own competence stops is part of the skill here, and it is the least mechanical part of all three of these failures.',
    },
  ],
};
