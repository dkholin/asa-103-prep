import type { Question, TopicId } from './types';
import { TOPIC_IDS } from './topics';
import { shuffle } from '../lib/shuffle';

/**
 * Arc 1 question bank: Navigation Rules / Lights (ASA 103 scope).
 * Content follows the International Regulations for Preventing Collisions
 * at Sea (COLREGS) as presented in the USCG Navigation Rules handbook.
 */
export const QUESTIONS: Question[] = [
  {
    id: 'lights-power-underway',
    topic: 'nav-lights',
    concepts: ['navigation-lights'],
    format: 'visual',
    assetId: 'photo-power-vessel-underway',
    prompt:
      'The vessel shown is a power-driven vessel less than 50 meters in length. Which navigation lights must she exhibit when underway at night?',
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
    concepts: ['navigation-lights'],
    format: 'visual',
    assetId: 'photo-sailing-vessel-underway',
    prompt:
      'The boat shown is underway under sail alone. At night, which lights must a sailing vessel in this state exhibit?',
    choices: [
      {
        id: 'd',
        text: 'Green over white all-round lights',
        whyWrong:
          'Green over white marks a vessel engaged in trawling (Rule 26(b)).',
      },
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
    ],
    correctChoiceId: 'b',
    explanation:
      'Rule 25(a): a sailing vessel underway shall exhibit sidelights and a sternlight — no masthead light. (She may optionally add red-over-green all-round lights at the masthead.) If she starts her engine, she becomes a power-driven vessel and must show a masthead light.',
    source: 'COLREGS Rule 25(a) — USCG Navigation Rules',
  },
  {
    id: 'lights-anchored',
    topic: 'nav-lights',
    concepts: ['special-vessel-lights'],
    format: 'visual',
    assetId: 'photo-vessel-at-anchor',
    prompt:
      'The boat shown is lying at anchor. At night, a vessel less than 50 meters in length at anchor must exhibit:',
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
    concepts: ['special-vessel-lights'],
    format: 'visual',
    assetId: 'photo-trawler-gear-out',
    prompt:
      'The vessel shown is engaged in trawling. At night, which all-round light combination identifies her?',
    choices: [
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
      {
        id: 'a',
        text: 'Red over white',
        whyWrong:
          '"Red over white, fishing at night" — red over white marks a vessel fishing other than trawling (nets, lines).',
      },
      { id: 'b', text: 'Green over white' },
    ],
    correctChoiceId: 'b',
    explanation:
      'Rule 26(b): a vessel engaged in trawling shows green over white all-round lights ("green over white, trawling tonight"), plus sidelights and a sternlight when making way.',
    source: 'COLREGS Rule 26(b) — USCG Navigation Rules',
  },
  {
    id: 'lights-id-green-only',
    topic: 'nav-lights',
    concepts: ['navigation-lights'],
    format: 'visual',
    assetId: 'custom-night-green-only',
    prompt:
      'At night you sight a single green light low over the water, with no white light above it. What are you most likely looking at?',
    choices: [
      {
        id: 'd',
        text: "A vessel's sternlight",
        whyWrong: 'A sternlight is white, not green.',
      },
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
    ],
    correctChoiceId: 'b',
    explanation:
      'A green sidelight with no masthead light above it is the classic signature of a sailing vessel seen on her starboard side. She is crossing from your left to your right (or you are on her starboard hand). A power-driven vessel would carry a white masthead light above the sidelight.',
    source: 'COLREGS Rules 21, 23, 25 — USCG Navigation Rules',
  },
  {
    id: 'lights-id-headon-night',
    topic: 'nav-lights',
    concepts: ['navigation-lights'],
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
    concepts: ['crossing-situation'],
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
    concepts: ['overtaking-situation'],
    format: 'visual',
    assetId: 'custom-overtaking',
    prompt:
      'You are overtaking a slower vessel, coming up from well abaft her beam (diagram). You are under sail; she is under power. Who keeps clear?',
    choices: [
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
      {
        id: 'a',
        text: 'She does — power gives way to sail',
        whyWrong:
          'The sail-over-power pecking order does not apply when overtaking. Rule 13 overrides it: any vessel overtaking keeps clear.',
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
    concepts: ['sailing-vessel-encounters'],
    format: 'visual',
    assetId: 'custom-sail-opposite-tacks',
    prompt:
      'Two sailing vessels are converging (diagram). Boat A has the wind on her port side; boat B has the wind on her starboard side. Who gives way?',
    choices: [
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
      { id: 'a', text: 'Boat A — the vessel with the wind on her port side keeps clear' },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 12(a)(i): when two sailing vessels have the wind on different sides, the vessel with the wind on the port side (port tack) keeps out of the way of the other. Boat A is on port tack, so boat A gives way.',
    source: 'COLREGS Rule 12(a)(i) — USCG Navigation Rules',
  },
  {
    id: 'rules-sail-same-tack',
    topic: 'right-of-way',
    concepts: ['sailing-vessel-encounters'],
    format: 'visual',
    assetId: 'custom-sail-same-tack',
    prompt:
      'Two sailing vessels on the same tack are converging (diagram). Boat A is to windward; boat B is to leeward. Who gives way?',
    choices: [
      {
        id: 'd',
        text: 'Whichever boat is moving faster',
        whyWrong: 'Speed is not a right-of-way criterion between sailing vessels.',
      },
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
    ],
    correctChoiceId: 'b',
    explanation:
      'Rule 12(a)(ii): when both sailing vessels have the wind on the same side, the vessel to windward keeps out of the way of the vessel to leeward. Boat A (windward) gives way.',
    source: 'COLREGS Rule 12(a)(ii) — USCG Navigation Rules',
  },
  {
    id: 'sound-one-short',
    topic: 'sound-signals',
    concepts: ['sound-signals'],
    format: 'text',
    prompt:
      'Under the International Rules, a power-driven vessel in sight of another sounds ONE short blast. What does it mean?',
    choices: [
      {
        id: 'd',
        text: '"I am operating astern propulsion"',
        whyWrong: 'Astern propulsion is THREE short blasts.',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 34(a) International: one short blast = "I am altering my course to starboard"; two short = to port; three short = operating astern propulsion. (Inland Rules use the same blasts as intent signals which the other vessel must answer.)',
    source: 'COLREGS Rule 34(a) — USCG Navigation Rules',
  },
  {
    id: 'sound-five-short',
    topic: 'sound-signals',
    concepts: ['sound-signals'],
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
    concepts: ['sound-signals'],
    format: 'text',
    prompt:
      'In fog (restricted visibility), a power-driven vessel MAKING WAY through the water sounds:',
    choices: [
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
      { id: 'a', text: 'One prolonged blast at intervals of not more than 2 minutes' },
      {
        id: 'b',
        text: 'Two prolonged blasts at intervals of not more than 2 minutes',
        whyWrong:
          'Two prolonged blasts is the signal for a power-driven vessel underway but STOPPED and making no way.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 35(a): in or near restricted visibility, a power-driven vessel making way sounds one prolonged blast at intervals of not more than 2 minutes. Stopped and making no way: two prolonged blasts (Rule 35(b)). Sailing vessels use one prolonged + two short.',
    source: 'COLREGS Rule 35 — USCG Navigation Rules',
  },
  {
    id: 'rule6-safe-speed-factors',
    topic: 'right-of-way',
    concepts: ['safe-speed'],
    format: 'text',
    prompt:
      'When determining a safe speed, Rule 6 requires every vessel to take into account which of the following?',
    choices: [
      {
        id: 'b',
        text: 'Only the posted speed limit for the waterway',
        whyWrong:
          'Rule 6 is a collision-avoidance rule, not a speed-limit rule — it applies everywhere, posted limit or not.',
      },
      {
        id: 'c',
        text: "Only whether the vessel's engine can reach full throttle",
        whyWrong:
          'Engine capability alone says nothing about visibility, traffic, or maneuverability — the actual Rule 6 factors.',
      },
      {
        id: 'd',
        text: 'Only the presence of other vessels displaying lights at night',
        whyWrong:
          'Safe speed must be assessed by day and night, and depends on far more than what lights you can see.',
      },
      {
        id: 'a',
        text: 'Visibility, traffic density, and the vessel\'s stopping distance and turning ability',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 6(a) lists factors every vessel must weigh: visibility; traffic density; your own stopping distance and turning ability; background lighting at night; wind, sea, current, and nearby navigational hazards; and draft in relation to available depth. Safe speed is the speed that lets you take proper and effective action to avoid collision and stop within a distance appropriate to the circumstances.',
    source: 'COLREGS Rule 6(a) — USCG Navigation Rules',
  },
  {
    id: 'rule6-safe-speed-radar',
    topic: 'right-of-way',
    concepts: ['safe-speed'],
    format: 'text',
    prompt:
      'You are underway with your radar operating. Rule 6(b) adds which additional factor to your safe-speed decision, beyond the factors that apply to every vessel?',
    choices: [
      {
        id: 'c',
        text: "The vessel's registration length only",
        whyWrong: 'Registered length is not itself a safe-speed factor under Rule 6.',
      },
      {
        id: 'd',
        text: 'The cost of fuel at the current speed',
        whyWrong: 'Fuel economy plays no part in the Rule 6 safe-speed analysis.',
      },
      {
        id: 'a',
        text: 'The characteristics, range scale, and limitations of the radar set in use',
      },
      {
        id: 'b',
        text: "The number of passengers aboard",
        whyWrong: 'Passenger count is not a Rule 6 safe-speed factor.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      "Rule 6(b) requires vessels with operational radar to additionally weigh the radar's characteristics and limitations, the range scale in use, sea/weather effects on radar detection, the possibility small vessels or ice may not be detected at adequate range, the number and movement of vessels detected, and the more exact assessment of visibility that ranging on radar targets may provide.",
    source: 'COLREGS Rule 6(b) — USCG Navigation Rules',
  },
  {
    id: 'rule7-risk-bearing',
    topic: 'right-of-way',
    concepts: ['lookout-and-risk-of-collision'],
    format: 'text',
    prompt:
      'You are tracking an approaching vessel and notice her compass bearing from you is not appreciably changing over several minutes. What does Rule 7 say this indicates?',
    choices: [
      {
        id: 'd',
        text: 'Nothing — bearing drift is only meaningful on radar',
        whyWrong:
          'A steady visual compass bearing is itself the traditional way mariners detect collision risk, radar or not.',
      },
      {
        id: 'a',
        text: 'Risk of collision shall be deemed to exist',
      },
      {
        id: 'b',
        text: 'The vessels will safely pass close aboard',
        whyWrong:
          'A steady bearing is the classic sign of a closing collision course, not a safe close pass.',
      },
      {
        id: 'c',
        text: 'The other vessel is overtaking you',
        whyWrong:
          'A steady bearing alone does not identify overtaking versus crossing or head-on — it identifies risk of collision.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 7(d)(i): if the compass bearing of an approaching vessel does not appreciably change, risk of collision shall be deemed to exist. Rule 7(a) also directs that if there is any doubt, such risk shall be deemed to exist. Exam cue: steady bearing, decreasing range = collision risk.',
    source: 'COLREGS Rule 7(a), 7(d) — USCG Navigation Rules',
  },
  {
    id: 'rule7-scanty-information',
    topic: 'right-of-way',
    concepts: ['lookout-and-risk-of-collision'],
    format: 'text',
    prompt:
      'Rule 7(c) specifically warns against doing what, when assessing risk of collision?',
    choices: [
      {
        id: 'b',
        text: 'Using radar at all in clear weather',
        whyWrong:
          'Radar may be used any time it is fitted and operational; Rule 7(b) actually requires proper use of it if fitted.',
      },
      {
        id: 'c',
        text: 'Posting a lookout in addition to using radar',
        whyWrong: 'Posting a lookout is required, not discouraged (Rule 5).',
      },
      {
        id: 'd',
        text: 'Reducing speed while assessing the situation',
        whyWrong: 'Reducing speed while assessing a developing situation is good practice, not prohibited.',
      },
      {
        id: 'a',
        text: 'Making assumptions on the basis of scanty information, especially scanty radar information',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      "Rule 7(c): assumptions shall not be made on the basis of scanty information, especially scanty radar information. A weak or ambiguous radar return is not enough to conclude risk of collision does not exist — when in doubt, Rule 7(a) says assume it does.",
    source: 'COLREGS Rule 7(c) — USCG Navigation Rules',
  },
  {
    id: 'rule8-early-substantial',
    topic: 'right-of-way',
    concepts: ['avoiding-action'],
    format: 'text',
    prompt:
      'Rule 8(a) says any action taken to avoid collision shall be:',
    choices: [
      {
        id: 'b',
        text: 'Delayed until the last safe moment, to avoid overreacting',
        whyWrong:
          'Rule 8 requires early action — waiting until the last moment is exactly what it warns against.',
      },
      {
        id: 'c',
        text: 'Communicated by VHF radio before being taken',
        whyWrong:
          'The Rules do not require or depend on a radio call; action must be taken according to the Rules regardless of radio contact.',
      },
      {
        id: 'd',
        text: 'Left to whichever vessel is more maneuverable',
        whyWrong:
          'Rule 8 applies to whichever vessel is required to act under the other Rules — maneuverability is not the deciding factor.',
      },
      {
        id: 'a',
        text: 'Positive, made in ample time, and in accordance with good seamanship',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 8(a): any action to avoid collision shall, if the circumstances admit, be positive, made in ample time, and with due regard to the observance of good seamanship.',
    source: 'COLREGS Rule 8(a) — USCG Navigation Rules',
  },
  {
    id: 'rule8-substantial-alterations',
    topic: 'right-of-way',
    concepts: ['avoiding-action'],
    format: 'text',
    prompt:
      'Rule 8(b) says that when altering course and/or speed to avoid collision, you should:',
    choices: [
      {
        id: 'a',
        text: 'Make the alteration large enough to be readily apparent to the other vessel, avoiding a succession of small changes',
      },
      {
        id: 'b',
        text: 'Make a series of small course nudges so the change is barely noticeable',
        whyWrong:
          'Rule 8(b) specifically warns against a succession of small alterations — they are easy for the other vessel to miss or misread.',
      },
      {
        id: 'c',
        text: 'Alter speed only, never course',
        whyWrong: 'Rule 8 allows alteration of course, speed, or both — whichever is most effective.',
      },
      {
        id: 'd',
        text: 'Wait for the other vessel to alter first',
        whyWrong:
          'Rule 8 places the obligation on whichever vessel is required to act — waiting is not a substitute for taking that action.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 8(b): if there is sufficient sea room, alteration of course alone may be the most effective action, provided it is made in good time, is substantial, and does not result in another close-quarters situation. Small, timid alterations are hard for the other vessel to detect and assess.',
    source: 'COLREGS Rule 8(b) — USCG Navigation Rules',
  },
  {
    id: 'rule8-slacken-stop-reverse',
    topic: 'right-of-way',
    concepts: ['avoiding-action'],
    format: 'text',
    prompt:
      'If you have insufficient sea room to avoid a close-quarters situation by altering course alone, Rule 8(e) says you should:',
    choices: [
      {
        id: 'd',
        text: 'Switch off navigation lights so the other vessel reacts first',
        whyWrong: 'Navigation lights must never be switched off underway — this is unsafe and unlawful.',
      },
      {
        id: 'a',
        text: 'Slacken your speed, stop, or reverse propulsion as necessary',
      },
      {
        id: 'b',
        text: 'Increase speed to clear the area faster',
        whyWrong:
          'Increasing speed when sea room is tight raises collision risk rather than reducing it, and is not what Rule 8(e) directs.',
      },
      {
        id: 'c',
        text: 'Sound the danger signal and hold course regardless',
        whyWrong:
          'The danger signal (Rule 34(d)) may be appropriate, but it does not replace the duty to actually slow, stop, or reverse when needed.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 8(e): if necessary to avoid collision or allow more time to assess the situation, a vessel shall slacken her speed or take all way off by stopping or reversing her means of propulsion.',
    source: 'COLREGS Rule 8(e) — USCG Navigation Rules',
  },
  {
    id: 'rules-sail-uncertain-tack',
    topic: 'right-of-way',
    concepts: ['sailing-vessel-encounters'],
    format: 'text',
    prompt:
      'You are on a sailing vessel with the wind on your port side. You see another sailing vessel to windward but cannot tell whether she has the wind on her port or starboard side. What must you do?',
    choices: [
      {
        id: 'a',
        text: 'Keep out of the way of the other vessel',
      },
      {
        id: 'b',
        text: 'Hold your course, since you cannot confirm she is on the opposite tack',
        whyWrong:
          "Uncertainty does not let you assume you're stand-on — Rule 12(a)(iii) puts the burden on you specifically because you can't confirm her tack.",
      },
      {
        id: 'c',
        text: 'Sound the danger signal and wait for her to respond',
        whyWrong:
          'The Rules require you to keep clear, not to wait for a signal exchange to resolve the uncertainty.',
      },
      {
        id: 'd',
        text: 'Assume she is on your same tack and hold course',
        whyWrong:
          'You cannot assume a favorable case; Rule 12(a)(iii) requires you to act as the give-way vessel until you know otherwise.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 12(a)(iii): if a vessel with the wind on the port side sees a vessel to windward and cannot determine with certainty whether the other vessel has the wind on the port or starboard side, she shall keep out of the way of the other. Exam cue: when in doubt about the other sailing vessel\'s tack, you keep clear.',
    source: 'COLREGS Rule 12(a)(iii) — USCG Navigation Rules',
  },
  {
    id: 'rules-sail-windward-defn',
    topic: 'right-of-way',
    concepts: ['sailing-vessel-encounters'],
    format: 'text',
    prompt:
      "Rule 12(b) defines a sailing vessel's windward side as:",
    choices: [
      {
        id: 'a',
        text: 'The side opposite to the one on which the mainsail is carried',
      },
      {
        id: 'b',
        text: 'Whichever side the helmsman is sitting on',
        whyWrong: 'Helm position has nothing to do with the Rule 12(b) definition of windward.',
      },
      {
        id: 'c',
        text: 'The side closest to the nearest shore',
        whyWrong: 'Windward is about the wind, not proximity to land.',
      },
      {
        id: 'd',
        text: 'The bow of the vessel',
        whyWrong: 'Windward describes a side (port or starboard), not the bow or stern.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      "Rule 12(b): the windward side is the side opposite to that on which the mainsail is carried (or, on a square-rigged vessel, opposite the side carrying the largest fore-and-aft sail). The boom points to leeward, so windward is the side away from where the boom is out.",
    source: 'COLREGS Rule 12(b) — USCG Navigation Rules',
  },
  {
    id: 'rules-sail-give-way-exceptions',
    topic: 'right-of-way',
    concepts: ['vessel-status-hierarchy'],
    format: 'text',
    prompt:
      'A sailing vessel is normally the stand-on vessel over an ordinary power-driven vessel. Under Rule 18, which vessels must a sailing vessel still keep out of the way of?',
    choices: [
      {
        id: 'c',
        text: 'No one — sailing vessels are always stand-on',
        whyWrong:
          'Rule 18(b) specifically lists vessels a sailing vessel must give way to, so "always stand-on" is incorrect.',
      },
      {
        id: 'd',
        text: 'Only other sailing vessels on the opposite tack',
        whyWrong:
          'Tack governs sailing-vessel-to-sailing-vessel encounters under Rule 12, not the Rule 18 hierarchy against other vessel types.',
      },
      {
        id: 'a',
        text: 'A vessel not under command, a vessel restricted in her ability to maneuver, and a vessel engaged in fishing',
      },
      {
        id: 'b',
        text: 'Any vessel that is larger than her',
        whyWrong: 'Size is not a Rule 18 criterion.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 18(b): a sailing vessel underway shall keep out of the way of a vessel not under command, a vessel restricted in her ability to maneuver, and a vessel engaged in fishing. She remains stand-on only against ordinary power-driven vessels (subject to Rules 9, 10, and 13).',
    source: 'COLREGS Rule 18(b) — USCG Navigation Rules',
  },
  {
    id: 'rules-sail-same-tack-text',
    topic: 'right-of-way',
    concepts: ['sailing-vessel-encounters'],
    format: 'text',
    prompt:
      'Two sailing vessels are running before the wind on the same tack, converging. Vessel A is directly upwind of vessel B. Which vessel must keep clear?',
    choices: [
      {
        id: 'd',
        text: 'Whichever vessel has less sail area',
        whyWrong: 'Sail area is not a right-of-way criterion.',
      },
      { id: 'a', text: 'Vessel A, because she is to windward' },
      {
        id: 'b',
        text: 'Vessel B, because she is closer to the wind\'s source',
        whyWrong:
          'Vessel B is to leeward here, not to windward — the leeward vessel is the stand-on vessel under Rule 12(a)(ii).',
      },
      {
        id: 'c',
        text: 'Neither — same-tack sailing vessels have no right-of-way rule',
        whyWrong: 'Rule 12(a)(ii) specifically covers this same-tack case.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 12(a)(ii): when both sailing vessels have the wind on the same side, the vessel that is to windward keeps out of the way of the vessel that is to leeward. Vessel A, being upwind of B, is to windward and must give way.',
    source: 'COLREGS Rule 12(a)(ii) — USCG Navigation Rules',
  },
  {
    id: 'rules-motorsailing',
    topic: 'right-of-way',
    concepts: ['motorsailing'],
    format: 'text',
    prompt:
      'A sailboat has her sails up but is also running her engine to help her make way. Under the Rules, how is she classified?',
    choices: [
      {
        id: 'a',
        text: 'A power-driven vessel',
      },
      {
        id: 'b',
        text: 'A sailing vessel, because her sails are set',
        whyWrong:
          'Rule 3(b) is explicit: a vessel under sail that is also being propelled by machinery is a power-driven vessel, sails or no sails.',
      },
      {
        id: 'c',
        text: 'A vessel not under command',
        whyWrong:
          'Not under command means she cannot maneuver as required by the Rules due to an exceptional circumstance — running an engine is not that.',
      },
      {
        id: 'd',
        text: 'Either sail or power, at the skipper\'s discretion',
        whyWrong: 'Classification under the Rules is not discretionary — it is fixed by whether machinery is propelling the vessel.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 3(b): "power-driven vessel" means any vessel propelled by machinery. A sailing vessel motor-sailing is legally a power-driven vessel and must show a masthead light at night and, by day, a black conical day shape, apex down (Rule 25(e)). Exam cue: engine on + sails up = power-driven for right-of-way purposes.',
    source: 'COLREGS Rules 3(b), 25(e) — USCG Navigation Rules',
  },
  {
    id: 'rules-overtaking-defn-angle',
    topic: 'right-of-way',
    concepts: ['overtaking-situation'],
    format: 'text',
    prompt:
      'A vessel is considered to be "overtaking" another when she is approaching from:',
    choices: [
      {
        id: 'c',
        text: 'Directly astern only, within 5 degrees of the wake',
        whyWrong: 'The overtaking sector is much wider than 5 degrees — it is any position more than 22.5° abaft the beam on either side.',
      },
      {
        id: 'd',
        text: 'Any position where both vessels are on parallel courses',
        whyWrong: 'Parallel courses alone do not define overtaking; the defining test is the bearing from the overtaken vessel.',
      },
      {
        id: 'a',
        text: 'More than 22.5 degrees abaft the other vessel\'s beam — a position from which, at night, she would see only the other\'s sternlight',
      },
      {
        id: 'b',
        text: 'Anywhere behind the other vessel\'s midpoint',
        whyWrong:
          'Rule 13(b) gives a specific angle (22.5° abaft the beam), not a vague "behind the midpoint" description.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      "Rule 13(b): a vessel is overtaking when coming up with another from a direction more than 22.5° abaft her beam, i.e., in such a position that at night she would be able to see only the sternlight of the vessel she is overtaking, and neither of her sidelights.",
    source: 'COLREGS Rule 13(b) — USCG Navigation Rules',
  },
  {
    id: 'rules-overtaking-doubt',
    topic: 'right-of-way',
    concepts: ['overtaking-situation'],
    format: 'text',
    prompt:
      'You are unsure whether you are overtaking another vessel or crossing her path. Rule 13(c) says you should:',
    choices: [
      {
        id: 'a',
        text: 'Assume you are overtaking and keep out of her way',
      },
      {
        id: 'b',
        text: 'Assume you are crossing and apply Rule 15 instead',
        whyWrong: 'Rule 13(c) specifically resolves the doubt in favor of overtaking, not crossing.',
      },
      {
        id: 'c',
        text: 'Hold course and speed until the situation clarifies',
        whyWrong: 'Holding course assumes you are stand-on, which is the opposite of what doubt requires you to assume.',
      },
      {
        id: 'd',
        text: 'Ask the other vessel over VHF which situation applies',
        whyWrong: 'The Rules do not make your obligation depend on a radio exchange.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 13(c): if a vessel is in any doubt as to whether she is overtaking another, she shall assume that this is the case and act accordingly. Overtaking carries the stricter burden, so the doubt is always resolved against the vessel coming up from behind.',
    source: 'COLREGS Rule 13(c) — USCG Navigation Rules',
  },
  {
    id: 'rules-overtaking-duty-persists',
    topic: 'right-of-way',
    concepts: ['overtaking-situation'],
    format: 'text',
    prompt:
      'You began overtaking another vessel from well abaft her beam. As you draw abreast, the bearing between you changes so it now looks more like a crossing situation. Does your overtaking obligation end?',
    choices: [
      {
        id: 'd',
        text: 'It depends on which vessel sounds a signal first',
        whyWrong: 'Sound signals do not reassign right-of-way obligations set by the Rules.',
      },
      {
        id: 'a',
        text: 'No — you remain the give-way vessel until you are finally past and clear',
      },
      {
        id: 'b',
        text: 'Yes — once the bearing changes, Rule 15 (crossing) takes over and she must give way to you',
        whyWrong:
          'Rule 13(d) specifically blocks this: a later change in bearing does not convert an overtaking vessel into a stand-on vessel.',
      },
      {
        id: 'c',
        text: 'Yes, but only if you are now faster than she is',
        whyWrong: 'Relative speed does not change the overtaking obligation.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 13(d): any subsequent alteration of the bearing between the two vessels shall not make the overtaking vessel a crossing vessel, nor relieve her of the duty to keep clear of the overtaken vessel until she is finally past and clear.',
    source: 'COLREGS Rule 13(d) — USCG Navigation Rules',
  },
  {
    id: 'rules-headon-defn',
    topic: 'right-of-way',
    concepts: ['head-on-situation'],
    format: 'visual',
    assetId: 'custom-headon-bowview',
    prompt:
      'Two power-driven vessels are meeting on reciprocal or nearly reciprocal courses, each seeing the other dead ahead (diagram). What must each vessel do?',
    choices: [
      {
        id: 'b',
        text: 'Each alters course to port so they pass starboard to starboard',
        whyWrong: 'Rule 14 specifically requires alteration to starboard, not port.',
      },
      {
        id: 'c',
        text: 'One vessel holds course while the other gives way',
        whyWrong: 'A true head-on situation has no stand-on vessel — both are obligated to act.',
      },
      {
        id: 'd',
        text: 'Both vessels stop engines and wait',
        whyWrong: 'Rule 14 calls for an early, positive alteration to starboard, not stopping and waiting.',
      },
      { id: 'a', text: 'Each alters course to starboard so they pass port to port' },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 14(a): when two power-driven vessels are meeting on reciprocal or nearly reciprocal courses so as to involve risk of collision, each shall alter her course to starboard so that each passes on the port side of the other. Neither vessel is stand-on in a head-on situation.',
    source: 'COLREGS Rule 14(a) — USCG Navigation Rules',
  },
  {
    id: 'rules-headon-doubt',
    topic: 'right-of-way',
    concepts: ['head-on-situation'],
    format: 'text',
    prompt:
      'You are approaching another power-driven vessel and are uncertain whether a true head-on situation exists. Rule 14(c) instructs you to:',
    choices: [
      {
        id: 'c',
        text: 'Alter to port until the picture clarifies',
        whyWrong: 'Altering to port is the wrong direction for a head-on encounter and risks worsening the situation.',
      },
      {
        id: 'd',
        text: 'Take no action until risk of collision is certain',
        whyWrong: 'Rule 7(a) and 14(c) both push toward early action under doubt, not delay.',
      },
      { id: 'a', text: 'Assume that it does exist and act accordingly' },
      {
        id: 'b',
        text: 'Assume it does not exist and hold your course',
        whyWrong: 'Rule 14(c) resolves doubt the opposite way — toward assuming the situation exists.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 14(c): if in doubt as to whether a head-on situation exists, a vessel shall assume that it does exist and act accordingly — altering to starboard.',
    source: 'COLREGS Rule 14(c) — USCG Navigation Rules',
  },
  {
    id: 'rules-headon-standon',
    topic: 'right-of-way',
    concepts: ['head-on-situation'],
    format: 'text',
    prompt:
      'In a true head-on situation between two power-driven vessels, which vessel is the stand-on vessel?',
    choices: [
      {
        id: 'c',
        text: 'The vessel that sounds her whistle first',
        whyWrong: 'Sounding first does not create stand-on status; both vessels must act under Rule 14.',
      },
      {
        id: 'd',
        text: 'Whichever vessel has the wind or current behind her',
        whyWrong: 'Wind and current do not factor into which vessel is stand-on under Rule 14.',
      },
      { id: 'a', text: 'Neither — both vessels are obligated to alter course' },
      {
        id: 'b',
        text: 'The larger vessel',
        whyWrong: 'Size does not create a stand-on vessel in a head-on encounter.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Head-on is unique among the meeting situations: Rule 14 gives both vessels the same duty to alter to starboard. Unlike crossing (Rule 15) or overtaking (Rule 13), there is no stand-on vessel that holds course and speed.',
    source: 'COLREGS Rule 14(a) — USCG Navigation Rules',
  },
  {
    id: 'rules-headon-sail-not-power',
    topic: 'right-of-way',
    concepts: ['head-on-situation'],
    format: 'text',
    prompt:
      'Two sailing vessels are approaching each other bow to bow, one on port tack and one on starboard tack. Does Rule 14 (the power-driven head-on rule) govern this encounter?',
    choices: [
      {
        id: 'b',
        text: 'Yes — any two vessels meeting bow to bow fall under Rule 14',
        whyWrong: 'Rule 14 is explicitly written for power-driven vessels; sailing vessel encounters are governed by Rule 12.',
      },
      {
        id: 'c',
        text: 'Yes, but only if both are motor-sailing',
        whyWrong: 'If both are motor-sailing they are power-driven vessels under Rule 3(b), which is a different scenario from two vessels under sail alone.',
      },
      {
        id: 'd',
        text: 'It depends on which vessel is larger',
        whyWrong: 'Vessel size does not determine which Rule applies.',
      },
      {
        id: 'a',
        text: 'No — Rule 14 applies only to power-driven vessels; this is governed by Rule 12\'s tack rules',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 14 by its own text applies to two power-driven vessels. Two sailing vessels under sail alone, even meeting bow to bow, are governed instead by Rule 12: the port-tack vessel keeps clear of the starboard-tack vessel.',
    source: 'COLREGS Rules 12, 14 — USCG Navigation Rules',
  },
  {
    id: 'rules-crossing-standon',
    topic: 'right-of-way',
    concepts: ['crossing-situation'],
    format: 'visual',
    assetId: 'custom-crossing-standon',
    prompt:
      'Another power-driven vessel is crossing from your port bow on a steady bearing (diagram). You are the stand-on vessel. What must you do?',
    choices: [
      { id: 'a', text: 'Keep your course and speed' },
      {
        id: 'b',
        text: 'Immediately alter course to starboard',
        whyWrong:
          'As stand-on vessel you are required to hold course and speed under Rule 17(a)(i); altering immediately would make you unpredictable to the give-way vessel.',
      },
      {
        id: 'c',
        text: 'Sound five short blasts and stop',
        whyWrong: 'The danger signal is used when doubting the other vessel\'s actions, not as a routine first response.',
      },
      {
        id: 'd',
        text: 'Speed up to cross ahead of her',
        whyWrong: 'Speeding up to force a crossing is not "keeping course and speed" and creates unpredictability.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 15: with the other vessel crossing from your port side, she is the give-way vessel and you are stand-on. Rule 17(a)(i) requires you to keep your course and speed so she can reliably maneuver around you — until it becomes apparent she is not taking appropriate action.',
    source: 'COLREGS Rules 15, 17(a)(i) — USCG Navigation Rules',
  },
  {
    id: 'rules-crossing-power-only',
    topic: 'right-of-way',
    concepts: ['crossing-situation'],
    format: 'text',
    prompt:
      'The crossing rule, Rule 15, applies specifically between:',
    choices: [
      {
        id: 'd',
        text: 'A power-driven vessel and a vessel engaged in fishing only',
        whyWrong: 'A vessel fishing is covered by the Rule 18 hierarchy, not the crossing rule.',
      },
      { id: 'a', text: 'Two power-driven vessels' },
      {
        id: 'b',
        text: 'Any two vessels regardless of type',
        whyWrong:
          'Rule 15\'s text is specific to power-driven vessels; sailing-vessel and power/sail encounters are governed by Rules 12 and 18.',
      },
      {
        id: 'c',
        text: 'Two sailing vessels only',
        whyWrong: 'Two sailing vessels use Rule 12\'s tack rules, not Rule 15.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 15 opens with "when two power-driven vessels are crossing..." — it is written specifically for that case. Encounters involving sailing vessels or specialized vessels are resolved through Rule 12 (sail vs. sail) or Rule 18 (the general hierarchy).',
    source: 'COLREGS Rule 15 — USCG Navigation Rules',
  },
  {
    id: 'rules-crossing-astern-rationale',
    topic: 'right-of-way',
    concepts: ['crossing-situation'],
    format: 'text',
    prompt:
      'In a crossing situation, Rule 15 directs the give-way vessel to avoid crossing ahead of the other vessel and, if circumstances allow, to pass astern instead. Why?',
    choices: [
      {
        id: 'd',
        text: 'It lets you maintain higher speed throughout',
        whyWrong: 'The rationale is about clarity and safety margin, not maintaining speed.',
      },
      {
        id: 'a',
        text: 'Passing astern removes ambiguity about your intentions and keeps you clear even if your estimate of the other vessel\'s speed is off',
      },
      {
        id: 'b',
        text: 'It is faster than passing ahead',
        whyWrong: 'Rule 15 is about collision avoidance, not transit speed.',
      },
      {
        id: 'c',
        text: 'It is required only in narrow channels',
        whyWrong: 'The preference for passing astern in a crossing situation applies generally under Rule 15, not only in narrow channels.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Crossing ahead of a vessel leaves little margin for error — if your speed estimate is wrong, or she alters course, a close-quarters situation can develop very quickly. Passing astern gives a clear, unambiguous, and more forgiving path.',
    source: 'COLREGS Rule 15 — USCG Navigation Rules',
  },
  {
    id: 'rules-give-way-early',
    topic: 'right-of-way',
    concepts: ['stand-on-give-way'],
    format: 'text',
    prompt:
      'Rule 16 says the give-way vessel shall:',
    choices: [
      {
        id: 'c',
        text: 'Reduce speed only as a last resort',
        whyWrong: 'Rule 16 calls for early, substantial action — not treating speed reduction as a last resort.',
      },
      {
        id: 'd',
        text: 'Maintain course until a set distance is reached, then turn sharply',
        whyWrong: 'This describes exactly the late, abrupt action Rule 8 and 16 both discourage.',
      },
      { id: 'a', text: 'Take early and substantial action to keep well clear' },
      {
        id: 'b',
        text: 'Wait for the stand-on vessel to signal before acting',
        whyWrong: 'The give-way vessel\'s duty to act does not depend on a signal from the stand-on vessel.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 16: every vessel required to keep out of the way of another shall, so far as possible, take early and substantial action to keep well clear.',
    source: 'COLREGS Rule 16 — USCG Navigation Rules',
  },
  {
    id: 'rules-standon-may-act-no-port',
    topic: 'right-of-way',
    concepts: ['stand-on-give-way'],
    format: 'text',
    prompt:
      'As the stand-on vessel in a crossing situation, you decide it is now clear the give-way vessel is not taking appropriate action, so you take avoiding action of your own under Rule 17(a)(ii). What must you avoid doing, if circumstances allow?',
    choices: [
      {
        id: 'c',
        text: 'Sounding any whistle signal',
        whyWrong: 'Sound signals under Rule 34 are expected to accompany maneuvering action, not prohibited.',
      },
      {
        id: 'd',
        text: 'Communicating with the other vessel by radio',
        whyWrong: 'Radio communication is not restricted by Rule 17.',
      },
      {
        id: 'a',
        text: 'Altering course to port for a vessel on your own port side',
      },
      {
        id: 'b',
        text: 'Using your engine at all',
        whyWrong: 'Rule 17 does not forbid using the engine — slackening or stopping speed is a normal part of avoiding action.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 17(c): a power-driven vessel taking action under 17(a)(ii) in a crossing situation shall, if the circumstances admit, not alter course to port for a vessel on her own port side. Altering to port here could turn you back into the other vessel\'s path.',
    source: 'COLREGS Rule 17(c) — USCG Navigation Rules',
  },
  {
    id: 'rules-standon-must-act',
    topic: 'right-of-way',
    concepts: ['stand-on-give-way'],
    format: 'text',
    prompt:
      'You are the stand-on vessel and have been holding course and speed, but the give-way vessel still has not acted and the vessels are now so close that collision cannot be avoided by her action alone. Rule 17(b) says you must:',
    choices: [
      {
        id: 'a',
        text: 'Take whatever action will best aid in avoiding collision',
      },
      {
        id: 'b',
        text: 'Continue holding course and speed no matter what',
        whyWrong:
          'Rule 17(a)(i) only requires holding course and speed up to the point Rule 17(b) is triggered — after that, you must act.',
      },
      {
        id: 'c',
        text: 'Radio the other vessel and wait for a reply before acting',
        whyWrong: 'Rule 17(b) requires immediate action, not a wait for radio confirmation.',
      },
      {
        id: 'd',
        text: 'Only sound the danger signal, without maneuvering',
        whyWrong: 'A sound signal alone does not satisfy the Rule 17(b) duty to take action best aiding collision avoidance.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 17(b): when, from any cause, the stand-on vessel finds herself so close that collision cannot be avoided by the give-way vessel\'s action alone, she shall take such action as will best aid to avoid collision.',
    source: 'COLREGS Rule 17(b) — USCG Navigation Rules',
  },
  {
    id: 'rules-pecking-order',
    topic: 'right-of-way',
    concepts: ['vessel-status-hierarchy'],
    format: 'text',
    prompt:
      'Under Rule 18, an ordinary power-driven vessel underway must generally keep out of the way of which of these vessels (except where Rules 9, 10, or 13 say otherwise)?',
    choices: [
      {
        id: 'b',
        text: 'Only vessels displaying an anchor light',
        whyWrong: 'Anchored vessels are addressed by anchoring rules, not the Rule 18 give-way hierarchy for vessels underway.',
      },
      {
        id: 'c',
        text: 'Only vessels of a similar size',
        whyWrong: 'Vessel size is not a Rule 18 criterion — vessel category is.',
      },
      {
        id: 'd',
        text: 'No one — a power-driven vessel is always stand-on',
        whyWrong: 'Rule 18(a) lists specific categories a power-driven vessel must give way to; she is not always stand-on.',
      },
      {
        id: 'a',
        text: 'A vessel not under command, a vessel restricted in her ability to maneuver, a vessel engaged in fishing, and a sailing vessel',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 18(a): a power-driven vessel underway shall keep out of the way of a vessel not under command, a vessel restricted in her ability to maneuver, a vessel engaged in fishing, and a sailing vessel. This general hierarchy yields to the specific crossing/overtaking rules (15, 13) and the narrow-channel/traffic-scheme rules (9, 10) where they apply.',
    source: 'COLREGS Rule 18(a) — USCG Navigation Rules',
  },
  {
    id: 'rules-standon-duty-not-relieved',
    topic: 'right-of-way',
    concepts: ['stand-on-give-way'],
    format: 'text',
    prompt:
      'The stand-on vessel fails to keep her course and speed as Rule 17 requires. Does this relieve the give-way vessel of her Rule 16 obligation to keep out of the way?',
    choices: [
      {
        id: 'c',
        text: 'Yes, but only in daylight',
        whyWrong: 'There is no time-of-day exception to the give-way vessel\'s obligation.',
      },
      {
        id: 'd',
        text: 'Only if the stand-on vessel is the larger of the two',
        whyWrong: 'Vessel size does not affect either vessel\'s obligations under Rules 16 and 17.',
      },
      { id: 'a', text: 'No — the give-way vessel\'s obligation continues regardless' },
      {
        id: 'b',
        text: 'Yes — if the stand-on vessel breaks the rule first, the give-way vessel is released from her duty',
        whyWrong:
          'Nothing in the Rules makes the give-way vessel\'s obligation conditional on the stand-on vessel behaving perfectly.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'The give-way vessel\'s duty under Rule 16 stands on its own and is not conditioned on the stand-on vessel doing everything right. Good seamanship (Rule 2) and Rule 16 both require the give-way vessel to keep clear regardless of the other vessel\'s conduct.',
    source: 'COLREGS Rules 2, 16, 17 — USCG Navigation Rules',
  },
  {
    id: 'lights-two-masthead-50m',
    topic: 'nav-lights',
    concepts: ['navigation-lights'],
    format: 'text',
    prompt:
      'At night you see a vessel showing two white masthead lights in a vertical line, the forward one lower than the after one, along with sidelights and a sternlight. What is she?',
    choices: [
      {
        id: 'b',
        text: 'A sailing vessel underway',
        whyWrong: 'A sailing vessel under sail alone shows no masthead light at all — masthead lights only appear on power-driven vessels.',
      },
      {
        id: 'c',
        text: 'A vessel at anchor',
        whyWrong: 'An anchored vessel shows all-round white light(s), not masthead lights with sidelights and a sternlight (which are underway lights).',
      },
      {
        id: 'd',
        text: 'A vessel towing another vessel astern with a long tow',
        whyWrong:
          'A vessel towing with a tow exceeding 200 m shows THREE masthead lights in a vertical line, not two.',
      },
      {
        id: 'a',
        text: 'A power-driven vessel 50 meters or more in length, underway',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 23(a): a power-driven vessel less than 50 m shows one masthead light; a vessel 50 m or more adds a second, higher masthead light abaft and above the first, in addition to sidelights and a sternlight. Exam cue: two masthead lights (forward lower) + sidelights + sternlight = power-driven vessel 50 m or more.',
    source: 'COLREGS Rule 23(a) — USCG Navigation Rules',
  },
  {
    id: 'lights-nuc',
    topic: 'nav-lights',
    concepts: ['special-vessel-lights'],
    format: 'text',
    prompt:
      'At night, two all-round RED lights displayed in a vertical line indicate a vessel that is:',
    choices: [
      {
        id: 'b',
        text: 'Restricted in her ability to maneuver',
        whyWrong: 'Restricted-in-ability-to-maneuver is red-WHITE-red, not two reds.',
      },
      {
        id: 'c',
        text: 'Engaged in trawling',
        whyWrong: 'A trawler shows green over white, not red over red.',
      },
      {
        id: 'd',
        text: 'At anchor',
        whyWrong: 'An anchored vessel shows plain white light(s), not red.',
      },
      { id: 'a', text: 'Not under command' },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 27(a): a vessel not under command shows two all-round red lights in a vertical line where best seen, plus sidelights and a sternlight if making way. Memory aid: "red over red, the captain is dead" — she cannot maneuver as the Rules require due to some exceptional circumstance.',
    source: 'COLREGS Rule 27(a) — USCG Navigation Rules',
  },
  {
    id: 'lights-ram',
    topic: 'nav-lights',
    concepts: ['special-vessel-lights'],
    format: 'text',
    prompt:
      'At night, all-round lights shown in the order red, white, red (top to bottom) in a vertical line indicate a vessel that is:',
    choices: [
      {
        id: 'c',
        text: 'Engaged in dredging in a narrow channel with an unobstructed side',
        whyWrong:
          'A dredge with an obstructed side does show two red lights (obstructed side) and two green (clear side) in addition to the basic red-white-red — but red-white-red alone is the general "restricted in ability to maneuver" signal.',
      },
      {
        id: 'd',
        text: 'A pilot vessel on duty',
        whyWrong: 'A pilot vessel shows white over red all-round lights, not red-white-red.',
      },
      { id: 'a', text: 'Restricted in her ability to maneuver' },
      {
        id: 'b',
        text: 'Not under command',
        whyWrong: 'Not under command is two all-round red lights only, no white light between them.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 27(b): a vessel restricted in her ability to maneuver (e.g., laying cable, dredging, underwater operations) shows three all-round lights in a vertical line — red, white, red — plus sidelights and a sternlight if making way.',
    source: 'COLREGS Rule 27(b) — USCG Navigation Rules',
  },
  {
    id: 'rule19-avoid-alter-port-forward',
    topic: 'right-of-way',
    concepts: ['restricted-visibility'],
    format: 'text',
    prompt:
      'In restricted visibility, you detect another vessel by radar alone, forward of your beam, and determine a close-quarters situation is developing. If you must alter course, Rule 19(d) says you should avoid, so far as possible:',
    choices: [
      {
        id: 'a',
        text: 'Altering course to port for a vessel forward of your beam (unless you are overtaking her), and altering toward a vessel abeam or abaft your beam',
      },
      {
        id: 'b',
        text: 'Altering course to starboard for a vessel forward of your beam',
        whyWrong:
          'A starboard alteration for a vessel forward of the beam is generally the preferred, safer action — it is the port alteration Rule 19(d) warns against.',
      },
      {
        id: 'c',
        text: 'Reducing speed under any circumstances',
        whyWrong: 'Reducing speed is expected and appropriate in restricted visibility, not something to be avoided.',
      },
      {
        id: 'd',
        text: 'Using the radar at all',
        whyWrong: 'Rule 19 assumes and expects proper radar use in restricted visibility.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 19(d): avoiding action taken on radar information alone should, so far as possible, avoid an alteration of course to port for a vessel forward of the beam (other than one being overtaken), and an alteration of course toward a vessel abeam or abaft the beam.',
    source: 'COLREGS Rule 19(d) — USCG Navigation Rules',
  },
  {
    id: 'rule19-safe-speed-fog',
    topic: 'right-of-way',
    concepts: ['restricted-visibility'],
    format: 'text',
    prompt:
      'Rule 19(b) requires every vessel, in or near an area of restricted visibility, to:',
    choices: [
      {
        id: 'd',
        text: 'Rely on radar alone and disregard sound signals',
        whyWrong: 'Radar does not replace the sound-signal requirements of Rule 35 in restricted visibility.',
      },
      {
        id: 'a',
        text: 'Proceed at a safe speed adapted to the restricted visibility, with engines ready for immediate maneuver',
      },
      {
        id: 'b',
        text: 'Stop and anchor until visibility improves',
        whyWrong: 'Rule 19 requires safe speed and readiness to maneuver, not a blanket requirement to stop and anchor.',
      },
      {
        id: 'c',
        text: 'Increase speed to clear the area of reduced visibility quickly',
        whyWrong: 'Increasing speed in restricted visibility is the opposite of what Rule 19(b) requires.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 19(b): every vessel shall proceed at a safe speed adapted to the prevailing circumstances and conditions of restricted visibility. A power-driven vessel shall have her engines ready for immediate maneuver.',
    source: 'COLREGS Rule 19(b) — USCG Navigation Rules',
  },
  {
    id: 'rule19-fog-signal-forward',
    topic: 'right-of-way',
    concepts: ['restricted-visibility'],
    format: 'text',
    prompt:
      'In fog, you hear another vessel\'s fog signal apparently forward of your beam and cannot avoid a close-quarters situation. Rule 19(e) says you must:',
    choices: [
      {
        id: 'd',
        text: 'Sound one prolonged blast and continue at the same speed',
        whyWrong: 'Continuing at the same speed does not satisfy the Rule 19(e) duty to reduce speed.',
      },
      {
        id: 'a',
        text: 'Reduce speed to the minimum at which you can be kept on course, and take all way off if necessary',
      },
      {
        id: 'b',
        text: 'Maintain your current speed and course',
        whyWrong:
          'Rule 19(e) requires reducing speed, and taking all way off if necessary, precisely in this situation.',
      },
      {
        id: 'c',
        text: 'Immediately alter course to port toward the sound',
        whyWrong: 'Rule 19(d) discourages altering to port for a vessel forward of the beam; the required response here is to slow down and navigate with extreme caution.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      "Rule 19(e): a vessel that hears, apparently forward of her beam, the fog signal of another vessel, or that cannot avoid a close-quarters situation with another vessel forward of her beam, shall reduce her speed to the minimum at which she can be kept on course. She shall, if necessary, take all way off, and in any event navigate with extreme caution until danger of collision is over.",
    source: 'COLREGS Rule 19(e) — USCG Navigation Rules',
  },
  {
    id: 'flags-alpha',
    topic: 'flags',
    format: 'visual',
    assetId: 'custom-alpha-flag',
    prompt:
      'A vessel is displaying this rigid blue-and-white swallowtail flag. What does it signal?',
    choices: [
      {
        id: 'a',
        text: 'The vessel has a diver down and is restricted in her ability to maneuver — keep well clear at slow speed',
      },
      {
        id: 'b',
        text: 'The vessel is requesting a pilot',
        whyWrong: 'A pilot request is signaled by the flag "G" or other Code of Signals flags, not Alpha.',
      },
      {
        id: 'c',
        text: 'The vessel is aground',
        whyWrong: 'Vessels aground use lights/shapes for not-under-command or specific distress signals, not the Alpha flag.',
      },
      {
        id: 'd',
        text: 'The vessel is racing under sail',
        whyWrong: 'Racing status is not signaled with the Alpha flag.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'International Code of Signals flag Alpha (rigid, at least 1 meter, blue and white swallowtail) means "I have a diver down; keep well clear at slow speed." Vessels engaged in diving operations that are too small to show the full Rule 27 shapes/lights for restricted maneuverability may display a rigid replica of this flag instead. Exam cue: blue-and-white swallowtail flag on a boat = diver down nearby, stay well clear and go slow.',
    source: 'Inland Navigation Rules — 33 CFR 88.11; International Code of Signals, flag Alpha',
  },
  {
    id: 'flags-diver-down',
    topic: 'flags',
    format: 'visual',
    assetId: 'custom-diver-down-flag',
    prompt:
      'You see a small red flag with a white diagonal stripe flown from a boat or a float in the water. What does it mean?',
    choices: [
      {
        id: 'd',
        text: 'The vessel wants to be overtaken on that side',
        whyWrong: 'Overtaking side is negotiated by sound signal (Rule 34), not by flag.',
      },
      {
        id: 'a',
        text: 'Divers are in the water nearby — keep well clear and proceed at slow, no-wake speed if you must pass',
      },
      {
        id: 'b',
        text: 'The vessel is signaling distress',
        whyWrong: 'Distress is signaled by other means (e.g., flags N over C, an orange smoke signal, or the code flag combination), not the diver-down flag.',
      },
      {
        id: 'c',
        text: 'The vessel is anchored for the night',
        whyWrong: 'Anchoring is indicated by an anchor light or ball shape, not the diver-down flag.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'The red flag with a white diagonal stripe is the traditional diver-down flag used by recreational divers and dive boats in US waters, often required by state law to be displayed while divers are down. It is distinct from the International Code of Signals flag Alpha (blue-and-white swallowtail), which is the vessel-restricted-in-maneuverability signal; many divers display both. Either way, give the area a wide, slow berth.',
    source: 'USCG Boating Safety guidance; state diver-down flag regulations',
  },

  // ---------------------------------------------------------------------
  // Arc 3: Coastal Navigation / Charts / ATONs (chart-nav)
  // ---------------------------------------------------------------------
  {
    id: 'chart-nav-tools-dividers',
    topic: 'chart-nav',
    concepts: ['plotting-a-course'],
    format: 'visual',
    assetId: 'photo-plotting-tools',
    prompt:
      'In the photo, sailors are plotting a course on a paper chart. What is the two-pointed metal tool being used to step off distances between two points on the chart?',
    choices: [
      {
        id: 'c',
        text: 'A compass rose',
        whyWrong:
          'A compass rose is a printed circle on the chart itself, not a handheld tool.',
      },
      {
        id: 'd',
        text: 'A protractor',
        whyWrong:
          'A protractor measures angles directly; it is not the pointed step-off tool shown here.',
      },
      {
        id: 'a',
        text: 'Dividers',
      },
      {
        id: 'b',
        text: 'Parallel rules',
        whyWrong:
          'Parallel rules are the two long straightedge rulers hinged together, used to transfer a direction line, not to measure distance.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Dividers are a two-pointed tool used to measure distance: open them to span two points on the chart, then walk or compare that span against the latitude (mile) scale on the chart border to read off the distance in nautical miles.',
    source: 'USCG Auxiliary / ASA 103 piloting fundamentals — chart tools',
  },
  {
    id: 'chart-nav-tools-parallel-rules',
    topic: 'chart-nav',
    concepts: ['plotting-a-course'],
    format: 'visual',
    assetId: 'photo-parallel-rule',
    prompt:
      'This drafting-style tool is made of two clear rulers connected by pivoting arms so they can "walk" across a chart while staying parallel. What is its main use in coastal navigation?',
    choices: [
      {
        id: 'b',
        text: 'Measuring the distance between two charted points',
        whyWrong:
          'Distance is measured with dividers against the chart\'s latitude scale, not with parallel rules.',
      },
      {
        id: 'c',
        text: 'Sounding the depth of water',
        whyWrong:
          'Depth is read from charted soundings or a depth sounder, not a drafting tool.',
      },
      {
        id: 'd',
        text: 'Identifying the color of a buoy at night',
        whyWrong:
          'Buoy color/light identification has nothing to do with this drafting tool.',
      },
      {
        id: 'a',
        text: 'Transferring a course or bearing line to and from the compass rose to read or plot a direction',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Parallel rules keep their edges parallel as you "walk" them across the chart. Lay one edge along a plotted course line, walk the rules to the nearest compass rose, and read the direction — or start at the rose and walk the line out to your position to plot a bearing.',
    source: 'USCG Auxiliary / ASA 103 piloting fundamentals — chart tools',
  },
  {
    id: 'chart-nav-tools-compass-rose-rings',
    topic: 'chart-nav',
    concepts: ['compass-and-compass-rose'],
    format: 'visual',
    assetId: 'noaa-compass-rose',
    prompt:
      'A NOAA chart compass rose is shown. It has an outer ring of degree graduations and a separate inner ring labeled "MAGNETIC" with its own set of graduations. What do these two rings represent?',
    choices: [
      {
        id: 'c',
        text: 'The outer ring is for power vessels and the inner ring is for sailing vessels',
        whyWrong:
          'Compass rose rings do not depend on vessel type.',
      },
      {
        id: 'd',
        text: 'The two rings show the same thing twice, for redundancy',
        whyWrong:
          'The rings are offset from each other by the local magnetic variation — they are not duplicates.',
      },
      {
        id: 'a',
        text: 'The outer ring reads true direction; the inner ring reads magnetic direction',
      },
      {
        id: 'b',
        text: 'The outer ring is for daytime use and the inner ring is for night use',
        whyWrong:
          'Compass roses are not time-of-day dependent — both rings are always valid, one for true and one for magnetic directions.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A standard NOAA compass rose prints two concentric graduated circles: the outer ring is referenced to true north, and the inner ring — labeled MAGNETIC — is referenced to magnetic north. The offset between them, printed in the middle of the rose (e.g., "VAR 4°15\'W"), is the local magnetic variation.',
    source: 'NOAA U.S. Chart No. 1 — Positions, Distances, Directions, Compass (Section B)',
  },
  {
    id: 'chart-nav-tools-chart-parts',
    topic: 'chart-nav',
    concepts: ['chart-symbols'],
    format: 'visual',
    assetId: 'noaa-chart-schematic',
    prompt:
      'This is a schematic layout of a NOAA/NGA nautical chart. Which of these is NOT something you would expect to find printed directly on a real nautical chart\'s border or title block?',
    choices: [
      {
        id: 'b',
        text: 'The chart\'s scale and projection (e.g., "SCALE 1:35,000, Mercator Projection")',
      },
      {
        id: 'c',
        text: 'A compass rose showing true and magnetic directions',
      },
      {
        id: 'd',
        text: 'Cautionary notes about hazards or unsurveyed areas',
      },
      {
        id: 'a',
        text: 'The current weather forecast for the charted area',
        whyWrong:
          'Weather forecasts are not printed on a chart — charts show fixed information (soundings, hazards, aids, scale); forecasts are obtained separately (VHF, apps, briefings).',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A chart\'s title block and margins carry static reference information: chart number, scale, projection, sounding units, a compass rose, and cautionary notes. Dynamic information like today\'s weather is never printed on the chart itself — mariners get that from separate, current sources.',
    source: 'NOAA U.S. Chart No. 1 — Chart Number, Title, Marginal Notes (Section A)',
  },
  {
    id: 'chart-nav-sym-danger-line',
    topic: 'chart-nav',
    concepts: ['chart-symbols'],
    format: 'visual',
    assetId: 'noaa-rocks-general',
    prompt:
      'The dotted line drawn around the light-blue shaded area in this NOAA Chart No. 1 excerpt is called a "danger line." What is its purpose?',
    choices: [
      {
        id: 'c',
        text: 'To show the deepest part of the channel',
        whyWrong:
          'A danger line marks a hazard, not a preferred deep-water track.',
      },
      {
        id: 'd',
        text: 'To indicate a no-wake zone',
        whyWrong:
          'No-wake/speed zones are marked with their own regulatory area symbols, not a danger line.',
      },
      {
        id: 'a',
        text: 'To draw attention to a hazardous area or an isolated danger that would not otherwise stand out clearly on the chart',
      },
      {
        id: 'b',
        text: 'To mark the international maritime boundary',
        whyWrong:
          'Boundary lines are a separate, distinctly labeled symbol, not a danger line.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A danger line (a dotted or dashed line) draws the mariner\'s eye to a hazard — such as an isolated rock — or delimits an area containing numerous dangers that is unsafe to navigate through, even when the symbol alone might be easy to miss at chart scale.',
    source: 'NOAA U.S. Chart No. 1 — Rocks, Wrecks, Obstructions and Aquaculture (Section K)',
  },
  {
    id: 'chart-nav-sym-buoy-beacon-default',
    topic: 'chart-nav',
    concepts: ['buoys-beacons-and-lights'],
    format: 'visual',
    assetId: 'noaa-buoy-beacon-basic',
    prompt:
      'On a chart, an unlabeled small circle sitting atop a teardrop-shaped symbol is the default symbol for a buoy when no other information is given. What is the default symbol for a beacon?',
    choices: [
      {
        id: 'b',
        text: 'The same teardrop-and-circle symbol used for a buoy',
        whyWrong:
          'Beacons and buoys use visibly different default symbols precisely because a beacon is fixed to the bottom or shore while a buoy floats and can drag or shift position.',
      },
      {
        id: 'c',
        text: 'A plain square with no other markings',
        whyWrong:
          'A plain square is not the Chart No. 1 default beacon symbol.',
      },
      {
        id: 'd',
        text: 'A five-pointed star',
        whyWrong:
          'A star is used for landmarks/positions of certain features, not as the default beacon symbol.',
      },
      {
        id: 'a',
        text: 'A vertical dagger/spike symbol sitting on a small circle, since a beacon is a fixed structure rather than a floating one',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Chart No. 1 gives buoys and beacons distinct default symbols: a buoy (which floats, moored to the bottom) uses a teardrop shape over a small circle marking its charted position; a beacon (a fixed structure, like a piling or tower) uses a dagger-like spike over a small circle. Additional attributes (color, shape, topmark, light) refine the symbol once known.',
    source: 'NOAA U.S. Chart No. 1 — Buoys, Beacons (Section Q)',
  },
  {
    id: 'chart-nav-sym-wk-abbrev',
    topic: 'chart-nav',
    concepts: ['chart-symbols'],
    format: 'text',
    prompt:
      'On a NOAA chart, you see the abbreviation "Wk" next to a charted symbol. What does it indicate?',
    choices: [
      {
        id: 'a',
        text: 'A wreck',
      },
      {
        id: 'b',
        text: 'A waterway crossing',
        whyWrong:
          '"Wk" is not used for a generic waterway crossing.',
      },
      {
        id: 'c',
        text: 'A weak current area',
        whyWrong:
          'Current strength is shown with arrows and rate labels, not the abbreviation "Wk".',
      },
      {
        id: 'd',
        text: 'A wharf',
        whyWrong:
          'A wharf is typically labeled or symbolized separately; "Wk" specifically denotes a wreck.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      '"Wk" is the standard chart abbreviation for a wreck, whether the wreck is submerged with a known or unknown depth, dangerous to surface navigation, or shows a portion of hull above the water.',
    source: 'NOAA U.S. Chart No. 1 — Index of Abbreviations',
  },
  {
    id: 'chart-nav-sym-rk-abbrev',
    topic: 'chart-nav',
    concepts: ['chart-symbols'],
    format: 'text',
    prompt:
      'On a NOAA chart, a sounding is followed by the abbreviation "Rk" (for example, "12 Rk"). What does this tell you?',
    choices: [
      {
        id: 'a',
        text: 'That the charted feature at that position is a rock, with the number giving its depth or height',
      },
      {
        id: 'b',
        text: 'That the water there is unusually rocky-bottomed but otherwise clear and safe',
        whyWrong:
          '"Rk" marks the charted rock hazard itself, not a general bottom-texture note.',
      },
      {
        id: 'c',
        text: 'That radio reception is poor in that area',
        whyWrong:
          '"Rk" has nothing to do with radio.',
      },
      {
        id: 'd',
        text: 'That the area is a restricted anchorage',
        whyWrong:
          'Restricted anchorages are shown with area limit symbols and labels, not "Rk".',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      '"Rk" is the chart abbreviation for rock. It labels an individual charted rock, often paired with a sounding (depth over the rock) or, if the rock is dry at high water, a height above the charted datum.',
    source: 'NOAA U.S. Chart No. 1 — Index of Abbreviations; Rocks, Wrecks, Obstructions (Section K)',
  },
  {
    id: 'chart-nav-sym-obstn-abbrev',
    topic: 'chart-nav',
    concepts: ['chart-symbols'],
    format: 'text',
    prompt:
      'What does the chart abbreviation "Obstn" identify?',
    choices: [
      {
        id: 'b',
        text: 'An observation station for tides',
        whyWrong:
          'Tide/observation stations are labeled separately, not with "Obstn".',
      },
      {
        id: 'c',
        text: 'An obsolete chart edition',
        whyWrong:
          'Chart currency is not indicated with "Obstn"; it is a feature abbreviation, not a metadata note.',
      },
      {
        id: 'd',
        text: 'An oyster bed',
        whyWrong:
          'Aquaculture areas are shown with their own dedicated symbols, not "Obstn".',
      },
      {
        id: 'a',
        text: 'An obstruction — a foreign object or hazard on or near the bottom that is not a rock or a wreck',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      '"Obstn" marks an obstruction: a general hazard to navigation on or near the seabed — such as a submerged piling, debris, or an unidentified foul area — that does not fit the specific rock or wreck symbols.',
    source: 'NOAA U.S. Chart No. 1 — Index of Abbreviations; Rocks, Wrecks, Obstructions (Section K)',
  },
  {
    id: 'chart-nav-sym-foul-ground',
    topic: 'chart-nav',
    concepts: ['chart-symbols'],
    format: 'visual',
    assetId: 'noaa-obstruction-foul',
    prompt:
      'This NOAA Chart No. 1 excerpt shows the symbol for "foul ground," described as not dangerous to surface navigation but to be avoided by vessels anchoring or trawling. What is a foul ground?',
    choices: [
      {
        id: 'a',
        text: 'An area of seabed littered with debris, old moorings, or wreck remains that could snag an anchor or fishing gear, even though a vessel can safely pass over it',
      },
      {
        id: 'b',
        text: 'An area with strong, foul-smelling currents that are dangerous to swim in',
        whyWrong:
          'Foul ground is about the seabed condition (snag hazard), not smell or current strength.',
      },
      {
        id: 'c',
        text: 'A restricted military firing area',
        whyWrong:
          'Firing/danger areas are marked with their own distinct symbols, not "foul ground".',
      },
      {
        id: 'd',
        text: 'A section of channel with poor water quality',
        whyWrong:
          'Foul ground refers to bottom debris/snag hazard, not water pollution.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Foul ground marks debris or obstructions on the bottom — remains of a wreck, an old mooring block, discarded gear — that are deep enough to be safe for a vessel to transit over, but that could foul (snag) an anchor or trawl. It is a caution against anchoring or trawling there, not a navigation hazard for through traffic.',
    source: 'NOAA U.S. Chart No. 1 — Rocks, Wrecks, Obstructions and Aquaculture (Section K)',
  },
  {
    id: 'chart-nav-sym-wreck-known-depth',
    topic: 'chart-nav',
    concepts: ['chart-symbols'],
    format: 'visual',
    assetId: 'noaa-wreck-symbols',
    prompt:
      'The chart symbol shown — a shaded elongated shape labeled with a depth and "Wk" — represents a submerged wreck of known depth. Why does the exact depth over a wreck matter to you as the navigator?',
    choices: [
      {
        id: 'b',
        text: 'It tells you how old the wreck is',
        whyWrong:
          'Wreck age is not conveyed by the charted depth figure.',
      },
      {
        id: 'c',
        text: 'It tells you the wreck\'s registered name',
        whyWrong:
          'Vessel identity is not part of the standard wreck symbol.',
      },
      {
        id: 'd',
        text: 'It tells you the value of salvage available',
        whyWrong:
          'Salvage value is not chart information.',
      },
      {
        id: 'a',
        text: 'It tells you whether your vessel\'s draft can safely clear the wreck if you must pass over or near it',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A submerged wreck symbol with a numeric depth (e.g., "5₂ Wk") gives the charted depth over the highest part of the wreck. Comparing that figure (adjusted for tide) against your vessel\'s draft tells you whether it is safe to pass over, or whether you must route around it.',
    source: 'NOAA U.S. Chart No. 1 — Rocks, Wrecks, Obstructions and Aquaculture (Section K)',
  },
  {
    id: 'chart-nav-sym-wreck-unknown-depth',
    topic: 'chart-nav',
    concepts: ['chart-symbols'],
    format: 'visual',
    assetId: 'noaa-wreck-symbols',
    prompt:
      'Compare the two wreck symbols in this NOAA Chart No. 1 excerpt: one is labeled with a specific depth (e.g., "5₂ Wk"), the other only shows "Wk" with no number. What does the unlabeled version mean, and how should you treat it?',
    choices: [
      {
        id: 'c',
        text: 'That symbol marks a wreck that has since been fully removed',
        whyWrong:
          'A removed wreck would not still be charted with a wreck symbol at all.',
      },
      {
        id: 'd',
        text: 'It marks a wreck on land, not in the water',
        whyWrong:
          'These wreck symbols are charted hydrographic features in the water, not land features.',
      },
      {
        id: 'a',
        text: 'The depth over that wreck is unknown, so you should treat it as a hazard and give it a wide berth rather than assume you can clear it',
      },
      {
        id: 'b',
        text: 'That wreck is definitely deep enough for any vessel to pass over safely',
        whyWrong:
          'No number means the depth was never established — the opposite of a confirmed safe clearance.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'When no depth figure accompanies a "Wk" symbol, the depth over the wreck has not been determined. Prudent navigation treats an unknown-depth wreck as a hazard to be avoided rather than assumed to be safely deep — never guess a clearance the chart does not give you.',
    source: 'NOAA U.S. Chart No. 1 — Rocks, Wrecks, Obstructions and Aquaculture (Section K)',
  },
  {
    id: 'chart-nav-sym-chart-datum-abbrev',
    topic: 'chart-nav',
    concepts: ['soundings-and-chart-datum'],
    format: 'text',
    prompt:
      'Charted soundings (water depths) are all measured relative to a reference plane abbreviated "CD" on NOAA charts. What does "CD" stand for, and why does it matter?',
    choices: [
      {
        id: 'd',
        text: 'Central Depth — the average depth of the whole chart area',
        whyWrong:
          'Chart datum is a fixed vertical reference plane, not an averaged depth statistic.',
      },
      {
        id: 'a',
        text: 'Chart Datum — a low-water reference level, so charted soundings represent a conservative, close-to-worst-case depth you can generally expect or exceed',
      },
      {
        id: 'b',
        text: 'Chart Date — the date the chart was printed',
        whyWrong:
          '"CD" refers to the sounding reference plane, not the print or edition date (which is shown separately in the title block).',
      },
      {
        id: 'c',
        text: 'Course Direction — the vessel\'s planned heading',
        whyWrong:
          'Course direction is plotted as a line with a bearing, not abbreviated "CD" on soundings.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Chart Datum (CD) is the vertical reference level — commonly a low-water datum such as Mean Lower Low Water in the U.S. — from which all charted soundings and drying heights are measured. Because it\'s pinned near low water, actual depth is usually equal to or greater than the charted sounding, giving you a safety margin at most tide stages.',
    source: 'NOAA U.S. Chart No. 1 — Depths (Section I); Index of Abbreviations',
  },
  {
    id: 'chart-nav-sound-true-position',
    topic: 'chart-nav',
    concepts: ['soundings-and-chart-datum'],
    format: 'visual',
    assetId: 'noaa-soundings-basic',
    prompt:
      'This NOAA Chart No. 1 excerpt shows sounding examples, including a plain number placed directly at a location on the chart (item 10, "sounding in true position"). What does a plain sounding number tell you?',
    choices: [
      {
        id: 'b',
        text: 'The maximum safe speed at that location',
        whyWrong:
          'Soundings are depth figures, not speed limits.',
      },
      {
        id: 'c',
        text: 'The distance in nautical miles to the nearest port',
        whyWrong:
          'Distances to ports are not conveyed by a bare sounding number.',
      },
      {
        id: 'd',
        text: 'The year the area was last surveyed',
        whyWrong:
          'Survey dates are noted separately (e.g., in the chart\'s source diagram), not encoded in an individual sounding.',
      },
      {
        id: 'a',
        text: 'The depth of water at that exact charted position, referenced to chart datum',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A plain number printed at a position on the chart is a sounding: the depth of water at that exact spot, measured down from chart datum. Sloping or subscript numerals may indicate the units (e.g., feet vs. fathoms and feet) per the chart\'s stated units.',
    source: 'NOAA U.S. Chart No. 1 — Depths (Section I)',
  },
  {
    id: 'chart-nav-sound-out-of-position',
    topic: 'chart-nav',
    concepts: ['soundings-and-chart-datum'],
    format: 'visual',
    assetId: 'noaa-soundings-basic',
    prompt:
      'Item 11 in this NOAA Chart No. 1 excerpt is labeled "sounding out of position," shown with a small dot and a leader line running to the number. When would a chart use this style instead of a plain sounding?',
    choices: [
      {
        id: 'a',
        text: 'When the sounding was taken slightly away from its charted label position, so a dot marks the actual location and a line leads to where the depth figure is printed for legibility',
      },
      {
        id: 'b',
        text: 'When the sounding is unusually deep',
        whyWrong:
          'Depth alone does not determine whether the out-of-position style is used — crowding/legibility does.',
      },
      {
        id: 'c',
        text: 'When the sounding is a forecast rather than a measurement',
        whyWrong:
          'Charted soundings are surveyed measurements, not forecasts.',
      },
      {
        id: 'd',
        text: 'When the vessel that took the sounding was drifting off course',
        whyWrong:
          'The symbol reflects chart label placement, not how the original survey vessel was steered.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'When numbers would be too crowded to print right at the surveyed spot, the chart marks the true position with a small dot and leads a line out to where the depth figure is printed nearby. Always read the dot, not the number\'s printed location, as the actual sounding position.',
    source: 'NOAA U.S. Chart No. 1 — Depths (Section I)',
  },
  {
    id: 'chart-nav-sound-least-depth-channel',
    topic: 'chart-nav',
    concepts: ['soundings-and-chart-datum'],
    format: 'visual',
    assetId: 'noaa-soundings-basic',
    prompt:
      'Item 12 in this NOAA Chart No. 1 excerpt shows "least depth in narrow channel," where a single sounding is printed across a shaded channel outline. Why would a chart show only the shoalest (least) depth for a whole channel segment rather than every individual sounding?',
    choices: [
      {
        id: 'a',
        text: 'Because for piloting through a narrow channel, the controlling depth is the shallowest point — that single number tells you the worst-case depth you must be prepared for along that stretch',
      },
      {
        id: 'b',
        text: 'Because narrow channels are never actually surveyed in detail',
        whyWrong:
          'Least-depth labeling is a deliberate simplification for legibility, not a sign of missing survey data.',
      },
      {
        id: 'c',
        text: 'Because it represents the average depth of the channel',
        whyWrong:
          'It specifically represents the least (shallowest), not an average.',
      },
      {
        id: 'd',
        text: 'Because it is the recommended anchoring depth',
        whyWrong:
          'A least-depth-in-channel label is a piloting hazard warning, not an anchoring recommendation — you generally should not anchor in a narrow channel at all.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'In a narrow channel, what matters to safe passage is the shallowest point along your track — the "controlling depth." Charting just that least-depth figure across the channel gives mariners the single number that governs whether their vessel can transit safely, without cluttering the chart with every individual sounding.',
    source: 'NOAA U.S. Chart No. 1 — Depths (Section I)',
  },
  {
    id: 'chart-nav-sound-depth-contour-shading',
    topic: 'chart-nav',
    concepts: ['soundings-and-chart-datum'],
    format: 'visual',
    assetId: 'noaa-depth-contours',
    prompt:
      'This NOAA Chart No. 1 excerpt shows the shaded depth bands used on charts, running from a darker "foreshore" band down through progressively lighter shallow-water bands to deep water. What is the practical value of this color/shade coding at a glance?',
    choices: [
      {
        id: 'd',
        text: 'It shows which areas have cellular signal coverage',
        whyWrong:
          'Depth shading has nothing to do with communications coverage.',
      },
      {
        id: 'a',
        text: 'It lets you instantly judge relative water depth and spot shallow areas by shade alone, without having to read every individual sounding',
      },
      {
        id: 'b',
        text: 'It shows water temperature, not depth',
        whyWrong:
          'The shading in Chart No. 1\'s depth-contour section specifically represents depth bands, not temperature.',
      },
      {
        id: 'c',
        text: 'It indicates which areas are open to fishing',
        whyWrong:
          'Fishing regulations are shown with separate area/limit symbols, not depth shading.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Charts shade the area between depth contours (e.g., the foreshore, shallow-water, and safety-contour bands) so a mariner can see at a glance where water shoals or deepens, long before reading individual soundings. Darker/shallower bands are a visual warning to stay clear unless your draft and the tide allow it.',
    source: 'NOAA U.S. Chart No. 1 — Depths, Depth Contours (Section I)',
  },
  {
    id: 'chart-nav-sound-bottom-abbrev',
    topic: 'chart-nav',
    concepts: ['soundings-and-chart-datum'],
    format: 'text',
    prompt:
      'Charts often print a small italic letter abbreviation near an anchorage, such as "S", "M", or "rky". What are these abbreviations describing?',
    choices: [
      {
        id: 'd',
        text: 'The name of the survey vessel',
        whyWrong:
          'Survey vessel identity is not part of routine bottom-character labeling.',
      },
      {
        id: 'a',
        text: 'The nature of the seabed (bottom characteristics) — for example S = sand, M = mud, rky = rocky',
      },
      {
        id: 'b',
        text: 'The speed limit in that area',
        whyWrong:
          'Speed limits are given in regulatory notes or symbols, not single-letter bottom abbreviations.',
      },
      {
        id: 'c',
        text: 'The salinity of the water',
        whyWrong:
          'Salinity is not a standard charted feature.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Small letter codes near soundings describe the nature of the seabed — S (sand), M (mud), Cl (clay), rky (rocky), Sh (shells), Wd (weed), and combinations thereof. This matters directly for anchoring: sand and mud generally hold well, while rocky or weedy bottoms hold poorly and can also foul or damage ground tackle.',
    source: 'NOAA U.S. Chart No. 1 — Nature of the Seabed (Section J)',
  },
  {
    id: 'chart-nav-sound-isolated-danger',
    topic: 'chart-nav',
    concepts: ['chart-symbols'],
    format: 'visual',
    assetId: 'noaa-wreck-symbols',
    prompt:
      'On this NOAA Chart No. 1 excerpt, the magenta circle-with-an-X ECDIS symbol is labeled "isolated danger of depth less than the safety contour." What does an isolated danger mark tell a navigator?',
    choices: [
      {
        id: 'b',
        text: 'The entire surrounding area is unsafe to transit',
        whyWrong:
          'An isolated danger is a localized point hazard, not a broad no-go zone — the water around it is otherwise navigable.',
      },
      {
        id: 'c',
        text: 'It marks a safe water mark showing the center of a channel',
        whyWrong:
          'A safe-water mark is a different, distinct symbol; an isolated danger mark is a hazard warning, not a "safe to pass here" mark.',
      },
      {
        id: 'd',
        text: 'It is a boundary between two chart editions',
        whyWrong:
          'Chart edition boundaries are shown with reference notes, not a magenta danger symbol.',
      },
      {
        id: 'a',
        text: 'There is a small, specific hazard (rock, wreck, or obstruction) of limited extent at that spot that is shallower than a safe working depth — go around it',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'An isolated danger symbol flags a discrete hazard of limited size — such as a single rock or wreck — that is shallower than the chart\'s safety contour. It warns you to avoid that specific spot; the surrounding water is otherwise navigable at the plotted depths.',
    source: 'NOAA U.S. Chart No. 1 — Rocks, Wrecks, Obstructions and Aquaculture (Section K)',
  },
  {
    id: 'chart-nav-sound-rock-awash',
    topic: 'chart-nav',
    concepts: ['chart-symbols'],
    format: 'visual',
    assetId: 'noaa-rock-covers',
    prompt:
      'This NOAA Chart No. 1 excerpt shows a rock symbol described as "which covers and uncovers, height above chart datum." What does it mean for a rock to "cover and uncover"?',
    choices: [
      {
        id: 'b',
        text: 'The rock is sometimes covered by seaweed',
        whyWrong:
          'The covers/uncovers language on charts refers to tidal submersion, not vegetation.',
      },
      {
        id: 'c',
        text: 'The rock moves position with the current',
        whyWrong:
          'Charted rocks are fixed geological features; they do not move.',
      },
      {
        id: 'd',
        text: 'The chart symbol is only shown during winter months',
        whyWrong:
          'Charted rock symbols are permanent chart features, not seasonal.',
      },
      {
        id: 'a',
        text: 'The rock is exposed (dry) at low tide but submerged at higher tide levels, so its danger to a passing vessel changes with the state of the tide',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A rock that "covers and uncovers" is one whose top lies between the high-water and low-water lines: it is visible (dry) at low tide but submerged and invisible at higher tide — making it especially dangerous, since it can disappear from view exactly when it becomes a collision hazard.',
    source: 'NOAA U.S. Chart No. 1 — Rocks, Wrecks, Obstructions and Aquaculture (Section K)',
  },
  {
    id: 'chart-nav-aton-lateral-colors',
    topic: 'chart-nav',
    concepts: ['lateral-system-aton'],
    format: 'visual',
    assetId: 'noaa-iala-region-b',
    prompt:
      'This is the IALA Region B lateral-mark diagram (the system used in U.S. waters) from NOAA Chart No. 1. What colors and shapes identify the port-hand and starboard-hand marks?',
    choices: [
      {
        id: 'd',
        text: 'Colors are not standardized and vary by state',
        whyWrong:
          'IALA lateral mark colors are internationally standardized within each buoyage region; Region B (used in the U.S.) is consistent nationwide.',
      },
      {
        id: 'a',
        text: 'Port-hand marks are green with a cylindrical (can) shape; starboard-hand marks are red with a conical (nun) shape',
      },
      {
        id: 'b',
        text: 'Port-hand marks are red with a conical shape; starboard-hand marks are green with a cylindrical shape',
        whyWrong:
          'That reverses the actual Region B (U.S.) coloring — red is starboard-hand, green is port-hand.',
      },
      {
        id: 'c',
        text: 'Both port and starboard marks are yellow, distinguished only by numbers',
        whyWrong:
          'Yellow is used for special marks, not the lateral (port/starboard) system.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'In IALA Region B, used throughout the United States: port-hand marks are green, cylindrical ("can") buoys with a flat top, and starboard-hand marks are red, conical ("nun") buoys with a pointed top. Their meaning depends on your direction of travel relative to the "buoyage direction" (normally entering from seaward).',
    source: 'NOAA U.S. Chart No. 1, Appendix 1 — IALA Maritime Buoyage System, Region B',
  },
  {
    id: 'chart-nav-aton-numbering',
    topic: 'chart-nav',
    concepts: ['lateral-system-aton'],
    format: 'text',
    prompt:
      'U.S. lateral aids to navigation are numbered as well as colored. When proceeding from seaward into a channel (the normal "upstream" or return direction), how are green and red aids numbered?',
    choices: [
      {
        id: 'a',
        text: 'Green (port-hand) aids carry odd numbers, and red (starboard-hand) aids carry even numbers, with numbers generally increasing as you head upstream/into the channel',
      },
      {
        id: 'b',
        text: 'Green aids carry even numbers and red aids carry odd numbers',
        whyWrong:
          'U.S. lateral numbering is the reverse: odd numbers go on green marks, even numbers on red marks.',
      },
      {
        id: 'c',
        text: 'Numbers reset to 1 at every marina along the channel',
        whyWrong:
          'Numbering runs continuously along a charted channel system, not per marina.',
      },
      {
        id: 'd',
        text: 'Numbers indicate the water depth at that aid in feet',
        whyWrong:
          'Aid numbers identify sequence along the channel, not depth — depth is shown separately as a sounding.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'By convention in the U.S. lateral system, odd numbers mark green (port-hand, can-shaped) aids and even numbers mark red (starboard-hand, nun-shaped) aids, generally increasing as you proceed from seaward into a channel or harbor — helping you track your progress and cross-check your position against the chart.',
    source: 'USCG Navigation Rules / U.S. Aids to Navigation System — lateral mark numbering',
  },
  {
    id: 'chart-nav-aton-red-right-returning',
    topic: 'chart-nav',
    concepts: ['lateral-system-aton'],
    format: 'visual',
    assetId: 'noaa-iala-region-b',
    prompt:
      'Using this Region B lateral-mark diagram and the memory aid "red, right, returning," if you are entering a channel from seaward, on which side should you keep the red, conical (nun) marks?',
    choices: [
      {
        id: 'a',
        text: 'On your starboard (right) side',
      },
      {
        id: 'b',
        text: 'On your port (left) side',
        whyWrong:
          '"Red, right, returning" specifically means keeping red marks on your right — the opposite side would run you toward the green, port-hand marks.',
      },
      {
        id: 'c',
        text: 'It does not matter as long as you stay near the center of the channel',
        whyWrong:
          'Lateral marks specifically define which side of the channel is safe on each side of you — position relative to them matters.',
      },
      {
        id: 'd',
        text: 'Directly ahead, treating them as mid-channel markers',
        whyWrong:
          'Red nuns mark the edge of the channel on the starboard hand when returning, not the centerline.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      '"Red, right, returning" is the classic U.S. memory aid: when returning from seaward (heading into a harbor, river, or channel from open water), keep red, conical (nun) marks on your starboard (right) side and green, cylindrical (can) marks on your port (left) side.',
    source: 'NOAA U.S. Chart No. 1, Appendix 1 — IALA Maritime Buoyage System, Region B',
  },
  {
    id: 'chart-nav-aton-preferred-channel',
    topic: 'chart-nav',
    concepts: ['lateral-system-aton'],
    format: 'visual',
    assetId: 'noaa-iala-region-b',
    prompt:
      'A preferred-channel (junction) mark has horizontal bands of both red and green. If the topmost band on the buoy is red, what does that tell you about the preferred (primary) channel?',
    choices: [
      {
        id: 'a',
        text: 'The preferred channel is to your starboard when returning from seaward — treat the mark generally as you would a red, starboard-hand mark',
        whyWrong:
          'The second half is right and the first half is wrong. It is treated as a red, starboard-hand mark, and you do keep it to starboard — which is exactly why the preferred channel lies to PORT of the mark, not to starboard. Keeping the mark to starboard puts your track down the branch on the mark\'s port side.',
      },
      {
        id: 'b',
        text: 'The preferred channel is to your port when returning from seaward — treat the mark as a red, starboard-hand mark and keep it to starboard',
      },
      {
        id: 'c',
        text: 'Both channels are equally safe in all conditions',
        whyWrong:
          'A preferred-channel mark specifically flags one branch as the primary, recommended route — the two branches are not being presented as equivalent.',
      },
      {
        id: 'd',
        text: 'The mark is unlit and should be avoided entirely',
        whyWrong:
          'Color banding indicates channel preference, not the mark\'s lighting status.',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'A junction/preferred-channel mark shows red and green bands, and the topmost band tells you which lateral mark to treat it as. Red on top means treat it as a red, starboard-hand mark: keep it to starboard when returning from seaward, exactly as you would a red nun. Because your track passes on the mark\'s port side, the preferred channel is the branch to PORT of the mark — which is why Chart No. 1 labels red-over-green as "Preferred Channel to Port." A green-topped mark reverses it: keep it to port, and the preferred channel lies to starboard of the mark.',
    source: 'NOAA U.S. Chart No. 1, Appendix 1 — IALA Maritime Buoyage System, Region B (Preferred Channel Marks)',
  },
  {
    id: 'chart-nav-aton-daymark-shapes',
    topic: 'chart-nav',
    concepts: ['lateral-system-aton'],
    format: 'text',
    prompt:
      'Fixed daymarks (unlit, shore- or piling-mounted signs) also follow the lateral color system. What shape and color combination marks the starboard-hand side of a channel by day?',
    choices: [
      {
        id: 'd',
        text: 'A white, circular daymark',
        whyWrong:
          'A plain white circle is not a standard lateral daymark shape.',
      },
      {
        id: 'a',
        text: 'A red, triangular daymark',
      },
      {
        id: 'b',
        text: 'A green, square daymark',
        whyWrong:
          'A green square is the port-hand daymark, not the starboard-hand one.',
      },
      {
        id: 'c',
        text: 'A yellow, diamond-shaped daymark',
        whyWrong:
          'Yellow diamonds are used for special-purpose marks, not standard lateral daymarks.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Daymarks mirror the lateral buoy system by shape as well as color: a red triangle corresponds to a red, conical (nun) buoy — the starboard-hand side when returning from seaward — while a green square corresponds to a green, cylindrical (can) buoy on the port-hand side.',
    source: 'USCG Aids to Navigation System — lateral daymarks',
  },
  {
    id: 'chart-nav-aton-light-quick',
    topic: 'chart-nav',
    concepts: ['buoys-beacons-and-lights'],
    format: 'visual',
    assetId: 'noaa-light-characters',
    prompt:
      'This NOAA Chart No. 1 excerpt illustrates several light characteristics. A light charted as "Fl" flashes with the dark period longer than the light period. How would a "Q" (quick-flashing) light differ from an ordinary "Fl" light?',
    choices: [
      {
        id: 'b',
        text: 'A quick-flashing light is always red, while "Fl" lights are always white',
        whyWrong:
          'Light color is independent of its rhythm/character; both Fl and Q lights can appear in various colors depending on the aid.',
      },
      {
        id: 'c',
        text: 'A "Q" light only operates during fog',
        whyWrong:
          'Light characteristic and fog signals are separate systems; a quick light runs on its normal rhythm regardless of visibility.',
      },
      {
        id: 'd',
        text: 'There is no real difference — they are alternate abbreviations for the same rhythm',
        whyWrong:
          'Fl and Q describe distinctly different flash rates, which is exactly why charts distinguish them — mixing them up could mean misidentifying which aid you are looking at.',
      },
      {
        id: 'a',
        text: 'A quick-flashing light repeats its flash much more rapidly — about 50 to 79 flashes per minute — versus the slower, more widely spaced single flashes of an ordinary "Fl" light',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Ordinary flashing ("Fl") lights show single, well-spaced flashes with dark periods longer than the flash. Quick-flashing ("Q") lights repeat much faster — about 50 to 79 flashes per minute — a visibly different, rapid twinkling rhythm used to make an aid more conspicuous or to mark specific hazards.',
    source: 'NOAA U.S. Chart No. 1 — Lights, Light Characters (Section P)',
  },
  {
    id: 'chart-nav-aton-light-occulting',
    topic: 'chart-nav',
    concepts: ['buoys-beacons-and-lights'],
    format: 'visual',
    assetId: 'noaa-light-characters',
    prompt:
      'In the light-character illustrations shown, an "Occulting" (Oc) light is defined as one where the total duration of light is longer than the total duration of darkness. How does this differ from a "Fixed" (F) light?',
    choices: [
      {
        id: 'b',
        text: 'A fixed light and an occulting light are identical in every way',
        whyWrong:
          'They are explicitly different classes on the chart\'s light-character table — fixed never goes dark, occulting does, briefly.',
      },
      {
        id: 'c',
        text: 'An occulting light only shows during the day',
        whyWrong:
          'Light characteristics describe night-time light rhythm; occulting is a nighttime pattern, not a daytime-only feature.',
      },
      {
        id: 'd',
        text: 'A fixed light flashes rapidly while an occulting light stays solid',
        whyWrong:
          'That description is reversed — fixed is the steady, unbroken light; occulting is the one with brief eclipses.',
      },
      {
        id: 'a',
        text: 'A fixed light shows continuously with no dark periods at all, while an occulting light is mostly lit but briefly and regularly goes dark',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A fixed (F) light shows a steady, continuous light with no interruption. An occulting (Oc) light is lit most of the time but briefly and regularly "occults" (goes dark) — the opposite emphasis of a flashing light, where darkness dominates over brief flashes.',
    source: 'NOAA U.S. Chart No. 1 — Lights, Light Characters (Section P)',
  },
  {
    id: 'chart-nav-aton-beacon-vs-buoy',
    topic: 'chart-nav',
    concepts: ['buoys-beacons-and-lights'],
    format: 'visual',
    assetId: 'noaa-buoy-beacon-basic',
    prompt:
      'Chart No. 1 gives separate default symbols for buoys and beacons, as shown here. Practically speaking, why does it matter to a navigator whether an aid to navigation is a buoy or a beacon?',
    choices: [
      {
        id: 'b',
        text: 'Buoys are always lit and beacons are never lit',
        whyWrong:
          'Either type can be lit or unlit; light status is independent of the buoy-vs-beacon distinction.',
      },
      {
        id: 'c',
        text: 'Beacons only exist in freshwater and buoys only exist in saltwater',
        whyWrong:
          'Both beacon and buoy types are used in both freshwater and saltwater areas as appropriate to local conditions.',
      },
      {
        id: 'd',
        text: 'There is no practical difference to a navigator',
        whyWrong:
          'The fixed-vs-floating distinction has real navigational consequences, particularly for how much you should trust an aid\'s exact charted position.',
      },
      {
        id: 'a',
        text: 'A beacon is fixed to the bottom or shore and stays exactly where charted, while a buoy is anchored and can shift position slightly, be dragged off station by weather, or occasionally go missing — so a beacon\'s charted position is more absolutely reliable',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A beacon is a fixed structure — a piling, tower, or daymark on land — so its charted position is exact and permanent. A buoy floats, moored by a chain to a sinker; storms, ship strikes, or ice can drag it off station or sink it entirely, so mariners should treat a buoy\'s position as generally reliable but not absolutely guaranteed, and should not rely on buoys alone in thick weather.',
    source: 'NOAA U.S. Chart No. 1 — Buoys, Beacons (Section Q)',
  },
  {
    id: 'chart-nav-latlong-reading',
    topic: 'chart-nav',
    concepts: ['latitude-longitude'],
    format: 'visual',
    assetId: 'custom-lat-long-grid',
    prompt:
      'In this chart border excerpt, latitude tick marks run down the side borders and longitude tick marks run along the top and bottom borders. What is the position marked "X"?',
    choices: [
      {
        id: 'a',
        text: '41°25\'N, 71°19\'W',
      },
      {
        id: 'b',
        text: '41°24\'N, 71°18\'W',
        whyWrong:
          'That reads one tick off in both latitude and longitude from the marked X — check the gridlines running from each border tick to the X.',
      },
      {
        id: 'c',
        text: '71°19\'N, 41°25\'W',
        whyWrong:
          'Latitude and longitude are swapped here — latitude is always stated first and is read from the side (N/S) borders, longitude from the top/bottom (E/W) borders.',
      },
      {
        id: 'd',
        text: '41°26\'N, 71°20\'W',
        whyWrong:
          'That is one tick off from the X in both directions — re-trace the gridlines from the labeled ticks to the marked position.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Latitude (north/south position) is read from the tick marks on the side borders, and longitude (east/west position) is read from the tick marks on the top/bottom borders. Tracing the gridlines from the labeled ticks to the X gives 41°25\'N, 71°19\'W — latitude is always stated first.',
    source: 'NOAA U.S. Chart No. 1 — Positions, Distances, Directions, Compass (Section B)',
  },
  {
    id: 'chart-nav-latlong-dms-format',
    topic: 'chart-nav',
    concepts: ['latitude-longitude'],
    format: 'text',
    prompt:
      'A charted position is given as 41°24.5\'N. How should this be read?',
    choices: [
      {
        id: 'd',
        text: '41 degrees, 24 minutes, 5 seconds',
        whyWrong:
          'The decimal after 24 means 24.5 minutes (a fraction of a minute), not "24 minutes 5 seconds" — that would be written 41°24\'05".',
      },
      {
        id: 'a',
        text: '41 degrees, 24.5 minutes of latitude, north of the equator',
      },
      {
        id: 'b',
        text: '41 hours, 24.5 minutes past noon',
        whyWrong:
          'Latitude/longitude coordinates use degrees and minutes of arc, not units of time.',
      },
      {
        id: 'c',
        text: '41.245 nautical miles north of the equator',
        whyWrong:
          'The number is a degrees/minutes coordinate, not a distance in miles.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Latitude and longitude are traditionally expressed in degrees and minutes of arc (each degree = 60 minutes), often carried out to a decimal fraction of a minute for precision — as in 41°24.5\'N, meaning 41 degrees and 24.5 minutes of latitude north of the equator. (Minutes can also be split into seconds, 60 to a minute, though modern GPS units commonly show decimal minutes instead.)',
    source: 'ASA 103 piloting fundamentals — latitude/longitude notation',
  },
  {
    id: 'chart-nav-latlong-equator',
    topic: 'chart-nav',
    concepts: ['latitude-longitude'],
    format: 'text',
    prompt:
      'Latitude is measured as an angular distance north or south of what reference line?',
    choices: [
      {
        id: 'd',
        text: 'The nearest coastline',
        whyWrong:
          'Latitude is a fixed global reference (the equator), not a local reference to nearby land.',
      },
      {
        id: 'a',
        text: 'The equator',
      },
      {
        id: 'b',
        text: 'The prime meridian',
        whyWrong:
          'The prime meridian is the reference for longitude, not latitude.',
      },
      {
        id: 'c',
        text: 'The International Date Line',
        whyWrong:
          'The date line is a specific meridian used for calendar purposes, not the latitude reference.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Latitude measures how far north or south a position is from the equator (0°), ranging from 0° at the equator to 90°N at the North Pole and 90°S at the South Pole.',
    source: 'ASA 103 piloting fundamentals — latitude/longitude',
  },
  {
    id: 'chart-nav-latlong-prime-meridian',
    topic: 'chart-nav',
    concepts: ['latitude-longitude'],
    format: 'text',
    prompt:
      'Longitude is measured as an angular distance east or west of what reference line?',
    choices: [
      {
        id: 'a',
        text: 'The prime meridian (0°, passing through Greenwich, England)',
      },
      {
        id: 'b',
        text: 'The equator',
        whyWrong:
          'The equator is the reference for latitude; longitude is referenced to the prime meridian.',
      },
      {
        id: 'c',
        text: 'The Tropic of Cancer',
        whyWrong:
          'The Tropic of Cancer is a specific parallel of latitude, not the longitude reference.',
      },
      {
        id: 'd',
        text: 'Whichever meridian is closest to the vessel\'s home port',
        whyWrong:
          'Longitude uses one single global reference — the prime meridian — not a locally chosen one.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Longitude measures how far east or west a position is from the prime meridian (0°), which by international convention passes through Greenwich, England, ranging from 0° to 180°E and 0° to 180°W.',
    source: 'ASA 103 piloting fundamentals — latitude/longitude',
  },
  {
    id: 'chart-nav-latlong-minute-equals-nm',
    topic: 'chart-nav',
    concepts: ['distance-speed-time'],
    format: 'text',
    prompt:
      'Why is the latitude scale on the side border of a chart used to measure distance, rather than the longitude scale on the top or bottom border?',
    choices: [
      {
        id: 'c',
        text: 'Longitude cannot be measured accurately with dividers',
        whyWrong:
          'Dividers can measure either scale; the issue is that longitude\'s real-world distance-per-minute varies with latitude, so it does not give a consistent mile scale.',
      },
      {
        id: 'd',
        text: 'Latitude lines are printed in a bolder color for easier reading',
        whyWrong:
          'The reason is the underlying geometry (a fixed nautical mile per minute of latitude), not print styling.',
      },
      {
        id: 'a',
        text: 'One minute of latitude is defined to equal one nautical mile everywhere on Earth, while the real-world distance covered by one minute of longitude shrinks as you move away from the equator toward the poles',
      },
      {
        id: 'b',
        text: 'The longitude scale is only printed on some charts',
        whyWrong:
          'Both scales are printed on virtually all nautical charts; the reason to prefer latitude is the fixed nautical-mile relationship, not availability.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'By definition, one minute of latitude equals one nautical mile everywhere on the globe, since meridians of longitude all converge at the poles but the distance between parallels of latitude stays essentially constant. A minute of longitude, by contrast, spans a full nautical mile only at the equator and covers less and less actual distance as you move toward the poles — so only the latitude (side) scale gives a reliable, constant distance scale.',
    source: 'ASA 103 piloting fundamentals — the nautical mile and the latitude scale',
  },
  {
    id: 'chart-nav-compass-true-vs-magnetic',
    topic: 'chart-nav',
    concepts: ['compass-and-compass-rose'],
    format: 'visual',
    assetId: 'noaa-compass-rose',
    prompt:
      'On this compass rose, the outer ring is referenced to true north and the inner "MAGNETIC" ring is offset from it by the local variation. What is magnetic variation?',
    choices: [
      {
        id: 'd',
        text: 'The difference between magnetic north this year and magnetic north a century ago',
        whyWrong:
          'Variation does slowly change over years (which is why charts print an annual-change note), but the term itself refers to the true-vs-magnetic angular offset at a location, not a change over time.',
      },
      {
        id: 'a',
        text: 'The angular difference at a given location between true north (the geographic North Pole) and magnetic north (the direction a compass needle points), caused by the Earth\'s magnetic field not aligning exactly with its axis of rotation',
      },
      {
        id: 'b',
        text: 'The difference between a boat\'s compass reading and its GPS heading, caused by onboard electronics',
        whyWrong:
          'That describes deviation, a separate, boat-specific error — variation is a location-based, Earth-geography error common to every compass in that area.',
      },
      {
        id: 'c',
        text: 'The seasonal change in the Earth\'s tides',
        whyWrong:
          'Variation is a magnetic/geographic phenomenon, unrelated to tides.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Variation (also called declination) is the angle between true north and magnetic north at a specific location, caused by the Earth\'s magnetic poles not coinciding with its geographic poles. It varies by location — and slowly over time — which is why each chart\'s compass rose states the local variation and its annual rate of change.',
    source: 'NOAA U.S. Chart No. 1 — Positions, Distances, Directions, Compass (Section B)',
  },
  {
    id: 'chart-nav-compass-variation-defn',
    topic: 'chart-nav',
    concepts: ['compass-variation'],
    format: 'text',
    prompt:
      'A chart\'s compass rose states "VAR 6°W." If you plot a true course of 090° (due east) on the chart, what magnetic course should you steer to follow that same track, ignoring deviation?',
    choices: [
      {
        id: 'd',
        text: '180° magnetic',
        whyWrong:
          'That is unrelated to a 6° correction; it looks like an unrelated reversal rather than applying the stated variation.',
      },
      {
        id: 'a',
        text: '096° magnetic (add westerly variation to a true course to get magnetic)',
      },
      {
        id: 'b',
        text: '084° magnetic',
        whyWrong:
          'That subtracts the westerly variation; the rule is "true plus west" — you add westerly variation to convert true to magnetic.',
      },
      {
        id: 'c',
        text: '090° magnetic, unchanged',
        whyWrong:
          'With 6° of westerly variation present, true and magnetic directions are not the same — you must apply the correction.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'The standard rule is "true plus west, magnetic best" (i.e., add westerly variation, subtract easterly variation, when converting true to magnetic). A true course of 090° with 6°W variation becomes 090° + 6° = 096° magnetic — the course you should actually steer by an undeviated compass.',
    source: 'ASA 103 piloting fundamentals — true/magnetic conversion',
  },
  {
    id: 'chart-nav-compass-apply-variation',
    topic: 'chart-nav',
    concepts: ['compass-variation'],
    format: 'visual',
    assetId: 'noaa-compass-rose',
    prompt:
      'This compass rose is annotated "VAR 4°15\'W (2018), ANNUAL CHANGE 8\'E" — meaning the westerly variation is decreasing by 8 minutes of arc each year. Roughly what would the variation be in 2026, eight years later?',
    choices: [
      {
        id: 'c',
        text: 'About 4°15\'W plus another full 8° added on top',
        whyWrong:
          'The annual change is 8 minutes of arc (8\') per year, not 8 degrees — confusing minutes with degrees overstates the change by a factor of 60.',
      },
      {
        id: 'd',
        text: 'It becomes easterly variation of over 60°',
        whyWrong:
          'That wildly overstates an 8 years × 8\'/year change, which totals about 1°, not tens of degrees.',
      },
      {
        id: 'a',
        text: 'About 3°11\'W — approximately 1° less westerly than in 2018, since 8 years × 8\' per year ≈ 64\', or just over 1°, decreasing the original 4°15\'W',
      },
      {
        id: 'b',
        text: 'Exactly the same, 4°15\'W, since variation never actually changes in practice',
        whyWrong:
          'The chart explicitly states an annual change rate — ignoring it defeats the purpose of that printed note, especially on an older chart edition.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'The annual change note lets you correct an older chart\'s variation for the current year. Here, 8 years × 8\' per year = 64\', or about 1°04\', which reduces the 2018 westerly variation of 4°15\'W to roughly 3°11\'W by 2026. Always check a chart\'s edition date and apply its stated annual change — or use a current chart/electronic source — for the most accurate variation.',
    source: 'NOAA U.S. Chart No. 1 — Positions, Distances, Directions, Compass (Section B)',
  },
  {
    id: 'chart-nav-compass-deviation-vs-variation',
    topic: 'chart-nav',
    concepts: ['compass-deviation'],
    format: 'text',
    prompt:
      'Besides variation, a boat\'s steering compass can be affected by "deviation." How does deviation differ from variation?',
    choices: [
      {
        id: 'c',
        text: 'Deviation only matters for GPS units, not magnetic compasses',
        whyWrong:
          'Deviation is specifically a magnetic-compass error; GPS is a satellite system unaffected by a boat\'s local magnetism.',
      },
      {
        id: 'd',
        text: 'Deviation is caused by the moon\'s gravitational pull',
        whyWrong:
          'Deviation is caused by the vessel\'s own metal and electrical/magnetic equipment, not celestial gravity.',
      },
      {
        id: 'a',
        text: 'Deviation is an error specific to an individual vessel, caused by the boat\'s own metal, electronics, and magnetic fields, and it changes with the boat\'s heading — unlike variation, which depends only on geographic location',
      },
      {
        id: 'b',
        text: 'Deviation and variation are two names for the exact same error',
        whyWrong:
          'They are distinct: variation comes from Earth\'s geography, deviation comes from the individual vessel\'s onboard magnetic influences — and a compass correction table must account for both separately.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Variation is a property of a location on Earth (the same for every compass in that area). Deviation is a property of an individual vessel, caused by nearby ferrous metal, wiring, engines, and electronics aboard that specific boat — and because those influences act differently depending on which way the bow is pointed, deviation changes with heading and is recorded on a boat-specific deviation table or card.',
    source: 'ASA 103 piloting fundamentals — compass errors (variation vs. deviation)',
  },
  {
    id: 'chart-nav-distance-latitude-scale',
    topic: 'chart-nav',
    concepts: ['distance-speed-time'],
    format: 'visual',
    assetId: 'custom-distance-scale',
    prompt:
      'In this diagram, dividers have been walked from Point A to Point B, then transferred to the latitude border scale, spanning three of the labeled 1-minute tick marks. About how far apart are Points A and B?',
    choices: [
      {
        id: 'd',
        text: '0.3 nautical miles',
        whyWrong:
          'That divides by 10 instead of reading the span directly — three whole 1-minute ticks span 3 nm, not 0.3 nm.',
      },
      {
        id: 'a',
        text: '3 nautical miles',
      },
      {
        id: 'b',
        text: '3 statute miles',
        whyWrong:
          'The chart\'s latitude scale reads directly in nautical miles (1 minute of latitude = 1 nm), not statute miles.',
      },
      {
        id: 'c',
        text: '30 nautical miles',
        whyWrong:
          'That would be the span for 30 minutes of latitude, ten times wider than the 3-minute span actually shown.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Since one minute of latitude equals one nautical mile, a divider span that covers three 1-minute ticks on the latitude border represents 3 nautical miles. This is the standard way to measure any distance on a chart: span it with dividers, then walk that same span against the latitude scale.',
    source: 'ASA 103 piloting fundamentals — measuring distance with the latitude scale',
  },
  {
    id: 'chart-nav-distance-nm-length',
    topic: 'chart-nav',
    concepts: ['distance-speed-time'],
    format: 'text',
    prompt:
      'Approximately how many feet are in one nautical mile, and how does a nautical mile compare to a statute (land) mile?',
    choices: [
      {
        id: 'c',
        text: 'About 1,000 feet, much shorter than a statute mile',
        whyWrong:
          'A nautical mile is longer than a statute mile, not dramatically shorter.',
      },
      {
        id: 'd',
        text: 'About 10,000 feet, roughly double a statute mile',
        whyWrong:
          'A nautical mile is only modestly longer than a statute mile (about 15% longer), not double.',
      },
      {
        id: 'a',
        text: 'About 6,076 feet — roughly 1.15 statute miles, making a nautical mile longer than a statute mile',
      },
      {
        id: 'b',
        text: 'About 5,280 feet, exactly the same as a statute mile',
        whyWrong:
          '5,280 feet is the definition of a statute mile; a nautical mile is a different, longer unit (about 6,076 feet).',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A nautical mile is about 6,076 feet (1,852 meters), based on one minute of latitude. It is longer than the familiar statute (land) mile of 5,280 feet — about 1.15 statute miles to one nautical mile. Boat speed in knots is nautical miles per hour, which is why knots and statute-mile-per-hour speeds are not directly interchangeable.',
    source: 'ASA 103 piloting fundamentals — the nautical mile',
  },
  {
    id: 'chart-nav-distance-dividers-method',
    topic: 'chart-nav',
    concepts: ['distance-speed-time'],
    format: 'text',
    prompt:
      'You need to measure the distance along a curving track between two points on a chart that is longer than a single span of your dividers. What is the standard technique?',
    choices: [
      {
        id: 'c',
        text: 'Use only the compass rose to estimate distance',
        whyWrong:
          'The compass rose is for reading direction, not for measuring distance.',
      },
      {
        id: 'd',
        text: 'Distances longer than one divider span cannot be measured on paper charts',
        whyWrong:
          'Walking the dividers step by step handles any length of track, however long, on a paper chart.',
      },
      {
        id: 'a',
        text: '"Walk" the dividers end over end along the track, counting each full step, then add any partial final step, and total the steps against the latitude scale',
      },
      {
        id: 'b',
        text: 'Estimate the distance by eye and skip the dividers entirely',
        whyWrong:
          'Estimating by eye defeats the purpose of having a precise measuring tool — dividers exist specifically to make this measurement accurate and repeatable.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'To measure a distance longer than one span of your dividers, open them to a convenient round number of miles, then "walk" them end-over-end along the track, counting each full step. Add any leftover partial step (measured against the latitude scale) to the count of full steps for the total distance.',
    source: 'ASA 103 piloting fundamentals — measuring distance with dividers',
  },
  {
    id: 'chart-nav-compass-interference-sources',
    topic: 'chart-nav',
    concepts: ['compass-deviation'],
    format: 'visual',
    assetId: 'custom-compass-interference',
    prompt:
      'In this diagram, a steering compass\'s needle is pulled off true north by nearby items. What two everyday items shown are the likely cause?',
    choices: [
      {
        id: 'c',
        text: 'The color of the boat\'s hull',
        whyWrong:
          'Hull color has no magnetic effect on a compass.',
      },
      {
        id: 'd',
        text: 'The crew\'s clothing',
        whyWrong:
          'Ordinary clothing is not a magnetic material and would not deflect a compass needle.',
      },
      {
        id: 'a',
        text: 'A steel toolbox and a handheld radio placed close to the compass',
      },
      {
        id: 'b',
        text: 'Sunlight and fresh water',
        whyWrong:
          'Neither sunlight nor fresh water affects a magnetic compass; the deflection shown is caused by nearby ferrous metal and electronics.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Ferrous metal objects (like a steel toolbox) and electronics with motors, speakers, or magnets (like a handheld radio) can each generate their own local magnetic field strong enough to pull a nearby compass needle off true, adding deviation error. Keep such items well away from the steering compass, and never store them near it.',
    source: 'ASA 103 piloting fundamentals — compass deviation sources',
  },
  {
    id: 'chart-nav-compass-interference-siting',
    topic: 'chart-nav',
    concepts: ['compass-deviation'],
    format: 'text',
    prompt:
      'You are choosing where to permanently mount a new steering compass on a small boat. What general precaution should guide your choice of location?',
    choices: [
      {
        id: 'a',
        text: 'Mount it as far as practical from engines, speakers, metal tool storage, and other magnetic or current-carrying equipment, and swing (calibrate) it in place afterward',
      },
      {
        id: 'b',
        text: 'Mount it as close as possible to the engine for a stable, vibration-damped platform',
        whyWrong:
          'Engines are strong sources of magnetic and electrical interference — mounting a compass near one is exactly what to avoid.',
      },
      {
        id: 'c',
        text: 'Location does not matter as long as the compass itself is high quality',
        whyWrong:
          'Even an excellent compass will read incorrectly if it is sited near magnetic interference — placement matters as much as compass quality.',
      },
      {
        id: 'd',
        text: 'Mount it inside a metal instrument box for protection',
        whyWrong:
          'Surrounding a compass with metal is one of the most direct ways to induce deviation error — compasses need to be clear of ferrous material, not enclosed by it.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Good compass siting keeps the instrument well clear of engines, metal fittings, speakers, and other magnetically or electrically active equipment. Even with careful placement, a compass should be "swung" — checked against known headings and adjusted or tabulated for any remaining deviation — once installed aboard that specific vessel.',
    source: 'ASA 103 piloting fundamentals — compass installation and compensation',
  },
  {
    id: 'chart-nav-lee-shore-defn',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'custom-lee-shore',
    prompt:
      'In this diagram, wind blows from open water directly toward a rocky shoreline where a boat is anchored close in. What is this kind of shoreline called relative to the wind, and why is a boat\'s position there risky?',
    choices: [
      {
        id: 'c',
        text: 'It is called a "weather shore," and it offers the best possible shelter from wind and waves',
        whyWrong:
          'A shore that shelters you from the wind (with the wind blowing off it) is a lee (or weather) shore in the sheltering sense — but a shore the wind blows directly onto, as shown, is dangerous, not sheltering.',
      },
      {
        id: 'd',
        text: 'The term only applies to ocean coastlines, not bays or rivers',
        whyWrong:
          'A lee shore is any shoreline downwind of a vessel — the concept applies just as much on a lake, bay, or river as on the open coast.',
      },
      {
        id: 'a',
        text: 'It is a lee shore — a shoreline the wind is blowing onto — and if the anchor drags or the engine fails, the wind will push the boat directly onto the rocks with no room to recover',
      },
      {
        id: 'b',
        text: 'It is a windward shore, and the boat is perfectly safe there in any wind strength',
        whyWrong:
          'A shore the wind blows onto is called a lee shore, not a windward shore, and it is one of the more hazardous places to be anchored or becalmed.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A lee shore is a shoreline that the wind is blowing toward (the shore lies "to leeward" of the wind). It is dangerous because if your anchor drags, your engine fails, or you cannot make headway against the wind, you will be blown directly onto the shore with little or no sea room to recover. Prudent seamanship avoids anchoring close to a lee shore, especially as wind or weather builds.',
    source: 'ASA 103 seamanship fundamentals — lee shore hazard',
  },
  {
    id: 'chart-nav-lee-shore-anchoring-risk',
    topic: 'chart-nav',
    format: 'text',
    prompt:
      'Forecast weather calls for the wind to build and shift so that your current anchorage will become a lee shore overnight. What is the seamanlike response?',
    choices: [
      {
        id: 'd',
        text: 'Move even closer to shore for better shelter from the waves',
        whyWrong:
          'Moving closer to a shoreline the wind is blowing onto increases risk rather than reducing it — there is less room to react if the anchor drags.',
      },
      {
        id: 'a',
        text: 'Relocate before the shift to a better-protected anchorage, or leave early enough to have sea room and options if conditions deteriorate',
      },
      {
        id: 'b',
        text: 'Add more scope and stay put, since more scope always solves any lee-shore risk',
        whyWrong:
          'More scope improves an anchor\'s holding, but it does not eliminate the fundamental danger of dragging onto a shore close under your lee — the safest response is to avoid being on a lee shore in worsening weather at all.',
      },
      {
        id: 'c',
        text: 'Shut down all instruments and wait it out below decks',
        whyWrong:
          'Passively waiting without a plan ignores the developing hazard; a lee-shore forecast calls for proactive repositioning or preparedness, not simply hoping for the best.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'When a forecast shift will turn your anchorage into a lee shore, the seamanlike choice is to relocate to a better-protected spot, or to depart with enough daylight and sea room to handle deteriorating conditions — rather than waiting until wind and seas have already built with a shoreline close under your lee.',
    source: 'ASA 103 seamanship fundamentals — anticipating a lee shore',
  },

  // ---------------------------------------------------------------------
  // Arc 3: Anchoring / Mooring (anchoring)
  // ---------------------------------------------------------------------
  {
    id: 'anchor-type-cqr-plow',
    topic: 'anchoring',
    format: 'visual',
    assetId: 'photo-cqr-anchor',
    prompt:
      'This is a CQR-style anchor, recognizable by its single hinged, plow-shaped fluke. What is a key advantage of this plow design?',
    choices: [
      {
        id: 'a',
        text: 'The hinge lets the fluke pivot and dig back in as the boat swings with wind or current shifts, giving reasonably good all-around holding in sand and mud',
      },
      {
        id: 'b',
        text: 'It requires no chain or rode at all to hold',
        whyWrong:
          'Every anchor, including a plow, still needs an adequate length of rode (ideally with some chain) to work properly — the hinge does not eliminate that need.',
      },
      {
        id: 'c',
        text: 'It is designed exclusively for rocky bottoms',
        whyWrong:
          'Plow anchors are generally chosen for sand and mud holding, not specifically for rock, where few anchor types hold reliably at all.',
      },
      {
        id: 'd',
        text: 'It floats on the surface so it never needs to be retrieved',
        whyWrong:
          'A plow anchor is a heavy digging anchor meant to bury on the bottom, not a floating device.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'The CQR (and similar plow-type) anchor\'s hinged shank lets the plow-shaped fluke re-orient and re-dig as the boat swings around it with changing wind or current, giving it reasonably reliable, all-around holding power in sand and mud bottoms — a major reason it became a popular cruising anchor.',
    source: 'ASA 103 anchoring fundamentals — anchor types',
  },
  {
    id: 'anchor-type-bruce-claw',
    topic: 'anchoring',
    format: 'visual',
    assetId: 'photo-bruce-anchor',
    prompt:
      'This claw-shaped, one-piece anchor (a Bruce-type or similar claw anchor) has no moving parts and no hinge. What is it particularly known for?',
    choices: [
      {
        id: 'd',
        text: 'Folding flat for compact storage',
        whyWrong:
          'Unlike a folding grapnel, a claw anchor is a rigid, one-piece casting with no folding mechanism.',
      },
      {
        id: 'a',
        text: 'Resetting quickly and reliably when wind or current shifts direction, thanks to its scoop-like claw shape',
      },
      {
        id: 'b',
        text: 'Providing the single highest holding power of any anchor design in every bottom type',
        whyWrong:
          'Claw anchors are valued mainly for quick, reliable resetting rather than for having the absolute highest holding power of all designs in every bottom.',
      },
      {
        id: 'c',
        text: 'Being used only as a stern anchor, never on the bow',
        whyWrong:
          'Claw anchors are commonly used as a primary bow (working) anchor, not restricted to stern use.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A claw-type (Bruce-style) anchor is a single rigid casting shaped like a claw or scoop. It has no hinges or moving parts to jam, and its shape lets it reorient and reset quickly and smoothly when the boat swings with a wind or current shift — a major reason it is popular for cruising boats that anchor overnight.',
    source: 'ASA 103 anchoring fundamentals — anchor types',
  },
  {
    id: 'anchor-type-danforth-fluke',
    topic: 'anchoring',
    format: 'visual',
    assetId: 'photo-danforth-anchor',
    prompt:
      'This lightweight anchor, with two flat, sharp-edged flukes that pivot open from a stock, is a Danforth-style (fluke) anchor. In which bottom conditions does it typically hold best, and where does it perform poorly?',
    choices: [
      {
        id: 'd',
        text: 'It is designed to never touch the bottom, holding purely by its own weight in the water column',
        whyWrong:
          'A fluke anchor must dig into the seabed to hold; it does not work by weight alone while suspended in the water.',
      },
      {
        id: 'a',
        text: 'It holds very well in soft sand and mud, where its flat flukes dig in and bury deeply, but it performs poorly in rock, grass, or heavy kelp, where the flukes cannot get a bite',
      },
      {
        id: 'b',
        text: 'It holds equally well in every bottom type, including solid rock',
        whyWrong:
          'Fluke anchors are among the weakest performers on rock and grassy/weedy bottoms, precisely because their thin flukes cannot penetrate or grip such surfaces.',
      },
      {
        id: 'c',
        text: 'It only works when towed behind the boat while underway',
        whyWrong:
          'A fluke anchor is meant to be set on the bottom while the boat is stopped, not towed while underway.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Danforth-style fluke anchors have excellent holding power for their light weight in sand and mud, where their broad, flat flukes bury deeply under load. However, they struggle on rocky, grassy, or heavily weeded bottoms, where the flukes cannot penetrate to get a purchase — a bottom-type limitation every anchor design has to some degree.',
    source: 'ASA 103 anchoring fundamentals — anchor types',
  },
  {
    id: 'anchor-type-mushroom',
    topic: 'anchoring',
    format: 'visual',
    assetId: 'photo-mushroom-anchor',
    prompt:
      'This heavy, inverted-bowl-shaped anchor is a mushroom anchor. What is it primarily used for, and why is it a poor choice as a boat\'s primary working anchor?',
    choices: [
      {
        id: 'b',
        text: 'It is the best all-around choice for a cruising sailboat\'s primary bow anchor',
        whyWrong:
          'A mushroom anchor is a poor everyday working anchor precisely because it needs time to settle into the bottom and does not resist sudden loads well — it is used for permanent moorings, not routine anchoring.',
      },
      {
        id: 'c',
        text: 'It is designed only for anchoring in swift river current',
        whyWrong:
          'Mushroom anchors are chosen for soft, still-bottom mooring applications, not specifically for fast-current holding.',
      },
      {
        id: 'd',
        text: 'It is the lightest anchor type available, ideal for small dinghies',
        whyWrong:
          'Mushroom anchors are comparatively heavy, relying largely on weight and gradual burial rather than being a lightweight option.',
      },
      {
        id: 'a',
        text: 'It is mainly used for permanent moorings in soft mud, where it slowly settles and buries over time for great holding — but as a working anchor it holds poorly at first set and does not grip well under a sudden load',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A mushroom anchor\'s curved, bowl-shaped head gradually settles into and buries in soft mud over weeks or months, developing excellent long-term holding for a permanent mooring. As a working anchor set and re-set repeatedly during a day\'s cruising, however, it grips poorly at first set and does not resist sudden loads well, so it is a poor substitute for a plow, claw, or fluke-type anchor.',
    source: 'ASA 103 anchoring fundamentals — anchor types',
  },
  {
    id: 'anchor-type-holding-power-factors',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'Beyond the anchor\'s design, what other factors most affect how well a given anchor actually holds?',
    choices: [
      {
        id: 'c',
        text: 'Only the color of the anchor',
        whyWrong:
          'Anchor color is cosmetic and has no bearing on holding power.',
      },
      {
        id: 'd',
        text: 'Only the time of day the anchor is set',
        whyWrong:
          'Time of day itself does not affect holding; the physical factors of bottom, sizing, and scope do.',
      },
      {
        id: 'a',
        text: 'The type of bottom (sand, mud, rock, grass), the anchor\'s weight and size relative to the boat, and the scope and type of rode used',
      },
      {
        id: 'b',
        text: 'Only the anchor\'s purchase price',
        whyWrong:
          'Price does not determine holding power — bottom type, sizing, and scope/rode are the factors that actually govern performance.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'No anchor design can overcome a poor match to its conditions: a correctly sized anchor for the boat, an appropriate bottom (sand and mud generally hold best; rock and grass hold worst), and sufficient scope with suitable rode (chain improves the angle of pull and adds weight/catenary) all combine to determine actual holding power on a given day.',
    source: 'ASA 103 anchoring fundamentals — factors in holding power',
  },
  {
    id: 'anchor-type-choose-for-bottom',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'You are anchoring for the night in a cove with a soft mud bottom. Which general category of anchor would be the strongest match for that bottom?',
    choices: [
      {
        id: 'a',
        text: 'A fluke-type (Danforth-style) or plow-type anchor, both of which are known for burying well and holding strongly in soft mud',
      },
      {
        id: 'b',
        text: 'A mushroom anchor set once and never checked',
        whyWrong:
          'A mushroom anchor needs time (days to weeks) to settle and bury for good holding — it is not a suitable choice for a single overnight stop where reliable holding is needed right away.',
      },
      {
        id: 'c',
        text: 'Any anchor at all, since bottom type makes no real difference',
        whyWrong:
          'Bottom type is one of the biggest factors in anchor performance — matching anchor type to bottom is a core anchoring skill, not an afterthought.',
      },
      {
        id: 'd',
        text: 'No anchor will hold in mud, so you should not anchor there',
        whyWrong:
          'Soft mud is actually one of the best-holding bottom types for anchors designed to dig and bury, such as fluke and plow types.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Soft mud favors anchors designed to bury deeply under load, such as Danforth-style fluke anchors and plow-type anchors like the CQR — both dig in and hold strongly in mud and sand. Matching your anchor type to the charted or observed bottom character is one of the most important anchoring decisions you make.',
    source: 'ASA 103 anchoring fundamentals — matching anchor type to bottom',
  },
  {
    id: 'anchor-selection-wind-protection',
    topic: 'anchoring',
    format: 'visual',
    assetId: 'custom-anchorage-selection',
    prompt:
      'In this bay, the wind is blowing from the top of the chart. Spot A sits in the open near the bay mouth, fully exposed to the wind and fetch; Spot B is tucked in the lee of a point of land. Given the forecast wind, which spot is the better anchorage choice, and why?',
    choices: [
      {
        id: 'd',
        text: 'Spot A, because it is closer to the bay mouth for a faster departure',
        whyWrong:
          'Convenience of departure is a minor factor compared to actually being protected from wind and wave action overnight.',
      },
      {
        id: 'a',
        text: 'Spot B, because the point of land blocks the wind and the fetch (wave-building distance) is much shorter there, giving a calmer, more protected anchorage',
      },
      {
        id: 'b',
        text: 'Spot A, because open water always gives a boat more swinging room',
        whyWrong:
          'Swinging room matters, but not at the cost of full exposure to wind and building seas — protection from the elements is generally the higher priority in choosing an anchorage.',
      },
      {
        id: 'c',
        text: 'They are equally good since both are inside the same bay',
        whyWrong:
          'Being in the same general bay does not mean equal protection — local shelter from a point of land makes a substantial difference in wind and sea conditions.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Choosing an anchorage starts with protection from the prevailing and forecast wind and sea. A spot tucked behind a point of land (Spot B) benefits from a wind shadow and a much shorter fetch for wave-building, producing calmer conditions than an exposed spot near the open bay mouth (Spot A), even though both lie within the same general bay.',
    source: 'ASA 103 anchoring fundamentals — anchorage selection',
  },
  {
    id: 'anchor-selection-swing-room',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'Before dropping anchor, why must you consider how much other traffic and moored boats surround your intended spot, not just the spot itself?',
    choices: [
      {
        id: 'b',
        text: 'Other boats will always move out of your way automatically',
        whyWrong:
          'You cannot assume other vessels will relocate for you — the responsibility to leave adequate swinging room is yours when you choose where to anchor.',
      },
      {
        id: 'c',
        text: 'It only matters in commercial harbors, not recreational anchorages',
        whyWrong:
          'Swing-room conflicts are just as real, and just as important to avoid, in a quiet recreational anchorage as in a commercial harbor.',
      },
      {
        id: 'd',
        text: 'Swing room is irrelevant if your anchor is heavy enough',
        whyWrong:
          'Anchor weight affects holding power, not the geometry of how far your boat will swing on its rode — even a very heavy anchor does not reduce a boat\'s swing circle.',
      },
      {
        id: 'a',
        text: 'Your boat will swing around its anchor through a full circle as wind and current shift, so you need enough clear room for that entire swing circle without touching other boats, shoals, or the shore',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A boat at anchor does not stay in one fixed spot — it swings through an arc (up to a full circle) around its anchor as wind and current change. Before anchoring, check that your full swing circle, and those of any nearby anchored boats, will not overlap each other, run aground, or foul a hazard.',
    source: 'ASA 103 anchoring fundamentals — anchorage selection',
  },
  {
    id: 'anchor-selection-bottom-type',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'Two otherwise similar spots are available in a cove: one is charted with a "rky" (rocky) bottom, the other with an "M" (mud) bottom. All else being equal, which should you prefer for anchoring, and why?',
    choices: [
      {
        id: 'a',
        text: 'The mud-bottomed spot, since mud generally allows an anchor to dig in and hold well, while a rocky bottom often gives poor, unreliable holding and risks fouling or damaging the anchor',
      },
      {
        id: 'b',
        text: 'The rocky-bottomed spot, since rock is always the strongest possible holding ground',
        whyWrong:
          'Rock is usually one of the least reliable bottom types for anchoring — most anchor designs cannot dig into solid rock, and hooking under a rock ledge risks a fouled or lost anchor.',
      },
      {
        id: 'c',
        text: 'It makes no difference which bottom type you choose',
        whyWrong:
          'Bottom character is one of the primary factors determining whether your anchor will actually hold — it is far from irrelevant.',
      },
      {
        id: 'd',
        text: 'Neither is usable and you must anchor somewhere else entirely',
        whyWrong:
          'A mud bottom is a perfectly good, commonly preferred anchoring bottom — there is no reason to rule out the whole cove.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Bottom character (shown on charts with letter abbreviations like S, M, Cl, rky, Wd) is a primary factor in anchor selection. Mud and sand generally offer good, reliable holding as an anchor digs in and buries; rocky bottoms are often unreliable, may prevent an anchor from setting at all, and risk snagging or damaging the anchor when you try to retrieve it.',
    source: 'ASA 103 anchoring fundamentals — anchorage selection',
  },
  {
    id: 'anchor-selection-hazards-nearby',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'While scouting an anchorage, you notice a charted submerged wreck symbol just inside where your swing circle would reach. What should this change about your plan?',
    choices: [
      {
        id: 'd',
        text: 'Only worry about it if the wreck is marked with a light',
        whyWrong:
          'An unlit, submerged hazard is still a real danger to an anchored or swinging boat; the presence or absence of a light does not change the underlying risk.',
      },
      {
        id: 'a',
        text: 'Either move to a spot where the wreck (and your full swing circle) stays well clear, or shorten scope and reposition so the wreck cannot be reached even at the extremes of the swing',
      },
      {
        id: 'b',
        text: 'Ignore it, since submerged hazards cannot affect an anchored boat',
        whyWrong:
          'A submerged hazard well within your swing circle can still be struck by your keel, rudder, or rode as the boat swings and the tide changes — it should not be dismissed.',
      },
      {
        id: 'c',
        text: 'Anchor directly on top of the wreck for extra holding',
        whyWrong:
          'Deliberately anchoring on or near a wreck risks fouling your anchor or rode on the wreckage and possibly damaging your hull — it is a hazard to avoid, not a holding feature to exploit.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Any charted hazard that falls within your vessel\'s full swing circle — not just directly under your intended anchor spot — is a real risk, since the boat (and its rode, keel, or rudder) can reach that hazard as it swings with wind, current, and tide. Reposition your anchorage, or reduce/adjust scope, so that hazards stay clear of the whole swing circle, not just your resting position.',
    source: 'ASA 103 anchoring fundamentals — anchorage selection',
  },
  {
    id: 'anchor-selection-other-vessels',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'You arrive at an anchorage that already has several boats anchored. What is the seamanlike way to choose where to drop your own anchor?',
    choices: [
      {
        id: 'b',
        text: 'Anchor as close as possible to another boat for safety in numbers',
        whyWrong:
          'Anchoring too close to another boat risks the two swing circles overlapping and the boats colliding as wind or current shifts — proximity is a hazard here, not a safety benefit.',
      },
      {
        id: 'c',
        text: 'Anchor wherever is most convenient and let other boats adjust afterward',
        whyWrong:
          'The responsibility falls on the boat arriving later to find a spot that respects boats already anchored, not the reverse.',
      },
      {
        id: 'd',
        text: 'It does not matter, since all anchored boats swing in exactly the same way regardless of rode length or windage',
        whyWrong:
          'Different boats can have different rode lengths, scope, and windage, so their swing circles are not guaranteed to match — you must actually assess the situation rather than assume uniform swinging.',
      },
      {
        id: 'a',
        text: 'Observe how the existing boats are lying (which shows the prevailing wind/current effect and each boat\'s likely swing), then choose a spot with enough clearance that your swing circle will not overlap theirs',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Before anchoring among other boats, watch how they are currently lying to the wind or current — that shows you the likely swing pattern. Choose a spot with enough separation that your boat\'s swing circle, given your own scope and rode, will not overlap a neighboring boat\'s even if conditions shift.',
    source: 'ASA 103 anchoring fundamentals — anchorage selection',
  },
  {
    id: 'anchor-scope-defn',
    topic: 'anchoring',
    format: 'visual',
    assetId: 'custom-scope-geometry',
    prompt:
      'In this side-view diagram, a boat is anchored with the depth of water (D) and the height of the bow above the water (H) both marked, along with the length of rode (L) running down to the anchor. How is anchor "scope" defined?',
    choices: [
      {
        id: 'c',
        text: 'Scope = the depth of water alone, with no reference to rode length',
        whyWrong:
          'Scope specifically compares rode length to depth (plus bow height) — depth alone is not scope.',
      },
      {
        id: 'd',
        text: 'Scope = the weight of the anchor divided by the weight of the boat',
        whyWrong:
          'Scope is a ratio of rode length to water depth (plus freeboard), not a ratio of weights.',
      },
      {
        id: 'a',
        text: 'Scope = the length of rode paid out, divided by the total vertical distance from the bow chock down to the seabed (depth plus bow height above the water)',
      },
      {
        id: 'b',
        text: 'Scope = the length of rode paid out, divided by the boat\'s overall length',
        whyWrong:
          'Scope is defined relative to the vertical distance from the bow to the bottom (depth plus bow height), not relative to the boat\'s length.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Scope is expressed as a ratio: rode length (L) divided by the total vertical distance from where the rode leaves the bow down to the bottom — that is, water depth (D) plus the height of the bow above the water (H). A 7:1 scope means the rode paid out is seven times that total vertical distance.',
    source: 'ASA 103 anchoring fundamentals — scope',
  },
  {
    id: 'anchor-scope-calc-basic',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'You are anchoring in 10 feet of water, and your bow is 2 feet above the water. Using a scope of 7:1, how much rode should you pay out?',
    choices: [
      {
        id: 'b',
        text: '70 feet (7 × 10, ignoring bow height)',
        whyWrong:
          'Scope is measured from the total vertical distance including bow height, not depth alone — leaving out the 2 feet of freeboard understates the correct rode length.',
      },
      {
        id: 'c',
        text: '12 feet (just the depth plus bow height, with no scope multiplier applied)',
        whyWrong:
          'That is only the vertical distance (D + H); it has not been multiplied by the 7:1 scope ratio at all.',
      },
      {
        id: 'd',
        text: '120 feet (12 × 10, mixing up the numbers)',
        whyWrong:
          'That does not correspond to the correct multiplication of the 7:1 ratio by the vertical distance of 12 feet — the correct rode length is 7 × 12 = 84 feet.',
      },
      {
        id: 'a',
        text: '84 feet (7 × (10 + 2))',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Total vertical distance = depth + bow height = 10 + 2 = 12 feet. At 7:1 scope, rode length = 7 × 12 = 84 feet. Always include the height of the bow above the water, not just the depth, when calculating scope.',
    source: 'ASA 103 anchoring fundamentals — scope calculation',
  },
  {
    id: 'anchor-scope-calc-storm',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'Forecast conditions are worsening, so you decide to increase your scope to 10:1 for extra holding power. You are anchored in 15 feet of water with a bow height of 3 feet. How much rode should be out at 10:1 scope?',
    choices: [
      {
        id: 'c',
        text: '18 feet (just the vertical distance, with no scope multiplier)',
        whyWrong:
          'That is only the depth plus bow height (18 ft); it still needs to be multiplied by the 10:1 scope ratio to get the rode length.',
      },
      {
        id: 'd',
        text: '30 feet (10 × 3, using only the bow height)',
        whyWrong:
          'That uses only the bow height and ignores the water depth entirely — the vertical distance must include both depth and bow height.',
      },
      {
        id: 'a',
        text: '180 feet (10 × (15 + 3))',
      },
      {
        id: 'b',
        text: '150 feet (10 × 15, ignoring bow height)',
        whyWrong:
          'Leaving out the 3 feet of bow height understates the vertical distance — the correct total is 15 + 3 = 18 feet, times 10, equals 180 feet.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Total vertical distance = 15 + 3 = 18 feet. At 10:1 scope for storm conditions, rode length = 10 × 18 = 180 feet. Higher scope ratios like 10:1 flatten the angle of pull on the anchor, meaningfully improving holding power when heavy weather is expected — but they also require considerably more swinging room.',
    source: 'ASA 103 anchoring fundamentals — scope calculation',
  },
  {
    id: 'anchor-scope-more-scope-effect',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'Why does increasing scope (paying out more rode relative to depth) generally improve an anchor\'s holding power?',
    choices: [
      {
        id: 'a',
        text: 'More scope flattens the angle at which the rode pulls on the anchor, keeping the pull closer to horizontal — most anchors are designed to dig in under a horizontal load and can be pulled up and out by a steep, vertical-ish pull',
      },
      {
        id: 'b',
        text: 'More scope makes the anchor physically heavier',
        whyWrong:
          'Paying out more rode does not add weight to the anchor itself — the benefit comes from the geometry of the pull angle, not added mass.',
      },
      {
        id: 'c',
        text: 'More scope has no effect on holding power, only on swinging room',
        whyWrong:
          'The angle of pull directly affects whether an anchor stays dug in or breaks free, so scope has a real, direct effect on holding power, not just on how far the boat swings.',
      },
      {
        id: 'd',
        text: 'More scope reduces the strength required in the rode material',
        whyWrong:
          'Scope does not change what rode strength is needed for the loads involved; it changes the anchor\'s working angle and resulting holding power.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Anchors are designed to dig into the bottom under a low, near-horizontal angle of pull. As scope increases, the rode approaches the bottom at a shallower angle, keeping the pull on the anchor closer to horizontal and helping it stay buried. Too little scope creates a steep angle that can break the anchor out of the bottom, especially under load from wind, waves, or current.',
    source: 'ASA 103 anchoring fundamentals — scope and holding power',
  },
  {
    id: 'anchor-scope-less-swing-tradeoff',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'A crowded anchorage forces you to use less scope than you would prefer, to keep your swing circle from overlapping other boats. What is the tradeoff you are accepting by shortening scope?',
    choices: [
      {
        id: 'b',
        text: 'Less scope has no downside at all — it is always better to use the shortest scope possible',
        whyWrong:
          'Reduced scope comes at a real cost to holding power by steepening the pull angle on the anchor, so it is not a downside-free choice.',
      },
      {
        id: 'c',
        text: 'Less scope increases holding power while also reducing swing room',
        whyWrong:
          'Reducing scope generally decreases, not increases, holding power, even though it does shrink the swing circle.',
      },
      {
        id: 'd',
        text: 'Scope length has no relationship to swing-circle size',
        whyWrong:
          'Swing-circle radius is directly tied to how much rode is out — shorter scope produces a smaller swing circle, which is exactly why crowded anchorages often force shorter scope.',
      },
      {
        id: 'a',
        text: 'Less scope reduces your swing circle and helps you fit into a tight anchorage, but it also steepens the angle of pull on the anchor and generally reduces its holding power',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Scope length is a real tradeoff: shorter scope produces a smaller swing circle, letting more boats fit into a crowded anchorage, but it also steepens the rode\'s angle of pull on the anchor, which typically reduces holding power. If you must shorten scope in a crowded anchorage, consider it a compromise that calls for extra vigilance, not a free choice.',
    source: 'ASA 103 anchoring fundamentals — scope and holding power',
  },
  {
    id: 'anchor-scope-tide-rise-adjust',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'You anchor at low tide in 8 feet of water with a scope of 7:1, but the tide in your area rises 4 feet to high tide. What should you account for when setting your scope?',
    choices: [
      {
        id: 'c',
        text: 'Tide has no effect on scope, only on how far you can see the bottom',
        whyWrong:
          'Tide directly changes the water depth, which is the core variable scope is calculated from — it very much affects your effective scope.',
      },
      {
        id: 'd',
        text: 'You should always assume the tide will fall, never rise, when anchoring',
        whyWrong:
          'Tides both rise and fall over a tidal cycle; assuming only a fall would leave you unprepared for a rising tide reducing your scope, as in this scenario.',
      },
      {
        id: 'a',
        text: 'The scope ratio should be based on the depth expected at high tide (not just the depth when you anchored), since the same rode length gives a lower scope ratio as the water deepens',
      },
      {
        id: 'b',
        text: 'Nothing — scope only needs to be calculated once, at whatever depth you happen to anchor in',
        whyWrong:
          'If you only account for the depth at the moment of anchoring, rising tide will silently reduce your effective scope and holding power exactly when you are not watching — the smart approach is to plan for the depth you will actually see.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'As tide rises, the same length of rode covers a smaller and smaller multiple of the (now greater) depth — your effective scope shrinks even though you have not touched the rode. Prudent anchoring accounts for the full tidal range expected during your stay, calculating scope against the anticipated high-tide depth (or paying out more rode as the tide rises) so your holding power does not quietly degrade overnight.',
    source: 'ASA 103 anchoring fundamentals — scope and tidal range',
  },
  {
    id: 'anchor-scope-minimum-recommended',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'As a general guideline for recreational anchoring in settled conditions with adequate swinging room, what scope ratio is commonly recommended, and how does that change for storm conditions?',
    choices: [
      {
        id: 'a',
        text: 'About 5:1 to 7:1 for normal, settled conditions, increasing to as much as 10:1 or more when heavy weather is expected',
      },
      {
        id: 'b',
        text: 'A flat 1:1 ratio in all conditions',
        whyWrong:
          'A 1:1 scope would pull almost straight up on the anchor, which is far too steep an angle for most anchors to hold at all.',
      },
      {
        id: 'c',
        text: 'Scope should always be exactly equal to the length of the boat, regardless of depth or conditions',
        whyWrong:
          'Scope is defined relative to water depth plus bow height, not to the boat\'s own length, and the appropriate ratio does not stay fixed as conditions change.',
      },
      {
        id: 'd',
        text: 'More scope is never beneficial once you exceed 3:1',
        whyWrong:
          'Increasing scope well beyond 3:1, especially toward 7:1–10:1, is exactly what improves holding power and is the standard recommendation, particularly as weather worsens.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A commonly taught rule of thumb is 5:1 to 7:1 scope for normal overnight anchoring with room to swing, increasing to 10:1 (or more, if conditions allow) when stronger wind and sea are expected, since more scope flattens the pull angle and adds holding power exactly when it is needed most.',
    source: 'ASA 103 anchoring fundamentals — recommended scope ratios',
  },
  {
    id: 'anchor-setting-procedure',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'What is the recommended procedure for setting an anchor, once you have chosen your spot and let out the correct scope?',
    choices: [
      {
        id: 'd',
        text: 'Motor forward over the anchor immediately after dropping it',
        whyWrong:
          'Motoring forward over your own anchor and rode risks fouling the rode in the propeller or dragging the anchor before it can dig in — the correct motion is backing away to lay out and set the rode.',
      },
      {
        id: 'a',
        text: 'Snub the rode and back down slowly and steadily under light-to-moderate reverse power, letting the anchor dig in gradually, while watching for signs it is holding (the bow settling head-to-wind/current, no further drift)',
      },
      {
        id: 'b',
        text: 'Drop the anchor and immediately gun the engine hard in reverse',
        whyWrong:
          'Applying full power immediately can rip a freshly dropped anchor out before it has had a chance to dig in — a gradual, building load is the standard approach.',
      },
      {
        id: 'c',
        text: 'Never use engine power to set an anchor; rely on wind alone',
        whyWrong:
          'Backing down under gentle engine power is a standard, reliable way to confirm the anchor has actually set, rather than hoping wind alone will do it.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'After lowering the anchor and paying out the planned scope, snub the rode (take a strain on it) and back down slowly under light, then gradually increasing, reverse power. This lets the anchor dig in progressively. Watch for the bow to settle and hold steady, and check that you are not still dragging, before considering the anchor set.',
    source: 'ASA 103 anchoring fundamentals — setting the anchor',
  },
  {
    id: 'anchor-setting-reverse-slowly',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'Why is it important to increase reverse power gradually, rather than all at once, while setting an anchor?',
    choices: [
      {
        id: 'c',
        text: 'Sudden hard reverse power is actually the preferred, faster way to set an anchor',
        whyWrong:
          'A sudden hard pull is more likely to break a freshly set anchor out of the bottom than to seat it — gradual, building power is the standard, more reliable technique.',
      },
      {
        id: 'd',
        text: 'Engine power has no effect on how well an anchor sets',
        whyWrong:
          'Backing down under power is specifically how you set and test an anchor\'s hold — engine use is central to the technique, not irrelevant to it.',
      },
      {
        id: 'a',
        text: 'A gradual, building load lets the anchor dig progressively deeper into the bottom, whereas a sudden hard jerk can pull it out before it has buried, or shock-load and damage ground tackle',
      },
      {
        id: 'b',
        text: 'Gradual power saves fuel, which is the only reason for doing it this way',
        whyWrong:
          'Fuel economy is a minor side benefit at best — the real reason is giving the anchor a controlled, building load so it can dig in properly rather than being yanked loose.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A gradual increase in reverse power lets the anchor bury progressively deeper as tension builds smoothly. A sudden, hard jerk can instead pull a not-yet-buried anchor straight out of the bottom, or shock-load the rode, chain, and deck hardware — increasing the risk of gear failure or a dragged anchor.',
    source: 'ASA 103 anchoring fundamentals — setting the anchor',
  },
  {
    id: 'anchor-retrieving-procedure',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'What is the recommended technique for retrieving (weighing) anchor, especially on a boat without a powered windlass?',
    choices: [
      {
        id: 'a',
        text: 'Motor slowly forward toward the anchor as crew takes in the slack rode, keeping the rode roughly vertical (straight up and down) by the time it is time to break the anchor out of the bottom',
      },
      {
        id: 'b',
        text: 'Reverse away from the anchor while pulling the rode in by hand',
        whyWrong:
          'Motoring away from the anchor while hauling in the rode fights the boat\'s own propulsion against the crew, making the task far harder and risking snapping a taut rode.',
      },
      {
        id: 'c',
        text: 'Break the anchor out of the bottom first, then motor toward it afterward',
        whyWrong:
          'Trying to break the anchor free from a distance, before the rode is vertical, puts enormous strain on the rode and ground tackle and is far less effective than shortening scope first.',
      },
      {
        id: 'd',
        text: 'Simply drift with the current until the anchor eventually comes free on its own',
        whyWrong:
          'Passively drifting does not reliably break an anchor out and offers the crew no control over the boat\'s position, especially in traffic or tight quarters.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'The standard technique is to motor slowly toward the anchor as crew hauls in the slack rode, shortening scope progressively. By the time the rode is nearly vertical (straight up and down), the anchor can be broken out of the bottom with the boat\'s own way and a short, vertical pull, rather than muscling it out against a long, low-angle scope.',
    source: 'ASA 103 anchoring fundamentals — retrieving the anchor',
  },
  {
    id: 'anchor-dragging-signs',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'What are reliable ways to detect that your anchor is dragging, especially overnight?',
    choices: [
      {
        id: 'c',
        text: 'Dragging cannot be detected until the boat actually runs aground',
        whyWrong:
          'Careful position monitoring (GPS alarms, visual bearings/ranges) is specifically designed to catch dragging well before you are in danger of grounding.',
      },
      {
        id: 'd',
        text: 'Only worry about dragging if you can feel the boat moving underfoot',
        whyWrong:
          'Slow dragging is often imperceptible by feel alone, especially at night or while asleep — that is why instrumented and visual position checks are recommended rather than relying on feel.',
      },
      {
        id: 'a',
        text: 'Set a GPS anchor-drag alarm, and periodically check bearings or ranges on two or more fixed shore objects — if they change beyond your expected swing, you are dragging',
      },
      {
        id: 'b',
        text: 'Trust that a properly set anchor can never drag once it has held for a few minutes',
        whyWrong:
          'No anchor set is guaranteed permanent — wind shifts, gusts, and changing loads can break even a well-set anchor free hours later, which is exactly why ongoing monitoring matters.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A GPS-based anchor alarm (built into a chartplotter or a phone app) will sound if the boat moves outside a set radius. As a backup, periodically take bearings or ranges on two or more fixed objects ashore; if those bearings change beyond what your normal swing would explain, your anchor is dragging and needs attention.',
    source: 'ASA 103 anchoring fundamentals — detecting a dragging anchor',
  },
  {
    id: 'anchor-swing-circle-radius',
    topic: 'anchoring',
    format: 'visual',
    assetId: 'custom-swing-circle',
    prompt:
      'In this diagram, the dashed circle represents your boat\'s full swing radius around the anchor. A neighboring boat lies within that circle, and a charted rock lies just outside it. What does this picture tell you about your anchoring choice?',
    choices: [
      {
        id: 'b',
        text: 'Everything shown is perfectly safe as long as the anchor itself is holding well',
        whyWrong:
          'Even with a well-set, non-dragging anchor, your boat will still swing through its full circle with wind and current shifts — a neighboring boat within that circle remains a real collision risk regardless of how well the anchor holds.',
      },
      {
        id: 'c',
        text: 'The charted rock is the only hazard to worry about, since it is drawn nearest the shore',
        whyWrong:
          'The rock lies outside your swing circle and is not currently a threat; the neighboring boat inside your swing circle is the more pressing problem shown here.',
      },
      {
        id: 'd',
        text: 'Swing circles are a theoretical concept that do not need to be checked in practice',
        whyWrong:
          'Swing circles are a very practical, everyday planning tool — this exact scenario, a boat encroaching on your swing radius, is precisely the kind of real conflict checking your swing circle is meant to catch.',
      },
      {
        id: 'a',
        text: 'Your swing circle currently reaches the neighboring boat, which is too close for safety — you should re-anchor with less scope, move to a different spot, or otherwise increase the separation',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Your swing circle — the full radius your boat can sweep around its anchor as wind and current change — is the real "footprint" of your anchoring choice, not just your resting position. A neighboring boat that falls within that circle is a genuine collision risk once conditions shift, even though the charted rock outside the circle is not currently a threat. The fix is to increase separation: re-anchor elsewhere, or adjust scope.',
    source: 'ASA 103 anchoring fundamentals — swing circle',
  },
  {
    id: 'anchor-mooring-vs-anchoring',
    topic: 'anchoring',
    format: 'text',
    prompt:
      'How does picking up a permanent mooring differ from anchoring your own boat, in terms of the ground tackle involved?',
    choices: [
      {
        id: 'd',
        text: 'A mooring pendant is attached directly to your anchor rode',
        whyWrong:
          'A mooring pendant attaches to the boat\'s bow cleat or bow chock, not to your own separate ground tackle — picking up a mooring means you are not deploying your anchor and rode at all.',
      },
      {
        id: 'a',
        text: 'A permanent mooring uses heavy, purpose-built ground tackle — often a large mushroom anchor or a heavy sinker, chain, and a mooring buoy/pendant — left in place long-term, rather than the lighter working anchor and rode you carry and set yourself',
      },
      {
        id: 'b',
        text: 'A mooring and an anchor are exactly the same piece of equipment, just with different names',
        whyWrong:
          'A permanent mooring\'s ground tackle (often a mushroom anchor or heavy sinker, sized and buried for long-term use) is a different arrangement from the anchor and rode you carry aboard and personally set and retrieve each time.',
      },
      {
        id: 'c',
        text: 'Moorings never need to be inspected once installed',
        whyWrong:
          'Mooring tackle is subject to wear, chafe, and corrosion over time and needs periodic inspection and maintenance, just as your own ground tackle does.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A permanent mooring relies on heavy, long-term ground tackle — commonly a large mushroom anchor or concrete/heavy sinker with chain, rated for years of continuous holding — connected to a surface buoy with a pendant you pick up and cleat off. This is different equipment and a different arrangement from the anchor and rode you carry aboard, set, and retrieve on your own each time you anchor.',
    source: 'ASA 103 anchoring fundamentals — moorings vs. anchoring',
  },
// ---------------------------------------------------------------------------
// Arc 4A: Cruising Boat Terminology & Systems (topic: cruising-systems)
// ---------------------------------------------------------------------------
{
  id: 'sys-turnbuckle-id',
  topic: 'cruising-systems',
  concepts: ['deck-hardware-and-rigging-attachments'],
  format: 'visual',
  assetId: 'photo-turnbuckle',
  prompt: "What is the fitting shown between the wire shroud and the chainplate, and what is its purpose?",
  choices: [
    { id: 'c', text: "A cleat — it lets you make a line fast", whyWrong: "A cleat secures a line by wrapping, not by threaded adjustment of a standing-rigging wire." },
    { id: 'd', text: "A fairlead — it changes the angle of a line without adding friction", whyWrong: "A fairlead redirects a line's lead; it doesn't tension standing rigging." },
    { id: 'a', text: "A turnbuckle — it lets you adjust and set the tension in the standing rigging" },
    { id: 'b', text: "A winch — it lets you haul in a sheet under load", whyWrong: "A winch is a rotating drum used to trim lines under load; it isn't an inline threaded rigging fitting." },
  ],
  correctChoiceId: 'a',
  explanation: "A turnbuckle (bottlescrew) threads onto the lower end of a shroud or stay and onto a chainplate. Rotating the barrel body draws the two threaded studs together or apart, letting you tighten or slacken that piece of standing rigging to tune the mast.",
  source: 'ASA 103 standard curriculum — standing rigging and deck hardware',
},
{
  id: 'sys-turnbuckle-function',
  topic: 'cruising-systems',
  concepts: ['deck-hardware-and-rigging-attachments'],
  format: 'text',
  prompt: "Before a passage, you notice a turnbuckle on a lower shroud is only finger-tight and the shroud has visible slack. What is the main concern?",
  choices: [
    { id: 'a', text: "The mast may lose adequate lateral support and the rig could be damaged or come down under load" },
    { id: 'b', text: "The sail on that side will not be able to be reefed", whyWrong: "Reefing systems operate independently of shroud tension; this isn't the primary risk." },
    { id: 'c', text: "The boat will steer poorly to that side", whyWrong: "Shroud tension affects rig support, not steering response." },
    { id: 'd', text: "It only affects the boat's compass heading accuracy", whyWrong: "Rigging tension has no effect on compass accuracy." },
  ],
  correctChoiceId: 'a',
  explanation: "Shrouds hold the mast up sideways. A loose turnbuckle means that shroud isn't doing its job, so the mast can pump or flex excessively and, under load (a gust, a tack), the rig can be overstressed or come down. Slack rigging should be tensioned (or the boat should not sail hard) until it can be properly tuned.",
  source: 'ASA 103 standard curriculum — rig inspection and standing rigging',
},
{
  id: 'sys-chainplate-id',
  topic: 'cruising-systems',
  concepts: ['deck-hardware-and-rigging-attachments'],
  format: 'visual',
  assetId: 'photo-chainplate',
  prompt: "What is the metal fitting shown bolted through the deck/hull, and what does it do?",
  choices: [
    { id: 'b', text: "A stanchion base — it supports the lifelines", whyWrong: "A stanchion base is a separate deck fitting for the lifeline system, mounted differently and not carrying rig loads." },
    { id: 'c', text: "A cleat — it secures a dock line", whyWrong: "A cleat is used for belaying lines, not for carrying standing rigging loads." },
    { id: 'd', text: "A through-hull fitting — it lets water in for a raw-water system", whyWrong: "Through-hulls penetrate the hull below the waterline for plumbing; this fitting is a structural rigging anchor." },
    { id: 'a', text: "A chainplate — it anchors a shroud or stay to the hull to support the mast" },
  ],
  correctChoiceId: 'a',
  explanation: "A chainplate is a strong metal plate through-bolted to the hull or deck structure. A turnbuckle connects the shroud or stay to it, transferring the rig's loads into the hull. Chainplates and their bedding are a common area to inspect for leaks and corrosion.",
  source: 'ASA 103 standard curriculum — standing rigging and deck hardware',
},
{
  id: 'sys-chainplate-function',
  topic: 'cruising-systems',
  concepts: ['deck-hardware-and-rigging-attachments'],
  format: 'text',
  prompt: "Why do surveyors and owners pay close attention to chainplates and the area around them?",
  choices: [
    { id: 'c', text: "They regulate engine cooling water flow", whyWrong: "Chainplates have nothing to do with the engine's cooling system." },
    { id: 'd', text: "They are purely decorative trim pieces", whyWrong: "Chainplates are structural, load-bearing fittings, not decoration." },
    { id: 'a', text: "They carry the full load of the standing rigging into the hull, and leaks around them can cause hidden structural damage" },
    { id: 'b', text: "They control the boat's electrical grounding system", whyWrong: "Chainplates are structural rig fittings, not part of the electrical grounding/bonding system." },
  ],
  correctChoiceId: 'a',
  explanation: "Chainplates carry the entire tension of the standing rigging into the hull structure. Because they penetrate the deck, water intrusion around a poorly bedded chainplate can rot core material or corrode the plate itself over time, weakening a highly loaded structural point.",
  source: 'ASA 103 standard curriculum — hull and deck systems',
},
{
  id: 'sys-stemhead-id',
  topic: 'cruising-systems',
  concepts: ['deck-hardware-and-rigging-attachments'],
  format: 'visual',
  assetId: 'custom-stemhead-bow-roller',
  prompt: "What is the fitting at the very top of the bow called, and what is its purpose?",
  choices: [
    { id: 'c', text: "The transom — it is the flat surface at the back of the boat", whyWrong: "The transom is the aft-most part of the hull, opposite the bow." },
    { id: 'd', text: "The binnacle — it houses the steering compass", whyWrong: "A binnacle is a cockpit fitting for the compass, unrelated to the bow." },
    { id: 'a', text: "The stemhead fitting with a bow roller — it supports the headstay and lets the anchor rode run smoothly over the bow" },
    { id: 'b', text: "The rudder post — it transfers helm input to the rudder blade", whyWrong: "The rudder post is at the stern, not the bow, and steers the boat." },
  ],
  correctChoiceId: 'a',
  explanation: "The stemhead fitting caps the top of the bow, typically anchoring the headstay and providing a bow roller so the anchor and its rode can be deployed and retrieved without chafing on the hull.",
  source: 'ASA 103 standard curriculum — deck hardware and ground tackle',
},
{
  id: 'sys-rudder-post-location',
  topic: 'cruising-systems',
  concepts: ['steering-systems'],
  format: 'text',
  prompt: "Where would you find a boat's rudder post, and what does it do?",
  choices: [
    { id: 'b', text: "It runs from the bow to support the headstay", whyWrong: "That describes the stemhead fitting/forestay, not the rudder post." },
    { id: 'c', text: "It is located inside the keel and carries no steering load", whyWrong: "The rudder post is a load-bearing steering shaft, not an inert keel component." },
    { id: 'd', text: "It connects the engine to the propeller shaft", whyWrong: "That connection is the propeller shaft/coupling, a separate system from the rudder." },
    { id: 'a', text: "It runs up from the rudder blade through the hull near the stern, transmitting steering input from the wheel or tiller to the rudder" },
  ],
  correctChoiceId: 'a',
  explanation: "The rudder post is the shaft that passes through the hull (usually near the stern) connecting the rudder blade below the waterline to the steering system (wheel or tiller) above. Its head is what an emergency tiller fits onto if normal steering fails.",
  source: 'ASA 103 standard curriculum — steering systems',
},
{
  id: 'sys-transom-defn',
  topic: 'cruising-systems',
  concepts: ['boat-anatomy-and-terms'],
  format: 'text',
  prompt: "What is the \"transom\" of a boat?",
  choices: [
    { id: 'd', text: "The horizontal bar the mainsail boom attaches to", whyWrong: "That is the gooseneck or boom, part of the rig, not the hull." },
    { id: 'a', text: "The flat or curved surface that forms the stern (back) of the hull" },
    { id: 'b', text: "The forward-most point of the bow", whyWrong: "That is the stem or bow, the opposite end of the boat." },
    { id: 'c', text: "The centerline structural member running the length of the keel", whyWrong: "That describes a keelson, an internal structural member, not the transom." },
  ],
  correctChoiceId: 'a',
  explanation: "The transom is the aft-most surface of the hull, closing off the stern. It's a common mounting point for the outboard motor bracket, swim ladder, and stern navigation light.",
  source: 'ASA 103 standard curriculum — hull terminology',
},
{
  id: 'sys-binnacle-compass-id',
  topic: 'cruising-systems',
  concepts: ['steering-systems'],
  format: 'visual',
  assetId: 'custom-binnacle-compass',
  prompt: "What is the pedestal-mounted assembly shown, and what instrument sits on top of it?",
  choices: [
    { id: 'b', text: "A windlass with a chain gypsy on top", whyWrong: "A windlass is a deck-mounted anchor-handling machine on the foredeck, not a cockpit steering pedestal." },
    { id: 'c', text: "A winch with a sheet lead on top", whyWrong: "A winch is used to trim lines under load and doesn't carry a compass." },
    { id: 'd', text: "An emergency tiller fitted over the rudder post", whyWrong: "An emergency tiller is a removable steering bar, not a fixed pedestal with a compass." },
    { id: 'a', text: "A binnacle supporting the steering wheel, with a magnetic compass mounted on top" },
  ],
  correctChoiceId: 'a',
  explanation: "A binnacle is the pedestal housing that supports the wheel and typically carries the boat's steering (magnetic) compass where the helmsman can see it, aligned with a lubber line that marks the boat's heading.",
  source: 'ASA 103 standard curriculum — steering station and compass',
},
{
  id: 'sys-compass-purpose',
  topic: 'cruising-systems',
  format: 'text',
  prompt: "What is the primary purpose of the steering compass at the helm?",
  choices: [
    { id: 'd', text: "To measure water depth under the keel", whyWrong: "Depth is measured by a depth sounder, not a compass." },
    { id: 'a', text: "To show the boat's magnetic heading so the helmsman can steer a course" },
    { id: 'b', text: "To measure boat speed through the water", whyWrong: "Speed is measured by a knotmeter/paddlewheel log, not a compass." },
    { id: 'c', text: "To measure wind speed and direction", whyWrong: "Wind instruments (anemometer/wind vane) measure that, not a compass." },
  ],
  correctChoiceId: 'a',
  explanation: "The steering compass shows magnetic heading via a card that stays aligned with magnetic north while the boat (and lubber line) rotates around it, letting the helmsman hold or change a course.",
  source: 'ASA 103 standard curriculum — piloting instruments',
},
{
  id: 'sys-compass-interference-note',
  topic: 'cruising-systems',
  format: 'text',
  prompt: "Why should you avoid stowing a handheld electronic device or metal tool right next to the steering compass?",
  choices: [
    { id: 'c', text: "It will void the boat's insurance", whyWrong: "Not a navigation/seamanship consideration; insurance is unrelated to compass placement." },
    { id: 'd', text: "It has no effect; compasses are unaffected by nearby objects", whyWrong: "Magnetic and ferrous materials near a compass are a well-known source of deviation error." },
    { id: 'a', text: "Nearby magnetic or ferrous items can deflect the compass and cause it to read an inaccurate heading (deviation)" },
    { id: 'b', text: "It will drain the compass's internal battery", whyWrong: "A simple magnetic steering compass has no battery to drain." },
  ],
  correctChoiceId: 'a',
  explanation: "A magnetic compass reacts to any nearby magnetic field or ferrous metal, producing deviation — an error specific to that heading and that item's placement. Keep phones, speakers, tools, and other magnetic items away from the compass.",
  source: 'ASA 103 standard curriculum — compass deviation',
},
{
  id: 'sys-cockpit-locker-use',
  topic: 'cruising-systems',
  concepts: ['cockpit-layout'],
  format: 'text',
  prompt: "What is a cockpit locker typically used for on a cruising sailboat?",
  choices: [
    { id: 'b', text: "Housing the boat's batteries exclusively", whyWrong: "Batteries are commonly in a dedicated compartment, not defined by the term 'cockpit locker.'" },
    { id: 'c', text: "Serving as the primary freshwater tank", whyWrong: "Freshwater tanks are separate, sealed tanks, not cockpit lockers." },
    { id: 'd', text: "Storing the mainsail when not hoisted", whyWrong: "Mainsails are typically flaked on the boom or stowed in a sail locker forward, not in a cockpit locker." },
    { id: 'a', text: "Stowing gear such as fenders, dock lines, the emergency tiller, and safety equipment, often with access to the lazarette or steering gear" },
  ],
  correctChoiceId: 'a',
  explanation: "Cockpit lockers are general stowage compartments built into the cockpit seating, commonly holding fenders, lines, safety gear, and tools, and on many boats providing access to the rudder post/steering gear for fitting an emergency tiller.",
  source: 'ASA 103 standard curriculum — deck layout and stowage',
},
{
  id: 'sys-emergency-tiller-id',
  topic: 'cruising-systems',
  concepts: ['steering-systems'],
  format: 'visual',
  assetId: 'custom-emergency-tiller',
  prompt: "What does the diagram show, and when would you use this arrangement?",
  choices: [
    { id: 'a', text: "An emergency tiller fitted onto the rudder post head — used to steer the boat if the wheel steering system fails" },
    { id: 'b', text: "A normal wheel steering pedestal used at all times", whyWrong: "This is specifically a backup fitting, not the primary wheel steering." },
    { id: 'c', text: "A boom vang used to control mainsail shape", whyWrong: "A boom vang controls the boom, unrelated to steering." },
    { id: 'd', text: "A winch handle used to trim a sheet", whyWrong: "A winch handle operates a winch drum, not the rudder." },
  ],
  correctChoiceId: 'a',
  explanation: "Most wheel-steered cruising boats carry an emergency tiller that fits directly onto the exposed head of the rudder post, usually accessed through a cockpit locker hatch. If a steering cable, quadrant, or wheel fails, the emergency tiller lets you keep steering the boat directly.",
  source: 'ASA 103 standard curriculum — steering failure procedures',
},
{
  id: 'sys-emergency-tiller-when',
  topic: 'cruising-systems',
  concepts: ['steering-systems'],
  format: 'text',
  prompt: "You are underway when the wheel suddenly turns freely with no response from the rudder. What is the appropriate immediate action?",
  choices: [
    { id: 'a', text: "Reduce speed, locate and rig the emergency tiller on the rudder post, and use it to steer while assessing the failure" },
    { id: 'b', text: "Increase throttle to maintain steerage regardless of the failure", whyWrong: "More speed with an uncontrolled rudder increases risk of a collision or grounding, not less." },
    { id: 'c', text: "Immediately abandon ship", whyWrong: "A steering failure is a serious but usually manageable problem, well short of a reason to abandon ship." },
    { id: 'd', text: "Ignore it — the boat will self-correct", whyWrong: "Loss of steering will not resolve itself and must be addressed directly." },
  ],
  correctChoiceId: 'a',
  explanation: "A wheel that spins freely usually means a broken or disconnected steering cable/quadrant. The prudent response is to slow down to reduce risk, access the rudder post (often via a cockpit locker), and fit the emergency tiller so you retain directive control of the boat.",
  source: 'ASA 103 standard curriculum — steering failure procedures',
},
{
  id: 'sys-companionway-defn',
  topic: 'cruising-systems',
  concepts: ['belowdecks-layout'],
  format: 'text',
  prompt: "What is the \"companionway\" on a sailboat?",
  choices: [
    { id: 'c', text: "The rail running along each side deck", whyWrong: "That describes the toe rail or lifelines, not the companionway." },
    { id: 'd', text: "The hinge connecting the boom to the mast", whyWrong: "That is the gooseneck fitting, part of the rig." },
    { id: 'a', text: "The steps and opening that lead from the cockpit down into the cabin" },
    { id: 'b', text: "A storage compartment forward of the mast", whyWrong: "That describes a sail or chain locker, not the companionway." },
  ],
  correctChoiceId: 'a',
  explanation: "The companionway is the main entry point between the cockpit and the cabin below, typically with steps (a \"companionway ladder\") and removable washboards or a hatch to close it off.",
  source: 'ASA 103 standard curriculum — cabin layout terminology',
},
{
  id: 'sys-saloon-location',
  topic: 'cruising-systems',
  concepts: ['belowdecks-layout'],
  format: 'visual',
  assetId: 'custom-cabin-layout',
  prompt: "In the cabin layout shown, which labeled space is the saloon, and what is it used for?",
  choices: [
    { id: 'd', text: "The steps up to the cockpit", whyWrong: "That is the companionway, the access point, not the saloon." },
    { id: 'a', text: "The amidships area with settees and a table — the main living/dining space belowdecks" },
    { id: 'b', text: "The forward triangular berth", whyWrong: "That labeled space is the V-berth, the forward sleeping area." },
    { id: 'c', text: "The galley area to starboard", whyWrong: "The galley is the boat's kitchen area, separate from the saloon." },
  ],
  correctChoiceId: 'a',
  explanation: "The saloon (or salon) is the main cabin — typically amidships, with settees along the sides and a table — used for dining, navigation, and general living space while aboard.",
  source: 'ASA 103 standard curriculum — cabin layout terminology',
},
{
  id: 'sys-galley-defn',
  topic: 'cruising-systems',
  concepts: ['belowdecks-layout'],
  format: 'text',
  prompt: "What is the \"galley\" on a cruising boat?",
  choices: [
    { id: 'b', text: "The boat's bathroom", whyWrong: "That is the \"head,\" a different compartment entirely." },
    { id: 'c', text: "The engine compartment", whyWrong: "That is the engine room/compartment, unrelated to cooking." },
    { id: 'd', text: "The forward sleeping berth", whyWrong: "That is the V-berth, a sleeping area, not the kitchen." },
    { id: 'a', text: "The boat's kitchen area, typically with a stove, sink, and food stowage" },
  ],
  correctChoiceId: 'a',
  explanation: "The galley is the cooking area aboard, generally fitted with a stove (often gimbaled to stay level while sailing), a sink, and stowage for food and cookware.",
  source: 'ASA 103 standard curriculum — cabin layout terminology',
},
{
  id: 'sys-vberth-location',
  topic: 'cruising-systems',
  concepts: ['belowdecks-layout'],
  format: 'visual',
  assetId: 'custom-cabin-layout',
  prompt: "Which labeled space in the cabin layout is the V-berth, and where is it located?",
  choices: [
    { id: 'd', text: "The galley counter to starboard", whyWrong: "The galley is the cooking area, a separate space from the V-berth." },
    { id: 'a', text: "The forward, wedge-shaped sleeping area in the bow, named for its V shape" },
    { id: 'b', text: "The settee area amidships", whyWrong: "That labeled space is the saloon, not the V-berth." },
    { id: 'c', text: "The aft cabin near the companionway", whyWrong: "This layout shows no separate aft cabin — the V-berth is specifically forward." },
  ],
  correctChoiceId: 'a',
  explanation: "The V-berth occupies the forward-most cabin, following the boat's narrowing bow shape — hence the \"V.\" It's usually the primary or largest sleeping berth on smaller cruising boats.",
  source: 'ASA 103 standard curriculum — cabin layout terminology',
},
{
  id: 'sys-bilge-defn',
  topic: 'cruising-systems',
  concepts: ['belowdecks-layout'],
  format: 'text',
  prompt: "What is the \"bilge\" of a boat?",
  choices: [
    { id: 'a', text: "The lowest point inside the hull where water collects" },
    { id: 'b', text: "The topmost point of the mast", whyWrong: "That is the masthead, the opposite extreme of the boat." },
    { id: 'c', text: "The area on deck where sheets are trimmed", whyWrong: "That describes the cockpit or winch area, not the bilge." },
    { id: 'd', text: "The outer edge of the hull at the waterline", whyWrong: "That's closer to describing the boot stripe/waterline, not the bilge." },
  ],
  correctChoiceId: 'a',
  explanation: "The bilge is the lowest interior space of the hull, below the cabin sole, where any water aboard (rain, spray, minor leaks) naturally drains and collects, which is why bilge pumps are installed there.",
  source: 'ASA 103 standard curriculum — hull and belowdecks systems',
},
{
  id: 'sys-bilge-pump-id',
  topic: 'cruising-systems',
  concepts: ['bilge-and-pumps'],
  format: 'visual',
  assetId: 'custom-bilge-pump',
  prompt: "The diagram shows two bilge pump systems. What is the purpose of having both an electric pump and a manual backup pump?",
  choices: [
    { id: 'a', text: "The electric pump handles routine water automatically, while the manual pump provides backup capacity if the battery, wiring, or electric pump fails" },
    { id: 'b', text: "The manual pump is only for filling the water tanks", whyWrong: "Manual bilge pumps evacuate bilge water; they are not connected to the freshwater tank system." },
    { id: 'c', text: "The electric pump is only used while docked", whyWrong: "The electric bilge pump, typically wired to a float switch, runs automatically any time water accumulates, underway or at the dock." },
    { id: 'd', text: "Having two pumps is purely redundant with no functional difference", whyWrong: "They serve complementary roles — automatic routine pumping versus manual backup — not an identical redundant function." },
  ],
  correctChoiceId: 'a',
  explanation: "An electric submersible bilge pump, usually triggered by a float switch, handles ordinary water intrusion automatically. Because electrical failures or a dead battery can disable it, most cruising boats also carry a manual (diaphragm) pump operable from the cockpit as a backup, especially important if taking on water faster than expected.",
  source: 'ASA 103 standard curriculum — bilge and pumping systems',
},
{
  id: 'sys-bilge-pump-function',
  topic: 'cruising-systems',
  concepts: ['bilge-and-pumps'],
  format: 'text',
  prompt: "What is the primary purpose of a bilge pump?",
  choices: [
    { id: 'a', text: "To remove water that has accumulated in the bilge, keeping the boat from taking on excess water" },
    { id: 'b', text: "To pump fuel from the tank to the engine", whyWrong: "That's the function of the fuel system's lift pump, unrelated to bilge water." },
    { id: 'c', text: "To circulate raw water through the engine for cooling", whyWrong: "That's the raw-water cooling pump on the engine, a separate system." },
    { id: 'd', text: "To pressurize the freshwater system for the sink and shower", whyWrong: "That's the freshwater pressure pump, unrelated to bilge water removal." },
  ],
  correctChoiceId: 'a',
  explanation: "A bilge pump's job is simply to evacuate water that collects in the lowest part of the hull, whether from rain, spray, a minor leak, or a more serious ingress, keeping the boat afloat and dry belowdecks.",
  source: 'ASA 103 standard curriculum — bilge and pumping systems',
},
{
  id: 'sys-seacock-id',
  topic: 'cruising-systems',
  concepts: ['through-hulls-and-seacocks'],
  format: 'visual',
  assetId: 'custom-seacock-throughhull',
  prompt: "What do the fittings in this cross-section do, working from the outside of the hull inward?",
  choices: [
    { id: 'a', text: "A through-hull fitting penetrates the hull below the waterline, and the seacock is the valve just inside it that can shut off that opening" },
    { id: 'b', text: "The through-hull is a drain for rainwater on deck, unrelated to the seacock", whyWrong: "The through-hull shown penetrates the hull below the waterline for plumbing, not a deck rain drain." },
    { id: 'c', text: "The seacock pressurizes the hose to the sink", whyWrong: "A seacock is a shutoff valve, not a pressurizing device." },
    { id: 'd', text: "Both fittings are purely structural and carry no water", whyWrong: "These fittings exist specifically to allow (and control) water flow through the hull below the waterline." },
  ],
  correctChoiceId: 'a',
  explanation: "A through-hull fitting is a hole in the hull below the waterline, used for intake or drainage (engine cooling, sink/head drains, etc.). A seacock is the valve mounted directly on the through-hull, letting you shut off that opening completely from inside the boat.",
  source: 'ASA 103 standard curriculum — through-hull fittings and seacocks',
},
{
  id: 'sys-seacock-hose-failure-reasoning',
  topic: 'cruising-systems',
  concepts: ['through-hulls-and-seacocks'],
  format: 'text',
  prompt: "A hose attached to a through-hull fitting below the waterline bursts while underway. Why does it matter whether the seacock for that fitting was closed or open?",
  choices: [
    { id: 'c', text: "The seacock only affects water pressure, not flooding", whyWrong: "The seacock is a shutoff valve for the hull opening itself, not a pressure regulator." },
    { id: 'd', text: "Seacocks only matter when the boat is at the dock", whyWrong: "Seacocks matter at all times the through-hull is below the waterline, underway or docked." },
    { id: 'a', text: "If the seacock is closed, the hull opening is sealed off and the burst hose cannot flood the boat; if it's open, water floods in through the through-hull unchecked" },
    { id: 'b', text: "It makes no difference — water floods in at the same rate either way", whyWrong: "The seacock's whole purpose is to isolate the through-hull, so its position directly controls whether water can enter through a failed hose." },
  ],
  correctChoiceId: 'a',
  explanation: "This is exactly why crews are taught to know the location of every seacock aboard: a hose can fail (chafe, a bad clamp, age) at any time, but a through-hull is only a flooding risk if its seacock is left open. Knowing how to quickly find and close the correct seacock can be the difference between a wet bilge and a sinking.",
  source: 'ASA 103 standard curriculum — through-hull failure response',
},
{
  id: 'sys-through-hull-defn',
  topic: 'cruising-systems',
  concepts: ['through-hulls-and-seacocks'],
  format: 'text',
  prompt: "Which of these is an example of a system that typically uses a through-hull fitting?",
  choices: [
    { id: 'c', text: "The mainsail halyard", whyWrong: "A halyard is a line that hoists the sail; it has no connection to hull penetrations." },
    { id: 'd', text: "The anchor windlass motor", whyWrong: "A windlass motor is a deck-mounted electrical device, not a below-waterline plumbing fitting." },
    { id: 'a', text: "Engine raw-water cooling intake" },
    { id: 'b', text: "The masthead navigation light wiring", whyWrong: "Masthead wiring runs up the mast, well above the waterline, with no through-hull involved." },
  ],
  correctChoiceId: 'a',
  explanation: "Systems needing to move water into or out of the hull below the waterline — engine raw-water cooling intake, sink and head drains, bilge pump discharge — use through-hull fittings, each normally paired with a seacock for shutoff.",
  source: 'ASA 103 standard curriculum — through-hull fittings',
},
{
  id: 'sys-ground-tackle-defn',
  topic: 'cruising-systems',
  format: 'visual',
  assetId: 'photo-danforth-anchor',
  prompt: "What does the term \"ground tackle\" refer to?",
  choices: [
    { id: 'a', text: "The complete anchoring system: the anchor itself plus the chain and/or rope rode connecting it to the boat" },
    { id: 'b', text: "Only the anchor windlass motor", whyWrong: "The windlass is the machine used to deploy/retrieve ground tackle; it is not itself part of the ground tackle." },
    { id: 'c', text: "Only the dock lines used when tied up", whyWrong: "Dock lines are mooring lines, a different piece of equipment from anchoring gear." },
    { id: 'd', text: "The keel and ballast that keep the boat upright", whyWrong: "Keel and ballast are hull/stability components, unrelated to anchoring." },
  ],
  correctChoiceId: 'a',
  explanation: "Ground tackle is the collective term for everything used to anchor the boat: the anchor, the chain and/or rope rode, shackles, and swivels connecting them. It's what you deploy and retrieve every time you set or weigh anchor.",
  source: 'ASA 103 standard curriculum — anchoring equipment terminology',
},
{
  id: 'sys-windlass-id',
  topic: 'cruising-systems',
  format: 'visual',
  assetId: 'custom-windlass-deck',
  prompt: "What is the deck machine shown, and what does it do?",
  choices: [
    { id: 'b', text: "A primary winch — it trims the jib sheet under load", whyWrong: "A primary winch is a cockpit/side-deck fitting for sail control lines, not for anchor rode." },
    { id: 'c', text: "A capstan used to hoist the mainsail", whyWrong: "Halyards are usually led to a winch near the mast or cockpit, not the foredeck windlass." },
    { id: 'd', text: "A fuel-fill deck plate", whyWrong: "A deck fill is a small flush fitting for fueling/watering, not a powered mechanism with a gypsy wheel." },
    { id: 'a', text: "An anchor windlass — it mechanically raises and lowers the anchor rode, reducing the physical effort of hauling ground tackle by hand" },
  ],
  correctChoiceId: 'a',
  explanation: "A windlass is mounted on the foredeck and uses a gypsy (chain wheel) to grip and haul in the anchor chain (and/or rope rode), driven electrically or manually. It makes handling heavy ground tackle practical on boats where hauling it entirely by hand would be exhausting.",
  source: 'ASA 103 standard curriculum — anchoring equipment',
},
{
  id: 'sys-windlass-function',
  topic: 'cruising-systems',
  format: 'text',
  prompt: "Even with a working windlass, why are ASA-trained sailors taught not to rely on it to pull the boat up to the anchor?",
  choices: [
    { id: 'd', text: "It has no effect on the windlass either way", whyWrong: "Loading a windlass to drag the boat's mass forward, rather than just recovering slack rode, is a recognized way to damage the unit or its deck mounting." },
    { id: 'a', text: "A windlass is designed to retrieve rode, not to winch a heavy boat forward against resistance; using it that way can overload and damage the windlass or its mount" },
    { id: 'b', text: "Windlasses are not strong enough to lift the anchor itself", whyWrong: "Windlasses are specifically sized to lift the anchor and rode; that is their core job." },
    { id: 'c', text: "Using the windlass this way is illegal under COLREGS", whyWrong: "This is a mechanical/seamanship best practice, not a navigation-rules issue." },
  ],
  correctChoiceId: 'a',
  explanation: "The proper technique is to motor the boat up toward the anchor using the engine while the windlass takes in the resulting slack rode, not to use the windlass motor to haul the boat's full weight forward. Doing the latter risks overloading the windlass motor, gearbox, or its deck mounting.",
  source: 'ASA 103 standard curriculum — anchor retrieval technique',
},
{
  id: 'sys-hatches-function',
  topic: 'cruising-systems',
  concepts: ['belowdecks-layout'],
  format: 'text',
  prompt: "What is the main function of deck hatches on a cruising boat?",
  choices: [
    { id: 'd', text: "To regulate engine cooling water temperature", whyWrong: "Engine cooling is handled by the raw-water system, unrelated to deck hatches." },
    { id: 'a', text: "To provide ventilation and natural light belowdecks, and to allow entry/exit at points other than the companionway" },
    { id: 'b', text: "To serve as the primary structural support for the mast", whyWrong: "Mast support comes from the step, partners, and rigging, not deck hatches." },
    { id: 'c', text: "To house the boat's batteries", whyWrong: "Batteries are stowed in a dedicated compartment, not inside a hatch." },
  ],
  correctChoiceId: 'a',
  explanation: "Hatches let light and air into the cabin and provide additional access points. They must be properly dogged (closed and latched) before getting underway in a seaway, since an open hatch is a common source of down-flooding.",
  source: 'ASA 103 standard curriculum — deck fittings and seaworthiness',
},
{
  id: 'sys-battery-basics',
  topic: 'cruising-systems',
  concepts: ['dc-electrical-system'],
  format: 'text',
  prompt: "Why do most cruising sailboats carry separate \"house\" and \"starting\" battery banks?",
  choices: [
    { id: 'b', text: "Because it is required by COLREGS", whyWrong: "COLREGS govern navigation rules and lighting, not internal electrical-system design." },
    { id: 'c', text: "Because a single battery cannot legally power both systems", whyWrong: "There's no such legal restriction; it's a practical reliability choice, not a legal one." },
    { id: 'd', text: "To reduce the boat's total weight", whyWrong: "Adding a second battery bank increases weight; the reason is reliability, not weight savings." },
    { id: 'a', text: "So that running lights, instruments, and accessories can draw down the house bank without risking a dead battery when it's time to start the engine" },
  ],
  correctChoiceId: 'a',
  explanation: "Separating house loads (lights, refrigeration, electronics) from the engine-starting battery protects your ability to start the engine even if the house bank is depleted from a day (or night) of use. A battery switch typically lets you combine banks in an emergency.",
  source: 'ASA 103 standard curriculum — basic electrical systems',
},
{
  id: 'sys-electrical-panel-basics',
  topic: 'cruising-systems',
  concepts: ['dc-electrical-system'],
  format: 'text',
  prompt: "What is the purpose of the circuit breakers on a boat's DC electrical panel?",
  choices: [
    { id: 'd', text: "To regulate engine RPM", whyWrong: "Engine RPM is controlled by the throttle, not the DC panel." },
    { id: 'a', text: "To protect each circuit from overload/short-circuit and let you switch individual circuits on or off" },
    { id: 'b', text: "To convert AC shore power to DC", whyWrong: "That conversion is done by a battery charger, not a breaker panel." },
    { id: 'c', text: "To desalinate seawater for drinking", whyWrong: "That's the function of a watermaker, unrelated to the electrical panel." },
  ],
  correctChoiceId: 'a',
  explanation: "Each circuit (lights, bilge pump, instruments, etc.) is normally protected by its own breaker, which trips if the circuit draws too much current, and doubles as an on/off switch for that circuit.",
  source: 'ASA 103 standard curriculum — basic electrical systems',
},

// ---------------------------------------------------------------------------
// Arc 4B: Safety Equipment & Procedures (topic: safety-equipment)
// ---------------------------------------------------------------------------
{
  id: 'safety-req-pfd-count',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "Under federal law, how many wearable PFDs (life jackets) must a recreational boat carry?",
  choices: [
    { id: 'd', text: "PFDs are recommended but not legally required on any recreational boat", whyWrong: "Carrying one appropriately sized, USCG-approved wearable PFD per person is a federal legal requirement, not merely a recommendation." },
    { id: 'a', text: "One U.S. Coast Guard-approved wearable PFD of appropriate size for each person aboard" },
    { id: 'b', text: "One PFD total, regardless of how many people are aboard", whyWrong: "Federal law requires one appropriately sized wearable PFD per person aboard, not just one for the whole boat." },
    { id: 'c', text: "PFDs are only legally required for children", whyWrong: "Federal law requires a wearable PFD for every person aboard, adults included, though states often add specific wear-it rules for children." },
  ],
  correctChoiceId: 'a',
  explanation: "Federal regulations require every recreational vessel to carry one USCG-approved wearable PFD, sized appropriately, for each person aboard. This is a legal minimum — many prudent boaters also carry spares.",
  source: 'USCG Boater’s Guide to Federal Requirements for Recreational Boats — legally required, not merely recommended',
},
{
  id: 'safety-req-throwable-length',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "At what vessel length does federal law also require a throwable flotation device (e.g., a ring buoy or buoyant cushion) in addition to wearable PFDs?",
  choices: [
    { id: 'b', text: "Any vessel, regardless of length", whyWrong: "The throwable-device requirement applies specifically to vessels 16 feet and longer, not to every recreational boat." },
    { id: 'c', text: "40 feet and longer only", whyWrong: "The threshold is 16 feet, well below 40 feet." },
    { id: 'd', text: "Only vessels carrying passengers for hire", whyWrong: "This is a general recreational-boating requirement tied to vessel length, not limited to for-hire vessels." },
    { id: 'a', text: "16 feet and longer" },
  ],
  correctChoiceId: 'a',
  explanation: "Recreational vessels 16 feet and longer must carry at least one throwable Type IV device, immediately accessible, in addition to a wearable PFD for each person aboard.",
  source: 'USCG Boater’s Guide to Federal Requirements for Recreational Boats — legally required equipment by vessel length',
},
{
  id: 'safety-req-visual-distress-coastal',
  topic: 'safety-equipment',
  format: 'visual',
  assetId: 'custom-visual-distress-flare',
  prompt: "A boat 20 feet long operates on coastal waters. What visual distress signal equipment is legally required?",
  choices: [
    { id: 'b', text: "No visual distress signals are required for any recreational vessel", whyWrong: "Vessels operating on coastal waters, the Great Lakes, or territorial seas are required to carry both day and night visual distress signals." },
    { id: 'c', text: "Only a nighttime signal is required; daytime signals are optional", whyWrong: "Both day-usable and night-usable visual distress signals are required for coastal operation." },
    { id: 'd', text: "A cell phone satisfies the visual distress signal requirement", whyWrong: "A cell phone is not a USCG-approved visual distress signal device and does not meet this requirement on its own." },
    { id: 'a', text: "USCG-approved day and night visual distress signals (e.g., approved flares, an electric distress light for night, and/or an orange distress flag for day)" },
  ],
  correctChoiceId: 'a',
  explanation: "Vessels operating on coastal waters, the Great Lakes, or territorial seas must carry USCG-approved visual distress signals usable by day and by night (a common combination is a set of approved flares plus an orange distress flag, or an electric distress light for night use). Confirm expiration dates — most pyrotechnic flares expire and must be replaced periodically.",
  source: 'USCG Boater’s Guide to Federal Requirements for Recreational Boats — legally required for coastal operation',
},
{
  id: 'safety-req-visual-distress-inland-under16',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "A 14-foot boat operates only on an inland lake with no coastal or Great Lakes connection. Regarding visual distress signals, which statement is accurate?",
  choices: [
    { id: 'a', text: "Federal law does not require visual distress signals on this boat, because the visual distress signal rule only applies on coastal waters, the Great Lakes, and territorial seas — though carrying them is still prudent" },
    { id: 'b', text: "It must carry the full coastal set of day and night signals regardless of size or waters", whyWrong: "The federal visual distress signal requirement applies to coastal/Great Lakes/territorial waters; a boat confined to a non-coastal inland lake is entirely outside that requirement's operating area." },
    { id: 'c', text: "It is exempt from all federal safety equipment requirements", whyWrong: "The vessel is still subject to other requirements (PFDs, fire extinguisher if applicable, sound device, etc.) — only the visual distress signal rule has this inland-waters exemption." },
    { id: 'd', text: "Visual distress signals are only required at night", whyWrong: "Where the requirement does apply, it covers both day and night signals, not night alone." },
  ],
  correctChoiceId: 'a',
  explanation: "The federal visual distress signal requirement is tied to operating area, not vessel size: it applies on coastal waters, the Great Lakes, and territorial seas. A boat confined to a non-coastal inland lake is outside that operating area and so is exempt from the requirement entirely, regardless of length. (Separately, boats under 16 feet get a narrower exemption from carrying day signals — but only night signals — when they DO operate on waters where the rule applies; that size-based exemption isn't why this boat is exempt.) This is not a blanket exemption from all equipment carriage requirements, and prudent practice is to carry signals anyway.",
  source: 'USCG Boater’s Guide to Federal Requirements for Recreational Boats — operating-area scope of the visual distress signal requirement',
},
{
  id: 'safety-req-sound-device',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "What is the legal purpose of a sound-producing device (e.g., a whistle or horn) required aboard a recreational boat?",
  choices: [
    { id: 'a', text: "To make the required sound signals under the Navigation Rules (maneuvering, warning, and restricted-visibility signals)" },
    { id: 'b', text: "To call for a weather forecast", whyWrong: "Weather information comes from a VHF radio or NOAA weather channel, not a sound-signaling device." },
    { id: 'c', text: "To alert marine life to move away from the boat", whyWrong: "This isn't the purpose behind the legal requirement; it exists for collision-avoidance signaling under the Navigation Rules." },
    { id: 'd', text: "It is purely decorative and carries no functional requirement", whyWrong: "A sound-producing device capable of a 4-second blast (or similar) is a functional legal requirement, not decoration." },
  ],
  correctChoiceId: 'a',
  explanation: "Boats are required to carry a means of making an efficient sound signal, used for maneuvering and warning signals between vessels and for fog/restricted-visibility signals under the Navigation Rules.",
  source: 'USCG Boater’s Guide to Federal Requirements for Recreational Boats; COLREGS Rule 33 — legally required sound-signaling appliance',
},
{
  id: 'safety-req-fire-extinguisher-condition',
  topic: 'safety-equipment',
  format: 'visual',
  assetId: 'photo-fire-extinguisher-use',
  prompt: "A required fire extinguisher aboard is found with a gauge reading in the red (\"recharge\") zone. What is the correct action?",
  choices: [
    { id: 'a', text: "It does not satisfy the requirement in that condition — it must be recharged or replaced before it counts as required safety equipment" },
    { id: 'b', text: "It still counts as meeting the requirement as long as it is aboard, regardless of charge", whyWrong: "A required fire extinguisher must be in serviceable, charged condition to satisfy the requirement — an uncharged unit will not perform when needed." },
    { id: 'c', text: "Fire extinguishers never need recharging once purchased", whyWrong: "Extinguishers lose pressure over time or after any discharge and require periodic inspection and recharge/replacement." },
    { id: 'd', text: "Only USCG inspectors are permitted to check the gauge", whyWrong: "Any boat operator can and should routinely check their extinguisher's gauge; this is a basic pre-departure check, not something requiring an inspector." },
  ],
  correctChoiceId: 'a',
  explanation: "A required marine fire extinguisher must be fully charged and in serviceable condition to legally count toward the requirement. Gauges should be checked regularly (a simple pre-departure check), and any unit reading low, expired, or otherwise unserviceable should be recharged or replaced immediately.",
  source: 'USCG Boater’s Guide to Federal Requirements for Recreational Boats — fire extinguisher condition and required equipment',
},
{
  id: 'safety-req-nav-lights-general',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "Which statement about navigation lights and the federal equipment requirements is accurate?",
  choices: [
    { id: 'd', text: "A single all-round white light satisfies every vessel's requirement regardless of size", whyWrong: "The specific light configuration required depends on vessel length and type; a single all-round white light only satisfies the smallest-vessel exception, not every vessel." },
    { id: 'a', text: "Recreational vessels must be equipped with functioning navigation lights that meet the Navigation Rules and must display them during periods of restricted visibility and from sunset to sunrise" },
    { id: 'b', text: "Navigation lights are only required if the boat is over 65 feet long", whyWrong: "Navigation light requirements apply across recreational vessel sizes (with lighting configurations that vary by length), not only to very large vessels." },
    { id: 'c', text: "Navigation lights are optional equipment left to the owner's discretion", whyWrong: "Proper, functioning navigation lights and their required display at night/restricted visibility are a legal requirement, not optional." },
  ],
  correctChoiceId: 'a',
  explanation: "Federal law and the Navigation Rules require recreational vessels to carry navigation lights appropriate to their size and type and to display them from sunset to sunrise and during restricted visibility, so other vessels can identify them at night.",
  source: 'USCG Boater’s Guide to Federal Requirements for Recreational Boats; COLREGS Rules 20-23 — legally required equipment and display',
},
{
  id: 'safety-pfd-type-id',
  topic: 'safety-equipment',
  format: 'visual',
  assetId: 'custom-pfd-wearable-throwable',
  prompt: "The diagram shows two categories of flotation device. What is the key functional difference between them?",
  choices: [
    { id: 'c', text: "There is no functional difference; both satisfy identical requirements", whyWrong: "They serve different roles and are counted as separate required-equipment categories (Type III/wearable vs. Type IV/throwable) under federal rules." },
    { id: 'd', text: "The throwable device is only for use by children", whyWrong: "Throwable devices are general man-overboard rescue equipment, not restricted to children." },
    { id: 'a', text: "A wearable PFD is worn on the body before an emergency happens; a throwable device is tossed to a person already in the water" },
    { id: 'b', text: "Both are designed to be worn continuously by every crew member", whyWrong: "Throwable devices (ring buoys, cushions) are not designed to be worn; they are thrown to someone in the water." },
  ],
  correctChoiceId: 'a',
  explanation: "A wearable PFD (like a Type III vest) is meant to be worn before you go in the water, keeping you afloat immediately. A throwable device (Type IV, like a ring buoy or buoyant cushion) is meant to be thrown to someone already in the water — a distinct and separately required category of safety equipment.",
  source: 'ASA 103 standard curriculum; USCG PFD carriage requirements — PFD types',
},
{
  id: 'safety-pfd-fit-check',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "How should you check that a wearable PFD fits properly?",
  choices: [
    { id: 'a', text: "Put it on, fasten all straps/zippers, and have someone pull up on the shoulders — a properly fitted PFD should not ride up over the chin or ears" },
    { id: 'b', text: "It fits properly as long as it can be zipped closed, regardless of how it moves", whyWrong: "Being able to close it is necessary but not sufficient — the key check is whether it stays in place and doesn't ride up when pulled from the shoulders." },
    { id: 'c', text: "Fit does not matter for adults, only for children", whyWrong: "Fit matters for every wearer — an oversized or loose PFD can ride up and fail to keep a person's head above water regardless of age." },
    { id: 'd', text: "A PFD should always be as loose as possible for comfort", whyWrong: "A loose PFD can ride up over the head in the water instead of supporting it, defeating its purpose." },
  ],
  correctChoiceId: 'a',
  explanation: "A properly fitted PFD, with all straps snug, should stay in place when someone tugs upward on the shoulder straps — if it rides up toward or past the chin, it's too loose or the wrong size and will not perform correctly in the water.",
  source: 'ASA 103 standard curriculum — PFD fitting and selection',
},
{
  id: 'safety-pfd-stowage-accessible',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "Federal requirements state wearable PFDs must be \"readily accessible.\" What does that mean in practice?",
  choices: [
    { id: 'd', text: "They only need to be accessible while docked, not underway", whyWrong: "Readily accessible applies whenever the PFDs are required aboard, underway included — arguably when it matters most." },
    { id: 'a', text: "They must be easy to reach quickly, not stowed in a locked or hard-to-open compartment or buried under other gear" },
    { id: 'b', text: "They must be worn by every person aboard at all times", whyWrong: "Federal law requires PFDs to be carried and readily accessible; continuous wear is generally a recommendation or a state/child-specific rule, not the general federal accessibility requirement itself." },
    { id: 'c', text: "They can be stored in a sealed, locked compartment as long as a key exists somewhere aboard", whyWrong: "A locked compartment defeats \"readily accessible\" — PFDs need to be reachable quickly in an emergency without hunting for a key." },
  ],
  correctChoiceId: 'a',
  explanation: "\"Readily accessible\" means PFDs must be quickly reachable in an emergency — not sealed in a locked or latched compartment, not buried under gear, and not still in their original shrink-wrap packaging.",
  source: 'USCG Boater’s Guide to Federal Requirements for Recreational Boats — PFD stowage/accessibility requirement',
},
{
  id: 'safety-pfd-child',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "What is a well-established prudent practice regarding children and PFDs, beyond the base federal carriage requirement?",
  choices: [
    { id: 'b', text: "Children are exempt from PFD requirements entirely", whyWrong: "Children are not exempt — if anything, many jurisdictions impose stricter wear requirements for young children than for adults." },
    { id: 'c', text: "Any adult-sized PFD is acceptable for a child as long as one is aboard", whyWrong: "PFDs must be sized appropriately for the wearer; an adult PFD will not hold a small child's head above water correctly." },
    { id: 'd', text: "PFD wear rules for children are identical nationwide with no state variation", whyWrong: "Age thresholds and specific wear requirements for children vary by state, so it's important to check the applicable rule for your location." },
    { id: 'a', text: "Many states require children under a certain age to wear a properly fitted PFD at all times while underway on an open deck — check the specific state rule for the waters you're on" },
  ],
  correctChoiceId: 'a',
  explanation: "While federal law sets the baseline (one appropriately sized wearable PFD per person aboard), many states go further and require young children to actually wear a PFD whenever underway on deck. Rules vary by state, so check locally — and in any case, a correctly sized PFD (not an adult unit) is essential for a child.",
  source: 'ASA 103 standard curriculum; state boating-safety statutes vary — recommended/state practice layered on top of the federal minimum',
},
{
  id: 'safety-pfd-inflatable-maintenance',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "An inflatable PFD needs what kind of routine attention that a foam PFD does not?",
  choices: [
    { id: 'a', text: "Regular inspection of the CO2 cartridge, inflator mechanism, and bladder for damage, plus rearming after any inflation" },
    { id: 'b', text: "No maintenance is needed for either type", whyWrong: "Inflatable PFDs specifically require periodic inspection of their inflation mechanism and rearming after use, unlike a passive foam PFD." },
    { id: 'c', text: "It must be replaced every single trip regardless of use", whyWrong: "Inflatable PFDs don't need replacement every trip — they need periodic inspection and rearming after actual inflation, not routine full replacement." },
    { id: 'd', text: "It requires no inspection as long as it looks intact from the outside", whyWrong: "A visually intact inflatable can still have a spent or corroded CO2 cartridge; the inflation mechanism specifically needs checking, not just the outer shell." },
  ],
  correctChoiceId: 'a',
  explanation: "Inflatable PFDs rely on a CO2 cartridge and inflator mechanism that must be checked periodically (per manufacturer guidance) and rearmed with a fresh cartridge/bobbin after any inflation, whether automatic or manual — upkeep a simple foam PFD doesn't need.",
  source: 'ASA 103 standard curriculum — PFD types and maintenance',
},
{
  id: 'safety-prudent-first-aid-kit',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "Is a first-aid kit federally required aboard a recreational boat?",
  choices: [
    { id: 'c', text: "Only vessels over 65 feet must carry one", whyWrong: "There is no such federal size threshold for first-aid kits on recreational vessels; it simply isn't a federal requirement at any size." },
    { id: 'd', text: "It is required only during federally declared emergencies", whyWrong: "There's no such conditional federal requirement; a first-aid kit remains a recommended item, not a legal requirement, under normal or emergency conditions alike." },
    { id: 'a', text: "No — it is not on the federal required-equipment list, but it is a widely recommended, prudent item for any cruising boat" },
    { id: 'b', text: "Yes, it is a federal carriage requirement for all recreational vessels", whyWrong: "A first-aid kit is not on the federal list of required equipment; it's a recommended/prudent addition, distinct from the legally mandated items." },
  ],
  correctChoiceId: 'a',
  explanation: "A first-aid kit does not appear on the USCG's federal required-equipment list for recreational boats. It is, however, strongly recommended by ASA and prudent seamanship — don't confuse \"recommended\" with \"required.\"",
  source: 'ASA 103 standard curriculum — recommended vs. legally required equipment',
},
{
  id: 'safety-prudent-flashlight-handheld',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "A working handheld flashlight is best described as which kind of safety item aboard a recreational boat?",
  choices: [
    { id: 'a', text: "A prudent, ASA-recommended item — useful for signaling, emergencies, and nighttime tasks, though not itself on the federal required-equipment list" },
    { id: 'b', text: "A legally required substitute for the vessel's navigation lights", whyWrong: "A handheld flashlight does not satisfy the fixed navigation light requirements; it's a useful supplemental item, not a legal substitute." },
    { id: 'c', text: "Legally required only on vessels without an engine", whyWrong: "There is no such federal requirement tied to propulsion type; a flashlight is a recommended item generally, not a legally mandated one for engineless boats specifically." },
    { id: 'd', text: "Entirely unnecessary if the boat has electric cabin lights", whyWrong: "Cabin lights can fail with the boat's electrical system; a portable flashlight is recommended as independent backup regardless of fixed lighting." },
  ],
  correctChoiceId: 'a',
  explanation: "A flashlight isn't on the federal required list, but it's a classic example of prudent gear: useful for signaling an approaching vessel, checking rigging or lines at night, and general emergencies if the boat's electrical system fails.",
  source: 'ASA 103 standard curriculum — recommended safety gear',
},
{
  id: 'safety-prudent-vhf-handheld-backup',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "Why do ASA courses recommend carrying a handheld VHF radio in addition to a fixed-mount VHF?",
  choices: [
    { id: 'c', text: "It replaces the need for any visual distress signals", whyWrong: "A handheld VHF is a communication device and does not substitute for the required visual distress signals." },
    { id: 'd', text: "It is only useful for listening to music", whyWrong: "A VHF radio is a marine communication and emergency-calling device, not an entertainment radio." },
    { id: 'a', text: "It provides a backup means of communication if the boat loses electrical power or the fixed unit fails, and it can go with the crew in a life raft or dinghy" },
    { id: 'b', text: "It is required by federal law on all recreational vessels", whyWrong: "VHF radio carriage is generally not a blanket federal requirement for recreational vessels; a handheld backup is a prudent recommendation, not a legal mandate." },
  ],
  correctChoiceId: 'a',
  explanation: "A handheld VHF, independent of the boat's electrical system and fixed antenna, gives you a redundant way to call for help if the primary radio or ship's power fails, and it's portable enough to take into a life raft or dinghy in an abandon-ship scenario.",
  source: 'ASA 103 standard curriculum — recommended communications equipment',
},
{
  id: 'safety-prudent-tool-spares',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "Why is a basic tool kit and a set of spare parts (impeller, fuses, hose clamps, filters) considered prudent gear for a cruising boat?",
  choices: [
    { id: 'c', text: "It replaces the need for any safety equipment", whyWrong: "Tools and spares support minor repairs; they don't substitute for PFDs, distress signals, or other required safety gear." },
    { id: 'd', text: "It is only useful for haul-out maintenance ashore", whyWrong: "The value is specifically for underway/at-anchor self-sufficiency, addressing failures far from a boatyard, not just shoreside maintenance." },
    { id: 'a', text: "It lets the crew make minor repairs underway or at anchor, rather than being stranded by a small, otherwise fixable failure" },
    { id: 'b', text: "It is legally required by the USCG for offshore passages", whyWrong: "There's no federal mandate specifying a tool kit and spares list; this is prudent-seamanship guidance, not a legal requirement." },
  ],
  correctChoiceId: 'a',
  explanation: "A modest set of tools and common spares means a failed impeller, blown fuse, or leaking hose clamp doesn't turn into a full emergency — the crew can often fix it on the spot rather than calling for a tow or being stuck at anchor.",
  source: 'ASA 103 standard curriculum — recommended maintenance gear',
},
{
  id: 'safety-stow-heavy-gear-low',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "Why should heavy items (spare batteries, canned provisions, tools) be stowed as low as possible in the boat?",
  choices: [
    { id: 'a', text: "Keeping weight low keeps the boat's center of gravity low, improving stability, whereas heavy weight stowed high makes the boat more tender" },
    { id: 'b', text: "It has no effect on the boat's handling", whyWrong: "Weight placement measurably affects stability and how the boat heels/responds, so it is not without effect." },
    { id: 'c', text: "It is only a concern for racing boats, not cruising boats", whyWrong: "Stability from proper weight distribution matters for any boat, cruising included, not just racing boats." },
    { id: 'd', text: "It is done purely to make cleaning easier", whyWrong: "The primary reason is stability/seaworthiness, not housekeeping convenience." },
  ],
  correctChoiceId: 'a',
  explanation: "Stowing heavy items low and near the centerline keeps the boat's center of gravity low, which improves stability. Heavy gear stowed high (or off to one side) raises the center of gravity and can make the boat more tender (prone to heeling further and recovering more slowly).",
  source: 'ASA 103 standard curriculum — stowage and stability',
},
{
  id: 'safety-stow-loose-gear-underway',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "Before heading offshore in a building sea, why is it important to secure all loose gear belowdecks and on deck?",
  choices: [
    { id: 'd', text: "It is only a concern in calm conditions", whyWrong: "The risk from loose gear becomes serious specifically as sea state builds and the boat moves more, not in calm conditions." },
    { id: 'a', text: "Loose gear can become a dangerous projectile or trip/injury hazard as the boat heels and pitches, and can also damage itself or the boat" },
    { id: 'b', text: "It is purely a matter of tidiness with no safety implication", whyWrong: "Unsecured gear is a genuine safety hazard in a seaway, not just a cosmetic housekeeping issue." },
    { id: 'c', text: "Loose gear improves the boat's stability", whyWrong: "Loose, unsecured gear does not improve stability; securing it is about preventing hazards, not enhancing stability." },
  ],
  correctChoiceId: 'a',
  explanation: "As the boat heels and works in a seaway, anything not secured (cans, tools, batteries, cabin sole boards) can fly across the cabin, injure crew, jam steering or bilge access, or damage itself. \"Stow it or lose it\" is a basic pre-departure discipline.",
  source: 'ASA 103 standard curriculum — pre-departure stowage checks',
},
{
  id: 'safety-stow-galley-items-passage',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "What is a specific, recommended stowage practice for galley items before getting underway in a seaway?",
  choices: [
    { id: 'c', text: "Remove the stove entirely before any passage", whyWrong: "Removing the stove is unnecessary and impractical; the stove is typically gimbaled and secured appropriately, not removed." },
    { id: 'd', text: "Galley stowage has no bearing on safety underway", whyWrong: "An unsecured galley is a real hazard source (falling pots, spilled hot liquids, jammed drawers), so it does bear on safety." },
    { id: 'a', text: "Secure cabinet latches, wedge or strap loose pots/pans, and confirm the stove is gimbaled and locked appropriately for the conditions" },
    { id: 'b', text: "Leave cabinet doors open for ventilation", whyWrong: "Open cabinet doors let contents spill as the boat heels; latches should be secured before getting underway." },
  ],
  correctChoiceId: 'a',
  explanation: "Galley cabinets should be positively latched (not just closed), loose cookware secured or stowed, and the gimbaled stove checked so it swings freely but won't fling hot contents in a seaway — a routine but important part of securing for sea.",
  source: 'ASA 103 standard curriculum — pre-departure stowage checks',
},
{
  id: 'safety-harness-id',
  topic: 'safety-equipment',
  format: 'visual',
  assetId: 'custom-harness-tether-jackline',
  prompt: "What does this deck arrangement show, and what is its purpose?",
  choices: [
    { id: 'd', text: "Anchor rode laid out on deck before deployment", whyWrong: "Anchor rode runs from the bow roller to the anchor, not fore-and-aft along the side decks as a crew attachment point." },
    { id: 'a', text: "Jacklines running fore-and-aft with a crew member's harness tether clipped to one — this lets crew move along the deck while staying clipped on, reducing the risk of going overboard" },
    { id: 'b', text: "Lifelines used purely as a handhold with no connection to a harness", whyWrong: "The lines shown are jacklines specifically meant for tether attachment, not the boat's fixed lifelines." },
    { id: 'c', text: "Dock lines used for tying up at a marina", whyWrong: "Dock lines secure the boat to a dock; jacklines are a deck safety system for crew, a different purpose entirely." },
  ],
  correctChoiceId: 'a',
  explanation: "Jacklines are webbing or line rigged fore-and-aft along the deck. A crew member wearing a safety harness clips a tether to the jackline, allowing movement along the deck while remaining attached to the boat — a core practice for offshore or heavy-weather sailing.",
  source: 'ASA 103 standard curriculum — harness, tether, and jackline use',
},
{
  id: 'safety-harness-when-clip',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "In what conditions is it considered good practice to wear a harness and clip in with a tether?",
  choices: [
    { id: 'b', text: "Only when the boat is anchored", whyWrong: "A harness/tether is about preventing a fall overboard while moving on deck underway — it has little purpose while safely anchored and not moving about the deck underway." },
    { id: 'c', text: "Only in flat calm daytime conditions", whyWrong: "The greatest value of a harness and tether is precisely when conditions are worse — night, heavy weather, or reduced crew — not calm daylight." },
    { id: 'd', text: "Harnesses are never necessary if a PFD is worn", whyWrong: "A PFD keeps you afloat if you go overboard; a harness/tether is meant to prevent going overboard in the first place — they serve complementary, not interchangeable, purposes." },
    { id: 'a', text: "At night, in heavy weather, when short-handed, or any time the risk of going overboard is elevated" },
  ],
  correctChoiceId: 'a',
  explanation: "Common prudent practice is to wear a harness and stay clipped in during night watches, heavy weather, short-handed sailing, or foredeck work — situations where a fall overboard is both more likely and harder for the rest of the crew to notice and recover from.",
  source: 'ASA 103 standard curriculum — man-overboard prevention',
},
{
  id: 'safety-harness-clip-point',
  topic: 'safety-equipment',
  format: 'text',
  prompt: "When clipping a tether onto the boat, what is the recommended attachment point?",
  choices: [
    { id: 'c', text: "Any convenient line on deck, such as a sheet or halyard", whyWrong: "Sheets and halyards are working lines, not fixed structural attachment points, and can be released or shift unexpectedly." },
    { id: 'd', text: "It does not matter where you clip in, as long as you are clipped to something", whyWrong: "The attachment point matters a great deal — a weak or outboard point can fail or let a person go over the side, defeating the purpose of clipping in." },
    { id: 'a', text: "A dedicated jackline or a strong padeye/attachment point, kept inboard where possible rather than on the lifelines" },
    { id: 'b', text: "The lifelines, since they run the full length of the deck", whyWrong: "Lifelines are generally not rated or intended as tether attachment points and can fail under a sudden overboard load — jacklines or dedicated padeyes are the recommended points." },
  ],
  correctChoiceId: 'a',
  explanation: "Tethers should clip to purpose-built jacklines or strong, dedicated attachment points (padeyes), kept as far inboard as practical. Lifelines are not designed to take a sudden overboard shock load and are not a recommended clip-in point.",
  source: 'ASA 103 standard curriculum — harness, tether, and jackline use',
},
{
  id: 'safety-fuel-gas-diesel-diagram',
  topic: 'safety-equipment',
  concepts: ['blower-ventilation', 'fueling-safety'],
  format: 'visual',
  assetId: 'custom-fueling-gas-diesel',
  prompt: "Comparing the two fueling procedures shown, what is the key extra step required specifically before starting a gasoline engine after fueling, that is not required for diesel?",
  choices: [
    { id: 'd', text: "Nothing — gasoline and diesel fueling procedures are identical", whyWrong: "They are not identical: gasoline's more volatile, heavier-than-air vapors require the ventilation/blower step that diesel does not." },
    { id: 'a', text: "Running the engine compartment blower for several minutes to clear any gasoline vapors before starting the engine" },
    { id: 'b', text: "Closing the fuel fill cap", whyWrong: "Closing the fill cap is common to both gasoline and diesel fueling; it isn't the gasoline-specific extra step." },
    { id: 'c', text: "Turning off all electronics", whyWrong: "This isn't the specific, defining extra step that distinguishes gasoline procedure from diesel procedure." },
  ],
  correctChoiceId: 'a',
  explanation: "Gasoline vapors are heavier than air, sink into the bilge, and are far more explosive than diesel fumes. That's why gasoline-powered boats require running the engine compartment blower for several minutes after fueling and before starting the engine — a step not required for diesel, whose vapors are much less volatile.",
  source: 'ASA 103 standard curriculum; USCG boating safety guidance — gasoline vs. diesel fueling procedures',
},
{
  id: 'safety-fuel-blower-purpose',
  topic: 'safety-equipment',
  concepts: ['blower-ventilation'],
  format: 'text',
  prompt: "What is the specific purpose of running the engine compartment blower before starting a gasoline inboard engine?",
  choices: [
    { id: 'd', text: "To improve fuel economy", whyWrong: "The blower's purpose is safety ventilation, not fuel efficiency." },
    { id: 'a', text: "To exhaust any accumulated gasoline vapor from the bilge/engine compartment before an ignition source (the starter) is engaged" },
    { id: 'b', text: "To cool the engine before starting", whyWrong: "Engine cooling is handled by the raw-water cooling system once running, not by the ventilation blower." },
    { id: 'c', text: "To charge the batteries faster", whyWrong: "The blower is a ventilation fan; it has no role in battery charging." },
  ],
  correctChoiceId: 'a',
  explanation: "Gasoline vapors are explosive and, being heavier than air, pool in the bilge and engine compartment. The blower clears that space of accumulated vapor before you engage the starter (a spark source), reducing the risk of an explosion.",
  source: 'ASA 103 standard curriculum — pre-start ventilation procedure',
},
{
  id: 'safety-fuel-shutdown-before',
  topic: 'safety-equipment',
  concepts: ['fueling-safety'],
  format: 'text',
  prompt: "Before fueling at the dock, what should be shut off or extinguished aboard?",
  choices: [
    { id: 'b', text: "Only the engine; everything else can remain on", whyWrong: "Electrical switches and open flames can also provide an ignition source for fuel vapor and should be off/out as well, not just the engine." },
    { id: 'c', text: "Nothing needs to be shut off during fueling", whyWrong: "Shutting off ignition sources before fueling is a basic, standard safety step, not an unnecessary one." },
    { id: 'd', text: "Only the stove, since the engine is already off while docked", whyWrong: "The engine should be positively shut off (not just assumed off), along with other spark/flame sources — the stove alone isn't the full list." },
    { id: 'a', text: "The engine, all electrical equipment that could spark, open flames, and any smoking materials" },
  ],
  correctChoiceId: 'a',
  explanation: "Before fueling, shut down the engine, turn off electrical switches and appliances that could spark, extinguish any open flames, and put out smoking materials — fuel vapor near any ignition source is a fire/explosion risk.",
  source: 'ASA 103 standard curriculum — fueling procedures',
},
{
  id: 'safety-fuel-spill-response',
  topic: 'safety-equipment',
  concepts: ['fueling-safety'],
  format: 'text',
  prompt: "If fuel is accidentally spilled into the water while fueling, what is the boater's obligation?",
  choices: [
    { id: 'b', text: "No action is required for small spills", whyWrong: "Even a small spill that produces a visible sheen on the water is a reportable event under federal pollution law, not something to ignore." },
    { id: 'c', text: "Continue fueling and clean it up afterward", whyWrong: "Fueling should stop immediately when a spill occurs, not continue while fuel is actively going into the water." },
    { id: 'd', text: "Only spills over 50 gallons need to be reported", whyWrong: "There's no minimum-volume exemption — any spill that produces a sheen on the water is reportable, regardless of quantity." },
    { id: 'a', text: "Stop fueling immediately, and it must be reported — a fuel/oil spill that leaves a sheen on the water is a reportable pollution incident" },
  ],
  correctChoiceId: 'a',
  explanation: "Federal law prohibits discharging oil or fuel that causes a visible sheen on the water, and such an incident must be reported to the National Response Center. Stop fueling immediately if a spill occurs and follow the marina's/authority's spill procedure.",
  source: 'ASA 103 standard curriculum; federal Clean Water Act oil-spill reporting requirement — legally required reporting',
},
{
  id: 'safety-fuel-vapor-density',
  topic: 'safety-equipment',
  concepts: ['blower-ventilation', 'fueling-safety'],
  format: 'text',
  prompt: "After fueling and before starting the engine, why is it recommended to open hatches and sniff the bilge (or use a vapor detector) in addition to running the blower?",
  choices: [
    { id: 'c', text: "It is required only for diesel engines", whyWrong: "This vapor check is specifically relevant to gasoline (whose vapor is heavier-than-air and explosive), not a diesel-specific step." },
    { id: 'd', text: "It replaces the need to run the blower at all", whyWrong: "The sniff/vapor check is an additional confirmation step, not a substitute for running the blower." },
    { id: 'a', text: "Gasoline vapor is heavier than air and can pool in low spots even after the blower runs, so a direct check adds a second layer of confirmation before starting" },
    { id: 'b', text: "It has nothing to do with fuel vapor and is only a general housekeeping step", whyWrong: "This check is specifically aimed at confirming no residual gasoline vapor remains before starting, not general housekeeping." },
  ],
  correctChoiceId: 'a',
  explanation: "Because gasoline vapor is heavier than air, it can linger in low pockets of the bilge even after a blower cycle. A quick visual/smell check (or an electronic vapor detector, where fitted) adds a second confirmation that it's safe to start the engine.",
  source: 'ASA 103 standard curriculum — pre-start ventilation procedure',
},

// ---------------------------------------------------------------------------
// Arc 4C: Auxiliary Engine, Motoring & Docking (topic: engine-docking)
// ---------------------------------------------------------------------------
{
  id: 'eng-auxiliary-engine-types',
  topic: 'engine-docking',
  concepts: ['auxiliary-engine-types', 'outboard-motors'],
  format: 'visual',
  assetId: 'photo-outboard-engine',
  prompt: "The photo shows one common type of small-boat auxiliary engine. What are the two main auxiliary engine arrangements found on cruising boats?",
  choices: [
    { id: 'b', text: "Gasoline and jet-drive only, with no other arrangements in use", whyWrong: "This omits inboard shaft-drive diesels, one of the two main arrangements actually taught at this level." },
    { id: 'c', text: "Sail-drive is the only arrangement used on cruising boats", whyWrong: "Sail-drives are one inboard variant, but outboards and traditional shaft-drive inboards are the two main categories covered." },
    { id: 'd', text: "There is only one type of auxiliary engine used on cruising boats", whyWrong: "Cruising boats commonly use either outboard or inboard auxiliary power, not a single universal arrangement." },
    { id: 'a', text: "Outboard motors (mounted on the transom or a bracket, as shown) and inboard engines (mounted inside the hull, driving a fixed propeller shaft)" },
  ],
  correctChoiceId: 'a',
  explanation: "Small cruising boats are commonly powered by either a transom/bracket-mounted outboard motor (as pictured) or an inboard engine (often diesel) turning a fixed propeller shaft or sail-drive leg. Which type is aboard affects pre-start checks, control layout, and maintenance access.",
  source: 'ASA 103 standard curriculum — auxiliary propulsion types',
},
{
  id: 'eng-prestart-compartment-inspect',
  topic: 'engine-docking',
  concepts: ['pre-departure-engine-checks'],
  format: 'text',
  prompt: "As part of a pre-start check on an inboard engine, what should you look for when opening the engine compartment?",
  choices: [
    { id: 'd', text: "Only the engine's serial number", whyWrong: "The serial number has no bearing on a functional pre-start safety check." },
    { id: 'a', text: "Signs of fuel, oil, or water leaks, loose belts or clamps, and any unusual smell before starting" },
    { id: 'b', text: "Only whether the engine paint looks fresh", whyWrong: "Cosmetic appearance is not a meaningful pre-start safety check; leaks, loose fittings, and odors are." },
    { id: 'c', text: "Nothing — the compartment does not need to be checked before starting", whyWrong: "A visual pre-start check of the engine compartment is a standard, recommended step, not something to skip." },
  ],
  correctChoiceId: 'a',
  explanation: "A quick look before starting — checking for fresh leaks, loose or worn belts, secured clamps, and any fuel or gas smell — catches many problems while they're still minor and before the engine is running.",
  source: 'ASA 103 standard curriculum — pre-start engine checks',
},
{
  id: 'eng-prestart-fluids-check',
  topic: 'engine-docking',
  concepts: ['pre-departure-engine-checks'],
  format: 'text',
  prompt: "Which fluid levels are part of a basic ASA 103-level pre-start check on a diesel auxiliary?",
  choices: [
    { id: 'b', text: "Only the freshwater tank for the sink", whyWrong: "The domestic freshwater tank has nothing to do with engine pre-start checks; engine oil and coolant are the relevant fluids." },
    { id: 'c', text: "Only the holding tank level", whyWrong: "The holding tank is a sanitation system, unrelated to engine pre-start checks." },
    { id: 'd', text: "Fluid levels are not part of a pre-start check", whyWrong: "Checking oil (and coolant, if applicable) before starting is a standard, basic pre-start step." },
    { id: 'a', text: "Engine oil level and coolant level (if freshwater cooled), checked before starting" },
  ],
  correctChoiceId: 'a',
  explanation: "At the ASA 103 level, a basic pre-start check includes confirming engine oil is at the proper level on the dipstick and, on freshwater-cooled engines, that coolant is adequate — quick checks that catch a low-oil or low-coolant condition before it becomes engine damage.",
  source: 'ASA 103 standard curriculum — pre-start engine checks',
},
{
  id: 'eng-prestart-ventilation-blower',
  topic: 'engine-docking',
  concepts: ['blower-ventilation'],
  format: 'text',
  prompt: "On a gasoline-powered auxiliary, what pre-start step addresses the risk of explosive vapor in the engine compartment?",
  choices: [
    { id: 'a', text: "Running the blower for several minutes and confirming no fuel smell before engaging the starter" },
    { id: 'b', text: "Opening the throttle fully before starting", whyWrong: "Throttle position doesn't address vapor accumulation; ventilation via the blower does." },
    { id: 'c', text: "Checking the anchor light bulb", whyWrong: "The anchor light is unrelated to engine-compartment ventilation." },
    { id: 'd', text: "This step is unnecessary for gasoline engines", whyWrong: "This step is specifically necessary and standard practice for gasoline engines, given their vapor explosion risk." },
  ],
  correctChoiceId: 'a',
  explanation: "Gasoline vapor is explosive and heavier than air, so it collects in the bilge. Running the blower for the manufacturer-recommended time (commonly at least four minutes) and checking for fuel odor before starting reduces that risk.",
  source: 'ASA 103 standard curriculum — pre-start ventilation procedure',
},
{
  id: 'eng-prestart-transmission-neutral',
  topic: 'engine-docking',
  concepts: ['engine-starting-procedure'],
  format: 'text',
  prompt: "Why should you confirm the transmission/shift control is in neutral before starting the engine?",
  choices: [
    { id: 'c', text: "It is only a concern for outboard engines, not inboards", whyWrong: "Confirming neutral before starting applies to inboard and outboard installations alike." },
    { id: 'd', text: "It only matters after the engine has already been running for a while", whyWrong: "The concern is specifically at start-up, when an unexpected lurch into gear could catch the crew and dock lines off guard." },
    { id: 'a', text: "Starting in gear could cause the boat to lurch forward or backward unexpectedly, which is a safety hazard at the dock or in a slip" },
    { id: 'b', text: "It has no effect either way", whyWrong: "Starting in gear can and does cause unexpected boat movement, so it does have an effect." },
  ],
  correctChoiceId: 'a',
  explanation: "Many engines are designed with a safety neutral-start switch, but it's still standard practice to confirm the shift lever is in neutral before hitting the starter — an inadvertent start in gear can move the boat suddenly, damaging the dock, another boat, or injuring crew.",
  source: 'ASA 103 standard curriculum — engine starting procedure',
},
{
  id: 'eng-prestart-cooling-water-check',
  topic: 'engine-docking',
  concepts: ['cooling-water-check'],
  format: 'text',
  prompt: "Immediately after starting the engine, what should you check to confirm the raw-water cooling system is working?",
  choices: [
    { id: 'a', text: "That cooling water is flowing steadily out of the exhaust outlet" },
    { id: 'b', text: "That the sails are trimmed correctly", whyWrong: "Sail trim is unrelated to confirming engine cooling water flow." },
    { id: 'c', text: "That the anchor light is on", whyWrong: "The anchor light has nothing to do with cooling water confirmation." },
    { id: 'd', text: "Nothing needs to be checked immediately after starting", whyWrong: "Confirming raw-water flow right after starting is a basic, important check — an engine overheats quickly without it." },
  ],
  correctChoiceId: 'a',
  explanation: "Right after starting, glance (or listen) at the exhaust outlet for a steady stream of cooling water. No water flow usually means a blocked intake, a failed impeller, or a closed seacock — and the engine should be shut down promptly to avoid overheating damage.",
  source: 'ASA 103 standard curriculum — engine starting procedure',
},
{
  id: 'eng-start-procedure-order',
  topic: 'engine-docking',
  concepts: ['engine-starting-procedure', 'cooling-water-check'],
  format: 'text',
  prompt: "Which sequence best reflects a basic, correct auxiliary engine starting procedure?",
  choices: [
    { id: 'd', text: "There is no meaningful order; any sequence works equally well", whyWrong: "A specific order matters here — several of these checks exist precisely to prevent engine damage if skipped or done out of order." },
    { id: 'a', text: "Confirm neutral, confirm seacock (if applicable) is open, open fuel supply, start engine, confirm cooling water flow" },
    { id: 'b', text: "Start engine first, then check everything else afterward", whyWrong: "Checks like neutral, open seacock, and fuel supply should be confirmed before starting, not as an afterthought." },
    { id: 'c', text: "Close the raw-water seacock, then start the engine", whyWrong: "The raw-water seacock must be open, not closed, before starting — closing it starves the engine of cooling water." },
  ],
  correctChoiceId: 'a',
  explanation: "A sound basic sequence is: confirm the shift is in neutral, confirm the raw-water intake seacock is open, confirm fuel supply is on, start the engine, then immediately confirm cooling water is flowing from the exhaust. Skipping or reordering these steps risks damaging the engine or an unexpected boat movement.",
  source: 'ASA 103 standard curriculum — engine starting procedure',
},
{
  id: 'eng-prop-walk-id',
  topic: 'engine-docking',
  concepts: ['prop-walk', 'right-hand-propeller'],
  format: 'visual',
  assetId: 'custom-prop-walk',
  prompt: "The diagram shows a boat backing under power with a right-hand propeller. What effect is illustrated, and why does it happen?",
  choices: [
    { id: 'b', text: "Prop wash over the rudder, unrelated to which way the stern moves", whyWrong: "Prop wash is the stream of water pushed by the propeller across the rudder; the sideways stern movement shown is specifically prop walk." },
    { id: 'c', text: "A steering failure requiring the emergency tiller", whyWrong: "This is a normal, predictable propeller effect, not a mechanical steering failure." },
    { id: 'd', text: "The effect only happens when going forward, never in reverse", whyWrong: "Prop walk is typically most noticeable in reverse, which is exactly what the diagram shows." },
    { id: 'a', text: "Prop walk — the spinning propeller's asymmetric thrust pushes the stern sideways (to port for a right-hand prop in reverse) in addition to moving the boat astern" },
  ],
  correctChoiceId: 'a',
  explanation: "Prop walk (paddle-wheel effect) results from the propeller blades biting unevenly into the water at different depths and angles as they rotate. For a common right-hand propeller, this pushes the stern to port when backing down, meaning the boat doesn't back straight — a predictable effect skippers learn to use to their advantage when docking.",
  source: 'ASA 103 standard curriculum — propeller effects',
},
{
  id: 'eng-prop-wash-rudder',
  topic: 'engine-docking',
  concepts: ['prop-wash'],
  format: 'text',
  prompt: "Why does a boat typically steer more effectively at low speed with a burst of forward throttle, even if boat speed barely changes?",
  choices: [
    { id: 'c', text: "It only works when the boat is already moving fast", whyWrong: "This technique is specifically useful at low speed, when the rudder alone doesn't have much flow across it yet." },
    { id: 'd', text: "It works by increasing the boat's displacement", whyWrong: "Throttle bursts don't change displacement; the mechanism is increased water flow (prop wash) across the rudder." },
    { id: 'a', text: "The propeller's wash flows directly over the rudder, increasing the water flow across it and improving steering response independent of the boat's speed through the water" },
    { id: 'b', text: "It has no effect on steering at all", whyWrong: "A throttle burst does improve rudder effectiveness via prop wash, so it isn't without effect." },
  ],
  correctChoiceId: 'a',
  explanation: "A rudder needs water flowing across it to be effective. At low boat speed there isn't much flow from the boat's own motion, but a short burst of throttle drives prop wash directly over the rudder, giving an immediate boost in steering response — a technique often used in tight-quarters maneuvering.",
  source: 'ASA 103 standard curriculum — propeller effects and low-speed steering',
},
{
  id: 'eng-prop-forward-vs-reverse-response',
  topic: 'engine-docking',
  concepts: ['prop-walk', 'prop-wash'],
  format: 'text',
  prompt: "Compared to forward gear, why is steering control generally less effective in reverse?",
  choices: [
    { id: 'c', text: "Reverse gear disables the steering system entirely", whyWrong: "Steering is not disabled in reverse — it is simply less responsive due to reduced prop wash over the rudder and more pronounced prop walk." },
    { id: 'd', text: "There is no difference between forward and reverse steering response", whyWrong: "There is a real, well-known difference — reverse steering is generally less crisp, which is why boats are often described as backing down less predictably than they go forward." },
    { id: 'a', text: "In reverse, prop wash from the propeller does not flow directly over the rudder the way it does going forward, and prop walk becomes more pronounced, both reducing rudder effectiveness" },
    { id: 'b', text: "The rudder physically cannot move while in reverse gear", whyWrong: "The rudder remains fully operable in reverse; the issue is reduced effectiveness, not the rudder being locked." },
  ],
  correctChoiceId: 'a',
  explanation: "Going forward, the propeller's wash is thrown directly aft across the rudder, sharpening its bite. In reverse, that wash is drawn away from the rudder rather than pushed over it, so steering response is duller, and prop walk's sideways stern effect becomes comparatively more noticeable.",
  source: 'ASA 103 standard curriculum — propeller effects',
},
{
  id: 'eng-prop-walk-use-docking',
  topic: 'engine-docking',
  concepts: ['prop-walk', 'right-hand-propeller'],
  format: 'text',
  prompt: "A boat with a right-hand propeller (stern walks to port in reverse) needs to back into a slip to port. How can the skipper use prop walk to advantage?",
  choices: [
    { id: 'c', text: "Switch to forward gear only, since prop walk never occurs going forward", whyWrong: "Reverse gear is what's needed to back into the slip, and it's specifically in reverse that this boat's prop walk pushes the stern to port — useful here, not something to avoid." },
    { id: 'd', text: "Prop walk only matters for outboard motors", whyWrong: "Prop walk is a property of the propeller and gear (rotation direction), and applies to inboard installations as much as outboards." },
    { id: 'a', text: "Use short bursts of reverse to let prop walk help swing the stern to port, working with the boat's natural tendency rather than fighting it" },
    { id: 'b', text: "Prop walk cannot be used to advantage in any docking situation", whyWrong: "Skilled use of prop walk is a standard, taught docking technique, not something with no practical application." },
  ],
  correctChoiceId: 'a',
  explanation: "Since this boat's prop walk pushes the stern to port in reverse, backing into a slip that also requires the stern to swing to port works with the boat's natural tendency — short bursts of reverse can help rotate the stern in the desired direction with less need for large rudder corrections.",
  source: 'ASA 103 standard curriculum — using prop walk while docking',
},
{
  id: 'eng-stopping-distance-momentum',
  topic: 'engine-docking',
  concepts: ['stopping-distance'],
  format: 'text',
  prompt: "Why do displacement sailboats generally need more room to stop than a car covering the same speed would suggest?",
  choices: [
    { id: 'd', text: "Stopping distance is not affected by the boat's weight or speed", whyWrong: "Stopping distance is very much affected by the boat's mass and speed — heavier, faster boats carry way longer." },
    { id: 'a', text: "A boat has no brakes and significant momentum in the water, so it continues moving (carrying way) for some distance after the throttle is cut or reversed" },
    { id: 'b', text: "Boats stop instantly once the throttle is released", whyWrong: "Boats continue moving under their own momentum after the throttle is cut — they do not stop instantly." },
    { id: 'c', text: "Water provides more resistance than air, so boats always stop faster than cars", whyWrong: "Despite water resistance, the lack of brakes and significant momentum generally mean boats need more room to stop than intuition based on cars would suggest." },
  ],
  correctChoiceId: 'a',
  explanation: "Boats don't have brakes. Cutting the throttle to neutral, or even reversing, doesn't stop the boat immediately — it continues to carry way and glide for a distance that depends on its speed, weight, and hull shape. Planning stops (and approaches to a dock or mooring) needs to account for this.",
  source: 'ASA 103 standard curriculum — stopping and carrying way',
},
{
  id: 'eng-backing-steerage-way',
  topic: 'engine-docking',
  concepts: ['steerage-way'],
  format: 'text',
  prompt: "What does \"steerage way\" mean, and why does it matter when backing down?",
  choices: [
    { id: 'd', text: "It only applies when going forward, never in reverse", whyWrong: "Steerage way applies to reverse as much as forward — with too little speed astern, the rudder loses effect just as it does going too slowly ahead." },
    { id: 'a', text: "Steerage way is the minimum speed through the water needed for the rudder to have effect; without it, the boat won't answer the helm even in reverse" },
    { id: 'b', text: "It refers to which side of the channel a vessel must keep to", whyWrong: "That describes narrow-channel navigation rules, not steerage way, which is about minimum speed for rudder control." },
    { id: 'c', text: "It is the maximum speed a boat is permitted to travel", whyWrong: "Steerage way is about a minimum speed needed for control, not a maximum speed limit." },
  ],
  correctChoiceId: 'a',
  explanation: "A rudder only works if water is flowing across it. Steerage way is the minimum boat speed at which that flow is enough for the rudder to actually change the boat's heading. Backing down too slowly means the rudder has little or no effect, and prop walk or wind/current can dominate instead.",
  source: 'ASA 103 standard curriculum — steerage way',
},
{
  id: 'eng-turning-short-radius-technique',
  topic: 'engine-docking',
  concepts: ['turning-in-confined-space'],
  format: 'text',
  prompt: "In a tight space, what technique lets a single-engine boat turn in a notably shorter radius than steady forward power and full rudder alone?",
  choices: [
    { id: 'b', text: "Increasing forward throttle continuously with no rudder input", whyWrong: "Full throttle with no rudder does not tighten the turning radius the way alternating forward/reverse bursts with rudder input does." },
    { id: 'c', text: "Shutting the engine off entirely", whyWrong: "An engine that's off provides no thrust to help pivot the boat; this technique relies on active use of forward and reverse bursts." },
    { id: 'd', text: "This cannot be done on a single-engine boat", whyWrong: "Backing and filling is a standard single-engine technique specifically because most cruising boats have only one engine." },
    { id: 'a', text: "Alternating short bursts of forward and reverse power (sometimes called \"walking\" or \"backing and filling\") combined with the rudder to pivot the boat" },
  ],
  correctChoiceId: 'a',
  explanation: "\"Backing and filling\" — alternating short bursts of forward power with rudder over one way, then reverse power, walks the bow and stern back and forth to rotate the boat almost in place, achieving a much tighter turn than holding one direction of thrust with rudder alone.",
  source: 'ASA 103 standard curriculum — turning in confined spaces',
},
{
  id: 'eng-pivot-point-location',
  topic: 'engine-docking',
  concepts: ['pivot-point'],
  format: 'text',
  prompt: "Roughly where is a typical displacement sailboat's pivot point when turning under power at low speed?",
  choices: [
    { id: 'a', text: "Somewhere forward of amidships, meaning the stern swings through a wider arc than the bow during a turn" },
    { id: 'b', text: "Exactly at the transom", whyWrong: "The pivot point is typically well forward of the transom, not located right at the stern." },
    { id: 'c', text: "Exactly at the bow", whyWrong: "The pivot point is typically somewhat aft of the very bow, roughly forward of amidships, not right at the stem." },
    { id: 'd', text: "There is no such thing as a pivot point on a boat", whyWrong: "Boats do have a practical pivot point during a turn, which is why the stern is taught to swing out further than the bow." },
  ],
  correctChoiceId: 'a',
  explanation: "For most displacement sailboats moving slowly, the effective pivot point sits somewhat forward of amidships. Because of this, the stern swings through a wider arc than the bow during a turn — important to remember so the stern doesn't hit a dock or piling you were watching clear with the bow.",
  source: 'ASA 103 standard curriculum — turning and pivot point',
},
{
  id: 'eng-control-panel-id',
  topic: 'engine-docking',
  concepts: ['engine-controls'],
  format: 'visual',
  assetId: 'custom-engine-panel-throttle',
  prompt: "On the engine panel and control shown, what does the single lever typically control?",
  choices: [
    { id: 'd', text: "Only the bilge pump, unrelated to the engine", whyWrong: "The bilge pump is switched separately; this lever is the engine's combined throttle/shift control." },
    { id: 'a', text: "Both throttle (engine speed) and gear shift (forward/neutral/reverse) in one combined lever" },
    { id: 'b', text: "Only the ignition key function, with no other role", whyWrong: "The ignition/key switch is a separate control on the panel; the lever shown combines throttle and shift, a different function." },
    { id: 'c', text: "Only the steering, with no connection to the engine", whyWrong: "This lever is an engine control (throttle/shift), not part of the steering system." },
  ],
  correctChoiceId: 'a',
  explanation: "Many cruising boats use a single-lever control: pushing it forward from the neutral detent both engages forward gear and increases throttle as you push further; pulling it back does the same for reverse. The neutral position (usually a felt detent in the middle) disengages the transmission while still allowing you to rev the engine if needed.",
  source: 'ASA 103 standard curriculum — engine controls',
},
{
  id: 'eng-dock-wind-onto-approach',
  topic: 'engine-docking',
  concepts: ['docking-approach', 'docking-wind'],
  format: 'visual',
  assetId: 'custom-docking-wind',
  prompt: "With the wind blowing directly onto the dock as shown, what is the recommended approach technique?",
  choices: [
    { id: 'd', text: "Wind direction makes no difference to the approach", whyWrong: "Wind direction relative to the dock is one of the central factors in planning any docking approach." },
    { id: 'a', text: "Approach at a shallow angle and use light, controlled power to hold position, letting the wind help push the boat the last bit onto the dock" },
    { id: 'b', text: "Approach at high speed perpendicular to the dock", whyWrong: "A fast, perpendicular approach with wind pushing onto the dock gives little margin to slow down or correct, and is not the recommended technique." },
    { id: 'c', text: "Approach from directly downwind of the dock", whyWrong: "Approaching downwind of (i.e., beyond) the dock with wind blowing onto it would push the boat away from, not toward, a controlled approach; a shallow-angle approach is preferred." },
  ],
  correctChoiceId: 'a',
  explanation: "When wind blows onto the dock, it will naturally push the boat toward the dock during the final approach, so a shallow angle with light, controlled power lets the wind do some of the work while you retain control — rather than fighting a strong perpendicular approach that's hard to check in time.",
  source: 'ASA 103 standard curriculum — docking with wind',
},
{
  id: 'eng-dock-wind-off-approach',
  topic: 'engine-docking',
  concepts: ['docking-approach', 'docking-wind'],
  format: 'text',
  prompt: "If the wind is blowing directly off the dock (pushing the boat away from it), how should the approach generally be adjusted?",
  choices: [
    { id: 'a', text: "Use a steeper approach angle and more sustained power, since the wind will be working against you the whole way in" },
    { id: 'b', text: "Use the shallowest possible angle, as with a wind blowing onto the dock", whyWrong: "A very shallow angle works well when wind helps push you onto the dock, but with an off-dock wind pushing you away, a steeper approach with more commitment is generally needed." },
    { id: 'c', text: "Wind blowing off the dock has no effect on the approach", whyWrong: "An off-dock wind actively resists your approach and must be accounted for, not ignored." },
    { id: 'd', text: "Shut off the engine early and drift in", whyWrong: "Drifting with the engine off works against you when wind is actively pushing the boat away from the dock; sustained control is needed instead." },
  ],
  correctChoiceId: 'a',
  explanation: "With the wind blowing the boat away from the dock, you're fighting it the entire approach, so a steeper angle and more sustained power are typically needed to make progress toward the dock, with a plan (often a bow or stern line first) to get a line secured before the wind can carry you off again.",
  source: 'ASA 103 standard curriculum — docking with wind',
},
{
  id: 'eng-dock-current-parallel-approach',
  topic: 'engine-docking',
  concepts: ['docking-approach', 'docking-current'],
  format: 'visual',
  assetId: 'custom-docking-current',
  prompt: "With a current running parallel to the dock as shown, why does the boat approach bow-first into the current?",
  choices: [
    { id: 'a', text: "Approaching into the current lets the current itself help slow the boat, and gives better steerage control than approaching with the current pushing from behind" },
    { id: 'b', text: "It has no bearing on the approach; current direction can be ignored", whyWrong: "Current direction relative to the dock is a central planning factor for a docking approach, not something to ignore." },
    { id: 'c', text: "Approaching with the current behind the boat is always safer", whyWrong: "Approaching with a following current reduces steerage way relative to the water and makes the boat harder, not easier, to control and stop." },
    { id: 'd', text: "The boat should approach perpendicular to the current instead", whyWrong: "A perpendicular approach fights the current across the boat's beam, which is generally harder to control than approaching bow-first into it." },
  ],
  correctChoiceId: 'a',
  explanation: "Approaching into a current (bow pointed upstream) means the current works against the boat's forward motion, acting like a natural brake and giving the rudder more relative water flow for steerage. Approaching with a following current, by contrast, reduces the boat's speed through the water at a given speed over the ground, hurting steering and stopping control.",
  source: 'ASA 103 standard curriculum — docking with current',
},
{
  id: 'eng-dock-strongest-force-priority',
  topic: 'engine-docking',
  concepts: ['docking-approach', 'docking-wind', 'docking-current'],
  format: 'text',
  prompt: "When both wind and current are acting on the boat during a docking approach and they don't align, what is the general planning priority?",
  choices: [
    { id: 'a', text: "Identify whichever force (wind or current) is stronger and plan the approach primarily around managing that one, while accounting for the other" },
    { id: 'b', text: "Always plan around the wind and ignore current entirely", whyWrong: "Current can be the dominant force in some locations (e.g., strong tidal current with light wind), so it can't simply be ignored in favor of wind alone." },
    { id: 'c', text: "Always plan around the current and ignore wind entirely", whyWrong: "Wind can be the dominant force in other situations (e.g., a strong breeze with slack current), so it can't simply be ignored in favor of current alone." },
    { id: 'd', text: "Wind and current can never act on a boat at the same time", whyWrong: "Wind and current frequently act on a boat simultaneously, sometimes reinforcing and sometimes opposing each other." },
  ],
  correctChoiceId: 'a',
  explanation: "Since wind and current can pull a boat in different directions, the practical approach is to judge which one has the greater effect on your particular boat (a boat with a lot of windage may be dominated by wind even in decent current, while a deep-draft boat in a strong tidal current may be dominated by the current) and build the approach plan around managing that dominant force.",
  source: 'ASA 103 standard curriculum — docking with wind and current combined',
},
{
  id: 'eng-dock-spring-line-use',
  topic: 'engine-docking',
  concepts: ['spring-line'],
  format: 'text',
  prompt: "What is a spring line used for once the boat is alongside a dock?",
  choices: [
    { id: 'b', text: "It is used exclusively to hoist the mainsail", whyWrong: "Halyards hoist sails; a spring line is a dock line, an entirely different piece of equipment." },
    { id: 'c', text: "It replaces the need for both bow and stern lines", whyWrong: "A spring line supplements, rather than replaces, bow and stern lines — together they control the boat fully alongside a dock." },
    { id: 'd', text: "It is only used while anchoring, never while docking", whyWrong: "A spring line is specifically a docking/mooring-alongside line, not an anchoring line." },
    { id: 'a', text: "Running diagonally fore-and-aft, it restricts the boat's forward or backward movement along the dock and can be used with the engine to hold or ease the boat into position" },
  ],
  correctChoiceId: 'a',
  explanation: "A spring line runs diagonally between a point on the boat and a point on the dock, resisting fore-and-aft movement. Skippers also use a spring line actively, with the engine turning against it, to pivot the boat into or away from a dock in a controlled way — a useful technique in tight slips.",
  source: 'ASA 103 standard curriculum — docking lines',
},
{
  id: 'eng-dock-abort-goaround',
  topic: 'engine-docking',
  concepts: ['abort-and-go-around'],
  format: 'text',
  prompt: "Midway through a docking approach, the boat is clearly being pushed off line by a gust and won't make a safe landing at the intended spot. What is the appropriate response?",
  choices: [
    { id: 'b', text: "Continue committing to the original approach regardless of drift", whyWrong: "Forcing a compromised approach increases the risk of hitting the dock or another boat; aborting and re-approaching is the safer, standard response." },
    { id: 'c', text: "Cut the engine and let the boat drift to wherever the wind takes it", whyWrong: "Cutting power and drifting removes your ability to control the outcome, which is worse than a controlled abort and go-around." },
    { id: 'd', text: "Jump to the dock to physically catch the boat", whyWrong: "This is unsafe for the crew and does not address controlling a boat that's already off line; aborting the approach under power is the correct response." },
    { id: 'a', text: "Abort the approach, power away to a safe distance, reassess, and try again rather than forcing a bad approach" },
  ],
  correctChoiceId: 'a',
  explanation: "A core docking principle is that it's always acceptable, and usually wise, to abort a deteriorating approach: add power, clear away to open water, reassess the wind/current situation, and set up for another attempt rather than forcing contact with the dock.",
  source: 'ASA 103 standard curriculum — docking approach judgment',
},
{
  id: 'eng-mooring-approach-id',
  topic: 'engine-docking',
  concepts: ['mooring-approach'],
  format: 'visual',
  assetId: 'custom-mooring-approach',
  prompt: "The diagram shows a boat approaching a mooring ball. Why does the boat approach slowly, head to wind?",
  choices: [
    { id: 'c', text: "Speed should be kept high to counteract the wind", whyWrong: "A fast approach to a mooring risks overshooting or striking the mooring ball/other boats; a slow, controlled approach is correct." },
    { id: 'd', text: "Wind direction is irrelevant to a mooring approach", whyWrong: "Wind direction is central to planning a controlled mooring approach, just as it is for docking." },
    { id: 'a', text: "Approaching head to wind lets the boat stop close alongside the mooring under control, giving the crew at the bow time to reach the pendant with a boat hook" },
    { id: 'b', text: "Approaching downwind is always preferred for moorings", whyWrong: "Approaching downwind (with the wind pushing from behind) makes it hard to stop precisely at the mooring; head-to-wind is the standard, controllable approach." },
  ],
  correctChoiceId: 'a',
  explanation: "Approaching a mooring head to wind (or head to current, whichever is stronger) lets the wind's resistance help kill the boat's speed right where you want to stop, rather than overshoot or drift off sideways. A slow, controlled approach gives the crew at the bow time to hook and secure the mooring pendant.",
  source: 'ASA 103 standard curriculum — mooring approach',
},
{
  id: 'eng-mooring-speed-control',
  topic: 'engine-docking',
  concepts: ['mooring-approach'],
  format: 'text',
  prompt: "What is a common mistake to avoid when approaching a mooring ball?",
  choices: [
    { id: 'a', text: "Approaching too fast, so the boat overshoots the mooring or arrives with too much way on to stop safely" },
    { id: 'b', text: "Approaching too slowly, which is always dangerous", whyWrong: "A controlled, slow approach is the recommended technique — the common mistake taught against is approaching too fast, not too slow." },
    { id: 'c', text: "Having crew ready at the bow", whyWrong: "Having crew ready at the bow to grab the pendant is correct practice, not a mistake." },
    { id: 'd', text: "Checking wind direction before starting the approach", whyWrong: "Checking wind direction beforehand is a recommended step, not a mistake to avoid." },
  ],
  correctChoiceId: 'a',
  explanation: "The classic mooring-approach mistake is coming in too fast — the boat either overshoots the mooring ball entirely or arrives with too much momentum to stop cleanly, risking a collision with the mooring gear or a nearby boat. Slow, controlled speed with the engine ready to shift into reverse is the standard technique.",
  source: 'ASA 103 standard curriculum — mooring approach',
},
{
  id: 'eng-mooring-pendant-pickup',
  topic: 'engine-docking',
  concepts: ['mooring-pickup'],
  format: 'text',
  prompt: "Once the boat has stopped alongside the mooring ball, what is the immediate next step for the crew at the bow?",
  choices: [
    { id: 'c', text: "Deploy the boat's own anchor as well", whyWrong: "Picking up a mooring means using the mooring's ground tackle, not deploying your own separate anchor at the same time." },
    { id: 'd', text: "Wait for the wind to push the boat directly over the mooring with no action needed", whyWrong: "Passive waiting risks drifting off the mooring; the crew needs to actively retrieve and secure the pendant while the boat is in position." },
    { id: 'a', text: "Use a boat hook to retrieve the mooring pendant and secure it to the bow cleat before the boat drifts away" },
    { id: 'b', text: "Immediately shut off the engine before securing anything", whyWrong: "Securing the pendant first is the priority — shutting off the engine too early risks losing position before the boat is actually attached to the mooring." },
  ],
  correctChoiceId: 'a',
  explanation: "With the boat stopped close alongside, the bow crew reaches the pendant with a boat hook and secures it to a bow cleat promptly, before wind or current can carry the boat off the mooring again. Only once secured is the engine typically shut down.",
  source: 'ASA 103 standard curriculum — mooring approach and pickup',
},
{
  id: 'wx-forecast-sources',
  topic: 'marine-weather',
  format: 'text',
  prompt: "Before heading out, what is the most reliable way to get a current marine weather picture for your planned route?",
  choices: [
    { id: 'a', text: "Check NOAA Weather Radio (VHF WX channels) and the National Weather Service's marine forecast for your coastal zone" },
    { id: 'b', text: "Rely on yesterday's general TV weather forecast for the nearest inland city", whyWrong: "A general inland forecast from the previous day doesn't cover marine-specific hazards (sea state, wind over water) or reflect current conditions." },
    { id: 'c', text: "Judge conditions only by how the sky looks at the dock", whyWrong: "Local sky conditions at the dock don't reveal what's developing offshore or later in the day; an actual forecast product is needed." },
    { id: 'd', text: "Ask another boater who left the harbor a week earlier", whyWrong: "Conditions from a week ago have no bearing on today's forecast; marine weather changes day to day." },
  ],
  correctChoiceId: 'a',
  explanation: "The National Weather Service issues marine-specific forecast products (Coastal Waters Forecasts, Nearshore Marine Forecasts) covering wind, seas, and hazards, broadcast continuously over NOAA Weather Radio on dedicated VHF weather channels and published at weather.gov. This is the standard, current source for pre-departure planning.",
  source: 'NWS Marine Forecast products — weather.gov/marine',
},
{
  id: 'wx-forecast-pre-departure',
  topic: 'marine-weather',
  format: 'text',
  prompt: "Which combination of forecast elements matters most when deciding whether to depart on a coastal daysail?",
  choices: [
    { id: 'a', text: "Wind direction and speed (including gusts), sea state, and any timing for approaching fronts or thunderstorm risk" },
    { id: 'b', text: "Only the air temperature at the marina", whyWrong: "Air temperature alone says nothing about wind, sea state, or approaching hazards, which drive the go/no-go decision." },
    { id: 'c', text: "Only the tide tables", whyWrong: "Tides matter for depth and current planning but don't substitute for a wind/sea/hazard forecast." },
    { id: 'd', text: "Whether it rained the previous night", whyWrong: "Past rainfall doesn't predict today's wind, sea state, or storm risk." },
  ],
  correctChoiceId: 'a',
  explanation: "A useful pre-departure check combines forecast wind (direction, speed, and gust potential), expected sea state, and any timing for fronts, squalls, or thunderstorm development — the elements that actually affect a small sailboat's safety and comfort underway.",
  source: 'ASA 103 standard curriculum — marine weather planning',
},
{
  id: 'wx-forecast-products',
  topic: 'marine-weather',
  format: 'text',
  prompt: "For a boat sailing within about 20 nautical miles of shore, which NWS marine forecast product is most directly relevant?",
  choices: [
    { id: 'd', text: "A forecast for an inland lake in another state", whyWrong: "An unrelated inland forecast has no bearing on the boat's actual coastal location." },
    { id: 'a', text: "The Coastal Waters Forecast (or Nearshore Marine Forecast, where issued), covering nearby coastal and nearshore waters" },
    { id: 'b', text: "The Offshore Forecast for waters hundreds of miles out", whyWrong: "Offshore forecasts cover deep-water zones well beyond a coastal daysailor's typical range and aren't the most directly relevant product close to shore." },
    { id: 'c', text: "The aviation terminal forecast for the nearest airport", whyWrong: "Aviation forecasts are built for aircraft operations, not marine wind/sea conditions." },
  ],
  correctChoiceId: 'a',
  explanation: "NWS marine forecasts are zoned by distance from shore. Coastal Waters/Nearshore products cover the waters closest to shore where most ASA 103-level coastal cruising happens, while Offshore and High Seas forecasts cover progressively more distant waters.",
  source: 'NWS Marine Forecast zones — weather.gov/marine',
},
{
  id: 'wx-forecast-radio-channels',
  topic: 'marine-weather',
  format: 'text',
  prompt: "How does NOAA Weather Radio deliver marine forecasts to a boat underway?",
  choices: [
    { id: 'd', text: "Only through a paid satellite subscription", whyWrong: "NOAA Weather Radio is a free, continuous VHF broadcast; no subscription is required to receive it." },
    { id: 'a', text: "As a continuous, repeating broadcast on dedicated VHF weather channels, separate from the hailing and working channels used for boat-to-boat calls" },
    { id: 'b', text: "Only as a one-time broadcast at 6 a.m. each day", whyWrong: "NOAA Weather Radio broadcasts continuously on a repeating cycle, not as a single daily announcement." },
    { id: 'c', text: "On the same channel used to hail other vessels", whyWrong: "Weather broadcasts run on dedicated VHF weather (WX) channels, kept separate from the calling/hailing channels used to talk to other vessels." },
  ],
  correctChoiceId: 'a',
  explanation: "A VHF radio's WX channels tune to NOAA Weather Radio, which cycles continuously through the current marine forecast, observations, and any active warnings. It's separate from the channels used for hailing or working traffic between vessels.",
  source: 'NOAA Weather Radio — weather.gov/nwr',
},
{
  id: 'wx-forecast-recency',
  topic: 'marine-weather',
  format: 'text',
  prompt: "Why is it good practice to check the marine forecast again right before casting off, even if you checked it the night before?",
  choices: [
    { id: 'c', text: "Checking twice is only a legal requirement, not a safety one", whyWrong: "There's no such legal-only framing — the practical safety reason is that forecasts change, not a paperwork requirement." },
    { id: 'd', text: "The forecast never changes once issued", whyWrong: "Forecasts are reissued and revised on a regular schedule as new data comes in; they do change." },
    { id: 'a', text: "Forecasts are updated regularly and conditions can change meaningfully within a day, so the most current version is the one to plan around" },
    { id: 'b', text: "It isn't necessary — a forecast from the night before is always still accurate", whyWrong: "Marine forecasts are updated multiple times a day precisely because conditions and confidence can change; treating an old forecast as still current risks missing a real change." },
  ],
  correctChoiceId: 'a',
  explanation: "NWS marine forecasts are reissued multiple times per day. A forecast checked the night before may already be stale by departure time, so a final check just before getting underway gives the best available picture of what's actually expected.",
  source: 'ASA 103 standard curriculum — marine weather planning',
},
{
  id: 'wx-interp-wind-direction-shift',
  topic: 'marine-weather',
  format: 'text',
  prompt: "The forecast calls for wind to shift from southwest to northwest over the next several hours, with a temperature drop. What does this combination most likely indicate?",
  choices: [
    { id: 'a', text: "A cold front is passing through, which can bring a period of gusty, shifting wind as it moves through" },
    { id: 'b', text: "The forecast is describing a stable high-pressure system with no changes expected", whyWrong: "A sudden wind shift plus a temperature drop is the classic signature of a frontal passage, not a stable, unchanging pattern." },
    { id: 'c', text: "Sea state will be completely unaffected by this shift", whyWrong: "A frontal wind shift commonly brings a period of confused or building seas as the wind direction changes, so sea state is affected." },
    { id: 'd', text: "This pattern only occurs well offshore and never affects coastal sailors", whyWrong: "Cold front passages regularly affect coastal and inshore waters, not just the open ocean." },
  ],
  correctChoiceId: 'a',
  explanation: "A wind shift from southwest to northwest paired with falling temperature is a textbook sign of a cold front passage. Wind can be gusty and shift suddenly as the front passes, which is exactly the kind of near-term change a skipper should plan around.",
  source: 'ASA 103 standard curriculum — frontal weather interpretation',
},
{
  id: 'wx-interp-gusts-sustained',
  topic: 'marine-weather',
  concepts: ['sail-area-selection'],
  format: 'text',
  prompt: "A forecast reads 'winds 12 to 15 knots, gusts to 22 knots.' Which number should most influence how much sail area you carry?",
  choices: [
    { id: 'b', text: "The lower sustained value only, ignoring the gust figure entirely", whyWrong: "Ignoring the gust figure risks being caught overpowered when a gust actually hits, even though the sustained wind seemed moderate." },
    { id: 'c', text: "Neither number matters for sail selection", whyWrong: "Both matter, but planning around the gust figure is the more conservative and appropriate choice for what the boat must be able to handle." },
    { id: 'd', text: "The average of the two numbers, rounded down", whyWrong: "There's no standard practice of averaging and rounding down; the prudent approach is to plan for the higher gust value." },
    { id: 'a', text: "The higher gust value, since the boat and crew need to be able to handle the peak wind, not just the average" },
  ],
  correctChoiceId: 'a',
  explanation: "Gusts represent brief spikes above the sustained wind speed. A boat carrying sail sized only for the sustained wind can be knocked down or overpowered when a gust hits. Prudent sail selection accounts for the gust figure, not just the average.",
  source: 'ASA 103 standard curriculum — wind interpretation',
},
{
  id: 'wx-interp-visibility-change',
  topic: 'marine-weather',
  concepts: ['restricted-visibility'],
  format: 'text',
  prompt: "The forecast for the next few hours mentions visibility decreasing to one mile or less in patchy fog. What should this change in your preparation?",
  choices: [
    { id: 'd', text: "Turn off all lights to avoid being seen by other vessels", whyWrong: "Turning off lights in reduced visibility makes the boat harder for others to detect, increasing risk rather than reducing it." },
    { id: 'a', text: "Be ready to use sound signals for restricted visibility, slow down, post a lookout, and confirm any radar reflector or navigation aids are ready" },
    { id: 'b', text: "Nothing changes — visibility forecasts don't affect small-boat operations", whyWrong: "Reduced visibility directly affects collision avoidance and navigation; it requires real changes in how the boat is operated, including sound signals and lookout." },
    { id: 'c', text: "Increase speed to get through the foggy area as quickly as possible", whyWrong: "Increasing speed in reduced visibility increases collision risk rather than reducing it; the Navigation Rules call for a safe speed appropriate to the conditions." },
  ],
  correctChoiceId: 'a',
  explanation: "A forecast for decreasing visibility is a cue to prepare navigation-rules-compliant responses: fog signals, a safe (typically reduced) speed, an attentive lookout, and confirming any equipment that helps other vessels detect you, such as a radar reflector.",
  source: 'ASA 103 standard curriculum — weather and Navigation Rules restricted-visibility provisions',
},
{
  id: 'wx-interp-barometer-drop',
  topic: 'marine-weather',
  format: 'text',
  prompt: "You notice the barometer has been dropping steadily over the past several hours. What does this generally suggest?",
  choices: [
    { id: 'b', text: "Improving weather is guaranteed", whyWrong: "A falling barometer is generally associated with approaching unsettled or deteriorating weather, not guaranteed improvement." },
    { id: 'c', text: "The barometer reading has no relationship to weather changes", whyWrong: "Barometric pressure trends are a classic, long-used indicator of approaching weather systems." },
    { id: 'd', text: "It means the wind will immediately stop entirely", whyWrong: "A falling barometer more often precedes increasing wind associated with an approaching system, not a sudden calm." },
    { id: 'a', text: "Deteriorating weather may be approaching, often associated with an approaching low-pressure system or front" },
  ],
  correctChoiceId: 'a',
  explanation: "A steadily falling barometer is a classic sign that a low-pressure system or front is approaching, which is often accompanied by increasing wind, cloudiness, and a chance of precipitation. It's a useful supplementary cue alongside the official forecast.",
  source: 'ASA 103 standard curriculum — weather interpretation basics',
},
{
  id: 'wx-interp-wind-vs-forecast-mismatch',
  topic: 'marine-weather',
  concepts: ['sail-area-selection'],
  format: 'text',
  prompt: "You're underway and the actual wind is noticeably stronger than what this morning's forecast called for. What is the appropriate response?",
  choices: [
    { id: 'd', text: "Report the discrepancy to the Coast Guard immediately and abandon the outing", whyWrong: "A forecast being off isn't itself an emergency requiring a Coast Guard report; the appropriate response is prudent onboard reassessment, such as reducing sail." },
    { id: 'a', text: "Reassess the situation using current conditions rather than the stale forecast, and be ready to reduce sail or alter the plan" },
    { id: 'b', text: "Continue exactly as planned since the forecast is always right", whyWrong: "A forecast is a prediction, not a guarantee; when actual observed conditions diverge from it, the observed conditions should drive the decision." },
    { id: 'c', text: "Assume the wind will decrease back to the forecast value shortly and take no action", whyWrong: "Assuming conditions will match a stale forecast, without acting on what's actually happening, risks being caught unprepared if the stronger wind persists or builds further." },
  ],
  correctChoiceId: 'a',
  explanation: "Forecasts are the best available prediction, not a guarantee. A prudent skipper continuously compares actual conditions to the forecast and adjusts — reducing sail, changing course, or heading in — when reality is worse than predicted.",
  source: 'ASA 103 standard curriculum — ongoing weather assessment underway',
},
{
  id: 'wx-interp-sea-state-diagram',
  topic: 'marine-weather',
  concepts: ['sail-area-selection'],
  format: 'visual',
  assetId: 'custom-sea-state-diagram',
  prompt: "The diagram compares two sea states. What is the main practical implication of the rough-seas condition on the right for a small sailboat?",
  choices: [
    { id: 'a', text: "Steeper, closely-spaced waves reduce comfort and control, increasing pitching, spray, and the case for reducing sail or altering course" },
    { id: 'b', text: "Rough seas have no effect on boat handling as long as the wind speed is unchanged", whyWrong: "Sea state affects motion and control independently of wind speed alone — steep, close-spaced waves make the boat's motion more violent and harder to manage." },
    { id: 'c', text: "Rough seas always mean the wind has died down", whyWrong: "Rough seas are frequently associated with increased wind, not a lull, particularly when seas have been building." },
    { id: 'd', text: "Sea state is irrelevant to route or timing planning", whyWrong: "Sea state is one of the core factors, alongside wind, used to decide on routing, timing, and how much sail to carry." },
  ],
  correctChoiceId: 'a',
  explanation: "Steep, closely-spaced waves (as shown on the right) cause more pitching and spray and make the boat harder to control than the same wind over a calmer sea. Sea state, not just wind speed, is a key factor in deciding whether to reduce sail, change course, or delay departure.",
  source: 'ASA 103 standard curriculum — sea state interpretation',
},
{
  id: 'wx-interp-decision-scenario',
  topic: 'marine-weather',
  format: 'text',
  prompt: "You're three hours from the harbor and an updated forecast now calls for increasing wind and building seas over the next six hours, worse than expected earlier. What is the prudent decision?",
  choices: [
    { id: 'b', text: "Continue exactly as originally planned regardless of the update", whyWrong: "Ignoring a meaningful forecast update and continuing unchanged removes the safety margin the update was meant to provide." },
    { id: 'c', text: "Speed up to try to beat the worsening weather to the original destination no matter the distance", whyWrong: "Committing to reach a distant destination ahead of worsening weather, rather than choosing the nearest safe option, needlessly increases risk." },
    { id: 'd', text: "Wait until conditions actually deteriorate before making any decision", whyWrong: "Waiting for conditions to worsen before deciding removes the option of a calm, early course change and forces a decision under worse conditions." },
    { id: 'a', text: "Reassess the route and timing now, and consider heading to the nearest safe harbor rather than continuing toward the original, more distant destination" },
  ],
  correctChoiceId: 'a',
  explanation: "When new information shows conditions deteriorating faster or more than expected, the prudent move is to reassess early — heading for the nearest safe harbor rather than pressing on toward a more distant original destination — while there's still a comfortable safety margin.",
  source: 'ASA 103 standard curriculum — weather-driven decision making',
},
{
  id: 'wx-cb-photo-id',
  topic: 'marine-weather',
  format: 'visual',
  assetId: 'photo-cumulonimbus',
  prompt: "What cloud type is shown in this photograph, and what does it signal for a boat on the water?",
  choices: [
    { id: 'b', text: "Cirrus — a thin, wispy high-altitude cloud with no near-term weather significance", whyWrong: "Cirrus clouds are thin and wispy at high altitude; the tall, dense, towering cloud shown is characteristic of cumulonimbus, not cirrus." },
    { id: 'c', text: "Stratus — a flat, featureless low layer with steady light precipitation at most", whyWrong: "Stratus is a flat, low, featureless layer, not the towering vertical development shown in the photo." },
    { id: 'd', text: "This cloud type has no bearing on marine safety", whyWrong: "Cumulonimbus clouds are directly tied to some of the most hazardous near-term marine weather: sudden gusts, lightning, and heavy rain." },
    { id: 'a', text: "Cumulonimbus — a towering, dense cloud associated with thunderstorms, gusty squalls, heavy rain, and lightning" },
  ],
  correctChoiceId: 'a',
  explanation: "The tall, dense, vertically-developed cloud in the photo is a cumulonimbus — the thunderstorm cloud. Its approach warns of possible sudden wind shifts and gusts, lightning, heavy rain, and reduced visibility, all significant hazards for a small boat.",
  source: 'NOAA Photo Library — cumulonimbus imagery',
},
{
  id: 'wx-cb-risks',
  topic: 'marine-weather',
  format: 'text',
  prompt: "What are the main hazards a cumulonimbus (thunderstorm) cell poses to a small sailboat?",
  choices: [
    { id: 'a', text: "Sudden, strong wind shifts and gusts, lightning, heavy rain, and sharply reduced visibility, often arriving quickly" },
    { id: 'b', text: "A slow, gradual increase in wind with no sudden changes", whyWrong: "Thunderstorm cells are known for arriving and intensifying quickly, producing sudden gusts rather than a slow, gradual buildup." },
    { id: 'c', text: "Only a brief drop in temperature with no other effects", whyWrong: "A temperature drop can accompany a thunderstorm's outflow, but the more significant hazards are the sudden wind, lightning, rain, and visibility loss." },
    { id: 'd', text: "No meaningful hazard as long as the storm stays visually distant", whyWrong: "The gust front and wind shift associated with a thunderstorm cell can arrive well ahead of the visible rain and lightning, so distance alone isn't a reliable safety margin." },
  ],
  correctChoiceId: 'a',
  explanation: "Thunderstorm cells can bring sudden wind shifts and strong gusts (sometimes well ahead of the storm itself), lightning, torrential rain, and a rapid drop in visibility — a combination that can overwhelm a small boat caught unprepared.",
  source: 'ASA 103 standard curriculum — thunderstorm hazards',
},
{
  id: 'wx-cb-deterioration-signs',
  topic: 'marine-weather',
  format: 'text',
  prompt: "Which visual signs suggest a cumulonimbus cell is intensifying or about to hit your position?",
  choices: [
    { id: 'c', text: "Clear blue sky directly overhead with no clouds at all", whyWrong: "Clear sky with no clouds present shows no thunderstorm activity at all, not intensification." },
    { id: 'd', text: "A steady, unchanging wind from the same direction all afternoon", whyWrong: "A steady, unchanging wind is the opposite of the sudden shift typically associated with an approaching thunderstorm's outflow." },
    { id: 'a', text: "A darkening, lowering cloud base, an anvil-shaped top, and a sudden cooling or gusty shift in the wind" },
    { id: 'b', text: "A cloud that stays bright white and flat with no vertical growth", whyWrong: "A flat, non-growing cloud with no vertical development isn't the profile of an intensifying thunderstorm cell." },
  ],
  correctChoiceId: 'a',
  explanation: "A darkening and lowering cloud base, a flattened anvil top on an otherwise towering cloud, and a sudden cooler, gustier wind (the storm's outflow) are classic warning signs that a cell is intensifying and approaching.",
  source: 'ASA 103 standard curriculum — thunderstorm recognition',
},
{
  id: 'wx-cb-response',
  topic: 'marine-weather',
  format: 'text',
  prompt: "You see a thunderstorm cell developing and likely to reach your position. What is the prudent response while there's still time?",
  choices: [
    { id: 'c', text: "Anchor immediately regardless of location or holding ground", whyWrong: "Anchoring without regard to holding ground or surrounding hazards can create new risks; heading for shelter or a suitable safe area is the better general response." },
    { id: 'd', text: "Wait until the storm arrives before taking any preparatory action", whyWrong: "Waiting until the storm has already arrived removes the opportunity to reduce sail and secure the boat calmly, before conditions make it harder to do safely." },
    { id: 'a', text: "Reduce sail early, secure loose gear, close hatches, get crew into PFDs, and head for the nearest safe harbor or shelter if time allows" },
    { id: 'b', text: "Keep full sail up to try to outrun the storm", whyWrong: "Carrying full sail into a strengthening gust front risks being overpowered or knocked down; reducing sail early is the safer response." },
  ],
  correctChoiceId: 'a',
  explanation: "Prudent thunderstorm response starts before the storm arrives: reduce sail, stow and secure loose items, close up the boat, get crew into PFDs, and, if time and location allow, head toward shelter rather than waiting for conditions to deteriorate first.",
  source: 'ASA 103 standard curriculum — thunderstorm response',
},
{
  id: 'wx-cb-timing-lifecycle',
  topic: 'marine-weather',
  format: 'text',
  prompt: "Compared to a broad area of steady bad weather from a large low-pressure system, an individual thunderstorm cell typically is:",
  choices: [
    { id: 'd', text: "Identical in size and duration to a large frontal system", whyWrong: "A single cumulonimbus cell is much smaller and shorter-lived than the broad area covered by a frontal system." },
    { id: 'a', text: "Shorter-lived and localized, but capable of intense wind, rain, and lightning while it lasts" },
    { id: 'b', text: "Always longer-lasting than a large-scale storm system", whyWrong: "Individual thunderstorm cells are typically much shorter-lived than a broad, slow-moving low-pressure system, even though they can be locally intense." },
    { id: 'c', text: "Never associated with strong wind", whyWrong: "Thunderstorm cells are well known for producing strong, sudden gusts, sometimes stronger than the surrounding steady weather pattern." },
  ],
  correctChoiceId: 'a',
  explanation: "An individual cumulonimbus cell is typically localized and relatively short-lived (often passing within an hour or so), unlike the broader, longer-duration weather from a large frontal system — but its wind, rain, and lightning can be intense while the cell is overhead.",
  source: 'ASA 103 standard curriculum — thunderstorm cell characteristics',
},
{
  id: 'wx-sca-meaning',
  topic: 'marine-weather',
  format: 'text',
  prompt: "In practical terms, what does a Small Craft Advisory tell a sailor?",
  choices: [
    { id: 'c', text: "It only applies to personal watercraft, never to sailboats", whyWrong: "A Small Craft Advisory applies broadly to vessels that could be adversely affected by the conditions, not to one specific vessel type." },
    { id: 'd', text: "It guarantees calm conditions for the next 24 hours", whyWrong: "A Small Craft Advisory signals the opposite — hazardous conditions are expected, not calm ones." },
    { id: 'a', text: "Conditions are expected that could be hazardous to small vessels, so the decision to go out (or stay in) should be made with extra caution" },
    { id: 'b', text: "All boats, regardless of size or type, are legally barred from leaving the dock", whyWrong: "A Small Craft Advisory is a hazard advisory, not a legal prohibition on departing; it signals conditions warranting caution for smaller or less capable vessels." },
  ],
  correctChoiceId: 'a',
  explanation: "A Small Craft Advisory means the National Weather Service expects conditions (wind and/or seas) that could be hazardous to smaller or less seaworthy vessels. It's a heads-up for extra caution and careful judgment, not an automatic ban on all boating.",
  source: 'NWS Marine Forecast glossary — Small Craft Advisory',
},
{
  id: 'wx-sca-thresholds-vary',
  topic: 'marine-weather',
  format: 'text',
  prompt: "Is there a single, universal wind speed that triggers a Small Craft Advisory everywhere in the United States?",
  choices: [
    { id: 'c', text: "Yes, but only for the Great Lakes, and nowhere else", whyWrong: "Both coastal and Great Lakes offices set their own local criteria — the point is that thresholds vary regionally, not that only one region has locally-set criteria." },
    { id: 'd', text: "No advisory criteria exist anywhere; it is entirely subjective", whyWrong: "Each local Weather Forecast Office does define specific criteria for its area — the thresholds simply aren't identical from region to region." },
    { id: 'a', text: "No — the exact wind and sea criteria are set locally by each coastal or Great Lakes Weather Forecast Office based on regional conditions" },
    { id: 'b', text: "Yes, every NWS office nationwide uses exactly the same fixed wind-speed number", whyWrong: "Small Craft Advisory criteria are regionally defined; local Weather Forecast Offices set thresholds appropriate to their waters, so there is no single number that applies everywhere." },
  ],
  correctChoiceId: 'a',
  explanation: "Small Craft Advisory criteria are set locally: each coastal or Great Lakes Weather Forecast Office establishes wind and/or sea thresholds appropriate to typical conditions and vessel traffic in its own area. A sailor should check the specific criteria used by the local office rather than assume one number applies everywhere.",
  source: 'NWS Marine Forecast FAQ — weather.gov/marine/faq',
},
{
  id: 'wx-gale-warning-definition',
  topic: 'marine-weather',
  format: 'visual',
  assetId: 'nws-gale-pennant',
  prompt: "This daytime coastal warning-display signal (two red pennants stacked) means a Gale Warning is in effect. What does a Gale Warning specifically indicate?",
  choices: [
    { id: 'd', text: "A local advisory with a different definition at every Weather Forecast Office", whyWrong: "Unlike the regionally-set Small Craft Advisory, the Gale Warning wind range is a nationally defined category." },
    { id: 'a', text: "Sustained surface winds, or frequent gusts, in the range of roughly 34 to 47 knots, predicted or occurring" },
    { id: 'b', text: "Winds of less than 10 knots with calm seas", whyWrong: "That description is essentially the opposite of gale conditions, which involve strong sustained wind well above 10 knots." },
    { id: 'c', text: "A guarantee of hurricane-force wind", whyWrong: "Gale-force wind is a defined, lower range than hurricane-force wind; a Gale Warning does not itself indicate hurricane conditions." },
  ],
  correctChoiceId: 'a',
  explanation: "A Gale Warning is a nationally defined category for sustained winds, or frequent gusts, in the range of about 34 to 47 knots. It represents a step up in severity from a Small Craft Advisory and calls for serious caution.",
  source: 'NWS Marine Forecast glossary — Gale Warning',
},
{
  id: 'wx-warning-display-pennant',
  topic: 'marine-weather',
  format: 'visual',
  assetId: 'nws-smcraft-pennant',
  prompt: "This daytime coastal warning-display signal (a single red pennant) is flown at NWS coastal stations to indicate what?",
  choices: [
    { id: 'a', text: "A Small Craft Advisory is in effect" },
    { id: 'b', text: "A Gale Warning is in effect", whyWrong: "A Gale Warning is displayed as two red pennants stacked, not a single pennant." },
    { id: 'c', text: "A Hurricane Warning is in effect", whyWrong: "A Hurricane Warning uses a different signal (two red pennants over a black pennant), not a single red pennant." },
    { id: 'd', text: "All-clear, no advisories in effect", whyWrong: "The single red pennant is itself an active warning display, not an all-clear indicator." },
  ],
  correctChoiceId: 'a',
  explanation: "Under the NWS Coastal Warning Display Program, a single red pennant flown during the day signals a Small Craft Advisory. Gale, storm, and hurricane conditions use progressively different pennant combinations.",
  source: 'NWS Coastal Warning Display Program — weather.gov/marine/cwd',
},
{
  id: 'wx-advisory-decision',
  topic: 'marine-weather',
  format: 'text',
  prompt: "A Small Craft Advisory is in effect for your area as you're planning a coastal daysail on a 30-foot sailboat with a novice crew. What is the prudent approach?",
  choices: [
    { id: 'c', text: "Treat it as guaranteeing conditions will actually be calm", whyWrong: "The advisory signals expected hazardous conditions, the opposite of a guarantee of calm weather." },
    { id: 'd', text: "Automatically cancel any boating for a full week", whyWrong: "A Small Craft Advisory is tied to specific expected conditions over a defined period, not an automatic week-long restriction." },
    { id: 'a', text: "Treat it as a serious caution: consider postponing, or if you go, plan for a reduced-sail, conservative outing with an easy retreat to safe harbor" },
    { id: 'b', text: "Ignore the advisory since it technically only applies to very small boats like kayaks", whyWrong: "A Small Craft Advisory isn't limited to a narrow vessel category — a less experienced crew on a modestly sized sailboat can be exactly the kind of vessel it's meant to caution." },
  ],
  correctChoiceId: 'a',
  explanation: "A Small Craft Advisory means expected conditions could be hazardous to smaller or less capable vessels. With a novice crew, the prudent response is real caution: consider not going, or plan conservatively with reduced sail and an easy bailout to safe harbor if conditions build.",
  source: 'ASA 103 standard curriculum — advisory-driven decision making',
},
{
  id: 'wx-implication-lee-shore',
  topic: 'marine-weather',
  format: 'text',
  prompt: "You're anchored for lunch and notice the wind is building and blowing directly onto the nearby shore. Why does this matter?",
  choices: [
    { id: 'b', text: "It doesn't matter, since wind direction relative to shore has no effect on anchoring safety", whyWrong: "Wind direction relative to the shore is central to anchoring risk — an onshore wind removes your safety margin if you drag or lose power." },
    { id: 'c', text: "An onshore wind always means calmer water near the beach", whyWrong: "An onshore wind builds waves and chop against the shoreline rather than calming the water there." },
    { id: 'd', text: "Lee shore conditions only matter for vessels under sail, never under power", whyWrong: "A lee shore is a hazard regardless of whether the boat is under sail or power, since either can lose the ability to hold position." },
    { id: 'a', text: "A lee shore situation means that if the anchor drags or the boat loses power, wind and waves will push it toward danger rather than away from it" },
  ],
  correctChoiceId: 'a',
  explanation: "With wind blowing onto the shore (a lee shore), any drag, engine failure, or loss of control tends to push the boat toward the shore rather than away from it, sharply reducing the margin for error. Building wind onto a lee shore is a strong cue to reposition or leave.",
  source: 'ASA 103 standard curriculum — lee shore hazard',
},
{
  id: 'wx-implication-margin',
  topic: 'marine-weather',
  format: 'text',
  prompt: "As wind and seas build through the afternoon, your safety margin for handling an unexpected problem (gear failure, injury, navigation error) generally:",
  choices: [
    { id: 'd', text: "Is unrelated to weather and depends only on crew mood", whyWrong: "While crew state matters, deteriorating weather itself measurably reduces the room for error, independent of morale." },
    { id: 'a', text: "Shrinks, since deteriorating conditions leave less room to safely absorb an additional problem" },
    { id: 'b', text: "Grows, since rougher conditions make problems easier to manage", whyWrong: "Rougher conditions generally make any additional problem harder, not easier, to manage safely." },
    { id: 'c', text: "Stays exactly the same regardless of weather", whyWrong: "Weather conditions directly affect how much spare capacity the crew and boat have to handle an unplanned problem, so the margin does change." },
  ],
  correctChoiceId: 'a',
  explanation: "As conditions worsen, the boat and crew have less spare capacity to absorb an unexpected complication on top of the weather itself. Recognizing this shrinking margin is a key reason to make conservative decisions — like turning back — earlier rather than later.",
  source: 'ASA 103 standard curriculum — risk margin and decision timing',
},
{
  id: 'wx-implication-crew-fatigue',
  topic: 'marine-weather',
  format: 'text',
  prompt: "Sea state has been building for an hour and part of the crew is now seasick and fatigued. How should this factor into your decisions?",
  choices: [
    { id: 'a', text: "As a real factor — a struggling crew reduces the boat's overall capability and argues for a more conservative plan, such as heading in early" },
    { id: 'b', text: "It shouldn't factor in at all, since only wind and sea state matter", whyWrong: "Crew condition directly affects how safely the boat can be handled; it's a legitimate part of the overall risk picture, not something to disregard." },
    { id: 'c', text: "Seasickness always resolves itself quickly with no need to change plans", whyWrong: "Seasickness and fatigue can persist and worsen, and assuming automatic quick recovery ignores a real safety consideration." },
    { id: 'd', text: "The skipper should ignore crew condition to avoid seeming overly cautious", whyWrong: "Disregarding crew welfare to appear less cautious runs against prudent seamanship, which explicitly weighs crew capability in decision-making." },
  ],
  correctChoiceId: 'a',
  explanation: "Crew capability is part of the overall safety picture, not separate from it. A seasick, fatigued crew is less able to help handle sails, react to problems, or assist each other, which strengthens the case for a conservative decision like shortening the outing.",
  source: 'ASA 103 standard curriculum — crew condition and decision making',
},
{
  id: 'wx-implication-plan-change',
  topic: 'marine-weather',
  format: 'text',
  prompt: "Midway through a passage, an updated forecast shows conditions will be considerably worse than expected by the time you'd reach your original destination. What is the appropriate response?",
  choices: [
    { id: 'b', text: "Continue to the original destination no matter what, since changing plans reflects poorly on the skipper", whyWrong: "Rigidly continuing toward a destination despite new information about worsening conditions puts pride ahead of safety, which is exactly the wrong priority." },
    { id: 'c', text: "Assume forecast updates mid-passage are never worth acting on", whyWrong: "A forecast update is exactly the kind of new information a prudent skipper should act on, not dismiss." },
    { id: 'd', text: "Immediately call for a Coast Guard rescue as a precaution", whyWrong: "A worsening forecast on its own isn't a distress situation requiring rescue; the appropriate response is proactively altering the plan, not calling for help prematurely." },
    { id: 'a', text: "Reevaluate the plan and consider diverting to a closer, safe alternative rather than pressing on to the original destination" },
  ],
  correctChoiceId: 'a',
  explanation: "Good passage planning is adaptive. When new forecast information shows conditions will be worse than planned for, altering course toward the nearest safe alternative — rather than committing to the original destination out of habit — is the mark of good seamanship.",
  source: 'ASA 103 standard curriculum — adaptive passage planning',
},
{
  id: 'sail-select-light-air',
  topic: 'sail-trim',
  concepts: ['sail-area-selection'],
  format: 'text',
  prompt: "In light air (roughly 5 knots true wind or less), what sail plan generally makes the most sense?",
  choices: [
    { id: 'b', text: "A deeply reefed mainsail with a small headsail", whyWrong: "Reducing sail area is a response to too much wind, not too little; in light air a boat needs more sail area to develop power, not less." },
    { id: 'c', text: "No headsail at all, mainsail only", whyWrong: "Dropping the headsail in light air removes usable sail area exactly when the boat needs all the power it can get." },
    { id: 'd', text: "It makes no difference what sail plan is used in light air", whyWrong: "Sail plan matters a great deal in light air — insufficient sail area means the boat struggles to develop any power at all." },
    { id: 'a', text: "Full mainsail and full genoa (or largest headsail available), to capture as much of the light wind as possible" },
  ],
  correctChoiceId: 'a',
  explanation: "In light air, the priority is maximizing usable sail area to generate power from what little wind is available, so full main and full headsail is the standard light-air plan.",
  source: 'ASA 103 standard curriculum — sail selection by wind strength',
},
{
  id: 'sail-select-moderate',
  topic: 'sail-trim',
  concepts: ['sail-area-selection'],
  format: 'text',
  prompt: "In a moderate breeze (roughly 10 to 15 knots) with a comfortable, controllable heel angle, what is the typical sail plan?",
  choices: [
    { id: 'b', text: "The mainsail should already be reefed at this wind speed on every boat", whyWrong: "Reefing needs vary by boat and crew, but a moderate breeze with comfortable heel typically doesn't require reefing yet; full sail is the usual plan at this stage." },
    { id: 'c', text: "All sail should be dropped and the engine used instead", whyWrong: "A moderate, comfortable breeze is good sailing wind — there's no reason to drop sail and motor instead." },
    { id: 'd', text: "Only the headsail should be used, with the mainsail furled away", whyWrong: "Sailing on headsail alone in a comfortable moderate breeze discards usable power and balance the mainsail provides; full sail plan is appropriate." },
    { id: 'a', text: "Full mainsail and full headsail, trimmed for the conditions, with no need to reef yet" },
  ],
  correctChoiceId: 'a',
  explanation: "In a moderate breeze producing comfortable, controllable heel, most cruising boats sail well under full main and full headsail. Reefing becomes appropriate as wind builds further or heel/control starts to suffer.",
  source: 'ASA 103 standard curriculum — sail selection by wind strength',
},
{
  id: 'sail-select-increasing-early',
  topic: 'sail-trim',
  concepts: ['sail-area-selection'],
  format: 'text',
  prompt: "The wind has been steadily building for the last twenty minutes and shows no sign of leveling off. What is the prudent approach to sail area?",
  choices: [
    { id: 'a', text: "Reduce sail early, before the boat becomes overpowered or hard to control, rather than waiting until it's a struggle" },
    { id: 'b', text: "Wait until the boat is already overpowered before considering any reduction", whyWrong: "Waiting until the boat is already struggling makes reducing sail more difficult and less safe than acting early." },
    { id: 'c', text: "Add more sail area to compensate for the building wind", whyWrong: "Adding sail area as wind builds moves in the wrong direction — more wind calls for less sail area, not more." },
    { id: 'd', text: "Sail area should never change once set for the day", whyWrong: "Sail area is expected to change as conditions change through the day; treating it as fixed ignores basic seamanship practice." },
  ],
  correctChoiceId: 'a',
  explanation: "\"Reef early\" is a core seamanship principle: reducing sail while conditions are still manageable is far safer and easier than waiting until the boat is already overpowered, when reducing sail becomes harder and riskier.",
  source: 'ASA 103 standard curriculum — sail selection by wind strength',
},
{
  id: 'sail-select-signs-to-reduce',
  topic: 'sail-trim',
  concepts: ['sail-area-selection'],
  format: 'text',
  prompt: "Which combination of signs on board suggests it's time to reduce sail?",
  choices: [
    { id: 'd', text: "A clear sky with no clouds", whyWrong: "Sky condition isn't a direct indicator of whether the boat is currently overpowered." },
    { id: 'a', text: "Increasing heel angle, rounding up or fighting the helm (weather helm), frequent spray over the bow, and a generally uneasy motion" },
    { id: 'b', text: "The boat sailing flat with light, easy helm and a comfortable motion", whyWrong: "That description is exactly what a well-matched sail plan looks like — it's a sign sail area is currently appropriate, not a sign to reduce it." },
    { id: 'c', text: "The GPS showing a steady speed over ground", whyWrong: "Steady speed over ground on its own doesn't indicate anything about heel, helm balance, or crew comfort — it isn't the relevant signal here." },
  ],
  correctChoiceId: 'a',
  explanation: "Increasing heel, a heavy or hard-to-hold helm (excess weather helm), spray coming aboard, and an uneasy motion are all signs the boat is carrying more sail than the conditions call for, and it's time to reduce.",
  source: 'ASA 103 standard curriculum — signs of being overpowered',
},
{
  id: 'sail-select-visual-diagram',
  topic: 'sail-trim',
  concepts: ['sail-area-selection'],
  format: 'visual',
  assetId: 'custom-sail-wind-strength',
  prompt: "The diagram shows sail plans for three wind strengths. What is the general pattern from left to right?",
  choices: [
    { id: 'd', text: "Sail choice has no relationship to wind strength", whyWrong: "Sail choice is directly driven by wind strength — that relationship is the whole point of the diagram." },
    { id: 'a', text: "As wind strength increases, sail area is progressively reduced (full sail in light air, to a reefed main and smaller headsail in strong wind)" },
    { id: 'b', text: "Sail area should increase as wind strength increases", whyWrong: "That's backwards — as wind strength increases, sail area is reduced, not increased, to keep the boat manageable." },
    { id: 'c', text: "Heel angle stays exactly the same across all three wind strengths", whyWrong: "The diagram shows heel changing as sail plan and wind strength change, not staying constant." },
  ],
  correctChoiceId: 'a',
  explanation: "The diagram illustrates the basic progression: full main and genoa in light air, the same full plan carried comfortably in moderate wind, then a reefed main with a smaller headsail as wind strength increases further to keep heel and control manageable.",
  source: 'ASA 103 standard curriculum — sail selection by wind strength',
},
{
  id: 'sail-select-genoa-vs-jib',
  topic: 'sail-trim',
  concepts: ['sail-area-selection'],
  format: 'text',
  prompt: "As wind builds through the day, why might a skipper switch from a large genoa to a smaller working jib (if the boat has that option)?",
  choices: [
    { id: 'c', text: "Headsail size has no effect on heel or helm balance", whyWrong: "Headsail size directly affects how much heeling force and drive the boat generates, and can affect helm balance as well." },
    { id: 'd', text: "Switching headsails is done purely for cosmetic reasons", whyWrong: "Headsail choice is a functional decision about matching sail area to conditions, not a cosmetic one." },
    { id: 'a', text: "A smaller headsail reduces overall sail area and heeling force, keeping the boat more manageable in stronger wind" },
    { id: 'b', text: "A smaller headsail always produces more power than a larger one", whyWrong: "A smaller sail generally produces less power, not more, for a given wind speed — that reduction is exactly why it suits stronger wind." },
  ],
  correctChoiceId: 'a',
  explanation: "A smaller working jib carries less sail area than a large genoa, which reduces heeling force and keeps the boat easier to control as wind increases — the same reasoning behind reefing the mainsail.",
  source: 'ASA 103 standard curriculum — headsail selection',
},
{
  id: 'sail-select-combo-heavy',
  topic: 'sail-trim',
  concepts: ['sail-area-selection'],
  format: 'text',
  prompt: "In heavy air, what combination of sail area is generally appropriate for a cruising sailboat?",
  choices: [
    { id: 'c', text: "No sail at all, motoring exclusively regardless of conditions", whyWrong: "Dropping all sail is one option in extreme conditions, but the general heavy-air answer at ASA 103 level is reducing (not eliminating) sail area to a manageable combination." },
    { id: 'd', text: "Mainsail dropped entirely with the headsail left at full size", whyWrong: "Losing the mainsail while keeping a full headsail up removes the balancing sail and can leave the boat harder, not easier, to control." },
    { id: 'a', text: "A reefed mainsail paired with a smaller headsail (or partially furled genoa), reducing overall sail area to match the wind" },
    { id: 'b', text: "Full main and full genoa, since more sail always sails faster", whyWrong: "In heavy air, carrying full sail area typically overpowers the boat rather than sailing it faster or safer; reduced sail area is the appropriate response." },
  ],
  correctChoiceId: 'a',
  explanation: "The standard heavy-air combination is a reduced (reefed) mainsail together with a smaller headsail, matching total sail area to the wind so the boat stays balanced and controllable rather than overpowered.",
  source: 'ASA 103 standard curriculum — heavy-air sail combinations',
},
{
  id: 'sail-select-conservative-principle',
  topic: 'sail-trim',
  concepts: ['sail-area-selection'],
  format: 'text',
  prompt: "Which general principle best summarizes prudent sail-carrying practice on a cruising boat?",
  choices: [
    { id: 'a', text: "When in doubt, shorten sail — it's easier and safer to shake out a reef later than to fight an overpowered boat" },
    { id: 'b', text: "Always carry maximum sail area regardless of conditions to maximize speed", whyWrong: "Maximizing sail area regardless of conditions is exactly the overpowered situation prudent seamanship avoids." },
    { id: 'c', text: "Sail area decisions should be made once at the start of the season and never revisited", whyWrong: "Sail area is adjusted continuously as conditions change through a day, not set once for an entire season." },
    { id: 'd', text: "Reefing is a sign of poor sailing skill and should be avoided", whyWrong: "Reefing is a normal, prudent seamanship practice, not a sign of poor skill — the opposite view (over-carrying sail) is the actual risk." },
  ],
  correctChoiceId: 'a',
  explanation: "\"When in doubt, shorten sail\" is a widely taught cruising principle: reducing sail costs little if it turns out to be unnecessary, while carrying too much sail into worsening conditions can quickly become dangerous.",
  source: 'ASA 103 standard curriculum — sail-carrying principles',
},
{
  id: 'sail-furl-photo-id',
  topic: 'sail-trim',
  concepts: ['roller-furling'],
  format: 'visual',
  assetId: 'photo-furled-headsail',
  prompt: "The photo shows a roller-furling drum at the base of a genoa's headstay. What is this system primarily used for?",
  choices: [
    { id: 'c', text: "Controlling the boat's rudder", whyWrong: "This hardware is sail-handling gear for the headsail, not part of the steering system." },
    { id: 'd', text: "Adjusting the anchor rode", whyWrong: "This is rigging for the headsail, not ground tackle for anchoring." },
    { id: 'a', text: "Rolling the headsail up around the headstay to reduce its exposed area (or stow it entirely) without leaving the cockpit" },
    { id: 'b', text: "Hoisting the mainsail up the mast", whyWrong: "This is a headsail furling system on the headstay, unrelated to hoisting the mainsail on the mast." },
  ],
  correctChoiceId: 'a',
  explanation: "A roller-furling headsail rolls up around the headstay via the drum at its base, letting the crew reduce (or fully stow) headsail area from the cockpit without going forward to douse and flake a hanked-on sail.",
  source: 'Wikimedia Commons — roller furling headsail photograph',
},
{
  id: 'sail-furl-shape-change',
  topic: 'sail-trim',
  concepts: ['roller-furling'],
  format: 'text',
  prompt: "When a roller-furling genoa is partially rolled up to reduce its area, what typically happens to its shape?",
  choices: [
    { id: 'b', text: "The sail shape becomes more efficient the more it is furled", whyWrong: "Partial furling generally distorts the sail's designed shape and makes it progressively baggier, the opposite of more efficient." },
    { id: 'c', text: "Furling has no effect on sail shape at all", whyWrong: "Rolling a headsail around the headstay changes its draft and shape; it isn't shape-neutral." },
    { id: 'd', text: "The sail automatically flattens itself into a perfect shape regardless of how much is rolled", whyWrong: "There's no automatic self-flattening; a heavily furled genoa typically becomes distorted rather than optimally shaped." },
    { id: 'a', text: "The sail tends to become baggier and less efficient than its designed shape, especially when furled a lot" },
  ],
  correctChoiceId: 'a',
  explanation: "Standard roller-furling headsails aren't purpose-built reefing sails; as more area is rolled away, the remaining shape tends to get baggier and less efficient, which is part of why deeply furling isn't the same as a proper reef.",
  source: 'ASA 103 standard curriculum — roller-furling characteristics',
},
{
  id: 'sail-furl-when-to-use',
  topic: 'sail-trim',
  concepts: ['roller-furling'],
  format: 'text',
  prompt: "What is a key practical advantage of a roller-furling headsail in building wind?",
  choices: [
    { id: 'd', text: "It eliminates any need to watch wind conditions", whyWrong: "Roller furling is a tool for responding to wind, not a substitute for monitoring conditions in the first place." },
    { id: 'a', text: "The crew can quickly reduce headsail area from the cockpit without going forward on a moving, possibly wet deck" },
    { id: 'b', text: "It permanently improves the sail's efficiency compared to a hanked-on sail", whyWrong: "The advantage is convenience and control from the cockpit, not improved aerodynamic efficiency compared to a well-set hanked sail." },
    { id: 'c', text: "It removes the need to ever change headsail size again", whyWrong: "Furling reduces area on the same sail; it doesn't replace the value of a properly sized sail for very different conditions." },
  ],
  correctChoiceId: 'a',
  explanation: "The main practical benefit of roller furling is being able to reduce headsail area (or douse it entirely) quickly and safely from the cockpit, without sending crew forward onto a pitching foredeck.",
  source: 'ASA 103 standard curriculum — roller furling advantages',
},
{
  id: 'sail-furl-limitations',
  topic: 'sail-trim',
  concepts: ['roller-furling'],
  format: 'text',
  prompt: "What is a limitation of using a standard roller-furling genoa as your only means of reducing headsail area in strong wind?",
  choices: [
    { id: 'a', text: "Rolled deeply, the sail sets poorly (baggy, hard to control) and doesn't perform like a purpose-built reduced sail" },
    { id: 'b', text: "There is no limitation; a furled headsail performs identically at any amount of roll", whyWrong: "Performance does change with the amount of roll, especially degrading once a significant portion of the sail is furled away." },
    { id: 'c', text: "Roller furling can only be used to increase sail area, never decrease it", whyWrong: "Roller furling is used specifically to decrease exposed sail area by rolling the sail up; it doesn't add area." },
    { id: 'd', text: "Furling automatically strengthens the sail material in strong wind", whyWrong: "Furling doesn't change the sail's material strength; it only changes how much of the sail is exposed." },
  ],
  correctChoiceId: 'a',
  explanation: "Because ordinary roller-furling genoas aren't cut as true reefing sails, rolling them up significantly leaves a baggy, less controllable shape, so many skippers prefer switching to a smaller, purpose-cut headsail for sustained strong wind rather than relying solely on deep furling.",
  source: 'ASA 103 standard curriculum — roller furling limitations',
},
{
  id: 'sail-furl-load-control',
  topic: 'sail-trim',
  concepts: ['roller-furling'],
  format: 'text',
  prompt: "What is the correct technique when furling a headsail in a fresh breeze?",
  choices: [
    { id: 'd', text: "The sheet is irrelevant to the furling process", whyWrong: "The sheet is actively eased and controlled during furling; it plays a direct role in how cleanly the sail rolls up." },
    { id: 'a', text: "Ease the sheet in a controlled manner while pulling in the furling line, keeping tension so the sail rolls up smoothly rather than flogging" },
    { id: 'b', text: "Release the sheet completely and let it run free before furling", whyWrong: "Letting the sheet run completely free allows the sail to flog uncontrolled, which is exactly what controlled furling technique avoids." },
    { id: 'c', text: "Furl as fast as possible with no attention to the sheet", whyWrong: "Furling quickly without managing the sheet risks an uneven, loose roll and unnecessary flogging or chafe." },
  ],
  correctChoiceId: 'a',
  explanation: "Controlled furling means easing the sheet in step with pulling the furling line, keeping enough tension on the sail so it rolls up tightly and evenly rather than flogging loose and wearing on the rig.",
  source: 'ASA 103 standard curriculum — furling technique',
},
{
  id: 'sail-reef-when-why',
  topic: 'sail-trim',
  concepts: ['reefing'],
  format: 'text',
  prompt: "In general terms, when should you reef the mainsail?",
  choices: [
    { id: 'a', text: "Before the boat becomes overpowered — when wind is building and heel, weather helm, or crew comfort is starting to suffer" },
    { id: 'b', text: "Only after the boat has already broached or lost control", whyWrong: "Waiting until after losing control is far too late; reefing is meant to happen before the boat is overpowered, not as a reaction to a broach." },
    { id: 'c', text: "Only when there is zero wind", whyWrong: "Reefing reduces sail area for too much wind, not too little; there's no reason to reef in no wind at all." },
    { id: 'd', text: "Reefing should never be done on a cruising sailboat", whyWrong: "Reefing is a standard, expected part of cruising sail handling as conditions build, not something to avoid." },
  ],
  correctChoiceId: 'a',
  explanation: "The right time to reef is proactive: as wind builds and the boat starts to show signs of being overpowered (excess heel, heavy helm, discomfort), reefing early keeps the boat controllable rather than waiting for a struggle.",
  source: 'ASA 103 standard curriculum — reefing timing',
},
{
  id: 'sail-reef-effect-heel',
  topic: 'sail-trim',
  concepts: ['reefing'],
  format: 'text',
  prompt: "What effect does reefing the mainsail have on the boat's heel and control?",
  choices: [
    { id: 'c', text: "It has no effect on the helm at all", whyWrong: "Reducing mainsail area, and the heel that comes with it, typically changes helm balance, often reducing excess weather helm." },
    { id: 'd', text: "It makes the boat completely uncontrollable", whyWrong: "Reefing is done specifically to improve control in strong wind, not to make the boat uncontrollable." },
    { id: 'a', text: "It reduces heeling force and generally makes the helm lighter and more balanced, improving control" },
    { id: 'b', text: "It always increases heel angle", whyWrong: "Reducing sail area reduces the heeling force the sail generates, so heel typically decreases, not increases, after reefing." },
  ],
  correctChoiceId: 'a',
  explanation: "By reducing the mainsail's exposed area, reefing lowers the heeling force it generates, which typically flattens the boat, lightens the helm, and restores a more balanced, controllable feel in building wind.",
  source: 'ASA 103 standard curriculum — reefing effects',
},
{
  id: 'sail-reef-diagram',
  topic: 'sail-trim',
  concepts: ['reefing'],
  format: 'visual',
  assetId: 'custom-reefed-mainsail',
  prompt: "The diagram compares a full mainsail to the same sail with a reef tied in. What has changed?",
  choices: [
    { id: 'a', text: "The foot of the sail has been brought down and secured to a reef point on the boom, reducing the sail's total exposed area" },
    { id: 'b', text: "The sail has been replaced with a completely different, smaller sail", whyWrong: "Reefing reduces area on the same sail using its built-in reef points; it doesn't involve swapping to a different sail." },
    { id: 'c', text: "The mast has been shortened", whyWrong: "Reefing doesn't change the mast; it changes how much of the existing sail is exposed to the wind." },
    { id: 'd', text: "Nothing has changed between the two sails shown", whyWrong: "The diagram specifically shows a clear reduction in exposed sail area between the full and reefed versions." },
  ],
  correctChoiceId: 'a',
  explanation: "Reefing brings a row of reef points (cringles) down to the boom and secures them, effectively shortening the sail's luff and foot and reducing the total area exposed to the wind, as shown by the smaller, secured sail on the right.",
  source: 'ASA 103 standard curriculum — reefing mechanics',
},
{
  id: 'sail-reef-sequence-concept',
  topic: 'sail-trim',
  concepts: ['reefing'],
  format: 'text',
  prompt: "At a conceptual level, what is the basic sequence of tying in a reef?",
  choices: [
    { id: 'c', text: "Remove the mainsail from the mast entirely and reattach a smaller one", whyWrong: "Reefing works with the sail's built-in reef points on the same sail; it doesn't require removing and replacing the sail." },
    { id: 'd', text: "There is no general sequence — it varies with no common pattern across boats", whyWrong: "While specific hardware differs by boat, the basic sequence of easing, lowering to the reef point, securing tack/clew, and re-tensioning is broadly common." },
    { id: 'a', text: "Ease the halyard and main sheet, bring the sail down to the reef point, secure the new tack and clew, then re-tension the halyard and leech" },
    { id: 'b', text: "Tighten the halyard further without lowering the sail at all", whyWrong: "Reefing requires lowering the sail to the reef point first, not simply adding more halyard tension to the fully-hoisted sail." },
  ],
  correctChoiceId: 'a',
  explanation: "At the concept level (independent of a specific boat's hardware), reefing follows a common pattern: ease the halyard and sheet, lower the sail to the reef points, secure the new tack and clew at the boom, then re-tension the halyard and flatten the new foot/leech.",
  source: 'ASA 103 standard curriculum — reefing sequence',
},
{
  id: 'sail-reef-early-principle',
  topic: 'sail-trim',
  concepts: ['reefing'],
  format: 'text',
  prompt: "Why do experienced sailors often say it's better to reef before you think you need to, rather than after?",
  choices: [
    { id: 'a', text: "Reefing is much easier and safer to do while conditions are still manageable than after the boat is already overpowered and hard to control" },
    { id: 'b', text: "Reefing early always makes the boat go faster", whyWrong: "Reefing typically reduces power and speed in the sail area sense; the reason to reef early is safety and control, not extra speed." },
    { id: 'c', text: "There is no real difference between reefing early or late", whyWrong: "There's a meaningful practical difference — reefing while conditions are manageable is far safer than trying to reef an already-overpowered, hard-to-control boat." },
    { id: 'd', text: "Reefing late is always safer because it wastes less time", whyWrong: "Delaying a reef until the boat is struggling makes the maneuver itself harder and riskier, not safer." },
  ],
  correctChoiceId: 'a',
  explanation: "A boat that's already overpowered is harder and more hazardous to reef — the crew is working against heavy loads, heel, and motion. Reefing while conditions are still manageable is quicker, safer, and easier to execute well.",
  source: 'ASA 103 standard curriculum — reefing timing principle',
},
{
  id: 'sail-heave-purpose',
  topic: 'sail-trim',
  concepts: ['heaving-to'],
  format: 'text',
  prompt: "What is the main purpose of heaving-to?",
  choices: [
    { id: 'b', text: "To make the boat sail as fast as possible", whyWrong: "Heaving-to is meant to slow the boat and stabilize its motion, not to maximize speed." },
    { id: 'c', text: "To permanently anchor the boat without ground tackle", whyWrong: "Heaving-to doesn't fix the boat in place like anchoring; it still drifts slowly, just in a relatively controlled, stable way." },
    { id: 'd', text: "It serves no practical purpose on a cruising sailboat", whyWrong: "Heaving-to is a genuinely useful cruising technique for rest, weather, or on-deck tasks, not a purposeless maneuver." },
    { id: 'a', text: "To bring the boat to a relatively stable, slow-moving state — useful for resting the crew, riding out weather, or handling a task like reefing or a repair" },
  ],
  correctChoiceId: 'a',
  explanation: "Heaving-to balances the sails and rudder so the boat settles into a relatively stable, slow-drifting state. It's commonly used to rest the crew, ride out a squall or heavy weather, or free hands for a task like reefing, navigating, or a minor repair.",
  source: 'ASA 103 standard curriculum — heaving-to purpose',
},
{
  id: 'sail-heave-diagram',
  topic: 'sail-trim',
  concepts: ['heaving-to'],
  format: 'visual',
  assetId: 'custom-heaving-to',
  prompt: "The diagram shows a boat hove-to. What combination of sail and rudder produces this state?",
  choices: [
    { id: 'c', text: "No sails set at all, under bare poles with the engine running", whyWrong: "Heaving-to as shown uses a backed jib and sheeted main, not bare poles under engine power." },
    { id: 'd', text: "The mainsail dropped completely with only the jib flying free", whyWrong: "The diagram shows the mainsail sheeted in, not dropped, working together with the backed jib and helm." },
    { id: 'a', text: "The jib backed to windward, the mainsail sheeted in, and the rudder/helm turned to windward" },
    { id: 'b', text: "Both the jib and mainsail let out completely with the rudder centered", whyWrong: "Fully easing both sails with a centered rudder doesn't produce the balanced, stable hove-to state shown; heaving-to relies on the backed jib and helm to windward." },
  ],
  correctChoiceId: 'a',
  explanation: "The classic hove-to setup backs the jib to windward (sheeted to the \"wrong\" side), sheets the mainsail in relatively tight, and turns the helm to windward. The opposing forces largely cancel, leaving the boat nearly stationary and drifting slowly to leeward.",
  source: 'ASA 103 standard curriculum — heaving-to setup',
},
{
  id: 'sail-heave-behavior',
  topic: 'sail-trim',
  concepts: ['heaving-to'],
  format: 'text',
  prompt: "Once properly hove-to, how does the boat typically behave?",
  choices: [
    { id: 'd', text: "It immediately capsizes", whyWrong: "Heaving-to is a recognized technique specifically because it tends to produce a stable, safer motion, not a capsize." },
    { id: 'a', text: "It settles into a relatively stable attitude, making little forward progress while slowly drifting to leeward, with an eased, quieter motion" },
    { id: 'b', text: "It continues sailing at nearly full speed on its original course", whyWrong: "Heaving-to is specifically meant to stop most forward progress, not maintain near-full sailing speed on course." },
    { id: 'c', text: "It becomes completely fixed in place with zero drift", whyWrong: "A hove-to boat still drifts slowly to leeward; it isn't fixed in place like an anchored boat." },
  ],
  correctChoiceId: 'a',
  explanation: "A well hove-to boat settles into a relatively steady angle, making little or no forward progress while slowly drifting to leeward (sometimes called \"making a slick\"), with a notably eased, less violent motion than sailing actively through the same conditions.",
  source: 'ASA 103 standard curriculum — heaving-to behavior',
},
{
  id: 'sail-heave-when-useful',
  topic: 'sail-trim',
  concepts: ['heaving-to'],
  format: 'text',
  prompt: "Which situation is heaving-to well suited for?",
  choices: [
    { id: 'd', text: "Permanently replacing anchoring in a harbor overnight", whyWrong: "Heaving-to still involves slow drift and isn't a substitute for anchoring securely overnight in a harbor." },
    { id: 'a', text: "Pausing to rest a tired crew, ride out a squall, or free hands to reef, navigate, or handle an on-deck problem" },
    { id: 'b', text: "Racing to the finish line as fast as possible", whyWrong: "Heaving-to intentionally slows the boat down; it's not a racing-speed technique." },
    { id: 'c', text: "Docking directly alongside a pier", whyWrong: "Heaving-to is an open-water technique for pausing offshore, not a docking maneuver alongside a pier." },
  ],
  correctChoiceId: 'a',
  explanation: "Heaving-to is a practical tool anytime the crew needs a pause without needing to reach shore or drop anchor — resting, waiting out a squall or fog, taking a break for a meal, or freeing up hands to reef, navigate, or fix something.",
  source: 'ASA 103 standard curriculum — heaving-to applications',
},
{
  id: 'sail-heave-setup-concept',
  topic: 'sail-trim',
  concepts: ['heaving-to'],
  format: 'text',
  prompt: "At a basic conceptual level, how do you set a boat up to heave-to from a close-hauled course?",
  choices: [
    { id: 'a', text: "Tack the boat but leave the jib sheeted on the old (now windward) side, sheet the main in, and hold the helm to windward" },
    { id: 'b', text: "Release both sheets completely and let both sails luff freely", whyWrong: "Letting both sails luff freely doesn't create the balanced opposing forces that make heaving-to stable; the jib needs to be backed and the main sheeted in." },
    { id: 'c', text: "Drop all sail and drift under bare poles only", whyWrong: "That describes lying ahull or bare-poles drifting, a different technique from heaving-to, which keeps sail set in a specific balanced configuration." },
    { id: 'd', text: "Sail dead downwind with both sails eased all the way out", whyWrong: "Heaving-to is set up from close to the wind with the jib backed, not from a dead-downwind, fully-eased configuration." },
  ],
  correctChoiceId: 'a',
  explanation: "A common way to heave-to is to tack through the wind without releasing the jib sheet, so the jib ends up backed against the new tack, then sheet the mainsail in and hold the helm to windward — the combination that settles the boat into the hove-to state.",
  source: 'ASA 103 standard curriculum — heaving-to setup',
},
{
  id: 'sail-trim-heel-diagram',
  topic: 'sail-trim',
  concepts: ['sail-trim-response'],
  format: 'visual',
  assetId: 'custom-heel-trim',
  prompt: "The diagram compares two boats in the same gust. What likely caused the difference in heel angle between them?",
  choices: [
    { id: 'd', text: "Heel angle cannot be influenced by trim at all", whyWrong: "Heel angle is directly influenced by trim choices like sheet tension and traveler position, which is exactly what the diagram illustrates." },
    { id: 'a', text: "The boat on the right eased the mainsheet or dropped the traveler down, spilling excess power and reducing heel" },
    { id: 'b', text: "The boat on the right added more sail area", whyWrong: "Adding more sail area would tend to increase heel in a gust, not reduce it as shown." },
    { id: 'c', text: "The boat on the right is simply a different, unrelated design", whyWrong: "The comparison is about trim response to the same gust on comparable boats, not different hull designs." },
  ],
  correctChoiceId: 'a',
  explanation: "Easing the mainsheet, or dropping the traveler to leeward, lets the top of the sail twist off and spills excess power in a gust, which reduces heeling force and flattens the boat — the technique illustrated by the less-heeled boat on the right.",
  source: 'ASA 103 standard curriculum — heel reduction through trim',
},
{
  id: 'sail-trim-easing-sheet',
  topic: 'sail-trim',
  concepts: ['sail-trim-response'],
  format: 'text',
  prompt: "In a sudden gust, what is a quick, effective way to reduce excess heel without reefing?",
  choices: [
    { id: 'b', text: "Sheet the mainsail in even harder", whyWrong: "Sheeting in harder increases power and typically increases heel further, the opposite of the desired effect in a gust." },
    { id: 'c', text: "Head further downwind toward a dead run", whyWrong: "Bearing away downwind changes apparent wind angle and can help in some cases, but the immediate, direct control for spilling power from the mainsail is easing the sheet or traveler, not necessarily changing course." },
    { id: 'd', text: "Do nothing and wait for the gust to pass on its own", whyWrong: "Passively waiting through a gust that's overpowering the boat ignores an immediate, simple control (easing the sheet) available to the helmsman or trimmer." },
    { id: 'a', text: "Ease the mainsheet (or traveler) to spill some power from the top of the sail" },
  ],
  correctChoiceId: 'a',
  explanation: "Easing the mainsheet or dropping the traveler to leeward lets the upper part of the sail twist off and depower quickly, reducing heel in a gust without needing to physically reef — a fast, temporary response crews use constantly while sailing.",
  source: 'ASA 103 standard curriculum — gust response and trim',
},
{
  id: 'sail-trim-traveler-concept',
  topic: 'sail-trim',
  concepts: ['sail-control-equipment'],
  format: 'text',
  prompt: "At a basic level, what does the mainsail traveler control?",
  choices: [
    { id: 'b', text: "The boat's compass heading directly", whyWrong: "The traveler adjusts mainsail trim; it isn't a steering device and doesn't directly set the boat's heading." },
    { id: 'c', text: "The depth of water under the keel", whyWrong: "Depth under the keel is unrelated to the traveler, which is a sail-trim control." },
    { id: 'd', text: "The anchor rode length", whyWrong: "The traveler has nothing to do with ground tackle or anchor rode; it's part of the mainsheet system." },
    { id: 'a', text: "The athwartships (side-to-side) position of the mainsheet's lower attachment point, which affects mainsail angle and power without changing sheet tension as much" },
  ],
  correctChoiceId: 'a',
  explanation: "The traveler lets the mainsheet's attachment point slide side to side across a track, adjusting the boom's angle and the sail's power/heel characteristics somewhat independently of how hard the sheet itself is pulled in.",
  source: 'ASA 103 standard curriculum — mainsail trim controls',
},
{
  id: 'sail-trim-balance-helm',
  topic: 'sail-trim',
  concepts: ['sail-trim-response'],
  format: 'text',
  prompt: "The boat is heeling heavily and the helm feels like it wants to round up into the wind constantly. What is the likely connection, and the fix?",
  choices: [
    { id: 'b', text: "Heel angle and helm feel are completely unrelated on a sailboat", whyWrong: "Heel and helm balance are closely linked on most sailboats — increasing heel commonly increases weather helm, so they are directly related." },
    { id: 'c', text: "The only fix is to add more sail area", whyWrong: "Adding sail area would tend to increase heel and worsen the heavy weather helm, not fix it." },
    { id: 'd', text: "A heavy, rounding-up helm means the rudder is broken", whyWrong: "A heavy weather helm at excess heel is a normal trim/balance effect, not necessarily a sign of mechanical rudder failure." },
    { id: 'a', text: "Excess heel is producing excess weather helm; reducing heel (easing sheet/traveler, or reefing) will typically lighten and balance the helm" },
  ],
  correctChoiceId: 'a',
  explanation: "As heel increases beyond a certain point, the underwater shape of the hull and the sail's center of effort shift in a way that increases weather helm (the tendency to round up). Reducing heel — by easing sheet/traveler or reefing — typically restores a lighter, more balanced helm.",
  source: 'ASA 103 standard curriculum — heel and helm balance',
},
{
  id: 'sail-trim-heel-safety',
  topic: 'sail-trim',
  concepts: ['sail-trim-response'],
  format: 'text',
  prompt: "The boat is heeled well past a comfortable angle, gear is sliding, and a crew member is having trouble staying seated. What should the skipper do?",
  choices: [
    { id: 'c', text: "Sheet the sails in tighter to try to point higher", whyWrong: "Sheeting in tighter in this situation would tend to increase heel further rather than address the excess heel already causing problems." },
    { id: 'd', text: "Ask the crew to hold onto sliding gear rather than adjust the boat", whyWrong: "Asking crew to manage the symptom (sliding gear) instead of fixing the cause (excess heel) leaves an avoidable safety issue unaddressed." },
    { id: 'a', text: "Reduce heel immediately — ease the sheet/traveler and reduce sail area if the condition persists — rather than accept it as normal" },
    { id: 'b', text: "Treat heavy heel as simply part of sailing and take no action", whyWrong: "Excessive heel that's making gear slide and crew unable to stay seated is a real control and safety issue, not something to simply accept." },
  ],
  correctChoiceId: 'a',
  explanation: "Excessive heel that's causing gear to slide and crew to struggle to stay seated is a real signal to act: ease the sheet or traveler for immediate relief, and reduce sail area (reef, smaller headsail, or both) if the condition continues.",
  source: 'ASA 103 standard curriculum — heel and crew safety',
},
{
  id: 'sea-resp-skipper-authority',
  topic: 'seamanship-comms',
  format: 'text',
  prompt: "Who holds ultimate responsibility for the safety of the vessel and crew, regardless of how tasks are delegated?",
  choices: [
    { id: 'd', text: "The most experienced guest aboard, regardless of who is actually in charge", whyWrong: "An experienced guest may be a valuable resource, but that doesn't transfer the skipper's underlying responsibility to them." },
    { id: 'a', text: "The skipper, even when specific tasks are assigned to other crew members" },
    { id: 'b', text: "Whichever crew member is physically at the helm at any given moment, with no ongoing role for the skipper", whyWrong: "While the person at the helm has an immediate role, overall responsibility for the vessel and crew's safety remains with the skipper, not whoever happens to be steering." },
    { id: 'c', text: "No one — responsibility is not really assigned on a small sailboat", whyWrong: "Responsibility is clearly assigned in standard seamanship practice; the skipper carries it." },
  ],
  correctChoiceId: 'a',
  explanation: "Delegating specific tasks (trimming, navigating, lookout) doesn't transfer overall responsibility — the skipper remains accountable for the safety of the vessel and everyone aboard.",
  source: 'ASA 103 standard curriculum — skipper responsibility',
},
{
  id: 'sea-resp-crew-briefing',
  topic: 'seamanship-comms',
  concepts: ['crew-briefing'],
  format: 'text',
  prompt: "What should a pre-departure crew briefing typically cover?",
  choices: [
    { id: 'd', text: "A detailed history of the boat's manufacturer", whyWrong: "Manufacturer history isn't relevant to crew safety preparation for the outing." },
    { id: 'a', text: "Where safety gear is stowed, basic man-overboard procedure, and each crew member's assigned role for the outing" },
    { id: 'b', text: "Only the lunch menu for the trip", whyWrong: "A pre-departure safety briefing focuses on safety information and roles, not meal planning." },
    { id: 'c', text: "Nothing — briefings are unnecessary if the crew has sailed together before", whyWrong: "Even a familiar crew benefits from a quick briefing, especially since gear location, roles, or conditions may differ trip to trip; skipping it removes a basic safety step." },
  ],
  correctChoiceId: 'a',
  explanation: "A good pre-departure briefing orients the crew to essentials: where PFDs and safety gear are stowed, the basics of the man-overboard response, and who's doing what, so everyone starts the trip on the same page.",
  source: 'ASA 103 standard curriculum — crew briefing',
},
{
  id: 'sea-resp-situational-awareness',
  topic: 'seamanship-comms',
  format: 'text',
  prompt: "Should situational awareness (watching traffic, weather, and hazards) be treated as only the skipper's job?",
  choices: [
    { id: 'c', text: "Only the crew member assigned as lookout should ever pay attention to surroundings", whyWrong: "A designated lookout has a formal role, but that doesn't mean other crew should tune out — general awareness benefits from everyone paying attention." },
    { id: 'd', text: "Situational awareness only matters once a problem has already occurred", whyWrong: "The value of situational awareness is in noticing developing hazards early, before they become full-blown problems." },
    { id: 'a', text: "No — every crew member should stay alert and speak up about anything they notice, even though the skipper has final responsibility" },
    { id: 'b', text: "Yes, other crew members should never mention anything they observe", whyWrong: "Discouraging crew from speaking up about hazards they notice removes a valuable extra set of eyes and ears from the safety picture." },
  ],
  correctChoiceId: 'a',
  explanation: "While the skipper carries ultimate responsibility, good practice encourages every crew member to stay alert and communicate what they notice — extra eyes on traffic, weather, and hazards make the whole boat safer.",
  source: 'ASA 103 standard curriculum — crew situational awareness',
},
{
  id: 'sea-resp-delegation',
  topic: 'seamanship-comms',
  format: 'text',
  prompt: "The skipper assigns the navigation role to an experienced crew member for the day. What does this delegation mean for the skipper's overall responsibility?",
  choices: [
    { id: 'b', text: "The skipper is now completely free of responsibility for navigation decisions", whyWrong: "Delegating a task doesn't erase the skipper's underlying accountability for the vessel's overall safety, including navigation outcomes." },
    { id: 'c', text: "Responsibility automatically transfers permanently to that crew member for all future trips", whyWrong: "A single day's task assignment doesn't create a permanent transfer of the skipper's role or responsibility." },
    { id: 'd', text: "Delegation is not a normal or appropriate practice on a sailboat", whyWrong: "Assigning specific roles to capable crew is normal, sound practice — it just doesn't remove the skipper's overall responsibility." },
    { id: 'a', text: "The skipper still holds overall responsibility for the vessel's safety, even though a specific task has been delegated" },
  ],
  correctChoiceId: 'a',
  explanation: "Delegating a role like navigation is normal and often wise, but it distributes tasks, not ultimate accountability — the skipper remains responsible for the vessel and crew's overall safety.",
  source: 'ASA 103 standard curriculum — skipper responsibility and delegation',
},
{
  id: 'sea-vhf-ch16',
  topic: 'seamanship-comms',
  format: 'text',
  prompt: "What is VHF Channel 16 primarily used for on a recreational boat?",
  choices: [
    { id: 'a', text: "Distress, safety, and initial hailing calls, after which routine conversation should move to a working channel" },
    { id: 'b', text: "Ordinary, extended social conversations between boats", whyWrong: "Channel 16 is reserved for distress, safety, and initial contact, not for tying it up with routine, extended chat." },
    { id: 'c', text: "Streaming music for the crew", whyWrong: "VHF marine channels are for maritime communication, not for entertainment or music streaming." },
    { id: 'd', text: "It has no defined purpose and can be used however a boater likes", whyWrong: "Channel 16 has a defined, internationally recognized purpose for distress, safety, and calling, not an unrestricted free-for-all use." },
  ],
  correctChoiceId: 'a',
  explanation: "Channel 16 is the internationally designated distress, safety, and calling channel. Boaters use it to reach another vessel or issue a distress/safety call, then switch to an agreed working channel for further conversation, keeping 16 clear for emergencies.",
  source: 'ASA 103 standard curriculum — VHF radio basics',
},
{
  id: 'sea-vhf-distress-mayday',
  topic: 'seamanship-comms',
  format: 'text',
  prompt: "When is it appropriate to transmit a Mayday call over VHF?",
  choices: [
    { id: 'c', text: "Whenever you want a radio check without contacting anyone specific", whyWrong: "A radio check is not an emergency situation and should not use a distress call." },
    { id: 'd', text: "Only after a problem has been resolved, as an after-the-fact report", whyWrong: "A Mayday call is for an ongoing, immediate emergency, not a report made after the situation is already resolved." },
    { id: 'a', text: "When there is grave and imminent danger to a person or vessel requiring immediate assistance" },
    { id: 'b', text: "Any time you simply want to ask another boat a routine question", whyWrong: "A routine question isn't an emergency and doesn't warrant a Mayday call, which is reserved for grave, imminent danger." },
  ],
  correctChoiceId: 'a',
  explanation: "Mayday is reserved for situations of grave and imminent danger to life or vessel — fire, sinking, a person overboard whose life is in danger, and similar emergencies requiring immediate outside help.",
  source: 'ASA 103 standard curriculum — VHF distress procedures',
},
{
  id: 'sea-vhf-concise-comms',
  topic: 'seamanship-comms',
  format: 'text',
  prompt: "Why should VHF radio transmissions on a shared channel be kept brief and to the point?",
  choices: [
    { id: 'c', text: "Longer transmissions damage the radio equipment", whyWrong: "Transmission length doesn't damage the equipment; the concern is courteous, effective use of a shared communication channel." },
    { id: 'd', text: "There is no real reason to keep transmissions short", whyWrong: "Keeping transmissions concise is a real, practical courtesy and safety consideration on a shared channel." },
    { id: 'a', text: "The channel is shared by many vessels, and long, unnecessary transmissions can block others, including genuine emergency traffic" },
    { id: 'b', text: "Radios can only transmit for a fixed number of seconds per day", whyWrong: "There's no such daily time limit on VHF transmissions; the real reason to be concise is that the channel is shared and long chatter can block others." },
  ],
  correctChoiceId: 'a',
  explanation: "VHF channels are shared by everyone in range. Tying up a channel with unnecessarily long chatter can prevent others — including a vessel with a real emergency — from getting through, so concise, purposeful transmissions are the expected norm.",
  source: 'ASA 103 standard curriculum — VHF radio etiquette',
},
{
  id: 'sea-vhf-working-channel-switch',
  topic: 'seamanship-comms',
  format: 'text',
  prompt: "After making initial contact with another vessel on Channel 16, what should you do next?",
  choices: [
    { id: 'c', text: "End all radio contact immediately with no further conversation allowed", whyWrong: "Moving the conversation to a working channel is the normal next step, not ending contact altogether." },
    { id: 'd', text: "Repeat the same message on Channel 16 indefinitely", whyWrong: "Repeating on the calling channel instead of switching to a working channel is the opposite of correct radio practice." },
    { id: 'a', text: "Agree on a working channel and switch the conversation there, freeing Channel 16 for calling and safety traffic" },
    { id: 'b', text: "Continue the entire conversation on Channel 16", whyWrong: "Staying on Channel 16 for an extended conversation ties up the calling/distress channel, which should be kept clear once contact is made." },
  ],
  correctChoiceId: 'a',
  explanation: "Standard VHF practice is to use Channel 16 briefly to make contact, then agree on a working channel and move the actual conversation there — keeping 16 open for other vessels' hailing and any distress calls.",
  source: 'ASA 103 standard curriculum — VHF calling procedure',
},
{
  id: 'sea-line-hand-wraps',
  topic: 'seamanship-comms',
  concepts: ['line-handling-safety'],
  format: 'text',
  prompt: "Why should you never wrap a loaded line around your hand?",
  choices: [
    { id: 'b', text: "It has no safety implications, only aesthetic ones", whyWrong: "Wrapping a line around the hand is a genuine injury hazard, not merely a matter of appearance." },
    { id: 'c', text: "It makes the line grip more securely with no downside", whyWrong: "Any perceived grip benefit is outweighed by the serious injury risk if the line suddenly loads or surges." },
    { id: 'd', text: "It's only a concern for very thick lines, never for thin ones", whyWrong: "The hand-trapping hazard applies to loaded lines generally, not only to particularly thick ones." },
    { id: 'a', text: "If the line suddenly loads up or surges, a wrap around the hand can trap and seriously injure it" },
  ],
  correctChoiceId: 'a',
  explanation: "A line that suddenly comes under load — a gust filling a sail, a boat surging against a dock line — can tighten instantly. A hand wrapped in the line can be trapped, crushed, or worse, which is why proper technique never wraps a line around the hand.",
  source: 'ASA 103 standard curriculum — line-handling safety',
},
{
  id: 'sea-line-winch-turns',
  topic: 'seamanship-comms',
  concepts: ['line-handling-safety'],
  format: 'text',
  prompt: "Why is it important to take the correct number of wraps around a winch before loading a line?",
  choices: [
    { id: 'd', text: "Wraps are only relevant for halyards, never for sheets", whyWrong: "Correct winch wraps matter for sheets and other loaded lines on a winch, not exclusively for halyards." },
    { id: 'a', text: "Too few wraps can let the line slip under load; the right number gives control while tailing and eases the load safely" },
    { id: 'b', text: "The number of wraps has no effect on control or safety", whyWrong: "Wrap count directly affects both grip on the winch drum and the crew's ability to control the load, so it does matter." },
    { id: 'c', text: "More wraps than needed always makes the line safer with no downside", whyWrong: "Excess wraps can override or jam on the drum, which creates its own handling problem rather than simply adding safety." },
  ],
  correctChoiceId: 'a',
  explanation: "The friction from wraps around a winch drum lets a crew member hold and control a heavily loaded line. Too few wraps risks the line slipping through the hand; using the appropriate number keeps the load controlled while easing or trimming.",
  source: 'ASA 103 standard curriculum — winch use',
},
{
  id: 'sea-line-load-awareness',
  topic: 'seamanship-comms',
  concepts: ['line-handling-safety'],
  format: 'text',
  prompt: "Why should crew stay alert to which lines on deck are currently under load?",
  choices: [
    { id: 'a', text: "A loaded line can snap back or move suddenly if it releases or the load shifts, so standing clear of its path reduces injury risk" },
    { id: 'b', text: "Loaded lines are always perfectly safe to stand directly in front of", whyWrong: "A loaded line's path (and its snap-back zone if it lets go) is exactly where injury risk concentrates, so it isn't a safe place to stand." },
    { id: 'c', text: "Line loading has no bearing on crew safety", whyWrong: "Line loading is directly tied to crew safety — an unexpectedly released or shifting load is a recognized hazard on deck." },
    { id: 'd', text: "Only the skipper needs to be aware of loaded lines", whyWrong: "All crew working on deck benefit from awareness of loaded lines, not only the skipper." },
  ],
  correctChoiceId: 'a',
  explanation: "A line under load stores energy; if it releases suddenly (a cleat lets go, a line parts) it can whip back through the area it was leading through. Staying aware of which lines are loaded, and standing clear of their path, is basic on-deck safety.",
  source: 'ASA 103 standard curriculum — line-handling safety',
},
{
  id: 'sea-line-standing-clear',
  topic: 'seamanship-comms',
  concepts: ['line-handling-safety'],
  format: 'text',
  prompt: "Before releasing or easing a heavily loaded dock line or sheet, what should crew do?",
  choices: [
    { id: 'b', text: "Stand directly on top of the coiled line for better footing", whyWrong: "Standing on a coil that's about to run is a classic way to get caught in it as it pays out — the opposite of safe positioning." },
    { id: 'c', text: "There is no need to check anyone's position before releasing a loaded line", whyWrong: "Checking that people and body parts are clear before releasing a loaded line is a core safety step, not an unnecessary one." },
    { id: 'd', text: "Loop the free end around an ankle for a secure hold", whyWrong: "Attaching any part of a loaded line to your body (an ankle, a hand) creates a serious entanglement hazard if the line runs." },
    { id: 'a', text: "Make sure hands, feet, and bystanders are clear of the line's path and any coils it will run through" },
  ],
  correctChoiceId: 'a',
  explanation: "Before easing or releasing a loaded line, check that hands, feet, and anyone nearby are clear of where the line and any coil will run — a line paying out under load can move fast and catch anything in its path.",
  source: 'ASA 103 standard curriculum — line-handling safety',
},
{
  id: 'sea-knot-bowline',
  topic: 'seamanship-comms',
  format: 'visual',
  assetId: 'photo-bowline',
  prompt: "This knot is a bowline. What is it primarily used for?",
  choices: [
    { id: 'c', text: "Preventing a line's end from running out through a block", whyWrong: "That's the role of a stopper knot like a figure-eight; a bowline's purpose is a secure, non-slipping loop, not blocking a line from running through a fairlead." },
    { id: 'd', text: "Permanently splicing two lines end to end", whyWrong: "The bowline is a knot, not a splice, and it forms a loop rather than joining two lines end to end." },
    { id: 'a', text: "Forming a fixed loop at the end of a line that won't slip or jam, even after being loaded, and unties easily afterward" },
    { id: 'b', text: "Joining the middle of two separate lines together permanently", whyWrong: "A bowline forms a loop at the end of a single line; joining two separate lines is more the role of a bend such as a sheet bend, not the bowline." },
  ],
  correctChoiceId: 'a',
  explanation: "The bowline creates a reliable fixed loop that holds securely under load yet, unlike many knots, remains relatively easy to untie afterward — a classic use is a mooring or towing loop, or a loop to clip a harness tether into.",
  source: 'Wikimedia Commons — USCG knot-tying reference photo',
},
{
  id: 'sea-knot-cleat-hitch',
  topic: 'seamanship-comms',
  format: 'visual',
  assetId: 'photo-cleat-hitch',
  prompt: "This is a line secured to a dock cleat. What makes this a correct cleat hitch?",
  choices: [
    { id: 'd', text: "Gluing or permanently fastening the line to the cleat", whyWrong: "A cleat hitch is a quick-release technique using wraps and a locking hitch, not a permanent fastening." },
    { id: 'a', text: "A full turn around the base of the cleat followed by figure-eight wraps around the horns, finished with a locking hitch, so it holds securely but releases easily" },
    { id: 'b', text: "Simply wrapping the line around the cleat once with no crossing pattern", whyWrong: "A single wrap with no figure-eight crossing pattern tends to slip and doesn't provide the secure, quick-release hold of a proper cleat hitch." },
    { id: 'c', text: "Tying the line in a fixed loop and dropping the loop over the cleat", whyWrong: "That describes using a loop knot like a bowline over the cleat, not the standard figure-eight cleat hitch technique." },
  ],
  correctChoiceId: 'a',
  explanation: "A proper cleat hitch starts with a full turn around the base, crosses in a figure-eight pattern over the horns, and finishes with a locking half-hitch. This grips securely under load but can still be released quickly when needed.",
  source: 'Wikimedia Commons — cleat hitch reference photo',
},
{
  id: 'sea-knot-clove-hitch',
  topic: 'seamanship-comms',
  format: 'visual',
  assetId: 'photo-clove-hitch',
  prompt: "This is a clove hitch tied around a post. What is an important limitation to keep in mind when using it?",
  choices: [
    { id: 'd', text: "It has no practical marine use at all", whyWrong: "The clove hitch is a genuinely useful, commonly taught knot for quick, temporary fastening to a post or rail." },
    { id: 'a', text: "It can slip or work loose under varying or intermittent load, so it's best for temporary fastening rather than a critical, long-term hold" },
    { id: 'b', text: "It is the strongest, most secure knot for any long-term mooring situation", whyWrong: "The clove hitch is convenient for quick, temporary fastening, but it's not considered the most secure choice for critical long-term loads because it can work loose." },
    { id: 'c', text: "It cannot be untied once loaded", whyWrong: "A clove hitch is actually relatively easy to adjust or release; its limitation is a tendency to loosen under changing load, not being impossible to untie." },
  ],
  correctChoiceId: 'a',
  explanation: "The clove hitch is quick to tie and adjust around a post or rail, making it handy for temporary fastenings like a fender line, but it can slip or loosen if the load varies or comes and goes, so it isn't the best choice for a critical long-term hold.",
  source: 'Wikimedia Commons — USCG knot-tying reference photo',
},
{
  id: 'sea-knot-figure8-stopper',
  topic: 'seamanship-comms',
  format: 'visual',
  assetId: 'custom-figure8-stopper',
  prompt: "This is a figure-eight stopper knot tied near the end of a line. What is its purpose?",
  choices: [
    { id: 'a', text: "To keep the end of a sheet or halyard from running out through a block or fairlead" },
    { id: 'b', text: "To join two separate lines end to end", whyWrong: "The figure-eight stopper is a single-line knot meant to bulk up the end of one line; joining two lines together is the role of a bend, not this knot." },
    { id: 'c', text: "To create a loop for clipping in a safety harness", whyWrong: "A loop for a harness tether calls for a loop knot such as a bowline, not a stopper knot tied at the very end of the line." },
    { id: 'd', text: "To permanently secure the line to a winch drum", whyWrong: "Winches rely on wraps and tailing technique, not a stopper knot, to control a line." },
  ],
  correctChoiceId: 'a',
  explanation: "A figure-eight stopper knot forms a compact, easy-to-untie bulk at the end of a line. Tied in the bitter end of a sheet or halyard, it keeps the line from accidentally running all the way out through a block, fairlead, or clutch.",
  source: 'ASA 103 standard curriculum — figure-eight stopper knot',
},
{
  id: 'sea-knot-round-turn-two-half-hitches',
  topic: 'seamanship-comms',
  format: 'visual',
  assetId: 'custom-round-turn-two-half-hitches',
  prompt: "This diagram shows a round turn and two half hitches around a piling. What is this knot well suited for?",
  choices: [
    { id: 'a', text: "Securely fastening a line to a post, ring, or piling, especially where the load may be sustained or the line may need to bear some chafe" },
    { id: 'b', text: "Forming a non-slip loop at the end of a line with nothing to tie around", whyWrong: "This knot fastens a line around an object like a post or ring; a fixed loop with nothing to tie around is more the role of a knot like the bowline." },
    { id: 'c', text: "Joining the ends of two lines of very different diameters", whyWrong: "Joining two different-diameter lines is the role of a bend, such as a sheet bend, not the round turn and two half hitches." },
    { id: 'd', text: "Stopping a line from running through a block", whyWrong: "Preventing a line from running through a block is the job of a stopper knot like the figure-eight, not this hitch." },
  ],
  correctChoiceId: 'a',
  explanation: "The round turn spreads the load and reduces chafe on the standing part, and the two half hitches lock it off securely — a solid, commonly used way to fasten a line to a piling, ring, or post.",
  source: 'ASA 103 standard curriculum — round turn and two half hitches',
},
{
  id: 'sea-knot-rolling-hitch',
  topic: 'seamanship-comms',
  format: 'visual',
  assetId: 'photo-rolling-hitch',
  prompt: "This sequence shows a rolling hitch being tied. What makes this knot useful compared to a simple clove hitch?",
  choices: [
    { id: 'b', text: "It is used exclusively to join two lines of the same diameter", whyWrong: "The rolling hitch is typically tied around a rod, rail, or another line to grip and hold in one direction, not primarily used as a same-diameter joining knot." },
    { id: 'c', text: "It cannot be tied around another line at all", whyWrong: "One of the rolling hitch's classic uses is being tied onto another line (for example, to relieve load), so it can absolutely be tied around a line." },
    { id: 'd', text: "It is weaker than a simple clove hitch in every situation", whyWrong: "The rolling hitch is specifically valued for holding more securely against slipping in the direction it's designed for, compared to a plain clove hitch." },
    { id: 'a', text: "It grips securely along the length of a rod, rail, or another line under load in one direction, without slipping, which a plain clove hitch can do less reliably" },
  ],
  correctChoiceId: 'a',
  explanation: "The rolling hitch adds extra riding turns that bite into the load, letting it grip securely along a rod, rail, or another line and resist slipping in one direction — useful, for example, to take load off a jammed sheet or secure a fender to a rail.",
  source: 'Wikimedia Commons — rolling hitch reference photo',
},
{
  id: 'sea-departure-checklist',
  topic: 'seamanship-comms',
  concepts: ['pre-departure-checks'],
  format: 'text',
  prompt: "Which of the following belongs on a basic pre-departure readiness check before leaving the dock?",
  choices: [
    { id: 'a', text: "Current weather/forecast check, fuel and engine check, safety gear aboard and stowed, and a quick crew briefing" },
    { id: 'b', text: "Only checking that the boat's exterior has been recently washed", whyWrong: "Cosmetic cleanliness has no bearing on safety readiness; the relevant checks are weather, mechanical, safety gear, and crew briefing." },
    { id: 'c', text: "Nothing — pre-departure checks are unnecessary for a short trip", whyWrong: "Even a short trip benefits from basic readiness checks; skipping them removes an easy opportunity to catch a problem before getting underway." },
    { id: 'd', text: "Only confirming there is enough ice in the cooler", whyWrong: "Provisioning for comfort is a nice-to-have, not a substitute for the actual safety-relevant pre-departure checks." },
  ],
  correctChoiceId: 'a',
  explanation: "A basic pre-departure routine covers the things that actually affect safety: a current weather check, confirming fuel and engine readiness, verifying required safety gear is aboard and stowed, and briefing the crew on roles and procedures.",
  source: 'ASA 103 standard curriculum — pre-departure checks',
},
{
  id: 'sea-departure-lines-fenders',
  topic: 'seamanship-comms',
  concepts: ['stowage'],
  format: 'text',
  prompt: "Shortly after clearing the dock and getting into open water, what should be done with the dock lines and fenders?",
  choices: [
    { id: 'b', text: "Leave the fenders hanging over the side for the entire outing", whyWrong: "Fenders left hanging while underway serve no purpose once away from the dock and can drag or catch on things; they're normally brought aboard." },
    { id: 'c', text: "Throw the dock lines overboard since they're no longer needed", whyWrong: "Dock lines are still needed for the next landing and shouldn't be discarded; they're coiled and stowed, not thrown away." },
    { id: 'd', text: "Leave everything exactly where it landed on deck with no further action", whyWrong: "Leaving lines and fenders scattered on deck creates a trip hazard and clutter; proper practice is to stow them promptly." },
    { id: 'a', text: "Coil and stow the dock lines and bring the fenders aboard, clearing the deck for sailing" },
  ],
  correctChoiceId: 'a',
  explanation: "Once clear of the dock, dock lines are typically coiled and stowed and fenders brought aboard, both to reduce clutter and trip hazards on deck and because they'll be needed again, properly stowed and ready, at the next landing.",
  source: 'ASA 103 standard curriculum — departure and stowage routine',
},

/**
 * Arc 6 question bank: Emergencies (ASA 103 scope).
 * Hypothermia/cold-water guidance follows current USCG/NOAA cold-water
 * safety guidance (the "1-10-1" immersion timeline); MOB guidance reflects
 * that ASA teaches multiple valid recovery approaches (quick-stop, figure
 * eight, Lifesling) rather than a single mandated method; fire-extinguisher
 * classification follows current USCG marine fire extinguisher requirements
 * (Class A/B/C fires, 5-B/20-B rated marine extinguishers).
 */
{
  id: 'emer-hypothermia-recognition',
  topic: 'emergencies',
  format: 'text',
  prompt: "A crew member who fell in cool water and was quickly recovered is now shivering hard, fumbling with simple tasks, and slurring words. What is this most likely a sign of?",
  choices: [
    { id: 'a', text: "Early to moderate hypothermia, requiring the crew member be kept warm, dry, and closely monitored" },
    { id: 'b', text: "Simple seasickness, which will pass on its own with no action needed", whyWrong: "Shivering, fumbling coordination, and slurred speech are not seasickness symptoms; they're classic early hypothermia signs and call for an active response, not waiting it out." },
    { id: 'c', text: "Normal post-swim discomfort that only needs a towel", whyWrong: "A towel alone doesn't address the underlying core-temperature drop; degraded coordination and speech indicate more than mild chill and need active warming and monitoring." },
    { id: 'd', text: "A sign the crew member should immediately go for a brisk swim to warm up", whyWrong: "Further immersion or exertion increases heat loss and risk; the correct response is to get the person out of wet clothes, dry, and insulated, not back into activity or the water." },
  ],
  correctChoiceId: 'a',
  explanation: "Hard shivering, clumsiness, and slurred speech are hallmark signs of hypothermia progressing from mild to moderate. The response is to get the person dry, out of the wind, insulated, and monitored — shivering that stops in a still-cold, unresponsive person is a warning sign of worsening, not improvement.",
  source: 'USCG / NOAA cold-water safety guidance — recognizing hypothermia',
},
{
  id: 'emer-hypothermia-1101-rule',
  topic: 'emergencies',
  format: 'visual',
  assetId: 'custom-cold-water-1101',
  prompt: "The '1-10-1' cold water immersion timeline shown is a rough guide to what a person suddenly immersed in cold water faces. What does the middle stage, roughly 10 minutes, represent?",
  choices: [
    { id: "a", text: "A mandatory waiting period before starting a rescue", whyWrong: "The 10-minute figure isn't instruction to wait before rescuing; a crew overboard rescue should begin immediately. It instead describes how quickly the victim's own ability to self-rescue degrades." },
    { id: "b", text: "A window of meaningful muscle function before cold incapacitation sets in and swimming/self-rescue becomes very difficult" },
    { id: "c", text: "The total time before hypothermia becomes life-threatening", whyWrong: "That is roughly the final, ~1 hour stage in the timeline, not the 10-minute middle stage." },
    { id: "d", text: "The time it takes for cold shock and gasping to fully pass with no further risk", whyWrong: "Cold shock and breathing control is the first ~1 minute stage, not the 10-minute stage, and the 10-minute stage is about a different risk (loss of muscle function)." }
],
  correctChoiceId: "b",
  explanation: "The 1-10-1 timeline is a rough teaching aid: about 1 minute to get cold-shock breathing under control, about 10 minutes of meaningful muscle function before cold incapacitation and swim failure set in, and roughly 1 hour before hypothermia can cause unconsciousness. It underscores why a life jacket and a fast, controlled recovery matter — the victim's own ability to help themselves shrinks quickly.",
  source: 'USCG / NOAA cold-water safety guidance — the 1-10-1 immersion timeline',
},
{
  id: 'emer-hypothermia-prevention',
  topic: 'emergencies',
  format: 'text',
  prompt: "Before an early-season sail in cool weather with a chance of spray and immersion, what is the most effective way for the crew to reduce hypothermia risk?",
  choices: [
    { id: "a", text: "Skip layering since exertion from sailing will keep everyone warm enough", whyWrong: "Exertion alone doesn't protect against wind chill, spray, or sudden immersion; proper layering and flotation are still needed." },
    { id: "b", text: "Rely on drinking something warm before departure instead of dressing for conditions", whyWrong: "A warm drink before departure has no lasting effect on cold-water risk hours into a sail; the effective prevention is appropriate clothing and flotation." },
    { id: "c", text: "Dress in layers that retain warmth when damp, keep foul-weather gear handy, and wear life jackets" },
    { id: "d", text: "Wear a single heavy cotton sweater since it is the warmest option", whyWrong: "Cotton loses most of its insulating value when wet and dries slowly, making it a poor choice for cool, spray-prone conditions compared to synthetic or wool layers." }
],
  correctChoiceId: "c",
  explanation: "Prevention centers on staying dry and insulated: layers (ideally wool or synthetic, which retain some insulating value wet) plus accessible foul-weather gear reduce heat loss from wind and spray, and a worn life jacket keeps a person afloat and face-up if they do go in, buying critical time.",
  source: 'USCG / NOAA cold-water safety guidance — prevention and preparation',
},
{
  id: 'emer-hypothermia-response-onboard',
  topic: 'emergencies',
  format: 'text',
  prompt: "A recovered crew member is conscious, cold, and shivering. Once back aboard, what is the appropriate initial care?",
  choices: [
    { id: "a", text: "Immerse them immediately in a hot shower or very hot water to warm them as fast as possible", whyWrong: "Very hot water or aggressive rapid rewarming can be dangerous, especially with more significant cold exposure; the appropriate initial step is passive rewarming with dry insulation and shelter from wind." },
    { id: "b", text: "Give them a strong alcoholic drink to warm them up", whyWrong: "Alcohol dilates peripheral blood vessels and impairs judgment, which can worsen heat loss and mask worsening symptoms; it should be avoided." },
    { id: "c", text: "Have them do jumping jacks to generate body heat quickly", whyWrong: "Vigorous exertion right after cold immersion can increase strain on the heart and circulate cold peripheral blood back to the core, which can worsen the situation rather than help." },
    { id: "d", text: "Get them out of wet clothing, dry them off, wrap them in dry insulation, get them out of the wind, and monitor them closely" }
],
  correctChoiceId: "d",
  explanation: "Initial care for a conscious, mildly-to-moderately hypothermic person is passive: remove wet clothing, dry the skin, add dry insulating layers, shelter from wind, and monitor. Aggressive rewarming (very hot water), alcohol, and strenuous exercise are avoided because they can worsen the person's condition.",
  source: 'USCG / NOAA cold-water safety guidance — onboard hypothermia care',
},
{
  id: 'emer-hypothermia-handling-caution',
  topic: 'emergencies',
  format: 'text',
  prompt: "A crew member is pulled from cold water after a longer immersion and appears to be moderately to severely hypothermic (very cold, weak, and disoriented). Why should the crew handle and move this person gently rather than briskly?",
  choices: [
    { id: 'a', text: "Rough handling or sudden exertion can trigger a dangerous heart rhythm as cold blood from the extremities shifts toward the core, a recognized rescue-collapse risk" },
    { id: 'b', text: "Gentle handling is just a comfort measure with no medical basis", whyWrong: "It is not merely for comfort — rough handling of a significantly hypothermic person carries a real, documented cardiac risk during and after rescue." },
    { id: 'c', text: "It only matters if the person is unconscious", whyWrong: "The rescue-collapse risk applies to significantly hypothermic people generally, including some who are still conscious but deeply cold; gentle handling is the safer default." },
    { id: 'd', text: "Gentle handling is required only to avoid muscle soreness", whyWrong: "The concern is cardiac risk, not soreness; treating it as a comfort issue understates why careful handling matters for a significantly cold casualty." },
  ],
  correctChoiceId: 'a',
  explanation: "In more significant hypothermia, sudden movement or exertion can cause colder, more acidic blood pooled in the limbs to circulate to the heart, which can trigger a dangerous arrhythmia (sometimes called rescue collapse). The person should be kept horizontal, handled gently, and moved as little as possible until warmed and evaluated.",
  source: 'USCG / NOAA cold-water safety guidance — handling significant hypothermia',
},

{
  id: 'emer-mob-immediate-actions',
  topic: 'emergencies',
  format: 'text',
  prompt: "A crew member goes over the side while underway. What should the crew's very first actions be?",
  choices: [
    { id: "a", text: "Wait to see if the person can swim back to the boat on their own before doing anything", whyWrong: "Waiting passively risks losing the person from sight and delays a response that should begin immediately." },
    { id: "b", text: "Shout \"crew overboard,\" throw a floating device toward the person, and assign one crew member to point continuously at them" },
    { id: "c", text: "Immediately jump in after them without flotation or a plan", whyWrong: "An uncontrolled rescue attempt risks a second person in the water and does nothing to keep the original victim in sight; the first response is to alert the crew, throw flotation, and maintain visual contact." },
    { id: "d", text: "Continue on the current course and deal with it once the sails are properly trimmed", whyWrong: "Delaying the response while attending to sail trim wastes critical time and risks losing sight of the victim; the emergency takes priority immediately." }
],
  correctChoiceId: "b",
  explanation: "The first seconds matter most: alert the whole crew, get flotation to the victim right away, and dedicate one person solely to pointing at and watching them (nothing else) so they aren't lost from sight while the boat maneuvers to return.",
  source: 'ASA 103 standard curriculum — crew overboard, immediate response',
},
{
  id: 'emer-mob-visual-contact',
  topic: 'emergencies',
  format: 'text',
  prompt: "During a crew overboard recovery, why is it standard practice to assign one crew member as a dedicated spotter whose only job is to watch the person in the water?",
  choices: [
    { id: "a", text: "GPS and chartplotter MOB functions make visual tracking unnecessary", whyWrong: "Electronic MOB marks help with navigation back to the area but don't substitute for continuous visual contact, since the victim can drift from the marked position." },
    { id: "b", text: "It is only needed in fog or at night, not in clear daylight", whyWrong: "Even in clear daylight a person's head is easily lost in waves or glare at a distance; the dedicated spotter role applies in all conditions." },
    { id: "c", text: "A person's head is a small, low target that is very easy to lose sight of in waves, glare, or chop, especially once the boat maneuvers away" },
    { id: "d", text: "It is mainly to keep that crew member occupied and out of the way of other tasks", whyWrong: "The role has a specific safety purpose — preventing loss of visual contact — not simply keeping someone busy." }
],
  correctChoiceId: "c",
  explanation: "A swimmer's head presents very little surface area and blends easily into wave patterns and glare, so losing sight of them even briefly can make relocation very difficult. A dedicated spotter whose only job is pointing and watching greatly reduces that risk while the rest of the crew maneuvers the boat.",
  source: 'ASA 103 standard curriculum — crew overboard, maintaining visual contact',
},
{
  id: 'emer-mob-recovery-methods',
  topic: 'emergencies',
  format: 'text',
  prompt: "Which statement correctly describes sailboat crew-overboard recovery maneuvers as taught at the ASA 103 level?",
  choices: [
    { id: "a", text: "Only one specific maneuver is ever acceptable, and any other approach is against the rules", whyWrong: "ASA training presents multiple valid recovery approaches rather than mandating a single universal method; the best choice depends on the situation." },
    { id: "b", text: "The engine should never be used during a recovery, only sail power", whyWrong: "Using the engine (with care to avoid the victim and any lines in the water near the propeller) is often appropriate, particularly on a shorthanded or power-assisted return." },
    { id: "c", text: "Recovery maneuvers are only relevant for racing crews and are not part of standard cruising practice", whyWrong: "Crew overboard recovery is core cruising seamanship, taught and practiced specifically because it can happen on any sailing outing." },
    { id: "d", text: "Several maneuvers (such as the quick-stop and the figure-eight) are taught as valid ways to return to a victim under sail; the right choice depends on crew size, conditions, and boat handling comfort" }
],
  correctChoiceId: "d",
  explanation: "ASA training covers more than one valid return-to-victim technique (for example, the quick-stop and the figure-eight), because the best approach depends on factors like crew size, sea state, and how the boat is rigged. The common thread across all of them is a controlled return that keeps the victim in sight and ends with the boat stopped safely alongside them.",
  source: 'ASA 103 standard curriculum — crew overboard recovery maneuvers',
},
{
  id: 'emer-mob-final-approach',
  topic: 'emergencies',
  format: 'visual',
  assetId: 'custom-mob-recovery-approach',
  prompt: "As the diagram shows a boat curving back toward a person in the water, what should the helmsman do on the final approach to avoid injuring the victim or missing the recovery?",
  choices: [
    { id: 'a', text: "Slow the boat well before reaching the victim and bring them alongside on the leeward (downwind) side, under control" },
    { id: 'b', text: "Approach at full speed to minimize time in the water", whyWrong: "A fast final approach risks running over or striking the victim and makes it much harder to stop precisely alongside them; speed should be reduced well before the final approach." },
    { id: 'c', text: "Bring the victim alongside on the windward (upwind) side of the boat", whyWrong: "Approaching from the windward side risks the boat drifting down onto the victim; bringing them alongside to leeward, where the boat drifts away from them, is the safer approach." },
    { id: 'd', text: "Keep the engine in gear and propeller turning right up to the victim for maximum control", whyWrong: "A spinning propeller near a person in the water, or near lines/flotation gear trailing from them, is a serious injury hazard; the engine is normally taken out of gear during the final approach alongside." },
  ],
  correctChoiceId: 'a',
  explanation: "On the final approach, speed is reduced early so the boat glides to a stop rather than arriving fast, the victim is brought alongside to leeward so the boat drifts away from (not onto) them, and the engine is taken out of gear near the victim to eliminate propeller risk.",
  source: 'ASA 103 standard curriculum — crew overboard, final approach and recovery',
},
{
  id: 'emer-mob-crew-roles',
  topic: 'emergencies',
  format: 'text',
  prompt: "On a boat with four crew members, one goes overboard. How should the remaining three best divide the recovery effort?",
  choices: [
    { id: "a", text: "Roles don't matter as long as everyone is doing something", whyWrong: "Effective crew overboard response depends on clear, separate roles (spotting, boat handling, gear prep); leaving it unstructured increases the chance of losing the victim or fumbling the recovery." },
    { id: "b", text: "One dedicated spotter who only points and watches the victim, one to handle sails/engine and maneuver the boat, and one to prepare recovery gear (flotation, lifesling, boarding ladder)" },
    { id: "c", text: "All three should focus only on sail trim since speed back to the victim matters most", whyWrong: "Speed without a dedicated spotter risks losing sight of the victim, and no one preparing recovery gear delays getting them safely back aboard once alongside." },
    { id: "d", text: "All three should crowd at the rail watching the victim and yelling instructions to each other", whyWrong: "Without someone actually maneuvering the boat and someone preparing gear, the crew can't execute a controlled return or recovery — clear roles matter." }
],
  correctChoiceId: "b",
  explanation: "Dividing the recovery into distinct roles — a spotter who does nothing but watch and point, someone maneuvering the boat back under control, and someone readying flotation and a way to get the victim back aboard — keeps the response organized instead of everyone converging on the same task while nothing else gets done.",
  source: 'ASA 103 standard curriculum — crew overboard, assigning roles',
},

{
  id: 'emer-fire-classes-onboard',
  topic: 'emergencies',
  format: 'text',
  prompt: "A galley fire involving cooking oil and a cockpit fire fed by leaking gasoline are examples of which fire class(es), which affects what kind of extinguisher is appropriate?",
  choices: [
    { id: "a", text: "Both are Class C fires (energized electrical equipment) requiring a non-conductive agent only because of the risk of shock", whyWrong: "Class C describes energized electrical equipment, not burning liquids; these two scenarios are liquid fuel fires, which is Class B." },
    { id: "b", text: "Fire class doesn't affect which extinguisher to use; any extinguisher works the same on any fire", whyWrong: "Fire class matters a great deal — using the wrong agent (for example, water on a liquid fuel fire) can spread the fire or create a shock hazard instead of extinguishing it." },
    { id: "c", text: "Both are Class B fires (flammable liquids), which call for an extinguisher rated for Class B use, not water" },
    { id: "d", text: "Both are Class A fires (ordinary combustibles like wood or paper), best fought with plain water", whyWrong: "Wood and paper are Class A materials, but burning oil and gasoline are flammable liquids — Class B — where water can splatter the burning liquid and spread the fire rather than putting it out." }
],
  correctChoiceId: "c",
  explanation: "Burning cooking oil and burning gasoline are both flammable-liquid (Class B) fires. Water is a poor choice on a Class B fire because it can spread burning liquid rather than smother it; a marine-rated Class B extinguisher (commonly dry chemical, foam, or CO2) is the appropriate tool.",
  source: 'USCG marine fire extinguisher requirements — fire classification (Class A/B/C)',
},
{
  id: 'emer-fire-extinguisher-class-b',
  topic: 'emergencies',
  format: 'visual',
  assetId: 'photo-fire-extinguisher-marine',
  prompt: "The extinguisher pictured is a USCG-approved marine-type unit rated 5-B. What does the \"B\" rating tell you it is designed to fight?",
  choices: [
    { id: "a", text: "Ordinary combustible fires only, such as wood or cloth", whyWrong: "Wood and cloth are Class A materials. A B rating specifically indicates suitability for flammable-liquid fires, not ordinary combustibles." },
    { id: "b", text: "Fires in energized electrical panels only", whyWrong: "Energized electrical equipment is Class C. A B rating is about flammable liquids; a marine-type extinguisher may carry multiple ratings, but B specifically denotes liquid-fuel capability." },
    { id: "c", text: "It indicates the extinguisher's size class only, with no relation to fire type", whyWrong: "The letter denotes the class of fire it is rated to fight; the accompanying number (like 5 or 20) relates to extinguishing capacity, not the letter." },
    { id: "d", text: "Flammable liquid fires, such as burning fuel or oil" }
],
  correctChoiceId: "d",
  explanation: "USCG marine fire extinguishers are commonly rated 5-B or 20-B, meaning they are certified effective against Class B (flammable liquid) fires — exactly the kind of fire risk posed by fuel or oil aboard a boat — with the number indicating relative extinguishing capacity.",
  source: 'USCG marine fire extinguisher requirements — 5-B/20-B rating system',
},
{
  id: 'emer-fire-engine-compartment-response',
  topic: 'emergencies',
  format: 'text',
  prompt: "Smoke is coming from the engine compartment while underway. What is the correct immediate sequence of actions?",
  choices: [
    { id: 'a', text: "Shut down the engine and fuel supply, keep the compartment closed to starve the fire of air, and discharge the extinguisher through an access port or a small opening rather than fully opening the hatch" },
    { id: 'b', text: "Throw open the engine compartment hatch immediately to see the fire clearly before doing anything else", whyWrong: "Opening the compartment feeds the fire a rush of fresh air, which can cause it to flare up; the recommended approach is to keep it closed and apply the extinguisher through a small opening or port." },
    { id: 'c', text: "Keep the engine running so the boat can motor to the nearest harbor while the fire is fought", whyWrong: "A running engine with fuel still supplied can continue feeding the fire and adds risk; the engine and fuel should be shut down as an immediate step." },
    { id: 'd', text: "Pour water directly into the engine compartment", whyWrong: "Engine compartment fires are typically fuel/electrical related (Class B/C); water is not the appropriate agent and can spread a liquid-fuel fire or create shock risk near electrical components." },
  ],
  correctChoiceId: 'a',
  explanation: "For an engine compartment fire, shutting down the engine and fuel supply removes fuel from the fire, and keeping the compartment closed limits the oxygen feeding it. The extinguisher is discharged through an existing port or a small opening rather than by fully opening the hatch, which would let in a rush of air and can cause flare-up.",
  source: 'USCG marine fire extinguisher requirements — engine compartment fire response',
},
{
  id: 'emer-fire-galley-priorities',
  topic: 'emergencies',
  format: 'text',
  prompt: "A pan of cooking oil catches fire on the galley stove. What is the correct first response?",
  choices: [
    { id: "a", text: "Open all hatches and portlights first to vent smoke before addressing the flames", whyWrong: "Venting smoke can wait; addressing the flames first (fuel off, smother or extinguish) is the priority, since delay lets a small galley fire grow." },
    { id: "b", text: "Shut off the stove's fuel supply if safely reachable, cover the pan with a lid to smother it or use a marine-rated extinguisher, and avoid moving the flaming pan" },
    { id: "c", text: "Pour water on the burning oil to put it out quickly", whyWrong: "Water on burning oil can cause the fire to violently splatter and spread rather than extinguish it; smothering with a lid or using an appropriate extinguisher is correct instead." },
    { id: "d", text: "Carry the flaming pan up on deck and toss it overboard", whyWrong: "Moving a flaming pan risks spilling burning oil on the person carrying it or elsewhere in the cabin; it's safer to smother the fire in place." }
],
  correctChoiceId: "b",
  explanation: "A galley oil fire is a Class B fire. The safest response is to cut its fuel/heat source if reachable, smother it (a lid starves it of oxygen) or apply a marine-rated extinguisher, and avoid carrying the burning pan, which risks spilling flaming oil.",
  source: 'ASA 103 standard curriculum — galley fire response',
},
{
  id: 'emer-fire-fuel-vapor-prevention',
  topic: 'emergencies',
  concepts: ['blower-ventilation', 'fueling-safety'],
  format: 'text',
  prompt: "Before starting an inboard gasoline engine after fueling, what precaution most directly reduces the risk of an explosion from accumulated fuel vapor?",
  choices: [
    { id: "a", text: "Open only the companionway hatch and consider that sufficient ventilation", whyWrong: "Gasoline vapor is heavier than air and tends to settle in the bilge and engine compartment; a companionway hatch does little to clear it. Running the blower is the effective step." },
    { id: "b", text: "Skip ventilation checks if the fueling was quick", whyWrong: "Even a quick fueling can leave vapor in the bilge or engine compartment; the blower-and-sniff check is a standard precaution regardless of how long fueling took." },
    { id: "c", text: "Run the engine compartment blower for several minutes and check for a fuel odor before starting the engine" },
    { id: "d", text: "Start the engine quickly to burn off any fumes before they accumulate further", whyWrong: "Starting the engine — and the resulting spark from ignition — is exactly what can ignite accumulated vapor; vapor needs to be cleared with the blower first, not burned off by starting the engine." }
],
  correctChoiceId: "c",
  explanation: "Gasoline vapor is heavier than air and can pool in the bilge or engine compartment after fueling, creating an explosion risk if ignited by a spark (such as from starting the engine). Running the blower for several minutes to clear vapor, then confirming there's no fuel smell before starting, is the standard precaution.",
  source: 'USCG / ASA 103 standard curriculum — fueling and engine-start precautions',
},
{
  id: 'emer-fire-immediate-priorities',
  topic: 'emergencies',
  format: 'text',
  prompt: "A fire breaks out belowdecks and is spreading faster than it can be controlled with onboard extinguishers. What should the crew prioritize?",
  choices: [
    { id: "a", text: "Keep everyone belowdecks fighting the fire as long as any extinguisher remains, regardless of how the fire is spreading", whyWrong: "Continuing to fight a fire that is clearly outpacing the crew's ability to control it risks lives; crew safety and a distress call take priority once it's apparent the fire won't be contained." },
    { id: "b", text: "Focus only on saving personal belongings before dealing with the fire", whyWrong: "Personal property is a distraction from the priorities that matter in a worsening fire: crew safety, alerting other help, and being ready to abandon ship if necessary." },
    { id: "c", text: "Wait until the fire is out completely before considering calling for help", whyWrong: "Delaying a distress call until the fire is out (or not) wastes critical time; calling for help early, while still fighting the fire if safe to do so, gives responders the most time to reach the boat." },
    { id: "d", text: "Get everyone into life jackets, move crew away from the fire (on deck if needed), send a distress call with position, and prepare to abandon ship if the fire cannot be brought under control" }
],
  correctChoiceId: "d",
  explanation: "Once a fire is clearly beyond the crew's ability to control, the priority shifts to crew safety: life jackets on, crew clear of the fire and ready to abandon ship, and a distress call made promptly with position and situation so help is already on the way if the fire can't be contained.",
  source: 'ASA 103 standard curriculum — fire beyond control, crew safety priorities',
},

{
  id: 'emer-flooding-seacock-response',
  topic: 'emergencies',
  format: 'visual',
  assetId: 'custom-flooding-seacock',
  prompt: "As shown, water is spraying in around a loose hose clamp on a through-hull fitting below the waterline. What is the correct immediate response?",
  choices: [
    { id: 'a', text: "Close the seacock to shut off the flow at its source, then start bailing/pumping and drive a bung into the through-hull if the seacock can't be closed or the fitting fails further" },
    { id: 'b', text: "Immediately drive the boat at full speed toward the nearest harbor without addressing the leak", whyWrong: "Running at speed does nothing to stop water entering the hull and can worsen the situation; the leak itself needs to be addressed first, at the source if possible." },
    { id: 'c', text: "Ignore it since a boat's bilge pump will keep up with any leak", whyWrong: "A bilge pump has a limited capacity and shouldn't be assumed to outpace a growing leak; stopping the source of the flooding is the priority, with pumping as a supporting action." },
    { id: 'd', text: "Wait to see if the leak gets worse before taking any action", whyWrong: "Delaying action on a known leak below the waterline risks it worsening or the fitting failing outright; the seacock should be closed immediately if reachable." },
  ],
  correctChoiceId: 'a',
  explanation: "The fastest way to stop flooding at a through-hull is to close its seacock, cutting off the flow at the source. Bailing or running the bilge pump helps manage water already aboard, and a tapered wooden bung is carried specifically to plug a through-hull if the seacock is inaccessible or the fitting fails.",
  source: 'ASA 103 standard curriculum — flooding response, seacocks and through-hulls',
},
{
  id: 'emer-flooding-recognize-priority',
  topic: 'emergencies',
  format: 'text',
  prompt: "The crew notices water sloshing noticeably in the bilge and rising. What should be done first, before anything else?",
  choices: [
    { id: "a", text: "Immediately call for a helicopter rescue before investigating", whyWrong: "Escalating straight to a rescue call before even locating the source skips the step that might resolve the problem (or show it's manageable); locate and assess first, then call for help if the situation warrants it." },
    { id: "b", text: "Find the source of the water as quickly as possible, since stopping the inflow matters more than anything else until that's done" },
    { id: "c", text: "Start the engine and head for shore immediately without checking the source", whyWrong: "Heading for shore without knowing or addressing the source leaves the leak unaddressed and the boat could be taking on water faster than expected; finding and controlling the source comes first." },
    { id: "d", text: "Assume it's just condensation or rain and continue sailing as normal", whyWrong: "Noticeably rising water in the bilge shouldn't be dismissed as condensation; it needs to be checked and its source identified promptly." }
],
  correctChoiceId: "b",
  explanation: "With unexplained or rising water in the bilge, finding the source is the priority — a stuck seacock, a failed hose, a hull fitting, or a leaking stuffing box are common causes, and until the source is found and controlled, pumping alone may not keep up.",
  source: 'ASA 103 standard curriculum — flooding response, locating the source',
},
{
  id: 'emer-steering-failure-response',
  topic: 'emergencies',
  format: 'text',
  prompt: "While motoring, the wheel suddenly goes slack and no longer turns the rudder. What is the appropriate response?",
  choices: [
    { id: "a", text: "Assume nothing can be done and prepare to abandon ship immediately", whyWrong: "Loss of primary steering is serious but usually manageable — checking the linkage and rigging an emergency tiller (carried for exactly this situation) are the appropriate next steps before considering anything as drastic as abandoning ship." },
    { id: "b", text: "Continue on the same course and speed, assuming the rudder will reconnect on its own", whyWrong: "Continuing blindly on course and speed with no steering control risks running into danger; the boat should be slowed and the problem investigated." },
    { id: "c", text: "Reduce speed or come to idle, check for an obvious cause (a disconnected cable or linkage), and rig the emergency tiller if the primary steering can't be restored" },
    { id: "d", text: "Increase throttle to try to power through the problem", whyWrong: "Adding speed with no steering control increases the risk of a collision or grounding; the boat should be slowed while the problem is assessed." }
],
  correctChoiceId: "c",
  explanation: "Loss of steering calls for slowing the boat first to reduce risk, then a quick check for an obvious, fixable cause such as a disconnected steering cable or quadrant linkage. Most auxiliary-powered boats carry an emergency tiller that connects directly to the rudder post for exactly this situation.",
  source: 'ASA 103 standard curriculum — steering failure response',
},
{
  id: 'emer-fouled-prop-response',
  topic: 'emergencies',
  format: 'text',
  prompt: "The engine suddenly bogs down and stalls, and the crew suspects a line has wrapped around the propeller. What should be done first?",
  choices: [
    { id: "a", text: "Keep the engine running and shift rapidly between forward and reverse to try to shake the line loose", whyWrong: "Continuing to run the engine with a fouled prop risks winding the line tighter, damaging the shaft, coupling, or engine, and can make the line much harder (or unsafe) to clear." },
    { id: "b", text: "Immediately send a crew member into the water to clear it without shutting the engine down first", whyWrong: "Going near a propeller that could still turn is a serious injury risk; the engine must be shut down (and ideally secured against restart) before anyone approaches it." },
    { id: "c", text: "Ignore it and continue trying to motor since sails aren't a realistic backup", whyWrong: "Continuing to force a stalled, fouled engine risks further damage, and sail power is in fact the standard fallback for making way while the prop issue is dealt with." },
    { id: "d", text: "Shut down the engine immediately to prevent further winding or damage, then assess the situation before considering how to clear the line" }
],
  correctChoiceId: "d",
  explanation: "The immediate step is shutting the engine down to stop the line from winding tighter and to protect the shaft, coupling, and transmission from damage. Only after the engine is off and secured should the crew assess whether the line can be cleared from on deck, whether the boat can proceed under sail, or whether a controlled in-water clearing is needed.",
  source: 'ASA 103 standard curriculum — fouled propeller response',
},
{
  id: 'emer-rigging-failure-response',
  topic: 'emergencies',
  format: 'text',
  prompt: "While sailing close-hauled, a windward shroud suddenly parts. What is the correct immediate response to protect the mast?",
  choices: [
    { id: 'a', text: "Bear away and ease sail to reduce the load on the rig, keeping the boat off the point of sail that stressed the failed shroud" },
    { id: 'b', text: "Head up closer to the wind to reduce heel", whyWrong: "Heading up closer to the wind on the point of sail where the shroud failed increases rig load on that side rather than reducing it; bearing away and easing sail is the correct way to unload the rig." },
    { id: 'c', text: "Immediately drop all sail with no attention to boat control, letting the boat go beam-on to the waves", whyWrong: "An uncontrolled sail drop that leaves the boat wallowing beam-on to the waves adds risk from rolling and loss of control; the priority is bearing away and easing sail in a controlled way, reducing rig load, with dousing sail as appropriate from there." },
    { id: 'd', text: "Continue on the same course since a single shroud failure doesn't affect the rig", whyWrong: "A parted shroud significantly weakens the mast's lateral support on that side; continuing to load the rig on the same point of sail risks losing the mast entirely." },
  ],
  correctChoiceId: 'a',
  explanation: "A parted shroud removes lateral support for the mast on that side. Bearing away and easing sheets reduces the sideways loading on the rig immediately, buying time to assess the damage, rig a temporary support if available, and get the sail plan under control before the mast is put at further risk.",
  source: 'ASA 103 standard curriculum — rigging failure response',
},
{
  id: 'emer-anchor-dragging-recognize',
  topic: 'emergencies',
  format: 'visual',
  assetId: 'custom-dragging-anchor',
  prompt: "The diagram shows a boat's position drifting well outside its expected swing circle and past two fixed shore landmarks that had lined up (a transit) when the anchor was first set. What does this indicate?",
  choices: [
    { id: "a", text: "This pattern has no useful meaning for anchor watch", whyWrong: "Watching a transit (two fixed landmarks lining up) or tracking position against the expected swing circle is a standard, useful way to detect a dragging anchor." },
    { id: "b", text: "The anchor is dragging, since the boat has moved beyond normal swing on its scope and the transit bearing has changed" },
    { id: "c", text: "The boat is simply swinging normally on its anchor rode as the wind or current shifts", whyWrong: "Normal swinging keeps the boat within its expected swing circle around a fixed anchor point; moving well outside that circle, past a transit that used to line up, indicates the anchor itself has moved — i.e., dragging." },
    { id: "d", text: "The transit landmarks themselves must have moved", whyWrong: "Fixed shore landmarks don't move; a changed transit bearing means the boat (and its anchor) has moved relative to them, which is the definition of dragging." }
],
  correctChoiceId: "b",
  explanation: "Using a transit — two fixed points ashore that line up when the anchor is set — is a simple, reliable way to detect dragging: if the boat drifts and the transit no longer lines up, or the boat is clearly outside its expected swing circle, the anchor has lost its hold and is dragging.",
  source: 'ASA 103 standard curriculum — recognizing a dragging anchor',
},
{
  id: 'emer-anchor-dragging-response',
  topic: 'emergencies',
  format: 'text',
  prompt: "The crew determines during the night that the anchor is dragging and the boat is drifting toward a lee shore. What is the appropriate response?",
  choices: [
    { id: "a", text: "Deploy a second anchor without first taking any load off the dragging one", whyWrong: "Adding a second anchor while the boat is still under load and drifting doesn't address the immediate need to regain control; motoring up to take the strain off first is the priority, and re-anchoring (potentially with a second anchor once under control) follows." },
    { id: "b", text: "Do nothing until daylight since anchor problems are easier to see then", whyWrong: "Waiting for daylight while drifting toward a lee shore risks grounding well before morning; a dragging anchor requires an immediate response, day or night." },
    { id: "c", text: "Start the engine, motor forward to take the load off the rode, then re-anchor with more scope or in a better-protected spot, or move to a different anchorage entirely" },
    { id: "d", text: "Let out more scope and go back to sleep, trusting the anchor will reset itself", whyWrong: "Simply adding scope and going back to sleep without confirming the anchor has actually reset leaves the boat still drifting toward danger; the situation needs active attention until it's clearly resolved." }
],
  correctChoiceId: "c",
  explanation: "Dragging toward a lee shore is urgent: motoring forward relieves strain on the rode and gives the crew control, buying time to either re-anchor with more scope and a better bite, or relocate to a more protected spot with better holding, rather than continuing to drift.",
  source: 'ASA 103 standard curriculum — dragging anchor, response and re-anchoring',
},
{
  id: 'emer-grounding-recognize',
  topic: 'emergencies',
  format: 'visual',
  assetId: 'photo-grounded-boat',
  prompt: "A recreational sailboat like the one pictured has run aground on a falling tide. What is the most urgent early consideration?",
  choices: [
    { id: "a", text: "Whether the crew's phones have enough battery for photos", whyWrong: "This is irrelevant to the urgency of the situation; the tide state directly affects whether prompt action is needed to avoid the boat settling further aground." },
    { id: "b", text: "Whether to immediately power hard in reverse regardless of the bottom type or the boat's angle", whyWrong: "Powering hard without first assessing the situation (bottom type, damage, heel, tide) can drive the boat further aground or cause more damage; the tide state and a careful assessment come first." },
    { id: "c", text: "None of these matter until the boat is fully afloat again", whyWrong: "Assessing tide state (and hull integrity) matters immediately after grounding — waiting to think about it until the boat happens to float free ignores the window where action can prevent the situation from worsening." },
    { id: "d", text: "Whether the tide is falling or rising, since a falling tide means the boat may need to get off quickly before it settles further and is left high and dry" }
],
  correctChoiceId: "d",
  explanation: "On a falling tide, a grounded boat can settle further and become harder (or impossible) to free until the next high tide, and it may heel further as the water drops, risking damage or flooding through openings not designed to be exposed. Checking the tide state helps the crew decide whether to act quickly (kedging off, reducing weight/heel) or wait for a rising tide to help float the boat free.",
  source: 'ASA 103 standard curriculum — grounding, tide considerations',
},
{
  id: 'emer-grounding-response-immediate',
  topic: 'emergencies',
  format: 'text',
  prompt: "Immediately after running gently aground on a sandy bottom, what should the crew do first, before attempting to power off?",
  choices: [
    { id: 'a', text: "Stop forward progress, check for leaks or damage below, and assess depth, bottom type, and tide before deciding how to get free" },
    { id: 'b', text: "Immediately gun the engine in reverse at full throttle", whyWrong: "Powering hard immediately, before assessing the situation, can drive the boat further onto the bottom, stir up sediment into the engine intake, or worsen any hull damage; a quick assessment comes first." },
    { id: 'c', text: "Have crew jump overboard right away without checking depth or current", whyWrong: "Jumping overboard without first checking depth, current, and bottom conditions is a safety risk and isn't the first step; assessment comes before deciding whether that's even a useful action." },
    { id: 'd', text: "Continue trying to sail forward through the grounding", whyWrong: "Continuing to drive the boat forward onto the bottom can worsen the grounding rather than free it; the boat should be stopped and assessed first." },
  ],
  correctChoiceId: 'a',
  explanation: "The first step after any grounding is to stop, check the bilge for incoming water and inspect for obvious damage, and take stock of depth, bottom type, and tide. That assessment determines the safest way off — reversing out the way the boat came, kedging an anchor off to deeper water, reducing heel/weight, or waiting for a rising tide.",
  source: 'ASA 103 standard curriculum — grounding, immediate assessment',
},
{
  id: 'emer-grounding-avoid-further-damage',
  topic: 'emergencies',
  format: 'text',
  prompt: "After grounding, the crew wants to reduce the boat's draft to help float it free. Which action helps accomplish that?",
  choices: [
    { id: "a", text: "Wait passively with no attempt to reduce draft or heel, regardless of the tide direction", whyWrong: "On a falling tide especially, passively waiting risks the boat settling further; reducing draft by heeling (or kedging toward deeper water) is an active step that can help, when appropriate to conditions." },
    { id: "b", text: "Heel the boat over (for example by shifting crew weight to one side or easing the boom out with weight on it) to reduce the effective depth the keel needs" },
    { id: "c", text: "Fill the water tanks further to add stability", whyWrong: "Adding weight increases draft rather than reducing it, making it harder, not easier, to float free." },
    { id: "d", text: "Motor in circles around the grounding site at full throttle", whyWrong: "This doesn't reduce draft and can stir up bottom sediment into the engine intake or drive the boat further aground rather than help float it free." }
],
  correctChoiceId: "b",
  explanation: "Heeling the boat reduces how deep the keel sits, which can be enough to let it float free in a slightly-too-shallow spot. This is commonly done by shifting crew weight to the rail or easing the boom out and putting weight on it, combined with an attempt to move toward deeper water (by kedging an anchor out or reversing along the path the boat came in on).",
  source: 'ASA 103 standard curriculum — grounding, reducing draft to float free',
},
{
  id: 'emer-engine-failure-loss-of-propulsion',
  topic: 'emergencies',
  format: 'text',
  prompt: "The auxiliary engine on a sailboat dies while motoring in a narrow, crowded channel with light wind. What should the crew do first?",
  choices: [
    { id: "a", text: "Immediately call for a tow before attempting anything else", whyWrong: "Calling for assistance may well be appropriate, but the more urgent first step in a tight, trafficked channel is keeping the boat under some form of control (sail or anchor) so it doesn't become a hazard while waiting." },
    { id: "b", text: "Try repeatedly to restart the engine for as long as it takes before considering anything else", whyWrong: "Focusing solely on restarting the engine while the boat drifts uncontrolled in a tight channel ignores the more immediate risk; readiness to anchor or use sail takes priority alongside troubleshooting." },
    { id: "c", text: "Get the anchor ready to deploy immediately if needed to avoid drifting into danger, and assess whether sail or drifting room allow a safe move clear of the channel" },
    { id: "d", text: "Assume the boat will drift safely and take no action", whyWrong: "In a narrow, crowded channel, an uncontrolled drift risks the boat swinging into other traffic, a shoal, or a fixed structure; the crew should actively prepare a way to control the boat's position, such as anchoring." }
],
  correctChoiceId: "c",
  explanation: "Losing propulsion in a narrow, trafficked channel is an immediate close-quarters hazard. The priority is keeping the boat under some form of control — having the anchor ready to stop an uncontrolled drift, or using what wind is available — while also working the engine problem and, if needed, calling for a tow.",
  source: 'ASA 103 standard curriculum — engine failure, loss of propulsion in a channel',
},
{
  id: 'emer-engine-failure-under-sail-response',
  topic: 'emergencies',
  format: 'text',
  prompt: "The engine fails on a sailboat in open water with steady wind and sea room. What is the most appropriate response?",
  choices: [
    { id: "a", text: "Treat it as an automatic emergency requiring an immediate distress call", whyWrong: "With sea room and usable wind, a sailboat can typically continue safely under sail; an engine failure alone, in otherwise safe conditions, does not automatically require a distress call." },
    { id: "b", text: "Drop anchor immediately regardless of depth or location", whyWrong: "Anchoring is only useful in appropriate depth and holding ground; in open water it may not be practical or necessary at all if the boat can safely continue under sail." },
    { id: "c", text: "Stop the boat completely and wait for the engine to fix itself", whyWrong: "There's no reason to stop and wait passively when the boat has sea room and wind to sail on safely toward help or a harbor." },
    { id: "d", text: "Raise/trim sail to continue making way safely under sail toward a suitable harbor while troubleshooting or arranging assistance" }
],
  correctChoiceId: "d",
  explanation: "A sailboat is, by design, not dependent on its engine for propulsion. With adequate sea room and usable wind, the safe and appropriate response to an engine failure is to continue under sail toward a suitable harbor, while the crew troubleshoots the engine or arranges help if needed — reserving a distress call for situations where the boat is genuinely in danger.",
  source: 'ASA 103 standard curriculum — engine failure under sail, open water',
},
{
  id: 'emer-vhf-distress-mayday',
  topic: 'emergencies',
  format: 'text',
  prompt: "The boat is taking on water faster than the pumps can handle and the crew needs help immediately. What is the correct way to call for help on VHF?",
  choices: [
    { id: 'a', text: "Call \"Mayday, Mayday, Mayday\" on Channel 16, giving the boat's name, position, nature of distress, and number of people aboard" },
    { id: 'b', text: "Use the term \"Pan-Pan\" since that's the strongest distress call available", whyWrong: "Pan-Pan signals an urgent situation that is not yet immediately life-threatening; Mayday is the correct call for a situation involving grave and imminent danger, such as a boat that may sink." },
    { id: 'c', text: "Switch to a working channel first and only call for help once settled there", whyWrong: "A distress call is made on Channel 16, the internationally monitored distress and calling channel, not a working channel, so it reaches the widest range of listeners immediately." },
    { id: 'd', text: "Give only the boat's name and nothing else, to keep the call brief", whyWrong: "A distress call needs to include position and the nature of the emergency so responders know where to go and what to expect; omitting that information seriously delays effective help." },
  ],
  correctChoiceId: 'a',
  explanation: "A situation involving grave and imminent danger — such as flooding beyond the pumps' capacity — calls for a Mayday on Channel 16, stating the vessel's name, position, the nature of the distress, and the number of people aboard, so responders can act on complete information as quickly as possible.",
  source: 'ASA 103 standard curriculum — VHF distress calling procedure',
},
{
  id: 'emer-crew-injury-priorities',
  topic: 'emergencies',
  format: 'text',
  prompt: "A crew member is seriously injured on deck during a passage. What should the skipper prioritize first, before administering first aid?",
  choices: [
    { id: "a", text: "Wait until reaching port to provide any first aid at all", whyWrong: "Delaying all first aid until reaching port could allow a treatable injury to worsen significantly; first aid should begin promptly once the boat is under control." },
    { id: "b", text: "Make sure the boat and remaining crew are safe (for example, easing sail or heaving to as needed) so attention can be given to the injured person without creating a second emergency" },
    { id: "c", text: "Immediately leave the helm unattended to begin first aid", whyWrong: "Leaving the boat completely unmanaged, especially under sail, risks an accidental jibe, broach, or another crew member being hurt; the boat needs to be made safe first, even briefly, before full attention shifts to first aid." },
    { id: "d", text: "Continue exactly on course and speed with no change to sail trim while treating the injury", whyWrong: "Continuing to sail hard while trying to render first aid can be unsafe for both the injured person and whoever is helping them; reducing sail or heaving to is usually appropriate first." }
],
  correctChoiceId: "b",
  explanation: "The standard priority sequence is boat and crew safety first, then care for the injured person: reducing sail, heaving to, or otherwise stabilizing the boat's motion and course prevents a second incident and gives whoever renders first aid a stable platform to work from.",
  source: 'ASA 103 standard curriculum — crew injury response priorities',
},
];

/**
 * Length of the full practice mock exam. This is OUR study format, not a
 * statement about the official ASA 103 exam — see the mock-exam UI copy.
 * Change this one constant to change the exam length everywhere.
 */
export const MOCK_EXAM_SIZE = 100;

/** Study target used to frame mock results. Internal prep goal, not a certification threshold. */
export const MOCK_STUDY_TARGET_PCT = 85;

/**
 * How many questions each topic contributes to an exam of `size`.
 *
 * Every topic gets at least one question so nothing can be shut out, and the
 * rest is a plain proportional (largest-remainder) allocation against each
 * topic's share of the bank. Allocations are capped at what a topic actually
 * has, and any leftover is handed to topics that still have spare questions.
 */
export function mockTopicAllocation(
  size = MOCK_EXAM_SIZE,
  questions: Question[] = QUESTIONS,
): Map<TopicId, number> {
  const pools = new Map<TopicId, number>();
  for (const topicId of TOPIC_IDS) {
    pools.set(topicId, questions.filter((q) => q.topic === topicId).length);
  }
  const topics = TOPIC_IDS.filter((t) => (pools.get(t) ?? 0) > 0);
  const bankTotal = topics.reduce((n, t) => n + (pools.get(t) ?? 0), 0);
  const target = Math.min(size, bankTotal);

  const alloc = new Map<TopicId, number>();
  const remainder = new Map<TopicId, number>();
  for (const t of topics) {
    const quota = (target * (pools.get(t) ?? 0)) / bankTotal;
    const base = Math.min(Math.max(1, Math.floor(quota)), pools.get(t) ?? 0);
    alloc.set(t, base);
    remainder.set(t, quota - Math.floor(quota));
  }

  const capacityOrder = (a: TopicId, b: TopicId) => (remainder.get(b) ?? 0) - (remainder.get(a) ?? 0);
  let assigned = topics.reduce((n, t) => n + (alloc.get(t) ?? 0), 0);

  // Hand out the remaining seats by largest fractional remainder.
  const byRemainder = topics.slice().sort(capacityOrder);
  while (assigned < target) {
    const before = assigned;
    for (const t of byRemainder) {
      if (assigned >= target) break;
      if ((alloc.get(t) ?? 0) < (pools.get(t) ?? 0)) {
        alloc.set(t, (alloc.get(t) ?? 0) + 1);
        assigned += 1;
      }
    }
    if (assigned === before) break; // bank exhausted
  }
  // The min-one floor can overshoot on tiny exams; trim the largest allocations.
  while (assigned > target) {
    const trimmable = topics.filter((t) => (alloc.get(t) ?? 0) > 1).sort(
      (a, b) => (alloc.get(b) ?? 0) - (alloc.get(a) ?? 0),
    );
    if (trimmable.length === 0) break;
    const t = trimmable[0];
    alloc.set(t, (alloc.get(t) ?? 0) - 1);
    assigned -= 1;
  }
  return alloc;
}

/**
 * Pick the question ids for one mock-exam attempt.
 *
 * Guarantees: exactly `size` unique ids (or the whole bank if it is smaller),
 * every topic represented, per-topic counts roughly proportional to the bank,
 * and a different draw and order on every attempt. `rng` is injectable so
 * tests and the `?seed=` debug seam can make a run reproducible.
 */
export function selectMockQuestions(
  size = MOCK_EXAM_SIZE,
  rng: () => number = Math.random,
): string[] {
  const alloc = mockTopicAllocation(size);
  const picked: string[] = [];
  for (const topicId of TOPIC_IDS) {
    const want = alloc.get(topicId) ?? 0;
    if (want <= 0) continue;
    const pool = QUESTIONS.filter((q) => q.topic === topicId).map((q) => q.id);
    picked.push(...shuffle(pool, rng).slice(0, want));
  }
  return shuffle(picked, rng);
}
