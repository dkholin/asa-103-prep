import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'navigation-rules-tools-navigation-lights', moduleId: 'navigation-rules-tools', order: 4,
  title: 'Navigation Lights',
  intro: 'Reading a vessel\'s lights at night to work out what she is, where she is heading, and what she is doing.',
  concepts: ['navigation-lights', 'special-vessel-lights'],
  blocks: [
    { kind: 'text', text: 'Navigation lights are a language with a small vocabulary. Rule 20 requires them from sunset to sunrise, and in restricted visibility by day as well. Learn the four basic lights and the arcs they cover, and most night sightings decode themselves.' },
    { kind: 'heading', text: 'The four lights and their arcs' },
    { kind: 'table', caption: 'Rule 21 definitions — the geometry behind every night sighting', headers: ['Light', 'Colour', 'Arc', 'Where it shows'], rows: [
      ['Sidelights', 'Green to starboard, red to port', '112.5° each', 'Right ahead to 22.5° abaft the beam on its own side'],
      ['Sternlight', 'White', '135°', '67.5° from right aft on each side'],
      ['Masthead light', 'White', '225°', 'Right ahead to 22.5° abaft the beam on both sides'],
      ['All-round light', 'Varies by signal', '360°', 'Unbroken all the way round'],
    ] },
    { kind: 'text', text: 'The arcs are not arbitrary. Two sidelights of 112.5° plus a 135° sternlight total 360°, and the 225° masthead light is exactly the two sidelight arcs combined. From any bearing you therefore see a defined combination, and the combination tells you the other vessel’s aspect. On a vessel under 20 metres the sidelights may be combined in one centreline lantern, which changes where the lights are, not what they mean.' },
    {
      kind: 'list',
      items: [
        'Green only, or red only — you are looking at one side of her: green is her starboard side, red her port side.',
        'Both sidelights at once — you are in the narrow window near her bow and she is heading toward you.',
        'A white sternlight only — you are behind her, inside the 135° arc, and any closing is being done by you.',
        'A white masthead light above the sidelights — she is power-driven. Under sail alone there is no masthead light, and that absence is the clearest sail-versus-power cue at night.',
      ],
    },
    { kind: 'figure', assetId: 'custom-night-headon', caption: 'Both sidelights visible together place the observer inside both 112.5° arcs at once — a narrow window that exists only near the other vessel’s bow.' },
    { kind: 'figure', assetId: 'custom-night-green-only', caption: 'A single coloured light with nothing above it. What is absent from a night sighting carries as much information as what is present — read both.' },
    { kind: 'heading', text: 'Power and sail' },
    { kind: 'text', text: 'A power-driven vessel underway shows a masthead light forward, sidelights, and a sternlight. At 50 metres or more she adds a second masthead light abaft of and higher than the first, so two masthead lights in a vertical line with the forward one lower is a large power-driven vessel; under 50 metres that second light is optional. Under 12 metres she may instead show an all-round white light and sidelights.' },
    { kind: 'text', text: 'A sailing vessel underway shows sidelights and a sternlight, and nothing more is required. Under 20 metres those may be combined in one lantern at or near the masthead. She may optionally add two all-round lights in a vertical line at the masthead, red over green — but not together with the combined lantern. Under 7 metres she should show the normal lights if practicable, and otherwise must have a torch or lantern showing a white light ready to exhibit in time to prevent collision.' },
    { kind: 'heading', text: 'Vessels doing something that limits them' },
    { kind: 'text', text: 'Several vessel states are signalled by all-round lights in a vertical line, visible from every direction because the message matters from every direction. They sit above whatever underway lights the vessel is showing.' },
    { kind: 'table', caption: 'All-round vertical combinations worth recognising', headers: ['Top to bottom', 'Meaning', 'Rule'], rows: [
      ['Red, red', 'Not under command', '27(a)'],
      ['Red, white, red', 'Restricted in her ability to manoeuvre', '27(b)'],
      ['Green, white', 'Engaged in trawling', '26(b)'],
      ['Red, white', 'Engaged in fishing other than trawling', '26(c)'],
      ['Red, red, red', 'Constrained by her draught (International)', '28'],
      ['Single white, where best seen', 'At anchor, vessel under 50 m', '30(b)'],
    ] },
    { kind: 'text', text: 'Those vertical all-round lights are the identification signal on its own. A vessel not under command or restricted in her ability to manoeuvre adds her ordinary underway lights only when actually making way — sidelights and sternlight in both cases, plus masthead light(s) for a RAM vessel under Rule 27(b)(iii), which a NUC vessel never shows. So red over red with no sidelights means stopped as well as unable to manoeuvre. A vessel at anchor is not underway and shows none of the underway lights: under 50 metres, a single all-round white light where it can best be seen, and by day a black ball forward.' },
    { kind: 'figure', assetId: 'photo-trawler-gear-out', caption: 'Booms lowered and gear streamed. A vessel working her fishing gear cannot simply turn or stop, which is why her state earns its own all-round signal at night and its own day shape.' },
    { kind: 'callout', tone: 'note', title: 'Learn the pattern, look up the rest', text: 'The vocabulary is larger than this — towing, pilot vessels, dredges with an obstructed side, vessels aground. At this level the useful skill is recognising that an unfamiliar vertical stack of all-round lights means “this is not an ordinary vessel”, giving her room, and looking the exact signal up. Minimum visibility ranges (Rule 22) are a fitting-out concern rather than something to memorise.' },
    { kind: 'callout', tone: 'warning', title: 'A light tells you what she is, not whether she is a risk', text: 'Shore lights, background glare, and other boats’ deck lighting all compete with navigation lights — Rule 6 counts background lighting as a safe-speed factor for exactly that reason. Confirm an aspect by watching how the picture changes over a minute or two rather than committing to one glance, and take bearings alongside.' },
  ],
};
