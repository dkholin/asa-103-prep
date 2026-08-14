import type { Question } from './types';

/**
 * Arc 1 question bank: Navigation Rules / Lights (ASA 103 scope).
 * Content follows the International Regulations for Preventing Collisions
 * at Sea (COLREGS) as presented in the USCG Navigation Rules handbook.
 */
export const QUESTIONS: Question[] = [
  {
    id: 'lights-power-underway',
    topic: 'nav-lights',
    format: 'visual',
    assetId: 'uscg-rule23a-power-under-50m',
    prompt:
      'Which navigation lights must a power-driven vessel less than 50 meters in length exhibit when underway at night?',
    choices: [
      { id: 'a', text: 'Masthead light, sidelights, and a sternlight' },
      {
        id: 'b',
        text: 'Sidelights and a sternlight only',
        whyWrong:
          'Sidelights and sternlight alone is the light configuration of a sailing vessel. A power-driven vessel must add a masthead light.',
      },
      {
        id: 'c',
        text: 'An all-round white light and sidelights only',
        whyWrong:
          'All-round white plus sidelights is only permitted for power-driven vessels less than 12 meters (Rule 23(d)), not vessels up to 50 meters.',
      },
      {
        id: 'd',
        text: 'Two masthead lights in a vertical line',
        whyWrong:
          'Two masthead lights in a vertical line is a towing signal (Rule 24), not the ordinary underway configuration.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 23(a): a power-driven vessel underway shall exhibit a masthead light forward, sidelights, and a sternlight. Vessels of 50 m or more add a second, higher masthead light abaft the first.',
    source: 'COLREGS Rule 23(a) — USCG Navigation Rules',
  },
  {
    id: 'lights-sail-underway',
    topic: 'nav-lights',
    format: 'visual',
    assetId: 'uscg-rule25a-sailing',
    prompt:
      'A sailing vessel underway (under sail alone) at night must exhibit which lights?',
    choices: [
      {
        id: 'a',
        text: 'Masthead light, sidelights, and a sternlight',
        whyWrong:
          'A masthead light is only shown when propelled by machinery. Under sail alone there is no masthead light — that is how you tell sail from power at night.',
      },
      { id: 'b', text: 'Sidelights and a sternlight' },
      {
        id: 'c',
        text: 'A single all-round white light',
        whyWrong:
          'A single all-round white light is an anchor light (or the light of a small power-driven vessel), not a sailing vessel underway.',
      },
      {
        id: 'd',
        text: 'Green over white all-round lights',
        whyWrong:
          'Green over white marks a vessel engaged in trawling (Rule 26(b)).',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Rule 25(a): a sailing vessel underway shall exhibit sidelights and a sternlight — no masthead light. (She may optionally add red-over-green all-round lights at the masthead.) If she starts her engine, she becomes a power-driven vessel and must show a masthead light.',
    source: 'COLREGS Rule 25(a) — USCG Navigation Rules',
  },
  {
    id: 'lights-anchored',
    topic: 'nav-lights',
    format: 'visual',
    assetId: 'uscg-rule30b-anchored',
    prompt:
      'At night, a vessel less than 50 meters in length at anchor must exhibit:',
    choices: [
      {
        id: 'a',
        text: 'Sidelights and a sternlight',
        whyWrong:
          'Sidelights and sternlight are underway lights. A vessel at anchor is not underway and shows none of them.',
      },
      { id: 'b', text: 'An all-round white light where it can best be seen' },
      {
        id: 'c',
        text: 'A flashing yellow light',
        whyWrong:
          'A flashing yellow light identifies special craft such as air-cushion vessels — it has nothing to do with anchoring.',
      },
      {
        id: 'd',
        text: 'Red over red all-round lights',
        whyWrong:
          'Red over red ("red over red, the captain is dead") marks a vessel not under command, not a vessel at anchor.',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Rule 30: a vessel at anchor exhibits an all-round white light where it can best be seen (vessels of 50 m or more show a second, lower one aft). By day she hoists a black ball forward.',
    source: 'COLREGS Rule 30 — USCG Navigation Rules',
  },
  {
    id: 'lights-trawling',
    topic: 'nav-lights',
    format: 'visual',
    assetId: 'uscg-rule26b-trawling',
    prompt:
      'A vessel engaged in trawling is identified at night by which all-round light combination?',
    choices: [
      {
        id: 'a',
        text: 'Red over white',
        whyWrong:
          '"Red over white, fishing at night" — red over white marks a vessel fishing other than trawling (nets, lines).',
      },
      { id: 'b', text: 'Green over white' },
      {
        id: 'c',
        text: 'Red over red',
        whyWrong: 'Red over red marks a vessel not under command.',
      },
      {
        id: 'd',
        text: 'White over white',
        whyWrong:
          'Two white lights in a vertical line at the masthead indicate a vessel towing (tow up to 200 m).',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Rule 26(b): a vessel engaged in trawling shows green over white all-round lights ("green over white, trawling tonight"), plus sidelights and a sternlight when making way.',
    source: 'COLREGS Rule 26(b) — USCG Navigation Rules',
  },
  {
    id: 'lights-id-green-only',
    topic: 'nav-lights',
    format: 'visual',
    assetId: 'custom-night-green-only',
    prompt:
      'At night you sight a single green light low over the water, with no white light above it. What are you most likely looking at?',
    choices: [
      {
        id: 'a',
        text: "A power-driven vessel crossing — you see its starboard side",
        whyWrong:
          'A power-driven vessel would also show a white masthead light above its sidelight. There is no white light here.',
      },
      {
        id: 'b',
        text: "A sailing vessel's starboard side",
      },
      {
        id: 'c',
        text: 'A vessel at anchor',
        whyWrong: 'An anchored vessel shows a white all-round light, not green.',
      },
      {
        id: 'd',
        text: "A vessel's sternlight",
        whyWrong: 'A sternlight is white, not green.',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'A green sidelight with no masthead light above it is the classic signature of a sailing vessel seen on her starboard side. She is crossing from your left to your right (or you are on her starboard hand). A power-driven vessel would carry a white masthead light above the sidelight.',
    source: 'COLREGS Rules 21, 23, 25 — USCG Navigation Rules',
  },
  {
    id: 'lights-id-headon-night',
    topic: 'nav-lights',
    format: 'visual',
    assetId: 'custom-night-headon',
    prompt:
      'Dead ahead at night you see a white light with a green light below-left and a red light below-right. What is the situation, and what should you do?',
    choices: [
      {
        id: 'a',
        text: 'A vessel is crossing left to right — hold course and speed',
        whyWrong:
          'Seeing both sidelights at once means she is coming straight at you, not crossing.',
      },
      {
        id: 'b',
        text: 'A power-driven vessel is approaching head-on — alter course to starboard',
      },
      {
        id: 'c',
        text: 'A vessel is anchored ahead — pass on either side',
        whyWrong:
          'An anchored vessel shows only white light(s). Red and green sidelights mean she is underway and heading toward you.',
      },
      {
        id: 'd',
        text: 'A sailing vessel is approaching — you must give way',
        whyWrong:
          'The white masthead light above the sidelights tells you she is power-driven, not sailing.',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Both sidelights plus a masthead light seen together means a power-driven vessel is meeting you head-on (Rule 14). Each vessel alters course to starboard so they pass port side to port side.',
    source: 'COLREGS Rules 14, 21, 23 — USCG Navigation Rules',
  },
  {
    id: 'rules-crossing-power',
    topic: 'right-of-way',
    format: 'visual',
    assetId: 'custom-crossing',
    prompt:
      'You are under power. Another power-driven vessel approaches from your starboard bow on a steady bearing (diagram). Who must give way, and what is the correct action?',
    choices: [
      {
        id: 'a',
        text: 'You give way — preferably alter course to starboard and pass astern of her',
      },
      {
        id: 'b',
        text: 'She gives way, because you are the faster vessel',
        whyWrong:
          'Speed does not decide a crossing situation. The vessel that has the other on her own starboard side gives way.',
      },
      {
        id: 'c',
        text: 'You hold course; she must cross ahead of you',
        whyWrong:
          'The vessel with the other on her starboard side is the give-way vessel — that is you here.',
      },
      {
        id: 'd',
        text: 'Both vessels alter course to port',
        whyWrong:
          'Altering to port for a vessel on your own starboard side is exactly what Rule 15 warns against — avoid crossing ahead.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 15: when two power-driven vessels cross, the one that has the other on her starboard side keeps out of the way and, if circumstances admit, avoids crossing ahead. Alter to starboard early and clearly, and pass astern. The other vessel is the stand-on vessel (Rule 17) and holds course and speed.',
    source: 'COLREGS Rules 15, 17 — USCG Navigation Rules',
  },
  {
    id: 'rules-overtaking',
    topic: 'right-of-way',
    format: 'visual',
    assetId: 'custom-overtaking',
    prompt:
      'You are overtaking a slower vessel, coming up from well abaft her beam (diagram). You are under sail; she is under power. Who keeps clear?',
    choices: [
      {
        id: 'a',
        text: 'She does — power gives way to sail',
        whyWrong:
          'The sail-over-power pecking order does not apply when overtaking. Rule 13 overrides it: any vessel overtaking keeps clear.',
      },
      { id: 'b', text: 'You do — any vessel overtaking keeps clear' },
      {
        id: 'c',
        text: 'Whoever is smaller keeps clear',
        whyWrong: 'Vessel size is not a right-of-way criterion.',
      },
      {
        id: 'd',
        text: 'Neither — the vessels sort it out by radio',
        whyWrong:
          'Radio arrangement never replaces the Rules. Rule 13 assigns the obligation to the overtaking vessel.',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Rule 13: any vessel overtaking any other shall keep out of the way of the vessel being overtaken — regardless of whether the overtaker is sail or power. "Overtaking" means approaching from more than 22.5° abaft the other vessel\'s beam (at night, you would see only her sternlight).',
    source: 'COLREGS Rule 13 — USCG Navigation Rules',
  },
  {
    id: 'rules-sail-opposite-tacks',
    topic: 'right-of-way',
    format: 'visual',
    assetId: 'custom-sail-opposite-tacks',
    prompt:
      'Two sailing vessels are converging (diagram). Boat A has the wind on her port side; boat B has the wind on her starboard side. Who gives way?',
    choices: [
      { id: 'a', text: 'Boat A — the vessel with the wind on her port side keeps clear' },
      {
        id: 'b',
        text: 'Boat B — starboard tack always gives way',
        whyWrong:
          'It is the other way around: the port-tack boat (wind on port side) keeps clear of the starboard-tack boat.',
      },
      {
        id: 'c',
        text: 'The boat that is to windward',
        whyWrong:
          'Windward-keeps-clear applies only when both boats have the wind on the same side. Here they are on opposite tacks.',
      },
      {
        id: 'd',
        text: 'The larger of the two boats',
        whyWrong: 'Size is not a right-of-way criterion.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 12(a)(i): when two sailing vessels have the wind on different sides, the vessel with the wind on the port side (port tack) keeps out of the way of the other. Boat A is on port tack, so boat A gives way.',
    source: 'COLREGS Rule 12(a)(i) — USCG Navigation Rules',
  },
  {
    id: 'rules-sail-same-tack',
    topic: 'right-of-way',
    format: 'visual',
    assetId: 'custom-sail-same-tack',
    prompt:
      'Two sailing vessels on the same tack are converging (diagram). Boat A is to windward; boat B is to leeward. Who gives way?',
    choices: [
      {
        id: 'a',
        text: 'Boat B — the leeward boat keeps clear',
        whyWrong:
          'The leeward boat is the stand-on vessel. The windward boat can maneuver away from the wind more freely, so she keeps clear.',
      },
      { id: 'b', text: 'Boat A — the windward boat keeps clear' },
      {
        id: 'c',
        text: 'The boat on port tack',
        whyWrong:
          'The port/starboard tack rule applies when the boats have the wind on different sides. Here they are on the same tack.',
      },
      {
        id: 'd',
        text: 'Whichever boat is moving faster',
        whyWrong: 'Speed is not a right-of-way criterion between sailing vessels.',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Rule 12(a)(ii): when both sailing vessels have the wind on the same side, the vessel to windward keeps out of the way of the vessel to leeward. Boat A (windward) gives way.',
    source: 'COLREGS Rule 12(a)(ii) — USCG Navigation Rules',
  },
  {
    id: 'sound-one-short',
    topic: 'sound-signals',
    format: 'text',
    prompt:
      'Under the International Rules, a power-driven vessel in sight of another sounds ONE short blast. What does it mean?',
    choices: [
      { id: 'a', text: '"I am altering my course to starboard"' },
      {
        id: 'b',
        text: '"I am altering my course to port"',
        whyWrong: 'Altering to port is TWO short blasts.',
      },
      {
        id: 'c',
        text: '"I intend to leave you on my port side"',
        whyWrong:
          'That is the Inland Rules meaning (an intent/agreement signal). Internationally, one short blast announces an actual turn to starboard.',
      },
      {
        id: 'd',
        text: '"I am operating astern propulsion"',
        whyWrong: 'Astern propulsion is THREE short blasts.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 34(a) International: one short blast = "I am altering my course to starboard"; two short = to port; three short = operating astern propulsion. (Inland Rules use the same blasts as intent signals which the other vessel must answer.)',
    source: 'COLREGS Rule 34(a) — USCG Navigation Rules',
  },
  {
    id: 'sound-five-short',
    topic: 'sound-signals',
    format: 'text',
    prompt:
      'Another vessel sounds five or more short, rapid blasts at you. What is she signaling?',
    choices: [
      {
        id: 'a',
        text: 'She is turning around',
        whyWrong: 'There is no five-blast turning signal.',
      },
      {
        id: 'b',
        text: 'Danger — she doubts your intentions or that sufficient action is being taken to avoid collision',
      },
      {
        id: 'c',
        text: 'She is about to anchor',
        whyWrong: 'Anchoring has no maneuvering sound signal of its own.',
      },
      {
        id: 'd',
        text: 'She is requesting a bridge opening',
        whyWrong:
          'A bridge opening request is one prolonged blast followed by one short blast (Inland).',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Rule 34(d): five or more short and rapid blasts is the danger/doubt signal — the other vessel either fails to understand your intentions or doubts you are taking sufficient action to avoid collision. Treat it as an urgent wake-up call and reassess immediately.',
    source: 'COLREGS Rule 34(d) — USCG Navigation Rules',
  },
  {
    id: 'sound-fog-power-making-way',
    topic: 'sound-signals',
    format: 'text',
    prompt:
      'In fog (restricted visibility), a power-driven vessel MAKING WAY through the water sounds:',
    choices: [
      { id: 'a', text: 'One prolonged blast at intervals of not more than 2 minutes' },
      {
        id: 'b',
        text: 'Two prolonged blasts at intervals of not more than 2 minutes',
        whyWrong:
          'Two prolonged blasts is the signal for a power-driven vessel underway but STOPPED and making no way.',
      },
      {
        id: 'c',
        text: 'One prolonged and two short blasts',
        whyWrong:
          'Prolonged + two short marks vessels that are sailing, fishing, towing, not under command, restricted in ability to maneuver, or constrained by draft.',
      },
      {
        id: 'd',
        text: 'Rapid ringing of a bell for 5 seconds',
        whyWrong: 'Rapid bell ringing is the fog signal of a vessel at ANCHOR.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 35(a): in or near restricted visibility, a power-driven vessel making way sounds one prolonged blast at intervals of not more than 2 minutes. Stopped and making no way: two prolonged blasts (Rule 35(b)). Sailing vessels use one prolonged + two short.',
    source: 'COLREGS Rule 35 — USCG Navigation Rules',
  },
];

/**
 * Deterministic Arc 1 mock-exam selection: two questions from each topic.
 * A full 100-question exam is out of scope for Arc 1.
 */
export const MOCK_QUESTION_IDS: string[] = [
  'lights-power-underway',
  'lights-id-green-only',
  'rules-crossing-power',
  'rules-sail-opposite-tacks',
  'sound-one-short',
  'sound-fog-power-making-way',
];
