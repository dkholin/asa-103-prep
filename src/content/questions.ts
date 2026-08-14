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
  {
    id: 'rule6-safe-speed-factors',
    topic: 'right-of-way',
    format: 'text',
    prompt:
      'When determining a safe speed, Rule 6 requires every vessel to take into account which of the following?',
    choices: [
      {
        id: 'a',
        text: 'Visibility, traffic density, and the vessel\'s stopping distance and turning ability',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 6(a) lists factors every vessel must weigh: visibility; traffic density; your own stopping distance and turning ability; background lighting at night; wind, sea, current, and nearby navigational hazards; and draft in relation to available depth. Safe speed is the speed that lets you take proper and effective action to avoid collision and stop within a distance appropriate to the circumstances.',
    source: 'COLREGS Rule 6(a) — USCG Navigation Rules',
  },
  {
    id: 'rule6-safe-speed-radar',
    topic: 'right-of-way',
    format: 'text',
    prompt:
      'You are underway with your radar operating. Rule 6(b) adds which additional factor to your safe-speed decision, beyond the factors that apply to every vessel?',
    choices: [
      {
        id: 'a',
        text: 'The characteristics, range scale, and limitations of the radar set in use',
      },
      {
        id: 'b',
        text: "The number of passengers aboard",
        whyWrong: 'Passenger count is not a Rule 6 safe-speed factor.',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      "Rule 6(b) requires vessels with operational radar to additionally weigh the radar's characteristics and limitations, the range scale in use, sea/weather effects on radar detection, the possibility small vessels or ice may not be detected at adequate range, the number and movement of vessels detected, and the more exact assessment of visibility that ranging on radar targets may provide.",
    source: 'COLREGS Rule 6(b) — USCG Navigation Rules',
  },
  {
    id: 'rule7-risk-bearing',
    topic: 'right-of-way',
    format: 'text',
    prompt:
      'You are tracking an approaching vessel and notice her compass bearing from you is not appreciably changing over several minutes. What does Rule 7 say this indicates?',
    choices: [
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
      {
        id: 'd',
        text: 'Nothing — bearing drift is only meaningful on radar',
        whyWrong:
          'A steady visual compass bearing is itself the traditional way mariners detect collision risk, radar or not.',
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
    format: 'text',
    prompt:
      'Rule 7(c) specifically warns against doing what, when assessing risk of collision?',
    choices: [
      {
        id: 'a',
        text: 'Making assumptions on the basis of scanty information, especially scanty radar information',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      "Rule 7(c): assumptions shall not be made on the basis of scanty information, especially scanty radar information. A weak or ambiguous radar return is not enough to conclude risk of collision does not exist — when in doubt, Rule 7(a) says assume it does.",
    source: 'COLREGS Rule 7(c) — USCG Navigation Rules',
  },
  {
    id: 'rule8-early-substantial',
    topic: 'right-of-way',
    format: 'text',
    prompt:
      'Rule 8(a) says any action taken to avoid collision shall be:',
    choices: [
      {
        id: 'a',
        text: 'Positive, made in ample time, and in accordance with good seamanship',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 8(a): any action to avoid collision shall, if the circumstances admit, be positive, made in ample time, and with due regard to the observance of good seamanship.',
    source: 'COLREGS Rule 8(a) — USCG Navigation Rules',
  },
  {
    id: 'rule8-substantial-alterations',
    topic: 'right-of-way',
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
    format: 'text',
    prompt:
      'If you have insufficient sea room to avoid a close-quarters situation by altering course alone, Rule 8(e) says you should:',
    choices: [
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
      {
        id: 'd',
        text: 'Switch off navigation lights so the other vessel reacts first',
        whyWrong: 'Navigation lights must never be switched off underway — this is unsafe and unlawful.',
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
    format: 'text',
    prompt:
      'A sailing vessel is normally the stand-on vessel over an ordinary power-driven vessel. Under Rule 18, which vessels must a sailing vessel still keep out of the way of?',
    choices: [
      {
        id: 'a',
        text: 'A vessel not under command, a vessel restricted in her ability to maneuver, and a vessel engaged in fishing',
      },
      {
        id: 'b',
        text: 'Any vessel that is larger than her',
        whyWrong: 'Size is not a Rule 18 criterion.',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 18(b): a sailing vessel underway shall keep out of the way of a vessel not under command, a vessel restricted in her ability to maneuver, and a vessel engaged in fishing. She remains stand-on only against ordinary power-driven vessels (subject to Rules 9, 10, and 13).',
    source: 'COLREGS Rule 18(b) — USCG Navigation Rules',
  },
  {
    id: 'rules-sail-same-tack-text',
    topic: 'right-of-way',
    format: 'text',
    prompt:
      'Two sailing vessels are running before the wind on the same tack, converging. Vessel A is directly upwind of vessel B. Which vessel must keep clear?',
    choices: [
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
      {
        id: 'd',
        text: 'Whichever vessel has less sail area',
        whyWrong: 'Sail area is not a right-of-way criterion.',
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
    format: 'text',
    prompt:
      'A vessel is considered to be "overtaking" another when she is approaching from:',
    choices: [
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
    ],
    correctChoiceId: 'a',
    explanation:
      "Rule 13(b): a vessel is overtaking when coming up with another from a direction more than 22.5° abaft her beam, i.e., in such a position that at night she would be able to see only the sternlight of the vessel she is overtaking, and neither of her sidelights.",
    source: 'COLREGS Rule 13(b) — USCG Navigation Rules',
  },
  {
    id: 'rules-overtaking-doubt',
    topic: 'right-of-way',
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
    format: 'text',
    prompt:
      'You began overtaking another vessel from well abaft her beam. As you draw abreast, the bearing between you changes so it now looks more like a crossing situation. Does your overtaking obligation end?',
    choices: [
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
      {
        id: 'd',
        text: 'It depends on which vessel sounds a signal first',
        whyWrong: 'Sound signals do not reassign right-of-way obligations set by the Rules.',
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
    format: 'visual',
    assetId: 'custom-headon-bowview',
    prompt:
      'Two power-driven vessels are meeting on reciprocal or nearly reciprocal courses, each seeing the other dead ahead (diagram). What must each vessel do?',
    choices: [
      { id: 'a', text: 'Each alters course to starboard so they pass port to port' },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 14(a): when two power-driven vessels are meeting on reciprocal or nearly reciprocal courses so as to involve risk of collision, each shall alter her course to starboard so that each passes on the port side of the other. Neither vessel is stand-on in a head-on situation.',
    source: 'COLREGS Rule 14(a) — USCG Navigation Rules',
  },
  {
    id: 'rules-headon-doubt',
    topic: 'right-of-way',
    format: 'text',
    prompt:
      'You are approaching another power-driven vessel and are uncertain whether a true head-on situation exists. Rule 14(c) instructs you to:',
    choices: [
      { id: 'a', text: 'Assume that it does exist and act accordingly' },
      {
        id: 'b',
        text: 'Assume it does not exist and hold your course',
        whyWrong: 'Rule 14(c) resolves doubt the opposite way — toward assuming the situation exists.',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 14(c): if in doubt as to whether a head-on situation exists, a vessel shall assume that it does exist and act accordingly — altering to starboard.',
    source: 'COLREGS Rule 14(c) — USCG Navigation Rules',
  },
  {
    id: 'rules-headon-standon',
    topic: 'right-of-way',
    format: 'text',
    prompt:
      'In a true head-on situation between two power-driven vessels, which vessel is the stand-on vessel?',
    choices: [
      { id: 'a', text: 'Neither — both vessels are obligated to alter course' },
      {
        id: 'b',
        text: 'The larger vessel',
        whyWrong: 'Size does not create a stand-on vessel in a head-on encounter.',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Head-on is unique among the meeting situations: Rule 14 gives both vessels the same duty to alter to starboard. Unlike crossing (Rule 15) or overtaking (Rule 13), there is no stand-on vessel that holds course and speed.',
    source: 'COLREGS Rule 14(a) — USCG Navigation Rules',
  },
  {
    id: 'rules-headon-sail-not-power',
    topic: 'right-of-way',
    format: 'text',
    prompt:
      'Two sailing vessels are approaching each other bow to bow, one on port tack and one on starboard tack. Does Rule 14 (the power-driven head-on rule) govern this encounter?',
    choices: [
      {
        id: 'a',
        text: 'No — Rule 14 applies only to power-driven vessels; this is governed by Rule 12\'s tack rules',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 14 by its own text applies to two power-driven vessels. Two sailing vessels under sail alone, even meeting bow to bow, are governed instead by Rule 12: the port-tack vessel keeps clear of the starboard-tack vessel.',
    source: 'COLREGS Rules 12, 14 — USCG Navigation Rules',
  },
  {
    id: 'rules-crossing-standon',
    topic: 'right-of-way',
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
    format: 'text',
    prompt:
      'The crossing rule, Rule 15, applies specifically between:',
    choices: [
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
      {
        id: 'd',
        text: 'A power-driven vessel and a vessel engaged in fishing only',
        whyWrong: 'A vessel fishing is covered by the Rule 18 hierarchy, not the crossing rule.',
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
    format: 'text',
    prompt:
      'In a crossing situation, Rule 15 directs the give-way vessel to avoid crossing ahead of the other vessel and, if circumstances allow, to pass astern instead. Why?',
    choices: [
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
      {
        id: 'd',
        text: 'It lets you maintain higher speed throughout',
        whyWrong: 'The rationale is about clarity and safety margin, not maintaining speed.',
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
    format: 'text',
    prompt:
      'Rule 16 says the give-way vessel shall:',
    choices: [
      { id: 'a', text: 'Take early and substantial action to keep well clear' },
      {
        id: 'b',
        text: 'Wait for the stand-on vessel to signal before acting',
        whyWrong: 'The give-way vessel\'s duty to act does not depend on a signal from the stand-on vessel.',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 16: every vessel required to keep out of the way of another shall, so far as possible, take early and substantial action to keep well clear.',
    source: 'COLREGS Rule 16 — USCG Navigation Rules',
  },
  {
    id: 'rules-standon-may-act-no-port',
    topic: 'right-of-way',
    format: 'text',
    prompt:
      'As the stand-on vessel in a crossing situation, you decide it is now clear the give-way vessel is not taking appropriate action, so you take avoiding action of your own under Rule 17(a)(ii). What must you avoid doing, if circumstances allow?',
    choices: [
      {
        id: 'a',
        text: 'Altering course to port for a vessel on your own port side',
      },
      {
        id: 'b',
        text: 'Using your engine at all',
        whyWrong: 'Rule 17 does not forbid using the engine — slackening or stopping speed is a normal part of avoiding action.',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 17(c): a power-driven vessel taking action under 17(a)(ii) in a crossing situation shall, if the circumstances admit, not alter course to port for a vessel on her own port side. Altering to port here could turn you back into the other vessel\'s path.',
    source: 'COLREGS Rule 17(c) — USCG Navigation Rules',
  },
  {
    id: 'rules-standon-must-act',
    topic: 'right-of-way',
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
    format: 'text',
    prompt:
      'Under Rule 18, an ordinary power-driven vessel underway must generally keep out of the way of which of these vessels (except where Rules 9, 10, or 13 say otherwise)?',
    choices: [
      {
        id: 'a',
        text: 'A vessel not under command, a vessel restricted in her ability to maneuver, a vessel engaged in fishing, and a sailing vessel',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 18(a): a power-driven vessel underway shall keep out of the way of a vessel not under command, a vessel restricted in her ability to maneuver, a vessel engaged in fishing, and a sailing vessel. This general hierarchy yields to the specific crossing/overtaking rules (15, 13) and the narrow-channel/traffic-scheme rules (9, 10) where they apply.',
    source: 'COLREGS Rule 18(a) — USCG Navigation Rules',
  },
  {
    id: 'rules-standon-duty-not-relieved',
    topic: 'right-of-way',
    format: 'text',
    prompt:
      'The stand-on vessel fails to keep her course and speed as Rule 17 requires. Does this relieve the give-way vessel of her Rule 16 obligation to keep out of the way?',
    choices: [
      { id: 'a', text: 'No — the give-way vessel\'s obligation continues regardless' },
      {
        id: 'b',
        text: 'Yes — if the stand-on vessel breaks the rule first, the give-way vessel is released from her duty',
        whyWrong:
          'Nothing in the Rules makes the give-way vessel\'s obligation conditional on the stand-on vessel behaving perfectly.',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'The give-way vessel\'s duty under Rule 16 stands on its own and is not conditioned on the stand-on vessel doing everything right. Good seamanship (Rule 2) and Rule 16 both require the give-way vessel to keep clear regardless of the other vessel\'s conduct.',
    source: 'COLREGS Rules 2, 16, 17 — USCG Navigation Rules',
  },
  {
    id: 'lights-two-masthead-50m',
    topic: 'nav-lights',
    format: 'text',
    prompt:
      'At night you see a vessel showing two white masthead lights in a vertical line, the forward one lower than the after one, along with sidelights and a sternlight. What is she?',
    choices: [
      {
        id: 'a',
        text: 'A power-driven vessel 50 meters or more in length, underway',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 23(a): a power-driven vessel less than 50 m shows one masthead light; a vessel 50 m or more adds a second, higher masthead light abaft and above the first, in addition to sidelights and a sternlight. Exam cue: two masthead lights (forward lower) + sidelights + sternlight = power-driven vessel 50 m or more.',
    source: 'COLREGS Rule 23(a) — USCG Navigation Rules',
  },
  {
    id: 'lights-nuc',
    topic: 'nav-lights',
    format: 'text',
    prompt:
      'At night, two all-round RED lights displayed in a vertical line indicate a vessel that is:',
    choices: [
      { id: 'a', text: 'Not under command' },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 27(a): a vessel not under command shows two all-round red lights in a vertical line where best seen, plus sidelights and a sternlight if making way. Memory aid: "red over red, the captain is dead" — she cannot maneuver as the Rules require due to some exceptional circumstance.',
    source: 'COLREGS Rule 27(a) — USCG Navigation Rules',
  },
  {
    id: 'lights-ram',
    topic: 'nav-lights',
    format: 'text',
    prompt:
      'At night, all-round lights shown in the order red, white, red (top to bottom) in a vertical line indicate a vessel that is:',
    choices: [
      { id: 'a', text: 'Restricted in her ability to maneuver' },
      {
        id: 'b',
        text: 'Not under command',
        whyWrong: 'Not under command is two all-round red lights only, no white light between them.',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Rule 27(b): a vessel restricted in her ability to maneuver (e.g., laying cable, dredging, underwater operations) shows three all-round lights in a vertical line — red, white, red — plus sidelights and a sternlight if making way.',
    source: 'COLREGS Rule 27(b) — USCG Navigation Rules',
  },
  {
    id: 'rule19-avoid-alter-port-forward',
    topic: 'right-of-way',
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
    format: 'text',
    prompt:
      'Rule 19(b) requires every vessel, in or near an area of restricted visibility, to:',
    choices: [
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
      {
        id: 'd',
        text: 'Rely on radar alone and disregard sound signals',
        whyWrong: 'Radar does not replace the sound-signal requirements of Rule 35 in restricted visibility.',
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
    format: 'text',
    prompt:
      'In fog, you hear another vessel\'s fog signal apparently forward of your beam and cannot avoid a close-quarters situation. Rule 19(e) says you must:',
    choices: [
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
      {
        id: 'd',
        text: 'Sound one prolonged blast and continue at the same speed',
        whyWrong: 'Continuing at the same speed does not satisfy the Rule 19(e) duty to reduce speed.',
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
      {
        id: 'd',
        text: 'The vessel wants to be overtaken on that side',
        whyWrong: 'Overtaking side is negotiated by sound signal (Rule 34), not by flag.',
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
    format: 'visual',
    assetId: 'photo-plotting-tools',
    prompt:
      'In the photo, sailors are plotting a course on a paper chart. What is the two-pointed metal tool being used to step off distances between two points on the chart?',
    choices: [
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Dividers are a two-pointed tool used to measure distance: open them to span two points on the chart, then walk or compare that span against the latitude (mile) scale on the chart border to read off the distance in nautical miles.',
    source: 'USCG Auxiliary / ASA 103 piloting fundamentals — chart tools',
  },
  {
    id: 'chart-nav-tools-parallel-rules',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'photo-parallel-rule',
    prompt:
      'This drafting-style tool is made of two clear rulers connected by pivoting arms so they can "walk" across a chart while staying parallel. What is its main use in coastal navigation?',
    choices: [
      {
        id: 'a',
        text: 'Transferring a course or bearing line to and from the compass rose to read or plot a direction',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Parallel rules keep their edges parallel as you "walk" them across the chart. Lay one edge along a plotted course line, walk the rules to the nearest compass rose, and read the direction — or start at the rose and walk the line out to your position to plot a bearing.',
    source: 'USCG Auxiliary / ASA 103 piloting fundamentals — chart tools',
  },
  {
    id: 'chart-nav-tools-compass-rose-rings',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'noaa-compass-rose',
    prompt:
      'A NOAA chart compass rose is shown. It has an outer ring of degree graduations and a separate inner ring labeled "MAGNETIC" with its own set of graduations. What do these two rings represent?',
    choices: [
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
    ],
    correctChoiceId: 'a',
    explanation:
      'A standard NOAA compass rose prints two concentric graduated circles: the outer ring is referenced to true north, and the inner ring — labeled MAGNETIC — is referenced to magnetic north. The offset between them, printed in the middle of the rose (e.g., "VAR 4°15\'W"), is the local magnetic variation.',
    source: 'NOAA U.S. Chart No. 1 — Positions, Distances, Directions, Compass (Section B)',
  },
  {
    id: 'chart-nav-tools-chart-parts',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'noaa-chart-schematic',
    prompt:
      'This is a schematic layout of a NOAA/NGA nautical chart. Which of these is NOT something you would expect to find printed directly on a real nautical chart\'s border or title block?',
    choices: [
      {
        id: 'a',
        text: 'The current weather forecast for the charted area',
        whyWrong:
          'Weather forecasts are not printed on a chart — charts show fixed information (soundings, hazards, aids, scale); forecasts are obtained separately (VHF, apps, briefings).',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'A chart\'s title block and margins carry static reference information: chart number, scale, projection, sounding units, a compass rose, and cautionary notes. Dynamic information like today\'s weather is never printed on the chart itself — mariners get that from separate, current sources.',
    source: 'NOAA U.S. Chart No. 1 — Chart Number, Title, Marginal Notes (Section A)',
  },
  {
    id: 'chart-nav-sym-danger-line',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'noaa-rocks-general',
    prompt:
      'The dotted line drawn around the light-blue shaded area in this NOAA Chart No. 1 excerpt is called a "danger line." What is its purpose?',
    choices: [
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
    ],
    correctChoiceId: 'a',
    explanation:
      'A danger line (a dotted or dashed line) draws the mariner\'s eye to a hazard — such as an isolated rock — or delimits an area containing numerous dangers that is unsafe to navigate through, even when the symbol alone might be easy to miss at chart scale.',
    source: 'NOAA U.S. Chart No. 1 — Rocks, Wrecks, Obstructions and Aquaculture (Section K)',
  },
  {
    id: 'chart-nav-sym-buoy-beacon-default',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'noaa-buoy-beacon-basic',
    prompt:
      'On a chart, an unlabeled small circle sitting atop a teardrop-shaped symbol is the default symbol for a buoy when no other information is given. What is the default symbol for a beacon?',
    choices: [
      {
        id: 'a',
        text: 'A vertical dagger/spike symbol sitting on a small circle, since a beacon is a fixed structure rather than a floating one',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Chart No. 1 gives buoys and beacons distinct default symbols: a buoy (which floats, moored to the bottom) uses a teardrop shape over a small circle marking its charted position; a beacon (a fixed structure, like a piling or tower) uses a dagger-like spike over a small circle. Additional attributes (color, shape, topmark, light) refine the symbol once known.',
    source: 'NOAA U.S. Chart No. 1 — Buoys, Beacons (Section Q)',
  },
  {
    id: 'chart-nav-sym-wk-abbrev',
    topic: 'chart-nav',
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
    format: 'text',
    prompt:
      'What does the chart abbreviation "Obstn" identify?',
    choices: [
      {
        id: 'a',
        text: 'An obstruction — a foreign object or hazard on or near the bottom that is not a rock or a wreck',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      '"Obstn" marks an obstruction: a general hazard to navigation on or near the seabed — such as a submerged piling, debris, or an unidentified foul area — that does not fit the specific rock or wreck symbols.',
    source: 'NOAA U.S. Chart No. 1 — Index of Abbreviations; Rocks, Wrecks, Obstructions (Section K)',
  },
  {
    id: 'chart-nav-sym-foul-ground',
    topic: 'chart-nav',
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
    format: 'visual',
    assetId: 'noaa-wreck-symbols',
    prompt:
      'The chart symbol shown — a shaded elongated shape labeled with a depth and "Wk" — represents a submerged wreck of known depth. Why does the exact depth over a wreck matter to you as the navigator?',
    choices: [
      {
        id: 'a',
        text: 'It tells you whether your vessel\'s draft can safely clear the wreck if you must pass over or near it',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'A submerged wreck symbol with a numeric depth (e.g., "5₂ Wk") gives the charted depth over the highest part of the wreck. Comparing that figure (adjusted for tide) against your vessel\'s draft tells you whether it is safe to pass over, or whether you must route around it.',
    source: 'NOAA U.S. Chart No. 1 — Rocks, Wrecks, Obstructions and Aquaculture (Section K)',
  },
  {
    id: 'chart-nav-sym-wreck-unknown-depth',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'noaa-wreck-symbols',
    prompt:
      'Compare the two wreck symbols in this NOAA Chart No. 1 excerpt: one is labeled with a specific depth (e.g., "5₂ Wk"), the other only shows "Wk" with no number. What does the unlabeled version mean, and how should you treat it?',
    choices: [
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
    ],
    correctChoiceId: 'a',
    explanation:
      'When no depth figure accompanies a "Wk" symbol, the depth over the wreck has not been determined. Prudent navigation treats an unknown-depth wreck as a hazard to be avoided rather than assumed to be safely deep — never guess a clearance the chart does not give you.',
    source: 'NOAA U.S. Chart No. 1 — Rocks, Wrecks, Obstructions and Aquaculture (Section K)',
  },
  {
    id: 'chart-nav-sym-chart-datum-abbrev',
    topic: 'chart-nav',
    format: 'text',
    prompt:
      'Charted soundings (water depths) are all measured relative to a reference plane abbreviated "CD" on NOAA charts. What does "CD" stand for, and why does it matter?',
    choices: [
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
      {
        id: 'd',
        text: 'Central Depth — the average depth of the whole chart area',
        whyWrong:
          'Chart datum is a fixed vertical reference plane, not an averaged depth statistic.',
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
    format: 'visual',
    assetId: 'noaa-soundings-basic',
    prompt:
      'This NOAA Chart No. 1 excerpt shows sounding examples, including a plain number placed directly at a location on the chart (item 10, "sounding in true position"). What does a plain sounding number tell you?',
    choices: [
      {
        id: 'a',
        text: 'The depth of water at that exact charted position, referenced to chart datum',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'A plain number printed at a position on the chart is a sounding: the depth of water at that exact spot, measured down from chart datum. Sloping or subscript numerals may indicate the units (e.g., feet vs. fathoms and feet) per the chart\'s stated units.',
    source: 'NOAA U.S. Chart No. 1 — Depths (Section I)',
  },
  {
    id: 'chart-nav-sound-out-of-position',
    topic: 'chart-nav',
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
    format: 'visual',
    assetId: 'noaa-depth-contours',
    prompt:
      'This NOAA Chart No. 1 excerpt shows the shaded depth bands used on charts, running from a darker "foreshore" band down through progressively lighter shallow-water bands to deep water. What is the practical value of this color/shade coding at a glance?',
    choices: [
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
      {
        id: 'd',
        text: 'It shows which areas have cellular signal coverage',
        whyWrong:
          'Depth shading has nothing to do with communications coverage.',
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
    format: 'text',
    prompt:
      'Charts often print a small italic letter abbreviation near an anchorage, such as "S", "M", or "rky". What are these abbreviations describing?',
    choices: [
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
      {
        id: 'd',
        text: 'The name of the survey vessel',
        whyWrong:
          'Survey vessel identity is not part of routine bottom-character labeling.',
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
    format: 'visual',
    assetId: 'noaa-wreck-symbols',
    prompt:
      'On this NOAA Chart No. 1 excerpt, the magenta circle-with-an-X ECDIS symbol is labeled "isolated danger of depth less than the safety contour." What does an isolated danger mark tell a navigator?',
    choices: [
      {
        id: 'a',
        text: 'There is a small, specific hazard (rock, wreck, or obstruction) of limited extent at that spot that is shallower than a safe working depth — go around it',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'An isolated danger symbol flags a discrete hazard of limited size — such as a single rock or wreck — that is shallower than the chart\'s safety contour. It warns you to avoid that specific spot; the surrounding water is otherwise navigable at the plotted depths.',
    source: 'NOAA U.S. Chart No. 1 — Rocks, Wrecks, Obstructions and Aquaculture (Section K)',
  },
  {
    id: 'chart-nav-sound-rock-awash',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'noaa-rock-covers',
    prompt:
      'This NOAA Chart No. 1 excerpt shows a rock symbol described as "which covers and uncovers, height above chart datum." What does it mean for a rock to "cover and uncover"?',
    choices: [
      {
        id: 'a',
        text: 'The rock is exposed (dry) at low tide but submerged at higher tide levels, so its danger to a passing vessel changes with the state of the tide',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'A rock that "covers and uncovers" is one whose top lies between the high-water and low-water lines: it is visible (dry) at low tide but submerged and invisible at higher tide — making it especially dangerous, since it can disappear from view exactly when it becomes a collision hazard.',
    source: 'NOAA U.S. Chart No. 1 — Rocks, Wrecks, Obstructions and Aquaculture (Section K)',
  },
  {
    id: 'chart-nav-aton-lateral-colors',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'noaa-iala-region-b',
    prompt:
      'This is the IALA Region B lateral-mark diagram (the system used in U.S. waters) from NOAA Chart No. 1. What colors and shapes identify the port-hand and starboard-hand marks?',
    choices: [
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
      {
        id: 'd',
        text: 'Colors are not standardized and vary by state',
        whyWrong:
          'IALA lateral mark colors are internationally standardized within each buoyage region; Region B (used in the U.S.) is consistent nationwide.',
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
    format: 'visual',
    assetId: 'noaa-iala-region-b',
    prompt:
      'A preferred-channel (junction) mark has horizontal bands of both red and green. If the topmost band on the buoy is red, what does that tell you about the preferred (primary) channel?',
    choices: [
      {
        id: 'a',
        text: 'The preferred channel is to your starboard when returning from seaward — treat the mark generally as you would a red, starboard-hand mark',
      },
      {
        id: 'b',
        text: 'The preferred channel is to your port when returning from seaward',
        whyWrong:
          'A red-topped junction mark indicates the preferred channel is to starboard, not port — a green-topped mark would indicate port instead.',
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
    correctChoiceId: 'a',
    explanation:
      'A junction/preferred-channel mark shows red and green bands; the color of the topmost band indicates which lateral color the mark should be treated as for the preferred route. A red-topped mark means the preferred channel lies to your starboard when returning from seaward — pass it as you would a red nun. A green-topped mark means the preferred channel is to port.',
    source: 'NOAA U.S. Chart No. 1, Appendix 1 — IALA Maritime Buoyage System, Region B (Preferred Channel Marks)',
  },
  {
    id: 'chart-nav-aton-daymark-shapes',
    topic: 'chart-nav',
    format: 'text',
    prompt:
      'Fixed daymarks (unlit, shore- or piling-mounted signs) also follow the lateral color system. What shape and color combination marks the starboard-hand side of a channel by day?',
    choices: [
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
      {
        id: 'd',
        text: 'A white, circular daymark',
        whyWrong:
          'A plain white circle is not a standard lateral daymark shape.',
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
    format: 'visual',
    assetId: 'noaa-light-characters',
    prompt:
      'This NOAA Chart No. 1 excerpt illustrates several light characteristics. A light charted as "Fl" flashes with the dark period longer than the light period. How would a "Q" (quick-flashing) light differ from an ordinary "Fl" light?',
    choices: [
      {
        id: 'a',
        text: 'A quick-flashing light repeats its flash much more rapidly — about 50 to 79 flashes per minute — versus the slower, more widely spaced single flashes of an ordinary "Fl" light',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Ordinary flashing ("Fl") lights show single, well-spaced flashes with dark periods longer than the flash. Quick-flashing ("Q") lights repeat much faster — about 50 to 79 flashes per minute — a visibly different, rapid twinkling rhythm used to make an aid more conspicuous or to mark specific hazards.',
    source: 'NOAA U.S. Chart No. 1 — Lights, Light Characters (Section P)',
  },
  {
    id: 'chart-nav-aton-light-occulting',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'noaa-light-characters',
    prompt:
      'In the light-character illustrations shown, an "Occulting" (Oc) light is defined as one where the total duration of light is longer than the total duration of darkness. How does this differ from a "Fixed" (F) light?',
    choices: [
      {
        id: 'a',
        text: 'A fixed light shows continuously with no dark periods at all, while an occulting light is mostly lit but briefly and regularly goes dark',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'A fixed (F) light shows a steady, continuous light with no interruption. An occulting (Oc) light is lit most of the time but briefly and regularly "occults" (goes dark) — the opposite emphasis of a flashing light, where darkness dominates over brief flashes.',
    source: 'NOAA U.S. Chart No. 1 — Lights, Light Characters (Section P)',
  },
  {
    id: 'chart-nav-aton-beacon-vs-buoy',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'noaa-buoy-beacon-basic',
    prompt:
      'Chart No. 1 gives separate default symbols for buoys and beacons, as shown here. Practically speaking, why does it matter to a navigator whether an aid to navigation is a buoy or a beacon?',
    choices: [
      {
        id: 'a',
        text: 'A beacon is fixed to the bottom or shore and stays exactly where charted, while a buoy is anchored and can shift position slightly, be dragged off station by weather, or occasionally go missing — so a beacon\'s charted position is more absolutely reliable',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'A beacon is a fixed structure — a piling, tower, or daymark on land — so its charted position is exact and permanent. A buoy floats, moored by a chain to a sinker; storms, ship strikes, or ice can drag it off station or sink it entirely, so mariners should treat a buoy\'s position as generally reliable but not absolutely guaranteed, and should not rely on buoys alone in thick weather.',
    source: 'NOAA U.S. Chart No. 1 — Buoys, Beacons (Section Q)',
  },
  {
    id: 'chart-nav-latlong-reading',
    topic: 'chart-nav',
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
    format: 'text',
    prompt:
      'A charted position is given as 41°24.5\'N. How should this be read?',
    choices: [
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
      {
        id: 'd',
        text: '41 degrees, 24 minutes, 5 seconds',
        whyWrong:
          'The decimal after 24 means 24.5 minutes (a fraction of a minute), not "24 minutes 5 seconds" — that would be written 41°24\'05".',
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
    format: 'text',
    prompt:
      'Latitude is measured as an angular distance north or south of what reference line?',
    choices: [
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
      {
        id: 'd',
        text: 'The nearest coastline',
        whyWrong:
          'Latitude is a fixed global reference (the equator), not a local reference to nearby land.',
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
    format: 'text',
    prompt:
      'Why is the latitude scale on the side border of a chart used to measure distance, rather than the longitude scale on the top or bottom border?',
    choices: [
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
    ],
    correctChoiceId: 'a',
    explanation:
      'By definition, one minute of latitude equals one nautical mile everywhere on the globe, since meridians of longitude all converge at the poles but the distance between parallels of latitude stays essentially constant. A minute of longitude, by contrast, spans a full nautical mile only at the equator and covers less and less actual distance as you move toward the poles — so only the latitude (side) scale gives a reliable, constant distance scale.',
    source: 'ASA 103 piloting fundamentals — the nautical mile and the latitude scale',
  },
  {
    id: 'chart-nav-compass-true-vs-magnetic',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'noaa-compass-rose',
    prompt:
      'On this compass rose, the outer ring is referenced to true north and the inner "MAGNETIC" ring is offset from it by the local variation. What is magnetic variation?',
    choices: [
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
      {
        id: 'd',
        text: 'The difference between magnetic north this year and magnetic north a century ago',
        whyWrong:
          'Variation does slowly change over years (which is why charts print an annual-change note), but the term itself refers to the true-vs-magnetic angular offset at a location, not a change over time.',
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
    format: 'text',
    prompt:
      'A chart\'s compass rose states "VAR 6°W." If you plot a true course of 090° (due east) on the chart, what magnetic course should you steer to follow that same track, ignoring deviation?',
    choices: [
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
      {
        id: 'd',
        text: '180° magnetic',
        whyWrong:
          'That is unrelated to a 6° correction; it looks like an unrelated reversal rather than applying the stated variation.',
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
    format: 'visual',
    assetId: 'noaa-compass-rose',
    prompt:
      'This compass rose is annotated "VAR 4°15\'W (2018), ANNUAL CHANGE 8\'E" — meaning the westerly variation is decreasing by 8 minutes of arc each year. Roughly what would the variation be in 2026, eight years later?',
    choices: [
      {
        id: 'a',
        text: 'About 3°N/A — approximately 1° less westerly than in 2018, since 8 years × 8\' per year ≈ 64\', or just over 1°, decreasing the original 4°15\'W',
      },
      {
        id: 'b',
        text: 'Exactly the same, 4°15\'W, since variation never actually changes in practice',
        whyWrong:
          'The chart explicitly states an annual change rate — ignoring it defeats the purpose of that printed note, especially on an older chart edition.',
      },
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
    ],
    correctChoiceId: 'a',
    explanation:
      'The annual change note lets you correct an older chart\'s variation for the current year. Here, 8 years × 8\' per year = 64\', or about 1°04\', which reduces the 2018 westerly variation of 4°15\'W to roughly 3°11\'W by 2026. Always check a chart\'s edition date and apply its stated annual change — or use a current chart/electronic source — for the most accurate variation.',
    source: 'NOAA U.S. Chart No. 1 — Positions, Distances, Directions, Compass (Section B)',
  },
  {
    id: 'chart-nav-compass-deviation-vs-variation',
    topic: 'chart-nav',
    format: 'text',
    prompt:
      'Besides variation, a boat\'s steering compass can be affected by "deviation." How does deviation differ from variation?',
    choices: [
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Variation is a property of a location on Earth (the same for every compass in that area). Deviation is a property of an individual vessel, caused by nearby ferrous metal, wiring, engines, and electronics aboard that specific boat — and because those influences act differently depending on which way the bow is pointed, deviation changes with heading and is recorded on a boat-specific deviation table or card.',
    source: 'ASA 103 piloting fundamentals — compass errors (variation vs. deviation)',
  },
  {
    id: 'chart-nav-distance-latitude-scale',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'custom-distance-scale',
    prompt:
      'In this diagram, dividers have been walked from Point A to Point B, then transferred to the latitude border scale, spanning three of the labeled 1-minute tick marks. About how far apart are Points A and B?',
    choices: [
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
      {
        id: 'd',
        text: '0.3 nautical miles',
        whyWrong:
          'That divides by 10 instead of reading the span directly — three whole 1-minute ticks span 3 nm, not 0.3 nm.',
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
    format: 'text',
    prompt:
      'Approximately how many feet are in one nautical mile, and how does a nautical mile compare to a statute (land) mile?',
    choices: [
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
    ],
    correctChoiceId: 'a',
    explanation:
      'A nautical mile is about 6,076 feet (1,852 meters), based on one minute of latitude. It is longer than the familiar statute (land) mile of 5,280 feet — about 1.15 statute miles to one nautical mile. Boat speed in knots is nautical miles per hour, which is why knots and statute-mile-per-hour speeds are not directly interchangeable.',
    source: 'ASA 103 piloting fundamentals — the nautical mile',
  },
  {
    id: 'chart-nav-distance-dividers-method',
    topic: 'chart-nav',
    format: 'text',
    prompt:
      'You need to measure the distance along a curving track between two points on a chart that is longer than a single span of your dividers. What is the standard technique?',
    choices: [
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
    ],
    correctChoiceId: 'a',
    explanation:
      'To measure a distance longer than one span of your dividers, open them to a convenient round number of miles, then "walk" them end-over-end along the track, counting each full step. Add any leftover partial step (measured against the latitude scale) to the count of full steps for the total distance.',
    source: 'ASA 103 piloting fundamentals — measuring distance with dividers',
  },
  {
    id: 'chart-nav-compass-interference-sources',
    topic: 'chart-nav',
    format: 'visual',
    assetId: 'custom-compass-interference',
    prompt:
      'In this diagram, a steering compass\'s needle is pulled off true north by nearby items. What two everyday items shown are the likely cause?',
    choices: [
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
    ],
    correctChoiceId: 'a',
    explanation:
      'Ferrous metal objects (like a steel toolbox) and electronics with motors, speakers, or magnets (like a handheld radio) can each generate their own local magnetic field strong enough to pull a nearby compass needle off true, adding deviation error. Keep such items well away from the steering compass, and never store them near it.',
    source: 'ASA 103 piloting fundamentals — compass deviation sources',
  },
  {
    id: 'chart-nav-compass-interference-siting',
    topic: 'chart-nav',
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
        id: 'a',
        text: 'It is a lee shore — a shoreline the wind is blowing onto — and if the anchor drags or the engine fails, the wind will push the boat directly onto the rocks with no room to recover',
      },
      {
        id: 'b',
        text: 'It is a windward shore, and the boat is perfectly safe there in any wind strength',
        whyWrong:
          'A shore the wind blows onto is called a lee shore, not a windward shore, and it is one of the more hazardous places to be anchored or becalmed.',
      },
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
      {
        id: 'd',
        text: 'Move even closer to shore for better shelter from the waves',
        whyWrong:
          'Moving closer to a shoreline the wind is blowing onto increases risk rather than reducing it — there is less room to react if the anchor drags.',
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
      {
        id: 'd',
        text: 'Folding flat for compact storage',
        whyWrong:
          'Unlike a folding grapnel, a claw anchor is a rigid, one-piece casting with no folding mechanism.',
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
      {
        id: 'd',
        text: 'It is designed to never touch the bottom, holding purely by its own weight in the water column',
        whyWrong:
          'A fluke anchor must dig into the seabed to hold; it does not work by weight alone while suspended in the water.',
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
        id: 'a',
        text: 'It is mainly used for permanent moorings in soft mud, where it slowly settles and buries over time for great holding — but as a working anchor it holds poorly at first set and does not grip well under a sudden load',
      },
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
        id: 'a',
        text: 'The type of bottom (sand, mud, rock, grass), the anchor\'s weight and size relative to the boat, and the scope and type of rode used',
      },
      {
        id: 'b',
        text: 'Only the anchor\'s purchase price',
        whyWrong:
          'Price does not determine holding power — bottom type, sizing, and scope/rode are the factors that actually govern performance.',
      },
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
      {
        id: 'd',
        text: 'Spot A, because it is closer to the bay mouth for a faster departure',
        whyWrong:
          'Convenience of departure is a minor factor compared to actually being protected from wind and wave action overnight.',
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
        id: 'a',
        text: 'Your boat will swing around its anchor through a full circle as wind and current shift, so you need enough clear room for that entire swing circle without touching other boats, shoals, or the shore',
      },
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
      {
        id: 'd',
        text: 'Only worry about it if the wreck is marked with a light',
        whyWrong:
          'An unlit, submerged hazard is still a real danger to an anchored or swinging boat; the presence or absence of a light does not change the underlying risk.',
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
        id: 'a',
        text: 'Observe how the existing boats are lying (which shows the prevailing wind/current effect and each boat\'s likely swing), then choose a spot with enough clearance that your swing circle will not overlap theirs',
      },
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
        id: 'a',
        text: 'Scope = the length of rode paid out, divided by the total vertical distance from the bow chock down to the seabed (depth plus bow height above the water)',
      },
      {
        id: 'b',
        text: 'Scope = the length of rode paid out, divided by the boat\'s overall length',
        whyWrong:
          'Scope is defined relative to the vertical distance from the bow to the bottom (depth plus bow height), not relative to the boat\'s length.',
      },
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
        id: 'a',
        text: '84 feet (7 × (10 + 2))',
      },
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
        id: 'a',
        text: '180 feet (10 × (15 + 3))',
      },
      {
        id: 'b',
        text: '150 feet (10 × 15, ignoring bow height)',
        whyWrong:
          'Leaving out the 3 feet of bow height understates the vertical distance — the correct total is 15 + 3 = 18 feet, times 10, equals 180 feet.',
      },
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
        id: 'a',
        text: 'Less scope reduces your swing circle and helps you fit into a tight anchorage, but it also steepens the angle of pull on the anchor and generally reduces its holding power',
      },
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
        id: 'a',
        text: 'The scope ratio should be based on the depth expected at high tide (not just the depth when you anchored), since the same rode length gives a lower scope ratio as the water deepens',
      },
      {
        id: 'b',
        text: 'Nothing — scope only needs to be calculated once, at whatever depth you happen to anchor in',
        whyWrong:
          'If you only account for the depth at the moment of anchoring, rising tide will silently reduce your effective scope and holding power exactly when you are not watching — the smart approach is to plan for the depth you will actually see.',
      },
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
      {
        id: 'd',
        text: 'Motor forward over the anchor immediately after dropping it',
        whyWrong:
          'Motoring forward over your own anchor and rode risks fouling the rode in the propeller or dragging the anchor before it can dig in — the correct motion is backing away to lay out and set the rode.',
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
        id: 'a',
        text: 'A gradual, building load lets the anchor dig progressively deeper into the bottom, whereas a sudden hard jerk can pull it out before it has buried, or shock-load and damage ground tackle',
      },
      {
        id: 'b',
        text: 'Gradual power saves fuel, which is the only reason for doing it this way',
        whyWrong:
          'Fuel economy is a minor side benefit at best — the real reason is giving the anchor a controlled, building load so it can dig in properly rather than being yanked loose.',
      },
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
        id: 'a',
        text: 'Set a GPS anchor-drag alarm, and periodically check bearings or ranges on two or more fixed shore objects — if they change beyond your expected swing, you are dragging',
      },
      {
        id: 'b',
        text: 'Trust that a properly set anchor can never drag once it has held for a few minutes',
        whyWrong:
          'No anchor set is guaranteed permanent — wind shifts, gusts, and changing loads can break even a well-set anchor free hours later, which is exactly why ongoing monitoring matters.',
      },
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
        id: 'a',
        text: 'Your swing circle currently reaches the neighboring boat, which is too close for safety — you should re-anchor with less scope, move to a different spot, or otherwise increase the separation',
      },
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
      {
        id: 'd',
        text: 'A mooring pendant is attached directly to your anchor rode',
        whyWrong:
          'A mooring pendant attaches to the boat\'s bow cleat or bow chock, not to your own separate ground tackle — picking up a mooring means you are not deploying your anchor and rode at all.',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A permanent mooring relies on heavy, long-term ground tackle — commonly a large mushroom anchor or concrete/heavy sinker with chain, rated for years of continuous holding — connected to a surface buoy with a pendant you pick up and cleat off. This is different equipment and a different arrangement from the anchor and rode you carry aboard, set, and retrieve on your own each time you anchor.',
    source: 'ASA 103 anchoring fundamentals — moorings vs. anchoring',
  },
];

/**
 * Deterministic mock-exam selection: two questions from each topic.
 * A full 100-question exam is out of scope for this project.
 */
export const MOCK_QUESTION_IDS: string[] = [
  'lights-power-underway',
  'lights-id-green-only',
  'rules-crossing-power',
  'rules-sail-opposite-tacks',
  'sound-one-short',
  'sound-fog-power-making-way',
  'flags-alpha',
  'flags-diver-down',
  'chart-nav-aton-lateral-colors',
  'chart-nav-latlong-reading',
  'anchor-type-danforth-fluke',
  'anchor-scope-calc-basic',
];
