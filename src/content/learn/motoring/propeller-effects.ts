import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'motoring-propeller-effects',
  moduleId: 'motoring',
  order: 4,
  title: 'Propeller Effects',
  intro: 'Separate prop wash from prop walk, then use both as predictable parts of low-speed handling.',
  concepts: ['prop-walk', 'prop-wash', 'right-hand-propeller'],
  blocks: [
    { kind: 'definition', term: 'Prop wash', text: 'The accelerated stream of water produced by the propeller. In forward gear on a typical inboard, that stream flows aft across the rudder.' },
    { kind: 'text', text: 'A rudder needs water flowing across it. When the boat has little headway, a brief burst of forward power can put strong prop wash over a turned rudder and swing the stern before the boat gains much speed. Return to neutral after the burst and the boat keeps rotating on its momentum without continuing to accelerate.' },
    { kind: 'text', text: 'In reverse, the propeller draws water from the rudder side and sends its wash forward. The rudder therefore does not get the same direct blast, so it usually needs actual sternway before it answers well. Wind, current, and the sideways propeller effect can dominate until then.' },
    { kind: 'figure', assetId: 'custom-prop-wash-rudder-flow', caption: 'Same boat, same helm, opposite gear. Ahead, the wash is driven aft across the rudder and swings the stern. Astern, the wash goes the other way, so the rudder answers mainly once the boat has sternway of its own.' },
    { kind: 'definition', term: 'Prop walk', text: 'A sideways component of propeller thrust that tends to move the stern. It is usually most noticeable when reverse power is first applied.' },
    { kind: 'figure', assetId: 'custom-prop-walk', caption: 'Application convention: with a right-hand propeller in reverse, the boat moves astern while the stern also walks to port.' },
    { kind: 'callout', tone: 'note', title: 'Right-hand propeller convention', text: 'Throughout this app, a right-hand propeller means the stern walks to port in reverse. A left-hand installation behaves oppositely. Confirm the tendency on the actual boat in open water; hull, propeller, rudder, and wind can change how strong the effect feels.' },
    { kind: 'heading', text: 'Use the effects deliberately' },
    {
      kind: 'list',
      items: [
        'Use short forward bursts with the rudder set to create turning force without building unnecessary speed.',
        'Expect a pause before the rudder becomes effective while backing; hold the wheel securely because water can load it suddenly as sternway builds.',
        'Choose an approach or backing direction that works with prop walk when practical. A right-hand propeller naturally helps swing the stern to port in reverse.',
        'Practise in open water. Learn the boat’s response at idle before depending on it near a dock.',
      ],
    },
  ],
};
