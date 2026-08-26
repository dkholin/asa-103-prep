import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'navigation-rules-tools-reduced-visibility-sound-signals', moduleId: 'navigation-rules-tools', order: 5,
  title: 'Reduced Visibility & Sound Signals',
  intro: 'Operating in fog, and the whistle signals that carry intent and warning when you cannot rely on sight.',
  concepts: ['restricted-visibility', 'sound-signals'],
  blocks: [
    { kind: 'heading', text: 'Conduct in or near restricted visibility' },
    { kind: 'text', text: 'Rule 19 applies to vessels not in sight of one another in or near an area of restricted visibility. “Near” matters: the rule bites as you approach a fog bank, not only once you are inside it. And because neither vessel can see the other, there is no stand-on and no give-way vessel — both must simply navigate with care.' },
    {
      kind: 'list',
      items: [
        'Proceed at a safe speed for the visibility; a power-driven vessel must have her engines ready for immediate manoeuvre.',
        'Sharpen the lookout and add listening to it — cut cockpit noise so a fog signal can actually be heard.',
        'Use your detection means properly: radar if fitted and operational, including long-range scanning, plus AIS and a VHF watch.',
        'Make yourself detectable — lights on, radar reflector up, life jackets on.',
      ],
    },
    { kind: 'text', text: 'If you detect a vessel by radar alone and a close-quarters situation is developing, take avoiding action in ample time. Where that action is a course alteration, Rule 19(d) says avoid altering to port for a vessel forward of the beam unless overtaking her, and avoid altering toward a vessel abeam or abaft the beam.' },
    { kind: 'callout', tone: 'warning', title: 'A fog signal forward of the beam means slow down', text: 'Hear a fog signal apparently forward of your beam, or find you cannot avoid a close-quarters situation with a vessel forward of the beam, and Rule 19(e) requires you to reduce to the minimum speed at which you can be kept on course — all way off if necessary — until the danger is over. Sound carries strangely in fog: treat a bearing taken by ear as approximate.' },
    { kind: 'heading', text: 'Three different kinds of signal' },
    { kind: 'text', text: 'Manoeuvring signals between vessels in sight of one another, the danger signal, and the fog signals sounded at intervals — three groups, easy to blur together. A short blast is about one second, a prolonged blast four to six.' },
    { kind: 'heading', text: 'Manoeuvring signals — the International/Inland split' },
    { kind: 'text', text: 'This is the one place where the two rule sets say genuinely different things with the same blasts. Internationally, a Rule 34(a) signal reports an action you are taking now: one short blast means “I am altering my course to starboard.” Under the U.S. Inland Rules the same blast proposes a passing arrangement — “I intend to leave you on my port side” — and the other vessel answers with the same signal if she agrees, before either acts; if she doubts it, she sounds the danger signal instead.' },
    { kind: 'table', caption: 'Rule 34 — same blasts, different meanings', headers: ['Signal', 'International 34(a)', 'U.S. Inland 34(a)'], rows: [
      ['One short', '“I am altering my course to starboard”', '“I intend to leave you on my port side”'],
      ['Two short', '“I am altering my course to port”', '“I intend to leave you on my starboard side”'],
      ['Three short', '“I am operating astern propulsion”', '“I am operating astern propulsion”'],
      ['Reply expected?', 'No — the signal states an action', 'Yes — answered with the same signal if in agreement'],
    ] },
    { kind: 'callout', tone: 'note', title: 'When each set applies', text: 'The COLREGS Demarcation Lines (33 CFR Part 80) divide them: Inland Rules shoreward, International seaward. The Inland signals are narrower too — power-driven vessels in sight of one another, meeting or crossing within half a mile. Agree a passing by bridge-to-bridge radiotelephone and they need not be sounded; without agreement, whistle signals are exchanged and prevail.' },
    { kind: 'heading', text: 'The danger signal' },
    { kind: 'text', text: 'Five or more short and rapid blasts is the doubt or danger signal, identical under both rule sets: sounded when you fail to understand another vessel’s intentions, or doubt she is taking sufficient action. It does not discharge your own duty to act. Separately, one prolonged blast warns of a bend or obstructed stretch of channel, and under Rule 34(e) it is answered with a prolonged blast by any approaching vessel that may be within hearing around the bend or behind the intervening obstruction.' },
    { kind: 'heading', text: 'Fog signals' },
    { kind: 'text', text: 'Sounded in or near restricted visibility, by day or night, these characterise the vessel you cannot see: what kind she is, and whether she is moving. The interval belongs to the individual signal, not to the rule as a whole — most are not more than two minutes, but a vessel at anchor rings at not more than one.' },
    { kind: 'table', caption: 'Rule 35 — each signal with its own maximum interval', headers: ['Vessel', 'Signal', 'Interval'], rows: [
      ['Power-driven, making way', 'One prolonged blast', 'Not more than 2 min'],
      ['Power-driven, underway but stopped', 'Two prolonged blasts, about 2 seconds apart', 'Not more than 2 min'],
      ['Sailing; fishing; towing or pushing; NUC; RAM; constrained by draught', 'One prolonged followed by two short blasts', 'Not more than 2 min'],
      ['Vessel towed (last of the tow, if manned)', 'One prolonged followed by three short blasts', 'Not more than 2 min'],
      ['At anchor', 'Rapid bell for about 5 seconds', 'Not more than 1 min'],
    ] },
    { kind: 'callout', tone: 'note', title: 'What a small boat actually has to do', text: 'A vessel under 12 metres is not obliged to give these signals, but if she does not she must make some other efficient sound signal at intervals of not more than two minutes (Rule 35(j), International and Inland alike) — a horn or air canister, anything reliably audible. Under sail alone you sound one prolonged and two short; start the engine and you are power-driven, sounding one prolonged.' },
  ],
};
