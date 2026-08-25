import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'motoring-docking-mooring',
  moduleId: 'motoring',
  order: 6,
  title: 'Docking & Mooring',
  intro: 'Plan the forces, arrive with little energy, and keep a clean escape route until the boat is secure.',
  concepts: [
    'docking-approach',
    'docking-wind',
    'docking-current',
    'spring-line',
    'abort-and-go-around',
    'mooring-approach',
    'mooring-pickup',
  ],
  blocks: [
    { kind: 'heading', text: 'Build the approach before you enter the slip' },
    {
      kind: 'list',
      items: [
        'Observe flags, ripples, fixed objects, and other boats to estimate wind and current. Decide which force has the greater effect on this boat, while still accounting for the other.',
        'Choose the landing side and target, rig fenders, lead the needed lines, assign crew, and agree on simple commands. Keep hands, feet, and bodies out of the gap between boat and dock.',
        'Approach only as fast as needed for control. Use short power changes, return to neutral, and let the boat show what the last input did.',
        'Keep an escape route. If the angle, speed, or drift becomes wrong, power clear, reset, and try again. A go-around is routine seamanship.',
      ],
    },
    { kind: 'heading', text: 'Wind and current change the shape' },
    { kind: 'text', text: 'With wind blowing onto the dock, use a shallow angle and let the wind close the final gap while light power preserves control. Avoid arriving fast and perpendicular: the same wind that helps you land also removes stopping room.' },
    { kind: 'figure', assetId: 'custom-docking-wind', caption: 'Wind onto the dock: a shallow, controlled approach lets the wind assist the final movement alongside.' },
    { kind: 'text', text: 'With wind blowing off the dock, use a steeper approach and enough sustained control to reach the dock. Have the first useful line ready, because the wind will begin opening the gap as soon as power is reduced.' },
    { kind: 'text', text: 'With current parallel to a dock, approach into the current when practical. Water flowing past the rudder improves control while speed over the dock can remain low. A following current can make the boat look slow over the water while it carries too much speed over the ground to stop comfortably.' },
    { kind: 'figure', assetId: 'custom-docking-current', caption: 'Current parallel to the dock: pointing into the current preserves water flow over the rudder while controlling closing speed.' },
    { kind: 'callout', tone: 'warning', title: 'Do not rescue a bad approach with a jump', text: 'Crew should step ashore only when the boat is close, slow, and stable. No one should leap for the dock or try to stop the hull with a hand or foot. The engine, fenders, and lines control the boat.' },
    { kind: 'heading', text: 'What the lines do' },
    { kind: 'text', text: 'Bow and stern lines keep their ends of the boat near the dock. Spring lines run diagonally and resist fore-and-aft movement. A spring can also become a controlled pivot: with a properly led and secured line, gentle engine thrust can bring one end of the boat toward or away from the dock. Use that technique only with a clear plan, strong fittings, and crew outside the bight of every line.' },
    { kind: 'definition', term: 'Spring line', text: 'A dock line led diagonally fore-and-aft to limit the boat’s movement along the dock; it supplements rather than replaces bow and stern lines.' },
    { kind: 'heading', text: 'Picking up a mooring' },
    { kind: 'text', text: 'Plan the final approach into the stronger of wind or current. Assign a bow crew with a boat hook, establish communication, and keep speed low enough to stop beside the pickup point rather than overrun it. The skipper may lose sight of the buoy near the bow, so the bow crew should report distance and side clearly.' },
    { kind: 'figure', assetId: 'custom-mooring-approach', caption: 'A slow head-to-wind approach uses the wind to help remove the last of the boat’s way.' },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Stop with the bow crew close enough to reach the pickup float or pendant without leaning dangerously overboard.',
        'Retrieve the pendant and secure it to a suitable bow cleat as the mooring instructions require.',
        'Confirm the connection is carrying the boat correctly before shutting down. Keep clear of the mooring ball and ground tackle so they cannot foul the propeller.',
      ],
    },
  ],
};
