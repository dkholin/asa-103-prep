import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'sails-trim-sail-trim-fundamentals', moduleId: 'sails-trim', order: 4,
  title: 'Sail Trim Fundamentals',
  intro: 'Read trim through three things you can see and feel: sail orientation, sail shape, and the boat’s response.',
  concepts: ['sail-shape-fundamentals', 'sail-trim-response'],
  blocks: [
    { kind: 'heading', text: 'Shape and orientation' },
    { kind: 'text', text: 'Trim means adjusting how a sail is shaped and how it is presented to the apparent wind. The goal at this level is not a perfect racing shape. It is steady flow, useful drive, reasonable heel, and a balanced helm for the course and conditions.' },
    { kind: 'definition', term: 'Chord', text: 'An imaginary straight line from the luff to the leech at a chosen height on the sail. It is the reference used to describe draft.' },
    { kind: 'definition', term: 'Draft depth', text: 'How far the curved sail stands away from its chord, often described as a proportion of chord length. A deeper sail is fuller; a shallower sail is flatter.' },
    { kind: 'definition', term: 'Draft position', text: 'Where the deepest part of that curve lies between luff and leech. “Draft forward” places it closer to the luff; “draft aft” moves it toward the leech.' },
    { kind: 'definition', term: 'Twist', text: 'The change in sail angle from bottom to top. More twist opens the upper leech; less twist keeps the upper sail more aligned with the lower sail.' },
    { kind: 'definition', term: 'Angle of attack', text: 'The angle at which the apparent wind meets the sail’s chord. Course changes and sheeting both alter it.' },
    { kind: 'figure', assetId: 'custom-sail-shape-fundamentals', caption: 'Chord is the reference for draft depth and position; twist compares upper and lower orientation, while angle of attack compares chord with the apparent-wind flow.' },
    { kind: 'heading', text: 'Read the cues, then make one change' },
    { kind: 'text', text: 'A luff that begins to flutter is a clear under-trim cue for the current heading: the sail’s leading edge is no longer maintaining attached flow. Trim in gradually until the luff just becomes steady, or change course if that is the intended correction. Avoid pulling farther in without a reason; an over-trimmed sail may look quiet while adding heel and drag.' },
    { kind: 'text', text: 'Sheets primarily change sail angle. Halyard and luff tension, outhaul, vang, traveler, and headsail lead can also change draft or twist, but their effects and safe ranges vary with the rig. Observe the result after each adjustment instead of moving every control at once.' },
    { kind: 'figure', assetId: 'custom-heel-trim', caption: 'Easing the mainsheet or lowering the traveler can spill power and reduce heel in a gust.' },
    { kind: 'text', text: 'The boat is part of the trim display. Excess heel, a helm that continually loads up or tries to round the boat into the wind, and crew or gear struggling to stay secure are signals to depower. Ease the sheet or traveler for immediate relief; if the condition persists, reduce sail area.' },
    { kind: 'callout', tone: 'note', title: 'A practical trim loop', text: 'Observe the luff, telltales, heel, speed, and helm. Change one control a little. Let the boat settle, then decide whether the response improved.' },
  ],
};
