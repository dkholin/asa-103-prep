import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'hands-on-cruising-crew-overboard',
  moduleId: 'hands-on-cruising',
  order: 5,
  title: 'Crew Overboard & Cold Water',
  intro:
    'A crew overboard is the one emergency where the first ten seconds of the response decide whether the rest of it is possible at all.',
  concepts: ['crew-overboard-recovery', 'cold-water-immersion'],
  blocks: [
    { kind: 'heading', text: 'The first ten seconds' },
    {
      kind: 'text',
      text: 'Almost everything that goes wrong in a crew-overboard recovery goes wrong at the start, and it is nearly always the same thing: the person in the water was lost from sight. Once that happens the problem changes from a manoeuvring exercise into a search, and searching for a head in a seaway is a different and far worse proposition.',
    },
    {
      kind: 'text',
      text: 'So the immediate actions are about people and information, not about sailing the boat. Shout, so everybody aboard knows — one person quietly noticing is not a response. Throw something that floats toward the casualty at once, because it gives them something to hold and, just as usefully, leaves a marker on the water. And point.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'One person points, and does nothing else',
      text: 'Designate a spotter whose entire job is to keep an arm extended at the person in the water and never look away. Not to help with sheets, not to fetch anything, not to answer questions — just point. A head in the water is a very small, very low object that vanishes behind every wave and into any glare, so this holds in bright daylight as much as at dusk. Press the MOB button on the plotter if there is one, but treat the electronic mark as a backup: it records where the person was, and they are drifting.',
    },
    {
      kind: 'text',
      text: 'The instinct to jump in after them is a strong one and it is almost always wrong. It converts one casualty into two, removes a pair of hands from the boat, and does nothing whatever to keep the first person in sight.',
    },
    { kind: 'heading', text: 'Who does what' },
    {
      kind: 'text',
      text: 'A recovery needs three jobs done at once, and on a small crew that means three people doing three different things rather than everybody converging on the most dramatic one. Someone spots. Someone handles the boat — sails, engine, helm — and gets her back. Someone prepares for the moment of retrieval: flotation, a lifesling or heaving line, the boarding ladder down, a halyard led aft if it may be needed for lifting.',
    },
    {
      kind: 'text',
      text: 'That third job is the one crews forget in practice and regret in earnest, because arriving perfectly alongside with nothing ready wastes the hardest-won minute of the whole exercise. Agree the roles before you sail, not while somebody is astern of you.',
    },
    { kind: 'heading', text: 'Getting back to them' },
    {
      kind: 'text',
      text: 'There is no single manoeuvre that is correct everywhere, and you should be suspicious of anyone who says otherwise. Several are taught and practised: the quick-stop, which tacks immediately and keeps the boat close to the casualty throughout; the figure-eight or quick-turn, which sails off and comes back on a controlled reach; a return under power. The quick-stop is the most widely taught and the one most often recommended, but which is right on the day depends on your crew size, the sea state, how the boat is rigged and what you have actually practised.',
    },
    {
      kind: 'text',
      text: 'What matters more than the name is what every one of them is trying to achieve, which is worth separating into four distinct problems rather than one blurred one.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Turn the boat round without ever losing sight of the casualty, and without sailing so far off that returning becomes a navigation problem.',
        'Set up a final approach that is slow, controlled and arrives from a predictable direction.',
        'Stop the boat alongside them — not near them, alongside them, within arm’s reach.',
        'Get them out of the water and onto the boat.',
      ],
    },
    {
      kind: 'text',
      text: 'The engine is a legitimate tool in all of this and is often the sensible choice shorthanded. The one discipline it demands is that the propeller must not be turning near a person in the water, or near lines and flotation trailing toward them. Take it out of gear for the last part of the approach.',
    },
    { kind: 'heading', text: 'The final approach' },
    {
      kind: 'text',
      text: 'Slow down early. A boat carries her way a long distance, and the commonest failure at this stage is arriving with too much speed, sliding past, and having to go round again while the casualty gets colder and more tired. Aim to be barely moving well before you reach them.',
    },
    {
      kind: 'figure',
      assetId: 'custom-mob-recovery-approach',
      caption:
        'The return is a curve back to a slow, controlled last few boat-lengths, not a dash. The point of the manoeuvre is to end up stopped within reach of the person, with the boat under command — arriving fast, even in exactly the right place, is a failed approach.',
    },
    {
      kind: 'text',
      text: 'Which side to bring them alongside is a real decision, and understanding it is easier if you remember one fact: a boat with no way on drifts downwind. So a casualty at your leeward side is one you are drifting gently toward, and a casualty to windward is one you are drifting away from. That is the main argument for the leeward pickup, and it is what most instruction teaches — the person stays reachable rather than opening a gap you have to close again, the hull gives them a lee from wind and chop, and as the boat heels the leeward rail is the lower side to lift from.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'The counter-case, in a big sea',
      text: 'The same drift that keeps the person reachable can, in steep waves, bring several tons of hull down on top of them. That is the reason some sources prefer to keep the casualty to windward in heavy conditions, accepting the risk of drifting away in exchange for not crushing them. It is a genuine trade-off rather than a settled rule, and it is decided by the sea state on the day.',
    },
    { kind: 'heading', text: 'Getting them aboard' },
    {
      kind: 'text',
      text: 'Being alongside is not being rescued, and this is the step most often underestimated. Freeboard that seems modest from on deck is a wall from water level, and a person who has been immersed even briefly may have very little grip or strength left — cold takes the hands first. Expect someone who cannot climb, and to whom no amount of encouragement will restore the ability.',
    },
    {
      kind: 'text',
      text: 'So think about the mechanics in advance and be honest about what your boat offers. A stern ladder is excellent when the water is flat and a hazard when the stern is pitching. A lifesling or a strop lets you attach the person to the boat first, which is worth a great deal on its own even before any lifting happens. A halyard on a winch will lift a person who cannot help themselves, and that is often exactly what is required. The first priority once you are alongside is simply to get them attached to the boat, so that whatever else takes time, they cannot drift away while you work it out.',
    },
    { kind: 'heading', text: 'What cold water does' },
    {
      kind: 'text',
      text: 'Cold water hurts people far faster than most sailors expect, and it does so in stages that are worth knowing separately, because each one calls for something different from the crew.',
    },
    {
      kind: 'text',
      text: 'The first is immediate and it is the one that kills most quickly: sudden immersion triggers an involuntary gasp followed by rapid, uncontrollable breathing. A gasp underwater drowns people who could swim perfectly well. This passes in a minute or so if the person can keep their airway clear — which is the single strongest practical argument for a life jacket actually being worn, since it holds the head up during exactly the period when its owner has no useful control.',
    },
    {
      kind: 'text',
      text: 'The second stage is the loss of the body itself. Long before core temperature falls dangerously, cold shuts down the muscles and nerves in the limbs, and hands stop working first. Grip fails, then coordination, then any useful swimming. This is why the window for self-rescue is so much shorter than the window for survival, and why a casualty who was waving competently a few minutes ago may be unable to hold a line now.',
    },
    {
      kind: 'text',
      text: 'Hypothermia — the actual fall in core temperature — comes last, over a much longer period. That ordering is the useful lesson: the person in the water usually loses the ability to help themselves long before they are in danger of dying of cold.',
    },
    {
      kind: 'figure',
      assetId: 'custom-cold-water-1101',
      caption:
        'A widely taught rule of thumb compresses that sequence into three rough marks on a timeline, roughly a minute, ten minutes, and an hour. Treat the shape as the lesson rather than the numbers: each stage arrives sooner in colder water, and the figures are an approximation for teaching, not a budget anyone should plan against.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'Why the numbers are hedged here',
      text: 'This timeline is widely taught — by the Canadian Safe Boating Council, by Cold Water Boot Camp and in US Army safety material — and it originates in real immersion research. It also has serious critics: the National Center for Cold Water Safety argues the intervals are much shorter in near-freezing water and that phrasing them as time you "have" implies a guaranteed reserve nobody actually has. Both points are worth carrying. Use it to understand the order and the speed of what happens, and never as a clock to work to.',
    },
    { kind: 'heading', text: 'Recognising and handling a cold casualty' },
    {
      kind: 'text',
      text: 'Someone becoming hypothermic shivers hard, fumbles simple tasks, and begins to slur or ramble. Those three together are enough to act on. Note that shivering stopping is not reassuring in a person who is still cold and getting worse — it can mean the body has run out of the capacity to do it.',
    },
    {
      kind: 'text',
      text: 'For someone conscious and shivering, initial care is unspectacular and passive. Get the wet clothing off, dry them, wrap them in dry insulation, get them out of the wind, and keep watching them. What you avoid matters as much: no very hot showers or baths, no alcohol, and no vigorous exercise to "warm them up" — each of those can make a cold casualty worse rather than better.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Handle a very cold person gently',
      text: 'Someone deeply cold after a longer immersion should be moved as little as possible, kept horizontal, and handled carefully. Rough handling or sudden exertion can send cold blood from the limbs back to the heart and provoke a dangerous rhythm — a recognised risk during and just after rescue. This is a genuine medical hazard, not a comfort measure, and it applies to people who are still conscious as well as those who are not.',
    },
    {
      kind: 'text',
      text: 'Beyond that, this is a boat-handling module and the casualty care stops here. Choosing and wearing life jackets, harnesses and jacklines — the equipment that stops this happening at all — and the structure of a distress call and broader first aid belong to Cruising Life & Safety. Prevention is worth the last word, though, because a crew dressed for the water rather than the weather, clipped on when it matters, is a crew far less likely to need any of the above.',
    },
  ],
};
