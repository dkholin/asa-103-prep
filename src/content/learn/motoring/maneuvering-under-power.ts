import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'motoring-maneuvering-under-power',
  moduleId: 'motoring',
  order: 5,
  title: 'Maneuvering Under Power',
  intro: 'Manage energy first: keep speed low, preserve control, and leave room for the stern to swing.',
  concepts: ['stopping-distance', 'steerage-way', 'pivot-point', 'turning-in-confined-space'],
  blocks: [
    { kind: 'heading', text: 'A boat has no brakes' },
    { kind: 'text', text: 'A displacement sailboat keeps carrying way after the throttle returns to neutral. Reverse thrust can slow it, but it does not erase momentum instantly. Stopping distance changes with speed, displacement, hull shape, wind, current, and how quickly the propeller develops reverse thrust.' },
    { kind: 'callout', tone: 'note', title: 'Learn the stopping distance', text: 'In open water, choose a fixed reference and practise stopping from idle ahead and from a normal harbor speed. Repeat in different wind and current. The useful answer belongs to this boat in today’s conditions, not to a universal formula.' },
    { kind: 'definition', term: 'Steerage way', text: 'Enough motion through the water for the rudder to change the boat’s heading. It is not a fixed speed and it is different from speed over the ground.' },
    { kind: 'text', text: 'When backing, use enough astern power to establish sternway, then reduce power and steer. The rudder may feel slow at first and can load sharply once water begins flowing across it. Look where the stern is going, expect prop walk, and make small corrections rather than chasing every swing with full helm.' },
    { kind: 'definition', term: 'Pivot point', text: 'The practical point around which the hull appears to rotate. At low speed ahead it is commonly forward of amidships, so the stern sweeps a wider arc than the bow.' },
    { kind: 'text', text: 'That stern swing is the hidden clearance problem in a turn. Looking only at the bow can put the quarter into a piling, dock, or neighboring boat. The pivot point moves with the boat’s motion and conditions, so treat “forward of amidships” as a working mental model, not an exact marked spot on every hull.' },
    { kind: 'heading', text: 'Turning in a confined space' },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Stop or nearly stop with room around the bow and, especially, the stern.',
        'Put the rudder toward the intended turn and use a short burst ahead. Prop wash helps rotate the boat without a long run forward.',
        'Return to neutral, then use a short burst astern to check forward motion and continue the rotation with prop walk when it helps.',
        'Repeat the ahead-and-astern sequence as needed, reassessing clearance after every burst. This backing-and-filling pattern varies by boat; do not apply power mechanically when the result is no longer safe.',
      ],
    },
    { kind: 'callout', tone: 'warning', title: 'Slow is useful; powerless is not always safer', text: 'Use the lowest speed that preserves control, but keep the engine ready. If wind or current is taking the boat somewhere unsafe, decisive power in a planned direction may create more safety than drifting in neutral.' },
  ],
};
