import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'cruising-life-safety-responsibility-aboard',
  moduleId: 'cruising-life-safety',
  order: 1,
  title: 'Who Is Responsible Aboard',
  intro:
    'Every boat has one skipper, and everyone else aboard has a part to play in keeping the boat and her crew safe.',
  concepts: ['crew-briefing', 'skipper-and-crew-responsibility'],
  blocks: [
    { kind: 'heading', text: 'One person carries it' },
    {
      kind: 'text',
      text: 'A boat is not a committee. Somebody has to decide when to reef, when to turn back, whether that gap between the moored boats is wide enough — and decide it in the time available, which at sea is often very little. So one person is in charge of her, and that is a matter of responsibility rather than rank.',
    },
    {
      kind: 'definition',
      term: 'Skipper',
      text: 'The person in command of the vessel. On a pleasure boat the title is informal and in many places needs no qualification at all, but the responsibility attached to it is the same responsibility maritime law places on the master of any vessel: the safety of the boat, her crew and anyone else aboard.',
    },
    {
      kind: 'text',
      text: 'That responsibility does not switch off when the skipper is asleep or below at the chart table, and it does not pass to whoever is steering. If the boat is boarded and found short of required equipment, it is the skipper who is cited, not the crew member who last checked the locker.',
    },
    { kind: 'heading', text: 'Delegation moves the task, not the accountability' },
    {
      kind: 'text',
      text: 'A skipper who tries to do everything personally will do most of it badly, so tasks are handed out constantly: someone navigates, someone keeps a lookout, someone handles the foredeck. Assigning a competent crew member to a job is good practice, not an abdication — but the task moves and the accountability does not.',
    },
    {
      kind: 'table',
      caption: 'The same voyage seen from three seats. Note that only one row ends in final authority.',
      headers: ['Role', 'What they do', 'What they are responsible for'],
      rows: [
        [
          'Skipper',
          'Sets the plan, briefs the crew, allocates roles, monitors how it is going, takes charge when it stops going well',
          'Everything. Including the parts they delegated',
        ],
        [
          'Crew',
          'Carry out assigned tasks, keep watch, report what they notice, follow instructions in a manoeuvre',
          'Doing their job competently and speaking up promptly',
        ],
        [
          'Passenger',
          'Along for the ride; not expected to handle the boat, though most end up helping',
          'Staying where they are told, out of the working areas, and wearing what they are asked to wear',
        ],
      ],
    },
    {
      kind: 'text',
      text: 'The helmsman is the clearest case. Steering is a delegated task like any other, and holding the wheel confers none of the authority that goes with the boat — when an instructor hands you her for an hour, they have handed you the practice and kept the responsibility.',
    },
    { kind: 'heading', text: 'What a passenger is owed' },
    {
      kind: 'text',
      text: 'A cruising cockpit is a small space full of moving hardware, and a guest with no sailing background cannot be expected to know that the boom sweeps across at head height or that a loaded sheet is not a handhold. Telling them is the skipper’s job. Give them a place to sit clear of the winches and the mainsheet, and say plainly what will happen when the boat tacks.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'Guests rarely stay guests',
      text: 'Very few people sit still in a cockpit for four hours. Sooner or later a passenger asks what a particular line does, or offers to take the wheel, and a fair number of sailors trace their start to exactly that afternoon. There is no reason to discourage it, only to shape it: one job at a time, the reason given with it, and nothing that has a load on it.',
    },
    { kind: 'heading', text: 'The pre-departure briefing' },
    {
      kind: 'text',
      text: 'The briefing converts the skipper’s knowledge into crew capability before it is needed. It happens alongside, before the engine starts, while everyone can still hear each other, and it is short. Its purpose is not to teach seamanship but to ensure nobody has to ask a question in the two minutes when there is no time to answer it.',
    },
    {
      kind: 'list',
      items: [
        'Where the life jackets are, how many there are, and when the skipper expects them worn.',
        'Where the other safety gear lives — extinguishers, throwable device, flares, first-aid kit, bung and bucket.',
        'What happens if someone goes over: who shouts, who points and keeps pointing, who reaches for the throwable.',
        'How to call for help: where the radio is, that Channel 16 is the distress and calling channel, and where the boat’s position can be read off.',
        'Each person’s role for this trip, and who to ask when in doubt.',
        'The day’s plan in one sentence — where you are going, roughly how long, and what the weather is expected to do.',
      ],
    },
    {
      kind: 'text',
      text: 'A crew that has sailed together before still gets a briefing, because the boat may be different, the gear may have moved, the forecast is certainly different, and somebody new is often aboard. It takes three minutes and it is the cheapest safety equipment on the vessel.',
    },
    { kind: 'heading', text: 'Awareness is everybody’s' },
    {
      kind: 'text',
      text: 'Final responsibility is not the same as having the only pair of eyes. A crew member who notices a ship that has stopped changing bearing, a squall line building astern or a fitting working loose should say so immediately, without worrying about whether it is their place. It nearly always is. A boat where people stay quiet because they assume the skipper has already seen it is running on one sensor.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Speak up, and speak up early',
      text: 'The failure mode is not a crew member calling out something the skipper already knew. It is a crew member who saw something, assumed it had been noticed, and said nothing until it was too late to act cheaply. Report first, apologise for the duplication afterwards.',
    },
    { kind: 'heading', text: 'Rotating roles builds a crew' },
    {
      kind: 'text',
      text: 'Over a cruise, a good skipper moves people around: whoever trimmed yesterday navigates today. Each stint is long enough to understand the job rather than just survive it, and the result is a crew where more than one person can do more than one thing — which is what you want on the day somebody is seasick, injured or asleep.',
    },
    {
      kind: 'text',
      text: 'There is a second benefit that is easy to miss. Once you have knelt on a wet foredeck with both hands full and nothing to spare, you steer differently for whoever is up there next: you hold the boat where they need it, and you say what you are about to do before you do it. Having been on the receiving end is what turns an instruction into cooperation.',
    },
    { kind: 'heading', text: 'The legal backdrop, briefly' },
    {
      kind: 'text',
      text: 'Two layers of rule reach a recreational boat in United States waters, and it is worth knowing which is which. The federal layer lives in Titles 33 and 46 of the Code of Federal Regulations, and the Coast Guard enforces it — a boarding officer may stop the boat, look through her, and write up whatever is missing. On top of that sits whatever the state and the local authority require. Usually the state adds to the federal rule; occasionally, as with children and life jackets, a state rule displaces it on that state’s water instead.',
    },
    {
      kind: 'text',
      text: 'The consequence for a skipper is small and constant. The boat has to carry what she is required to carry, in a condition that still counts, and what is required of her may change somewhere between the harbour you left and the one you are heading for. The next two lessons cover that equipment. This lesson’s point is only that the citation has one name on it, however many people are aboard.',
    },
  ],
};
