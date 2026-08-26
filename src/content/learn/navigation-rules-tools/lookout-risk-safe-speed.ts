import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'navigation-rules-tools-lookout-risk-safe-speed', moduleId: 'navigation-rules-tools', order: 1,
  title: 'Lookout, Risk & Safe Speed',
  intro: 'How the Rules expect you to watch, judge whether a risk of collision exists, and pick a speed that leaves you able to act.',
  concepts: ['lookout-and-risk-of-collision', 'safe-speed', 'stand-on-give-way', 'avoiding-action'],
  blocks: [
    { kind: 'heading', text: 'A proper lookout is continuous' },
    { kind: 'text', text: 'Rule 5 requires every vessel to keep a proper lookout at all times, by sight and hearing and by all available means appropriate to the conditions, so as to make a full appraisal of the situation and of the risk of collision. “All available means” does the work: eyes and ears first, then whatever the boat has.' },
    {
      kind: 'list',
      items: [
        'Scan the whole horizon, not just ahead — traffic overtaking from astern is the encounter most often missed.',
        'Move to see past the blind spots — a genoa, a dodger, or a crew member to leeward can hide a converging vessel for minutes.',
        'Keep the lookout a named job when the cockpit is busy with anchoring, reefing, or a problem below.',
      ],
    },
    { kind: 'heading', text: 'Does a risk of collision exist?' },
    { kind: 'text', text: 'Rule 7 gives a specific test. Take repeated compass bearings of the approaching vessel — hand-bearing compass, or sight her against a fixed part of your own boat on a steady heading. If her bearing does not appreciably change while the range closes, risk of collision is deemed to exist. A bearing drawing steadily forward or aft reassures; a bearing pinned in place is the warning.' },
    { kind: 'callout', tone: 'note', title: 'A changing bearing is not a guarantee', text: 'Risk may exist even with an appreciable bearing change — particularly with a very large vessel, a tow, or at close range. And if there is any doubt at all, the Rules direct you to assume it exists.' },
    { kind: 'callout', tone: 'warning', title: 'Do not build a plan on scanty information', text: 'Rule 7(c) prohibits assumptions made on scanty information, especially scanty radar information. A faint or intermittent contact is a reason to slow down and look harder, not to conclude nothing is there.' },
    { kind: 'heading', text: 'Safe speed' },
    { kind: 'definition', term: 'Safe speed', text: 'The speed at which you can take proper and effective action to avoid collision and be stopped within a distance appropriate to the prevailing circumstances and conditions. A judgement made continuously, not a number posted anywhere.' },
    { kind: 'text', text: 'Rule 6 lists what every vessel must weigh: visibility; traffic density; the boat’s own manoeuvrability, especially stopping distance and turning ability in the conditions of the moment; at night, background light from shore or back-scatter off your own lights; wind, sea, current and the proximity of hazards; and draft against the depth available. With operational radar, weigh also what it can and cannot do — its limitations, the range scale in use, and the real chance small craft go undetected.' },
    { kind: 'heading', text: 'Give-way, stand-on, and the action itself' },
    { kind: 'text', text: 'In most encounters the Rules name one vessel give-way and the other stand-on. The give-way vessel takes early and substantial action to keep well clear (Rule 16); the stand-on vessel keeps course and speed (Rule 17) so the other has something predictable to manoeuvre around.' },
    { kind: 'text', text: 'Rule 8 governs the action itself: positive, in ample time, consistent with good seamanship, and large enough to be readily apparent visually or by radar. Avoid a succession of small alterations — hard to detect, easy to misread. With sea room, one substantial course change is often cleanest, provided it does not create a fresh close-quarters situation; without it, slacken speed, stop, or reverse. The action is not finished until the other vessel is past and clear.' },
    { kind: 'callout', tone: 'warning', title: 'Stand-on does not mean holding course into a collision', text: 'A stand-on vessel may act as soon as it becomes apparent the give-way vessel is not doing what the Rules require, and must act once collision can no longer be avoided by the give-way vessel alone. In a power-driven crossing she should not alter to port for a vessel on her own port side. None of this releases the give-way vessel: her duty is not conditional on the other boat behaving well.' },
    { kind: 'callout', tone: 'note', title: 'Rule 2 sits over all of it', text: 'Nothing in the Rules excuses neglect of ordinary good seamanship or of any precaution the circumstances demand, and a departure is permitted where necessary to avoid immediate danger. That is a licence to be safe, not to invent a different right-of-way scheme.' },
  ],
};
