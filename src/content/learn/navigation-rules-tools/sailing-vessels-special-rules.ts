import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'navigation-rules-tools-sailing-vessels-special-rules', moduleId: 'navigation-rules-tools', order: 3,
  title: 'Sailing Vessels & Special Rules',
  intro: 'Sail-on-sail right of way, where a sailing vessel sits in the general hierarchy, and the places the ordinary answer does not apply.',
  concepts: ['sailing-vessel-encounters', 'vessel-status-hierarchy', 'narrow-channels-traffic-separation', 'motorsailing'],
  blocks: [
    { kind: 'heading', text: 'Two sailing vessels: tack first, then windward' },
    { kind: 'text', text: 'Rule 12 resolves an encounter between two vessels under sail alone with two questions asked in order: are they on different tacks, or the same tack?' },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Different tacks — the vessel with the wind on her port side keeps out of the way of the other.',
        'Same tack — the vessel to windward keeps out of the way of the vessel to leeward. The windward boat has the clearer option: she can bear away.',
        'Port tack, other vessel to windward, tack not determinable — she keeps out of the way. The uncertainty falls on the port-tack vessel.',
      ],
    },
    { kind: 'definition', term: 'Windward side (Rule 12(b))', text: 'The side opposite the one on which the mainsail is carried. The boom lies to leeward, so windward is the side away from the boom.' },
    { kind: 'figure', assetId: 'custom-sail-opposite-tacks', caption: 'Opposite tacks: the wind reaches the two boats on different sides. The tack test is applied before anything else in a sail-on-sail encounter.' },
    { kind: 'figure', assetId: 'custom-sail-same-tack', caption: 'Same tack: the wind is on the same side of both boats, so the tack test cannot separate them and the windward/leeward relationship decides instead.' },
    { kind: 'heading', text: 'Motorsailing changes what you are' },
    { kind: 'text', text: 'A vessel propelled by machinery is a power-driven vessel under the Rules, sails set or not. Start the engine to push the boat along and Rule 12 no longer applies: you show a masthead light at night, and by day a black conical shape, apex downwards, forward where it can best be seen (Inland does not require it under 12 metres). It catches people out because a motorsailing boat still looks like a sailing vessel from a distance.' },
    { kind: 'heading', text: 'Vessels that cannot manoeuvre freely' },
    { kind: 'text', text: 'Some vessels genuinely cannot keep clear the way an ordinary vessel can, and Rule 18 shifts responsibility toward those who can. The categories here are: not under command (NUC — unable to manoeuvre through some exceptional circumstance), restricted in her ability to manoeuvre (RAM — restricted by the nature of her work, such as dredging or cable laying), engaged in fishing, sailing vessel, and ordinary power-driven vessel.' },
    { kind: 'table', caption: 'Rule 18 responsibilities, subject to Rules 9, 10 and 13', headers: ['Your status', 'Keep out of the way of'], rows: [
      ['Power-driven vessel underway', 'NUC, RAM, a vessel engaged in fishing, and a sailing vessel'],
      ['Sailing vessel underway', 'NUC, RAM, and a vessel engaged in fishing'],
      ['Vessel engaged in fishing, underway', 'NUC and RAM, so far as possible'],
      ['Any vessel except NUC or RAM (International)', 'Avoid impeding a vessel constrained by her draught showing the Rule 28 signals'],
    ] },
    { kind: 'callout', tone: 'warning', title: 'This is not a universal pecking order', text: 'Rule 18 opens with “Except where Rules 9, 10 and 13 otherwise require.” It is a default that yields to the situational rules, not a ladder that overrides them. A sailing vessel overtaking a power-driven vessel still keeps clear, because Rule 13 governs overtaking whatever the vessel types. A vessel under 20 metres — or a sailing vessel of any length — must not impede a vessel that can navigate safely only within a narrow channel, or one following a traffic lane. And Rule 18 says nothing about two vessels of the same category — that is what Rules 12 and 15 are for. Identify the situation first, then the duty.' },
    { kind: 'callout', tone: 'note', title: 'Constrained by draught is an International category', text: 'It is defined and signalled under the International Rules (Rules 3(h) and 28); the Inland Rule 28 is reserved. Even internationally the wording is “avoid impeding”, not an outright give-way duty, and both vessels remain fully bound by the steering rules if risk of collision develops.' },
    { kind: 'heading', text: 'Narrow channels and traffic separation schemes' },
    { kind: 'text', text: 'Rule 9 asks a vessel proceeding along a narrow channel to keep as near to the starboard-side outer limit as is safe and practicable. A vessel under 20 metres or a sailing vessel shall not impede a vessel that can safely navigate only within the channel, and no vessel should cross if crossing impedes such a vessel. Sound one prolonged blast nearing a blind bend, and avoid anchoring in the channel if the circumstances of the case admit.' },
    { kind: 'text', text: 'Rule 10 covers traffic separation schemes, the charted lanes that organise shipping around busy approaches. Use a lane in its direction of flow, keep clear of the separation zone, and join or leave at the ends or at a shallow angle. If you must cross, cross on a heading as nearly at right angles to the flow as practicable — least time in the lane, clearest intention. A vessel under 20 metres, a sailing vessel, or a vessel engaged in fishing may use the inshore traffic zone. The duty not to impede differs between them: a vessel fishing must not impede any vessel following a lane (Rule 10(i)), while a vessel under 20 metres or a sailing vessel must not impede the safe passage of a power-driven vessel following one (Rule 10(j)).' },
    { kind: 'callout', tone: 'note', title: '“Not impede” is a planning duty', text: 'It is discharged early, by acting in good time to leave the other vessel room for safe passage — not by asserting a right of way and reacting. It does not cancel the ordinary steering rules: if risk of collision develops anyway, both vessels remain fully bound by them.' },
  ],
};
